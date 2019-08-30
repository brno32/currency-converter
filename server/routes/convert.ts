import express from "express";
import {
  query,
  validationResult,
  ValidationError,
  Result
} from "express-validator";

const { firebase_db } = require("../config");

const router = express.Router();

// @route    GET api/convert
// @desc     Convert a currency
// @access   Public
router.get(
  "/",
  [
    query("amount", "amount is required")
      .not()
      .isEmpty(),
    query("amount", "amount must be a number").isNumeric(),
    query("from", "from is required")
      .not()
      .isEmpty(),
    query("from", "from must be a string").isString(),
    query("to", "to is required")
      .not()
      .isEmpty(),
    query("to", "to must be a string").isString()
  ],
  (req: express.Request, res: express.Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let amount: number = +req.query.amount; // cast to number
    let from: string = req.query.from;
    let to: string = req.query.to;

    firebase_db.collection("conversions").add({
      amount: amount,
      from: from,
      to: to
    });

    res.send("Convert a currency");
  }
);

module.exports = router;
