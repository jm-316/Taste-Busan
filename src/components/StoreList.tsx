import { useRouter } from "next/navigation";
import { StoreType } from "@/interface";

interface StoreListProps {
  store?: StoreType;
}

export default function StoreList({ store }: StoreListProps) {
  const router = useRouter();

  return (
    <li
      className="flex justify-between gap-6 py-5 cursor-pointer hover:bg-gray-50"
      key={store?.id}
      onClick={() => router.push(`/stores/${store?.id}`)}>
      <div className="flex gap-x-4">
        <div>
          <div className="text-sm leading-6 text-blue-800 font-bold">
            {store?.name}
          </div>
          <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
            {store?.phone || "번호없음"}
          </div>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <div className="text-sm leading-6  text-blue-900 font-bold">
          {store?.address}
        </div>
        <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
          {store?.menu} | {store?.time}
        </div>
      </div>
    </li>
  );
}
