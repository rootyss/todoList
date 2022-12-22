import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello");
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Running on port ${port}`));
