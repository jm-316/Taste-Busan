"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { store } from "@/store/store";
import { MapProvider } from "@/context/MapContext";
import Navbar from "@/components/Navbar";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  children?: React.ReactNode;
}

const queryClient = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <MapProvider>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            {children}
            <ToastContainer
              autoClose={1000}
              pauseOnFocusLoss={false}
              pauseOnHover={false}
            />
          </SessionProvider>
        </QueryClientProvider>
      </MapProvider>
    </Provider>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Navbar />
      {children}
    </div>
  );
};
