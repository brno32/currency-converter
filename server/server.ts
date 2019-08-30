import express from "express";

const app: express.Application = express();

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
