import { getActivitiesInfoRes } from "@/apis/API.type";

export const getActivityDescription = (data: getActivitiesInfoRes) => {
  if (!data?.description) return "";
  return data?.description;
};

export const getActivityAddress = (data: getActivitiesInfoRes) => {
  if (!data?.address) return "";
  return data?.address;
};

export const getActivityCategory = (data: getActivitiesInfoRes) => {
  if (!data?.category) return "";
  return data?.category;
};

export const getActivityTitle = (data: getActivitiesInfoRes) => {
  if (!data?.title) return "";
  return data?.title;
};

export const getActivityRating = (data: getActivitiesInfoRes) => {
  if (!data?.rating) return 0;
  return data?.rating;
};

export const getActivityReviewCount = (data: getActivitiesInfoRes) => {
  if (!data?.reviewCount) return 0;
  return data?.reviewCount;
};

export const getActivityBannerImage = (data: getActivitiesInfoRes) => {
  if (!data?.bannerImageUrl) return "";
  return data?.bannerImageUrl;
};

export const getActivitySubImages = (data: getActivitiesInfoRes) => {
  if (!data?.subImages) return [];
  return data?.subImages;
};

export const getActivityPrice = (data: getActivitiesInfoRes) => {
  if (!data?.price) return 0;
  return data?.price;
};

export const getActivityUserId = (data: getActivitiesInfoRes) => {
  if (!data?.userId) return 0;
  return data?.userId;
};

export const getActivityTotalImages = (data: getActivitiesInfoRes) => {
  const bannerImage = getActivityBannerImage(data);
  const subImages = getActivitySubImages(data);
  const subImageUrls = subImages.map(subImage => subImage.imageUrl);
  return [bannerImage, ...subImageUrls];
};

export const getActivitySchedules = (data: getActivitiesInfoRes) => {
  if (!data?.schedules) return [];
  return data?.schedules;
};

export const getActivityReservationTime = (data: getActivitiesInfoRes, selectedDate: string) => {
  const schedules = getActivitySchedules(data);
  const reservationTimes = schedules
    .filter(item => item.date === selectedDate)
    .map(item => [item.startTime, item.endTime]);
  return reservationTimes;
};

export const getActivityReservationId = (data: getActivitiesInfoRes, selectedDate: string) => {
  const schedules = getActivitySchedules(data);
  const reservationId = schedules.find(item => item.date === selectedDate)?.id || null;

  return reservationId;
};

export const getActivitySchedulesTime = (
  data: getActivitiesInfoRes,
  selectedTime: string | null,
) => {
  if (selectedTime === null) return null;
  const schedules = getActivitySchedules(data);
  const [startTime, endTime] = selectedTime.split("~");
  const scheduleTime =
    schedules.find(item => item.startTime === startTime && item.endTime === endTime)?.id || null;

  return scheduleTime;
};
