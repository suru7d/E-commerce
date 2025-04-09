const express = require("express");
const router = express.Router();
const { callOllama, SYSTEM_PROMPTS } = require("../services/ollamaService");

router.post("/ollama", async (req, res) => {
  try {
    const { prompt, systemPrompt } = req.body;
    const response = await callOllama(
      prompt,
      systemPrompt || SYSTEM_PROMPTS.default
    );
    res.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process chat request" });
  }
});

module.exports = router;
