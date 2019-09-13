import React, { useEffect, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
    <Card>
      <CardContent>
        <Typography variant="h6" component="p">
          Total converted:<span> </span>
          <strong>
            {totalAmount && totalAmount.toFixed(2)} {totalAmountUnit}
          </strong>
        </Typography>
        <Typography variant="h6" component="p">
          Total conversion requests: <strong>{numConversions}</strong>
        </Typography>
        <Typography variant="h6" component="p">
          Top target currency: <strong>{mostPopular}</strong>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsDisplay;
