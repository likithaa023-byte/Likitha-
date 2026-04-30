// 1. Insert 5 product documents
db.inventory.insertMany([
  { product_id: "WH001", product_name: "Laptop", category: "Electronics", quantity_in_stock: 10, reorder_level: 15, supplier_name: "ABC Corp", last_restock_date: "2026-03-01", storage_location: "A1" }, // Low stock!
  { product_id: "WH002", product_name: "Mouse", category: "Electronics", quantity_in_stock: 50, reorder_level: 20, supplier_name: "TechSupplies", last_restock_date: "2026-04-10", storage_location: "A2" },
  { product_id: "WH003", product_name: "Desk", category: "Furniture", quantity_in_stock: 5, reorder_level: 10, supplier_name: "WoodWorks", last_restock_date: "2025-11-20", storage_location: "B1" }, // Low stock!
  { product_id: "WH004", product_name: "Chair", category: "Furniture", quantity_in_stock: 0, reorder_level: 20, supplier_name: "ABC Corp", last_restock_date: "2021-06-15", storage_location: "B2" }, // Old and Empty
  { product_id: "WH005", product_name: "Keyboard", category: "Electronics", quantity_in_stock: 100, reorder_level: 30, supplier_name: "ABC Corp", last_restock_date: "2026-01-10", storage_location: "A3" }
]);

// 2. Find products where quantity_in_stock is less than reorder_level
db.inventory.find({ 
  $expr: { $lt: ["$quantity_in_stock", "$reorder_level"] } 
});

// 3. Add 100 to quantity_in_stock for all products from "ABC Corp"
db.inventory.updateMany(
  { supplier_name: "ABC Corp" },
  { $inc: { quantity_in_stock: 100 } }
);

// 4. Delete products where last_restock_date < "2022-01-01" AND quantity_in_stock is 0
db.inventory.deleteMany({ last_restock_date: { $lt: "2022-01-01" }, quantity_in_stock: 0 });

// 5. Create a compound index on category and quantity_in_stock
db.inventory.createIndex({ category: 1, quantity_in_stock: 1 });
