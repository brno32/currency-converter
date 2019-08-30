import express from "express";

const app: express.Application = express();

app.get("/", (req, res) => {
  res.send("Welcome to Currency Converter");
});
app.use("/api/convert", require("./routes/convert"));
app.use("/api/stats", require("./routes/stats"));

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
