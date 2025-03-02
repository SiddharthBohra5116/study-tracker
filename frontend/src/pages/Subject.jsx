import React, { useEffect, useState } from "react";
import TopicTable from "../components/TopicTable";
import AddTopicModal from "../components/AddTopicModal";
import EditTopicModal from "../components/EditTopicModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

import { useParams } from "react-router-dom";
import { getSubjectById, updateSubject } from "../api/subjectApi";
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
    try {
        const subjectId = subject?._id; // Ensure subjectId is defined

        if (!subjectId) {
            console.error("Error: subjectId is undefined");
            return;
        }

        const updatedTopics = subject.topics.map((topic) => {
            if (topic._id === topicId && topic.completedLectures < topic.totalLectures) {
                return { ...topic, completedLectures: topic.completedLectures + 1 };
            }
            return topic;
        });

        setSubject({ ...subject, topics: updatedTopics });
        updateLectureCounts({ topics: updatedTopics });

        const updatedTopic = updatedTopics.find((t) => t._id === topicId);
        
        if (updatedTopic && updatedTopic.completedLectures <= updatedTopic.totalLectures) {
            await updateTopic(subjectId, topicId, {
                completedLectures: updatedTopic.completedLectures,
            });
        }

        // Calculate total and completed lectures for the subject
        const totalLectures = updatedTopics.reduce((sum, topic) => sum + topic.totalLectures, 0);
        const completedLectures = updatedTopics.reduce((sum, topic) => sum + topic.completedLectures, 0);

        // Update the subject in the database
        await updateSubject(subjectId, {
            name: subject.name, // Keep the subject name
            totalLectures,
            completedLectures,
        });

    } catch (error) {
        console.error("Error updating topic:", error);
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
    const deletedTopic = subject.topics.find(topic => topic._id === selectedTopicId); // Find the topic being deleted
    const newTotalLectures = totalLectures - (deletedTopic ? deletedTopic.totalLectures : 0); // Subtract the deleted topic's total lectures
    setTotalLectures(newTotalLectures); // Update total lectures count
    setIsDeleteModalOpen(false);
    // Update the subject in the database
    await updateSubject(subject._id, {
      name: subject.name, // Include the subject name
      totalLectures: newTotalLectures,
      completedLectures: completedLectures,
    });

    
  };

  const handleEdit = (topic) => {
    setEditingTopic(topic);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (updatedTopic) => {
    const updatedTopics = subject.topics.map((topic) =>
      topic._id === updatedTopic._id ? updatedTopic : topic
    );

    setSubject({ ...subject, topics: updatedTopics });
    updateLectureCounts({ topics: updatedTopics }); // Recalculate after editing
    setIsModalOpen(false);

    try {
        await updateTopic(subject._id, updatedTopic._id, updatedTopic);
    } catch (error) {
        console.error("Error updating topic:", error);
    }

    const newTotalLectures = updatedTopics.reduce((total, topic) => total + topic.totalLectures, 0);
    const newCompletedLectures = updatedTopics.reduce((total, topic) => total + topic.completedLectures, 0);
    
    setTotalLectures(newTotalLectures);
    setCompletedLectures(newCompletedLectures);

    await updateSubject(subject._id, {
      name: subject.name,
      totalLectures: newTotalLectures,
      completedLectures: newCompletedLectures,
    });
};  


const handleAddTopic = async (newTopic) => {
  try {
      const subjectId = subject?._id; 
      if (!subjectId) return;

      const response = await createTopic(subjectId, newTopic);
      
      if (response.topic) {
          const updatedTopics = [...subject.topics, response.topic];

          setSubject((prevSubject) => ({
              ...prevSubject,
              topics: updatedTopics
          }));

          const totalLectures = updatedTopics.reduce((sum, topic) => sum + (topic.totalLectures || 0), 0);
          const completedLectures = updatedTopics.reduce((sum, topic) => sum + (topic.completedLectures || 0), 0);

          updateLectureCounts({ topics: updatedTopics });

          await updateSubject(subjectId, {
              name: subject.name,
              totalLectures,
              completedLectures,
          });

      } else {
          console.error("❌ Failed to add topic:", response);
      }
  } catch (error) {
      console.error("❌ Error adding topic:", error);
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
      {subject.topics.length === 0 && (
        <div>
          <p style={{ fontSize: "18px", fontWeight: "bold", color: "red" }}>
            No topics available. Please add a topic.
          </p>
        </div>
      )}
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
