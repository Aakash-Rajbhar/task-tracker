import React, { useEffect, useState } from "react";

const TaskForm = ({ onSave, editingTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    tags: "",
  });

  useEffect(() => {
    if (editingTask) setTask(editingTask);
  }, [editingTask]);

  const handleSubmit = () => {
    if (task.title.trim()) {
      onSave(task);
      setTask({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
        tags: "",
      });
    }
  };

  return (
    <div className="bg-white  p-6 rounded-2xl shadow transition hover:shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 ">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Task title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="px-4 py-2 rounded-lg bg-gray-50  border  text-gray-900 "
        />
        <select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
          className="px-4 py-2 rounded-lg bg-gray-50  border text-gray-900 "
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <textarea
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="mt-4 w-full px-4 py-2 rounded-lg bg-gray-50  border da text-gray-900 "
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="px-4 py-2 rounded-lg bg-gray-50  border  text-gray-900 "
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={task.tags}
          onChange={(e) => setTask({ ...task, tags: e.target.value })}
          className="px-4 py-2 rounded-lg bg-gray-50  border  text-gray-900 "
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </div>
  );
};

export default TaskForm;
