import TaskInput from "~/components/task-input";
import TasksView from "~/components/tasks-view";

export default function Todolist() {
  return (
    <div className="flex h-screen w-full">
      <div className="mx-auto flex w-3/4 flex-col gap-2 pt-5">
        <TaskInput />
        <TasksView />
      </div>
    </div>
  );
}
