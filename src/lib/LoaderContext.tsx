import React, { createContext, useContext, useState } from "react";

type LoaderContextType = {
  loading: boolean;
  message: string;
  showLoader: (message?: string) => void;
  hideLoader: () => void;
};

const LoaderContext = createContext<LoaderContextType>({
  loading: false,
  message: "Loading...",
  showLoader: () => {},
  hideLoader: () => {},
});

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("Loading...");

  const showLoader = (msg?: string) => {
    setMessage(msg ?? "Loading...");
    setLoading(true);
  };
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, message, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};