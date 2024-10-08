"use client";

import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/components/Dropdown";

interface CategoryDropdownProps {
  selectedCategory: string;
  setSelectedCategory: (selectedCategory: string) => void;
}

export default function CategoryDropdown({
  selectedCategory,
  setSelectedCategory,
}: CategoryDropdownProps) {
  const dropdownList = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Dropdown onSelect={handleCategory} wide>
      <DropdownTrigger placeholder={selectedCategory || "카테고리"} />
      <DropdownContent>
        {dropdownList.map(category => (
          <DropdownItem key={category} value={category}>
            {category}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}
