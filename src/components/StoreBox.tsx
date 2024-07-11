"use client";

import { AiOutlineClose, AiOutlinePhone } from "react-icons/ai";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { TbWorld } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { setCurrentStore } from "@/slices/mapSlice";

export default function StoreBox() {
  const store = useSelector((state: RootState) => state.map.currentStoreState);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-t-lg shadow-lg max-x-sm md:max-w-xl z-10 w-full bg-white">
      {store && (
        <>
          <div className="p-7">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-blue-700 text-lg">
                  {store?.name}
                </div>
              </div>
              <button
                type="button"
                onClick={() => dispatch(setCurrentStore(null))}>
                <AiOutlineClose />
              </button>
            </div>
            <div className="flex justify-between gap-4">
              <div className="mt-4 flex gap-2 items-center col-span-3">
                <FiMapPin />
                {store?.address || "주소가 없습니다."}
              </div>
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlinePhone />
              {store?.phone}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <MdOutlineRestaurantMenu />
              {store?.menu}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <IoIosTimer />
              {store?.time}
            </div>
            {store?.homepage && (
              <div className="mt-2 flex gap-2 items-center">
                <TbWorld />
                <div
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "220px",
                  }}>
                  <Link href={store?.homepage}>{store.homepage}</Link>
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
            onClick={() => router.push(`/stores/${store.id}`)}>
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
