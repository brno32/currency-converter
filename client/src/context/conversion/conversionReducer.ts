import { GET_CONVERSION, GET_STATS } from "../types";

export default (state: any, action: any) => {
  switch (action.type) {
    case GET_CONVERSION:
      return {
        ...state,
        conversions: action.payload
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
