import activitiesAPI from "@/apis/activitiesAPI";
import Contents from "@/app/(home)/[activityId]/_components/Contents";
import Header from "@/app/(home)/[activityId]/_components/Header";
import Images from "@/app/(home)/[activityId]/_components/Images";
import MobileFooter from "@/app/(home)/[activityId]/_components/MobileFooter";
import ReservationModal from "@/app/(home)/[activityId]/_components/ReservationModal";
import ReservationSteps from "@/app/(home)/[activityId]/_components/ReservationSteps";
import Review from "@/app/(home)/[activityId]/_components/Review";
import { ActivityIdProvider } from "@/app/(home)/[activityId]/_contexts/ActivityIdContext";
import { Metadata } from "next";

type Props = {
  params: { activityId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activityId = Number(params.activityId);
  const { title, description, bannerImageUrl } = await activitiesAPI.getInfo(activityId);

  const fullTitle = `${title} - Travel Maker`;

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

function ActivityId({ params: { activityId } }: { params: { activityId: string } }) {
  const id = Number(activityId);

  if (!id) {
    throw new Error("페이지가 존재하지 않습니다.");
  }

  return (
    <div className="bg-primary-50">
      <ActivityIdProvider activityId={activityId}>
        <div className="mx-auto flex max-w-[1248px] flex-col justify-center px-6">
          <Header />
          <Images />
          <div className="flex gap-6 tablet:mt-12 pc:mt-24">
            <div className="flex-grow">
              <Contents />
              <Review />
            </div>
            <div className="sticky right-0 top-20 hidden h-fit tablet:block">
              <ReservationSteps />
            </div>
          </div>
          <ReservationModal />
        </div>
        <MobileFooter />
      </ActivityIdProvider>
    </div>
  );
}

export default ActivityId;
