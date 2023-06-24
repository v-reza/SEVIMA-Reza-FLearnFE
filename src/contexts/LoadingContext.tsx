"use client"
import clsx from "clsx";
import React from "react";
import { Spinner } from 'flowbite-react';

type FormProps = {
  loading: boolean;
  showLoadingOverlay: (message?: string | null) => void;
  hideLoadingOverlay: () => void;
};

export const LoadingContext = React.createContext<FormProps>({
  loading: false,
  showLoadingOverlay: () => {},
  hideLoadingOverlay: () => {},
});

export const useLoadingContext = () => {
  const context = React.useContext(LoadingContext);
  if (!context) {
    throw new Error("useMyContext must be used under MyContextProvider");
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const LoadingOverlay = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const showLoadingOverlay = (message?: string | null) => {
    if (message) setMessage(message);
    setLoading(true);
  };

  const hideLoadingOverlay = () => {
    setLoading(false);
    setMessage("");
  };

  const value: FormProps = { loading, showLoadingOverlay, hideLoadingOverlay };
  return (
    <LoadingContext.Provider value={value}>
      {loading && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-gray-700 flex items-center justify-center flex-column"
          style={{ width: "100%", height: "100%", zIndex: 9999, opacity: 0.5 }}
        >
          <Spinner aria-label="Default status example" />
          {message && (
            <h3 className="text-primary fs-4 fw-bold">
              {message ?? "Loading..."}
            </h3>
          )}
        </div>
      )}
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingOverlay;
