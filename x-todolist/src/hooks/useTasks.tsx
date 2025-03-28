import { useQuery } from "@tanstack/react-query";
import ky from "ky";

interface Task {
  id: string;
  title: string;
  done: 0 | 1;
}
interface GetTaskResponse {
  data: Task[];
}

export function useTasks() {
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await ky.get<GetTaskResponse>(`/api/tasks/`).json();
      return response.data;
    },
  });
  const tasks = tasksQuery.data;

  return { ...tasksQuery, tasks };
}
