"use client";

import Dropdown from "@/components/Dropdown";

function page() {
  return (
    <main className="mx-20 my-20 flex flex-col gap-10">
      <Dropdown
        menuItems={[
          "인기순",
          "가격 낮은순",
          "가격 높은순",
          "최신순",
          "최신순",
          "최신순",
          "최신순",
          "최신순",
          "최신순",
        ]}
        onChangeDropdown={() => {}}
      />
      <Dropdown
        menuItems={["인기순", "가격 낮은순", "가격 높은순", "최신순"]}
        onChangeDropdown={() => {}}
      />
    </main>
  );
}

export default page;
