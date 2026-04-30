// 1. Create a tasks collection and insert one task
db.tasks.insertOne({
  task_id: "T001",
  title: "Complete MongoDB Assignment",
  description: "Finish all 30 problems",
  due_date: "2026-04-29",
  priority: "High",
  is_completed: false
});

// 2. Insert 5 tasks with different priorities
db.tasks.insertMany([
  { task_id: "T002", title: "Buy groceries", description: "Milk, eggs, bread", due_date: "2026-04-26", priority: "Medium", is_completed: false },
  { task_id: "T003", title: "Read a book", description: "Read 2 chapters", due_date: "2026-04-27", priority: "Low", is_completed: true },
  { task_id: "T004", title: "Pay electricity bill", description: "Due soon", due_date: "2026-04-28", priority: "High", is_completed: false },
  { task_id: "T005", title: "Call mom", description: "Weekly catchup", due_date: "2026-04-25", priority: "Medium", is_completed: true },
  { task_id: "T006", title: "Workout", description: "Leg day", due_date: "2026-04-26", priority: "Low", is_completed: false }
]);

// 3. Retrieve all tasks where is_completed is false
db.tasks.find({ is_completed: false });

// 4. Display only title and due_date
db.tasks.find({}, { title: 1, due_date: 1, _id: 0 });

// 5. Delete a task based on task_id
db.tasks.deleteOne({ task_id: "T003" });
