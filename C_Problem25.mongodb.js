// 1. Insert 5 loan documents with different loan types
db.loans.insertMany([
  { loan_id: "L001", applicant_name: "Aayush", loan_type: "Home", loan_amount: 5000000, interest_rate: 8.5, tenure_months: 240, application_date: "2026-04-20", approval_status: "Pending", credit_score: 780 },
  { loan_id: "L002", applicant_name: "Sneha", loan_type: "Car", loan_amount: 800000, interest_rate: 9.0, tenure_months: 60, application_date: "2026-04-22", approval_status: "Pending", credit_score: 720 },
  { loan_id: "L003", applicant_name: "Rahul", loan_type: "Personal", loan_amount: 300000, interest_rate: 12.5, tenure_months: 36, application_date: "2022-10-15", approval_status: "Rejected", credit_score: 550 },
  { loan_id: "L004", applicant_name: "Vikram", loan_type: "Home", loan_amount: 3000000, interest_rate: 8.5, tenure_months: 180, application_date: "2026-01-10", approval_status: "Approved", credit_score: 800 },
  { loan_id: "L005", applicant_name: "Priya", loan_type: "Personal", loan_amount: 500000, interest_rate: 11.0, tenure_months: 48, application_date: "2026-04-25", approval_status: "Pending", credit_score: 760 }
]);

// 2. Find loans where approval_status is "Pending" AND credit_score > 700
db.loans.find({ approval_status: "Pending", credit_score: { $gt: 700 } });

// 3. Update approval_status to "Approved" where credit_score > 750
db.loans.updateMany(
  { credit_score: { $gt: 750 } },
  { $set: { approval_status: "Approved" } }
);

// 4. Delete loans where application_date < "2023-01-01" AND approval_status is "Rejected"
db.loans.deleteMany({ application_date: { $lt: "2023-01-01" }, approval_status: "Rejected" });

// 5. Aggregate average loan_amount per loan_type for "Approved" loans only
db.loans.aggregate([
  { $match: { approval_status: "Approved" } },
  { $group: { _id: "$loan_type", avg_loan_amount: { $avg: "$loan_amount" } } }
]);
