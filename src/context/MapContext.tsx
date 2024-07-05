import { Dispatch, SetStateAction, createContext, useState } from "react";

interface MapContextType {
  map: any;
  setMap: Dispatch<SetStateAction<any>>;
}

interface Props {
  children: React.ReactNode;
}

const MapContext = createContext<MapContextType | null>({
  map: null,
  setMap: () => {},
});

export const MapProvider = ({ children }: Props) => {
  const [map, setMap] = useState<any>(null);

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;
