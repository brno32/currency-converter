import React, { useEffect, useContext } from "react";

import StatsContext from "../../context/stats/statsContext";

const Stats = () => {
  const conversionContext: any = useContext(StatsContext);
  const {
    totalAmount,
    totalAmountUnit,
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
      Total converted:{" "}
      <strong>
        {totalAmount.toFixed(2)} {totalAmountUnit}
      </strong>
      <span> | </span>
      Total number of conversion requests: <strong>{numConversions}</strong>
      <span> | </span>
      Most popular target currency: <strong>{mostPopular}</strong>
    </div>
  );
};

export default Stats;
