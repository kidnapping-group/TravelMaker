export interface getActivitiesRes {
  cursorId: number;
  totalCount: number;
  activities: [
    {
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
    },
  ];
}

export interface getActivities {
  method: "offset";
  cursorId?: number | null;
  category?: string | null;
  keyword?: string | null;
  sort?: string | null;
  page?: number;
  size?: number;
}

export interface postActivities {
  title: string;
  category: string;
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
}

export interface postActivitiesRes {
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
  subImageUrls: [
    {
      id: number;
      imageUrl: string;
    },
  ];
  schedules: [
    {
      endTime: string;
      startTime: string;
      date: string;
      id: number;
    },
  ];
}

export interface getActivitiesInfo {
  id: number;
}

export interface getActivitiesInfoRes {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: [
    {
      id: number;
      imageUrl: string;
    },
  ];
  schedules: [
    {
      endTime: string;
      startTime: string;
      date: string;
      id: number;
    },
  ];
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface getActivitiesSchedule {
  id: number;
  year: string;
  month: string;
}

export interface getActivitiesScheduleRes {
  date: string;
  times: {
    endTime: string;
    startTime: string;
    id: number;
  }[];
}

export interface getActivitiesReviews {
  id: number;
  page: number;
  size: number;
}

export interface getActivitiesReviewsRes {
  averageRating: number;
  totalCount: number;
  reviews: [
    {
      id: number;
      user: {
        profileImageUrl: string;
        nickname: string;
        id: number;
      };
      activitiesId: number;
      rating: number;
      content: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
}

export interface postActivitiesReservations {
  scheduleId: number;
  headCount: number;
}

export interface postActivitiesReservationsRes {
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
}

export interface postActivitiesImage {
  image: string;
}

export interface postActivitiesImageRes {
  activitiesImageUrl: string;
}

export interface postUsers {
  email: string;
  nickname: string;
  password: string;
}

export interface UsersRes {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface patchUsers {
  nickname: string;
  profileImageUrl: string;
  newPassword: string;
}

export interface postUsersImageRes {
  profileImageUrl: string;
}

export interface getReservation {
  cursorId?: string;
  size?: number;
  status?: string;
}

export interface ReservationId {
  reservationId: number;
}

export interface ReservationRes {
  cursorId: number;
  reservations: [
    {
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
    },
  ];
  totalCount: number;
}

export interface patchReservationRes {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface postReviews {
  rating: number;
  content: string;
}

export interface postReviewsRes {
  deletedAt: string;
  updatedAt: string;
  createdAt: string;
  content: string;
  rating: number;
  userId: number;
  activityId: number;
  teamId: string;
  id: number;
}

export interface getNotifications {
  cursorId?: number;
  size?: number;
}

export interface getNotificationsRes {
  cursorId: number;
  notifications: [
    {
      id: number;
      teamId: string;
      userId: number;
      content: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string;
    },
  ];
  totalCount: number;
}
export interface NotificationId {
  NotificationId: number;
}

export interface Login {
  email: string;
  password: string;
}
export interface LoginRes {
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
}

export interface getReservationMonth {
  activityId: string;
  year: string;
  month: string;
}

export interface getReservationMonthRes {
  date: string;
  reservations: {
    pending: number;
    confirmed: number;
    completed: number;
  };
}

export interface getReservationDate {
  activityId: string;
  month: string;
}

export interface getReservationDateRes {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

export interface getMyReservation {
  activityId: string;
  cursorId?: number;
  size?: number;
  scheduleId: number;
  status: string;
}

export interface getMyReservationRes {
  cursorId: number;
  totalCount: number;
  reservations: {
    id: number;
    nickname: string;
    userId: number;
    teamId: string;
    activityId: number;
    scheduleId: number;
    status: string;
    reviewSubmitted: boolean;
    totalPrice: number;
    headCount: number;
    date: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface patchMyReservation {
  activityId: string;
  reservationId: string;
  status: "declined" | "pending" | "confirmed";
}

export interface patchMyReservationRes {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface patchMyActivities {
  title: string;
  category: string;
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
}

export interface patchMyActivitiesRes {
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
}
