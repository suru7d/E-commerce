const express = require("express");
const router = express.Router();
const { chatWithAssistant } = require("../controllers/chatController");

// Route for chatting with the assistant
router.post("/", chatWithAssistant);

module.exports = router;
