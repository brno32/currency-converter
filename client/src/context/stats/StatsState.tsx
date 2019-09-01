import React, { useReducer } from "react";
import axios from "axios";
import StatsContext from "./statsContext";
import statsReducer, { State } from "./statsReducer";
import { GET_STATS } from "../types";

const StatsState = (props: React.ComponentProps<any>) => {
  const initialState: State = {
    totalAmount: 0,
    totalAmountUnit: null,
    numConversions: 0,
    mostPopular: null
  };

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

export default StatsState;
