import { useEffect, useState } from "react";
import { useAddTasks } from "~/hooks/useAddTask";

const TaskInput = () => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    isError,
    isSuccess,
    isPending,
    error,
    reset,
    mutateAsync: AddTask,
  } = useAddTasks(() => setTitle(""));

  useEffect(() => {
    const timer = setTimeout(() => reset(), 3000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-bold">X Todolist</h1>
      <textarea
        value={title}
        className="rounded-md border border-neutral-500 pl-2 pt-2"
        placeholder="What's on your todolist?"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="rounded bg-black py-2 text-white disabled:bg-neutral-600"
        onClick={async () => {
          if (title === "") {
            setErrorMessage("Task cannot be empty");
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
          } else {
            await AddTask(title);
          }
        }}
        disabled={isPending}
      >
        {isPending ? "Adding task..." : "Add Task"}
      </button>
      {isError && (
        <p className="text-red-600">
          Something went wrong when adding task. {error.message}
        </p>
      )}
      {isSuccess && <p className="text-green-600">Task Successfully Added</p>}
      {<p>{errorMessage}</p>}
    </div>
  );
};

export default TaskInput;
