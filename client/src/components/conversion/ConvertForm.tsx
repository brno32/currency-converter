import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import CurrencySelect from "./CurrencySelect";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      margin: theme.spacing(1)
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

const ConvertForm = () => {
  const classes = useStyles();
  const [state, setState] = React.useState<any>({
    amount: ""
  });

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, amount: event.target.value });
  };

  return (
    <Container maxWidth="sm">
      <form action="/" method="GET">
        <TextField
          label="Amount"
          className={classes.textField}
          onChange={onTextChange}
        ></TextField>
        <CurrencySelect placeholder="Starting currency" />
        <CurrencySelect placeholder="Target currency" />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Convert
        </Button>
      </form>
    </Container>
  );
};

export default ConvertForm;
