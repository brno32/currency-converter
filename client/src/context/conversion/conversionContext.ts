import { createContext } from "react";

export interface Conversion {
  amount: number;
  start: string;
  target: string;
}

export interface State {
  start: string | null;
  target: string | null;
  amount: number | null;
  result: number | null;
  getConversions?: (params: Conversion) => void;
}

export const initialState: State = {
  start: null,
  target: null,
  amount: null,
  result: null
};

const conversionContext = createContext<State>(initialState);

export default conversionContext;
