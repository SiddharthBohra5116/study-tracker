import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

const TopicDetails = () => {
  const { subjectId, topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await fetch(`http://localhost:8080/subjects/${subjectId}/topics/${topicId}`);
        const data = await res.json();
        setTopic(data);
      } catch (error) {
        console.error("Error fetching topic:", error);
      }
    };
    fetchTopic();
  }, [subjectId, topicId]);

  const markAsCompleted = async () => {
    if (topic.completedLectures < topic.totalLectures) {
      try {
        await fetch(`http://localhost:8080/subjects/${subjectId}/topics/${topicId}/complete`, {
          method: "PUT",
        });
        setTopic({ ...topic, completedLectures: topic.completedLectures + 1 });
      } catch (error) {
        console.error("Error updating topic:", error);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this topic?")) {
      try {
        await fetch(`http://localhost:8080/subjects/${subjectId}/topics/${topicId}`, { method: "DELETE" });
        navigate(`/subject/${subjectId}`); // Navigate back to the subject page after deletion
      } catch (error) {
        console.error("Error deleting topic:", error);
      }
    }
  };

  if (!topic) return <h2>Loading...</h2>;

  return (
    <div className="topic-details">
      <h2>{topic.name}</h2>
      <ProgressBar percentage={calculateProgress(topic)} />

      <p>✅ Total Lectures: {topic.totalLectures}</p>
      <p>✅ Completed: {topic.completedLectures}</p>
      <p>🔲 Remaining: {topic.totalLectures - topic.completedLectures}</p>

      <button onClick={markAsCompleted} disabled={topic.completedLectures >= topic.totalLectures}>
        ✔️ Mark as Completed
      </button>
      <button onClick={() => navigate(`/edit-topic/${subjectId}/${topicId}`)}>✏️ Edit</button>
      <button onClick={handleDelete}>❌ Delete</button>
    </div>
  );
};

// Calculate progress for the progress bar
const calculateProgress = (topic) => {
  if (!topic || topic.totalLectures === 0) return 0;
  return Math.round((topic.completedLectures / topic.totalLectures) * 100);
};

export default TopicDetails;
