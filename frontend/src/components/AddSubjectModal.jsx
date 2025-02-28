import React, { useState } from "react";

const AddSubjectModal = ({ isOpen, onClose, onAdd }) => {
  const [newSubject, setNewSubject] = useState({ name: "", totalLectures: 0, completedLectures: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSubject({ ...newSubject, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newSubject);
    setNewSubject({ name: "", totalLectures: 0, completedLectures: 0 });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Subject</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Subject Name:
            <input type="text" name="name" value={newSubject.name} onChange={handleChange} required />
          </label>
          <label>
            Total Lectures:
            <input type="number" name="totalLectures" value={newSubject.totalLectures} onChange={handleChange} required />
          </label>
          <label>
            Completed Lectures:
            <input type="number" name="completedLectures" value={newSubject.completedLectures} onChange={handleChange} required />
          </label>
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddSubjectModal;
