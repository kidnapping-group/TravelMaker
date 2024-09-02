import { useSuspenseQuery } from "@tanstack/react-query";

import formatKoreanWon from "@/utils/formatKoreanWon";

import { useActivityId } from "../_contexts/ActivityIdContext";
import { getActivityPrice } from "../_utils/getActivityData";
import { activityIdOptions } from "../queryOptions";

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
