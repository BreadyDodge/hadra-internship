import {
  Check,
  Pencil,
  Save,
  Square,
  SquareCheck,
  SquareCheckBig,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  done: 0 | 1;
}

export default function Todolist() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const showMessage = (msg: string, type?: "p" | "n") => {
    if (type == "p") {
      setSuccessMessage(msg);
    }
    if (type == "n") {
      setErrorMessage(msg);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 2000);
  };

  const loadTasks = async () => {
    const res = await fetch(`/api/tasks/`, {
      method: "GET",
    });
    const json = await res.json();
    setTasks(json.data);
  };

  const addTasks = async (title: string) => {
    if (!title) {
      showMessage("Your task needs a title", "n");
      return;
    }
    try {
      await fetch(`/api/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
        }),
      });
    } catch (err) {
      console.error(err);
    }
    setTitle("");
    await loadTasks();
  };

  const deleteTask = async (id: string) => {
    setDeleteId(id);
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
    setDeleteId("");
    await loadTasks();
  };

  const completeTask = async (id: string, done: 0 | 1) => {
    if (done == 0) {
      try {
        await fetch(`/api/tasks/${id}/complete`, {
          method: "PATCH",
        });
      } catch (err) {
        console.error(err);
      }
    }
    if (done == 1) {
      try {
        await fetch(`/api/tasks/${id}/cancel`, {
          method: "PATCH",
        });
      } catch (err) {
        console.error(err);
      }
    }
    await loadTasks();
  };

  const editTask = async (id: string, title: string) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
        }),
      });
    } catch (err) {
      console.error(err);
    }
    setEditId("");
    await loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="flex h-screen w-full">
      <div className="mx-auto flex w-1/2 flex-col gap-2 pt-10">
        <h1 className="text-xl font-bold">X Todolist</h1>
        <textarea
          value={title}
          className="rounded-md border border-neutral-500 pl-2 pt-2"
          placeholder="What's on your todolist?"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="rounded bg-black py-2 text-white"
          onClick={async () => {
            await addTasks(title);
          }}
        >
          Add Task
        </button>
        {errorMessage != "" ? (
          <p className="text-rose-600">{errorMessage}</p>
        ) : successMessage != "" ? (
          <p className="text-green-500">{successMessage}</p>
        ) : (
          <p className="text-2xl font-bold">Today</p>
        )}
        {tasks.map((task) =>
          task.done == 1 ? (
            <div
              className="flex items-center gap-1 rounded-md border-2 border-gray-500 px-2 py-1"
              key={task.id}
            >
              <button
                className="rounded-md border-2 border-black bg-black p-0.5 text-white"
                onClick={async () => {
                  await completeTask(task.id, task.done);
                }}
              >
                <Check className="h-3 w-3 font-bold" />
              </button>
              <p className="line-through">{task.title}</p>
              <div className="ml-auto flex gap-2" key={task.id}>
                <button
                  className="rounded-md border-2 border-black p-0.5 hover:bg-black hover:text-white"
                  onClick={() => {
                    showMessage("Cannot edit completed task", "n");
                  }}
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  className="rounded-md border-2 border-black p-0.5 hover:bg-black hover:text-white"
                  onClick={async () => {
                    await deleteTask(task.id),
                      showMessage(
                        `Sucessfully deleted task "${task.title}"`,
                        "p",
                      );
                  }}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : editId == task.id ? (
            <div
              className="flex items-center gap-1 rounded-md border-2 border-gray-500 px-2 py-1"
              key={task.id}
            >
              <button
                className="h-5 w-5 rounded-md border-2 border-black p-0.5"
                onClick={() => {
                  showMessage("Finish editing first!", "n");
                }}
              ></button>
              <input
                className="w-3/4 rounded-md border border-neutral-500 px-2"
                value={editTitle}
                placeholder={task.title}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <div className="ml-auto flex gap-2" key={task.id}>
                <button
                  className="rounded-md border-2 border-black p-0.5 hover:bg-black hover:text-white"
                  onClick={async () => {
                    await editTask(task.id, editTitle),
                      showMessage("Task edited successfully", "p");
                  }}
                >
                  <Check className="h-5 w-5" />
                </button>
                <button
                  className="rounded-md border-2 border-black p-0.5 hover:bg-black hover:text-white"
                  onClick={() => {
                    setEditId("");
                  }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : deleteId == task.id ? (
            <div
              className="flex items-center gap-1 rounded-md border-2 border-gray-500 px-2 py-1"
              key={task.id}
            >
              <button
                className="h-5 w-5 rounded-md border-2 border-black p-0.5 hover:bg-black hover:text-white"
                onClick={async () => {
                  await completeTask(task.id, task.done);
                }}
              ></button>
              <p className="font-bold">Delete {task.title} ?</p>
              <div className="ml-auto flex gap-2" key={task.id}>
                <button
                  className="rounded-md border-2 border-black p-0.5 hover:bg-black hover:text-white"
                  onClick={async () => {
                    await deleteTask(task.id),
                      showMessage(
                        `Sucessfully deleted task "${task.title}"`,
                        "p",
                      );
                  }}
                >
                  <Check className="h-5 w-5" />
                </button>
                <button
                  className="rounded-md border-2 border-black p-0.5 hover:bg-black hover:text-white"
                  onClick={() => {
                    setDeleteId("");
                  }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="flex items-center gap-1 rounded-md border-2 border-gray-500 px-2 py-1"
              key={task.id}
            >
              <button
                className="h-5 w-5 rounded-md border-2 border-black p-0.5"
                onClick={async () => {
                  await completeTask(task.id, task.done);
                }}
              ></button>
              <p>{task.title}</p>
              <div className="ml-auto flex gap-2" key={task.id}>
                <button
                  className="rounded-md border-2 border-black p-0.5 hover:bg-black hover:text-white"
                  onClick={() => {
                    setEditId(task.id), setEditTitle(task.title);
                  }}
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  className="rounded-md border-2 border-black p-0.5 hover:bg-black hover:text-white"
                  onClick={() => {
                    setDeleteId(task.id);
                  }}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
