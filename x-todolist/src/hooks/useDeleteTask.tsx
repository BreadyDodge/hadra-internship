import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";

export function useDeleteTasks(onSuccess: () => void) {
  const queryClient = useQueryClient();
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      await ky.delete(`/api/tasks/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onSuccess();
    },
  });
  return { ...deleteTaskMutation };
}
