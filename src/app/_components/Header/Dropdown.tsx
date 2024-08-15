import Link from "next/link";

function Dropdown({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="absolute right-0 top-10 w-28 overflow-hidden rounded-lg border border-primary-50 bg-white text-sm font-medium text-gray-700 shadow-md">
      <Link
        href="/myactivities"
        className="block w-full transform py-3 pl-2 text-left transition-all duration-200 ease-in-out hover:scale-105 hover:bg-primary-400 hover:text-white"
      >
        마이 페이지
      </Link>
      <button
        type="button"
        onClick={onLogout}
        className="w-full transform border-t border-primary-50 py-3 pl-2 text-left transition-all duration-200 ease-in-out hover:scale-105 hover:bg-primary-400 hover:text-white"
      >
        로그아웃
      </button>
    </div>
  );
}

export default Dropdown;
