"use client";

import Dropdown from "@/components/Dropdown";
import useUpdateQuery from "@/hooks/useUpdateQuery";
import { useSearchParams } from "next/navigation";

const sortTitle: Record<string, string> = {
  인기순: "most_reviewed",
  최신순: "latest",
  "낮은 가격순": "price_asc",
  "높은 가격순": "price_desc",
};

function SortDropdown() {
  const updateQuery = useUpdateQuery();

  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort");

  const currentSortName = Object.keys(sortTitle).find(key => sortTitle[key] === currentSort);

  const handleMenuItemClick = (status: string) => {
    updateQuery("sort", sortTitle[status]);
  };

  return (
    <Dropdown
      type="round"
      placeHolder={currentSortName}
      menuItems={["인기순", "최신순", "낮은 가격순", "높은 가격순"]}
      onChangeDropdown={handleMenuItemClick}
    />
  );
}

export default SortDropdown;
