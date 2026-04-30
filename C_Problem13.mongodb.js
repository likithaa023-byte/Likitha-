// 1. Insert 5 poll documents with options arrays
db.polls.insertMany([
  { poll_id: "P001", question: "Best DB?", options: ["MongoDB", "MySQL", "PostgreSQL", "Redis"], votes: [150, 80, 60, 20], created_date: "2026-01-10", end_date: "2026-12-31", is_active: true },
  { poll_id: "P002", question: "Favorite Language?", options: ["Python", "JavaScript", "Java"], votes: [200, 250, 100], created_date: "2026-03-01", end_date: "2026-04-01", is_active: true },
  { poll_id: "P003", question: "Next feature?", options: ["Dark Mode", "Chat", "Profiles"], votes: [500, 300, 100], created_date: "2022-11-05", end_date: "2022-12-05", is_active: false },
  { poll_id: "P004", question: "Best IDE?", options: ["VS Code", "IntelliJ", "WebStorm", "Eclipse", "Vim"], votes: [400, 150, 50, 80, 10], created_date: "2026-04-20", end_date: "2026-05-20", is_active: true },
  { poll_id: "P005", question: "Lunch today?", options: ["Pizza", "Burger"], votes: [10, 12], created_date: "2022-05-01", end_date: "2022-05-02", is_active: false }
]);

// 2. Find active polls where end_date is after today
db.polls.find({ is_active: true, end_date: { $gt: "2026-04-25" } });

// 3. Update is_active to false where end_date is before today
db.polls.updateMany(
  { end_date: { $lt: "2026-04-25" } },
  { $set: { is_active: false } }
);

// 4. Delete polls created before 2023-01-01 AND are inactive
db.polls.deleteMany({ created_date: { $lt: "2023-01-01" }, is_active: false });

// 5. Find polls where options array length is greater than 3
db.polls.find({ 
  $expr: { $gt: [{ $size: "$options" }, 3] } 
});
