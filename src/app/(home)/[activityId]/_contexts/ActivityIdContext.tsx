"use client";

import React, { ReactNode, createContext, useContext, useMemo } from "react";

interface ActivityIdContextType {
  activityId: string;
}

const ActivityIdContext = createContext<ActivityIdContextType | undefined>(undefined);

export const useActivityId = () => {
  const context = useContext(ActivityIdContext);
  if (context === undefined) {
    throw new Error("useActivityId must be used within an ActivityIdProvider");
  }
  return context;
};

interface ActivityIdProviderProps {
  children: ReactNode;
  activityId: string;
}

export function ActivityIdProvider({ children, activityId }: ActivityIdProviderProps) {
  const value = useMemo(() => ({ activityId }), [activityId]);

  return <ActivityIdContext.Provider value={value}>{children}</ActivityIdContext.Provider>;
}
