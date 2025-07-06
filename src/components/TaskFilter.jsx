import React from "react";

const TaskFilter = ({ filter, setFilter, counts }) => {
  const options = [
    { label: "All", value: "All", count: counts.all },
    { label: "Pending", value: "Pending", count: counts.pending },
    { label: "Completed", value: "Completed", count: counts.completed },
  ];

  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setFilter(opt.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            filter === opt.value
              ? "bg-blue-600 text-white"
              : "bg-gray-200  text-gray-700 "
          }`}
        >
          {opt.label} ({opt.count})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
