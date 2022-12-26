import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/api/count", (req, res) => {
  res.json({ count: 1 });
});

app.post("/count", (req, res) => {
  console.log(req);
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Running on port ${port}`));
