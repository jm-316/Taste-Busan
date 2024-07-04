"use client";

import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

interface MarkerProps {
  map: any;
  storeDatas: any;
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({
  map,
  storeDatas,
  setCurrentStore,
}: MarkerProps) {
  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      storeDatas?.map(
        (store: { lat: string; lng: string; main_title: string }) => {
          const markerPosition = new window.kakao.maps.LatLng(
            store?.lat,
            store?.lng
          );

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(map);

          const content = `<div class="infowindow">${store?.main_title}</div>`;

          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: markerPosition,
            content: content,
            xAnchor: 0.6,
            yAnchor: 0.91,
          });

          window.kakao.maps.event.addListener(marker, "mouseover", function () {
            customOverlay.setMap(map);
          });

          window.kakao.maps.event.addListener(marker, "mouseout", function () {
            customOverlay.setMap(null);
          });

          window.kakao.maps.event.addListener(marker, "click", function () {
            setCurrentStore(store);
          });
        }
      );
    }
  }, [map, setCurrentStore, storeDatas]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);
  return <></>;
}
