const activitySectionQueryKeys = {
  all: ["activities"] as const,
  list: (filters: {
    category?: string;
    keyword?: string;
    sort: string;
    page: number;
    size: number;
  }) => [...activitySectionQueryKeys.all, "list", filters] as const,
};

export default activitySectionQueryKeys;
