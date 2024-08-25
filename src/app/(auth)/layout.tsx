import Image from "next/image";
import Link from "next/link";

function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_URL}/social/kakao&scope=profile_nickname,profile_image`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}/social/google`;

  return (
    <div className="relative min-h-screen w-full bg-gray-100">
      <div className="mx-auto flex h-full w-full max-w-[640px] flex-col items-center gap-12 px-2 py-10">
        <Link href="/">
          <Image src="/images/logo_big.png" width={450} height={192} alt="메인로고" />
        </Link>
        {children}
        <div className="flex w-full items-center justify-between text-center text-gray-500">
          <hr className="w-[100px] border-gray-300 tablet:w-[180px]" />
          <span className="text-md tablet:w-[240px] tablet:text-xl">SNS 계정으로 로그인하기</span>
          <hr className="w-[100px] border-gray-300 tablet:w-[180px]" />
        </div>
        <div className="flex justify-center gap-4">
          <Link
            href={GOOGLE_AUTH_URL}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300"
          >
            <Image src="/icons/icon-google.svg" width={27} height={27} alt="Google 회원가입" />
          </Link>

          <Link
            href={KAKAO_AUTH_URL}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300"
          >
            <Image src="/icons/icon-kakao.svg" width={27} height={27} alt="카카오톡 회원가입" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthRootLayout;
