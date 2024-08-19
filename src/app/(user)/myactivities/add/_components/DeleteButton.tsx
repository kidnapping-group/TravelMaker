import Image from "next/image";

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
      <div className="relative h-2 w-2">
        <Image fill src="/icons/icon-delete-btn.svg" alt="닫기" />
      </div>
    </button>
  );
}

export default DeleteButton;
