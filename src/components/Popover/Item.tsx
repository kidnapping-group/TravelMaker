"use client";

interface ItemProps extends React.PropsWithChildren {
  onClick: () => void;
}

function Item({ onClick, children }: ItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-10 shrink-0 rounded-lg px-3 text-left text-md hover:bg-gray-100 hover:text-primary-500 focus:bg-gray-100 active:bg-gray-200"
    >
      {children}
    </button>
  );
}

export default Item;
