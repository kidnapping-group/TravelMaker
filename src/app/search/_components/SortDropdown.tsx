"use client";

import Dropdown from "@/components/Dropdown";
import useUpdateQuery from "@/hooks/useUpdateQuery";

const sortTitle: Record<string, string> = {
  인기순: "most_reviewed",
  최신순: "latest",
  "낮은 가격순": "price_asc",
  "높은 가격순": "price_desc",
};

function SortDropdown() {
  const updateQuery = useUpdateQuery();

  const handleMenuItemClick = (status: string) => {
    updateQuery("sort", sortTitle[status]);
  };

  return (
    <Dropdown
      type="round"
      menuItems={["인기순", "최신순", "낮은 가격순", "높은 가격순"]}
      onChangeDropdown={handleMenuItemClick}
    />
  );
}

export default SortDropdown;
