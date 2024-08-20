import Link from "next/link";

function UserNotExist() {
  return (
    <div className="flex items-center justify-center gap-6 text-sm font-medium">
      <Link href="/signin">로그인</Link>
      <Link href="/signup">회원가입</Link>
    </div>
  );
}

export default UserNotExist;
