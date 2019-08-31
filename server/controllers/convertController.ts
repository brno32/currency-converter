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

  let fromAmount: number = +req.query.amount; // cast to number
  let from: string = req.query.from;
  let to: string = req.query.to;

  const ratesResults: AxiosResponse = await axios.get(`${ratesEndpoint}`, {
    params: {
      app_id: API_ID,
      base: baseCurrency,
      symbols: `${from},${to},${baseCurrency}`
    }
  });

  const data: CurrencyData = ratesResults.data;

  // Validate input values are recognized by the external API
  let currencyTypeErrors = [];
  if (!(from in data.rates)) {
    currencyTypeErrors.push({
      msg: `${from} is not a valid currency`,
      param: "from",
      location: "query"
    });
  }
  if (!(to in data.rates)) {
    currencyTypeErrors.push({
      msg: `${to} is not a valid currency`,
      param: "to",
      location: "query"
    });
  }

  if (currencyTypeErrors.length > 0) {
    return res.status(400).json({ errors: currencyTypeErrors });
  }

  // Get base currency
  let baseAmount = fromAmount / data.rates[from];
  // Convert base currency to targer currency
  let toAmount = baseAmount * data.rates[to];

  // Log this request to firebase for statistics tracking
  db.collection("conversions").add({
    baseAmount: baseAmount,
    from: from,
    to: to
  });

  // send relevant data back to user
  res.json({
    fromAmount: fromAmount,
    toAmount: toAmount,
    from: from,
    to: to
  });
};

export default convertController;
