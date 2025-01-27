import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isEditing, setIsEditing] = useState("");
  const [titleEdit, setTitleEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");

  const getTodos = async () => {
    const res = await fetch("http://localhost:8000/todos", {
      method: "GET",
    });
    const json = await res.json();
    setTodos(json.data);
  };

  const createTodo = async (todo: { title: string; description?: string }) => {
    setSuccessMessage("");
    setErrorMessage("");
    if (!todo.title) {
      setErrorMessage("title is required");
      return;
    }
    setIsLoading(true);
    await fetch("http://localhost:8000/todos", {
      method: "POST",
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
      }),
    });
    await getTodos();
    setIsLoading(false);
    setSuccessMessage("successfully added todo item!");
    setTitle("");
    setDescription("");
  };

  //delete
  const deleteTodo = async (id: string) => {
    setSuccessMessage("");
    setErrorMessage("");
    setIsDeleteLoading(true);
    setDeleteId(id);

    await fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
    });
    await getTodos();
    setIsDeleteLoading(false);
    setSuccessMessage("task failed successfully");
    setDeleteId("");
  };

  //edit status
  const changeStatus = async (
    status: "todo" | "inprogress" | "done",
    id: string,
  ) => {
    setSuccessMessage("");

    if (status === "done") {
      await fetch(`http://localhost:8000/todos/${id}/complete`, {
        method: "PATCH",
      });
      await getTodos();
      setSuccessMessage("status changed to done");
    }
  };

  //edit title and description
  const editTodo = async (
    todo: { title: string; description?: string },
    id: string,
  ) => {
    setSuccessMessage("");
    setErrorMessage("");
    if (!todo.title) {
      setErrorMessage("title is required");
      return;
    }
    await fetch(`http://0.0.0.0:8000/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
      }),
    });
    setDescriptionEdit("");
    setTitleEdit("");
    setIsEditing("");
    await getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="bg-neutral-600 h-screen flex flex-col justify-center items-center gap-2">
      <div>{isLoading && "loading..."}</div>
      <div className="text-rose-500">{errorMessage}</div>
      <div className="text-emerald-500">{successMessage}</div>
      <input
        value={title}
        className="bg-white p-3 rounded-xl"
        placeholder="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        disabled={isLoading}
      />
      <input
        value={description}
        className="bg-white p-3 rounded-xl"
        placeholder="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        disabled={isLoading}
      />
      <button
        className="bg-neutral-500 px-5 py-3 rounded-full hover:bg-red-600 cursor-pointer active:bg-red-950"
        onClick={async () => {
          await createTodo({ title, description });
        }}
        disabled={isLoading}
      >
        Submit
      </button>
      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <div className="bg-amber-100 p-4" key={todo.id}>
            <div className="flex flex-col">
              {isEditing === todo.id ? (
                <input
                  value={titleEdit}
                  className="bg-white"
                  placeholder="New Title"
                  onChange={(e) => {
                    setTitleEdit(e.target.value);
                  }}
                />
              ) : (
                <div>{todo.title}</div>
              )}
              {isEditing === todo.id ? (
                <textarea
                  className="bg-white p-1"
                  placeholder="Description"
                  value={descriptionEdit}
                  onChange={(e) => {
                    setDescriptionEdit(e.target.value);
                  }}
                />
              ) : (
                <div>{todo.description}</div>
              )}
            </div>
            <div>Status:{todo.status}</div>
            <div className="flex gap-1.5">
              <button
                className="bg-red-600 px-1.5 py-1 hover: cursor-pointer"
                onClick={async () => {
                  await deleteTodo(todo.id);
                }}
              >
                {isDeleteLoading && deleteId === todo.id
                  ? "loading..."
                  : "Delete"}
              </button>
              <button
                className="bg-green-400 px-1.5 py-1 hover: cursor-pointer"
                onClick={async () => {
                  await changeStatus("done", todo.id);
                }}
              >
                Done
              </button>
              {isEditing === todo.id ? (
                <button
                  className="bg-orange-400 px-1.5 py-1 cursor-crosshair"
                  onClick={async () => {
                    editTodo(
                      { title: titleEdit, description: descriptionEdit },
                      todo.id,
                    );
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-orange-400 px-1.5 py-1 cursor-crosshair"
                  onClick={async () => {
                    await setIsEditing(todo.id);
                    setTitleEdit(todo.title);
                    setDescriptionEdit(todo.description ?? "");
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
