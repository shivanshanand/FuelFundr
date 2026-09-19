import axios from "axios";
import User from "../models/User.js";

export const rewriteDescription = async (req, res) => {
  try {
    const { description, tone, length, customGroqKey } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!customGroqKey && user.aiUsageCount >= 5) {
      return res.status(403).json({ message: "AI rate limit exceeded. Please provide your own Groq API key." });
    }

    const response = await axios.post("http://localhost:8000/generate", {
      title: "Rewrite",
      goal: description,
      category: "Project",
      tone,
      length,
      custom_api_key: customGroqKey || null,
    });

    if (!customGroqKey) {
      user.aiUsageCount += 1;
      await user.save();
    }

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "AI rewrite failed" });
  }
};
