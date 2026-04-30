// 1. Insert 5 attendance records with different statuses
db.attendance.insertMany([
  { record_id: "A001", emp_name: "Aayush", department: "IT", date: "2026-04-25", status: "Present", check_in_time: "09:00 AM" },
  { record_id: "A002", emp_name: "Sneha", department: "HR", date: "2026-04-25", status: "Leave", check_in_time: null },
  { record_id: "A003", emp_name: "Rahul", department: "IT", date: "2026-04-25", status: "Absent", check_in_time: null },
  { record_id: "A004", emp_name: "Priya", department: "Finance", date: "2023-12-10", status: "Leave", check_in_time: null },
  { record_id: "A005", emp_name: "Vikram", department: "IT", date: "2026-04-24", status: "Absent", check_in_time: "10:30 AM" } // Forgot to mark present
]);

// 2. Find records where status is "Absent" AND department is "IT"
db.attendance.find({ status: "Absent", department: "IT" });

// 3. Update status to "Present" where check_in_time is not null
db.attendance.updateMany(
  { check_in_time: { $ne: null } },
  { $set: { status: "Present" } }
);

// 4. Delete records where date is before 2024-01-01 AND status is "Leave"
db.attendance.deleteMany({
  date: { $lt: "2024-01-01" },
  status: "Leave"
});

// 5. Find "Present" records sorted by date in ascending order
db.attendance.find({ status: "Present" }).sort({ date: 1 });
