// Vercel Serverless Function for sharod.ai (Gemini-Powered Festival Guide)

// Local Festival & General Knowledge Response Engine for 100% resilient fallback
function generateLocalResponse(query) {
  const q = (query || '').toLowerCase().trim();

  // 1. TRANSIT, DIRECTIONS & ROUTE NAVIGATION (Checked first to avoid keyword collision)
  const isTransit = (
    q.includes('how to get') ||
    q.includes('how to reach') ||
    q.includes('how do i get') ||
    q.includes('how do i reach') ||
    q.includes('how can i go') ||
    q.includes('how to go') ||
    q.includes('direction') ||
    q.includes('route') ||
    q.includes('travel') ||
    q.includes('distance') ||
    (q.includes('from') && q.includes('to')) ||
    q.includes('station') ||
    q.includes('sealdah') ||
    q.includes('howrah') ||
    q.includes('airport') ||
    q.includes('metro to') ||
    q.includes('bus to') ||
    q.includes('taxi to') ||
    q.includes('cab to')
  );

  if (isTransit) {
    // Specific Route: Maddox Square <-> Sealdah Station
    if (q.includes('maddox') && (q.includes('sealdah') || q.includes('station'))) {
      return (
        `**Directions from Maddox Square to Sealdah Station** 🚇🚕\n\n` +
        `Getting from **Maddox Square** (Ritchie Road / Ballygunge) to **Sealdah Railway Station** is quick and convenient during Durga Puja with these travel options:\n\n` +
        `1. 🚇 **By Kolkata Metro (Recommended & Fastest during Puja)**:\n` +
        `   • **Step 1**: Walk or take an auto/toto (approx. 1 km / 8–10 mins) from Maddox Square to **Netaji Bhavan** or **Jatin Das Park** Metro Station (Blue Line).\n` +
        `   • **Step 2**: Board the Northbound train to **Esplanade** (approx. 7 mins).\n` +
        `   • **Step 3**: At Esplanade, take the direct underground interchange to the **Green Line** train heading to **Sealdah Station** (just 1 stop / 4 mins).\n` +
        `   • *Total Time*: ~20 to 30 minutes, completely bypassing surface road gridlock.\n\n` +
        `2. 🚕 **By Yellow Taxi / App-Cab (Uber, Ola, Rapido)**:\n` +
        `   • **Route**: Ballygunge Circular Rd / Sarat Bose Rd ➔ AJC Bose Road Flyover ➔ Moulali Crossing ➔ Sealdah (~6.2 km).\n` +
        `   • *Travel Time*: ~25 to 40 minutes depending on festival crowd control.\n` +
        `   • *Puja Pro-Tip*: Roads directly around Maddox Square are barricaded for pedestrian movement in the evening. Walk out to Sarat Bose Road or Lansdowne Road to hail a cab without driver cancellations.\n\n` +
        `3. 🚌 **By Public Bus**:\n` +
        `   • Walk to the Sarat Bose Road or Exide crossing and board buses towards Sealdah (e.g., route 24A, 42A, 47/1, or Sealdah-bound minibuses).\n\n` +
        `👉 [Explore South Kolkata Pandals](action:nav:pandals:South) | [View Nearest Metro Connections](action:nav:pandals:all)`
      );
    }

    // Specific Route: Howrah Station connections
    if (q.includes('howrah')) {
      return (
        `**Transit Guide to & from Howrah Railway Station** 🚆🌊\n\n` +
        `• 🚇 **Underwater Green Line Metro (Fastest)**: Board the Green Line at Howrah Station to travel under the Hooghly river directly to **Esplanade** in just minutes! From Esplanade, you can switch to the Blue Line for North (Bagbazar/Kumartuli) or South (Kalighat/Maddox Sq) pandals.\n` +
        `• ⛴️ **Heritage River Ferry**: Ferries operate from Howrah Ghat to Fairlie Place, Babughat, and Bagbazar Ghat—a breathtaking scenic trip across the Ganges.\n` +
        `• 🚕 **Prepaid Taxi & App Cabs**: Available at the Howrah Station taxi stand; anticipate heavy traffic on Howrah Bridge during evening rush.\n\n` +
        `👉 [Explore Pandals by Metro](action:nav:pandals:all)`
      );
    }

    // Specific Route: Kolkata Airport (CCU / Netaji Subhash Chandra Bose)
    if (q.includes('airport') || q.includes('dum dum airport') || q.includes('ccu')) {
      return (
        `**Transit Guide to & from Kolkata Airport (CCU)** ✈️🚕\n\n` +
        `• 🚕 **Yellow Taxi & App-Cabs**: Available 24/7 at the arrival terminal. Take the VIP Road / Maa Flyover corridor for South/Central Kolkata, or the Rajarhat Expressway for Salt Lake.\n` +
        `• 🚌 **AC Airport Express Buses (VS-series)**: Direct luxury Volvo buses connect CCU to Howrah, Esplanade, Tollygunge, and Gariahat.\n` +
        `• 🏛️ **Nearby Mega Pandals**: Sreebhumi Sporting Club and Dum Dum Park are just 15–20 minutes from the airport along VIP Road!\n\n` +
        `👉 [Explore East & Salt Lake Pandals](action:nav:pandals:East)`
      );
    }

    // General Transit & Metro Guide
    return (
      `**Kolkata Metro & Transit Guide for Durga Puja** 🚇🎫\n\n` +
      `Kolkata Metro is the ultimate lifeline for seamless pandal hopping during the festive season:\n\n` +
      `• **Blue Line (North-South)**: Connects Dakshineswar ➔ Dum Dum ➔ Sovabazar (Bagbazar/Kumartuli) ➔ MG Road (College Square) ➔ Esplanade ➔ Netaji Bhavan / Jatin Das Park (Maddox Square) ➔ Kalighat (Tridhara/Badamtala) ➔ Rabindra Sarobar.\n` +
      `• **Green Line (East-West)**: Connects Howrah Railway Station ➔ underwater tunnel ➔ Esplanade ➔ Sealdah Station ➔ Salt Lake Sector V.\n` +
      `• **All-Night Special Trains**: Kolkata Metro operates overnight services with trains every 12–15 minutes until 4:00 AM on Saptami, Ashtami, and Navami!\n` +
      `• **Smart Card & Token**: Metro QR ticketing via official apps helps avoid long counter queues at busy stations like Kalighat and Sovabazar.\n\n` +
      `👉 [Explore Pandals with Nearest Metro Stations](action:nav:pandals:all)`
    );
  }

  // 2. ATTIRE, DRESS CODE & FASHION QUERIES (e.g., "can i wear suit on ashtami")
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

  // 3. GREETINGS
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

  // 4. SPECIFIC PANDAL SPOTLIGHTS (Answer targeted questions about an individual pandal)
  if (q.includes('maddox')) {
    return (
      `**Maddox Square Durga Puja Spotlight** 🌳🥁\n\n` +
      `• **The Vibe**: Maddox Square (Ritchie Road / Ballygunge) is Kolkata's most celebrated open-lawn community Puja and the epicenter of youth *adda*, music, and lively social reunions.\n` +
      `• **The Pratima**: Classic, timeless *Ekchala Sabeki Pratima* with traditional Daaker Saaj, bathed in radiant warmth.\n` +
      `• **Signature Experience**: Rolling rhythm of traditional Dhaakis, relaxed open park seating, midnight rolls, and passionate cultural discussions under the canopy of festive lights.\n` +
      `• **Nearest Metro**: **Netaji Bhavan** or **Jatin Das Park** (Blue Line, ~10 mins walk / auto).\n` +
      `• **Nearby Circuit**: Pair your visit with Ballygunge Cultural, Tridhara Sammilani, and Ekdalia Evergreen.\n\n` +
      `👉 [Explore South Kolkata Pandals](action:nav:pandals:South)`
    );
  }

  if (q.includes('tridhara')) {
    return (
      `**Tridhara Sammilani Spotlight** 🏛️✨\n\n` +
      `• **Location**: Manohar Pukur Road / Rashbehari Crossing (Ballygunge).\n` +
      `• **Specialty**: World-renowned for cutting-edge conceptual architecture, immersive sensory experiences, and philosophical themes blending avant-garde art with Vedic sanctity.\n` +
      `• **Nearest Metro**: **Kalighat Metro Station** (Blue Line, 5 mins walk).\n\n` +
      `👉 [Explore South Kolkata Pandals](action:nav:pandals:South)`
    );
  }

  if (q.includes('ekdalia')) {
    return (
      `**Ekdalia Evergreen Club Spotlight** 🏰🕯️\n\n` +
      `• **Location**: Gariahat (Near Pantaloons / Ekdalia Road).\n` +
      `• **Specialty**: Majestic replicas of famous ancient Indian temples, monumental European crystal chandeliers, and magnificent traditional Sabeki idol.\n` +
      `• **Nearest Metro**: **Kalighat** or **Gariahat Junction** (10 mins by auto).\n\n` +
      `👉 [Explore South Kolkata Pandals](action:nav:pandals:South)`
    );
  }

  if (q.includes('suruchi')) {
    return (
      `**Suruchi Sangha Spotlight** 🎨🕊️\n\n` +
      `• **Location**: New Alipore (Near petrol pump / block SB).\n` +
      `• **Specialty**: Acclaimed thematic cultural masterworks spotlighting diverse Indian states, indigenous folk arts, social unity, and original musical compositions.\n` +
      `• **Nearest Metro**: **Rabindra Sarobar** or **Majerhat Railway/Metro Station**.\n\n` +
      `👉 [Explore South Kolkata Pandals](action:nav:pandals:South)`
    );
  }

  if (q.includes('bagbazar')) {
    return (
      `**Bagbazar Sarbojanin Spotlight** 🌺🪔\n\n` +
      `• **Location**: Bagbazar Ghat / North Kolkata.\n` +
      `• **Specialty**: Kolkata's benchmark centenary traditional Sabeki idol with sublime serene eyes, adorned in pure Daaker Saaj. Renowned for authentic rituals, Birashtami exhibition, and emotional *Sindoor Khela* on Dashami by the Ganges.\n` +
      `• **Nearest Metro**: **Shyambazar** or **Sovabazar Sutanuti** (Blue Line).\n\n` +
      `👉 [Explore North Kolkata Pandals](action:nav:pandals:North)`
    );
  }

  if (q.includes('kumartuli')) {
    return (
      `**Kumartuli Park & Artisans Colony** 🏺✨\n\n` +
      `• **Location**: Kumartuli (Potters' Colony by the Hooghly River).\n` +
      `• **Specialty**: Walk through the centuries-old narrow lanes where master sculptors mold clay from the Ganges into divine deities. Kumartuli Park features spectacular contemporary conceptual art installations adjacent to the heritage quarters.\n` +
      `• **Nearest Metro**: **Sovabazar Sutanuti** Metro Station.\n\n` +
      `👉 [Explore North Kolkata Pandals](action:nav:pandals:North)`
    );
  }

  if (q.includes('sreebhumi')) {
    return (
      `**Sreebhumi Sporting Club Spotlight** 👑💎\n\n` +
      `• **Location**: Lake Town / VIP Road (East Kolkata).\n` +
      `• **Specialty**: Colossal, life-sized architectural replicas of world-famous royal palaces and temples, dazzling Chandannagar illuminations, and idols draped in real gold jewelry.\n` +
      `• **Nearest Metro / Transit**: **Dum Dum Metro** or direct VIP Road cabs from Airport/Salt Lake.\n\n` +
      `👉 [Explore East & Salt Lake Pandals](action:nav:pandals:East)`
    );
  }

  // 5. REGIONAL PANDAL LISTS (Triggered ONLY when explicitly asking for lists, recommendations, or zones)
  const isSouthList = (
    q.includes('south') && (q.includes('pandal') || q.includes('zone') || q.includes('best') || q.includes('top') || q.includes('list') || q.includes('circuit'))
  );
  if (isSouthList) {
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

  const isNorthList = (
    q.includes('north') && (q.includes('pandal') || q.includes('zone') || q.includes('best') || q.includes('top') || q.includes('list') || q.includes('circuit'))
  );
  if (isNorthList) {
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

  const isEastList = (
    (q.includes('east') || q.includes('salt lake')) && (q.includes('pandal') || q.includes('list') || q.includes('best') || q.includes('top'))
  );
  if (isEastList) {
    return (
      `**Top East Kolkata & Salt Lake Pandals (2026)** 🏛️💎\n\n` +
      `1. **Sreebhumi Sporting Club** (Lake Town / VIP Road): Spectacular royal palace replicas adorned with glittering Chandannagar illumination and real jewelry.\n` +
      `2. **FD Block & BJ Block** (Salt Lake): Sprawling park pavilions showcasing imaginative, high-concept visual arts and peaceful walkways.\n` +
      `3. **Dum Dum Park Tarun Sangha & Bharat Chakra**: High-concept fine art installations featuring exquisite rural handicrafts and cultural storytelling.\n\n` +
      `👉 **[Explore East & Salt Lake Pandals on Akalbodhon](action:nav:pandals:East)**`
    );
  }

  // 6. RAJBARI / BONEDI BARI PUJAS
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

  // 7. RITUALS & TIMINGS
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

  // 8. FOOD, RESTAURANTS, BIRYANI, BHOG
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

  // 9. GENERAL KNOWLEDGE / CONTEXTUAL FALLBACK
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

    const systemInstruction = `You are sharod.ai, the premier, highly intelligent AI Assistant and festival concierge powered by Google Gemini on Akalbodhon (the premier Kolkata Durga Puja web platform).

CORE CAPABILITIES & EXPERTISE:
1. VERSATILE & ACCURATE: You answer EVERY question directly and accurately—whether about Kolkata Durga Puja 2026, transit directions, stations, routes, dress codes, culture, science, coding, philosophy, or lifestyle.
2. DIRECT RELEVANCE: When the user asks for directions or transit (e.g. how to get from location A to B, or to Sealdah/Howrah station), provide clear, actionable, step-by-step navigation instructions (Metro lines, interchanges, app-cabs, buses, walking directions, and festival crowd advisories). NEVER give an irrelevant pandal list when asked for directions or transit!
3. FESTIVAL ATTIRE & TRADITIONS: When asked what to wear (e.g. suits on Ashtami, sarees, dhoti, traditional vs modern attire), give culturally rich, practical advice covering both traditional customs (morning Pushpanjali) and modern festival evening glamor.
4. DIRECT WEBSITE NAVIGATION ACTIONS: When answering questions regarding pandals, zones, food, rituals, radio, or itinerary, include direct clickable navigation actions in your markdown:
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
5. TONE: Warm, intelligent, engaging, structured with markdown bolding, bullet points, and festive Bengali warmth.`;

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

    // Candidate models in order of verified real-time availability and speed:
    // flash-lite models have massive quota headroom and zero queue latency.
    const models = [
      'gemini-3.5-flash-lite',
      'gemini-flash-lite-latest',
      'gemini-3.1-flash-lite',
      'gemini-3.6-flash',
      'gemini-3.7-flash',
      'gemini-3-flash-preview',
      'gemini-3.5-flash',
      'gemini-flash-latest'
    ];

    for (const model of models) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        
        // Use AbortController with 5500ms timeout per candidate model
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
        } else if (resp.status === 503 || resp.status === 429) {
          console.warn(`Model ${model} returned ${resp.status}. Trying next candidate.`);
        } else {
          console.warn(`Model ${model} returned status ${resp.status}`);
        }
      } catch (err) {
        console.warn(`Model ${model} fetch attempt failed:`, err.message);
      }
    }

    // Resilient Fallback: If all remote API calls encounter temporary network limits,
    // deliver an intelligent, contextual answer instead of an irrelevant pandal list.
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
