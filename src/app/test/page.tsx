"use client";

import Pagination from "@/components/Pagination";
import useViewport from "@/hooks/useViewport";
import { useEffect, useState } from "react";

function Page({ searchParams }: { searchParams: { page: string } }) {
  const viewport = useViewport();
  const [data, setData] = useState({ totalCount: 0, activities: [] });
  const perPage = Number(searchParams.page ?? "1");
  const getSize = (e: string): number => {
    if (e === "pc") return 8;
    if (e === "tablet") return 9;
    return 4;
  };

  const size = getSize(viewport);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        `https://sp-globalnomad-api.vercel.app/4-15/activities?method=offset&page=${perPage}&size=${size}`,
      );
      const newData = await res.json();
      setData(newData);
    };
    load();
  }, [size, perPage]);

  return (
    <div>
      <Pagination totalCount={data.totalCount} pageSize={size} />
    </div>
  );
}

export default Page;
