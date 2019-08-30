import express from "express";

import { PORT } from "./config";

const app: express.Application = express();

app.get("/", (req, res) => {
  res.send("Welcome to Currency Converter");
});
app.use("/api/convert", require("./routes/convert"));
app.use("/api/stats", require("./routes/stats"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
