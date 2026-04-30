// 1. Create a parking collection and insert one parking slot
db.parking.insertOne({
  slot_id: "P1-01", floor: 1, vehicle_type: "Car", is_occupied: true, vehicle_number: "KA-01-AB-1234"
});

// 2. Insert 5 parking slot records
db.parking.insertMany([
  { slot_id: "P1-02", floor: 1, vehicle_type: "Car", is_occupied: false, vehicle_number: null },
  { slot_id: "P2-01", floor: 2, vehicle_type: "Bike", is_occupied: true, vehicle_number: "TN-38-XY-9876" },
  { slot_id: "P2-02", floor: 2, vehicle_type: "Bike", is_occupied: false, vehicle_number: null },
  { slot_id: "P3-05", floor: 3, vehicle_type: "Car", is_occupied: true, vehicle_number: "MH-12-PQ-4567" },
  { slot_id: "P1-05", floor: 1, vehicle_type: "Car", is_occupied: false, vehicle_number: null }
]);

// 3. Retrieve all slots where is_occupied is false
db.parking.find({ is_occupied: false });

// 4. Display only slot_id, floor, and vehicle_type using projection
db.parking.find({}, { slot_id: 1, floor: 1, vehicle_type: 1, _id: 0 });

// 5. Delete a parking slot based on slot_id
db.parking.deleteOne({ slot_id: "P1-01" });
