import Image from "next/image";
import { SetStateAction } from "react";

interface DateSwitcherProps {
  setCurrentDate: (value: SetStateAction<Date>) => void;
  currentYear: number;
  currentMonth: number;
}

function DateSwitcher({ setCurrentDate, currentYear, currentMonth }: DateSwitcherProps) {
  const changeMonth = (increment: number) => {
    setCurrentDate(date => new Date(date.getFullYear(), date.getMonth() + increment, 1));
  };

  return (
    <div className="mb-4 flex items-center justify-center gap-20 tablet:gap-24">
      <button type="button" onClick={() => changeMonth(-1)}>
        <Image src="/icons/left_double_arrow.svg" alt="이전 달" width={24} height={24} />
      </button>
      <h2 className="text-xl font-bold">{`${currentYear}년 ${currentMonth}월`}</h2>
      <button type="button" onClick={() => changeMonth(+1)}>
        <Image src="/icons/right_double_arrow.svg" alt="다음 달" width={24} height={24} />
      </button>
    </div>
  );
}

export default DateSwitcher;
