import { useState } from "react";
import EditDelete from "~/components/edit-delete";
import EditDeleteButton from "~/components/edit-delete";
import ConfirmCancelButton from "~/components/confirm-cancel";
import CompleteCancelButton from "~/components/complete-button";
import { useTasks } from "~/hooks/useTasks";
import { useDeleteTasks } from "~/hooks/useDeleteTask";
import { useEditTasks } from "~/hooks/useEditTask";

// interface Task {
//   id: string;
//   title: string;
//   done: 0 | 1;
// }

export default function Todolist() {
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

  const { tasks, isLoading, isError, error, mutateAsync } = useTasks(() => {
    setTitle("");
  });
  const { mutateAsync: deleteTask } = useDeleteTasks(() => setDeleteId(""));
  const { mutateAsync: editTask } = useEditTasks(() => {
    setEditId("");
    setEditTitle("");
  });

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
            await mutateAsync(title);
          }}
        >
          Add Task
        </button>
        {isLoading && <p>Loading...</p>}
        {isError && (
          <p className="text-red-600">Something went wrong. {error.message}</p>
        )}
        {errorMessage != "" ? (
          <p className="text-rose-600">{errorMessage}</p>
        ) : successMessage != "" ? (
          <p className="text-green-500">{successMessage}</p>
        ) : (
          <p className="text-2xl font-bold">Today</p>
        )}
        {tasks?.map((task) =>
          task.done == 1 ? (
            <div
              className="flex items-center gap-1 rounded-md border-2 border-gray-500 px-2 py-1"
              key={task.id}
            >
              <CompleteCancelButton id={task.id} done={task.done} />
              <p className="line-through">{task.title}</p>
              <EditDeleteButton
                editOnClick={() =>
                  showMessage("Cannot edit completed task", "n")
                }
                deleteOnClick={async () => {
                  await deleteTask(task.id);
                  showMessage(`Sucessfully deleted task "${task.title}"`, "p");
                }}
              />
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
              <ConfirmCancelButton
                confirmOnClick={async () => {
                  await editTask({
                    id: task.id,
                    title: editTitle,
                  });
                  showMessage("Task edited successfully", "p");
                }}
                cancelOnClick={() => setEditId("")}
              />
            </div>
          ) : deleteId == task.id ? (
            <div
              className="flex items-center gap-1 rounded-md border-2 border-gray-500 px-2 py-1"
              key={task.id}
            >
              <CompleteCancelButton id={task.id} done={task.done} />
              <p className="font-bold">Delete {task.title} ?</p>
              <ConfirmCancelButton
                confirmOnClick={async () => {
                  await deleteTask(task.id);
                  showMessage(`Sucessfully deleted task "${task.title}"`, "p");
                }}
                cancelOnClick={() => {
                  setDeleteId("");
                }}
              />
            </div>
          ) : (
            <div
              className="flex items-center gap-1 rounded-md border-2 border-gray-500 px-2 py-1"
              key={task.id}
            >
              <CompleteCancelButton id={task.id} done={task.done} />
              <p>{task.title}</p>
              <EditDelete
                editOnClick={() => {
                  setEditId(task.id);
                  setEditTitle(task.title);
                }}
                deleteOnClick={() => {
                  setDeleteId(task.id);
                }}
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
}
