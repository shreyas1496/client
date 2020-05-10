import React, { useState, useEffect } from "react";
import "./App.css";

let socket;
function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [who, setWho] = useState("");

  useEffect(() => {
    socket = new WebSocket("ws://localhost:9898/");
    const name = prompt(
      "Who are you",
      localStorage.getItem("who") ? localStorage.getItem("who") : ""
    );
    localStorage.setItem("who", name);
    setWho(name);
    socket.onmessage = (e) => {
      const { message, from } = JSON.parse(e.data);
      setChats((chats) =>
        chats.concat(`${new Date().toLocaleTimeString()} ${from}: ${message}`)
      );
    };
  }, []);

  const sendMessage = () => {
    socket.send(JSON.stringify({ from: who, message }));
    setMessage("");
  };

  return (
    <div className="App">
      {chats.map((msg) => (
        <div key={msg}>{msg}</div>
      ))}
      <input
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        value={message}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
