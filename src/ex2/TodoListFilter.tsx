import React from "react";
import { useTodo } from './TodoContext';

const TodoListFilter: React.FC = () => {
  const { textFilter, handleTextFilterChange, statusFilter, handleStatusFilterChange } = useTodo();

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 p-4 bg-white border-gray-200 rounded-md shadow-md">
        <label
          htmlFor="tasksFilter"
          className="flex flex-1 w-full mb-2 text-sm font-medium text-center text-gray-700"
        >
          Filter items:
        </label>
        <input
          type="text"
          placeholder="Search tasks..."
          name="tasksFilter"
          value={textFilter}
          onChange={(e) => handleTextFilterChange(e.target.value)}
          className="flex-1 w-full p-2 border rounded shadow border-stone-300"
        />
      </div>
      <div className="flex flex-row gap-4 mt-2">
        {[
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "completed", label: "Completed" },
        ].map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input
              type="radio"
              name="statusFilter"
              value={option.value}
              checked={statusFilter === option.value}
              onChange={() =>
                handleStatusFilterChange(
                  option.value as "all" | "active" | "completed"
                )
              }
              className="hidden"
            />
            <span
              className={
                `px-6 py-2 rounded-md font-medium text-lg ` +
                (statusFilter === option.value
                  ? "bg-blue-500 text-white shadow"
                  : "bg-stone-200 text-stone-700")
              }
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </>
  );
};

export default TodoListFilter;
