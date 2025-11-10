import { TodoProvider } from "./TodoContext";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import TodoListFilter from "./TodoListFilter";

function Ex2() {
  return (
    <TodoProvider>
      <div className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
            📝 Todo List
          </h1>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <TodoForm />
              <TodoListFilter />
            </div>
            <div>
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default Ex2;