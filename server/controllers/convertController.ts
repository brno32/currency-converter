import express from "express";
import { validationResult, ValidationError, Result } from "express-validator";
import axios, { AxiosResponse } from "axios";

import db, { ratesEndpoint, API_ID, baseCurrency } from "../config";

interface CurrencyData {
  base: string;
  rates: { [currency: string]: number };
}

const convertController = async (
  req: express.Request,
  res: express.Response
) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let amount: number = +req.query.amount; // cast to number
  let from: string = req.query.from;
  let to: string = req.query.to;

  const ratesResults: AxiosResponse = await axios.get(`${ratesEndpoint}`, {
    params: {
      app_id: API_ID,
      base: baseCurrency,
      symbols: `${from},${to},${baseCurrency}`
    }
  });

  const data = ratesResults.data;

  let baseAmount = amount / data.rates[from];
  let toAmount = baseAmount * data.rates[to];

  // Log this request to firebase for statistics tracking
  db.collection("conversions").add({
    baseAmount: baseAmount,
    from: from,
    to: to
  });

  // send relevant data back to user
  res.json({
    fromAmount: amount,
    toAmount: toAmount,
    from: from,
    to: to
  });
};

export default convertController;
