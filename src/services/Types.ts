export interface ErrorResponse {
  code?: string;
  message?: string | null;
}

export interface ProductState {
  id: string | number;
}

export interface FilteredProductState extends ProductState {
  terms?: string[];
}
export interface ErrorStates {
  [key: string]: ErrorResponse;
}
export interface ApiList {
  [apiName: string]: { url: string; method: string };
}

export interface RequestData {
  errorKey?: string;
  errorMess?: string;
  showLoading?: boolean;
}
export interface ResponseData<T> {
  status: string;
  message: string;
  data: T;
}

export interface User {
  id: number;
  uid: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  gender: string;
  phone_number: string;
  social_insurance_number: string;
  date_of_birth: string;
  employment: Employment;
  address: Address;
  credit_card: CreditCard;
  subscription: Subscription;
}

export interface Employment {
  title: string;
  key_skill: string;
}

export interface Address {
  city: string;
  street_name: string;
  street_address: string;
  zip_code: string;
  state: string;
  country: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CreditCard {
  cc_number: string;
}

export interface Subscription {
  plan: string;
  status: string;
  payment_method: string;
  term: string;
}

export type RootStackParam = {
  Onboarding: { step: number };
  DetailsScreen: undefined;
};
