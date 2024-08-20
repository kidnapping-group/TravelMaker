import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useUpdateQuery = (queryKey: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = useCallback(
    (value: string | number | null) => {
      const params = new URLSearchParams(searchParams);

      if (value === null) {
        params.delete(queryKey);
      } else {
        params.set(queryKey, String(value));
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams, queryKey],
  );

  return updateQuery;
};

export default useUpdateQuery;
