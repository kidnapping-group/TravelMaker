// import { getActivitiesRes } from "@/apis/API.type";
// import myActivitiesAPI from "@/apis/myActivitiesAPI";
// import { QueryClient } from "@tanstack/react-query";

// export const deleteActivityIdMutation = (queryClient: QueryClient) => ({
//   mutationFn: (id: string) => myActivitiesAPI.delete(Number(id)),
//   onMutate: async (id: string) => {
//     await queryClient.cancelQueries({ queryKey: ["activities"] });
//     const previousActivities = queryClient.getQueryData(["activities"]);
//     queryClient.setQueryData(["activities"], (old: getActivitiesRes) =>
//       old.filter((activity: any) => activity.id !== id),
//     );
//     return { previousActivities };
//   },
//   onError: (error: Error, _, context: any) => {
//     // 에러 발생 시 이전 데이터로 롤백
//     if (context?.previousActivities) {
//       queryClient.setQueryData(["activities"], context.previousActivities);
//     }
//   },
//   onSettled: () => {
//     queryClient.invalidateQueries({ queryKey: ["activities"] });
//   },
// });

// export const PostReservationMutation = () => {};
