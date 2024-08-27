import Add from "./_components/Add";

export const metadata = {
  title: "내 체험 등록",
  description: "새로운 체험을 등록하고 예약 시간을 관리할 수 있는 페이지입니다.",
  openGraph: {
    title: "내 체험 등록",
    description: "새로운 체험을 등록하고 예약 시간을 관리할 수 있는 페이지입니다.",
    url: "https://travel-kidnap-maker.vercel.app/myactivities/add",
  },
};

async function MyAddPage() {
  return <Add />;
}

export default MyAddPage;
