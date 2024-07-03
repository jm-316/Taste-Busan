/*global kakao*/
"use client";

import Script from "next/script";
import React from "react";
import * as stores from "@/data/store_data.json";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const loadkakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOptions = {
        center: new window.kakao.maps.LatLng(35.156233328065, 129.05793488419),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOptions);

      stores?.["item"]?.map((store) => {
        const markerPosition = new window.kakao.maps.LatLng(
          store?.lat,
          store?.lng
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
      });
    });
  };
  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadkakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
