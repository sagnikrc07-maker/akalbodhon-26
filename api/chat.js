// Vercel Serverless Function for sharod.ai (Gemini-Powered Festival & Transit Guide)

// Comprehensive Knowledge Directory of Premier Durga Puja Pandals
const PANDALS_DIRECTORY = {
  'chetla-agrani': {
    name: 'Chetla Agrani Club',
    zone: 'South',
    metro: 'Kalighat Metro Station (Blue Line)',
    metroExit: 'Exit towards Rashbehari Crossing / Chetla Central Road',
    walk: '7–9 minute walk (~650 meters) down Chetla Central Road, or a quick Toto/Rickshaw',
    cabRoute: 'AJC Bose Road Flyover ➔ Exide Crossing / Asutosh Mukherjee Road ➔ Hazra Road or Rashbehari Avenue ➔ Chetla Central Road',
    distSealdah: 'approx. 8.5 km (25–35 mins)',
    distHowrah: 'approx. 11.5 km (35–45 mins via Vidyasagar Setu ➔ Alipore)',
    distAirport: 'approx. 22 km (45–60 mins via EM Bypass or Maa Flyover)',
    bus: 'Board buses towards Kalighat / Hazra / Behala (e.g. 218, 47/1 or Taratala minibuses) to Rashbehari Crossing',
    theme: 'Sublime Concept Art & Master Earthen Terracotta Craft with ethereal organic pavilions and ambient festive lighting',
    highlights: 'Annual masterpiece conceptualized by celebrated artists, featuring organic architectural pavilions and soulful illumination.',
    nearby: ['Suruchi Sangha (New Alipore - right across Chetla bridge)', 'Badamtala Ashar Sangha', '66 Pally', 'Mudiali Club', 'Shiv Mandir'],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Chetla+Agrani+Club+Durga+Puja+Kolkata'
  },
  'suruchi-sangha': {
    name: 'Suruchi Sangha (New Alipore)',
    zone: 'South',
    metro: 'Rabindra Sarobar or Kalighat Metro Station (Blue Line)',
    metroExit: 'Exit towards Tollygunge / Southern Avenue',
    walk: '10–12 minute auto/toto from Metro to New Alipore Petrol Pump / Block SB',
    cabRoute: 'AJC Bose Road Flyover ➔ D.L. Khan Road / Alipore Road ➔ New Alipore',
    distSealdah: 'approx. 9.5 km (30–40 mins)',
    distHowrah: 'approx. 11 km (30–40 mins via Vidyasagar Setu / Alipore)',
    distAirport: 'approx. 24 km (50–65 mins via Maa Flyover)',
    bus: 'Direct buses along Diamond Harbour Road / Taratala / New Alipore (routes 12C, 240, 218)',
    theme: 'Acclaimed thematic cultural masterworks spotlighting diverse Indian states, indigenous folk arts, social unity, and original musical compositions',
    highlights: 'Celebrated for state-based cultural motifs, intricate craftsmanship, and high-profile musical compositions.',
    nearby: ['Chetla Agrani (just across Chetla Lock Gate Bridge)', 'Behala Nutan Dal', 'Barisha Club', 'Badamtala Ashar Sangha'],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Suruchi+Sangha+Durga+Puja+New+Alipore+Kolkata'
  },
  'tridhara-sammilani': {
    name: 'Tridhara Sammilani',
    zone: 'South',
    metro: 'Kalighat Metro Station (Blue Line)',
    metroExit: 'Exit towards Rashbehari Avenue / Manohar Pukur Road',
    walk: '4–6 minute walk (~450 meters) down Manohar Pukur Road',
    cabRoute: 'AJC Bose Flyover ➔ Sarat Bose Road ➔ Southern Avenue / Deshapriya Park crossing ➔ Manohar Pukur Road',
    distSealdah: 'approx. 7 km (25–35 mins)',
    distHowrah: 'approx. 10 km (30–40 mins via Vidyasagar Setu)',
    distAirport: 'approx. 20 km (45–55 mins via EM Bypass)',
    bus: 'Any bus to Deshapriya Park or Rashbehari Crossing (e.g. 2B, 37, 47, AC-4B)',
    theme: 'Cutting-edge avant-garde conceptual architecture, immersive sensory environments, and philosophical themes blending contemporary installation art with Vedic sanctity',
    highlights: 'Avant-garde sensory concepts blending contemporary architecture with timeless spiritual reverence.',
    nearby: ['Deshapriya Park', 'Ballygunge Cultural', 'Hindustan Park', 'Badamtala Ashar Sangha', 'Maddox Square'],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tridhara+Sammilani+Durga+Puja+Kolkata'
  },
  'maddox-square': {
    name: 'Maddox Square (Ritchie Road)',
    zone: 'South',
    metro: 'Netaji Bhavan or Jatin Das Park Metro Station (Blue Line)',
    metroExit: 'Exit towards Ashutosh Mukherjee Road / Hazra',
    walk: '8–10 minute walk (~800 meters) down Lansdowne / Ritchie Road',
    cabRoute: 'AJC Bose Flyover ➔ Sarat Bose Road ➔ Ritchie Road entrance (~6.2 km from Sealdah)',
    distSealdah: 'approx. 6.2 km (20–30 mins)',
    distHowrah: 'approx. 9.5 km (30–40 mins)',
    distAirport: 'approx. 19 km (40–50 mins)',
    bus: 'Buses along Sarat Bose Road (e.g. 24A, 42A, 47/1) stopping at Lansdowne Padmapukur',
    theme: 'Timeless Ekchala Sabeki Pratima with shimmering Daaker Saaj amidst Kolkata’s premier open-park youth carnival and adda',
    highlights: 'The legendary heartbeat of youth adda, sprawling green lawns, rolling live dhaak beats, and relaxed evening reunions.',
    nearby: ['Ballygunge Cultural', 'Tridhara Sammilani', 'Deshapriya Park', 'Ekdalia Evergreen'],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Maddox+Square+Durga+Puja+Kolkata'
  },
  'ekdalia-evergreen': {
    name: 'Ekdalia Evergreen Club (Gariahat)',
    zone: 'South',
    metro: 'Kalighat Metro Station (Blue Line) + short auto to Gariahat Crossing',
    metroExit: 'Exit towards Rashbehari Avenue',
    walk: '5–7 min auto from Kalighat Metro along Rashbehari Avenue to Gariahat Pantaloons, then 2 min walk',
    cabRoute: 'AJC Bose Flyover ➔ Beckbagan ➔ Syed Amir Ali Avenue ➔ Gariahat Crossing',
    distSealdah: 'approx. 6.5 km (22–32 mins)',
    distHowrah: 'approx. 10.5 km (35–45 mins)',
    distAirport: 'approx. 20 km (45–55 mins)',
    bus: 'Any Gariahat-bound bus from Sealdah / Howrah (e.g. 2B, 42A, 218, AC-24)',
    theme: 'Colossal ancient Indian temple architecture replica with jaw-dropping German crystal chandeliers and authentic Sabeki idol',
    highlights: 'Heritage classic showcasing jaw-dropping temple replicas with colossal German crystal chandeliers.',
    nearby: ['Singhi Park', 'Ballygunge Cultural', 'Hindustan Park', 'Maddox Square'],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ekdalia+Evergreen+Club+Gariahat+Kolkata'
  },
  'bagbazar-sarbojanin': {
    name: 'Bagbazar Sarbojanin Durgotsav',
    zone: 'North',
    metro: 'Shyambazar Metro Station (Blue Line)',
    metroExit: 'Exit towards Bagbazar Street / Bhupen Bose Avenue',
    walk: '6–8 minute walk (~700 meters) down Bagbazar Street towards Bagbazar Launch Ghat',
    cabRoute: 'APC Road ➔ Rajabazar ➔ Khanna Crossing ➔ Shyambazar 5-Point ➔ Bagbazar Street',
    distSealdah: 'approx. 5.5 km (18–25 mins)',
    distHowrah: 'approx. 6.8 km (20–30 mins via Strand Road / Ahiritola)',
    distAirport: 'approx. 13 km (28–38 mins via Jessore Road / Dum Dum)',
    bus: 'Direct buses along APC Road to Shyambazar 5-Point (e.g. 3B, 30B, 215, 230)',
    theme: 'Centenary Pure Traditional Sabeki Idol adorned with divine snow-white Daaker Saaj by the holy Ganges',
    highlights: 'The 100+ year-old benchmark of pure traditional Sabeki idol draped in shimmering Daaker Saaj.',
    nearby: ['Kumartuli Park', 'Ahiritola Sarbojanin', 'Sovabazar Rajbari', 'Tala Prattoy'],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bagbazar+Sarbojanin+Durga+Puja+Kolkata'
  },
  'kumartuli-park': {
    name: 'Kumartuli Park Sarbojanin',
    zone: 'North',
    metro: 'Sovabazar Sutanuti Metro Station (Blue Line)',
    metroExit: 'Exit towards BK Paul Avenue / Kumartuli',
    walk: '5–6 minute walk (~500 meters) down Kumartuli Lane towards the riverfront',
    cabRoute: 'Central Avenue (CR Avenue) ➔ Girish Park ➔ Sovabazar Crossing ➔ BK Paul Avenue',
    distSealdah: 'approx. 4.8 km (16–24 mins)',
    distHowrah: 'approx. 5.5 km (18–28 mins via Strand Road)',
    distAirport: 'approx. 14 km (30–40 mins)',
    bus: 'Buses to Sovabazar or BK Paul Avenue crossing (e.g. 30B, 43, 215)',
    theme: 'Conceptual artistic brilliance nestled inside the centuries-old idol sculptors’ colony by the Ganges',
    highlights: 'Cutting-edge creative brilliance nestled inside the centuries-old idol-sculptors’ quarters.',
    nearby: ['Bagbazar Sarbojanin', 'Sovabazar Rajbari', 'Ahiritola Sarbojanin', 'Beniatola'],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kumartuli+Park+Durga+Puja+Kolkata'
  },
  'tala-prattoy': {
    name: 'Tala Prattoy',
    zone: 'North',
    metro: 'Belgachia Metro Station (Blue Line)',
    metroExit: 'Exit towards Tala Tank / Raja Manindra Road',
    walk: '5–7 minute walk (~600 meters) towards Tala Post Office',
    cabRoute: 'APC Road ➔ Shyambazar 5-Point ➔ Tala Bridge corridor',
    distSealdah: 'approx. 6 km (20–30 mins)',
    distHowrah: 'approx. 8 km (25–35 mins)',
    distAirport: 'approx. 11 km (22–32 mins)',
    bus: 'Buses along Raja Manindra Road or BT Road towards Chiria More / Belgachia',
    theme: 'Internationally acclaimed museum-grade contemporary installation art that redefines spatial aesthetics',
    highlights: 'Internationally recognized contemporary installation that elevates pandal art into a world-class outdoor gallery.',
    nearby: ['Bagbazar Sarbojanin', 'Shikdar Bagan', 'Hatibagan Nabin Pally', 'Kumartuli Park'],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tala+Prattoy+Durga+Puja+Kolkata'
  },
  'sreebhumi-sporting-club': {
    name: 'Sreebhumi Sporting Club',
    zone: 'East',
    metro: 'Dum Dum Metro Station (Blue Line) + short auto/bus or Ultadanga Railway Station',
    metroExit: 'Exit towards VIP Road',
    walk: 'Auto/bus down VIP Road to Lake Town Foot overbridge (10 mins)',
    cabRoute: 'VIP Road corridor directly to Lake Town Clock Tower / Sreebhumi Gate',
    distSealdah: 'approx. 7.5 km (20–30 mins via Ultadanga / VIP Road)',
    distHowrah: 'approx. 11 km (30–42 mins via EM Bypass connector)',
    distAirport: 'approx. 8.5 km (15–20 mins via VIP Road)',
    bus: 'Direct VIP Road buses (e.g. VS-1, VS-2, 217, 44A) stopping at Lake Town Clock Tower',
    theme: 'Colossal life-sized royal palace replicas adorned with millions of sparkling Chandannagar illuminations and idols draped in real gold',
    highlights: 'Spectacular royal palace replicas adorned with glittering Chandannagar illumination.',
    nearby: ['Dum Dum Park Tarun Sangha', 'Dum Dum Park Bharat Chakra', 'FD Block Salt Lake'],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sreebhumi+Sporting+Club+Durga+Puja+Lake+Town+Kolkata'
  },
  'college-square': {
    name: 'College Square Sarbojanin',
    zone: 'Central',
    metro: 'Central or Mahatma Gandhi Road (MG Road) Metro Station (Blue Line)',
    metroExit: 'Exit towards College Street / Calcutta University',
    walk: '4–5 minute walk (~400 meters) from MG Road Metro; or direct 12–15 min walk from Sealdah Station!',
    cabRoute: 'BB Ganguly Street ➔ College Street corridor (~1.8 km from Sealdah)',
    distSealdah: 'approx. 1.8 km (8–12 mins or pleasant 15 min walk)',
    distHowrah: 'approx. 4.2 km (15–22 mins via Brabourne Road / MG Road)',
    distAirport: 'approx. 15 km (35–45 mins)',
    bus: 'Direct buses along College Street or MG Road (e.g. 24, 43, 205, minibuses)',
    theme: 'Breathtaking illuminated palace architectural reflection shimmering over the sacred water tank',
    highlights: 'Iconic water reflection illuminated palace replicas surrounded by century-old Kolkata book stalls.',
    nearby: ['Mohammad Ali Park', 'Santosh Mitra Square', 'Chaltabagan Lohapatty'],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=College+Square+Durga+Puja+Kolkata'
  },
  'naktala-udayan-sangha': {
    name: 'Naktala Udayan Sangha',
    zone: 'South',
    metro: 'Gitanjali (Naktala) Metro Station (Blue Line)',
    metroExit: 'Exit towards NSC Bose Road',
    walk: '3–4 minute walk (~300 meters) directly to the pandal ground',
    cabRoute: 'EM Bypass ➔ Baishnabghata Patuli ➔ NSC Bose Road; or Tollygunge ➔ Netaji Subhash Chandra Bose Road',
    distSealdah: 'approx. 13 km (40–50 mins)',
    distHowrah: 'approx. 16 km (50–65 mins)',
    distAirport: 'approx. 26 km (55–70 mins via EM Bypass)',
    bus: 'Buses along NSC Bose Road (e.g. 228, 80A, AC-9)',
    theme: 'Monumental avant-garde spatial sculptures and revolutionary conceptual installations',
    highlights: 'South Kolkata’s ultimate crowd magnet featuring revolutionary avant-garde conceptual art.',
    nearby: ['Kendua Shanti Shangha', 'Babubagan', 'Selimpur Pally', 'Jodhpur Park'],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Naktala+Udayan+Sangha+Durga+Puja+Kolkata'
  }
};

