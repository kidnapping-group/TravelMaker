"use client";

import Dropdown from "@/components/Dropdown";
import useUpdateQuery from "@/hooks/useUpdateQuery";
import { useSearchParams } from "next/navigation";

const SORT_NAME: Record<string, string> = {
  most_reviewed: "인기순",
  latest: "최신순",
  price_asc: "낮은 가격순",
  price_desc: "높은 가격순",
};
const PARAM_NAME = "sort";

function SortDropdown() {
  const updateQuery = useUpdateQuery(PARAM_NAME);

  const searchParams = useSearchParams();
  const currentSort = searchParams.get(PARAM_NAME);

  const handleMenuItemClick = (status: string) => {
    const selectedSortKey = Object.keys(SORT_NAME).find(key => SORT_NAME[key] === status);
    if (selectedSortKey) {
      updateQuery(selectedSortKey);
    }
  };

  return (
    <Dropdown
      placeHolder={currentSort ? SORT_NAME[currentSort] : undefined}
      menuItems={Object.values(SORT_NAME)}
      onChangeDropdown={handleMenuItemClick}
    />
  );
}

export default SortDropdown;
