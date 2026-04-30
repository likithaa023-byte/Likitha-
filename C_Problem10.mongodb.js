// 1. Create a workouts collection and insert one document
db.workouts.insertOne({ 
  workout_id: "W001", exercise_name: "Running", duration_minutes: 30, calories_burned: 300, date: "2026-04-25", intensity: "High" 
});

// 2. Insert 5 workout records
db.workouts.insertMany([
  { workout_id: "W002", exercise_name: "Yoga", duration_minutes: 45, calories_burned: 200, date: "2026-04-24", intensity: "Low" },
  { workout_id: "W003", exercise_name: "Cycling", duration_minutes: 60, calories_burned: 500, date: "2026-04-23", intensity: "High" },
  { workout_id: "W004", exercise_name: "Weightlifting", duration_minutes: 50, calories_burned: 400, date: "2026-04-22", intensity: "Medium" },
  { workout_id: "W005", exercise_name: "Swimming", duration_minutes: 40, calories_burned: 350, date: "2026-04-21", intensity: "High" },
  { workout_id: "W006", exercise_name: "Walking", duration_minutes: 60, calories_burned: 250, date: "2026-04-20", intensity: "Low" }
]);

// 3. Retrieve all workouts with intensity "High"
db.workouts.find({ intensity: "High" });

// 4. Display only exercise_name, duration_minutes, and calories_burned
db.workouts.find({}, { exercise_name: 1, duration_minutes: 1, calories_burned: 1, _id: 0 });

// 5. Delete a workout based on workout_id
db.workouts.deleteOne({ workout_id: "W001" });
