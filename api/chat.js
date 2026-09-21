// Vercel Serverless Function for sharod.ai (Gemini 3.8 Flash Chatbot)
export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    // SECURITY: Never accept API keys from client requests — always use server env var only
    const apiKey = process.env.GEMINI_API_KEY || '';

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'Gemini API key is not configured. Please set GEMINI_API_KEY in your Vercel project environment variables.'
      });
    }

    const systemInstruction = `You are sharod.ai, the intelligent AI Assistant and festival concierge powered by Google Gemini (gemini-3.8-flash) on Akalbodhon (the premier Kolkata Durga Puja web platform).

UNCONSTRAINED AI CAPABILITIES:
1. VERSATILE & BROAD: You can answer ANY question the user asks—including general knowledge, science, coding, lifestyle, history, mathematics, philosophy, creative writing, or opinions. Do NOT restrict yourself or refuse questions simply because they are outside Durga Puja. Answer with Gemini's signature clarity, depth, and helpfulness.
2. DURGA PUJA & BENGALI CULTURE EXPERTISE: While versatile on all topics, you have profound, vivid expertise in Kolkata Durga Puja 2026, Vedic rituals, Bonedi Bari traditions, idol sculpting in Kumartuli, culinary trails, and transit.
3. DIRECT WEBSITE NAVIGATION ACTIONS: When answering questions regarding pandals, zones, food, rituals, radio, or itinerary, you MUST include direct clickable navigation actions in your markdown:
   - South Pandals: 👉 [Explore South Kolkata Pandals](action:nav:pandals:South)
   - North Pandals: 👉 [Explore North Kolkata Pandals](action:nav:pandals:North)
   - East / Salt Lake Pandals: 👉 [Explore East Pandals](action:nav:pandals:East)
   - Central Pandals: 👉 [Explore Central Pandals](action:nav:pandals:Central)
   - Heritage Rajbari: 👉 [Explore Heritage Rajbari](action:nav:pandals:rajbari)
   - Rituals: 👉 [Explore Rituals](action:nav:rituals)
   - Food & Shopping: 👉 [Browse Food & Shopping](action:nav:food-shopping)
   - Saved Itinerary: 👉 [Open My Itinerary](action:nav:saved)
   - Curated Plans: 👉 [View Curated Plans](action:nav:plans)
   - Puja Radio: 👉 [Tune into Puja Radio](action:nav:audio)
4. OPINIONS & COMPARISONS: When asked for opinions, provide insightful, nuanced, and culturally authentic advice.
5. TONE: Warm, intelligent, engaging, structured with markdown bolding, bullet points, and festive Bengali warmth.
6. FORMATTING: Use conversational paragraphs, bold highlights, and clean bullet points (•). Avoid excessive or high-numbered lists (e.g. 1., 2., 3., ...) unless the user specifically asks for step-by-step instructions or ranked top-N lists.`;

    const contents = [];
    if (Array.isArray(history)) {
      for (const h of history.slice(-6)) {
        const role = h.role === 'user' ? 'user' : 'model';
        const text = h.text || h.content || '';
        if (text) contents.push({ role, parts: [{ text }] });
      }
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const payload = {
      system_instruction: { parts: [{ text: systemInstruction }] },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1200
      }
    };

    const models = ['gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-flash-latest', 'gemini-2.5-flash'];
    for (const model of models) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (resp.ok) {
          const data = await resp.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return res.status(200).json({
              success: true,
              response: text,
              source: `gemini_api:${model}`,
              grounded_web: false
            });
          }
        }
      } catch (err) {
        console.warn(`Model ${model} error:`, err.message);
      }
    }

    return res.status(200).json({
      success: true,
      response: `Joy Maa Durga! 🌺 Welcome to **Akalbodhon**! I am **sharod.ai**, your Gemini-powered festival guide. How may I assist you with your Puja planning or questions today?\n\n👉 [Explore South Kolkata Pandals](action:nav:pandals:South) | [View Rituals & Dhaak](action:nav:rituals) | [Food Guide](action:nav:food-shopping)`,
      source: 'fallback',
      grounded_web: false
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
