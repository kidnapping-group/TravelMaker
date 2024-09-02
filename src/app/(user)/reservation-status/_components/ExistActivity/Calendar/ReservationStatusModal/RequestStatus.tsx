import { Dispatch, SetStateAction } from "react";

import { StatusCount } from "@/apis/API.type";

interface RequestStatusProps {
  statusCount: StatusCount;
  selectedStatus: keyof StatusCount;
  setSelectedStatus: Dispatch<SetStateAction<keyof StatusCount>>;
}

function RequestStatus({ statusCount, selectedStatus, setSelectedStatus }: RequestStatusProps) {
  const statusButtons = [
    { key: "pending", label: "신청" },
    { key: "confirmed", label: "승인" },
    { key: "declined", label: "거절" },
  ] as const;

  return (
    <div className="flex flex-col">
      <div className="flex">
        {statusButtons.map(({ key, label }) => (
          <div
            key={key}
            className={`flex min-w-[72px] flex-col gap-[6px] text-xl font-semibold text-gray-700 ${selectedStatus === key && "text-primary-800"}`}
          >
            <button type="button" onClick={() => setSelectedStatus(key)}>
              {label} {statusCount[key]}
            </button>
            {selectedStatus === key && <div className="rounded-xl border-2 border-primary-800" />}
          </div>
        ))}
      </div>
      <div className="-mx-6 border" />
    </div>
  );
}

export default RequestStatus;
