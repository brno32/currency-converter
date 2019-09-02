import express from "express";
import path from "path";

import { PORT } from "./config";

const app: express.Application = express();

app.use("/api/convert", require("./routes/convert"));
app.use("/api/stats", require("./routes/stats"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
