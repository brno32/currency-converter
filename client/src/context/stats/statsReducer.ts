import { GET_STATS } from "../types";

export interface State {
  totalAmount: number | null;
  totalAmountUnit: string | null;
  numConversions: number | null;
  mostPopular: string | null;
}

type Action = {
  type: "GET_STATS";
  payload: State;
};

export default (state: State, action: Action) => {
  switch (action.type) {
    case GET_STATS:
      return {
        ...state,
        totalAmount: action.payload.totalAmount,
        totalAmountUnit: action.payload.totalAmountUnit,
        numConversions: action.payload.numConversions,
        mostPopular: action.payload.mostPopular
      };
    default:
      return state;
  }
};
