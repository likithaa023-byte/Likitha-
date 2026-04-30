// 1. Create an expenses collection and insert one expense
db.expenses.insertOne({
  expense_id: "E001",
  category: "Food",
  amount: 350,
  date: "2026-04-25",
  payment_method: "UPI",
  note: "Lunch at cafe"
});

// 2. Insert 5 expenses with different categories
db.expenses.insertMany([
  { expense_id: "E002", category: "Transport", amount: 600, date: "2026-04-24", payment_method: "Cash", note: "Cab to work" },
  { expense_id: "E003", category: "Entertainment", amount: 1200, date: "2026-04-23", payment_method: "Card", note: "Movie tickets" },
  { expense_id: "E004", category: "Bills", amount: 2500, date: "2026-04-22", payment_method: "UPI", note: "Internet bill" },
  { expense_id: "E005", category: "Food", amount: 450, date: "2026-04-21", payment_method: "Cash", note: "Groceries" },
  { expense_id: "E006", category: "Transport", amount: 150, date: "2026-04-20", payment_method: "UPI", note: "Metro card recharge" }
]);

// 3. Retrieve all expenses with amount greater than 500
db.expenses.find({ amount: { $gt: 500 } });

// 4. Display only category, amount, and date using projection
db.expenses.find({}, { category: 1, amount: 1, date: 1, _id: 0 });

// 5. Delete an expense based on expense_id
db.expenses.deleteOne({ expense_id: "E001" });
