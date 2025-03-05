import { Check, X } from "lucide-react";
import React from "react";

interface ButtonProps {
  confirmOnClick: () => void;
  cancelOnClick: () => void;
}
const ConfirmCancelButton: React.FC<ButtonProps> = ({
  confirmOnClick,
  cancelOnClick,
}) => {
  return (
    <div className="ml-auto flex gap-2">
      <button
        className="rounded-md border-2 border-black p-0.5 hover:bg-black hover:text-white"
        onClick={confirmOnClick}
      >
        <Check className="h-5 w-5" />
      </button>
      <button
        className="rounded-md border-2 border-black p-0.5 hover:bg-black hover:text-white"
        onClick={cancelOnClick}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ConfirmCancelButton;
