// Home.jsx
import React, { useEffect, useState } from "react";
import CircularProgressBar from "../components/ProgressBar"; // import the progress bar
import { getSubjects } from "../api/subjectApi"; // API call to fetch subjects
const Home = () => {
  const [subjects, setSubjects] = useState([]);
  const [totalLectures, setTotalLectures] = useState(0); // total lectures across all subjects
  const [completedLectures, setCompletedLectures] = useState(0); // completed lectures across all subjects

  // Fetch subjects and calculate total and completed lectures
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects(); // Fetch subjects data
        setSubjects(data);

        // Calculate total and completed lectures
        let total = 0;
        let completed = 0;
        data.forEach((subject) => {
          total += subject.totalLectures;
          completed += subject.completedLectures;
        });

        setTotalLectures(total);
        setCompletedLectures(completed);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Circular Progress Bar for lectures completion */}
      {totalLectures > 0 && (
        <CircularProgressBar
          completed={completedLectures}
          total={totalLectures}
        />
      )}

      {/* Subject List */}
      <h2>Subjects List</h2>
      
        {subjects.map((subject) => (
          <div>
            <button key={subject.Id} >{subject.name}</button><br />
          </div>
        ))}
      
    </div>
  );
  
};

export default Home;
