import { query } from "express-validator";

const convertValidator = [
  query("amount", "amount is required")
    .not()
    .isEmpty(),
  query("amount", "amount must be a number").isNumeric(),
  query("from", "from is required")
    .not()
    .isEmpty(),
  query("from", "from can not be a number")
    .not()
    .isNumeric(),
  query("from", "to must be 3 characters long").isLength({ min: 3, max: 3 }),
  query("to", "to is required")
    .not()
    .isEmpty(),
  query("to", "to can not be a number")
    .not()
    .isNumeric(),
  query("to", "to must be 3 characters long").isLength({ min: 3, max: 3 })
];

export default convertValidator;
