import Link from "next/link";

function UserNotExist() {
  return (
    <div className="flex items-center justify-center gap-1 text-md font-normal">
      <Link
        className="rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
        href="/signin"
      >
        로그인
      </Link>
      <Link
        className="rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
        href="/signup"
      >
        회원가입
      </Link>
    </div>
  );
}

export default UserNotExist;
