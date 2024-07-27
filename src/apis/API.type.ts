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
  page: number;
  size: number;
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

export interface posttActivitiesImageRes {
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