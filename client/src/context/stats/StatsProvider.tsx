import React, { useReducer } from "react";
import axios from "axios";
import StatsContext, { initialState } from "./statsContext";
import statsReducer from "./statsReducer";
import { GET_STATS } from "../types";

const StatsProvider = (props: React.ComponentProps<any>) => {
  const [state, dispatch] = useReducer(statsReducer, initialState);

  const getStats = async () => {
    try {
      let results = await axios.get("/api/stats");
      dispatch({ type: GET_STATS, payload: results.data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StatsContext.Provider
      value={{
        totalAmount: state.totalAmount,
        totalAmountUnit: state.totalAmountUnit,
        numConversions: state.numConversions,
        mostPopular: state.mostPopular,
        getStats
      }}
    >
      {props.children}
    </StatsContext.Provider>
  );
};

export default StatsProvider;
