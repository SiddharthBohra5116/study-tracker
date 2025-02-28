import React, { useState } from "react";

const AddTopicModal = ({ isOpen, onClose, onAdd }) => {
  const [newTopic, setNewTopic] = useState({ name: "", totalLectures: 0, completedLectures: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newTopic);
    setNewTopic({ name: "", totalLectures: 0, completedLectures: 0 });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Topic</h3>
        <form onSubmit={handleSubmit}>
          <label>Topic Name</label>
          <input
            type="text"
            value={newTopic.name}
            onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
            required
          />
          <label>Total Lectures</label>
          <input
            type="number"
            value={newTopic.totalLectures}
            onChange={(e) => setNewTopic({ ...newTopic, totalLectures: parseInt(e.target.value) })}
            required
          />
          <button type="submit">Add Topic</button>
        </form>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default AddTopicModal;