// Pandal Resolver: Match queries to pandal records
function matchPandalInQuery(q) {
  const query = q.toLowerCase();
  if (query.includes('chetla') || (query.includes('agrani') && !query.includes('bagbazar'))) {
    return PANDALS_DIRECTORY['chetla-agrani'];
  }
  if (query.includes('suruchi')) {
    return PANDALS_DIRECTORY['suruchi-sangha'];
  }
  if (query.includes('tridhara')) {
    return PANDALS_DIRECTORY['tridhara-sammilani'];
  }
  if (query.includes('maddox')) {
    return PANDALS_DIRECTORY['maddox-square'];
  }
  if (query.includes('ekdalia')) {
    return PANDALS_DIRECTORY['ekdalia-evergreen'];
  }
  if (query.includes('bagbazar') || query.includes('baghbazar')) {
    return PANDALS_DIRECTORY['bagbazar-sarbojanin'];
  }
  if (query.includes('kumartuli')) {
    return PANDALS_DIRECTORY['kumartuli-park'];
  }
  if (query.includes('tala') && (query.includes('prattoy') || query.includes('tank') || query.includes('bridge'))) {
    return PANDALS_DIRECTORY['tala-prattoy'];
  }
  if (query.includes('sreebhumi') || query.includes('sribhumi') || query.includes('lake town')) {
    return PANDALS_DIRECTORY['sreebhumi-sporting-club'];
  }
  if (query.includes('college square') || query.includes('college sq')) {
    return PANDALS_DIRECTORY['college-square'];
  }
  if (query.includes('naktala')) {
    return PANDALS_DIRECTORY['naktala-udayan-sangha'];
  }
  return null;
}

