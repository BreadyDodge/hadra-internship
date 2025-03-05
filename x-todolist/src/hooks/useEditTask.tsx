import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";

export function useEditTasks(onSuccess: () => void) {
  const queryClient = useQueryClient();
  const editTaskMutation = useMutation({
    mutationFn: async ({ id, title }: { id: string; title: string }) => {
      await ky.put(`/api/tasks/${id}`, {
        json: { title },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onSuccess();
    },
    onError: (err) => console.error(err),
  });
  return { ...editTaskMutation };
}
