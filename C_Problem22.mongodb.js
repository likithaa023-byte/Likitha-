// 1. Insert 5 itinerary documents
db.itineraries.insertMany([
  { itinerary_id: "T001", customer_name: "Aayush", destination: "Manali", trip_start_date: "2026-05-10", trip_end_date: "2026-05-15", budget: 60000, activities: ["Trekking", "Camping"], hotel_name: "Snow View", booking_status: "Confirmed" },
  { itinerary_id: "T002", customer_name: "Sneha", destination: "Goa", trip_start_date: "2026-04-10", trip_end_date: "2026-04-15", budget: 40000, activities: ["Beach", "Party"], hotel_name: "Sea Breeze", booking_status: "Confirmed" },
  { itinerary_id: "T003", customer_name: "Rahul", destination: "Leh", trip_start_date: "2026-06-01", trip_end_date: "2026-06-10", budget: 80000, activities: ["Biking", "Trekking"], hotel_name: "Mountain Inn", booking_status: "Pending" },
  { itinerary_id: "T004", customer_name: "Vikram", destination: "Paris", trip_start_date: "2023-12-01", trip_end_date: "2023-12-10", budget: 150000, activities: ["Sightseeing", "Museums"], hotel_name: "Eiffel Stay", booking_status: "Cancelled" },
  { itinerary_id: "T005", customer_name: "Priya", destination: "Dubai", trip_start_date: "2026-04-20", trip_end_date: "2026-04-28", budget: 120000, activities: ["Shopping", "Desert Safari"], hotel_name: "Desert Rose", booking_status: "Confirmed" }
]);

// 2. Find itineraries where booking_status is "Confirmed" AND budget > 50,000
db.itineraries.find({ booking_status: "Confirmed", budget: { $gt: 50000 } });

// 3. Update booking_status to "Cancelled" where trip_start_date is before today
db.itineraries.updateMany(
  { trip_start_date: { $lt: "2026-04-25" } },
  { $set: { booking_status: "Cancelled" } }
);

// 4. Delete "Cancelled" trips where trip_end_date is before "2024-01-01"
db.itineraries.deleteMany({ booking_status: "Cancelled", trip_end_date: { $lt: "2024-01-01" } });

// 5. Find itineraries where the activities array contains "Trekking"
db.itineraries.find({ activities: "Trekking" });
