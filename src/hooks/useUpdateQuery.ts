import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useUpdateQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = useCallback(
    (paramName: string, paramValue: string | null) => {
      const params = new URLSearchParams(searchParams);

      if (paramValue === null) {
        params.delete(paramName);
      } else {
        params.set(paramName, paramValue);
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  return updateQuery;
};

export default useUpdateQuery;
