import React, { useReducer } from "react";
import axios from "axios";
import ConversionContext from "./conversionContext";
import conversionReducer from "./conversionReducer";
import { GET_CONVERSION, GET_STATS } from "../types";

const ConversionState = (props: any) => {
  const initialState = {
    conversions: null
  };

  const [state, dispatch] = useReducer(conversionReducer, initialState);

  // Get Conversions
  const getConversions = async (params: any) => {
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
        conversions: state.conversions,
        getConversions
      }}
    >
      {props.children}
    </ConversionContext.Provider>
  );
};

export default ConversionState;
