// 1. Insert 5 prescription documents with different statuses
db.prescriptions.insertMany([
  { prescription_id: "RX001", patient_name: "Amit", doctor_name: "Dr. Sharma", medicine_name: "Paracetamol", dosage: "500mg", issue_date: "2026-04-20", expiry_date: "2026-10-20", status: "Active" },
  { prescription_id: "RX002", patient_name: "Priya", doctor_name: "Dr. Iyer", medicine_name: "Amoxicillin", dosage: "250mg", issue_date: "2023-05-10", expiry_date: "2023-11-10", status: "Active" }, // Should be expired
  { prescription_id: "RX003", patient_name: "Ravi", doctor_name: "Dr. Singh", medicine_name: "Ibuprofen", dosage: "400mg", issue_date: "2023-12-01", expiry_date: "2024-06-01", status: "Fulfilled" },
  { prescription_id: "RX004", patient_name: "Meena", doctor_name: "Dr. Patel", medicine_name: "Metformin", dosage: "500mg", issue_date: "2026-04-24", expiry_date: "2026-12-31", status: "Active" },
  { prescription_id: "RX005", patient_name: "Rahul", doctor_name: "Dr. Verma", medicine_name: "Cetirizine", dosage: "10mg", issue_date: "2026-01-15", expiry_date: "2026-03-15", status: "Expired" }
]);

// 2. Find prescriptions with status "Active" AND expiry_date after today
db.prescriptions.find({ status: "Active", expiry_date: { $gt: "2026-04-25" } });

// 3. Update status to "Expired" where expiry_date is before today
db.prescriptions.updateMany(
  { expiry_date: { $lt: "2026-04-25" } },
  { $set: { status: "Expired" } }
);

// 4. Delete prescriptions with status "Fulfilled" AND issue_date before 2024-01-01
db.prescriptions.deleteMany({ status: "Fulfilled", issue_date: { $lt: "2024-01-01" } });

// 5. Find prescriptions sorted by issue_date (descending), showing specific fields
db.prescriptions.find(
  {}, 
  { patient_name: 1, medicine_name: 1, status: 1, _id: 0 }
).sort({ issue_date: -1 });
