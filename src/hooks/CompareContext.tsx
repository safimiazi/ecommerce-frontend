import React, { createContext } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CompareContextType {
  compareList: any[];
  addToCompare: (product: any) => void;
  removeFromCompare: (productId: string) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: any }) => {
  const [compareList, setCompareList] = React.useState<any[]>([]);

  const addToCompare = (product: any) => {
    setCompareList((prevList) => {
      if (prevList.find((p) => p._id === product._id)) return prevList;
      return [...prevList, product];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) =>
      prev.filter((product) => product._id !== productId)
    );
  };

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = React.useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};
