import React, { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const sendPrompt = async () => {
    if (!input.trim()) return;

    console.log("Sending prompt:", input);
    setLoading(true);
    try {
      setChatHistory((prev) => [...prev, { type: 'user', text: input }]);
      
      const result = await run(input);
      setLoading(false);

      if (result) {
        setChatHistory((prev) => [...prev, { type: 'assistant', text: result }]);
        setPrevPrompts([...prevPrompts, input]);
        setRecentPrompt(input);
        setShowResult(true);
        console.log("Received result:", result);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error while sending prompt:", error);
    }
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    sendPrompt,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    chatHistory,
    input,
    setInput
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
