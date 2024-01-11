// app.js

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const studentsRouter = require("./routes/students");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/students", studentsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
