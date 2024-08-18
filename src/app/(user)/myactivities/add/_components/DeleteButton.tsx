interface DeleteButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button
      className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-[4px] border border-black bg-black"
      type="button"
      onClick={onClick}
    >
      <div className="text-xs text-white">X</div>
    </button>
  );
}

export default DeleteButton;
