import { Check } from "lucide-react";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";

interface ButtonProps {
  id: string;
  done: 0 | 1;
}

const CompleteCancelButton: React.FC<ButtonProps> = ({ id, done }) => {
  const queryClient = useQueryClient();
  const completeTaskMutation = useMutation({
    mutationFn: async ({ id, done }: { id: string; done: 0 | 1 }) => {
      if (done == 0) {
        await ky.patch(`/api/tasks/${id}/complete`);
      }
      if (done == 1) {
        await ky.patch(`/api/tasks/${id}/cancel`);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  if (done == 0) {
    return (
      <button
        className="h-5 w-5 rounded-md border-2 border-black p-0.5"
        onClick={() => {
          completeTaskMutation.mutate({
            id: id,
            done: done,
          });
        }}
      ></button>
    );
  }
  if (done == 1) {
    return (
      <button
        className="rounded-md border-2 border-black bg-black p-0.5 text-white"
        onClick={() => {
          completeTaskMutation.mutate({
            id: id,
            done: done,
          });
        }}
      >
        <Check className="h-3 w-3 font-bold" />
      </button>
    );
  }
};

export default CompleteCancelButton;
