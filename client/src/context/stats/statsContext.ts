import { createContext } from "react";

export interface Stats {
  totalAmount: number;
  totalAmountUnit: string;
  numConversions: number;
  mostPopular: string;
  getStats?: () => void;
}

export const initialState: Stats = {
  totalAmount: 0,
  totalAmountUnit: "",
  numConversions: 0,
  mostPopular: ""
};

const statsContext = createContext(initialState);

export default statsContext;
