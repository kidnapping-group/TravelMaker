"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function ReactQueryProviders({ children }: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1 * 60 * 1000, // 데이터 'stale' 상태 시간
          gcTime: 5 * 60 * 1000, // 캐시된 데이터 유효 시간
          retry: 1, // 쿼리 실패 시 1번 재시도
          refetchOnMount: false, // 컴포넌트 마운트 시 자동 리페치 안 함
          refetchOnReconnect: false, // 네트워크 재연결 시 자동 리페치 안 함
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