// Generate Detailed Transit Route
function generateTransitDirections(q, pandal) {
  const isSealdah = q.includes('sealdah') || q.includes('sealda');
  const isHowrah = q.includes('howrah') || q.includes('howra');
  const isAirport = q.includes('airport') || q.includes('ccu') || q.includes('dum dum airport');
  const isEsplanade = q.includes('esplanade') || q.includes('dharmatala') || q.includes('dharmatalla');

  let originName = 'Your Location';
  let originMetroStep = '';
  let originCabDist = pandal.distSealdah;

  if (isSealdah) {
    originName = 'Sealdah Railway Station';
    originCabDist = pandal.distSealdah;
    if (pandal.zone === 'South') {
      originMetroStep = 
        `1. 🚇 **By Kolkata Metro (Fastest & Guaranteed Traffic-Free)**:\n` +
        `   • **Step 1 (Green Line)**: Enter **Sealdah Metro Station** and board the East-West Green Line train heading towards Howrah.\n` +
        `   • **Step 2 (Underground Interchange at Esplanade)**: Alight at **Esplanade Station** (just 1 stop / 4 mins). Follow the well-marked underground interchange passage directly to the North-South **Blue Line** platform.\n` +
        `   • **Step 3 (Blue Line Southbound)**: Board the Southbound train (towards Kavi Subhash) and disembark at **${pandal.metro}** (approx. 9–11 mins, passing Park Street ➔ Maidan ➔ Rabindra Sadan ➔ Netaji Bhavan ➔ Jatin Das Park).\n` +
        `   • **Step 4 (Final Walk)**: Take the **${pandal.metroExit}**. The pandal is an easy **${pandal.walk}**.\n` +
        `   • ⏱️ *Total Travel Time*: ~22 to 28 minutes, completely bypassing festive surface gridlock.`;
    } else if (pandal.zone === 'North') {
      originMetroStep = 
        `1. 🚇 **By Kolkata Metro (Fastest & Guaranteed Traffic-Free)**:\n` +
        `   • **Step 1 (Green Line)**: Board Green Line at **Sealdah Metro Station** to **Esplanade Station** (1 stop / 4 mins).\n` +
        `   • **Step 2 (Interchange to Blue Line Northbound)**: Switch to the Northbound train (towards Dakshineswar) and alight at **${pandal.metro}** (approx. 8–10 mins).\n` +
        `   • **Step 3 (Final Walk)**: ${pandal.walk}.\n` +
        `   • ⏱️ *Total Travel Time*: ~18 to 25 minutes.`;
    } else if (pandal.zone === 'Central') {
      originMetroStep = 
        `1. 🚶 **By Walk or Direct Auto (Extremely Close to Sealdah)**:\n` +
        `   • **Walking**: Head out via BB Ganguly Street towards College Street. You will reach in just **12–15 minutes** (~1.5 km).\n` +
        `   • **Metro**: Green Line from Sealdah to Esplanade ➔ Blue Line to MG Road / Central (~10 mins).\n` +
        `   • ⏱️ *Total Travel Time*: ~10 to 15 minutes.`;
    } else {
      originMetroStep = 
        `1. 🚇 **By Kolkata Metro & Transit**:\n` +
        `   • Take Green Line to Phoolbagan / Salt Lake, or take local train to Bidhannagar Road, then take a quick auto down VIP Road corridor to the pandal.\n` +
        `   • ⏱️ *Total Travel Time*: ~20 to 30 minutes.`;
    }
  } else if (isHowrah) {
    originName = 'Howrah Railway Station';
    originCabDist = pandal.distHowrah;
    originMetroStep = 
      `1. 🚇 **By Kolkata Metro (Underwater River Crossing - Fastest)**:\n` +
      `   • **Step 1 (Green Line)**: Enter **Howrah Metro Station** and board the Green Line train traveling through India’s first underwater tunnel beneath the holy Hooghly river directly to **Esplanade** in just 5 minutes!\n` +
      `   • **Step 2 (Blue Line)**: At Esplanade, take the direct underground interchange to the Blue Line ${pandal.zone === 'North' ? 'Northbound (towards Dakshineswar)' : 'Southbound (towards Kavi Subhash)'} and disembark at **${pandal.metro}**.\n` +
      `   • **Step 3**: ${pandal.walk}.\n` +
      `   • ⏱️ *Total Travel Time*: ~20 to 28 minutes.`;
  } else if (isAirport) {
    originName = 'Kolkata Airport (CCU)';
    originCabDist = pandal.distAirport;
    originMetroStep = 
      `1. 🚕 **By Prepaid Taxi / App-Cab (Uber/Ola/InDrive)**:\n` +
      `   • Take VIP Road corridor ➔ Maa Flyover ➔ AJC Bose Flyover to reach ${pandal.name} (${originCabDist}).\n` +
      `   • 🚌 **AC Airport Bus**: Board AC Airport Express (VS-series) towards Tollygunge / Gariahat / Esplanade.`;
  } else {
    originName = 'Your Starting Point';
    originMetroStep = 
      `1. 🚇 **By Kolkata Metro**:\n` +
      `   • Board the Metro to **${pandal.metro}**.\n` +
      `   • Follow ${pandal.metroExit}.\n` +
      `   • ${pandal.walk}.`;
  }

  const nearbyList = (pandal.nearby || []).map(p => `• **${p}**`).join('\n');

  return (
    `**Directions from ${originName} to ${pandal.name}** 🚇🚕\n\n` +
    `Navigating to **${pandal.name}** (${pandal.zone} Kolkata) is smooth and convenient with these tailored transit options:\n\n` +
    `---\n\n` +
    `${originMetroStep}\n\n` +
    `---\n\n` +
    `2. 🚕 **By Yellow Taxi / App-Cab (Uber, Ola, Rapido, Yatri Sathi)**:\n` +
    `   • **Corridor**: ${pandal.cabRoute}.\n` +
    `   • **Estimated Distance & Time**: ${originCabDist}.\n` +
    `   • 💡 **Puja Traffic Advisory**: After 4:00 PM on festive days (Sasthi to Navami), Kolkata Police implements one-way pedestrian corridors around major pandals. Ask your driver to drop you at the nearest major avenue crossing and enjoy the festive pedestrian stroll for the final 200–300 meters.\n\n` +
    `---\n\n` +
    `3. 🚌 **By Public Bus**:\n` +
    `   • ${pandal.bus}.\n\n` +
    `---\n\n` +
    `### 🚶 Pandal Hopping Circuit from ${pandal.name}\n` +
    `Once you explore ${pandal.name}, you are ideally located to walk to these top neighboring celebrations in the same circuit:\n` +
    `${nearbyList}\n\n` +
    `👉 **[Explore ${pandal.zone} Kolkata Pandals on Akalbodhon](action:nav:pandals:${pandal.zone})** | 🗺️ [Open Google Maps Directions](${pandal.mapsUrl})`
  );
}

