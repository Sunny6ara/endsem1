const defaultFallback = (title, description) => {
  const text = (title + ' ' + description).toLowerCase();
  let priority = 'Low';
  let department = 'General Administration';

  if (text.includes('water') || text.includes('leak') || text.includes('plumbing')) {
    department = 'Water Department';
    priority = 'Medium';
  } else if (text.includes('electric') || text.includes('power') || text.includes('wire')) {
    department = 'Electricity Department';
    priority = 'High';
  } else if (text.includes('garbage') || text.includes('waste') || text.includes('clean')) {
    department = 'Sanitation Department';
    priority = 'Medium';
  } else if (text.includes('road') || text.includes('pothole') || text.includes('street')) {
    department = 'Civic Works';
    priority = 'Medium';
  }

  if (text.includes('urgent') || text.includes('emergency') || text.includes('danger')) {
    priority = 'Critical';
  }

  return {
    priority,
    department,
    summary: `Reported issue concerning ${department} regarding ${title}.`,
    autoReply: `Thank you for your report. Your issue has been classified as ${priority} priority and assigned to the ${department}. They will investigate this shortly.`
  };
};

export const analyzeComplaint = async (title, description) => {
  if (!process.env.OPENAI_API_KEY) {
    console.log("No API Key provided, using fallback heuristic engine.");
    return defaultFallback(title, description);
  }

  try {
    const prompt = `Analyze this complaint:
    Title: ${title}
    Description: ${description}
    
    Determine the priority (Low, Medium, High, Critical) and the responsible department (e.g. Water Department, Electricity Department, Sanitation Department, Civic Works, General Administration).
    Generate a 1-sentence summary and a 1-2 sentence professional auto-reply to the user.
    
    Return EXACTLY a valid JSON object with keys: priority, department, summary, autoReply.
    No markdown, just JSON.`;

    // Support OpenRouter API using native fetch
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash", // Excellent for fast JSON parsing via OpenRouter
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      let text = data.choices[0].message.content.trim();
      if (text.startsWith('\`\`\`json')) {
        text = text.substring(7, text.length - 3).trim();
      } else if (text.startsWith('\`\`\`')) {
        text = text.substring(3, text.length - 3).trim();
      }
      return JSON.parse(text);
    } else {
      throw new Error("Invalid AI Response format");
    }
  } catch (error) {
    console.error("AI Analysis failed, falling back to heuristic engine:", error.message);
    return defaultFallback(title, description);
  }
};
