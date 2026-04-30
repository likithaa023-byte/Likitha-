// 1. Insert 5 rider documents with different current_status values
db.riders.insertMany([
  { rider_id: "RD001", rider_name: "Ramesh", city: "Bangalore", vehicle_type: "Bike", total_deliveries: 25, average_rating: 4.8, current_status: "Available", earnings_today: 500, delivery_history: ["ORD1", "ORD2", "ORD3"] },
  { rider_id: "RD002", rider_name: "Suresh", city: "Chennai", vehicle_type: "Scooter", total_deliveries: 15, average_rating: 4.2, current_status: "Busy", earnings_today: 300, delivery_history: ["ORD4"] },
  { rider_id: "RD003", rider_name: "Mahesh", city: "Bangalore", vehicle_type: "Bike", total_deliveries: 0, average_rating: 0, current_status: "Offline", earnings_today: 0, delivery_history: [] },
  { rider_id: "RD004", rider_name: "Dinesh", city: "Mumbai", vehicle_type: "Scooter", total_deliveries: 50, average_rating: 4.9, current_status: "Available", earnings_today: 1200, delivery_history: ["ORD5", "ORD6"] },
  { rider_id: "RD005", rider_name: "Ganesh", city: "Delhi", vehicle_type: "Bike", total_deliveries: 5, average_rating: 3.5, current_status: "Offline", earnings_today: 100, delivery_history: ["ORD7"] }
]);

// 2. Find riders where current_status is "Available" AND average_rating > 4.5
db.riders.find({ current_status: "Available", average_rating: { $gt: 4.5 } });

// 3. Update earnings_today by adding 100 to riders with total_deliveries > 20
db.riders.updateMany(
  { total_deliveries: { $gt: 20 } },
  { $inc: { earnings_today: 100 } }
);

// 4. Delete riders where current_status is "Offline" AND total_deliveries is 0
db.riders.deleteMany({ current_status: "Offline", total_deliveries: 0 });

// 5. Create a multikey index on the delivery_history array field
db.riders.createIndex({ delivery_history: 1 });
