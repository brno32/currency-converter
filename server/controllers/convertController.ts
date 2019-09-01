import express from "express";
import { validationResult, ValidationError, Result } from "express-validator";
import axios, { AxiosResponse } from "axios";

import db, { ratesEndpoint, EXCHANGE_API_ID, BASE_CURRENCY } from "../config";

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

  let amount: number = +req.query.amount; // cast to number
  let start: string = req.query.from;
  let target: string = req.query.to;

  const ratesResults: AxiosResponse = await axios.get(`${ratesEndpoint}`, {
    params: {
      app_id: EXCHANGE_API_ID,
      base: BASE_CURRENCY,
      symbols: `${start},${target},${BASE_CURRENCY}`
    }
  });

  const data: CurrencyData = ratesResults.data;

  // Validate input values are recognized by the external API
  const currencyTypeErrors = findCurrencyTypeErrors(start, target, data.rates);
  if (currencyTypeErrors.length > 0) {
    return res.status(400).json({ errors: currencyTypeErrors });
  }

  // Get base currency
  let baseAmount: number = amount / data.rates[start];
  // Convert base currency to targer currency
  let result: number = baseAmount * data.rates[target];

  // Log this request to firebase for statistics tracking
  db.collection("conversions").add({
    baseAmount: baseAmount,
    from: start,
    to: target
  });

  // send relevant data back to user
  res.json({
    amount: amount,
    result: result,
    start: start,
    target: target
  });
};

// Helper methods
export const findCurrencyTypeErrors = (
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
