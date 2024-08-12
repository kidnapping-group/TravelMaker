export type getActivitiesRes = {
  cursorId: number;
  totalCount: number;
  activities: {
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
  }[];
};

export type getActivities = {
  method?: "offset";
  cursorId?: number | null;
  category?: "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙" | null;
  keyword?: string | null;
  sort?: "most_reviewed" | "price_asc" | "price_desc" | "latest" | null;
  page?: number;
  size?: number;
};

export type postActivities = {
  title: string;
  category: "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙";
  description: string;
  address: string;
  price: number;
  schedules: {
    endTime: string;
    startTime: string;
    date: string;
  }[];
  bannerImageUrl: string;
  subImageUrls: string[];
};

export type postActivitiesRes = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙";
  price: number;
  address: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  bannerImageUrl: string;
  subImageUrls: {
    id: number;
    imageUrl: string;
  }[];
  schedules: {
    endTime: string;
    startTime: string;
    date: string;
    id: number;
  }[];
};

export type getActivitiesInfo = {
  id: number;
};

export type getActivitiesInfoRes = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙";
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: {
    id: number;
    imageUrl: string;
  }[];
  schedules: {
    endTime: string;
    startTime: string;
    date: string;
    id: number;
  }[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type getActivitiesSchedule = {
  id: number;
  year: string;
  month: string;
};

export type getActivitiesScheduleRes = {
  date: string;
  times: {
    endTime: string;
    startTime: string;
    id: number;
  }[];
};

export type getActivitiesReviews = {
  id: number;
  page?: number;
  size?: number;
};

export type ActivityReviewUser = {
  profileImageUrl: string;
  nickname: string;
  id: number;
};

export type ActivityReview = {
  id: number;
  user: ActivityReviewUser;
  activitiesId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type getActivitiesReviewsRes = {
  averageRating: number;
  totalCount: number;
  reviews: ActivityReview[];
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

export type UsersRes = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type patchUsers = {
  nickname: string;
  profileImageUrl: string;
  newPassword: string;
};

export type postUsersImageRes = {
  profileImageUrl: string;
};

export type getReservation = {
  cursorId?: string;
  size?: number;
  status?: "pending" | "confirmed" | "declined" | "canceled" | "completed";
};

export type ReservationRes = {
  cursorId: number;
  reservations: {
    id: number;
    teamId: string;
    userId: number;
    activity: {
      bannerImageUrl: string;
      title: string;
      id: number;
    };
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
  }[];
  totalCount: number;
};

export type patchReservationRes = {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
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
  notifications: {
    id: number;
    teamId: string;
    userId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }[];
  totalCount: number;
};

export type Login = {
  email: string;
  password: string;
};
export type LoginRes = {
  user: {
    id: string;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
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
  reservations: {
    pending: number;
    confirmed: number;
    completed: number;
  };
};

export type getReservationDate = {
  activityId: number;
  date: string;
};

export type getReservationDateRes = {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
};

export type getMyReservation = {
  activityId: number;
  cursorId?: number;
  size?: number;
  scheduleId: number;
  status: "pending" | "confirmed" | "declined" | "canceled" | "completed";
};

export type getMyReservationRes = {
  cursorId: number;
  totalCount: number;
  reservations: {
    id: number;
    nickname: string;
    userId: number;
    teamId: string;
    activityId: number;
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
  }[];
};

export type patchMyReservation = {
  activityId: number;
  reservationId: number;
  status: "declined" | "pending" | "confirmed";
};

export type patchMyReservationRes = {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
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

export type patchMyActivities = {
  title: string;
  category: "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙";
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
};

export type patchMyActivitiesRes = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙";
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: {
    imageUrl: string;
    id: number;
  }[];
  schedules: {
    times: {
      endTime: string;
      startTime: string;
      id: number;
    }[];
    date: string;
  }[];
};

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
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
};
