from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import date

import models
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Workout Tracker API", version="1.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schematy Pydantic
class ExerciseBase(BaseModel):
    name: str
    category: str  # abs, legs, back, arms, chest

class ExerciseCreate(ExerciseBase):
    pass

class ExerciseResponse(ExerciseBase):
    id: int
    class Config:
        from_attributes = True

class SetCreate(BaseModel):
    exercise_id: int
    reps: int
    weight_kg: float

class SetResponse(BaseModel):
    id: int
    reps: int
    weight_kg: float
    exercise: ExerciseResponse
    class Config:
        from_attributes = True

class WorkoutCreate(BaseModel):
    title: str
    date: date
    notes: Optional[str] = None
    sets: List[SetCreate] = []

class WorkoutResponse(BaseModel):
    id: int
    title: str
    date: date
    notes: Optional[str] = None
    exercises: List[SetResponse] = []
    class Config:
        from_attributes = True

# Automatyczne dodanie bazowych ćwiczeń przy pierwszym uruchomieniu
@app.on_event("startup")
def seed_exercises():
    db = next(get_db())
    try:
        if db.query(models.Exercise).count() == 0:
            defaults = [
                models.Exercise(name="Przysiad ze sztangą", category="legs"),
                models.Exercise(name="Martwy ciąg", category="back"),
                models.Exercise(name="Wyciskanie leżąc", category="chest"),
                models.Exercise(name="Uginanie przedramion", category="arms"),
                models.Exercise(name="Plank (deska)", category="abs"),
            ]
            db.add_all(defaults)
            db.commit()
    finally:
        db.close()

# Endpointy Ćwiczeń
@app.get("/exercises", response_model=List[ExerciseResponse])
def get_exercises(db: Session = Depends(get_db)):
    return db.query(models.Exercise).all()

@app.post("/exercises", response_model=ExerciseResponse, status_code=201)
def create_exercise(exercise: ExerciseCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Exercise).filter(models.Exercise.name.ilike(exercise.name)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Ćwiczenie o tej nazwie już istnieje")
    new_exercise = models.Exercise(name=exercise.name, category=exercise.category.lower())
    db.add(new_exercise)
    db.commit()
    db.refresh(new_exercise)
    return new_exercise

# Endpointy Treningów
@app.get("/workouts", response_model=List[WorkoutResponse])
def get_workouts(db: Session = Depends(get_db)):
    return db.query(models.Workout).order_by(models.Workout.date.desc()).all()

@app.post("/workouts", response_model=WorkoutResponse, status_code=201)
def create_workout(workout_data: WorkoutCreate, db: Session = Depends(get_db)):
    if not workout_data.sets:
        raise HTTPException(status_code=400, detail="Trening musi zawierać przynajmniej jedną serię")

    exercise_ids = {s.exercise_id for s in workout_data.sets}
    if any(eid <= 0 for eid in exercise_ids):
        raise HTTPException(status_code=400, detail="Wybierz ćwiczenie dla każdej serii")

    existing = {
        e.id
        for e in db.query(models.Exercise)
        .filter(models.Exercise.id.in_(exercise_ids))
        .all()
    }
    missing = exercise_ids - existing
    if missing:
        raise HTTPException(
            status_code=400,
            detail=f"Nie znaleziono ćwiczeń o id: {sorted(missing)}",
        )

    workout = models.Workout(
        title=workout_data.title,
        date=workout_data.date,
        notes=workout_data.notes,
    )
    for s in workout_data.sets:
        workout.exercises.append(
            models.ExerciseSet(
                exercise_id=s.exercise_id,
                reps=s.reps,
                weight_kg=s.weight_kg,
            )
        )
    db.add(workout)
    db.commit()
    db.refresh(workout)
    return workout

@app.delete("/workouts/{workout_id}", status_code=204)
def delete_workout(workout_id: int, db: Session = Depends(get_db)):
    workout = db.query(models.Workout).filter(models.Workout.id == workout_id).first()
    if not workout:
        raise HTTPException(status_code=404, detail="Trening nie został znaleziony")
    db.delete(workout)
    db.commit()
    return None

@app.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    workouts = db.query(models.Workout).all()
    total_volume_kg = sum(
        s.weight_kg * s.reps 
        for w in workouts 
        for s in w.exercises
    )
    return {
        "total_workouts": len(workouts),
        "total_volume_kg": round(total_volume_kg, 2),
    }