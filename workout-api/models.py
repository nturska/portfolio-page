from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

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
    exercise_name = Column(String, index=True)
    reps = Column(Integer)
    weight_kg = Column(Float)
    workout_id = Column(Integer, ForeignKey("workouts.id"))

    workout = relationship("Workout", back_populates="exercises")