const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.warn(
    "Warning: VITE_GEMINI_API_KEY is not set. Please add it to your .env file.",
  );
}
export async function getGeminiResponse(prompt) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemma-3-27b-it",
          messages: [{ role: "user", content: prompt }],
        }),
      },
    );

    const data = await response.json();
    console.log("Response:", data);

    if (data.error) throw new Error(data.error.message);
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling API:", error);
    throw error;
  }
}

export default getGeminiResponse;
