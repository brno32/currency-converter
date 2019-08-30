import express from "express";

import db from "../config";

type QuerySnapshot = import("firebase").firestore.QuerySnapshot;
type DocumentSnapshot = import("firebase").firestore.DocumentSnapshot;

const statsController = async (req: express.Request, res: express.Response) => {
  let documents: QuerySnapshot = await db.collection("conversions").get();

  let destCurrs: { [currency: string]: number } = {};

  documents.forEach((doc: DocumentSnapshot) => {
    let data = doc.data();

    if (data != undefined) destCurrs[data.to] = destCurrs[data.to] + 1 || 0;
  });

  let top_dest_currency: any = Object.keys(destCurrs).reduce((max, current) =>
    destCurrs[max] > destCurrs[current] ? max : current
  );

  // TODO: add in total amount converted
  res.json({
    top_dest_currency: top_dest_currency,
    total_conversions: documents.size
  });
};

export default statsController;
