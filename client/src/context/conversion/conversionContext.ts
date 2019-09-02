import { createContext } from "react";

export interface Conversion {
  amount: number;
  start: string;
  target: string;
  result?: number | null;
  getConversions?: (params: Conversion) => void;
}

export const initialState: Conversion = {
  start: "",
  target: "",
  amount: 0,
  result: null
};

const conversionContext = createContext<Conversion>(initialState);

export default conversionContext;
