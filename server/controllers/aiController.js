const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const getSeoBrief = async (req, res) => {
  try {

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    const prompt = `
You are an SEO assistant for a blogging platform.

Analyze this blog post:

Title: "${title}"

Content:
"${content.slice(0, 1500)}"

Return ONLY valid JSON in this exact format:

{
  "suggestedTitles": [
    "title option 1",
    "title option 2",
    "title option 3"
  ],
  "metaDescription": "A search-friendly meta description under 150 characters",
  "keywords": [
    "keyword 1",
    "keyword 2",
    "keyword 3",
    "keyword 4",
    "keyword 5"
  ],
  "readabilityTip": "One short practical suggestion to improve readability"
}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt
        }
      ],

      temperature: 0.7
    });

    const responseText =
      response.choices[0].message.content;

    // Remove markdown code blocks if present
    const cleanedText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedData = JSON.parse(cleanedText);

    res.json(parsedData);

  } catch (error) {

    console.log("Groq error:", error);

    res.status(500).json({
      message: "AI analysis failed",
      error: error.message
    });
  }
};

module.exports = {
  getSeoBrief
};