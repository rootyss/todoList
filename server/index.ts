import { uniqueId } from "lodash";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT;

type Todo = {
  id: string;
  name: string;
  author: string;
};

export type Db = {
  toDos: Todo[];
};

const db: Db = {
  toDos: [{ id: "0", name: "new-todo", author: "rooty" }],
};

app.use(express.json());

app.get("/api/todos", (req, res) => {
  res.json(db);
});

app.post("/api/todos/add", (req, res) => {
  const newId = uniqueId();
  const { name, author } = req.body;
  db.toDos.push({ id: newId, name, author });
  res.status(200).json({ requestBody: newId });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Running on port ${port}`));
