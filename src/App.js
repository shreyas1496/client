import React, { useState, useEffect } from "react";
import "./App.css";
import Message from "./message/Message";

let socket;
function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [who, setWho] = useState("me");

  useEffect(() => {
    socket = new WebSocket(`ws://52.146.44.22:9898/`);
    const name = prompt(
      "Who are you",
      localStorage.getItem("who") ? localStorage.getItem("who") : ""
    );
    localStorage.setItem("who", name);
    setWho(name);
    socket.onmessage = (e) => {
      const { message, from } = JSON.parse(e.data);
      setChats((chats) =>
        chats.concat({ id: new Date().toLocaleTimeString(), message, from })
      );
      document.body.scrollIntoView(false);
    };
  }, []);

  const sendMessage = () => {
    socket.send(JSON.stringify({ from: who, message }));
    setMessage("");
  };

  return (
    <div className="App">
      {chats.map((msg) => (
        <Message key={msg.id} isSelf={msg.from === who} {...msg} />
      ))}
      <input
        className="dark-mode"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        placeholder="Hit and send.."
        value={message}
      />
    </div>
  );
}

export default App;
