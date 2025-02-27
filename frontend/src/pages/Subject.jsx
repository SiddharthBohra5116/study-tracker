import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubjectById } from "../api/subjectApi";
import { updateTopic, deleteTopic } from "../api/topicsApi";
import CircularProgressBar from "../components/ProgressBar";
import { ArrowUp, Pencil, Trash2 } from "lucide-react";
import "../css/Subject.css";

const Subject = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState();
  const [totalLectures, setTotalLectures] = useState(0);
  const [completedLectures, setCompletedLectures] = useState(0);
  const [editingTopic, setEditingTopic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [newTopic, setNewTopic] = useState({ name: "", totalLectures: 0, completedLectures: 0 });

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const data = await getSubjectById(id);
        setSubject(data);
        updateLectureCounts(data);
      } catch (error) {
        console.error("Error fetching subject:", error);
      }
    };
    fetchSubject();
  }, []);

  const updateLectureCounts = (data) => {
    let total = 0,
      completed = 0;
    data.topics.forEach((topic) => {
      total += topic.totalLectures;
      completed += topic.completedLectures;
    });
    setTotalLectures(total);
    setCompletedLectures(completed);
  };

  const handleIncrease = async (topicId) => {
    const updatedTopics = subject.topics.map((topic) => {
      if (topic._id === topicId) {
        if (topic.completedLectures < topic.totalLectures) {
          return { ...topic, completedLectures: topic.completedLectures + 1 };
        }
      }
      return topic;
    });

    setSubject({ ...subject, topics: updatedTopics });
    updateLectureCounts({ topics: updatedTopics });
    const updatedTopic = updatedTopics.find((t) => t._id === topicId);
    if (
      updatedTopic &&
      updatedTopic.completedLectures <= updatedTopic.totalLectures
    ) {
      await updateTopic(topicId, {
        completedLectures: updatedTopic.completedLectures,
      });
    }
  };

  const handleDeleteClick = (topicId) => {
    setSelectedTopicId(topicId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteTopic(selectedTopicId);
    setIsDeleteModalOpen(false);
  };
  const handleEdit = (topic) => {
    setEditingTopic(topic);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedTopics = subject.topics.map((topic) =>
      topic._id === editingTopic._id ? editingTopic : topic
    );
    setSubject({ ...subject, topics: updatedTopics });
    updateLectureCounts({ topics: updatedTopics });
    setIsModalOpen(false);
    await updateTopic(editingTopic._id, editingTopic);
  };

  const handleAddTopic = async (newTopic) => {
    try {
      const response = await addTopic(subject._id, newTopic);
      if (response.success) {
        // Fetch updated data from backend and update state
        const updatedSubject = await fetchSubject(subject._id);
        setSubject(updatedSubject);
      }
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  if (!subject) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <h1>{subject.name}</h1>
      {totalLectures > 0 && (
        <CircularProgressBar
          completed={completedLectures}
          total={totalLectures}
        />
      )}
      <h2>Topics</h2>
      <button
        onClick={() => setIsAddModalOpen(true)}
        style={{ marginLeft: "10px" }}
      >
        ➕ Add Topic
      </button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Topic Name</th>
            <th>Total Lectures</th>
            <th>Completed Lectures</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subject.topics.map((topic) => (
            <tr key={topic._id}>
              <td>{topic.name}</td>
              <td>{topic.totalLectures}</td>
              <td>{topic.completedLectures}</td>
              <td>
                <button
                  onClick={() => handleIncrease(topic._id)}
                  className="table-btn arrow-btn"
                >
                  <ArrowUp size={20} />
                </button>
                <button
                  onClick={() => handleEdit(topic)}
                  className="table-btn edit-btn"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => handleDeleteClick(topic._id)}
                  className="table-btn delete-btn"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Topic</h3>
            <form onSubmit={handleAddTopic}>
              <label>Topic Name</label>
              <input
                type="text"
                value={newTopic.name}
                onChange={(e) =>
                  setNewTopic({ ...newTopic, name: e.target.value })
                }
                required
              />
              <label>Total Lectures</label>
              <input
                type="number"
                value={newTopic.totalLectures}
                onChange={(e) =>
                  setNewTopic({
                    ...newTopic,
                    totalLectures: parseInt(e.target.value),
                  })
                }
                required
              />
              <button type="submit">Add Topic</button>
            </form>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              ✖
            </button>
            <h3>Edit Topic</h3>
            <form onSubmit={handleEditSubmit}>
              <label>Topic Name</label>
              <input
                type="text"
                value={editingTopic.name}
                onChange={(e) =>
                  setEditingTopic({ ...editingTopic, name: e.target.value })
                }
                required
              />
              <label>Total Lectures</label>
              <input
                type="number"
                value={editingTopic.totalLectures}
                onChange={(e) =>
                  setEditingTopic({
                    ...editingTopic,
                    totalLectures: parseInt(e.target.value),
                  })
                }
                required
              />
              <label>Completed Lectures</label>
              <input
                type="number"
                value={editingTopic.completedLectures}
                onChange={(e) =>
                  setEditingTopic({
                    ...editingTopic,
                    completedLectures: parseInt(e.target.value),
                  })
                }
                required
              />
              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this topic?</p>
            <div className="modal-buttons">
              <button className="delete-btn" onClick={handleDeleteConfirm}>
                Yes, Delete
              </button>
              <button
                className="cancel-btn"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subject;
