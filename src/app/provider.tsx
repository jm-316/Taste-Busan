"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { MapProvider } from "@/context/MapContext";
import Navbar from "@/components/Navbar";

interface Props {
  children?: React.ReactNode;
}

const queryClient = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <MapProvider>
        <QueryClientProvider client={queryClient}>
          {children}
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
