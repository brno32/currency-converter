import express from "express";

const { firebase_db } = require("../config");

const router = express.Router();

type QuerySnapshot = import("firebase").firestore.QuerySnapshot;
type DocumentSnapshot = import("firebase").firestore.DocumentSnapshot;

// @route    GET api/stats
// @desc     Get statistics about this site
// @access   Public
router.get("/", async (req, res) => {
  let documents = await firebase_db.collection("conversions").get();
  documents.forEach((doc: DocumentSnapshot) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });

  res.json({
    total_conversions: documents.size
  });
});

module.exports = router;
