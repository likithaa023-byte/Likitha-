// 1. Insert 5 service records
db.services.insertMany([
  { service_id: "V001", customer_name: "Amit", vehicle_number: "KA-01-A-1234", service_type: "Oil Change", service_date: "2026-04-25", cost: 1500, status: "Scheduled" },
  { service_id: "V002", customer_name: "Ravi", vehicle_number: "TN-38-B-5678", service_type: "Repair", service_date: "2026-07-15", cost: 5000, status: "InProgress" },
  { service_id: "V003", customer_name: "Sneha", vehicle_number: "MH-12-C-9012", service_type: "Inspection", service_date: "2024-11-20", cost: 400, status: "InProgress" },
  { service_id: "V004", customer_name: "Priya", vehicle_number: "DL-04-D-3456", service_type: "Repair", service_date: "2026-08-10", cost: 8000, status: "InProgress" },
  { service_id: "V005", customer_name: "Karthik", vehicle_number: "KL-07-E-7890", service_type: "Oil Change", service_date: "2024-05-10", cost: 300, status: "Completed" }
]);

// 2. Find "InProgress" records where service_date is before "2026-08-01"
db.services.find({ status: "InProgress", service_date: { $lt: "2026-08-01" } });

// 3. Update status to "Completed" where service_date is before "2025-01-01"
db.services.updateMany(
  { service_date: { $lt: "2025-01-01" } },
  { $set: { status: "Completed" } }
);

// 4. Delete records with status "Completed" AND cost < 500
db.services.deleteMany({ status: "Completed", cost: { $lt: 500 } });

// 5. Find records sorted by cost (descending), showing only specific fields
db.services.find(
  {}, 
  { customer_name: 1, service_type: 1, cost: 1, _id: 0 }
).sort({ cost: -1 });
