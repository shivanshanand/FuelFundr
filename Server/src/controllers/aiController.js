import axios from "axios";

export const rewriteDescription = async (req, res) => {
  try {
    const { description, tone, length } = req.body;

    const response = await axios.post("http://localhost:8000/generate", {
      title: "Rewrite",
      goal: description,
      category: "Project",
      tone,
      length,
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "AI rewrite failed" });
  }
};
