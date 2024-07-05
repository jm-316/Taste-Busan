/*global kakao*/
"use client";

import { useSelector } from "react-redux";
import Script from "next/script";
import React, { useContext } from "react";
import { RootState } from "@/store/store";
import MapContext from "@/context/MapContext";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  lat?: number | null;
  lng?: number | null;
  zoom?: number;
}

export default function Map({ lat, lng, zoom }: MapProps) {
  const location = useSelector((state: RootState) => state.map.locationState);
  const context = useContext(MapContext);

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOptions = {
        center: new window.kakao.maps.LatLng(
          lat || location.lat,
          lng || location.lng
        ),
        level: zoom || location.zoom,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOptions);

      context?.setMap(map);
    });
  };
  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
