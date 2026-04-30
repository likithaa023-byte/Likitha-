// 1. Insert 5 subscription documents
db.subscriptions.insertMany([
  { sub_id: "SUB001", user_name: "Aayush", plan_type: "Premium", monthly_fee: 500, start_date: "2026-01-01", renewal_date: "2026-05-01", is_active: true },
  { sub_id: "SUB002", user_name: "Muddassir", plan_type: "Basic", monthly_fee: 200, start_date: "2024-05-15", renewal_date: "2024-06-15", is_active: false },
  { sub_id: "SUB003", user_name: "Ananya", plan_type: "Standard", monthly_fee: 350, start_date: "2025-10-20", renewal_date: "2026-10-20", is_active: true },
  { sub_id: "SUB004", user_name: "Rahul", plan_type: "Basic", monthly_fee: 200, start_date: "2026-03-10", renewal_date: "2026-04-10", is_active: true },
  { sub_id: "SUB005", user_name: "Sneha", plan_type: "Premium", monthly_fee: 500, start_date: "2023-11-01", renewal_date: "2024-11-01", is_active: false }
]);

// 2. Find subscriptions with is_active true AND plan_type "Premium"
db.subscriptions.find({ is_active: true, plan_type: "Premium" });

// 3. Update the monthly_fee by increasing it by 100 for all Basic plans
db.subscriptions.updateMany(
  { plan_type: "Basic" },
  { $inc: { monthly_fee: 100 } }
);

// 4. Delete subscriptions where is_active is false AND renewal_date is before "2025-01-01"
db.subscriptions.deleteMany({ 
  is_active: false, 
  renewal_date: { $lt: "2025-01-01" } 
});

// 5. Find subscriptions sorted by monthly_fee descending, displaying only specific fields
db.subscriptions.find(
  {}, 
  { user_name: 1, plan_type: 1, monthly_fee: 1, _id: 0 }
).sort({ monthly_fee: -1 });
