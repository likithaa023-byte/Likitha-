// 1. Insert 5 wishlist documents with different product categories
db.wishlists.insertMany([
  { wishlist_id: "W001", customer_name: "Aayush", product_name: "Laptop", product_category: "Electronics", price: 50000, added_date: "2026-04-20", notify_when_available: true },
  { wishlist_id: "W002", customer_name: "Sneha", product_name: "Headphones", product_category: "Electronics", price: 1500, added_date: "2026-04-21", notify_when_available: true },
  { wishlist_id: "W003", customer_name: "Rahul", product_name: "T-Shirt", product_category: "Clothing", price: 800, added_date: "2023-12-15", notify_when_available: false },
  { wishlist_id: "W004", customer_name: "Aayush", product_name: "Desk Chair", product_category: "Furniture", price: 3000, added_date: "2026-04-24", notify_when_available: true },
  { wishlist_id: "W005", customer_name: "Vikram", product_name: "Mouse", product_category: "Electronics", price: 800, added_date: "2023-11-01", notify_when_available: false }
]);

// 2. Find items where price is less than 2000 AND notify_when_available is true
db.wishlists.find({ price: { $lt: 2000 }, notify_when_available: true });

// 3. Update price by applying a 20% discount for "Electronics"
db.wishlists.updateMany(
  { product_category: "Electronics" },
  { $mul: { price: 0.8 } }
);

// 4. Delete wishlist items where added_date is before "2024-01-01"
db.wishlists.deleteMany({ added_date: { $lt: "2024-01-01" } });

// 5. Group by customer_name and count how many items each customer has
db.wishlists.aggregate([
  { $group: { _id: "$customer_name", total_items: { $sum: 1 } } }
]);
