import { createContext, ReactNode, useContext, useState } from "react";
import { PlanItem } from "../api/plans/plans.types";

interface PlansContextType {
  selectedPlan: PlanItem | null;
  setSelectedPlan: (plan: PlanItem | null) => void;
}

const PlansContext = createContext<PlansContextType>({
  selectedPlan: null,
  setSelectedPlan: () => {},
});

export const PlansProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanItem | null>(null);

  return (
    <PlansContext.Provider value={{ selectedPlan, setSelectedPlan }}>
      {children}
    </PlansContext.Provider>
  );
};

export const usePlans = () => useContext(PlansContext);
