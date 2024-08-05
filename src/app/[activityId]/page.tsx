import activitiesAPI from "@/apis/activitiesAPI";
import Image from "next/image";

async function ActivityId({ params: { activityId } }: { params: { activityId: string } }) {
  const res = await activitiesAPI.getInfo(Number(activityId));

  return (
    <div>
      {activityId}
      <Image src={res.bannerImageUrl} alt="fds" width={100} height={100} />
    </div>
  );
}

export default ActivityId;
