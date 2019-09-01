import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import ConversionContext from "../../context/conversion/conversionContext";

const ConversionDisplay = () => {
  const conversionContext: any = useContext(ConversionContext);
  const { start, target, amount, result } = conversionContext;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {result.toFixed(2)}
        </Typography>
        <Typography variant="body2" component="p">
          From {start} to {target}
        </Typography>
        <Typography variant="body2" component="p">
          Base amount: {amount}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ConversionDisplay;
