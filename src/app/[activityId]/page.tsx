import activitiesAPI from "@/apis/activitiesAPI";
import Image from "next/image";

async function ActivityId({ params: { activityId } }: { params: { activityId: string } }) {
  // api id로 불러오고 시작해라 리액트쿼리 잘이용해보자 막막하다..
  // 팀원에게 징징대보자

  const res = await activitiesAPI.getInfo({ id: Number(activityId) });
  return (
    <div>
      {activityId}
      <Image src={res.bannerImageUrl} alt="fds" width={100} height={100} />
    </div>
  );
}

export default ActivityId;
