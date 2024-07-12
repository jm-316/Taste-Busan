export interface StoreType {
  id: number;
  name?: string | null;
  phone?: string | null;
  lat?: number;
  lng?: number;
  address?: string | null;
  menu?: string | null;
  time?: string | null;
  homepage?: string | null;
  localCategory?: string | null;
  likes?: LikeInterface[];
}

export interface StoreApiResponse {
  data: StoreType[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}

export interface Location {
  lat: number;
  lng: number;
  zoom: number;
}

export interface SearchType {
  query?: string;
  district?: string;
}

export interface LikeInterface {
  id: number;
  storeId: number;
  userId: number;
  store?: StoreType;
}
