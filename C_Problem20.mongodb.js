// 1. Insert 5 bed documents with different bed types
db.beds.insertMany([
  { bed_id: "B001", ward_name: "General", bed_type: "General", is_occupied: true, patient_name: "Ravi", admission_date: "2026-04-20", expected_discharge_date: "2026-04-24" }, // Discharge passed
  { bed_id: "B002", ward_name: "ICU", bed_type: "ICU", is_occupied: false, patient_name: null, admission_date: null, expected_discharge_date: null },
  { bed_id: "B003", ward_name: "Private A", bed_type: "Private", is_occupied: false, patient_name: null, admission_date: "2026-04-25", expected_discharge_date: null }, // Admitted today, needs update
  { bed_id: "B004", ward_name: "ICU", bed_type: "ICU", is_occupied: true, patient_name: "Meena", admission_date: "2026-04-15", expected_discharge_date: "2026-04-30" },
  { bed_id: "B005", ward_name: "General", bed_type: "General", is_occupied: true, patient_name: "John", admission_date: "2026-04-10", expected_discharge_date: "2026-04-15" } // Discharge passed
]);

// 2. Find beds where is_occupied is false AND ward_name is "ICU"
db.beds.find({ is_occupied: false, ward_name: "ICU" });

// 3. Update is_occupied to true and set patient_name for beds where admission_date is today
db.beds.updateMany(
  { admission_date: "2026-04-25" },
  { $set: { is_occupied: true, patient_name: "New Patient" } }
);

// 4. Delete beds where expected_discharge_date is before today AND is_occupied is true
db.beds.deleteMany({
  expected_discharge_date: { $lt: "2026-04-25" },
  is_occupied: true
});

// 5. Find beds sorted by bed_type, showing specific fields
db.beds.find(
  {},
  { ward_name: 1, bed_type: 1, is_occupied: 1, _id: 0 }
).sort({ bed_type: 1 });
