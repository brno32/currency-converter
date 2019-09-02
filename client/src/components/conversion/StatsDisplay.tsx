import React, { useEffect, useContext } from "react";

import StatsContext, { Stats } from "../../context/stats/statsContext";

const StatsDisplay = () => {
  const statsContext: Stats = useContext(StatsContext);
  const {
    totalAmount,
    totalAmountUnit,
    numConversions,
    mostPopular,
    getStats
  } = statsContext;

  useEffect(() => {
    if (getStats !== undefined) {
      getStats();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      Total converted:<span> </span>
      <strong>
        {totalAmount && totalAmount.toFixed(2)} {totalAmountUnit}
      </strong>
      <span> | </span>
      Total number of conversion requests: <strong>{numConversions}</strong>
      <span> | </span>
      Most popular target currency: <strong>{mostPopular}</strong>
    </div>
  );
};

export default StatsDisplay;
