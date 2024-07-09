import { useRouter } from "next/navigation";
import { StoreType } from "@/interface";

interface StoreListProps {
  store?: StoreType;
}

export default function StoreList({ store }: StoreListProps) {
  const router = useRouter();

  return (
    <li
      className="flex flex-col justify-between gap-3 py-5 cursor-pointer hover:bg-gray-50"
      key={store?.id}
      onClick={() => router.push(`/stores/${store?.id}`)}>
      <div className="flex justify-between ">
        <div>
          <div className="text-sm leading-6 text-blue-800 font-bold">
            {store?.name}
          </div>
        </div>
        <div className="text-sm leading-6 text-blue-900 font-bold hidden sm:flex sm:flex-col sm:items-end">
          {store?.address}
        </div>
      </div>
      <div>
        {store?.menu && (
          <div className="text-xs truncate font-semibold leading-5 text-gray-500">
            메뉴 | {store?.menu}
          </div>
        )}
        <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
          영업 시간 | {store?.time}
        </div>
        <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
          전화번호 | {store?.phone || "번호없음"}
        </div>
      </div>
    </li>
  );
}
