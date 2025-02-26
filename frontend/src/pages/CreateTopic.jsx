import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CreateTopic = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState({
    name: "",
    totalLectures: 0,
    completedLectures: 0,
  });

  const handleChange = (e) => {
    setTopic({ ...topic, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/subjects/${subjectId}/topics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(topic),
      });

      if (res.ok) {
        navigate(`/subject/${subjectId}`);
      } else {
        console.error("Error creating topic");
      }
    } catch (error) {
      console.error("Error creating topic:", error);
    }
  };

  return (
    <div className="create-topic">
      <h2>📝 Create New Topic</h2>
      <form onSubmit={handleSubmit}>
        <label>Topic Name:</label>
        <input
          type="text"
          name="name"
          value={topic.name}
          onChange={handleChange}
          required
        />

        <label>Total Lectures:</label>
        <input
          type="number"
          name="totalLectures"
          value={topic.totalLectures}
          onChange={handleChange}
          required
        />

        <label>Completed Lectures:</label>
        <input
          type="number"
          name="completedLectures"
          value={topic.completedLectures}
          onChange={handleChange}
          required
        />

        <button type="submit">➕ Create Topic</button>
      </form>
    </div>
  );
};

export default CreateTopic;
