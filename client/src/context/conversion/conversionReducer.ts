import { GET_CONVERSION } from "../types";
import { ConversionState } from "./conversionContext";

type Action = {
  type: "GET_CONVERSION";
  payload: ConversionState;
};

export default (state: ConversionState, action: Action) => {
  switch (action.type) {
    case GET_CONVERSION:
      return {
        ...state,
        start: action.payload.start,
        target: action.payload.target,
        amount: action.payload.amount,
        result: action.payload.result
      };
    default:
      return state;
  }
};
