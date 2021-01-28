import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export function AppProvider({ children, value }) {
  return (
    <AppContext.Provider
      value={{
        ...value,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppStore = () => useContext(AppContext);
