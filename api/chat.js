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
      `• **Maha Shasthi**: Casual chic or contemporary Indo-Western wear to kick off the festive week.\n` +
      `• **Maha Saptami**: Vibrant handloom sarees (Tant, Dhakai Jamdani), printed kurtas, stylish co-ord sets, or smart ethnic fusion.\n` +
      `• **Maha Ashtami**: The grand traditional showcase! Traditional Bengali sarees (Tussar, Garad, Lal-Paad Shada), Dhoti-Kurtas, and heavy ethnic suits for morning Pushpanjali. Sleek contemporary fashion, elegant suits or blazers for night pandal hopping.\n` +
      `• **Maha Navami**: High glamor, royal silhouettes, festive gowns, Indo-western suits, and statement ethnic wear.\n` +
      `• **Vijaya Dashami**: Red & white sarees for sacred *Sindoor Khela*; classic formal ethnic or crisp white kurtas for *Bijoya Shubhechha*.\n\n` +
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

  // 4. SPECIFIC PANDAL SPOTLIGHTS
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

  // 5. REGIONAL PANDAL LISTS
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

  // 6. RITUALS & SCRIPTURAL KNOWLEDGE
  if (
    q.includes('ritual') ||
    q.includes('sandhi') ||
    q.includes('pushpanjali') ||
    q.includes('anjali') ||
    q.includes('kumari') ||
    q.includes('dhunuchi') ||
    q.includes('ashtami') ||
    q.includes('shasthi') ||
    q.includes('saptami') ||
    q.includes('navami') ||
    q.includes('dashami') ||
    q.includes('sindoor') ||
    q.includes('akalbodhon') ||
    q.includes('bhashan') ||
    q.includes('visarjan')
  ) {
    if (q.includes('sandhi')) {
      return (
        `**Sandhi Puja — The Divine Climax of Maha Ashtami** 🪔🕊️\n\n` +
        `• **Vedic Significance**: Sandhi Puja marks the precise astronomical juncture between the final 24 minutes of Maha Ashtami and the first 24 minutes of Maha Navami (a 48-minute celestial window).\n` +
        `• **Mythology**: At this exact threshold, Devi Durga manifested as **Devi Chamunda** to slay the demon chieftains Chanda and Munda.\n` +
        `• **108 Sacred Blue Lotuses (*Neel Kamal*)**: 108 lotuses are offered in memory of Lord Rama's devotion during his untimely autumn invocation (*Akalbodhon*).\n` +
        `• **108 Earthen Diyas**: 108 clay lamps are lit in absolute synchronization as thunderous dhaak beats, conch shells (*shankha*), and Kanshi reverberate through the pandal.\n` +
        `• **Sacred Balidan**: Symbolic vegetable sacrifice of sugarcane (*aakh*), chalkumro (wax gourd), and banana is performed.\n\n` +
        `👉 [Explore Vedic Rituals](action:nav:rituals)`
      );
    }

    return (
      `**Sacred Vedic Durga Puja Rituals Schedule & Meaning** 🪔🕊️\n\n` +
      `• **Akalbodhon (*Lord Rama's Invocation*)**: The mythological awakening of Devi Durga by Lord Rama in autumn (*Sharad*) to seek divine blessings before slaying Ravana.\n` +
      `• **Maha Shasthi (*Devi Bodhon & Amantran*)**: Awakening the Divine Mother under the sacred Bel tree followed by Adhibas.\n` +
      `• **Maha Saptami (*Nabapatrika Snan*)**: Dawn bathing of *Kola Bou* (nine plants tied to a banana trunk representing nine forms of cosmic energy) in the Ganges, followed by *Prana Pratishtha*.\n` +
      `• **Maha Ashtami (*Pushpanjali & Kumari Puja*)**: Morning Sanskrit flower offerings, honoring young girls as living embodiments of Mahamaya (*Kumari Puja*), and the celestial **Sandhi Puja** with 108 blue lotuses and 108 lamps.\n` +
      `• **Maha Navami (*Maha Yajna & Dhunuchi Naach*)**: Sacred Vedic fire oblations followed by electrifying *Dhunuchi Naach* to rolling dhaak rhythms.\n` +
      `• **Vijaya Dashami (*Devi Baran, Sindoor Khela & Bhashan*)**: Poignant farewell to Maa Durga, vibrant vermilion play (*Sindoor Khela*), sweet exchanges (*Subho Bijoya*), and sacred river immersion.\n\n` +
      `👉 **[Explore Rituals on Akalbodhon](action:nav:rituals)**`
    );
  }

  // 7. FOOD & DINING
  if (q.includes('food') || q.includes('eat') || q.includes('restaurant') || q.includes('biryani') || q.includes('roll') || q.includes('sweet') || q.includes('mishti') || q.includes('kabiraji') || q.includes('bhog')) {
    return (
      `**Iconic Kolkata Durga Puja Culinary Trail** 🍲🍗\n\n` +
      `• **Kolkata Biryani & Mughlai Masterpieces**:\n` +
      `  - **Arsalan** (Park Circus / Ruby / Hatibagan): Fragrant long-grain rice, melt-in-mouth mutton, and golden ghee-roasted potato.\n` +
      `  - **Oudh 1590** (Deshapriya Park / Salt Lake): Period dining with Awadhi Handi Biryani and Galawati Kababs.\n` +
      `  - **Royal Indian Hotel** (Barabazar / Park Circus): Authentic Lucknowi Pasinda and classic Mutton Chaap.\n` +
      `• **Legendary Heritage Bites & Cabins**:\n` +
      `  - **Mitra Cafe** (Shyambazar): Iconic crispy Mutton Kabiraji and Fish Diamond Fry.\n` +
      `  - **Kusum Rolls** (Park Street): Kolkata's legendary flaky paratha Egg-Chicken rolls.\n` +
      `  - **Golbari** (Shyambazar): Legendary slow-cooked spicy Kosha Mangsho with hot butter parathas.\n` +
      `• **Sacred Puja Bhog**:\n` +
      `  - Fragrant Gobindobhog rice khichuri, crispy Begun Bhaja, Labra (mixed spiced vegetables), Chholar Dal, and sweet tomato-khejur chutney.\n` +
      `• **Heritage Bengali Sweets**:\n` +
      `  - **Balaram Mullick & Radharaman Mullick** (Bhawanipore): Baked Rosogolla and Mango Sandesh.\n` +
      `  - **Girish Ch. Dey & Nakur Ch. Nandy** (Hedua): Centuries-old Jolbhora Sandesh.\n\n` +
      `👉 **[Open Food & Shopping Guide on Akalbodhon](action:nav:food-shopping)**`
    );
  }

  // 8. INTELLECTUAL GENERAL KNOWLEDGE / CODE / SCIENCE / PHILOSOPHY FALLBACK
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
