import { ESelectedRadio } from "../models";

interface IRadioOption {
  id: number;
  value: ESelectedRadio;
  label: string;
}

export const radioOptions: IRadioOption[] = [
  {
    id: 0,
    value: ESelectedRadio.GET_CATALOG,
    label: "Get catalog",
  },
  { id: 1, value: ESelectedRadio.GET_PRICE, label: "Get price" },
  { id: 2, value: ESelectedRadio.ORDER_DEMO, label: "Order demo" },
  {
    id: 3,
    value: ESelectedRadio.RECEIVE_CONSULTATION,
    label: "Receive a consultation",
  },
];
