import React, { useEffect, useState } from "react";
import girl1 from "./assets/girl1.svg";
import girl2 from "./assets/girl2.svg";
import boy1 from "./assets/boy1.svg";
import axios from "axios";
import { UltravoxSession } from "ultravox-client";

const App = () => {
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState("Idle"); // Track AI status
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [joinCallUrl, setJoinCallUrl] = useState("");

  // Function to fetch the joinCall URL
  const fetchJoinCallUrl = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://dev1-api.pepsales.xyz:5001/ultravox/"); // Adjust API URL if needed
      console.log(response);
      setJoinCallUrl(response?.data?.joinUrl); // Assuming API returns { joinCallUrl: "wss://..." }
      setShowPopup(true); // Show popup after URL is received
    } catch (error) {
      console.error("Error fetching join call URL:", error);
      alert("Failed to fetch join call URL");
    }
    setIsLoading(false);
  };

  // Function to start Ultravox session
  const startSession = () => {
    console.log({ joinCallUrl });
    if (!joinCallUrl) return;

    const newSession = new UltravoxSession();
    newSession.joinCall(joinCallUrl);

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
    setShowPopup(false); // Hide popup after starting session
  };

  const endSession = () => {
    if (session) {
      session.leaveCall();
      setSession(null);
      setStatus("Idle"); // Reset status
      console.log("Call ended");
    }
  };

  return (
    <div className="w-screen h-screen bg-[#201c1c] flex justify-center items-center flex-col gap-8">
      <div className="flex justify-center items-center gap-8 h-[400px]">
        {/* Left Image */}
        <div className="h-full rounded-3xl overflow-y-auto relative">
          <img className="h-full" src={girl1} alt="Demo 1" />
          <button className="bg-[#ffffff] rounded-3xl text-xs text-[#3d3d3c] w-[150px] p-2 absolute left-1/2 transform -translate-x-1/2 bottom-5 z-50">
            Ready-to-see-demo
          </button>
        </div>

        {/* Center Image - Click to Start Call */}
        <div
          className="h-full rounded-3xl overflow-y-auto relative cursor-pointer"
          onClick={() => fetchJoinCallUrl()}
        >
          <img className="h-full" src={girl2} alt="Personalized demo" />
          <button className="bg-[#ffffff] rounded-3xl text-xs text-[#3d3d3c] w-[130px] p-2 absolute left-1/2 transform -translate-x-1/2 bottom-5 z-50">
            Personalized demo
          </button>
          {/* Loader */}
          {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Right Image */}
        <div className="h-full rounded-3xl overflow-y-auto relative">
          <img className="h-full" src={boy1} alt="Interactive demo" />
          <button className="bg-[#ffffff] rounded-3xl text-xs text-[#3d3d3c] w-[120px] p-2 absolute left-1/2 transform -translate-x-1/2 bottom-5 z-50">
            Interactive demo
          </button>
        </div>
      </div>
      <div className="h-12">
        {session && (
          <>
          <div className="flex flex-col items-center">
            <p className="text-white font-semibold">{status}</p>
            {/* Listening Animation */}
            {status === "listening" && (
              <div className="w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
            )}

            {/* Speaking Animation */}
            {status === "speaking" && (
              <div className="flex space-x-1 mt-2">
                <div className="w-2 h-6 bg-cyan-300 animate-bounce"></div>
                <div className="w-2 h-4 bg-cyan-300 animate-bounce delay-100"></div>
                <div className="w-2 h-6 bg-cyan-300 animate-bounce delay-200"></div>
              </div>
             )} 
          </div>

          <div className="flex items-center justify-center mt-6 bg-[#ffffff] text-[#3d3d3c] p-2 rounded-xl w-[100px] cursor-pointer"
            onClick={endSession}
          >
            end call
          </div>
             </>
        )}
      </div>

      {/* Popup: Ready for Session */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Ready for session?</h2>
            <button
              onClick={startSession}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4"
            >
              Ready
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* AI Status & Animations */}
    </div>
  );
};

export default App;
