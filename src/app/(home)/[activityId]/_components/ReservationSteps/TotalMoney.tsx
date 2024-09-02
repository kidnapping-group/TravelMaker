import { FaMinus, FaPlus } from "react-icons/fa6";

import formatKoreanWon from "@/utils/formatKoreanWon";

import { PopulationActions } from "../../_hooks/useActivityPopulation";

interface TotalMoneyProps {
  population: number;
  populationActions: PopulationActions;
  price: number;
}

function TotalMoney({ population, populationActions, price }: TotalMoneyProps) {
  const totalMoney = formatKoreanWon(price * population);

  return (
    <div>
      <h2 className="mt-4">참여 인원</h2>
      <div className="mt-4 flex w-fit rounded-md border">
        <button type="button" onClick={populationActions.decreasePopulation} className="p-[10px]">
          <FaMinus />
        </button>
        <button type="button" className="flex h-10 w-10 items-center justify-center text-gray-700">
          {population}
        </button>
        <button type="button" onClick={populationActions.increasePopulation} className="p-[10px]">
          <FaPlus />
        </button>
      </div>
      <div className="mt-4 border-t" />
      <div className="my-4 flex items-center justify-between">
        <h2>총 합계</h2>
        <p>{totalMoney}</p>
      </div>
    </div>
  );
}

export default TotalMoney;
