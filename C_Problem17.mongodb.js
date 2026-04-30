// 1. Insert 5 ride documents with different statuses
db.rides.insertMany([
  { ride_id: "CR001", rider_name: "Aayush", driver_name: "Ramesh", pickup_location: "Home", drop_location: "Office", ride_date: "2026-04-25", distance_km: 12, fare: 350, ride_status: "Requested" },
  { ride_id: "CR002", rider_name: "Karthik", driver_name: "Suresh", pickup_location: "Mall", drop_location: null, ride_date: "2026-04-25", distance_km: 5, fare: 150, ride_status: "Requested" },
  { ride_id: "CR003", rider_name: "Sneha", driver_name: "Mahesh", pickup_location: "Airport", drop_location: "Hotel", ride_date: "2024-05-10", distance_km: 25, fare: 800, ride_status: "Cancelled" },
  { ride_id: "CR004", rider_name: "Vikram", driver_name: "Dinesh", pickup_location: "Station", drop_location: "Home", ride_date: "2026-04-24", distance_km: 15, fare: 400, ride_status: "Completed" },
  { ride_id: "CR005", rider_name: "Priya", driver_name: "Ganesh", pickup_location: "Office", drop_location: "Gym", ride_date: "2026-04-25", distance_km: 8, fare: 200, ride_status: "Accepted" }
]);

// 2. Find rides with ride_status "Requested" AND ride_date is today
db.rides.find({ ride_status: "Requested", ride_date: "2026-04-25" });

// 3. Update ride_status to "Completed" where drop_location is not null
db.rides.updateMany(
  { drop_location: { $ne: null } },
  { $set: { ride_status: "Completed" } }
);

// 4. Delete rides with status "Cancelled" AND ride_date before 2024-06-01
db.rides.deleteMany({ ride_status: "Cancelled", ride_date: { $lt: "2024-06-01" } });

// 5. Find rides where distance_km > 10 AND fare > 300
db.rides.find({ distance_km: { $gt: 10 }, fare: { $gt: 300 } });
