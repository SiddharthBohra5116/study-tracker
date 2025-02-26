import { useEffect, useState } from "react";

const DailyTargets = () => {
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const res = await fetch("http://localhost:8080/dailytargets");
        const data = await res.json();
        setTargets(data);
      } catch (error) {
        console.error("Error fetching daily targets:", error);
      }
    };
    fetchTargets();
  }, []);

  const markCompleted = async (targetId) => {
    try {
      await fetch(`http://localhost:8080/dailytargets/${targetId}/complete`, { method: "PUT" });
      setTargets(targets.map((target) =>
        target.id === targetId ? { ...target, completed: target.completed + 1 } : target
      ));
    } catch (error) {
      console.error("Error updating daily target:", error);
    }
  };

  return (
    <div className="daily-targets">
      <h2>🎯 Daily Targets</h2>
      <ul>
        {targets.map((target) => (
          <li key={target.id}>
            {target.subject} - {target.topic} ({target.completed}/{target.total})  
            <button onClick={() => markCompleted(target.id)}>✔️ Mark as Completed</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyTargets;
