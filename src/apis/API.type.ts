export type User = {
  id: string;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type ReviewUser = Omit<User, "email" | "createdAt" | "updatedAt">;

export type Reviews = {
  id: number;
  user: ReviewUser;
  activitiesId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};
export type Activities = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type SchedulesToAdd = Omit<Schedules, "id">;

export type Schedules = {
  endTime: string;
  startTime: string;
  date: string;
  id: number;
};

export type SubImageUrls = {
  id: number;
  imageUrl: string;
};

export type Times = {
  endTime: string;
  startTime: string;
  id: number;
};

export type ReservationActivity = {
  bannerImageUrl: string;
  title: string;
  id: number;
};

export type ReservationBase = {
  id: number;
  nickname: string;
  teamId: string;
  userId: number;
  activity: ReservationActivity;
  activityId: number;
  scheduleId: number;
  status: "pending" | "confirmed" | "declined" | "canceled" | "completed" | "closed";
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};
export type Reservations = Omit<ReservationBase, "nickname" | "activityId">;

export type MyReservation = Omit<ReservationBase, "activity">;

export type ReservationsStatus = {
  pending: number;
  confirmed: number;
  completed: number;
};

export type Notifications = {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type getActivitiesRes = {
  cursorId: number;
  totalCount: number;
  activities: Activities[];
};

export type StatusCount = {
  declined: number;
  confirmed: number;
  pending: number;
};

export type getActivities = {
  method?: "offset";
  cursorId?: number | null;
  category?: string | null;
  keyword?: string | null;
  sort?: string | null;
  page?: number;
  size?: number;
};

export type postActivities = {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: SchedulesToAdd[];
  bannerImageUrl: string;
  subImageUrls: string[];
};

export type BaseActivitiesRes = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  bannerImageUrl: string;
  subImageUrls: SubImageUrls[];
  subImages: SubImageUrls[];
  schedules: Schedules[];
};

export type getActivitiesInfoRes = Omit<BaseActivitiesRes, "subImageUrls">;

export type postActivitiesRes = Omit<BaseActivitiesRes, "subImages">;

export type getActivitiesInfo = {
  id: number;
};

export type getActivitiesSchedule = {
  id: number;
  year: string;
  month: string;
};

export type getActivitiesScheduleRes = {
  date: string;
  times: Times[];
};

export type getActivitiesReviews = {
  id: number;
  page?: number;
  size?: number;
};

export type getActivitiesReviewsRes = {
  averageRating: number;
  totalCount: number;
  reviews: Reviews[];
};

export type postActivitiesReservations = {
  scheduleId: number;
  headCount: number;
};

export type postActivitiesReservationsRes = {
  id: number;
  teamId: string;
  userId: number;
  activitiesId: number;
  scheduleId: number;
  status: "pending" | "confirmed" | "declined" | "canceled" | "completed";
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type postActivitiesImage = {
  image: string;
};

export type postActivitiesImageRes = {
  activitiesImageUrl: string;
};

export type postUsers = {
  email: string;
  nickname: string;
  password: string;
};

export type patchUsers = {
  nickname?: string;
  profileImageUrl?: string | null;
  newPassword?: string;
};

export type postUsersImageRes = {
  profileImageUrl: string;
};

export type getReservation = {
  cursorId?: number;
  size?: number;
  status?: string;
};

export type ReservationRes = {
  cursorId: number;
  reservations: Reservations[];
  totalCount: number;
};

export type patchReservationRes = Omit<ReservationBase, "nickname" | "activity">;

export type postReviews = {
  rating: number;
  content: string;
};

export type postReviewsRes = {
  deletedAt: string;
  updatedAt: string;
  createdAt: string;
  content: string;
  rating: number;
  userId: number;
  activityId: number;
  teamId: string;
  id: number;
};

export type getNotifications = {
  cursorId?: number;
  size?: number;
};

export type getNotificationsRes = {
  cursorId: number | null;
  notifications: Notifications[];
  totalCount: number;
};

export type Login = {
  email: string;
  password: string;
};

export type LoginRes = {
  user: User;
  refreshToken: string;
  accessToken: string;
};

export type getReservationMonth = {
  activityId: number;
  year: string;
  month: string;
};

export type getReservationMonthRes = {
  date: string;
  reservations: ReservationsStatus;
};

export type getReservationDate = {
  activityId: number;
  date: string;
};

export type getReservationDateRes = {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: StatusCount;
};

export type getMyReservation = {
  activityId: number;
  cursorId?: number;
  size?: number;
  scheduleId: number;
  status: string;
};

export type getMyReservationRes = {
  cursorId: number;
  totalCount: number;
  reservations: MyReservation[];
};

export type patchMyReservation = {
  activityId: number;
  reservationId: number;
  status: "declined" | "pending" | "confirmed";
};

export type patchMyReservationRes = Omit<ReservationBase, "nickname" | "activityId">;

export type patchMyActivities = {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: SchedulesToAdd[];
};

export type patchMyActivitiesRes = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: SubImageUrls[];
  schedules: patchMyActivitiesSchedules[];
};

export type patchMyActivitiesSchedules = getActivitiesScheduleRes;

export type OauthPostRes = {
  id: number;
  provider: string;
  teamId: string;
  appKey: string;
  createdAt: string;
  updatedAt: string;
};

export type OauthSignRes = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
