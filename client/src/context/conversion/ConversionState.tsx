import React, { useReducer } from "react";
import axios from "axios";
import ConversionContext, {
  Conversion,
  initialState
} from "./conversionContext";
import conversionReducer from "./conversionReducer";
import { GET_CONVERSION } from "../types";

const ConversionState = (props: React.ComponentProps<any>) => {
  const [state, dispatch] = useReducer(conversionReducer, initialState);

  const getConversions = async (params: Conversion) => {
    try {
      let results = await axios.get("/api/convert", {
        params: {
          from: params.start,
          to: params.target,
          amount: params.amount
        }
      });
      dispatch({ type: GET_CONVERSION, payload: results.data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ConversionContext.Provider
      value={{
        start: state.start,
        target: state.target,
        amount: state.amount,
        result: state.result,
        getConversions
      }}
    >
      {props.children}
    </ConversionContext.Provider>
  );
};

export default ConversionState;
