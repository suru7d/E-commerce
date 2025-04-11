const express = require("express");
const router = express.Router();
const {
  callOllama,
  testOllamaConnection,
  SYSTEM_PROMPTS,
} = require("../services/ollamaService");

// Test endpoint to verify Ollama connection
router.get("/test-connection", async (req, res) => {
  try {
    const isConnected = await testOllamaConnection();
    res.json({ connected: isConnected });
  } catch (error) {
    res.status(500).json({ error: "Failed to test Ollama connection" });
  }
});

router.post("/ollama", async (req, res) => {
  try {
    const { prompt, systemPrompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await callOllama(
      prompt,
      systemPrompt || SYSTEM_PROMPTS.default
    );
    res.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      error: "Failed to process chat request",
      details: error.message,
    });
  }
});

module.exports = router;
