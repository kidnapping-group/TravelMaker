"use client";

import useUpdateQuery from "@/hooks/useUpdateQuery";
import { useSearchParams } from "next/navigation";

import Tab from "./Tab";

interface TabListProps {
  paramName: string;
  paramValues: string[];
}

function TabList({ paramName, paramValues }: TabListProps) {
  const updateQuery = useUpdateQuery();

  const searchParams = useSearchParams();
  const currentTab = searchParams.get(paramName);

  return (
    <ul className="flex gap-3">
      <li>
        <Tab
          selected={currentTab === null}
          onClick={() => {
            updateQuery(paramName, null);
          }}
        >
          전체
        </Tab>
      </li>
      {paramValues.map(paramValue => (
        <li key={paramValue}>
          <Tab
            selected={currentTab === paramValue}
            onClick={() => {
              updateQuery(paramName, paramValue);
            }}
          >
            {paramValue}
          </Tab>
        </li>
      ))}
    </ul>
  );
}

export default TabList;
