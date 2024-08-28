"use client";

import { Swiper, SwiperContent } from "@/components/Swiper";
import useUpdateQuery from "@/hooks/useUpdateQuery";
import { useSearchParams } from "next/navigation";

import Tab from "./Tab";

interface TabListProps {
  paramName: string;
  paramValues: string[];
}

function TabList({ paramName, paramValues }: TabListProps) {
  const updateQuery = useUpdateQuery(paramName);

  const searchParams = useSearchParams();
  const currentTab = searchParams.get(paramName);

  return (
    <Swiper>
      <SwiperContent>
        {/* <ul className="flex gap-3">
          <li> */}
        <Tab
          selected={currentTab === null}
          onClick={() => {
            updateQuery(null);
          }}
        >
          전체
        </Tab>
        {/* </li> */}
        {paramValues.map(paramValue => (
          // <li key={paramValue}>
          <Tab
            key={paramValue}
            selected={currentTab === paramValue}
            onClick={() => {
              updateQuery(paramValue);
            }}
          >
            {paramValue}
          </Tab>
          // </li>
        ))}
        {/* </ul> */}
      </SwiperContent>
    </Swiper>
  );
}

export default TabList;
