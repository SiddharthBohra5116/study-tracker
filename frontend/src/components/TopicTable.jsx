import React from "react";
import { ArrowUp, Pencil, Trash2 } from "lucide-react";

const TopicTable = ({ topics, onIncrease, onEdit, onDelete }) => {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Topic Name</th>
          <th>Total Lectures</th>
          <th>Completed Lectures</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {topics.map((topic) => (
          <tr key={topic._id}>
            <td>{topic.name}</td>
            <td>{topic.totalLectures}</td>
            <td>{topic.completedLectures}</td>
            <td>
              <button onClick={() => onIncrease(topic._id)} className="table-btn arrow-btn">
                <ArrowUp size={20} />
              </button>
              <button onClick={() => onEdit(topic)} className="table-btn edit-btn">
                <Pencil size={20} />
              </button>
              <button onClick={() => onDelete(topic._id)} className="table-btn delete-btn">
                <Trash2 size={20} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TopicTable;
