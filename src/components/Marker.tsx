import { useCallback, useContext, useEffect } from "react";
import MapContext from "@/context/MapContext";
import { StoreType } from "@/interface";

interface MakerProps {
  store: StoreType;
}

export default function Marker({ store }: MakerProps) {
  const context = useContext(MapContext);

  const loadKakoMarker = useCallback(() => {
    if (context?.map && store) {
      const markerPosition = new window.kakao.maps.LatLng(
        store?.lat,
        store?.lng
      );

      var marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(context?.map);

      var content = `<div class="infowindow">${store?.name}</div>`;

      var customOverlay = new window.kakao.maps.CustomOverlay({
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
    }
  }, [context?.map, store]);

  useEffect(() => {
    loadKakoMarker();
  }, [loadKakoMarker, context?.map]);

  return <></>;
}
