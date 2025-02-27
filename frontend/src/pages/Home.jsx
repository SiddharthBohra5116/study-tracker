import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgressBar from "../components/ProgressBar";
import { getSubjects } from "../api/subjectApi";

const Home = () => {
  const [subjects, setSubjects] = useState([]);
  const [totalLectures, setTotalLectures] = useState(0);
  const [completedLectures, setCompletedLectures] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
        console.log(data)
        console.log(subjects)
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

      {totalLectures > 0 && (
        <CircularProgressBar completed={completedLectures} total={totalLectures} />
      )}

      <h2>Subjects</h2>
      {subjects.map((subject) => (
        <div key={subject.Id}>
          <button onClick={() => navigate(`/subject/${subject._id}`)}>
            {subject.name}
          </button>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Home;
