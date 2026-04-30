// 1. Create a giftcards collection and insert one document
db.giftcards.insertOne({
  card_id: "GC-001", recipient_name: "Sneha", sender_name: "Rahul", amount: 1000, purchase_date: "2026-04-01", expiry_date: "2026-12-31", is_used: false
});

// 2. Insert 5 gift card records
db.giftcards.insertMany([
  { card_id: "GC-002", recipient_name: "Karthik", sender_name: "Priya", amount: 500, purchase_date: "2026-03-15", expiry_date: "2025-12-31", is_used: true },
  { card_id: "GC-003", recipient_name: "Arun", sender_name: "Amit", amount: 2000, purchase_date: "2026-04-20", expiry_date: "2027-04-20", is_used: false },
  { card_id: "GC-004", recipient_name: "Meena", sender_name: "Sita", amount: 1500, purchase_date: "2026-01-10", expiry_date: "2026-06-30", is_used: false },
  { card_id: "GC-005", recipient_name: "Vikram", sender_name: "John", amount: 3000, purchase_date: "2026-02-14", expiry_date: "2026-02-14", is_used: true },
  { card_id: "GC-006", recipient_name: "Anjali", sender_name: "Ravi", amount: 800, purchase_date: "2026-04-25", expiry_date: "2027-04-25", is_used: false }
]);

// 3. Retrieve all cards where is_used is false AND expiry_date is after today's date
db.giftcards.find({ 
  is_used: false, 
  expiry_date: { $gt: "2026-05-01" } 
});

// 4. Display only recipient_name, amount, and expiry_date
db.giftcards.find({}, { recipient_name: 1, amount: 1, expiry_date: 1, _id: 0 });

// 5. Delete a gift card based on card_id
db.giftcards.deleteOne({ card_id: "GC-002" });
