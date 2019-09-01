import { GET_CONVERSION } from "../types";

export interface State {
  start: string | null;
  target: string | null;
  amount: number | null;
  result: number | null;
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
    default:
      return state;
  }
};
