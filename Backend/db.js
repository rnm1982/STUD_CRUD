// db.js

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/studentsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
  // Start your server or define routes here
});