// Local Festival & General Knowledge Response Engine for 100% resilient fallback
function generateLocalResponse(query) {
  const q = (query || '').toLowerCase().trim();

  // 1. TRANSIT & ROUTE NAVIGATION (Specific Pandal + Origin)
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
    q.includes('taxi to')
  );

  if (isTransit) {
    const matchedPandal = matchPandalInQuery(q);
    if (matchedPandal) {
      return generateTransitDirections(q, matchedPandal);
    }

    // Maddox Square specific fallback if asked with station
    if (q.includes('maddox')) {
      return generateTransitDirections(q, PANDALS_DIRECTORY['maddox-square']);
    }

    // Howrah Station General
    if (q.includes('howrah')) {
      return (
        `**Transit Guide to & from Howrah Railway Station** 🚆🌊\n\n` +
        `• 🚇 **Underwater Green Line Metro (Fastest)**: Board the Green Line at Howrah Station to travel under the Hooghly river directly to **Esplanade** in just 5 minutes! From Esplanade, take the underground interchange to the Blue Line for North (Bagbazar/Kumartuli) or South (Kalighat/Chetla/Maddox Sq) pandals.\n` +
        `• ⛴️ **Heritage River Ferry**: Ferries operate from Howrah Ghat to Fairlie Place, Babughat, and Bagbazar Ghat—a breathtaking scenic trip across the Ganges.\n` +
        `• 🚕 **Prepaid Taxi & App Cabs**: Available at the Howrah Station taxi stand; anticipate heavy traffic on Howrah Bridge during evening rush.\n\n` +
        `👉 [Explore Pandals by Metro](action:nav:pandals:all)`
      );
    }

    // Airport General
    if (q.includes('airport') || q.includes('ccu')) {
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
      `• **Blue Line (North-South)**: Connects Dakshineswar ➔ Dum Dum ➔ Sovabazar (Bagbazar/Kumartuli) ➔ MG Road (College Square) ➔ Esplanade ➔ Netaji Bhavan / Jatin Das Park (Maddox Square) ➔ Kalighat (Chetla Agrani / Tridhara / Badamtala) ➔ Rabindra Sarobar.\n` +
      `• **Green Line (East-West)**: Connects Howrah Railway Station ➔ underwater tunnel ➔ Esplanade ➔ Sealdah Station ➔ Salt Lake Sector V.\n` +
      `• **All-Night Special Trains**: Kolkata Metro operates overnight services with trains running every 12–15 minutes until 4:00 AM on Saptami, Ashtami, and Navami!\n` +
      `• **Smart Card & Token**: Metro QR ticketing via official apps helps avoid long counter queues at busy stations like Kalighat, Sovabazar, and Shyambazar.\n\n` +
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
      `**Durga Puja Fashion & Sartorial Guide (Day-by-Day)** 🥻👔\n\n` +
      `Each day of Durga Puja has its own distinctive sartorial vibe:\n\n` +
      `• **Maha Shasthi (16 Oct)**: Casual chic or contemporary Indo-Western wear to kick off the festive week.\n` +
      `• **Maha Saptami (17–18 Oct)**: Vibrant handloom sarees (Tant, Dhakai Jamdani), printed kurtas, stylish co-ord sets, or smart ethnic fusion.\n` +
      `• **Maha Ashtami (19 Oct)**: The grand traditional showcase! Traditional Bengali sarees (Tussar, Garad, Lal-Paad Shada), Dhoti-Kurtas, and heavy ethnic suits for morning Pushpanjali. Sleek contemporary fashion, elegant suits or blazers for night pandal hopping.\n` +
      `• **Maha Navami (20 Oct)**: High glamor, royal silhouettes, festive gowns, Indo-western suits, and statement ethnic wear.\n` +
      `• **Bijoya Dashami (21 Oct)**: Red & white sarees for sacred *Sindoor Khela*; classic formal ethnic or crisp white kurtas for *Bijoya Shubhechha*.\n\n` +
      `👉 [Explore Rituals](action:nav:rituals) | [View Pandals](action:nav:pandals:all)`
    );
  }

  // Domain keyword indicators
  const isFood = ['food', 'eat', 'dining', 'restaurant', 'biryani', 'roll', 'kathi roll', 'sweet', 'mishti', 'kabiraji', 'bhog', 'cafe', 'dhaba', 'snack', 'phuchka', 'puchka', 'chaap'].some(k => q.includes(k));
  const isTransit = ['how to get', 'how to reach', 'how do i', 'how can i', 'direction', 'route', 'station', 'sealdah', 'howrah', 'airport', 'metro to', 'bus to', 'taxi to', 'to reach'].some(k => q.includes(k)) || (q.includes(' to ') && !isFood);
  const isMetroGeneral = ['metro timing', 'midnight metro', 'night metro', 'metro train', 'special train', 'subway', 'metro schedule'].some(k => q.includes(k)) || ((q.includes('metro') || q.includes('train')) && (q.includes('timing') || q.includes('night') || q.includes('midnight') || q.includes('schedule')));
  const isAttire = ['suit', 'wear', 'outfit', 'dress', 'saree', 'sari', 'dhoti', 'kurta', 'clothes', 'fashion', 'attire'].some(k => q.includes(k));
  const isRitual = ['ritual', 'sandhi', 'pushpanjali', 'anjali', 'kumari', 'dhunuchi', 'sindoor', 'baran', 'bhashan', 'visarjan', 'bodhon', 'akalbodhon', 'nabapatrika', 'kola bou', 'chakkhudaan', 'mahalaya', 'shashthi', 'sashthi', 'shasthi', 'saptami', 'tithi', 'panjika', 'calendar', 'date', 'dates', 'schedule', 'when'].some(k => q.includes(k));
  const isPlan = ['1-day', '1 day', 'one day', 'itinerary', 'day plan', 'hop plan', 'curated plan', 'master plan'].some(k => q.includes(k));

  // 1. Special Pandal Hopping Route: Kumartuli to Bagbazar
  if ((q.includes('kumartuli') && q.includes('bagbazar')) && (q.includes(' to ') || q.includes('walk') || q.includes('hop') || q.includes('route') || isTransit)) {
    return (
      `**Pandal Hopping Route: Kumartuli Park ➔ Bagbazar Sarbojanin** 🚶‍♂️🪔\n\n` +
      `This is one of the most iconic, scenic, and spiritually evocative walking corridors in North Kolkata:\n\n` +
      `• **Distance & Walking Time**: approx. **700 meters (8–10 minutes on foot)** down Bagbazar Street / Rabindra Sarani.\n` +
      `• **Step-by-Step Walking Trail**:\n` +
      `  1. Start at **Kumartuli Park Sarbojanin** (beside the historic Kumartuli idol-makers' colony and launch ghat).\n` +
      `  2. Walk northwards along Rabindra Sarani or through the riverside lane toward Bagbazar Ghat.\n` +
      `  3. Turn right into **Bagbazar Street**; you will immediately feel the century-old festival fervor and smell roasted peanuts, ghugni, and hot tea.\n` +
      `  4. Arrive at **Bagbazar Sarbojanin Durgotsav ground** (near Girish Mancha) to witness the pure white Daaker Saaj Sabeki idol!\n` +
      `• 🛺 **Local Transit Option**: Hand-pulled rickshaws or shared e-rickshaws (Toto) are available between Kumartuli Ghat and Bagbazar 5-Point Crossing (~₹15–₹20).\n` +
      `• 🌟 **Bonus Heritage Hop**: From Kumartuli, you can also walk 10 minutes south along Central Avenue to visit the historic **Sovabazar Rajbari** (1757 Natmandir)!\n\n` +
      `👉 **[Explore North Kolkata Pandals](action:nav:pandals:North)** | 🗺️ [Open Google Maps Walking Trail](https://www.google.com/maps/dir/Kumartuli+Park+Durga+Puja/Bagbazar+Sarbojanin+Durga+Puja)`
    );
  }

  // 2. Metro & Midnight Special Trains Schedule
  if (isMetroGeneral) {
    return (
      `**Kolkata Metro & Midnight Special Trains Schedule (2026)** 🚇🎫\n\n` +
      `Kolkata Metro is the ultimate lifeline for seamless, traffic-free pandal hopping during Durga Puja:\n\n` +
      `• 🌙 **All-Night Special Midnight Trains**:\n` +
      `  - **Saptami, Ashtami & Navami**: Overnight trains operate on the **Blue Line (Dakshineswar ➔ Kavi Subhash)** continuously until **4:00 AM**!\n` +
      `  - **Train Frequency**: Every 12–15 minutes during peak midnight hopping hours (11:00 PM – 3:30 AM).\n` +
      `• 🌊 **Green Line (East-West Underwater Corridor)**:\n` +
      `  - Connects **Howrah Railway Station** under the Hooghly river to **Esplanade** in 5 minutes flat, continuing to Sealdah and Salt Lake Sector V.\n` +
      `• 🔄 **Key Junctions**:\n` +
      `  - **Esplanade Interchange**: Seamless subterranean connection between Blue Line and Green Line.\n` +
      `  - **Kalighat Station**: Gateway to Chetla Agrani, Tridhara, Badamtala, and Mudiali.\n` +
      `  - **Sovabazar & Shyambazar**: Lifeline for Bagbazar, Kumartuli, Ahiritola, and Rajbari circuits.\n` +
      `• 💡 **Smart Ticketing Tip**: Purchase Metro QR tickets via the official app to bypass long counter queues at busy stations.\n\n` +
      `👉 **[Explore Pandals with Nearest Metro Stations](action:nav:pandals:all)`
    );
  }

  // 3. Food & Dining Trails (checked BEFORE pandal spotlights so "Food near Maddox Square" works properly!)
  if (isFood) {
    if (q.includes('maddox')) {
      return (
        `**Food & Adda Trail around Maddox Square (Ritchie Road)** 🍲☕\n\n` +
        `Maddox Square is the epicenter of Kolkata's festive youth adda, and its culinary surroundings are legendary:\n\n` +
        `• 🎪 **Inside & Around the Park Grounds**:\n` +
        `  - **Phuchka & Churmur Stalls**: Crisp, tangy gondhoraj-scented phuchka stalls lining the Ritchie Road pavement.\n` +
        `  - **Kolkata Kathi Rolls & Chowmein**: Sizzling Mughlai parathas, egg-chicken rolls, and spicy street noodles right outside the main gate.\n` +
        `• 🥛 **Balwant Singh's Eating House (Harish Mukherjee Road, 7 mins walk)**:\n` +
        `  - The world-famous **Doodh Cola** (sweet condensed milk blended with fizzy cola in tall earthen glasses)!\n` +
        `  - Hot Kesar Chai served in clay bhars and freshly fried piping hot club kachoris with aloo dum.\n` +
        `• 🍛 **Sarat Bose Road Dining & Cafes**:\n` +
        `  - **Oudh 1590 (Deshapriya Park, 10 mins walk)**: Regal Awadhi handi biryani, Galawati kababs, and Raan Biryani.\n` +
        `  - **Saptapadi (Purna Das Road)**: Authentic Bengali artisanal thali with Ilish, Chingri Malai Curry, and Kosha Mangsho.\n` +
        `  - **Jai Hind Dhaba (Bhawanipore)**: Midnight Butter Naan, Chicken Bharta, and Tandoori Kebabs.\n\n` +
        `👉 **[Browse Food & Shopping Guide on Akalbodhon](action:nav:food-shopping)** | [Explore South Kolkata Pandals](action:nav:pandals:South)`
      );
    } else if (q.includes('biryani')) {
      return (
        `**Legendary Kolkata Biryani & Mughlai Guide** 🍗✨\n\n` +
        `Kolkata Biryani is characterized by aromatic Awadhi basmati rice, tender meat, and that melt-in-mouth golden ghee-roasted potato (*aloo*):\n\n` +
        `• **Arsalan (Park Circus 7-Point / Ruby / Hatibagan)**: The gold standard of fragrant long-grain biryani and Mutton Chaap.\n` +
        `• **Oudh 1590 (Deshapriya Park / Salt Lake / Naktala)**: Period dining with dum-pukht Handi Biryani and melt-in-mouth Galawati Kabab.\n` +
        `• **Royal Indian Hotel (Barabazar / Park Circus)**: Authentic Lucknowi Biryani (traditionally without potato) and Mutton Pasinda since 1905.\n` +
        `• **Shiraz Golden Restaurant (Mullick Bazar / Park Street)**: Famous for rich Golden Special Biryani and Chicken Rezala.\n` +
        `• **Aminia (New Market / Golpark / Behala)**: Heritage Mughlai diner serving stellar Biryani and classic Mutton Awadhi.\n\n` +
        `👉 **[Open Food & Nightlife Guide](action:nav:food-shopping)**`
      );
    } else if (q.includes('bhog')) {
      return (
        `**Sacred Durga Puja Bhog — Flavors of Divine Grace** 🪔🍲\n\n` +
        `Consuming sacred community Bhog on Saptami, Ashtami, and Navami is the spiritual highlight of Durga Puja:\n\n` +
        `• **Gobindobhog Khichuri**: Aromatic small-grain Gobindobhog rice and roasted yellow moong dal slow-cooked with whole spices and pure desi ghee.\n` +
        `• **Labra**: A rich, five-spice melange of seasonal vegetables (pumpkin, raw banana, brinjal, radish, and sweet potato).\n` +
        `• **Begun Bhaja**: Thick slices of eggplant seasoned with turmeric and fried to golden perfection.\n` +
        `• **Chholar Dal with Narkel**: Bengal gram dal cooked with aromatic cinnamon, cloves, and fried coconut slices.\n` +
        `• **Tomato-Khejur Plastic Chutney**: Translucent raw papaya and sweet date chutney seasoned with panch phoron.\n` +
        `• **Payesh & Mishti Doi**: Rich thickened milk kheer and caramelized clay-pot curd.\n\n` +
        `👉 **[Explore Rituals on Akalbodhon](action:nav:rituals)**`
      );
    } else {
      return (
        `**Iconic Kolkata Durga Puja Culinary Trail** 🍲🍗\n\n` +
        `• **Kolkata Biryani & Mughlai**: Arsalan (Park Circus), Oudh 1590 (Deshapriya Park), Aminia, and Royal Indian Hotel (Barabazar).\n` +
        `• **Legendary Street Bites**: Kusum Rolls (Park Street), Mitra Cafe (Shyambazar Mutton Kabiraji), and Paramount Sharbat.\n` +
        `• **Sacred Puja Bhog**: Hot Gobindobhog khichuri, begun bhaja, spiced labra, chholar dal, and sweet chutney.\n` +
        `• **Heritage Bengali Sweets**: Balaram Mullick (Baked Rosogolla), Girish Ch. Dey & Nakur Ch. Nandy (Sandesh), and Chittaranjan.\n\n` +
        `👉 **[Open Food & Shopping Guide on Akalbodhon](action:nav:food-shopping)**`
      );
    }
  }

  // 4. Attire, Dress Code & Fashion
  if (isAttire) {
    if (q.includes('ashtami') || q.includes('ashthami') || q.includes('suit')) {
      return (
        `**Wearing a Suit on Maha Ashtami — Complete Style & Tradition Guide** 👗✨\n\n` +
        `**Yes, absolutely! You can definitely wear a suit on Ashtami.** Durga Puja in Kolkata is an exhilarating celebration of personal style, culture, and joyous devotion:\n\n` +
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
      `**Durga Puja Fashion & Sartorial Guide (Day-by-Day)** 🥻👔\n\n` +
      `Each day of Durga Puja has its own distinctive sartorial vibe:\n\n` +
      `• **Maha Shasthi**: Casual chic or contemporary Indo-Western wear to kick off the festive week.\n` +
      `• **Maha Saptami**: Vibrant handloom sarees (Tant, Dhakai Jamdani), printed kurtas, stylish co-ord sets, or smart ethnic fusion.\n` +
      `• **Maha Ashtami**: The grand traditional showcase! Traditional Bengali sarees (Tussar, Garad, Lal-Paad Shada), Dhoti-Kurtas, and heavy ethnic suits for morning Pushpanjali. Sleek contemporary fashion, elegant suits or blazers for night pandal hopping.\n` +
      `• **Maha Navami**: High glamor, royal silhouettes, festive gowns, Indo-western suits, and statement ethnic wear.\n` +
      `• **Vijaya Dashami**: Red & white sarees for sacred *Sindoor Khela*; classic formal ethnic or crisp white kurtas for *Bijoya Shubhechha*.\n\n` +
      `👉 [Explore Rituals](action:nav:rituals) | [View Pandals](action:nav:pandals:all)`
    );
  }

  // 5. Sacred Vedic Rituals & Official Dates (Checked BEFORE greetings to eliminate false matches!)
  if (isRitual) {
    if (q.includes('sandhi')) {
      return (
        `**Sandhi Puja — The Divine Climax of Maha Ashtami** 🪔🕊️\n\n` +
        `• **Astronomical Juncture & Timing**: Sandhi Puja takes place on **Maha Ashtami (Monday, 19 October 2026)** at the precise astronomical juncture between the final 24 minutes of Maha Ashtami and the first 24 minutes of Maha Navami (a sacred **48-minute celestial window**).\n` +
        `• **Mythology & Chamunda Avatara**: At this exact threshold, Devi Durga manifested in Her fierce, all-conquering aspect as **Devi Chamunda** to vanquish the demon chieftains Chanda and Munda.\n` +
        `• **108 Sacred Blue Lotuses (*Neel Kamal*)**: Exactly 108 lotuses are offered in memory of Lord Rama's devotion during his autumn invocation (*Akalbodhon*).\n` +
        `• **108 Earthen Diyas**: 108 clay lamps are lit in absolute synchronization as thunderous dhaak beats, conch shells (*shankha*), and Kanshi reverberate through the pandal.\n` +
        `• **Sacred Balidan**: Symbolic non-violent vegetable sacrifice of sugarcane (*aakh*), chalkumro (wax gourd), and banana is performed before the Deity.\n\n` +
        `👉 **[Click Here to Explore All Rituals on Akalbodhon](action:nav:rituals)**`
      );
    } else if (q.includes('pushpanjali') || q.includes('anjali')) {
      return (
        `**Maha Ashtami Pushpanjali — Sacred Sanskrit Floral Offering** 🌸🪔\n\n` +
        `• **Timing**: Performed on the morning of **Maha Ashtami (Monday, 19 October 2026)** typically between **9:00 AM and 11:30 AM**, depending on the tithi.\n` +
        `• **Ritual & Fasting**: Devotees traditionally observe a fast (*upavasa*) until Pushpanjali is concluded. Offering Bel leaves (*bel pata*), fresh flowers, and sandalwood paste in three sacred rounds.\n` +
        `• **Sacred Mantra**: Concluded with the revered prayer: *\"Om Jayanti Mangala Kali Bhadrakali Kapalini, Durga Shiva Kshama Dhatri Svaha Svadha Namostute.\"*\n` +
        `• **Traditional Attire**: Women traditionally wear Lal-Paad Shada Saree or silk ethnic suits; men wear crisp Dhoti-Panjabi or Kurta.\n\n` +
        `👉 **[View Vedic Rituals Timeline](action:nav:rituals)**`
      );
    } else if (q.includes('kumari')) {
      return (
        `**Kumari Puja — Honoring the Living Goddess** 👑🌸\n\n` +
        `• **Spiritual Meaning**: Kumari Puja honors a young pre-pubescent girl (aged between 1 to 16) as the pure, unmanifested living embodiment of Devi Mahamaya / Durga.\n` +
        `• **Belur Math Landmark**: Popularized in 1901 by **Swami Vivekananda** at Belur Math, where thousands gather on **Maha Ashtami morning (19 Oct 2026)** to witness the serene ritual.\n` +
        `• **Rituals**: The Kumari is dressed in fine red silk, adorned with flower garlands, and worshipped with sacred mantras, aarti, and bhog offerings.\n\n` +
        `👉 **[Explore Rituals on Akalbodhon](action:nav:rituals)**`
      );
    } else if (q.includes('dhunuchi')) {
      return (
        `**Dhunuchi Naach — The Ecstatic Rhythm of Maha Navami** 🔥🥁\n\n` +
        `• **The Tradition**: The exhilarating devotional dance performed during evening Aarti on **Maha Navami (Tuesday, 20 October 2026)** and Vijaya Dashami.\n` +
        `• **The Chalice (*Dhunuchi*)**: Earthen chalices filled with burning coconut husk, glowing camphor, and fragrant frankincense (*dhuno*), emitting dense, sacred aromatic smoke.\n` +
        `• **The Dance**: Devotees dance with one, two, or even balancing a burning dhunuchi in their teeth, matching step-for-step with rolling, frenetic dhaak beats and kanshi rhythms.\n\n` +
        `👉 **[Explore Sacred Rituals](action:nav:rituals)**`
      );
    } else if (q.includes('sindoor') || q.includes('baran')) {
      return (
        `**Sindoor Khela & Devi Baran — Bittersweet Farewell of Vijaya Dashami** 🌺❤️\n\n` +
        `• **Devi Baran**: On the morning of **Bijoya Dashami (Wednesday, 21 October 2026)**, married women bid a tearful farewell to Maa Durga by wiping Her tears with betel leaves, feeding Her sweet sandesh, and touching Her feet.\n` +
        `• **Sindoor Khela**: Women apply vibrant red vermilion (*sindoor*) on the Goddess's forehead, followed by joyously smearing sindoor on each other, praying for marital longevity and happiness.\n` +
        `• **Subho Bijoya**: Exchanging warm embraces (*kolakoli*), touching the feet of elders, and distributing sweet Rosogollas and Nimki.\n\n` +
        `👉 **[Explore Rituals on Akalbodhon](action:nav:rituals)**`
      );
    } else if (q.includes('akalbodhon') || q.includes('bodhon')) {
      return (
        `**The Scriptural Origin of Akalbodhon (Untimely Invocation)** 🏹🪔\n\n` +
        `• **Mythological Root**: According to Krittivasi Ramayana, Lord Rama invoked Devi Durga in the autumn (*Sharad*) season before fighting the demon king Ravana.\n` +
        `• **Why 'Akal' (Untimely)**: Durga Puja traditionally occurs in spring (*Basanta* - Basanti Puja). Because the Sun was in *Dakshinayana* (the southern solstice, when deities rest), Lord Rama performed an 'untimely' awakening (*Akalbodhon*).\n` +
        `• **108 Blue Lotuses**: Lord Rama needed 108 Neel Kamal. When one was missing, He prepared to sacrifice His own lotus-like eye (*Padmalochana*), at which point the Divine Mother appeared to grant Him victory.\n\n` +
        `👉 **[Explore Rituals on Akalbodhon](action:nav:rituals)**`
      );
    } else if (q.includes('date') || q.includes('when') || q.includes('schedule') || q.includes('calendar') || q.includes('panjika') || q.includes('shashthi') || q.includes('sashthi') || q.includes('shasthi') || q.includes('saptami') || q.includes('tithi')) {
      return (
        `**Durga Puja 2026 Official Dates & Ritual Schedule (Web & Panjika)** 📅🪔\n\n` +
        `According to traditional Bengali Panjika almanacs and official web calendars:\n\n` +
        `• 🌅 **Mahalaya**: Saturday, 10 October 2026 — Dawn ancestral *Tarpan* along holy river ghats and Birendra Krishna Bhadra's *Mahishasuramardini* recitation at 4:00 AM IST.\n` +
        `• 🥁 **Maha Shashthi**: Friday, 16 October 2026 — *Devi Bodhon* under the Bilva tree, *Kalparambha*, and formal awakening of Maa Durga (Shashthi tithi commences on Oct 16).\n` +
        `• 🌿 **Maha Saptami**: Saturday, 17 October & Sunday, 18 October 2026 — *Nabapatrika Snan* (dawn river bathing of *Kola Bou* in the holy Hooghly) and *Prana Pratishtha*. The auspicious Saptami tithi commences on Oct 17 and spans across into Oct 18 across panjikas.\n` +
        `• 🔥 **Maha Ashtami**: Monday, 19 October 2026 — Morning Sanskrit **Pushpanjali**, revered **Kumari Puja** at Belur Math, and the celestial **Sandhi Puja** (48-minute astronomical window with 108 blue lotuses & 108 earthen lamps).\n` +
        `• ✨ **Maha Navami**: Tuesday, 20 October 2026 — Sacred *Maha Yajna / Homa*, festive community *Bhog*, and electrifying **Dhunuchi Naach** to rolling dhaak rhythms.\n` +
        `• 🪷 **Bijoya Dashami**: Wednesday, 21 October 2026 — Bittersweet farewell *Devi Baran*, vibrant *Sindoor Khela*, touching elders' feet (*Kolakoli*), and holy Ganga immersion (*Bishorjon*).\n\n` +
        `👉 **[Explore Sacred Rituals Timeline](action:nav:rituals)**`
      );
    } else {
      return (
        `**Sacred Vedic Durga Puja Rituals Schedule (2026)** 🪔🕊️\n\n` +
        `• **Mahalaya (10 Oct 2026)**: Dawn ancestral *Tarpan* along holy river ghats and *Mahishasuramardini* recitation.\n` +
        `• **Maha Shashthi (16 Oct 2026)**: *Devi Bodhon* under the sacred Bel tree, *Kalparambha*, and formal awakening.\n` +
        `• **Maha Saptami (17–18 Oct 2026)**: *Nabapatrika Snan* (dawn bathing of *Kola Bou* in the holy Hooghly) and *Prana Pratishtha* spanning the 17th–18th tithi.\n` +
        `• **Maha Ashtami (19 Oct 2026)**: Morning **Pushpanjali** flower offerings; **Kumari Puja**; and the celestial **Sandhi Puja** with 108 blue lotuses and 108 burning clay lamps.\n` +
        `• **Maha Navami (20 Oct 2026)**: Sacred Vedic fire sacrifice followed by electrifying *Dhunuchi Naach* to rolling dhaak rhythms.\n` +
        `• **Bijoya Dashami (21 Oct 2026)**: Bidding farewell to Maa Durga, vibrant *Sindoor Khela*, and holy immersion (*Bhashan*).\n\n` +
        `👉 **[Explore Rituals on Akalbodhon](action:nav:rituals)**`
      );
    }
  }

  // 6. Curated 1-Day Master Itinerary Solver
  if (isPlan) {
    return (
      `**Curated 1-Day Master Pandal Hopping Itinerary (Kolkata 2026)** 🗺️🚶‍♂️\n\n` +
      `An optimized morning-to-midnight route balancing heritage, art, and iconic culinary pitstops:\n\n` +
      `• 🌅 **Morning (9:00 AM – 1:00 PM) • North Kolkata Heritage Circuit**:\n` +
      `  - Start at **Shyambazar Metro** ➔ Walk to centenary **Bagbazar Sarbojanin** (pure Sabeki Daaker Saaj idol).\n` +
      `  - Hop to **Kumartuli Park** and stroll through the idol-makers' artisan quarter.\n` +
      `  - Visit the aristocratic 1757 **Sovabazar Rajbari** Natmandir courtyard.\n` +
      `  - 🍴 *Food Stop*: Original Diamond Fish Fry at **Mitra Cafe** or Kosha Mangsho at **Golbari**.\n\n` +
      `• ☀️ **Afternoon (3:00 PM – 5:30 PM) • Central Illumination Circuit**:\n` +
      `  - Metro to **Central / MG Road** ➔ Marvel at the majestic palace reflection over **College Square** lake.\n` +
      `  - Visit **Mohammad Ali Park**.\n` +
      `  - 🍴 *Refreshment*: Paramount Cold Sherbats (Daab Sarbat).\n\n` +
      `• 🌙 **Evening & Night (6:30 PM – Midnight) • South Kolkata Mega Spectacles**:\n` +
      `  - Metro to **Kalighat Station** ➔ Walk down Chetla Central Road to **Chetla Agrani Club**.\n` +
      `  - Cross over to **Suruchi Sangha** (New Alipore).\n` +
      `  - Continue down Rashbehari to avant-garde **Tridhara Sammilani**.\n` +
      `  - Midnight youth adda at **Maddox Square** open park lawns.\n` +
      `  - 🥛 *Midnight Snack*: World-famous **Doodh Cola** & Kesar Chai at **Balwant Singh's Eating House**!\n\n` +
      `👉 **[Open Curated Master Plans](action:nav:plans)** | **[Open My Saved Itinerary](action:nav:saved)**`
    );
  }

  // 6. Specific Pandal Spotlight
  const matchedPandal = matchPandalInQuery(q);
  if (matchedPandal) {
    return (
      `**${matchedPandal.name} Spotlight** 🏛️✨\n\n` +
      `• **Zone**: ${matchedPandal.zone} Kolkata\n` +
      `• **Artistic Concept & Theme**: ${matchedPandal.theme}\n` +
      `• **Highlights**: ${matchedPandal.highlights}\n` +
      `• **Nearest Metro Station**: **${matchedPandal.metro}**\n` +
      `• **Walking Directions**: ${matchedPandal.walk}\n\n` +
      `### 🚶 Nearby Pandals in this Circuit\n` +
      (matchedPandal.nearby || []).map(p => `• **${p}**`).join('\n') + `\n\n` +
      `👉 **[Explore ${matchedPandal.zone} Kolkata Pandals on Akalbodhon](action:nav:pandals:${matchedPandal.zone})** | 🗺️ [Open Google Maps](${matchedPandal.mapsUrl})`
    );
  }

  // 7. Regional Zone Circuits
  if (q.includes('south') && (q.includes('pandal') || q.includes('zone') || q.includes('best') || q.includes('top') || q.includes('list') || q.includes('circuit'))) {
    return (
      `**Top South Kolkata Durga Puja Pandals (2026)** 🏛️✨\n\n` +
      `South Kolkata is the epicenter of monumental architectural innovation, conceptual art installations, and vibrant youth carnival energy:\n\n` +
      `1. **Chetla Agrani Club** (Kalighat Metro): Sublime concept art, master earthen terracotta craft, and soulful lighting pavilions.\n` +
      `2. **Suruchi Sangha** (New Alipore): Acclaimed thematic spectacles spotlighting diverse Indian regional traditions and social harmony.\n` +
      `3. **Tridhara Sammilani** (Ballygunge / Kalighat Metro): World-renowned sensory concepts blending avant-garde architecture with spiritual reverence.\n` +
      `4. **Ekdalia Evergreen Club** (Gariahat): Heritage classic showcasing jaw-dropping temple replicas with colossal German crystal chandeliers.\n` +
      `5. **Maddox Square** (Ritchie Road): The legendary heartbeat of youth adda, massive open park lawns, and rolling dhaak beats.\n` +
      `6. **Mudiali Club & Shiv Mandir** (Southern Avenue): Breathtaking eco-art decor, lake-side serenity, and mesmerizing illumination.\n` +
      `7. **Naktala Udayan Sangha** (Gitanjali Metro): Mammoth avant-garde sculptures and world-class conceptual design.\n\n` +
      `👉 **[Explore South Kolkata Pandals on Akalbodhon](action:nav:pandals:South)**`
    );
  }

  if (q.includes('north') && (q.includes('pandal') || q.includes('zone') || q.includes('best') || q.includes('top') || q.includes('list') || q.includes('circuit'))) {
    return (
      `**Top North Kolkata Durga Puja Pandals (2026)** 🏛️🪔\n\n` +
      `North Kolkata is the soul of authentic heritage, colonial aristocracy, and classical Bengali sabeki craftsmanship:\n\n` +
      `1. **Bagbazar Sarbojanin**: The centenary benchmark of pure traditional Sabeki idol sculpted with divine serenity and draped in shimmering Daaker Saaj.\n` +
      `2. **Kumartuli Park**: Cutting-edge creative brilliance nestled inside the centuries-old idol-sculptors' quarters by the holy Ganges.\n` +
      `3. **Sovabazar Rajbari**: Historic 1757 Bonedi Bari celebration founded by Raja Nabakrishna Deb in the grand colonnaded Natmandir.\n` +
      `4. **Tala Prattoy**: Internationally recognized contemporary installation that elevates pandal art into a world-class outdoor gallery.\n` +
      `5. **Ahiritola Sarbojanin**: Riverside heritage festival celebrated for socially resonant themes and rich community spirit.\n` +
      `6. **Maniktala Chaltabagan**: Masterful crystal and brass glasswork installations.\n\n` +
      `👉 **[Explore North Kolkata Pandals on Akalbodhon](action:nav:pandals:North)**`
    );
  }

  if ((q.includes('east') || q.includes('salt lake')) && (q.includes('pandal') || q.includes('zone') || q.includes('best'))) {
    return (
      `**Top East Kolkata & Salt Lake Pandals (2026)** 🏛️\n\n` +
      `1. **Sreebhumi Sporting Club** (Lake Town / VIP Road): Spectacular royal palace architectural replicas with dazzling Chandannagar illumination.\n` +
      `2. **FD Block & BJ Block** (Salt Lake): Grand community festivals with spacious park setups and high-concept creative pavilions.\n` +
      `3. **Dum Dum Park Tarun Sangha & Bharat Chakra**: High-concept fine art installations and innovative socio-cultural themes.\n\n` +
      `👉 **[Click Here to View All East Zone Pandals on Akalbodhon](action:nav:pandals:East)**`
    );
  }

  if (q.includes('rajbari') || q.includes('bonedi') || q.includes('heritage')) {
    return (
      `**Heritage Bonedi Bari Durga Pujas (Aristocratic Estates)** 🏛️🪔\n\n` +
      `Experience 250+ years of aristocratic Bengali tradition in classical Natmandir courtyards:\n\n` +
      `• **Sovabazar Rajbari (1757)**: Founded by Raja Nabakrishna Deb, attended by Lord Clive, timeless Ekchala Daaker Saaj pratima.\n` +
      `• **Shobhabazar Chhoto Rajbari**: Majestic twin estate across the lane with exquisite classical aarti.\n` +
      `• **Rani Rashmoni Bari (Janbazar)**: Established by the revered founder of Dakshineswar Kali Temple.\n` +
      `• **Thanthania Dutta Bari (1855)**: Known for divine Hara-Gauri pratima where Shiva sits beside Durga.\n` +
      `• **Laha Bari**: Revered for unique idol where Maa Durga sits peacefully in Shiva's lap without weapons.\n\n` +
      `👉 **[Explore Heritage Rajbari Pujas](action:nav:pandals:rajbari)**`
    );
  }

  // 8. Greetings (STRICT word boundary, only when NO domain keywords exist!)
  const hasDomain = isFood || isTransit || isMetroGeneral || isAttire || isRitual || isPlan || ['pandal', 'south', 'north', 'east', 'west', 'kolkata'].some(k => q.includes(k));
  const isGreeting = (
    /^(hi|hello|hey|namaste|nomoshkar|pranam|joy maa durga|subho mahalaya)\b/i.test(q) ||
    (q.split(/\s+/).length <= 2 && /\b(hi|hello|hey|namaste|nomoshkar|pranam)\b/i.test(q))
  ) && !hasDomain;

  if (isGreeting) {
    return (
      `Joy Maa Durga! 🌺 **Nomoshkar and welcome to Akalbodhon 2026!**\n\n` +
      `I am **sharod.ai**, your personal AI Guide. I am here to help you navigate Kolkata's greatest celebration:\n\n` +
      `• 🏛️ **Pandals & Routes**: North, South, East/Salt Lake, Central circuits and Rajbari heritage\n` +
      `• 🪔 **Vedic Rituals & Timings**: Pushpanjali, Sandhi Puja, Dhunuchi Naach, Kumari Puja\n` +
      `• 🍲 **Culinary Guide**: Iconic Kolkata Biryani, Street Food, and authentic Bhog\n` +
      `• 🚇 **Kolkata Metro & Transit**: Station mappings, overnight train schedules\n` +
      `• 👗 **Festival Etiquette & Attire**: What to wear, traditions, and style advice\n\n` +
      `👉 [Explore South Kolkata Pandals](action:nav:pandals:South) | [View Sacred Rituals](action:nav:rituals) | [Kolkata Food Guide](action:nav:food-shopping)`
    );
  }

  // 9. General Fallback
  return (
    `Thank you for asking about **"${query}"**! 🌟\n\n` +
    `As **sharod.ai**, your intelligent guide on Akalbodhon, I am equipped to assist with deep cultural wisdom, festival logistics, and multifaceted knowledge:\n\n` +
    `• 🏛️ **Pandal Logistics & Transit**: Ask me how to reach any of Kolkata's 50+ pandals (e.g. Chetla Agrani, Suruchi Sangha, Tridhara, Bagbazar) from Sealdah, Howrah, or Airport.\n` +
    `• 🪔 **Vedic Heritage & Rituals**: Inquire about Sandhi Puja timings, Pushpanjali mantras, or the scriptural roots of Akalbodhon.\n` +
    `• 👗 **Festival Sartorial Advice**: Discover day-wise dress codes, styling suits on Ashtami, or choosing breathable fabrics.\n` +
    `• 🍲 **Culinary Trails**: Get curated recommendations for iconic Biryani, Street Rolls, and Bengali Sweets across Kolkata.\n\n` +
    `👉 [Explore South Kolkata Pandals](action:nav:pandals:South) | [View Sacred Rituals](action:nav:rituals) | [Kolkata Food Guide](action:nav:food-shopping)`
  );
}

