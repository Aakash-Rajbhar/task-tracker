import React from "react";

const TaskList = ({ tasks, onEdit, onDelete, onToggle }) => {
  const getPriorityStyle = (level) => {
    const base = "px-2 py-1 text-xs rounded-full font-medium";
    switch (level) {
      case "High":
        return `${base} bg-red-100 text-red-700 `;
      case "Medium":
        return `${base} bg-yellow-100 text-yellow-700 `;
      case "Low":
        return `${base} bg-green-100 text-green-700 `;
      default:
        return base;
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {tasks.length === 0 && (
        <p className="text-center text-gray-500 ">No tasks found.</p>
      )}
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white  p-4 rounded-xl shadow hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                />
                <h3
                  className={`font-semibold ${
                    task.completed
                      ? "line-through text-gray-400 "
                      : "text-gray-900 "
                  }`}
                >
                  {task.title}
                </h3>
                <span className={getPriorityStyle(task.priority)}>
                  {task.priority}
                </span>
              </div>
              {task.description && (
                <p className="text-gray-600  mb-1">{task.description}</p>
              )}
              <div className="text-sm text-gray-500 ">
                {task.dueDate && (
                  <span>
                    Due: {new Date(task.dueDate).toLocaleDateString()}{" "}
                  </span>
                )}
                {task.tags && <span>Tags: {task.tags}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(task)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
