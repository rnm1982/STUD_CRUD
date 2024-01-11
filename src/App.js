// App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [selectedId, setSelectedId] = useState(null); // Track selected student ID for updating

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/students");
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateStudent = async () => {
    try {
      const response = await axios.post("http://localhost:3001/students", {
        name,
        age,
        grade,
      });
      setStudents([...students, response.data]);
      setName("");
      setAge("");
      setGrade("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/students/${id}`);
      const updatedStudents = students.filter((student) => student._id !== id);
      setStudents(updatedStudents);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateStudent = async () => {
    if (!selectedId) return; // Ensure a student is selected for update
    try {
      await axios.patch(`http://localhost:3001/students/${selectedId}`, {
        name,
        age,
        grade,
      });
      const updatedStudents = students.map((student) =>
        student._id === selectedId ? { ...student, name, age, grade } : student
      );
      setStudents(updatedStudents);
      setName("");
      setAge("");
      setGrade("");
      setSelectedId(null); // Clear selected ID after update
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectStudent = (id, name, age, grade) => {
    setSelectedId(id);
    setName(name);
    setAge(age);
    setGrade(grade);
  };

  return (
    <div className="App">
      <h1>Student Management System</h1>
      <form onSubmit={handleCreateStudent}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <button type="submit">Add Student</button>
        <button type="button" onClick={handleUpdateStudent}>
          Update Student
        </button>
      </form>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.age} years old, Grade: {student.grade}
            <button onClick={() => handleDeleteStudent(student._id)}>
              Delete
            </button>
            <button
              onClick={() =>
                handleSelectStudent(
                  student._id,
                  student.name,
                  student.age,
                  student.grade
                )
              }
            >
              Select for Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
