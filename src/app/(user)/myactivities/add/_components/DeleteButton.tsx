import { FaXmark } from "react-icons/fa6";

interface DeleteButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button
      className="absolute right-0 top-0 mr-1 mt-1 flex items-center justify-center rounded-lg bg-black/75 p-1 text-white transition-colors hover:bg-black"
      type="button"
      onClick={onClick}
    >
      <FaXmark />
    </button>
  );
}

export default DeleteButton;
