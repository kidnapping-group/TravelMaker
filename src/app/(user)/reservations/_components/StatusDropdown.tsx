import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/components/Dropdown";

const STATUSES = [
  { name: "all", title: "전체 예약" },
  { name: "pending", title: "예약 신청" },
  { name: "canceled", title: "예약 취소" },
  { name: "confirmed", title: "예약 승인" },
  { name: "declined", title: "예약 거절" },
  { name: "completed", title: "체험 완료" },
  { name: "pending", title: "마감 완료" },
];

interface StatusDropdownProps {
  placeholder?: string;
  onSelect: (status: string | undefined, statusTitle: string) => void;
}

function StatusDropdown({ placeholder, onSelect }: StatusDropdownProps) {
  const handleSelectStatus = (statusName: string) => {
    const statusTitle = STATUSES.find(status => status.name === statusName)?.title ?? "";
    onSelect(statusName === "all" ? undefined : statusName, statusTitle);
  };

  return (
    <Dropdown onSelect={handleSelectStatus}>
      <DropdownTrigger placeholder={placeholder} />
      <DropdownContent>
        {STATUSES.map(status => (
          <DropdownItem key={status.title} value={status.name}>
            {status.title}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}

export default StatusDropdown;
