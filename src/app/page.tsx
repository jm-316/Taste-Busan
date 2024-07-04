"use client";

import { useState } from "react";
import Map from "@/components/Map";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
import * as stores from "@/data/store_data.json";

export default function Home() {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const storeDatas = stores["item"];
  return (
    <>
      <Map setMap={setMap} />
      <Markers
        map={map}
        storeDatas={storeDatas}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}
