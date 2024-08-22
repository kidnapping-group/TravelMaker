const createQueryString = (params: Record<string, string | null | undefined>): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.set(key, value);
    }
  });

  return queryParams.toString();
};

export default createQueryString;
