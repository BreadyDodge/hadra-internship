import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ky from "ky";

interface Task {
  id: string;
  title: string;
  done: 0 | 1;
}
interface GetTaskResponse {
  data: Task[];
}

export function useTasks(onSuccess: () => void) {
  const queryClient = useQueryClient();
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await ky.get<GetTaskResponse>(`/api/tasks/`).json();
      return response.data;
    },
  });
  const tasks = tasksQuery.data;
  const addTasksMutation = useMutation({
    mutationFn: async (title: string) => {
      await ky.post("/api/tasks", {
        json: { title },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onSuccess();
    },
    onError: (err) => console.error(err),
  });

  return { ...tasksQuery, ...addTasksMutation, tasks };
}
