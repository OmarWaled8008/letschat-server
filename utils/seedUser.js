const mongoose = require("mongoose");
const User = require("../models/User");
const fs = require("fs");
const bcrypt = require("bcrypt");
mongoose
  .connect(
    "mongodb+srv://omar01:jUhpg7aCOSgZ8eEN@cluster0.u1hyk.mongodb.net/chattr?retryWrites=true&w=majority&appName=Cluster0&authMechanism=DEFAULT"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
const data = JSON.parse(
  fs.readFileSync("../jsonDummy/dummyUsers.json", "utf-8")
);
const hashedUsers = data.map((user) => {
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  return { ...user, password: hashedPassword };
});
User.insertMany(hashedUsers)
  .then(() => {
    console.log("Dummy users inserted successfully.");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error inserting dummy users:", err);
    mongoose.disconnect();
  });
