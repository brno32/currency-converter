import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

interface Props {
  amount: number;
  result: number;
  start: string;
  target: string;
}

const ConversionDisplay = (props: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.result.toFixed(2)}
        </Typography>
        <Typography variant="body2" component="p">
          From {props.amount} {props.start} to {props.target}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ConversionDisplay;
