// 1. Insert 5 equipment documents with different conditions
db.equipment.insertMany([
  { equip_id: "EQ001", equip_name: "Treadmill", category: "Cardio", purchase_date: "2018-05-10", last_maintenance_date: "2025-02-15", next_maintenance_date: "2026-02-15", condition: "Good" },
  { equip_id: "EQ002", equip_name: "Dumbbells Set", category: "Strength", purchase_date: "2014-08-20", last_maintenance_date: "2024-10-10", next_maintenance_date: "2025-10-10", condition: "OutOfOrder" },
  { equip_id: "EQ003", equip_name: "Stationary Bike", category: "Cardio", purchase_date: "2020-11-05", last_maintenance_date: "2024-12-01", next_maintenance_date: "2025-06-01", condition: "NeedsService" },
  { equip_id: "EQ004", equip_name: "Leg Press", category: "Strength", purchase_date: "2019-01-15", last_maintenance_date: "2025-03-20", next_maintenance_date: "2026-03-20", condition: "Good" },
  { equip_id: "EQ005", equip_name: "Rowing Machine", category: "Cardio", purchase_date: "2012-06-30", last_maintenance_date: "2023-01-10", next_maintenance_date: "2024-01-10", condition: "OutOfOrder" }
]);

// 2. Find equipment where condition is "NeedsService" OR "OutOfOrder"
db.equipment.find({ condition: { $in: ["NeedsService", "OutOfOrder"] } });

// 3. Update condition to "Good" where last_maintenance_date is after 2025-01-01
db.equipment.updateMany(
  { last_maintenance_date: { $gt: "2025-01-01" } },
  { $set: { condition: "Good" } }
);

// 4. Delete equipment where purchase_date is before 2015-01-01 AND condition is "OutOfOrder"
db.equipment.deleteMany({
  purchase_date: { $lt: "2015-01-01" },
  condition: "OutOfOrder"
});

// 5. Find equipment sorted by next_maintenance_date in ascending order
db.equipment.find().sort({ next_maintenance_date: 1 });
