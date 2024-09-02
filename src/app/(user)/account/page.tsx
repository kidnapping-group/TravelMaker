import MyAccount from "./_components/MyAccount";

export const metadata = {
  title: "내 정보",
  description: "내 정보를 확인하세요.",
  openGraph: {
    title: "내 정보",
    description: "내 정보를 확인하세요.",
    url: "https://travel-kidnap-maker.vercel.app/account",
  },
};

function Account() {
  return <MyAccount />;
}

export default Account;
