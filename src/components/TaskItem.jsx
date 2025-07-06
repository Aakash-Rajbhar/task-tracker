import React from "react";

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <div
      className={`p-4 border rounded flex justify-between items-start mb-2 ${
        task.completed ? "bg-green-100" : "bg-white"
      }`}
    >
      <div className="flex-1">
        <h3
          className={`text-lg font-semibold ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-xs text-gray-400 mt-1">
          Created At: {new Date(task.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="flex flex-col gap-1 ml-4">
        <button
          onClick={() => onToggle(task.id)}
          className="text-xs text-white bg-blue-500 px-2 py-1 rounded"
        >
          {task.completed ? "Mark Pending" : "Mark Done"}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="text-xs bg-yellow-400 px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
