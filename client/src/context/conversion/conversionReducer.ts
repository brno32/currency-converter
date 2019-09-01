import { GET_CONVERSION, GET_STATS } from "../types";

export default (state: any, action: any) => {
  switch (action.type) {
    case GET_CONVERSION:
      return {
        ...state,
        conversions: action.payload
      };
    default:
      return state;
  }
};
