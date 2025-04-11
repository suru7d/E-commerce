const axios = require("axios"); // Change import to require

const OLLAMA_API_URL = "http://127.0.0.1:11434"; // Direct URL without /api
const OLLAMA_MODEL = "llama3.2:latest";

const SYSTEM_PROMPTS = {
  default: `You are an eco-friendly shopping assistant named GreenAI, powered by Llama 2.
Your role is to help users make sustainable purchasing decisions and understand the environmental impact of products.
Key responsibilities:
- Recommend eco-friendly product alternatives
- Explain carbon footprint and sustainability scores
- Share practical tips for sustainable shopping
- Focus on factual, actionable information
Keep responses concise and informative to minimize computational resources (a green practice).`,

  product_analysis: `Analyze products based on:
- Carbon footprint impact
- Use of recycled materials
- Energy efficiency
- Packaging sustainability
- Product longevity
Provide clear, actionable insights.`,
};

async function callOllama(prompt, systemPrompt = null) {
  try {
    console.log("Attempting to connect to Ollama at:", OLLAMA_API_URL);

    const messages = [];
    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }
    messages.push({ role: "user", content: prompt });

    console.log("Sending request to Ollama with model:", OLLAMA_MODEL);

    const response = await axios.post(`${OLLAMA_API_URL}/api/generate`, {
      model: OLLAMA_MODEL,
      prompt: prompt,
      system: systemPrompt || SYSTEM_PROMPTS.default,
      stream: false,
      options: {
        temperature: 0.7,
        top_k: 40,
        top_p: 0.9,
        num_predict: 256,
      },
    });

    if (!response.data || !response.data.response) {
      console.error("Invalid response from Ollama:", response.data);
      throw new Error("Invalid response format from Ollama");
    }

    console.log("Received response from Ollama");
    return response.data.response;
  } catch (error) {
    console.error("Ollama API error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error(`Failed to process request: ${error.message}`);
  }
}

async function testOllamaConnection() {
  try {
    const response = await axios.get(`${OLLAMA_API_URL}/api/version`);
    console.log("Ollama connection test successful:", response.data);
    return true;
  } catch (error) {
    console.error("Ollama connection test failed:", error.message);
    return false;
  }
}

module.exports = {
  callOllama,
  testOllamaConnection,
  SYSTEM_PROMPTS,
};
