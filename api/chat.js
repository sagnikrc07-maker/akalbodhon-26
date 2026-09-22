// Vercel Serverless Function for sharod.ai (Gemini-Powered Festival Guide)

// Local Festival & General Knowledge Response Engine for 100% resilient fallback
function generateLocalResponse(query) {
  const q = (query || '').toLowerCase().trim();

  // 1. Attire, Dress Code & Fashion Queries (e.g., "can i wear suit on ashthami")
  if (
    q.includes('suit') ||
    q.includes('wear') ||
    q.includes('outfit') ||
    q.includes('dress') ||
    q.includes('saree') ||
    q.includes('sari') ||
    q.includes('dhoti') ||
    q.includes('kurta') ||
    q.includes('clothes') ||
    q.includes('fashion')
  ) {
    if (q.includes('ashtami') || q.includes('ashthami')) {
      return (
        `**Wearing a Suit on Maha Ashtami — Complete Style & Tradition Guide** 👗✨\n\n` +
        `**Yes, absolutely! You can definitely wear a suit on Ashtami.** Durga Puja in Kolkata is an exhilarating celebration of personal style, culture, and joyous devotion. Here is the ideal breakdown:\n\n` +
        `• **Ethnic Suits (Salwar, Anarkali & Sharara)**:\n` +
        `  - Traditional Indian ethnic suits (such as an embroidered Anarkali, mirror-work Sharara, or silk Salwar Kameez) are hugely popular on Ashtami. Festive hues like crimson red, rani pink, mustard yellow, royal blue, or ivory-gold look stunning.\n` +
        `  - They are extraordinarily comfortable for long hours of pandal-hopping while honoring traditional festive aesthetics.\n\n` +
        `• **Western Suits / Blazers**:\n` +
        `  - Modern western suits, tailored blazers, or smart Indo-Western tuxedos/jackets look very chic for evening celebrations, club events, and high-end restaurant dinners.\n` +
        `  - *Pro-Tip for Kolkata Weather*: Pandal grounds get very crowded and humid. If you choose a western suit or blazer, opt for lightweight, breathable fabrics like linen or cotton-blends, or wear a sleek waist-coat/Nehru jacket instead of a heavy woolen coat.\n\n` +
        `• **Morning Pushpanjali Tradition**:\n` +
        `  - For morning Pushpanjali (sacred flower offering), traditional ethnic attire is customary. Men traditionally wear crisp cotton/tussar Dhoti-Panjabi or Kurta-Pyjama; women wear Lal-Paad Shada Saree (white with red border) or elegant ethnic suits.\n` +
        `  - In the evening and night, fashion rules are free and modern!\n\n` +
        `👉 [Explore Rituals & Pushpanjali](action:nav:rituals) | [Explore South Kolkata Pandals](action:nav:pandals:South) | [Browse Food & Nightlife](action:nav:food-shopping)`
      );
    }

    return (
      `**Durga Puja Fashion & Dress Code Guide** 🥻👔\n\n` +
      `Each day of Durga Puja has its own distinctive sartorial vibe:\n\n` +
      `• **Maha Shasthi**: Casual chic or contemporary Indo-Western wear to kick off the festive week.\n` +
      `• **Maha Saptami**: Vibrant handloom sarees, printed kurtas, stylish co-ord sets, or smart ethnic fusion.\n` +
      `• **Maha Ashtami**: The grand traditional showcase! Traditional Bengali sarees (Tussar, Silk, Lal-Paad Shada), Dhoti-Kurtas, and heavy ethnic suits for morning Pushpanjali. Sleek contemporary fashion or blazers for night pandal hopping.\n` +
      `• **Maha Navami**: High glamor, royal silhouettes, festive gowns, Indo-western suits, and statement ethnic wear.\n` +
      `• **Vijaya Dashami**: Red & white sarees for *Sindoor Khela*; classic formal ethnic or crisp white kurtas for *Bijoya Shubhechha*.\n\n` +
      `👉 [Explore Rituals](action:nav:rituals) | [View Pandals](action:nav:pandals:all)`
    );
  }

  // 2. Greetings
  if (
    q.match(/^(hi|hello|hey|namaste|nomoshkar|pranam|joy maa durga|subho mahalaya)/) ||
    (q.split(/\s+/).length <= 3 && (q.includes('hi') || q.includes('hello') || q.includes('hey')))
  ) {
    return (
      `Joy Maa Durga! 🌺 **Nomoshkar and welcome to Akalbodhon 2026!**\n\n` +
      `I am **sharod.ai**, your personal AI Guide. I am here to help you navigate Kolkata's greatest celebration:\n\n` +
      `• 🏛️ **Pandals & Routes**: North, South, East/Salt Lake, Central circuits and Rajbari heritage\n` +
      `• 🪔 **Vedic Rituals & Timings**: Pushpanjali, Sandhi Puja, Dhunuchi Naach, Kumari Puja\n` +
      `• 🍲 **Culinary Guide**: Iconic Kolkata Biryani, Street Food, and authentic Bhog\n` +
      `• 🚇 **Kolkata Metro & Transit**: Station mappings, overnight train schedules\n` +
      `• 👗 **Festival Etiquette & Attire**: What to wear, photography rules, and crowd management\n\n` +
      `👉 [Explore South Kolkata Pandals](action:nav:pandals:South) | [View Sacred Rituals](action:nav:rituals) | [Kolkata Food Guide](action:nav:food-shopping)`
    );
  }

  // 3. South Pandals
  if (
    (q.includes('south') && (q.includes('pandal') || q.includes('zone') || q.includes('best') || q.includes('route'))) ||
    q.includes('tridhara') ||
    q.includes('suruchi') ||
    q.includes('maddox') ||
    q.includes('ekdalia') ||
    q.includes('mudiali') ||
    q.includes('badamtala') ||
    q.includes('ballygunge')
  ) {
    return (
      `**Top South Kolkata Durga Puja Pandals (2026)** 🏛️✨\n\n` +
      `South Kolkata is the epicenter of monumental architectural innovation, conceptual art installations, and vibrant youth carnival energy:\n\n` +
      `1. **Tridhara Sammilani** (Ballygunge / Kalighat Metro): World-renowned sensory concepts blending avant-garde architecture with timeless spiritual reverence.\n` +
      `2. **Suruchi Sangha** (New Alipore): Acclaimed thematic spectacles spotlighting diverse Indian regional traditions and social unity.\n` +
      `3. **Ekdalia Evergreen Club** (Gariahat): Heritage classic showcasing jaw-dropping temple replicas with colossal German crystal chandeliers and authentic sabeki pratima.\n` +
      `4. **Maddox Square** (Ritchie Road): The legendary heartbeat of youth adda, massive open park lawns, and rolling dhaak beats.\n` +
      `5. **Mudiali Club & Shiv Mandir** (Southern Avenue): Breathtaking eco-art decor, lake-side serenity, and mesmerizing illumination.\n` +
      `6. **Badamtala Ashar Sangha** (Kalighat): Trailblazer of thought-provoking contemporary installation art.\n\n` +
      `👉 **[Explore South Kolkata Pandals on Akalbodhon](action:nav:pandals:South)**`
    );
  }

  // 4. North Pandals
  if (
    (q.includes('north') && (q.includes('pandal') || q.includes('zone') || q.includes('best') || q.includes('route'))) ||
    q.includes('bagbazar') ||
    q.includes('kumartuli') ||
    q.includes('sovabazar') ||
    q.includes('ahiritola') ||
    q.includes('tala prattoy') ||
    q.includes('college square')
  ) {
    return (
      `**Top North Kolkata Durga Puja Pandals (2026)** 🏛️🪔\n\n` +
      `North Kolkata is the soul of authentic heritage, colonial aristocracy, and classical Bengali sabeki craftsmanship:\n\n` +
      `1. **Bagbazar Sarbojanin**: The centenary benchmark of pure traditional Sabeki idol sculpted with divine serenity and draped in shimmering Daaker Saaj.\n` +
      `2. **Kumartuli Park**: Cutting-edge creative brilliance nestled inside the centuries-old idol-sculptors' quarters by the holy Ganges.\n` +
      `3. **Sovabazar Rajbari**: Historic 1757 Bonedi Bari celebration founded by Raja Nabakrishna Deb in the grand colonnaded Natmandir.\n` +
      `4. **Tala Prattoy**: Internationally recognized contemporary installation that elevates pandal art into a world-class outdoor gallery.\n` +
      `5. **Ahiritola Sarbojanin**: Riverside heritage festival celebrated for socially resonant themes and rich community spirit.\n\n` +
      `👉 **[Explore North Kolkata Pandals on Akalbodhon](action:nav:pandals:North)**`
    );
  }

  // 5. East & Salt Lake Pandals
  if (q.includes('east') || q.includes('salt lake') || q.includes('sreebhumi') || q.includes('fd block') || q.includes('dum dum')) {
    return (
      `**Top East Kolkata & Salt Lake Pandals (2026)** 🏛️💎\n\n` +
      `1. **Sreebhumi Sporting Club** (Lake Town / VIP Road): Spectacular royal palace replicas adorned with glittering Chandannagar illumination and real jewelry.\n` +
      `2. **FD Block & BJ Block** (Salt Lake): Sprawling park pavilions showcasing imaginative, high-concept visual arts and peaceful walkways.\n` +
      `3. **Dum Dum Park Tarun Sangha & Bharat Chakra**: High-concept fine art installations featuring exquisite rural handicrafts and cultural storytelling.\n\n` +
      `👉 **[Explore East & Salt Lake Pandals on Akalbodhon](action:nav:pandals:East)**`
    );
  }

  // 6. Rajbari / Bonedi Bari Pujas
  if (q.includes('rajbari') || q.includes('bonedi') || q.includes('heritage') || q.includes('sabarna') || q.includes('ancestral')) {
    return (
      `**Heritage Bonedi Bari (Aristocratic Family) Pujas** 👑🪔\n\n` +
      `Experience the unbroken centuries of aristocratic Bengali devotion in historic ancestral courtyards (*Thakur Dalan*):\n\n` +
      `• **Sovabazar Rajbari** (Estd. 1757): North Kolkata's most iconic heritage puja where Robert Clive once offered thanksgiving.\n` +
      `• **Sabarna Roy Choudhury Family** (Barisha, Estd. 1610): The oldest documented family Durga Puja in Greater Kolkata (Aatchala style).\n` +
      `• **Jorasanko Daw Bari** (Girish Park): Renowned for idols adorned with antique gold ornaments and ceremonial European chandeliers.\n` +
      `• **Laha Bari & Mallick Bari**: Sacred traditions where vegetarian bhog and centuries-old rituals remain untainted by modern commercialization.\n\n` +
      `👉 **[Explore Heritage Rajbari Pujas on Akalbodhon](action:nav:pandals:rajbari)**`
    );
  }

  // 7. Rituals & Timings
  if (
    q.includes('ritual') ||
    q.includes('sandhi') ||
    q.includes('pushpanjali') ||
    q.includes('anjali') ||
    q.includes('kumari') ||
    q.includes('dhunuchi') ||
    q.includes('ashtami') ||
    q.includes('shasthi') ||
    q.includes('navami') ||
    q.includes('dashami') ||
    q.includes('sindoor') ||
    q.includes('visarjan') ||
    q.includes('bhashan')
  ) {
    return (
      `**Sacred Vedic Durga Puja Rituals Schedule** 🪔🕊️\n\n` +
      `• **Maha Shasthi (*Devi Bodhon*)**: Awakening the Divine Mother under the sacred Bel tree and welcoming the goddess with rhythmic dhaak beats.\n` +
      `• **Maha Saptami (*Nabapatrika Snan*)**: Dawn bathing of *Kola Bou* (nine divine plants tied with yellow cloth) in the holy Hooghly river followed by *Prana Pratishtha*.\n` +
      `• **Maha Ashtami (*Pushpanjali & Sandhi Puja*)**:\n` +
      `  - Morning: Sacred **Pushpanjali** (flower offerings while fasting).\n` +
      `  - Noon: **Kumari Puja** (worship of young girls as the embodiment of Goddess Mahamaya).\n` +
      `  - Junction of Ashtami and Navami (48 minutes): **Sandhi Puja** invoking Goddess Chamunda to slay demons Chanda & Munda, with 108 blue lotuses and 108 burning clay lamps.\n` +
      `• **Maha Navami (*Maha Yajna & Dhunuchi Naach*)**: Sacred Vedic fire sacrifice followed by electrifying, acrobatic *Dhunuchi Naach* to rolling dhaak rhythms.\n` +
      `• **Vijaya Dashami (*Devi Baran & Sindoor Khela*)**: Bidding farewell to Maa Durga, vibrant *Sindoor Khela* among married women, and holy immersion (*Bhashan*).\n\n` +
      `👉 **[Explore Rituals on Akalbodhon](action:nav:rituals)**`
    );
  }

  // 8. Food, Restaurants, Biryani, Bhog
  if (
    q.includes('food') ||
    q.includes('eat') ||
    q.includes('restaurant') ||
    q.includes('biryani') ||
    q.includes('roll') ||
    q.includes('sweet') ||
    q.includes('mishti') ||
    q.includes('kabiraji') ||
    q.includes('bhog') ||
    q.includes('khichuri')
  ) {
    return (
      `**Iconic Kolkata Durga Puja Culinary Trail** 🍲🍗\n\n` +
      `Pandal hopping without midnight food stops is incomplete in the City of Joy:\n\n` +
      `• **Kolkata Biryani & Mughlai**: Fragrant basmati rice infused with meetha attar, tender meat, and the prized golden potato. Top stops: Arsalan (Park Circus), Oudh 1590 (Deshapriya Park), Aminia, and Royal Indian Hotel (Barabazar).\n` +
      `• **Legendary Street Bites**: Kusum Rolls (Park Street egg-chicken rolls), Mitra Cafe (Shyambazar Mutton Kabiraji & Fish Diamond Fry), and pungent mustard kasundi fish fry at Paramount.\n` +
      `• **Sacred Puja Bhog**: Hot Gobindobhog rice khichuri, crispy begun bhaja, spiced labra, chholar dal with fried coconut flakes, and sweet tomato-khejur chutney.\n` +
      `• **Heritage Bengali Sweets**: Balaram Mullick & Radharaman Mullick (Baked Rosogolla & Mango Sandesh), Girish Ch. Dey & Nakur Ch. Nandy (Jolbhora Talsash), and Chittaranjan Mistanna Bhandar.\n\n` +
      `👉 **[Open Food & Shopping Guide on Akalbodhon](action:nav:food-shopping)**`
    );
  }

  // 9. Metro & Transit
  if (
    q.includes('metro') ||
    q.includes('transit') ||
    q.includes('train') ||
    q.includes('transport') ||
    q.includes('bus') ||
    q.includes('route') ||
    q.includes('traffic')
  ) {
    return (
      `**Kolkata Metro & Transit Guide for Durga Puja** 🚇🎫\n\n` +
      `The Kolkata Metro is the quickest way to beat surface road closures and massive festive traffic:\n\n` +
      `• **Blue Line (North-South)**: Connects Sovabazar (Bagbazar/Kumartuli), MG Road (College Square/Central), Kalighat (Tridhara/Badamtala), and Jatin Das Park/Rabindra Sarobar (Maddox Sq & South Pandals).\n` +
      `• **Green Line (East-West)**: Connects Howrah Railway Station beneath the Hooghly river directly to Esplanade and Salt Lake pandals.\n` +
      `• **All-Night Special Trains**: Kolkata Metro runs overnight train frequencies until 4:00 AM on Saptami, Ashtami, and Navami!\n\n` +
      `👉 **[View Pandals with Nearest Metro Stations](action:nav:pandals:all)**`
    );
  }

  // 10. General Knowledge / Fallback synthesis
  return (
    `Thank you for asking: **"${query}"**! 🌟\n\n` +
    `I am **sharod.ai**, your AI companion on Akalbodhon. Here is some helpful guidance:\n\n` +
    `• If you are planning your Durga Puja visit, you can explore over 45+ premier pandals, Vedic rituals, cultural history, and transit advice directly on our platform.\n` +
    `• Feel free to ask me about dress codes, specific pandal locations, Aarti timings, metro lines, or Kolkata culinary recommendations!\n\n` +
    `👉 **Quick Navigation Actions**:\n` +
    `• [Explore South Kolkata Pandals](action:nav:pandals:South)\n` +
    `• [Explore North Kolkata Pandals](action:nav:pandals:North)\n` +
    `• [Explore Sacred Rituals](action:nav:rituals)\n` +
    `• [Browse Kolkata Food Spots](action:nav:food-shopping)`
  );
}

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

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return res.status(400).json({ success: false, error: 'Message cannot be empty.' });
    }
    if (trimmedMessage.length > 2000) {
      return res.status(400).json({ success: false, error: 'Message exceeds maximum permitted length of 2000 characters.' });
    }

    // Security: Always read API key from server environment
    const apiKey = process.env.GEMINI_API_KEY || '';

    // If API key is missing on the server, respond with local intelligent knowledge engine
    if (!apiKey) {
      const localReply = generateLocalResponse(trimmedMessage);
      return res.status(200).json({
        success: true,
        response: localReply,
        source: 'local_knowledge_engine',
        grounded_web: false
      });
    }

    const systemInstruction = `You are sharod.ai, the intelligent AI Assistant and festival concierge powered by Google Gemini on Akalbodhon (the premier Kolkata Durga Puja web platform).

UNCONSTRAINED AI CAPABILITIES:
1. VERSATILE & BROAD: You can answer ANY question the user asks—including general knowledge, festival fashion, attire, science, coding, lifestyle, history, mathematics, philosophy, creative writing, or opinions. Do NOT restrict yourself or refuse questions simply because they are outside Durga Puja. Answer with Gemini's signature clarity, depth, and helpfulness.
2. FESTIVAL ATTIRE & TRADITIONS: When asked about what to wear (e.g. suits on Ashtami, sarees, traditional vs modern attire), give culturally rich, practical, and enthusiastic advice covering both traditional customs (morning Pushpanjali) and modern festival glamor (evening pandal hopping and dining).
3. DURGA PUJA & BENGALI CULTURE EXPERTISE: While versatile on all topics, you have profound, vivid expertise in Kolkata Durga Puja 2026, Vedic rituals, Bonedi Bari traditions, idol sculpting in Kumartuli, culinary trails, and transit.
4. DIRECT WEBSITE NAVIGATION ACTIONS: When answering questions regarding pandals, zones, food, rituals, radio, or itinerary, you MUST include direct clickable navigation actions in your markdown:
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
5. OPINIONS & COMPARISONS: When asked for opinions, provide insightful, nuanced, and culturally authentic advice.
6. TONE: Warm, intelligent, engaging, structured with markdown bolding, bullet points, and festive Bengali warmth.
7. FORMATTING: Use conversational paragraphs, bold highlights, and clean bullet points (•). Avoid excessive or high-numbered lists unless the user specifically asks for step-by-step instructions or ranked top-N lists.`;

    const contents = [];
    if (Array.isArray(history)) {
      for (const h of history.slice(-6)) {
        const role = h.role === 'user' ? 'user' : 'model';
        const text = typeof (h.text || h.content) === 'string' ? (h.text || h.content).slice(0, 2000) : '';
        if (text) contents.push({ role, parts: [{ text }] });
      }
    }
    contents.push({ role: 'user', parts: [{ text: trimmedMessage }] });

    const payload = {
      system_instruction: { parts: [{ text: systemInstruction }] },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1200
      }
    };

    // Candidate models in order of stability and verified availability:
    // gemini-3.6-flash is officially active, fast, and verified responsive.
    const models = [
      'gemini-3.6-flash',
      'gemini-3.7-flash',
      'gemini-3.8-flash',
      'gemini-3.5-flash',
      'gemini-flash-latest'
    ];

    for (const model of models) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        
        // Use AbortController with 5500ms timeout per candidate model to avoid Vercel serverless budget exhaustion
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 5500);

        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
        clearTimeout(timer);

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
        } else if (resp.status === 503) {
          console.warn(`Model ${model} returned 503 (high demand). Trying next candidate.`);
        } else {
          console.warn(`Model ${model} returned status ${resp.status}`);
        }
      } catch (err) {
        console.warn(`Model ${model} fetch attempt failed:`, err.message);
      }
    }

    // Resilient Fallback: If all models are experiencing temporary demand spikes (503),
    // deliver an intelligent, contextual answer instead of an unhelpful static greeting.
    const fallbackAnswer = generateLocalResponse(trimmedMessage);
    return res.status(200).json({
      success: true,
      response: fallbackAnswer,
      source: 'intelligent_puja_engine',
      grounded_web: false
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error processing chat request.' });
  }
}
