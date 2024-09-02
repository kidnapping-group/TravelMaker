"use client";

import { useSearchParams } from "next/navigation";

import useUpdateQuery from "@/hooks/useUpdateQuery";

import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/components/Dropdown";

const SORTS = [
  {
    query: "most_reviewed",
    name: "인기순",
  },
  { query: "latest", name: "최신순" },
  { query: "price_asc", name: "낮은 가격순" },
  { query: "price_desc", name: "높은 가격순" },
];
const PARAM_NAME = "sort";

function SortDropdown() {
  const updateQuery = useUpdateQuery(PARAM_NAME);

  const searchParams = useSearchParams();
  const currentSort =
    SORTS.find(sort => sort.query === searchParams.get(PARAM_NAME))?.name ?? undefined;

  const handleMenuItemClick = (value: string) => {
    updateQuery(value);
  };

  return (
    <Dropdown onSelect={handleMenuItemClick}>
      <DropdownTrigger placeholder={currentSort} />
      <DropdownContent>
        {SORTS.map(sort => (
          <DropdownItem key={sort.query} value={sort.query}>
            {sort.name}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}

export default SortDropdown;
