import myActivitiesAPI from "@/apis/myActivitiesAPI";
import { useActivityId } from "@/app/[activityId]/_contexts/ActivityIdContext";

const useControlDropdownMenu = () => {
  const handleDelete = async () => {
    const { activityId } = useActivityId();
    await myActivitiesAPI.delete(Number(activityId));
  };

  return { handleDelete };
};

export default useControlDropdownMenu;
