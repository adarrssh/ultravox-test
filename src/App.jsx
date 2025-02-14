import React, { useState } from "react";
import { UltravoxSession } from "ultravox-client";

const App = () => {
  const [session, setSession] = useState(null);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("Idle"); // Track AI status

  const startSession = () => {
    if (!url) {
      alert("Please enter a WebSocket URL");
      return;
    }

    const newSession = new UltravoxSession();
    newSession.joinCall(url);

    newSession.addEventListener("status", () => {
      console.log("Session status changed:", newSession.status);
      setStatus(newSession.status); // Update status in UI
    });

    newSession.addEventListener("transcripts", () => {
      console.log("Transcripts updated:", newSession.transcripts);
    });

    newSession.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });

    setSession(newSession);
  };

  const stopSession = () => {
    if (session) {
      session.leaveCall();
      setSession(null);
      setStatus("Idle"); // Reset status when call ends
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter WebSocket URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={startSession}>Start Call</button>
      <button onClick={stopSession} disabled={!session}>Stop Call</button>
      <p><strong>AI Status:</strong> {status}</p> {/* Display AI Status */}
    </div>
  );
};

export default App;
