import React from "react";
import "./Message.css";

function Message(props) {
  const { isSelf, id, from, message } = props;
  console.log(isSelf);

  if (isSelf) {
    return (
      <div className="msg-holder isSelf">
        <div className="message ">
          <span>{message}</span>
          <span className="time">{id}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="msg-holder">
      <div className={`message`}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: "4px",
          }}
        >
          <div className="from">{from}</div>
          <div className="time">{id}</div>
        </div>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Message;
