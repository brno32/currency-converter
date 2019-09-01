import { GET_CONVERSION, GET_STATS } from "../types";

export interface State {
  start: string | null;
  target: string | null;
  amount: number | null;
  result: number | null;
  totalAmount: number | null;
  numConversions: number | null;
  mostPopular: string | null;
}

export default (state: State, action: any) => {
  switch (action.type) {
    case GET_CONVERSION:
      return {
        ...state,
        start: action.payload.start,
        target: action.payload.target,
        amount: action.payload.amount,
        result: action.payload.result
      };
    case GET_STATS:
      return {
        ...state,
        totalAmount: action.payload.totalAmount,
        numConversions: action.payload.numConversions,
        mostPopular: action.payload.mostPopular
      };
    default:
      return state;
  }
};
