import express from "express";
const router = express.Router();

// @route    GET api/stats
// @desc     Get statistics about this site
// @access   Public
router.get("/", (req, res) => {
  res.send("Collect stats");
});

module.exports = router;
