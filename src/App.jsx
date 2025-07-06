import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import {
  saveTasks,
  loadTasks,
  getUsername,
  saveUsername,
} from "./utils/localStorage";

const App = () => {
  const [username, setUsername] = useState(getUsername());
  const [tasks, setTasks] = useState(loadTasks());
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddOrUpdate = (task) => {
    if (task.id) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...task } : t)));
    } else {
      setTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...task,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    setEditingTask(null);
  };

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleEdit = (task) => setEditingTask(task);

  const filterTasks = () => {
    let filtered = [...tasks];
    if (filter === "Completed") filtered = filtered.filter((t) => t.completed);
    else if (filter === "Pending")
      filtered = filtered.filter((t) => !t.completed);
    if (searchTerm)
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (t.description &&
            t.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    return filtered;
  };

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  const handleLogout = () => {
    saveUsername("");
    setUsername("");
  };

  return (
    <div className="min-h-screen bg-zinc-100 transition-colors">
      <AnimatePresence mode="wait">
        {!username ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <Login
              onLogin={(name) => {
                saveUsername(name);
                setUsername(name);
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto px-4 py-8"
          >
            <header className="flex flex-col sm:flex-row items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {username}
                </h1>
                <p className="text-gray-500">
                  {taskCounts.pending} pending / {taskCounts.completed}{" "}
                  completed
                </p>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </header>
            <TaskForm onSave={handleAddOrUpdate} editingTask={editingTask} />
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mt-6">
              <TaskFilter
                filter={filter}
                setFilter={setFilter}
                counts={taskCounts}
              />
              <input
                type="text"
                placeholder="Search tasks..."
                className="mt-2 lg:mt-0 w-full lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <TaskList
              tasks={filterTasks()}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
