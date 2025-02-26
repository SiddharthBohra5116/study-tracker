import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditTopic = () => {
  const { subjectId, topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState({ name: "", totalLectures: 0, completedLectures: 0 });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:8080/subjects/${subjectId}/topics/${topicId}`);
        const data = await res.json();
        setTopic(data);
      } catch (error) {
        setError("Error fetching topic data.");
        console.error("Error fetching topic:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopic();
  }, [subjectId, topicId]);

  const handleChange = (e) => {
    setTopic({ ...topic, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (topic.completedLectures > topic.totalLectures) {
      setError("Completed lectures cannot exceed total lectures.");
      return;
    }

    try {
      setIsLoading(true);
      await fetch(`http://localhost:8080/subjects/${subjectId}/topics/${topicId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(topic),
      });
      navigate(`/subject/${subjectId}/topic/${topicId}`);
    } catch (error) {
      setError("Error updating topic.");
      console.error("Error updating topic:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="edit-topic">
      <h2>✏️ Edit Topic</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
          min="1"
        />

        <label>Completed Lectures:</label>
        <input
          type="number"
          name="completedLectures"
          value={topic.completedLectures}
          onChange={handleChange}
          required
          min="0"
        />

        <button type="submit">💾 Save Changes</button>
      </form>
    </div>
  );
};

export default EditTopic;
