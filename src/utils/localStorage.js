// === FILE: src/utils/localStorage.js ===
export const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const loadTasks = () => {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
};

export const saveUsername = (username) => {
  localStorage.setItem("username", username);
};

export const getUsername = () => {
  return localStorage.getItem("username") || "";
};
