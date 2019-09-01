import React, { Fragment, useContext, useEffect } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import ConversionContext from "../../context/conversion/conversionContext";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const ConversionDisplay = () => {
  const conversionContext: any = useContext(ConversionContext);
  const { start, target, amount, result } = conversionContext;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {result.toFixed(2)}
        </Typography>
        <Typography variant="body2" component="p">
          From {start} to {target}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ConversionDisplay;
