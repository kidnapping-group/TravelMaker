import Contents from "@/app/[activityId]/_components/Contents";
import Header from "@/app/[activityId]/_components/Header";
import Images from "@/app/[activityId]/_components/Images";
import MobileFooter from "@/app/[activityId]/_components/MobileFooter";
import ReservationModal from "@/app/[activityId]/_components/ReservationModal";
import ReservationSteps from "@/app/[activityId]/_components/ReservationSteps";
import Review from "@/app/[activityId]/_components/Review";
import { ActivityIdProvider } from "@/app/[activityId]/_contexts/ActivityIdContext";

async function ActivityId({ params: { activityId } }: { params: { activityId: string } }) {
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
            <div className="sticky right-0 top-14 hidden tablet:block">
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
