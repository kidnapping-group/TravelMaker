import { useActivityId } from "@/app/[activityId]/_contexts/ActivityIdContext";
import { getActivityPrice } from "@/app/[activityId]/_utils/getActivityData";
import { activityIdOptions } from "@/app/[activityId]/activityId";
import formatKoreanWon from "@/utils/formatKoreanWon";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetActivityFooterViewModel = () => {
  const { activityId } = useActivityId();
  const { data } = useSuspenseQuery(activityIdOptions(activityId));
  const price = getActivityPrice(data);
  const formattedPrice = formatKoreanWon(price);

  return {
    formattedPrice,
  };
};

export default useGetActivityFooterViewModel;
