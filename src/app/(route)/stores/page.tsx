"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import StoreList from "@/components/StoreList";
import { StoreType } from "@/interface";
import Loading from "@/components/Loading";

export default function StorePage() {
  const {
    data: stores,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const { data } = await axios(`/api/stores`);
      return data;
    },
  });

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요.
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8 mt-7">
      <ul role="list" className="divide-y divide-gray-300">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.map((store: StoreType) => (
            <StoreList store={store} key={store.id} />
          ))
        )}
      </ul>
    </div>
  );
}
