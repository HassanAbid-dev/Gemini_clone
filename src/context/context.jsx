import { createContext, useEffect, useState } from "react";
import { getGeminiResponse } from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    const currentPrompt = prompt || input;

    if (!currentPrompt.trim()) {
      setResultData("Please enter a prompt");
      return;
    }

    setLoading(true);
    setResultData("");
    setShowResult(true);
    setRecentPrompt(input);
    setRecentPrompt(currentPrompt);
    setPreviousPrompts((prev) => [...prev, currentPrompt]);

    try {
      const response = await getGeminiResponse(currentPrompt);
      setResultData(response);
      setInput("");
      setLoading(false);
      setInput("");
      console.log(response);
    } catch (error) {
      console.error("Error in onSent:", error);
      setResultData(
        "Error getting response from AI. Please check your API key and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    previousPrompts,
    setPreviousPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
    setShowResult,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
// onSent("What is react.js?");
export default ContextProvider;
