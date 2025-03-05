import { Pencil, Trash2 } from "lucide-react";
import React from "react";

interface ButtonProps {
  editOnClick?: () => void;
  deleteOnClick?: () => void;
}

const EditDeleteButton: React.FC<ButtonProps> = ({
  editOnClick,
  deleteOnClick,
}) => {
  return (
    <div className="ml-auto flex gap-2">
      <button
        className="rounded-md border-2 border-black p-0.5 hover:bg-black hover:text-white"
        onClick={editOnClick}
      >
        <Pencil className="h-5 w-5" />
      </button>
      <button
        className="rounded-md border-2 border-black p-0.5 hover:bg-black hover:text-white"
        onClick={deleteOnClick}
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default EditDeleteButton;
