import React, { useReducer } from "react";
import axios from "axios";
import ConversionContext from "./conversionContext";
import conversionReducer, { State } from "./conversionReducer";
import { GET_CONVERSION, GET_STATS } from "../types";

interface Conversion {
  amount: number;
  start: string;
  target: string;
}

const ConversionState = (props: React.ComponentProps<any>) => {
  const initialState: State = {
    start: null,
    target: null,
    amount: null,
    result: null,
    totalAmount: 0,
    numConversions: 0,
    mostPopular: null
  };

  const [state, dispatch] = useReducer(conversionReducer, initialState);

  // Get Conversions
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

  const getStats = async () => {
    try {
      let results = await axios.get("/api/stats");
      dispatch({ type: GET_STATS, payload: results.data });
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
        totalAmount: state.totalAmount,
        numConversions: state.numConversions,
        mostPopular: state.mostPopular,
        getConversions,
        getStats
      }}
    >
      {props.children}
    </ConversionContext.Provider>
  );
};

export default ConversionState;
