import { SetStateAction } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

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
      <button
        className="text-gray-700 transition hover:text-gray-500"
        type="button"
        onClick={() => changeMonth(-1)}
      >
        <FaAnglesLeft />
      </button>
      <h2 className="text-xl font-bold">{`${currentYear}년 ${currentMonth}월`}</h2>
      <button
        className="text-gray-700 transition hover:text-gray-500"
        type="button"
        onClick={() => changeMonth(+1)}
      >
        <FaAnglesRight />
      </button>
    </div>
  );
}

export default DateSwitcher;
