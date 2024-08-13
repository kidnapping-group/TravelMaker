import Contents from "@/app/[activityId]/_components/Contents";
import Header from "@/app/[activityId]/_components/Header";
import Images from "@/app/[activityId]/_components/Images";
import MobileFooter from "@/app/[activityId]/_components/MobileFooter";
import ReservationModal from "@/app/[activityId]/_components/ReservationModal";
import ReservationSteps from "@/app/[activityId]/_components/ReservationSteps";
import Review from "@/app/[activityId]/_components/Review";
import { ActivityIdProvider } from "@/app/[activityId]/_contexts/ActivityIdContext";
import Popup from "@/components/Popup";
import { redirect } from "next/navigation";

interface ActivityIdParams {
  params: { activityId: string };
  searchParams: Record<string, string | string[]>;
}

function ActivityId({ params: { activityId }, searchParams }: ActivityIdParams) {
  if (searchParams.confirm) {
    redirect("reservation");
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
          <Popup
            text="예약을 성공했습니다. 예약 페이지로 이동 하겠습니까?"
            onCloseButton="아니요"
            onChangeButton="이동하기"
          />
        </div>
        <MobileFooter />
      </ActivityIdProvider>
    </div>
  );
}

export default ActivityId;
