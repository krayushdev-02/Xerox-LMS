import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt, mode } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    // Strict requirement from Section 12:
    // "Keep API keys in environment variables. If no AI key is configured, display a clear setup message rather than a fake AI response."
    if (
      (!geminiKey || geminiKey.includes("your-gemini-api-key")) &&
      (!openaiKey || openaiKey.includes("your-openai-api-key"))
    ) {
      return NextResponse.json({
        configured: false,
        message:
          "AI Tutor API key is not configured in .env.local yet.\n\nTo enable live AI explanations, add your GEMINI_API_KEY or OPENAI_API_KEY in .env.local:\n\nGEMINI_API_KEY=your_key_here\n\nOnce configured, Xerox LMS AI Tutor will instantly answer programming queries, generate practice MCQs, and summarize lessons.",
      });
    }

    const systemInstruction = `You are the Xerox LMS AI Tutor — an expert computer science and programming educator.
Tagline: "Learn Smarter. Achieve More."
Your goals:
1. Explain difficult programming concepts (Python, C, C++, Java, HTML, CSS, JavaScript, SQL) in simple, intuitive, step-by-step language.
2. If asked to generate MCQs, provide 3 to 5 realistic questions with 4 options (A, B, C, D) and explanations.
3. If asked to summarize lessons or generate revision notes, provide high-yield key takeaways and clean code snippets.
4. Keep explanations polite, accurate, concise, and encourage the student.`;

    // 1. Try Gemini API if key is present
    if (geminiKey && !geminiKey.includes("your-gemini-api-key")) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  { text: `${systemInstruction}\n\nStudent Inquiry (${mode || "general"}): ${prompt}` },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || "Gemini API request failed.");
      }

      const data = await response.json();
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I could not generate an answer at this time. Please try rephrasing your question.";

      return NextResponse.json({ configured: true, reply });
    }

    // 2. Try OpenAI API if key is present
    if (openaiKey && !openaiKey.includes("your-openai-api-key")) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || "OpenAI API request failed.");
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "No response received.";

      return NextResponse.json({ configured: true, reply });
    }

    return NextResponse.json({
      configured: false,
      message: "Please configure GEMINI_API_KEY or OPENAI_API_KEY in your .env.local file.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process AI request." },
      { status: 500 }
    );
  }
}

