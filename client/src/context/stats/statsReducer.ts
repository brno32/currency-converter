import { GET_STATS } from "../types";
import { Stats } from "./statsContext";

type Action = {
  type: "GET_STATS";
  payload: Stats;
};

export default (state: Stats, action: Action) => {
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
