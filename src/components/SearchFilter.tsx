import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { setSearchState } from "@/slices/mapSlice";
import { RootState } from "@/store/store";
import { DISTRICT_ARR } from "@/data/store";

export default function SearchFilter() {
  const search = useSelector((state: RootState) => state.map.searchState);
  const dispatch = useDispatch();

  const handleChange = (field: string, value: string) => {
    dispatch(setSearchState({ ...search, [field]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 my-4  rounded-lg border">
      <div className="flex items-center justify-center w-full gap-2 ">
        <FiSearch className="w-6 h-6 pl-2" />
        <input
          type="search"
          placeholder="음식점 검색"
          onChange={(e) => handleChange("query", e.target.value)}
          className="block w-full p-3 text-sm text-gray-800 border-gray-300 outline-none "
        />
      </div>
      <select
        onChange={(e) => handleChange("district", e.target.value)}
        className="border border-gray-300 text-gray-800 text-sm md:max-w-[200px] outline-none block w-full p-3 rounded-lg ">
        <option value="">지역 선택 </option>
        {DISTRICT_ARR.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
}
