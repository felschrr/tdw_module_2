import { useState } from "react";
import { toast } from "react-toastify";
import { useGetPetsQuery, useVotePetMutation } from "../store/petSlice";

const Ex4 = () => {
  const [page, setPage] = useState(0);
  const [animalType, setAnimalType] = useState<"cat" | "dog">("cat");

  const { data: petsData, isFetching: petsLoading } = useGetPetsQuery({
    type: animalType,
    limit: 10,
    page: page + 1,
    order: "asc",
  });
  const [votePet] = useVotePetMutation();

  const images = petsData || [];
  const isLoading = petsLoading;

  return (
    <div className="px-4 mx-auto max-w-7xl">
      <div>
        <header className="relative w-full mb-4">
          <div className="flex justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold">
                The {animalType === "cat" ? "cat" : "dog"} app
              </h1>
              <h2 className="text-sm text-gray-600 dark:text-gray-300">
                Here you can find lots of{" "}
                {animalType === "cat" ? "cats 🐈🧶" : "dogs 🐶"}
              </h2>
            </div>
          </div>
          <div className="absolute hidden transform -translate-y-1/2 md:block right-4 top-1/2">
            <div className="flex items-center gap-3">
              <span className="text-lg" aria-hidden="true">
                🐶
              </span>
              <label
                className="relative inline-flex items-center cursor-pointer"
                aria-label="Animal toggle"
              >
                <input
                  className="sr-only"
                  aria-checked={animalType === "cat"}
                  type="checkbox"
                  checked={animalType === "cat"}
                  onChange={() =>
                    setAnimalType(animalType === "cat" ? "dog" : "cat")
                  }
                />
                <div
                  className={`w-16 h-8 rounded-full transition-colors duration-200 flex items-center px-1 ${
                    animalType === "cat" ? "bg-blue-500" : "bg-gray-500"
                  }`}
                  aria-hidden="true"
                >
                  <div
                    className={`w-7 h-7 bg-white rounded-full shadow transform transition-transform duration-200 ${
                      animalType === "cat" ? "translate-x-8" : "translate-x-0"
                    }`}
                    style={{ willChange: "transform" }}
                  ></div>
                </div>
              </label>
              <span className="text-lg" aria-hidden="true">
                🐱
              </span>
            </div>
          </div>
          <div className="block mt-2 md:hidden">
            <div className="flex items-center gap-3">
              <span className="text-lg" aria-hidden="true">
                🐶
              </span>
              <label
                className="relative inline-flex items-center cursor-pointer"
                aria-label="Animal toggle"
              >
                <input
                  className="sr-only"
                  aria-checked={animalType === "cat"}
                  type="checkbox"
                  checked={animalType === "cat"}
                  onChange={() =>
                    setAnimalType(animalType === "cat" ? "dog" : "cat")
                  }
                />
                <div
                  className={`w-16 h-8 rounded-full transition-colors duration-200 flex items-center px-1 ${
                    animalType === "cat" ? "bg-blue-500" : "bg-gray-500"
                  }`}
                  aria-hidden="true"
                >
                  <div
                    className={`w-7 h-7 bg-white rounded-full shadow transform transition-transform duration-200 ${
                      animalType === "cat" ? "translate-x-8" : "translate-x-0"
                    }`}
                    style={{ willChange: "transform" }}
                  ></div>
                </div>
              </label>
              <span className="text-lg" aria-hidden="true">
                🐱
              </span>
            </div>
          </div>
        </header>
        <div className="flex flex-wrap justify-center">
          {images.length === 0 && !isLoading && (
            <p className="w-screen text-center text-gray-500 y-4 h-96">
              No images found
            </p>
          )}
          {isLoading
            ? [...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="w-[200px] h-[200px] m-4 animate-pulse bg-stone-300 rounded"
                ></div>
              ))
            : images.map((img) => (
                <div
                  className="relative m-4 w-[200px] h-[200px] cursor-pointer transition group rounded"
                  key={img.id}
                >
                  <img
                    alt={img.id}
                    className="object-cover w-full h-full rounded"
                    src={img.url}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white transition-opacity bg-opacity-75 rounded opacity-0 group-hover:opacity-85 bg-stone-700">
                    <div className="flex items-center justify-center flex-1 h-full border-r cursor-pointer hover:bg-stone-600">
                      <span
                        className="flex items-center justify-center w-full h-full"
                        onClick={async () => {
                          try {
                            await votePet({
                              type: animalType,
                              image_id: img.id,
                              value: 1,
                            }).unwrap();
                            toast.success(
                              `${
                                animalType === "cat" ? "Cat" : "Dog"
                              } downvoted!`,
                              { icon: <>👎</> }
                            );
                          } catch {
                            toast.error("Error while voting pet!");
                          }
                        }}
                      >
                        👎
                      </span>
                    </div>
                    <div className="flex items-center justify-center flex-1 h-full border-l cursor-pointer hover:bg-stone-600">
                      <span
                        className="flex items-center justify-center w-full h-full"
                        onClick={async () => {
                          try {
                            await votePet({
                              type: animalType,
                              image_id: img.id,
                              value: 10,
                            }).unwrap();
                            toast.success(
                              `${
                                animalType === "cat" ? "Cat" : "Dog"
                              } upvoted!`,
                              { icon: <>👍</> }
                            );
                          } catch {
                            toast.error("Error while voting pet!");
                          }
                        }}
                      >
                        👍
                      </span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div className="flex justify-center items-center mt-[72px] gap-9">
          {page > 0 && (
            <button
              className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
          )}
          <span className="text-lg font-semibold">{page}</span>
          <button
            className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={() => setPage(page + 1)}
            disabled={animalType === "dog" && page >= 9}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ex4;
