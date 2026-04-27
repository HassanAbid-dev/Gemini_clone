import { createContext, useState } from "react";
import { getGeminiResponse } from "../config/gemini";

export const Context = createContext();

// Converts Gemini's markdown response to clean HTML
const formatResponse = (text) => {
  // Remove leading commas or stray punctuation at the start
  text = text.replace(/^[\s,]+/, "");

  // Convert **bold** to <b>bold</b>
  text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  // Convert *italic* to <i>italic</i>
  text = text.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, "<i>$1</i>");

  // Convert markdown bullet points (* item or - item) to <li> items
  text = text.replace(/^[\*\-] (.+)$/gm, "<li>$1</li>");
  text = text.replace(/(<li>.*<\/li>\n?)+/gs, (match) => `<ul>${match}</ul>`);

  // Convert headings
  text = text.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  text = text.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  text = text.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Convert newlines to <br>
  text = text.replace(/\n(?!<\/?(ul|li|h[123]|br))/g, "<br>");

  return text;
};

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
    setRecentPrompt(currentPrompt);
    setPreviousPrompts((prev) => [...prev, currentPrompt]);

    try {
      const response = await getGeminiResponse(currentPrompt);
      const formatted = formatResponse(response);
      setResultData(formatted);
      setInput("");
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
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
