// 1. Create contacts collection and insert one contact
db.contacts.insertOne({
  contact_id: "C001",
  first_name: "Aayush",
  last_name: "Menon",
  phone: "9876543210",
  email: "aayush@example.com",
  city: "Bangalore"
});

// 2. Insert 5 contact records
db.contacts.insertMany([
  { contact_id: "C002", first_name: "Rahul", last_name: "Sharma", phone: "9876543211", email: "rahul@example.com", city: "Mumbai" },
  { contact_id: "C003", first_name: "Priya", last_name: "Singh", phone: "9876543212", email: "priya@example.com", city: "Delhi" },
  { contact_id: "C004", first_name: "Karan", last_name: "Patel", phone: "9876543213", email: "karan@example.com", city: "Mumbai" },
  { contact_id: "C005", first_name: "Neha", last_name: "Gupta", phone: "9876543214", email: "neha@example.com", city: "Chennai" },
  { contact_id: "C006", first_name: "Vikram", last_name: "Rao", phone: "9876543215", email: "vikram@example.com", city: "Mumbai" }
]);


// 3. Retrieve all contacts from "Mumbai"
db.contacts.find({ city: "Mumbai" });

// 4. Display only first_name, last_name, and phone
db.contacts.find({}, { first_name: 1, last_name: 1, phone: 1, _id: 0 });

// 5. Delete a contact based on contact_id
db.contacts.deleteOne({ contact_id: "C005" });
