import { Activities } from "@/apis/API.type";

const isMyActivity = (myActivitiesData: Activities[], activityId: string): boolean => {
  if (!myActivitiesData || !Array.isArray(myActivitiesData)) {
    return false;
  }
  return myActivitiesData.some(item => item.id === Number(activityId));
};
export default isMyActivity;
