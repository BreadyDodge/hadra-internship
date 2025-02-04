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
    <div className="flex h-screen">
      <div className="w-40 h-full">
        <nav className="flex flex-col gap-5 pt-5 pl-2">
          <div className="flex flex-col pl-5 gap-2">
            <h2>Fabian</h2>
            <ul>
              <li className="hover:bg-amber-50 cursor-pointer hover: text-red-600">
                <a>Add task</a>
              </li>
              <input
                className="hover:bg-amber-50 cursor-pointer"
                placeholder="Search"
              />
              <li className="hover:bg-amber-50 cursor-pointer">
                <a href="something">Inbox</a>
              </li>
              <li className="hover:bg-amber-50 cursor-pointer">
                <a>Today</a>
              </li>
              <li className="hover:bg-amber-50 cursor-pointer">
                <a>Upcoming</a>
              </li>
              <li className="hover:bg-amber-50 cursor-pointer">
                <a>Filters and labels</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-gray-400">Favorites</h2>
            <div className="flex flex-col pl-5 gap-1.5">
              <a className="text-neutral-500 hover:bg-amber-50 cursor-pointer">
                # Life
              </a>
              <a className="text-neutral-500 hover:bg-amber-50 cursor-pointer">
                # Lab
              </a>
              <a className="text-neutral-500 hover:bg-amber-50 cursor-pointer">
                # Coding
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-gray-400">Projects</h2>
            <div className="flex flex-col pl-5">
              <a className="text-neutral-500 hover:bg-amber-50 cursor-pointer">
                # Life
              </a>
              <a className="text-neutral-500 hover:bg-amber-50 cursor-pointer">
                # Lab
              </a>
              <a className="text-neutral-500 hover:bg-amber-50 cursor-pointer">
                # Coding
              </a>
              <a className="text-neutral-500 hover:bg-amber-50 cursor-pointer">
                # Life
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div className=" w-full flex flex-col">
        <div className="flex">
          <h2 className="text-gray-400"> My Project </h2>
          <button className="px-1.5 ml-auto text-gray-400 hover:text-black cursor-pointer ">
            Share
          </button>
          <button className="px-1.5 text-gray-400 hover:text-black cursor-pointer ">
            View
          </button>
        </div>
        <h1 className="text-2xl py-5 pl-2 font-bold">Project Name</h1>
        <div className="flex gap-10">
          <div className="flex flex-col w-50 gap-2">
            <h2 className="font-bold ">Section Name</h2>
            <div className="flex flex-col gap-2">
              <a className="border-red-100 border-1 rounded py-2 pl-3 hover:border-red-400">
                Tasks
              </a>
              <a className="border-red-100 border-1 rounded py-2 pl-3 hover:border-red-400">
                Tasks again
              </a>
              <a className="border-red-100 border-1 rounded py-2 pl-3 hover:border-red-400">
                another one
              </a>
              <button className="pl-3 hover:text-red-500 flex gap-4 group">
                <h3 className="text-red-500 w-7 h-7 text-lg group-hover:text-white group-hover:bg-red-400 group-hover:rounded-full">
                  +
                </h3>
                Add task
              </button>
            </div>
          </div>
          <div>
            <button className="text-gray-400 hover:text-red-400">
              Add section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
