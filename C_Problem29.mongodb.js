// 1. Insert 5 follower documents with different interests arrays
db.followers.insertMany([
  { follower_id: "USR001", follower_name: "Aayush", followed_since: "2025-01-15", engagement_score: 95, is_active: true, location: "Bangalore", interests: ["Coding", "Music", "Gaming"], last_interaction_date: "2026-04-25" },
  { follower_id: "USR002", follower_name: "Sneha", followed_since: "2021-06-10", engagement_score: 15, is_active: false, location: "Mumbai", interests: ["Travel", "Food"], last_interaction_date: "2021-12-01" },
  { follower_id: "USR003", follower_name: "Rahul", followed_since: "2026-02-20", engagement_score: 85, is_active: true, location: "Delhi", interests: ["Coding", "Tech", "Movies"], last_interaction_date: "2026-04-20" },
  { follower_id: "USR004", follower_name: "Vikram", followed_since: "2024-08-05", engagement_score: 40, is_active: true, location: "Chennai", interests: ["Gaming", "Sports"], last_interaction_date: "2024-11-15" },
  { follower_id: "USR005", follower_name: "Priya", followed_since: "2023-03-12", engagement_score: 90, is_active: true, location: "Pune", interests: ["Music", "Coding", "Art"], last_interaction_date: "2026-04-24" }
]);

// 2. Find followers where engagement_score > 80 AND is_active is true
db.followers.find({ engagement_score: { $gt: 80 }, is_active: true });

// 3. Update is_active to false where last_interaction_date < "2025-01-01"
db.followers.updateMany(
  { last_interaction_date: { $lt: "2025-01-01" } },
  { $set: { is_active: false } }
);

// 4. Delete followers where followed_since < "2022-01-01" AND engagement_score < 20
db.followers.deleteMany({ followed_since: { $lt: "2022-01-01" }, engagement_score: { $lt: 20 } });

// 5. Use $unwind to find the most common interest among followers
db.followers.aggregate([
  { $unwind: "$interests" },
  { $group: { _id: "$interests", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);
