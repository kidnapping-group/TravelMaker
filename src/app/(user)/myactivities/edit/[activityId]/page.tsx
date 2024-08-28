import activitiesAPI from "@/apis/activitiesAPI";
import { Metadata } from "next";

import Edit from "../_components/Edit";

export async function generateMetadata({
  params: { activityId },
}: {
  params: { activityId: number };
}): Promise<Metadata> {
  const { title, description, bannerImageUrl } = await activitiesAPI.getInfo(activityId);

  const fullTitle = `${title} - 수정 페이지`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      images: [bannerImageUrl],
    },
  };
}

function ActivityEditPage({ params: { activityId } }: { params: { activityId: number } }) {
  return <Edit activityId={activityId} />;
}

export default ActivityEditPage;
