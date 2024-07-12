"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/Loader";
import Map from "@/components/Map";
import Marker from "@/components/Marker";
import Like from "@/components/Like";

export default function StoreDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { status } = useSession();
  const id = params.id;
  const router = useRouter();

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${id}`);
    return data;
  };

  const {
    data: store,
    isError,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: [`store-${id}`],
    queryFn: fetchStore,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요.
      </div>
    );
  }

  if (isFetching) return <Loader className="mt-[20%]" />;

  const handleDelete = async () => {
    const confirm = window.confirm("해당 가게를 삭제하시겠습니까?");

    if (confirm) {
      try {
        const result = await axios.delete(`/api/stores?id=${store.id}`);

        if (result.status === 200) {
          router.replace("/");
          toast.success("가게를 삭제했습니다.");
        } else {
          toast.error("다시 시도해주세요.");
        }
      } catch (error) {
        console.log(error);
        toast.error("다시 시도해주세요.");
      }
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8 ">
        <div className="md:flex justify-between items-center py-4 md:py-0">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              {store?.name}
            </h3>
          </div>
          {status === "authenticated" && store && (
            <div className="flex items-center gap-4 px-4 py-3">
              <Like storeId={store.id} />
              <Link
                className="underline hover:text-gray-400 text-sm"
                href={`/stores/${store?.id}/edit`}>
                수정
              </Link>
              <button
                type="button"
                className="underline hover:text-gray-400 text-sm"
                onClick={handleDelete}>
                삭제
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                주소
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.address}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                메뉴
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.menu}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                영업시간
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.time}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                연락처
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.phone}
              </dd>
            </div>
            {store?.homepage && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  홈페이지
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {store?.homepage}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
      {isSuccess && (
        <>
          <div className="detail-map overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-[600px]">
            <Map lat={store?.lat} lng={store?.lng} zoom={1} />
            <Marker store={store} />
          </div>
        </>
      )}
    </>
  );
}
