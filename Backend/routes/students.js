// routes/students.js

const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a student
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a student
router.patch("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
