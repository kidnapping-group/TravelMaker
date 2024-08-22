import { Activities, getActivitiesRes } from "@/apis/API.type";
import myActivitiesAPI from "@/apis/myActivitiesAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useDeleteActivityMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteActivityMutation = useMutation({
    mutationFn: (id: string) => myActivitiesAPI.delete(Number(id)),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["activities"] });
      const previousActivities = queryClient.getQueryData<getActivitiesRes>(["activities"]);
      queryClient.setQueryData<Activities[]>(["activities"], old =>
        old ? old.filter(activity => activity.id !== Number(id)) : [],
      );
      return { previousActivities };
    },
    onError: (
      error: Error,
      id: string,
      context: { previousActivities: getActivitiesRes | undefined } | undefined,
    ) => {
      if (context?.previousActivities) {
        queryClient.setQueryData(["activities"], context.previousActivities);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      router.push("/");
    },
  });

  return { deleteActivityMutation, ...deleteActivityMutation };
};

export default useDeleteActivityMutation;
