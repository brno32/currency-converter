import express from "express";
import { validationResult, ValidationError, Result } from "express-validator";

import db from "../config";

const convertController = (req: express.Request, res: express.Response) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let amount: number = +req.query.amount; // cast to number
  let from: string = req.query.from;
  let to: string = req.query.to;

  db.collection("conversions").add({
    amount: amount,
    from: from,
    to: to
  });

  res.send("Convert a currency");
};

export default convertController;
