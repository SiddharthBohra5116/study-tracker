import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgressBar from "../components/ProgressBar";
import { getSubjects } from "../api/subjectApi";
import { Eye , Pencil, Trash2 } from "lucide-react";
import "../css/table.css";

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
      <button
        style={{ marginLeft: "10px" }}
      >
        ➕ Add Subject
      </button>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Total Lectures</th>
            <th>Completed Lectures</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject._id}>
              <td>{subject.name}</td>
              <td>{subject.totalLectures}</td>
              <td>{subject.completedLectures}</td>
              <td>
                <button className="table-btn arrow-btn" onClick={() => navigate(`/subject/${subject._id}`)}>
                  <Eye />
                </button>
                <button className="table-btn edit-btn">
                <Pencil/>
                </button>
                <button className="table-btn delete-btn">
                  <Trash2/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
