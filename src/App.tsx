const App = () => {
  const exercises = [
    { href: "/ex1", title: "class 07", available: true },
    { href: "/ex2", title: "class 08", available: true },
    { href: "/ex3", title: "class 09", available: true },
    { href: "/ex4", title: "class 10", available: true },
  ];

  return (
    <div className="max-w-3xl px-4 mx-auto">
      <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">Exercises TDW 👾</h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {exercises.map((exercise, index) => (
          <li key={index}>
            {exercise.available ? (
              <a
                className="flex items-center justify-between w-full p-4 transition-shadow duration-150 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md focus:shadow-md hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                href={exercise.href!}
              >
                <span className="font-medium text-gray-900">{exercise.title}</span>
                <span className="ml-3 text-sm text-gray-500">→</span>
              </a>
            ) : (
              <div className="flex items-center justify-between w-full p-4 text-gray-400 border border-gray-100 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-500">{exercise.title}</span>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
