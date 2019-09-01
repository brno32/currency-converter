import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import ConversionContext from "../../context/conversion/conversionContext";

interface State {
  total: number;
  conversions: number;
  mostPopular: string;
}

const Stats = () => {
  const conversionContext: any = useContext(ConversionContext);
  const {
    totalAmount,
    numConversions,
    mostPopular,
    getStats
  } = conversionContext;

  useEffect(() => {
    getStats();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      Total converted: <strong>${totalAmount.toFixed(2)}</strong>
      <span> | </span>
      Total number of conversion requests: <strong>{numConversions}</strong>
      <span> | </span>
      Most popular target currency: <strong>{mostPopular}</strong>
    </div>
  );
};

export default Stats;
