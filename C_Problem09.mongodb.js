// 1. Create a parcels collection and insert one parcel
db.parcels.insertOne({ 
  parcel_id: "P001", sender_name: "Aayush", receiver_name: "Rahul", weight: 2.5, shipping_cost: 150, booking_date: "2026-04-20", delivery_status: "Pending" 
});

// 2. Insert 5 parcel records
db.parcels.insertMany([
  { parcel_id: "P002", sender_name: "Sneha", receiver_name: "Karthik", weight: 1.0, shipping_cost: 80, booking_date: "2026-04-21", delivery_status: "Shipped" },
  { parcel_id: "P003", sender_name: "Vikram", receiver_name: "Priya", weight: 5.0, shipping_cost: 300, booking_date: "2026-04-22", delivery_status: "Pending" },
  { parcel_id: "P004", sender_name: "Ananya", receiver_name: "Amit", weight: 0.5, shipping_cost: 50, booking_date: "2026-04-23", delivery_status: "Delivered" },
  { parcel_id: "P005", sender_name: "John", receiver_name: "Meena", weight: 3.2, shipping_cost: 200, booking_date: "2026-04-24", delivery_status: "Pending" },
  { parcel_id: "P006", sender_name: "Ravi", receiver_name: "Sita", weight: 1.8, shipping_cost: 120, booking_date: "2026-04-25", delivery_status: "Shipped" }
]);

// 3. Retrieve all parcels with delivery_status "Pending"
db.parcels.find({ delivery_status: "Pending" });

// 4. Display only sender_name, receiver_name, and shipping_cost
db.parcels.find({}, { sender_name: 1, receiver_name: 1, shipping_cost: 1, _id: 0 });

// 5. Delete a parcel based on parcel_id
db.parcels.deleteOne({ parcel_id: "P001" });
