import { createContext } from "react";

export interface Conversion {
  amount: number | null;
  start: string | null;
  target: string | null;
}

export interface ConversionState {
  start: string | null;
  target: string | null;
  amount: number | null;
  result: number | null;
  getConversions?: (params: Conversion) => void;
}

export const initialState: ConversionState = {
  start: null,
  target: null,
  amount: null,
  result: null
};

const conversionContext = createContext<ConversionState>(initialState);

export default conversionContext;
