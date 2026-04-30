// 1. Insert 5 playlist documents with different songs arrays
db.playlists.insertMany([
  { playlist_id: "PL001", user_name: "Aayush", playlist_name: "Workout Mix", songs: [{ title: "Stronger", artist: "Kanye" }, { title: "Eye of the Tiger", artist: "Survivor" }], created_date: "2026-04-10", total_duration_minutes: 45, is_public: true, play_count: 150 },
  { playlist_id: "PL002", user_name: "Sneha", playlist_name: "Chill Vibes", songs: [{ title: "Sunset", artist: "The Midnight" }], created_date: "2026-04-20", total_duration_minutes: 60, is_public: true, play_count: 50 },
  { playlist_id: "PL003", user_name: "Aayush", playlist_name: "Coding Focus", songs: [{ title: "Lofi Study", artist: "Lofi Girl" }], created_date: "2022-11-15", total_duration_minutes: 120, is_public: false, play_count: 300 },
  { playlist_id: "PL004", user_name: "Rahul", playlist_name: "Party Anthems", songs: [{ title: "Uptown Funk", artist: "Bruno Mars" }, { title: "Happy", artist: "Pharrell" }], created_date: "2026-01-05", total_duration_minutes: 90, is_public: true, play_count: 500 },
  { playlist_id: "PL005", user_name: "Vikram", playlist_name: "Sleep Sounds", songs: [{ title: "Rain", artist: "Nature" }], created_date: "2022-05-20", total_duration_minutes: 480, is_public: false, play_count: 20 }
]);

// 2. Find playlists where is_public is true AND play_count > 100
db.playlists.find({ is_public: true, play_count: { $gt: 100 } });

// 3. Update play_count by incrementing it by 1 for a specific playlist
db.playlists.updateOne(
  { playlist_id: "PL001" },
  { $inc: { play_count: 1 } }
);

// 4. Delete playlists where created_date < "2023-01-01" AND is_public is false
db.playlists.deleteMany({ created_date: { $lt: "2023-01-01" }, is_public: false });

// 5. Use aggregation to find average total_duration_minutes per user
db.playlists.aggregate([
  { $group: { _id: "$user_name", average_duration: { $avg: "$total_duration_minutes" } } }
]);
