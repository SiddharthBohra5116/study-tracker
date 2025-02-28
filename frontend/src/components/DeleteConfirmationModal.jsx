import React from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this topic?</p>
        <div className="modal-buttons">
          <button className="delete-btn" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
