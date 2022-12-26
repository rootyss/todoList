import React, { useEffect, useState } from "react";

import "./App.css";

const App = (): JSX.Element => {
  const [counts, setCounts] = useState(0);

  useEffect(() => {
    fetch("/api/count", {
      method: "GET",
    }).then((res) => res.json().then(({ count }) => setCounts(count)));
  }, []);

  return (
    <div className="App">
      {counts}
      <form method="post" action="">
        <input type="number" name="add" />
        <input type="submit" value="Отправить" />
      </form>
    </div>
  );
};

export default App;
