import express from "express";

import statsController from "../controllers/statsController";

const router = express.Router();

// @route    GET api/stats
// @desc     Get statistics about this site
// @access   Public
router.get("/", statsController);

module.exports = router;
