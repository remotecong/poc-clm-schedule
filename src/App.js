import { useEffect, useState } from "react";
import "./App.css";

function Talk({ song, title, assignees }) {
  if (song) {
    return <p className="song">Song {song}</p>;
  }

  return (
    <div className="talk">
      <p className="talk-title">{title}</p>
      <div className="talk-assignees">
        {assignees.map(a => (
          <p key={a} className="talk-assignee">
            {a}
          </p>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      fetch("/tonight.json")
        .then(r => r.ok && r.json())
        .then(json => {
          setData(json);
        });
    }
  }, [data]);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <h1>{data.date}</h1>
      {data.talks.map(t => (
        <Talk {...t} />
      ))}
    </div>
  );
}

export default App;
