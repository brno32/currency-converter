import express from "express";

const { firebase_db } = require("../config");

const router = express.Router();

type QuerySnapshot = import("firebase").firestore.QuerySnapshot;
type DocumentSnapshot = import("firebase").firestore.DocumentSnapshot;

// @route    GET api/stats
// @desc     Get statistics about this site
// @access   Public
router.get("/", async (req, res) => {
  let documents: QuerySnapshot = await firebase_db
    .collection("conversions")
    .get();

  let destCurrs: { [currency: string]: number } = {};

  documents.forEach((doc: DocumentSnapshot) => {
    let data = doc.data();

    if (data != undefined) destCurrs[data.to] = destCurrs[data.to] + 1 || 0;
  });

  let top_dest_currency: any = Object.keys(destCurrs).reduce((max, current) =>
    destCurrs[max] > destCurrs[current] ? max : current
  );

  res.json({
    top_dest_currency: top_dest_currency,
    total_conversions: documents.size
  });
});

module.exports = router;
