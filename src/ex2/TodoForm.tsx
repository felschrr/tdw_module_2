import React from "react";
import { useTodo } from './TodoContext';

const TodoForm: React.FC = () => {
  const { newTaskText, setNewTaskText, addTask } = useTodo();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(e.target.value);
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTaskText.trim() !== "") {
      addTask(newTaskText.trim());
      setNewTaskText("");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-8 bg-white border-gray-200 rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-stone-700">What needs to be done?</h2>
      <form onSubmit={handleAddTodo} className="flex flex-row flex-wrap gap-4">
        <input
          type="text"
          placeholder="Enter task"
          value={newTaskText}
          onChange={handleInputChange}
          className="p-2 border rounded shadow border-stone-300"
        />
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded text-shadow-white">Add</button>
      </form>
    </div>
  );
};

export default TodoForm;
