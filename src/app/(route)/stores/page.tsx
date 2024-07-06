"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useCallback, useEffect, useRef } from "react";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import { StoreType } from "@/interface";
import StoreList from "@/components/StoreList";
import Loading from "@/components/Loading";
import Loader from "@/components/Loader";

export default function StorePage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios("/api/stores?page=" + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
      },
    });

    return data;
  };

  const {
    data: stores,
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage]);

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-bold">
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
          stores?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((store: StoreType) => (
                <StoreList store={store} key={store.id} />
              ))}
            </React.Fragment>
          ))
        )}
      </ul>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
}
