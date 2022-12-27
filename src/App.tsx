import React, { useEffect, useState } from "react";

import { Db } from "../server";

import "./App.css";

const App = (): JSX.Element => {
  const [todos, setToDos] = useState<Db>();

  const [newname, setNewName] = useState("");
  const [newauthor, setNewAuthor] = useState("");

  const [newId, setNewId] = useState("");

  useEffect(() => {
    fetch("/api/todos").then((res) =>
      res.json().then((db: Db) => setToDos(db)),
    );
  }, [newId]);
  const onSubmit = async (): Promise<void> => {
    const data = await fetch("/api/todos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ name: newname, author: newauthor }),
    });
    setNewId(await data.json());
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Название</th>
            <th>Автор</th>
          </tr>
        </thead>
        <tbody>
          {todos?.toDos.map(({ name, id, author }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{author}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="App">
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <input
            name="newname"
            value={newname}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            name="newauthor"
            value={newauthor}
            onChange={(e) => setNewAuthor(e.target.value)}
          />
          <input
            type="submit"
            value="Отправить"
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          />
        </form>
      </div>
    </>
  );
};

export default App;
