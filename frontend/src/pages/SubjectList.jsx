// File: src/components/SubjectList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Fetch subjects from the backend
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/subjects');
        setSubjects(response.data);  // Set the data to state
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();  // Fetch subjects on component mount
  }, []);

  return (
    <div>
      <h1>Subjects List</h1>
      {subjects.length > 0 ? (
        <ul>
          {subjects.map((subject) => (
            <li key={subject._id}>
              <h2>{subject.name}</h2>
              <p>Total Lectures: {subject.totalLectures}</p>
              <p>Completed Lectures: {subject.completedLectures}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No subjects found.</p>
      )}
    </div>
  );
};

export default SubjectList;
