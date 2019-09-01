import express from "express";

import db from "../config";

type QuerySnapshot = import("firebase").firestore.QuerySnapshot;
type DocumentSnapshot = import("firebase").firestore.DocumentSnapshot;
type DocumentData = import("firebase").firestore.DocumentData;

const statsController = async (req: express.Request, res: express.Response) => {
  let documents: QuerySnapshot = await db.collection("conversions").get();

  // Tracks how many times a currency has been a target
  let destCurrs: { [currency: string]: number } = {};
  // Tracks the amount converted using a base currency
  let totalAmount: number = 0;

  // Loop through logs and populate based off their contents
  documents.forEach((doc: DocumentSnapshot) => {
    const data: DocumentData | undefined = doc.data();

    if (data != undefined) {
      // Normalized base amount stored with every log
      totalAmount += data.baseAmount;
      // Count number of occurences for each currency
      destCurrs[data.to] = destCurrs[data.to] + 1 || 0;
    }
  });

  // Calculate the most frequently converted currency
  let mostPopular: any = Object.keys(destCurrs).reduce((max, current) =>
    destCurrs[max] > destCurrs[current] ? max : current
  );

  res.json({
    totalAmount: totalAmount,
    mostPopular: mostPopular,
    numConversions: documents.size
  });
};

export default statsController;
