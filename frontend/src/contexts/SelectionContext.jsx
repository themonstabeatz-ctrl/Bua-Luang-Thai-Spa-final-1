import React, { createContext, useContext, useState } from "react";

/**
 * Shared state for the booking selection between PricingSection and ContactSection.
 * Holds the currently selected massage option (name + duration + price) and
 * a pre-rendered "Selected: …" message in BOTH the user's current language
 * and Serbian (so the owner notification email always has the Serbian copy).
 */
const SelectionContext = createContext(null);

export const SelectionProvider = ({ children }) => {
  const [selection, setSelectionState] = useState(null);

  const selectTreatment = (entry) => {
    // entry: { rowIdx, optIdx, message, messageSerbian, name, duration, price }
    setSelectionState(entry);
  };

  const clearSelection = () => setSelectionState(null);

  return (
    <SelectionContext.Provider value={{ selection, selectTreatment, clearSelection }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be inside SelectionProvider");
  return ctx;
};
