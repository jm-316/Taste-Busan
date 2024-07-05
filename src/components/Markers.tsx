"use client";

import { useDispatch, useSelector } from "react-redux";
import { useCallback, useContext, useEffect } from "react";
import { setCurrentStore, setLocation } from "@/slices/mapSlice";
import MapContext from "@/context/MapContext";
import { RootState } from "@/store/store";
import { StoreType } from "@/interface";

interface MarkerProps {
  stores: StoreType[];
}

export default function Markers({ stores }: MarkerProps) {
  const location = useSelector((state: RootState) => state.map.locationState);
  const context = useContext(MapContext);
  const dispatch = useDispatch();

  const loadKakaoMarkers = useCallback(() => {
    if (context?.map) {
      stores?.map((store) => {
        const markerPosition = new window.kakao.maps.LatLng(
          store?.lat,
          store?.lng
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(context?.map);

        const content = `<div class="infowindow">${store?.name}</div>`;

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          customOverlay.setMap(context?.map);
        });

        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          customOverlay.setMap(null);
        });

        window.kakao.maps.event.addListener(marker, "click", function () {
          dispatch(setCurrentStore(store));
          dispatch(
            setLocation({
              ...location,
              lat: store?.lat as number,
              lng: store?.lng as number,
            })
          );
        });
      });
    }
  }, [context?.map, stores]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, context?.map]);
  return <></>;
}
