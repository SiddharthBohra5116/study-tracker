import React, { useState, useEffect } from "react";

const EditSubjectModal = ({ isOpen, onClose, subject, onEdit }) => {
  const [editingSubject, setEditingSubject] = useState(subject);

  useEffect(() => {
    setEditingSubject(subject);
  }, [subject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingSubject({ ...editingSubject, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editingSubject);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Subject</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Subject Name:
            <input
              type="text"
              name="name"
              value={editingSubject ? editingSubject.name : ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Total Lectures:
            <input
              type="number"
              name="totalLectures"
              value={editingSubject ? editingSubject.totalLectures : 0}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Completed Lectures:
            <input
              type="number"
              name="completedLectures"
              value={editingSubject ? editingSubject.completedLectures : 0}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
        <button className="close-btn" type="button" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default EditSubjectModal;
