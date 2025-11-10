import { useState, useEffect } from "react";
import TodoList from "./TodoList";

function Ex1() {
  type Task = {
    text: string;
    completed: boolean;
  };

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [textFilter, setTextFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "completed"
  >("all");
  const [newTaskText, setNewTaskText] = useState("");

  const addTask = (taskText: string) => {
    setTasks([...tasks, { text: taskText, completed: false }]);
  };

  const editTask = (index: number, newText: string) => {
    setTasks(
      tasks.map((task, i) => (i === index ? { ...task, text: newText } : task))
    );
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTask = (index: number) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleTextFilterChange = (value: string) => {
    setTextFilter(value);
  };

  const handleStatusFilterChange = (value: "all" | "active" | "completed") => {
    setStatusFilter(value);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesText = task.text
      .toLowerCase()
      .includes(textFilter.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && !task.completed) ||
      (statusFilter === "completed" && task.completed);
    return matchesText && matchesStatus;
  });

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
          📝 Todo List
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <form
              className="p-6 mb-6 bg-white rounded-lg shadow-lg"
              onSubmit={(e) => {
                e.preventDefault();
                if (newTaskText.trim()) {
                  addTask(newTaskText);
                  setNewTaskText("");
                }
              }}
            >
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                What needs to be done?
              </h2>
              <div className="flex gap-2">
                <input
                  id="new-todo-input"
                  placeholder="Enter task"
                  autoComplete="off"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-6 py-2 font-semibold text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add
                </button>
              </div>
            </form>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <label
                htmlFor="filter"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Filter items:
              </label>
              <input
                id="filter"
                placeholder="Search tasks..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                value={textFilter}
                onChange={(e) => handleTextFilterChange(e.target.value)}
              />
            </div>
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                className={`px-4 py-2 font-medium rounded-lg transition-colors duration-200 ${
                  statusFilter === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                aria-pressed={statusFilter === "all"}
                onClick={() => handleStatusFilterChange("all")}
              >
                <span className="sr-only">Show </span>
                <span>All</span>
                <span className="sr-only"> tasks</span>
              </button>
              <button
                type="button"
                className={`px-4 py-2 font-medium rounded-lg transition-colors duration-200 ${
                  statusFilter === "active"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                aria-pressed={statusFilter === "active"}
                onClick={() => handleStatusFilterChange("active")}
              >
                <span className="sr-only">Show </span>
                <span>Active</span>
                <span className="sr-only"> tasks</span>
              </button>
              <button
                type="button"
                className={`px-4 py-2 font-medium rounded-lg transition-colors duration-200 ${
                  statusFilter === "completed"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                aria-pressed={statusFilter === "completed"}
                onClick={() => handleStatusFilterChange("completed")}
              >
                <span className="sr-only">Show </span>
                <span>Completed</span>
                <span className="sr-only"> tasks</span>
              </button>
            </div>
          </div>
          <div>
            <TodoList
              tasks={filteredTasks}
              removeTask={removeTask}
              toggleTask={toggleTask}
              editTask={editTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ex1;