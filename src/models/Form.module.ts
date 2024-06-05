export interface IFormInputs {
  name: string;
  email: string;
  phoneNumber: string;
  privacyPolicy: boolean;
  nameOfForm: ESelectedRadio;
}

export enum ESelectedRadio {
  GET_CATALOG = "get catalog",
  GET_PRICE = "get price",
  ORDER_DEMO = "order demo",
  RECEIVE_CONSULTATION = "receive a consultation",
}

export interface IFormData {
  countryCode: string;
  email: string;
  name: string;
  phoneNumber: string;
  privacyPolicy: boolean;
  nameOfForm: ESelectedRadio;
  query: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  };
  ipAddress: string;
  geoInfo: null | object;
  fromSite: string;
}

export interface ErrorResponse {
  message: string;
  data?: { [key: string]: string };
  additionalInfo?: Record<string, unknown>;
}
