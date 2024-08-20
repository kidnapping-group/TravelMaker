interface TabProps extends React.PropsWithChildren {
  selected?: boolean;
  onClick?: () => void;
}

function Tab({ selected = false, onClick, children }: TabProps) {
  return (
    <button
      className={`${selected ? "bg-primary-500 text-white" : "bg-gray-100 text-black"} rounded-full px-3 py-1 text-md`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Tab;
