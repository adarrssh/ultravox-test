import React, { useEffect } from "react";
import girl1 from "./assets/girl1.svg";
import girl2 from "./assets/girl2.svg";
import boy1 from "./assets/boy1.svg";
import axios from "axios";

const App = () => {

  const apiUrl = 'https://api.ultravox.ai/api/calls';
  const apiKey = 'fF3VLluG.cftVFytT9DPc1teNaO2ASN42tPZZC5qh'; // Replace with your actual API key
  const corpusId = '<your-corpus-id>'; // Replace with your actual corpus ID
  
  const prompt = `
  You are PepAE, the AI assistant for Pepsales. Your role is to educate users about Pepsales' products and provide a seamless walkthrough of its features. Answer all user queries strictly based on the provided context. Keep responses concise, relevant, and free from unnecessary introductions or additional details.
  
  ## Response Guidelines:
  - If a user asks your name, simply respond: "I am PepAE, the AI assistant for Pepsales."
  - Do not provide additional explanations unless explicitly requested.
  - Do not repeat Pepsales' company information unless the user asks for it directly.
  - Do not use unnecessary symbols like asterisks (*).
  - Answer only what is asked, avoiding unrelated details.
  - If the user asks multiple questions, address each one separately and directly.
  
  ## Company Overview  
  Pepsales enables companies to create interactive, customized product demos tailored to each prospect's needs. By automating the demo creation process, Pepsales helps sales teams deliver engaging presentations, improve conversion rates, and reduce the time spent on manual demo customization.
  
  ## Pepsales' Key Features  
  - Personalized Demos  
  - No-Code Customization  
  - Real-Time Analytics  
  - Seamless Integrations  
  - Collaboration Tools  
  - Demo Hosting & Sharing  
  - AI-Powered Insights  
  - Security & Compliance  
  
  ## Pepsales Products  
  
  ### Discovery Copilot  
  An AI-powered platform that assists sales teams throughout the customer discovery process.
  
  Key Capabilities:  
  1. **Buyer Analysis**: Generates insights from CRM data, emails, and call recordings.  
  2. **Real-Time Call Guidance**: Provides agenda management, objection handling, and suggested questions.  
  3. **Pre-Call Assistance**: Helps sales reps prepare for meetings by providing buyer research, agenda structuring, and key insights before the call.  
  4. **On-Call AI Assistance**: Captures buyer responses in real-time, provides AI-powered objection handling, and ensures critical data is stored for post-call analysis.  
  5. **Post-Call Insights**: Summarizes calls, assigns discovery scores, highlights key discussion points, and recommends follow-up actions.  
  6. **Seamless Integrations**: Connects with Zoom, Google Meet, Salesforce, and HubSpot.  
  7. **Enhanced Sales Performance**: Improves win rates and shortens sales cycles by optimizing the discovery process.  
  
  ### Demo Copilot  
  A tool that helps sales teams create personalized product demonstrations quickly and effectively.
  
  ## How Pepsales Works  
  1. Log in to Pepsales  
  2. Upload product data or select a template  
  3. Customize demo content  
  4. Share demo link with prospects  
  5. Track engagement via analytics  
  
  ## Common Questions & Direct Answers  
  - **What is the pricing model?** Would you like to schedule a meeting with our team for a better understanding?  
  - **Can you give me a walkthrough of the product/pepsales?** Let's schedule a quick call with our team to discuss your requirements.  
  - **How does Pepsales track demo engagement?** We’d love to walk you through this in a meeting. Would you like to schedule one?  
  - **What security measures does Pepsales follow?** Let's set up a meeting with our team to discuss our security and compliance standards in detail.  
  - **Does it require coding knowledge to use Pepsales?** Pepsales is a no-code tool, but we'd be happy to guide you through it in a meeting. Would you like to schedule one?  
  - **Does Pepsales support multi-user collaboration?** Yes! Let’s set up a quick call to show you how teams collaborate using Pepsales.  
  
  ## Additional Instructions:  
  1. **User Information Collection**: Ask for the user's name and email at the start of the conversation.  
  2. **Meeting Interest**: If the user asks 2-3 questions, ask if they are interested in a meeting with the Pepsales team.  
  3. **Handling Email Hesitation**: If the user hesitates to provide their email, continue answering their questions and ask again later in a friendly manner.  
  
  Stay concise, informative, and strictly relevant to user queries.  
  `;
  
  const data = {
      temperature: 0.7,
      model: "fixie-ai/ultravox-70B",
      voice: "87691b77-0174-4808-b73c-30000b334e14", // Replace with your actual voice ID
      languageHint: "en-US",
      initialMessages: [
        {
          role: "MESSAGE_ROLE_USER",
          text: "Welcome to Pepsales! Can you please provide your name and company?",
          medium: "MESSAGE_MEDIUM_TEXT"
        }
      ],
      joinTimeout: "30s",
      maxDuration: "300s",
      timeExceededMessage: "Sorry, the call has exceeded the maximum allowed time.",
      inactivityMessages: [
        {
          duration: "30s",
          message: "Are you still there? Please respond.",
          endBehavior: "END_BEHAVIOR_HANG_UP_SOFT"
        }
      ],
      selectedTools: [
       
      ],
      medium: {
        webRtc: {}
      },
      recordingEnabled: true,
      firstSpeaker: "FIRST_SPEAKER_AGENT",
      transcriptOptional: true,
      initialOutputMedium: "MESSAGE_MEDIUM_VOICE",
      vadSettings: {
        turnEndpointDelay: "1s",
        minimumTurnDuration: "1s",
        minimumInterruptionDuration: "0.5s"
      },
      firstSpeakerSettings: {
        agent: {
          uninterruptible: true,
          text: "Welcome! How can I help you today?"
        }
      },
      experimentalSettings: {},
      systemPrompt: prompt,
  };
  
  const getJoinCallUrl = async () => {
    const response =  await axios.post(apiUrl, data, {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });

    return response
  }

  useEffect(()=>{
    getJoinCallUrl().then(res=>console.log(res)).catch(err=>console.error(err))
  },[])
  
  return (
    <div className="w-screen h-screen bg-[#201c1c] flex justify-center items-center">
      <div className="flex justify-center items-center gap-8 h-[400px] ">
        <div className="h-full rounded-3xl overflow-y-auto relative">
          <img className="h-full" src={girl1} alt="" />
          <button className="bg-[#ffffff] rounded-3xl text-xs text-[#3d3d3c] w-[150px] p-2 absolute left-1/2 transform -translate-x-1/2 bottom-5 z-50">Ready-to-see-demo</button>
        </div>
        <div className="h-full rounded-3xl overflow-y-auto relative cursor-pointer">
          <img className="h-full" src={girl2} alt="" />
          <button className="bg-[#ffffff] rounded-3xl text-xs text-[#3d3d3c] w-[130px] p-2 absolute left-1/2 transform -translate-x-1/2 bottom-5 z-50">Personalized demo</button>

        </div>
        <div className="h-full rounded-3xl overflow-y-auto relative">
          <img className="h-full" src={boy1} alt="" />
          <button className="bg-[#ffffff] rounded-3xl text-xs text-[#3d3d3c] w-[120px] p-2 absolute left-1/2 transform -translate-x-1/2 bottom-5 z-50">Interactive demo</button>
        </div>
      </div>
    </div>
  );
};

export default App;
