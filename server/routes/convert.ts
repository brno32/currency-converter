import express from "express";
const router = express.Router();

// @route    GET api/convert
// @desc     Convert a currency
// @access   Public
router.get("/", (req, res) => {
  res.send("Convert a currency");
});

module.exports = router;
