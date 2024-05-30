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
