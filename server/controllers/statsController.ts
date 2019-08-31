import express from "express";

import db from "../config";

type QuerySnapshot = import("firebase").firestore.QuerySnapshot;
type DocumentSnapshot = import("firebase").firestore.DocumentSnapshot;

const statsController = async (req: express.Request, res: express.Response) => {
  let documents: QuerySnapshot = await db.collection("conversions").get();

  // Tracks how many times a currency has been a target
  let destCurrs: { [currency: string]: number } = {};
  // Tracks the amount converted using a base currency
  let totalAmountConverted: number = 0;

  documents.forEach((doc: DocumentSnapshot) => {
    let data = doc.data();
    if (data != undefined) {
      totalAmountConverted += data.baseAmount;
      destCurrs[data.to] = destCurrs[data.to] + 1 || 0;
    }
  });

  // Calculate the most frequently converted currency
  let top_dest_currency: any = Object.keys(destCurrs).reduce((max, current) =>
    destCurrs[max] > destCurrs[current] ? max : current
  );

  res.json({
    totalAmountConverted: totalAmountConverted,
    top_dest_currency: top_dest_currency,
    total_conversions: documents.size
  });
};

export default statsController;
