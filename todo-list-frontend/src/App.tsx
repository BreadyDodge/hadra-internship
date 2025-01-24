import { useState } from "react";
import { nanoid } from "nanoid";
interface Todo {
  id: string;
  title: string;
  description?: string;
  status: "done" | "todo" | "inprogress";
  createdAt: Date;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="bg-blue-200 h-screen flex flex-col justify-center items-center gap-2">
      <input
        value={title}
        className="bg-neutral-500 p-3 rounded-xl"
        placeholder="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        value={description}
        className="bg-neutral-500 p-3 rounded-xl"
        placeholder="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button
        className="bg-neutral-500 px-5 py-3 rounded-full hover:bg-red-600 active:bg-red-950"
        onClick={() => {
          setTodos((prev) => [
            ...prev,
            {
              id: nanoid(10),
              title,
              description,
              status: "todo",
              createdAt: new Date(),
            },
          ]);
          setTitle("");
          setDescription("");
        }}
      >
        Submit
      </button>
      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <div className="bg-amber-100 p-4">
            <div>{todo.title}</div>
            <div>{todo.description}</div>
            <div>Status:{todo.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