export default async function handler(req, res) {
  // CORS & Preflight Handling
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-goog-api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { message, history, apiKey: clientApiKey } = req.body || {};
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

    // Security: Check environment first, then client-supplied key if provided
    const apiKey = (process.env.GEMINI_API_KEY || '').trim() || (typeof clientApiKey === 'string' ? clientApiKey.trim() : '');

    // If API key is missing, respond with the high-intelligence knowledge and transit engine
    if (!apiKey) {
      const localReply = generateLocalResponse(trimmedMessage);
      return res.status(200).json({
        success: true,
        response: localReply,
        source: 'local_intelligent_engine',
        grounded_web: false
      });
    }

    const systemInstruction = `You are sharod.ai, the premier, highly intellectual AI Guide and festival concierge on Akalbodhon (the definitive Kolkata Durga Puja web platform).

CRITICAL DIRECTIVE ON RESPONSES & ZERO-GREETING RULE:
1. NEVER output a generic introductory menu, capability checklist, or greeting like "Joy Maa Durga! Nomoshkar and welcome... I am sharod.ai... I am here to help you navigate: Pandals, Rituals, Food..." when the user asks a question or clicks a quick-chip (such as "Sandhi Puja Rituals", "Best South Pandals", "1-Day Itinerary", "Puja Dates 2026", "Food near Maddox", "How to reach Chetla").
2. ALWAYS provide the direct, deep, comprehensive, and specific answer immediately to the topic requested!

CANONICAL 2026 DURGA PUJA DATES & RITUAL CALENDAR (Official Web & Panjika):
- Mahalaya: Saturday, 10 October 2026 (Dawn Tarpan & 4:00 AM Birendra Krishna Bhadra Mahishasuramardini)
- Maha Shashthi: Friday, 16 October 2026 (Devi Bodhon & Kalparambha; Shashthi tithi commences on Oct 16)
- Maha Saptami: Saturday, 17 October & Sunday, 18 October 2026 (Saptami tithi commences on Oct 17 and spans across into Oct 18 across Bengali panjikas; Nabapatrika / Kola Bou Snan observed across this period)
- Maha Ashtami: Monday, 19 October 2026 (Morning Pushpanjali, Kumari Puja at Belur Math, and Sandhi Puja 48-minute astronomical juncture with 108 blue lotuses & 108 clay lamps)
- Maha Navami: Tuesday, 20 October 2026 (Sacred Maha Yajna / Homa, community Bhog, and electrifying evening Dhunuchi Naach)
- Bijoya Dashami: Wednesday, 21 October 2026 (Devi Baran, sacred Sindoor Khela, Kolakoli, and holy Ganga immersion / Bishorjon)

INTELLECTUAL DEPTH & CORE EXPERTISE:
1. ACCURATE, INTELLECTUAL & ELOQUENT: Provide sophisticated, articulate, nuanced, and structured responses. Use eloquent English enriched with Bengali cultural terms.
2. PRECISE STEP-BY-STEP TRANSIT: When the user asks how to reach a pandal or destination from a station (e.g. Sealdah, Howrah, Airport, Esplanade), provide exact step-by-step navigation instructions:
   - Kolkata Metro lines (Green Line, Blue Line), exact boarding and interchange stations (e.g. Green Line Sealdah -> Esplanade interchange -> Blue Line Kalighat Metro), and walking directions.
   - Yellow Taxi / App-Cab route with corridors, flyovers, distance, and Kolkata Police festive crowd advisories.
   - Bus options and nearby pandals to hop next in that cluster.
3. VEDIC RITUALS & SCRIPTURAL MASTERY: Provide deep insights into Akalbodhon (Lord Rama's autumn invocation), Bodhon, Nabapatrika, Pushpanjali, Sandhi Puja 108 lotuses, Kumari Puja, Dhunuchi Naach, and Sindoor Khela.
4. SARTORIAL ELEGANCE: Provide detailed advice on festival dress codes (ethnic suits, Anarkalis, sarees, dhoti-kurtas, western blazers, breathable fabrics for Kolkata humidity).
5. DIRECT WEBSITE NAVIGATION ACTIONS: When mentioning pandals or sections, include interactive navigation markdown actions:
   - 👉 [Explore South Kolkata Pandals](action:nav:pandals:South)
   - 👉 [Explore North Kolkata Pandals](action:nav:pandals:North)
   - 👉 [Explore East Pandals](action:nav:pandals:East)
   - 👉 [Explore Central Pandals](action:nav:pandals:Central)
   - 👉 [Explore Heritage Rajbari](action:nav:pandals:rajbari)
   - 👉 [Explore Sacred Rituals](action:nav:rituals)
   - 👉 [Browse Kolkata Food & Shopping](action:nav:food-shopping)
   - 👉 [Open My Saved Itinerary](action:nav:saved)
   - 👉 [Tune into Puja Radio](action:nav:audio)
6. VERSATILITY: You can answer ANY question—science, technology, coding, literature, or lifestyle—with intellect, clarity, and warmth.`;

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
        maxOutputTokens: 1400
      }
    };

    // Candidate active Google Gemini models
    const models = [
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-2.0-flash-lite'
    ];

    for (const model of models) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 6000);

        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
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
        } else {
          console.warn(`Model ${model} returned status ${resp.status}`);
        }
      } catch (err) {
        console.warn(`Model ${model} fetch attempt failed:`, err.message);
      }
    }

    // Resilient Fallback to our high-intelligence knowledge engine
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
