import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Task = {
  text: string;
  completed: boolean;
};

type TodoContextType = {
  tasks: Task[];
  textFilter: string;
  statusFilter: "all" | "active" | "completed";
  newTaskText: string;
  addTask: (taskText: string) => void;
  editTask: (index: number, newText: string) => void;
  removeTask: (index: number) => void;
  toggleTask: (index: number) => void;
  handleTextFilterChange: (value: string) => void;
  handleStatusFilterChange: (value: "all" | "active" | "completed") => void;
  setNewTaskText: (text: string) => void;
  filteredTasks: Task[];
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodo must be used within TodoProvider');
  return context;
};

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  useEffect(() => {
    document.title = `📝 Todo List - ${tasks.length} tasks remaining`;
  }, [tasks.length]);

  const [textFilter, setTextFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "completed">("all");
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

  const value: TodoContextType = {
    tasks,
    textFilter,
    statusFilter,
    newTaskText,
    addTask,
    editTask,
    removeTask,
    toggleTask,
    handleTextFilterChange,
    handleStatusFilterChange,
    setNewTaskText,
    filteredTasks,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};