import express from "express";
import { validationResult, ValidationError, Result } from "express-validator";
import axios, { AxiosResponse } from "axios";

import db, { ratesEndpoint, API_ID, baseCurrency } from "../config";

interface CustomError {
  msg: string;
  param: string;
  location: string;
}
interface CurrencyData {
  base: string;
  rates: rates;
}
type rates = { [currency: string]: number };

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
  const currencyTypeErrors = checkCurrencyTypes(from, to, data.rates);

  if (currencyTypeErrors.length > 0) {
    return res.status(400).json({ errors: currencyTypeErrors });
  }

  // Get base currency
  let baseAmount: number = fromAmount / data.rates[from];
  // Convert base currency to targer currency
  let toAmount: number = baseAmount * data.rates[to];

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

// Helper methods
const checkCurrencyTypes = (
  fromCur: string,
  toCur: string,
  rates: rates
): CustomError[] => {
  let currencyTypeErrors: CustomError[] = [];
  if (!(fromCur in rates)) {
    currencyTypeErrors.push({
      msg: `${fromCur} is not a valid currency`,
      param: "from",
      location: "query"
    });
  }
  if (!(toCur in rates)) {
    currencyTypeErrors.push({
      msg: `${toCur} is not a valid currency`,
      param: "to",
      location: "query"
    });
  }
  return currencyTypeErrors;
};

export default convertController;
