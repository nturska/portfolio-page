from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    category = Column(String, index=True)

    sets = relationship("ExerciseSet", back_populates="exercise")

class Workout(Base):
    __tablename__ = "workouts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    date = Column(Date)
    notes = Column(String, nullable=True)

    exercises = relationship("ExerciseSet", back_populates="workout", cascade="all, delete-orphan")

class ExerciseSet(Base):
    __tablename__ = "exercise_sets"

    id = Column(Integer, primary_key=True, index=True)
    reps = Column(Integer)
    weight_kg = Column(Float)
    workout_id = Column(Integer, ForeignKey("workouts.id"))
    exercise_id = Column(Integer, ForeignKey("exercises.id"))

    workout = relationship("Workout", back_populates="exercises")
    exercise = relationship("Exercise", back_populates="sets")