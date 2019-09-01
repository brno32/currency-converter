import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import CurrencySelect from "./CurrencySelect";
import ConversionContext from "../../context/conversion/conversionContext";

interface FormState {
  amount: number | null;
  start: string | null;
  target: string | null;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    spaced: {
      margin: theme.spacing(1)
    }
  })
);

const ConvertForm = () => {
  const conversionContext: any = useContext(ConversionContext);
  const { getConversions, getStats } = conversionContext;

  const classes = useStyles();
  const [state, setState] = React.useState<FormState>({
    amount: null,
    start: null,
    target: null
  });

  const { amount, start, target } = state;

  // For fetching selected value from child CurrencySelect component
  const onStartSelect = (currency: string) => {
    setState({ ...state, start: currency });
  };

  // For fetching selected value from child CurrencySelect component
  const onTargetSelect = (currency: string) => {
    setState({ ...state, target: currency });
  };

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, amount: Number(event.target.value) });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // React Select does not support required fields
    if (start === null || target === null) {
      alert("Please select a start and target currency!");
      return;
    }

    getConversions({
      start: start,
      target: target,
      amount: amount
    });

    // Trigger fetching of stats
    getStats();
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        required
        label="Amount"
        type="number"
        className={classes.spaced}
        onChange={onTextChange}
      ></TextField>
      <CurrencySelect
        placeholder="Starting currency"
        onSelect={onStartSelect}
        className={classes.spaced}
      />
      <CurrencySelect
        placeholder="Target currency"
        onSelect={onTargetSelect}
        className={classes.spaced}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.spaced}
        type="submit"
      >
        Convert
      </Button>
    </form>
  );
};

export default ConvertForm;
