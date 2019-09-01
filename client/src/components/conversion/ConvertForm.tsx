import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";

import CurrencySelect from "./CurrencySelect";
import ConversionDisplay from "./ConversionDisplay";

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
    amount: "",
    start: "",
    target: "",
    result: ""
  });

  const { amount, start, target, result } = state;

  const onStartSelect = (currency: string) => {
    setState({ ...state, start: currency });
  };

  const onTargetSelect = (currency: string) => {
    setState({ ...state, target: currency });
  };

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, amount: event.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (start === "" || target === "") return;

    let results = await axios.get("/api/convert", {
      params: {
        from: start,
        to: target,
        amount: amount
      }
    });

    console.log(results.data);

    setState({
      ...state,
      result: results.data.toAmount
    });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={onSubmit}>
        <TextField
          required
          label="Amount"
          type="number"
          className={classes.textField}
          onChange={onTextChange}
        ></TextField>
        <CurrencySelect
          placeholder="Starting currency"
          onSelect={onStartSelect}
        />
        <CurrencySelect
          placeholder="Target currency"
          onSelect={onTargetSelect}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Convert
        </Button>
      </form>
      {result && (
        <ConversionDisplay
          amount={amount}
          result={result}
          start={start}
          target={target}
        />
      )}
    </Container>
  );
};

export default ConvertForm;