"use client";
import { createContext, useContext, useMemo, useState } from "react";

type CardSelectionContextValue = {
  selectedCardId: number | null;
  setSelectedCardId: (id: number) => void;
};

const CardSelectionContext = createContext<CardSelectionContextValue | null>(
  null
);

export function useCardSelection() {
  const ctx = useContext(CardSelectionContext);
  if (!ctx) throw new Error("useCardSelection must be used within CardSelectionProvider");
  return ctx;
}

export function CardSelectionProvider({
  children,
  initialSelectedId,
}: {
  children: React.ReactNode;
  initialSelectedId: number | null;
}) {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(
    initialSelectedId
  );

  const value = useMemo(
    () => ({ selectedCardId, setSelectedCardId }),
    [selectedCardId]
  );

  return (
    <CardSelectionContext.Provider value={value}>
      {children}
    </CardSelectionContext.Provider>
  );
}

