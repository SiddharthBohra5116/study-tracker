import React from "react";

const EditTopicModal = ({ isOpen, onClose, topic, onEdit }) => {
  const [editingTopic, setEditingTopic] = React.useState(topic || { name: "", totalLectures: 0, completedLectures: 0 });

  React.useEffect(() => {
    setEditingTopic(topic);
  }, [topic]);




  const handleSubmit = (e) => {
    if (e) {
        e.preventDefault();
    }
    
    onClose(); // Close the modal first
    
    setTimeout(() => {
        setEditingTopic((prevTopic) => {
            onEdit({ ...prevTopic }); // Update the parent state after modal is closed
            return prevTopic; // Keep state consistent
        });
    }, 0);
};



  if (!isOpen || !editingTopic) return null;



  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Topic</h3>
        <form onSubmit={handleSubmit}>
          <label>Topic Name</label>
          <input
            type="text"
            value={editingTopic.name}
            onChange={(e) => setEditingTopic({ ...editingTopic, name: e.target.value })}
            required
          />
          <label>Total Lectures</label>
          <input
            type="number"
            value={editingTopic.totalLectures || 0}

            onChange={(e) => setEditingTopic({ ...editingTopic, totalLectures: parseInt(e.target.value) })}
            required
          />
          <label>Completed Lectures</label>
          <input
            type="number"
            value={editingTopic.completedLectures || 0}

            onChange={(e) => setEditingTopic({ ...editingTopic, completedLectures: parseInt(e.target.value) })}
            required
          />
          <button type="submit">Save Changes</button>
        </form>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default EditTopicModal;
