import React, { useState, useContext } from "react";
import { WebSocketContext } from "WebSocketContext";

const GlobalMessage = () => {
  const { client } = useContext(WebSocketContext);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      const dataToSend = {
        type: "GLOBAL_MESSAGE",
        data: {
          message: message,
        },
      };
      client.send("/app/global", {}, JSON.stringify(dataToSend));
      setMessage("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message here..."
      />
      <button onClick={handleSendMessage}>보내기</button>
    </div>
  );
};

export default GlobalMessage;
