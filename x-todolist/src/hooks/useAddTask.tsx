import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";

export function useAddTasks(onSuccess: () => void) {
  const queryClient = useQueryClient();
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

  return { ...addTasksMutation };
}
