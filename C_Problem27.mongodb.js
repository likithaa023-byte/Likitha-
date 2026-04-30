// 1. Insert 5 feedback documents with different ratings
db.feedback.insertMany([
  { feedback_id: "F001", guest_name: "Aayush", hotel_name: "Grand Palace", room_number: 101, stay_dates: "2026-04-10 to 2026-04-12", cleanliness_rating: 5, service_rating: 4, overall_rating: 5, comments: "Loved it!", feedback_date: "2026-04-13", would_recommend: true },
  { feedback_id: "F002", guest_name: "Sneha", hotel_name: "Sea View Inn", room_number: 205, stay_dates: "2026-03-01 to 2026-03-05", cleanliness_rating: 2, service_rating: 1, overall_rating: 2, comments: "Terrible service.", feedback_date: "2026-03-06", would_recommend: false },
  { feedback_id: "F003", guest_name: "Rahul", hotel_name: "Grand Palace", room_number: 304, stay_dates: "2022-12-10 to 2022-12-15", cleanliness_rating: 1, service_rating: 2, overall_rating: 1, comments: "Very dirty.", feedback_date: "2022-12-16", would_recommend: false },
  { feedback_id: "F004", guest_name: "Priya", hotel_name: "City Center Hotel", room_number: 402, stay_dates: "2026-04-20 to 2026-04-22", cleanliness_rating: 5, service_rating: 5, overall_rating: 5, comments: "Perfect stay.", feedback_date: "2026-04-23", would_recommend: false }, // Will be updated to true!
  { feedback_id: "F005", guest_name: "Vikram", hotel_name: "Sea View Inn", room_number: 105, stay_dates: "2026-01-10 to 2026-01-12", cleanliness_rating: 4, service_rating: 3, overall_rating: 3, comments: "Okay stay.", feedback_date: "2026-01-13", would_recommend: true }
]);

// 2. Find feedback where overall_rating < 3 AND would_recommend is false
db.feedback.find({ overall_rating: { $lt: 3 }, would_recommend: false });

// 3. Update would_recommend to true where overall_rating > 4
db.feedback.updateMany(
  { overall_rating: { $gt: 4 } },
  { $set: { would_recommend: true } }
);

// 4. Delete feedback where feedback_date < "2023-01-01" AND overall_rating is 1
db.feedback.deleteMany({ feedback_date: { $lt: "2023-01-01" }, overall_rating: 1 });

// 5. Aggregate average cleanliness_rating and service_rating per hotel_name
db.feedback.aggregate([
  { $group: { 
      _id: "$hotel_name", 
      avg_cleanliness: { $avg: "$cleanliness_rating" }, 
      avg_service: { $avg: "$service_rating" } 
  }}
]);