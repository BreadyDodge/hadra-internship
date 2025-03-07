import { useState } from "react";
import EditDelete from "~/components/edit-delete";
import EditDeleteButton from "~/components/edit-delete";
import ConfirmCancelButton from "~/components/confirm-cancel";
import CompleteCancelButton from "~/components/complete-button";
import { useDeleteTasks } from "~/hooks/useDeleteTask";
import { useEditTasks } from "~/hooks/useEditTask";
import { useTasks } from "~/hooks/useTasks";
import { ArrowUp } from "lucide-react";

const TasksView = () => {
  const [deleteId, setDeleteId] = useState("");
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: Tasks, isLoading, isError, error } = useTasks();
  const { mutateAsync: deleteTask, isError: DeleteError } = useDeleteTasks(() =>
    setDeleteId(""),
  );
  const { mutateAsync: editTask, isError: EditError } = useEditTasks(() => {
    setEditId("");
    setEditTitle("");
  });

  if (Tasks?.length == 0) {
    return (
      <div className="mx-auto flex flex-col items-center">
        <ArrowUp className="h-16 w-10" />
        <p className="">Your task list is empty. Add your first one!</p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Today</h1>
        {isLoading && <p>Loading tasks...</p>}
        {isError && <p>Error loading tasks {error.message}</p>}
        {<p>{errorMessage}</p>}
        {Tasks?.map((task) => {
          const isDone: boolean = task.done == 1;
          const isEditng: boolean = task.id == editId;
          const isDeleting: boolean = task.id == deleteId;
          if (isDone) {
            return (
              <div className="flex flex-col gap-2" key={task.id}>
                {DeleteError && (
                  <p>Something went wrong deleting {task.title}</p>
                )}
                <div
                  className="flex items-center gap-1 rounded-md border-2 border-gray-500 px-2 py-1"
                  key={task.id}
                >
                  <CompleteCancelButton id={task.id} done={task.done} />
                  <p className="line-through">{task.title}</p>
                  <EditDeleteButton
                    editOnClick={() => {
                      setErrorMessage("Cannot edit completed task");
                      setTimeout(() => {
                        setErrorMessage("");
                      }, 2000);
                    }}
                    deleteOnClick={async () => {
                      await deleteTask(task.id);
                    }}
                  />
                </div>
              </div>
            );
          } else if (isEditng) {
            return (
              <div className="flex flex-col gap-2" key={task.id}>
                {EditError && (
                  <p>Something went wrong when editing {task.title}</p>
                )}
                <div
                  className="flex items-center gap-1 rounded-md border-2 border-gray-500 px-2 py-1"
                  key={task.id}
                >
                  <button
                    className="h-5 w-5 rounded-md border-2 border-black p-0.5"
                    onClick={() => {
                      setErrorMessage("Finish editng first!");
                      setTimeout(() => {
                        setErrorMessage("");
                      }, 2000);
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
                    }}
                    cancelOnClick={() => setEditId("")}
                  />
                </div>
              </div>
            );
          } else if (isDeleting) {
            return (
              <div className="flex flex-col gap-2" key={task.id}>
                {DeleteError && (
                  <p>Something went wrong deleting {task.title}</p>
                )}
                <div
                  className="flex items-center gap-1 rounded-md border-2 border-gray-500 px-2 py-1"
                  key={task.id}
                >
                  <CompleteCancelButton id={task.id} done={task.done} />
                  <p className="font-bold">Delete {task.title} ?</p>
                  <ConfirmCancelButton
                    confirmOnClick={async () => {
                      await deleteTask(task.id);
                    }}
                    cancelOnClick={() => {
                      setDeleteId("");
                    }}
                  />
                </div>
              </div>
            );
          } else {
            return (
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
            );
          }
        })}
      </div>
    );
  }
};

export default TasksView;
