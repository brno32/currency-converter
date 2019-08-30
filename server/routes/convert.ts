import express from "express";

import convertValidator from "../validators/convertValidator";
import convertController from "../controllers/convertController";

const router = express.Router();

// @route    GET api/convert
// @desc     Convert a currency
// @access   Public
router.get("/", convertValidator, convertController);

module.exports = router;
