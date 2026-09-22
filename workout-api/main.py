from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import date

import models
from database import engine, get_db

# Tworzenie tabel w bazie SQLite przy starcie
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Workout Tracker API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schematy Pydantic
class ExerciseSetBase(BaseModel):
    exercise_name: str
    reps: int
    weight_kg: float

class ExerciseSetResponse(ExerciseSetBase):
    id: int
    class Config:
        from_attributes = True

class WorkoutCreate(BaseModel):
    title: str
    date: date
    notes: Optional[str] = None
    exercises: List[ExerciseSetBase] = []

class WorkoutResponse(BaseModel):
    id: int
    title: str
    date: date
    notes: Optional[str] = None
    exercises: List[ExerciseSetResponse] = []

    class Config:
        from_attributes = True

# Endpointy CRUD
@app.get("/workouts", response_model=List[WorkoutResponse])
def get_workouts(db: Session = Depends(get_db)):
    return db.query(models.Workout).all()

@app.post("/workouts", response_model=WorkoutResponse, status_code=201)
def create_workout(workout_data: WorkoutCreate, db: Session = Depends(get_db)):
    workout = models.Workout(
        title=workout_data.title,
        date=workout_data.date,
        notes=workout_data.notes
    )
    for ex in workout_data.exercises:
        workout.exercises.append(
            models.ExerciseSet(
                exercise_name=ex.exercise_name,
                reps=ex.reps,
                weight_kg=ex.weight_kg
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

# Endpoint pod analitykę w Next.js
@app.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    workouts = db.query(models.Workout).all()
    total_workouts = len(workouts)
    
    # Wylicz łączną objętość (kg * powtórzenia)
    total_volume_kg = sum(
        ex.weight_kg * ex.reps 
        for w in workouts 
        for ex in w.exercises
    )
    
    return {
        "total_workouts": total_workouts,
        "total_volume_kg": round(total_volume_kg, 2),
    }