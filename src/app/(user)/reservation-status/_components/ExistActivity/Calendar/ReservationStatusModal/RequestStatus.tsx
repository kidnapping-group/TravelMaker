import { StatusCount } from "@/apis/API.type";
import { Dispatch, SetStateAction } from "react";

interface RequestStatusProps {
  status: StatusCount;
  setSelectedStatus: Dispatch<SetStateAction<keyof StatusCount>>;
}

function RequestStatus({ status, setSelectedStatus }: RequestStatusProps) {
  return (
    <div className="flex gap-6">
      <button type="button" onClick={() => setSelectedStatus("pending")}>
        신청 {status?.pending ? status.pending : 0}
      </button>
      <button type="button" onClick={() => setSelectedStatus("confirmed")}>
        승인 {status?.confirmed ? status.confirmed : 0}
      </button>
      <button type="button" onClick={() => setSelectedStatus("declined")}>
        거절 {status?.declined ? status.declined : 0}
      </button>
    </div>
  );
}

export default RequestStatus;
