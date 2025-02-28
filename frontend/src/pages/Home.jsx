import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgressBar from "../components/ProgressBar";
import { getSubjects } from "../api/subjectApi";
import { Eye, Pencil, Trash2 } from "lucide-react";
import "../css/table.css";
import AddSubjectModal from "../components/AddSubjectModal";
import EditSubjectModal from "../components/EditSubjectModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const Home = () => {
  const [subjects, setSubjects] = useState([]);
  const [totalLectures, setTotalLectures] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  const [completedLectures, setCompletedLectures] = useState(0);

  const handleAddSubject = async (newSubject) => {
    try {
      const response = await createSubject(newSubject); // Assuming createSubject is defined in subjectApi.js
      if (response.success) {
        setSubjects([...subjects, response.subject]);
      }
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  const handleEditSubject = async (updatedSubject) => {
    try {
      const response = await updateSubject(updatedSubject._id, updatedSubject); // Assuming updateSubject is defined in subjectApi.js
      if (response.success) {
        const updatedSubjects = subjects.map((subject) =>
          subject._id === updatedSubject._id ? updatedSubject : subject
        );
        setSubjects(updatedSubjects);
      }
    } catch (error) {
      console.error("Error editing subject:", error);
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    try {
      const response = await deleteSubject(subjectId); // Assuming deleteSubject is defined in subjectApi.js
      if (response.success) {
        const updatedSubjects = subjects.filter(
          (subject) => subject._id !== subjectId
        );
        setSubjects(updatedSubjects);
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  const handleDeleteClick = (subjectId) => {
    setSelectedSubjectId(subjectId);
    setIsDeleteModalOpen(true);
  };

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
        <CircularProgressBar
          completed={completedLectures}
          total={totalLectures}
        />
      )}

      <h2>Subjects</h2>
      <button
        onClick={() => setIsAddModalOpen(true)}
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
                <button
                  className="table-btn arrow-btn"
                  onClick={() => navigate(`/subject/${subject._id}`)}
                >
                  <Eye />
                </button>
                <button
                  className="table-btn edit-btn"
                  onClick={() => {
                    setEditingSubject(subject);
                    setIsEditModalOpen(true);
                  }}
                >
                  <Pencil />
                </button>
                <button
                  className="table-btn delete-btn"
                  onClick={() => handleDeleteClick(subject._id)}
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddSubjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSubject}
      />
      <EditSubjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        subject={editingSubject}
        onEdit={handleEditSubject}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDeleteSubject(selectedSubjectId)} // Pass the selected subject ID
      />
    </div>
  );
};

export default Home;
