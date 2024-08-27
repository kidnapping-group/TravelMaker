import MyAccount from "./_component/MyAccount";

export const metadata = {
  title: "내 정보",
  description: "내 정보를 확인 및 수정 할 수 있는 페이지입니다.",
  openGraph: {
    title: "내 정보 페이지",
    description: "내 정보를 확인 및 수정 할 수 있는 페이지입니다.",
    url: "https://travel-kidnap-maker.vercel.app/account",
  },
};

function Account() {
  return <MyAccount />;
}

export default Account;
