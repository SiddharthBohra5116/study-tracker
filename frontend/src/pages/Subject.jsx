import React, { useEffect, useState } from "react";
import TopicTable from "../components/TopicTable";
import AddTopicModal from "../components/AddTopicModal";
import EditTopicModal from "../components/EditTopicModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

import { useParams } from "react-router-dom";
import { getSubjectById } from "../api/subjectApi";
import { updateTopic, deleteTopic, createTopic } from "../api/topicsApi";

import CircularProgressBar from "../components/ProgressBar";
import "../css/Subject.css";
import "../css/table.css"

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

const handleDeleteConfirm = async () => {
    await deleteTopic(subject._id, selectedTopicId); // Ensure subject ID is passed

    const updatedTopics = subject.topics.filter(topic => topic._id !== selectedTopicId);
    setSubject({ ...subject, topics: updatedTopics });
    console.log("Updated Topics:", updatedTopics); // Log updated topics
    const newTotalLectures = updatedTopics.reduce((total, topic) => total + topic.totalLectures, 0); // Calculate new total lectures count
    console.log("New Total Lectures:", newTotalLectures); // Log new total lectures
    setTotalLectures(newTotalLectures); // Update total lectures count
    setIsDeleteModalOpen(false);
    setTimeout(() => {
    setTimeout(() => {
        console.log("Total Lectures after deletion:", totalLectures); // Log total lectures after deletion
    }, 0);

    }, 0);





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
        const response = await createTopic(subject._id, newTopic);
        if (response.success) {
            const updatedTopics = [...subject.topics, response.topic]; // Add the new topic to the existing topics
            setSubject({ ...subject, topics: updatedTopics }); // Update the subject state with the new topic
            updateLectureCounts({ topics: updatedTopics }); // Update total lectures after adding
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

      <TopicTable 
        topics={subject.topics} 
        onIncrease={handleIncrease} 
        onEdit={handleEdit} 
        onDelete={handleDeleteClick} 
      />

      <AddTopicModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddTopic} 
      />
      <EditTopicModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        topic={editingTopic} 
        onEdit={handleEditSubmit} 
      />
      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleDeleteConfirm} 
      />
    </div>
  );
};

export default Subject;
