import React, { useEffect, useContext, Fragment } from "react";
import Typography from "@material-ui/core/Typography";

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
    <Fragment>
      Total converted:<span> </span>
      <strong>
        {totalAmount && totalAmount.toFixed(2)} {totalAmountUnit}
      </strong>
      <span> | </span>
      Total number of conversion requests: <strong>{numConversions}</strong>
      <span> | </span>
      Most popular target currency: <strong>{mostPopular}</strong>
    </Fragment>
  );
};

export default StatsDisplay;
