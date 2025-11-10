import React, { useState } from "react";

type Task = {
  text: string;
  completed: boolean;
};

type TodoListProps = {
  tasks: Task[];
  removeTask: (index: number) => void;
  toggleTask: (index: number) => void;
  editTask: (index: number, newText: string) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  removeTask,
  toggleTask,
  editTask,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  return (
    <div>
      <h2 id="list-heading" className="mb-4 text-xl font-semibold text-gray-700">
        {tasks.length === 0
          ? "0 tasks remaining"
          : tasks.length === 1
          ? "1 task remaining"
          : `${tasks.length} tasks remaining`}
      </h2>
      <ul role="list" className="space-y-3" aria-labelledby="list-heading">
        {tasks.map((task, idx) => {
          if (editingIndex === idx) {
            return (
              <li key={idx} className="list-none">
                <form
                  className="p-4 bg-white rounded-lg shadow-md"
                  onSubmit={(e) => {
                    e.preventDefault();
                    editTask(idx, editText);
                    setEditingIndex(null);
                  }}
                >
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-700"
                      htmlFor={`todo-${idx}`}
                    >
                      New name for {task.text}
                    </label>
                    <input
                      id={`todo-${idx}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 font-medium text-gray-700 transition-colors duration-200 bg-gray-300 rounded-lg hover:bg-gray-400"
                      onClick={() => setEditingIndex(null)}
                    >
                      Cancel
                      <span className="sr-only">renaming {task.text}</span>
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 font-medium text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      Save
                      <span className="sr-only">new name for {task.text}</span>
                    </button>
                  </div>
                </form>
              </li>
            );
          }
          return (
            <li key={idx} className="list-none">
              <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center flex-1 gap-3">
                  <input
                    id={`todo-${idx}`}
                    className="w-5 h-5 text-blue-500 border-gray-300 rounded cursor-pointer focus:ring-2 focus:ring-blue-500"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(idx)}
                  />
                  <label
                    htmlFor={`todo-${idx}`}
                    className="text-lg text-gray-800 cursor-pointer"
                  >
                    {task.text}
                  </label>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 font-medium text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={() => {
                      setEditingIndex(idx);
                      setEditText(task.text);
                    }}
                  >
                    Edit <span className="sr-only">{task.text}</span>
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 font-medium text-white transition-colors duration-200 bg-red-500 rounded-lg hover:bg-orange-600"
                    onClick={() => removeTask(idx)}
                  >
                    Delete <span className="sr-only">{task.text}</span>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;