import React, { useEffect, useState } from "react";
import { getTargets, createDailyTarget, updateTarget, deleteTarget } from "../api/dailyTargetApi";
import CircularProgressBar from "../components/ProgressBar";
import { Check , Pencil, Trash2 } from "lucide-react";
import "../css/Target.css"; // Import the CSS file

const DailyTargetList = () => {
  const [targets, setTargets] = useState([]);
  const [newTask, setNewTask] = useState(""); 
  const [editTaskId, setEditTaskId] = useState(null); 
  const [editTaskText, setEditTaskText] = useState(""); 

  useEffect(() => {
    fetchTargets();
  }, []);

  const fetchTargets = async () => {
    try {
      const response = await getTargets();
      setTargets(response);
    } catch (error) {
      console.error("Error fetching targets:", error);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      await createDailyTarget({ targetName: newTask, completed: false });
      setNewTask("");
      fetchTargets();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await updateTarget(id, { completed: !completed });
      fetchTargets();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setEditTaskText(task.targetName);
  };

  const handleSaveEdit = async (id) => {
    try {
      await updateTarget(id, { targetName: editTaskText });
      setEditTaskId(null);
      fetchTargets();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTarget(id);
        fetchTargets();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const completedTasksCount = targets.filter((t) => t.completed).length;
  const totalTasksCount = targets.length;

  return (
    <div className="container">
      <h1>Daily Targets</h1>

      {totalTasksCount > 0 && (
        <CircularProgressBar completed={completedTasksCount} total={totalTasksCount} />
      )}

      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task..."
          className="input"
        />
        <button onClick={handleAddTask} className="add-button">Add</button>
      </div>

      <ul className="task-list">
        {targets.map((task) => (
          <li key={task._id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task._id, task.completed)}
            />

            {editTaskId === task._id ? (
              <input
                type="text"
                value={editTaskText}
                onChange={(e) => setEditTaskText(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span className={task.completed ? "completed-task" : ""}>
                {task.targetName}
              </span>
            )}

            {editTaskId === task._id ? (
              <button onClick={() => handleSaveEdit(task._id)} className="save-button">
                <Check/>
              </button>
            ) : (
              <button onClick={() => handleEdit(task)} className="btn edit-btn">
                <Pencil />
              </button>
            )}
            <button onClick={() => handleDelete(task._id)} className="btn delete-btn">
              <Trash2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyTargetList;
