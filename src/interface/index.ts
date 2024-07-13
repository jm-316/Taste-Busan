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
  user?: UserInterface[];
}

export interface StoreApiResponse {
  data: StoreType[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}

export interface LikeApiResponse {
  data: LikeInterface[];
  totalPage?: number;
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

export interface UserInterface {
  id: number;
  store?: StoreType;
}
