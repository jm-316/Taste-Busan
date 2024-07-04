import { AiOutlineClose, AiOutlinePhone } from "react-icons/ai";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { TbWorld } from "react-icons/tb";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface StoreBoxProps {
  store: any;
  setStore: Dispatch<SetStateAction<any>>;
}

export default function StoreBox({ store, setStore }: StoreBoxProps) {
  const isEmptyObject = (obj: object) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-t-lg shadow-lg max-x-sm md:max-w-xl z-10 w-full bg-white">
      {store && (
        <>
          <div className="p-7">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-blue-700 text-lg">
                  {store?.main_title}
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <AiOutlineClose />
              </button>
            </div>
            <div className="flex justify-between gap-4">
              <div className="mt-4 flex gap-2 items-center col-span-3">
                <FiMapPin />
                {store?.addr1 || "주소가 없습니다."}
              </div>
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlinePhone />
              {store?.cntct_tel}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <MdOutlineRestaurantMenu />
              {store?.rprsntv_menu}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <IoIosTimer />
              {store?.usage_day_week_and_time}
            </div>
            {isEmptyObject(store?.homepage_url) ? (
              ""
            ) : (
              <div className="mt-2 flex gap-2 items-center">
                <TbWorld />
                <div
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "220px",
                  }}>
                  {isEmptyObject(store?.homepage_url) ? (
                    ""
                  ) : (
                    <Link href={store.homepage_url}>{store.homepage_url}</Link>
                  )}
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg">
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
