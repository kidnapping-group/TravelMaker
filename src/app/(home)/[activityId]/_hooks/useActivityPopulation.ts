import { useState } from "react";

export interface PopulationActions {
  increasePopulation: () => void;
  decreasePopulation: () => void;
}

const useActivityPopulation = () => {
  const [population, setPopulation] = useState(1);

  const decreasePopulation = () => {
    setPopulation(prev => Math.max(1, prev - 1));
  };

  const increasePopulation = () => {
    setPopulation(prev => Math.min(99, prev + 1));
  };

  const populationActions: PopulationActions = {
    decreasePopulation,
    increasePopulation,
  };

  return {
    population,
    populationActions,
  };
};

export default useActivityPopulation;
