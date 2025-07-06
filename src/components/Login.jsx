import React, { useState } from "react";
import { motion } from "motion/react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    if (username.trim()) onLogin(username);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 0  p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white  rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800  mb-4">
          Welcome
        </h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your username"
          className="w-full px-4 py-3 mb-4 bg-gray-50  border border-gray-200  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 "
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
        >
          Login
        </button>
      </div>
    </motion.div>
  );
};

export default Login;
