import axios from "axios";

const OLLAMA_API_URL =
  process.env.OLLAMA_API_URL || "http://localhost:11434/api";
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
    console.log("Calling Ollama API with prompt:", prompt);
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }
    messages.push({ role: "user", content: prompt });

    const response = await axios.post(`${OLLAMA_API_URL}/chat`, {
      model: OLLAMA_MODEL,
      messages,
      options: {
        temperature: 0.7,
        top_k: 40,
        top_p: 0.9,
        num_predict: 256,
      },
    });

    return response.data.message.content;
  } catch (error) {
    console.error("Ollama API error:", error);
    throw new Error("Failed to process request");
  }
}

module.exports = {
  callOllama,
  SYSTEM_PROMPTS,
};
