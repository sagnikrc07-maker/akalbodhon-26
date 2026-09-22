/**
 * Akalbodhon — Festival Guide
 * Core Reactive Controller, Sound Synthesizer, Routing, Scroll Reveal & Data Store
 */

(function () {
  'use strict';
  // --- HTML ENTITY ENCODER (XSS Defense) ---
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- GOOGLE MAPS SEARCH URL CONVERTER (Safe Navigation & Protocol Validation) ---
  function toMapsSearchUrl(url, fallbackQuery = '') {
    if (!url || url === '#' || url === 'undefined') {
      return fallbackQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fallbackQuery)}` : '#';
    }
    if (typeof url === 'string') {
      const cleanUrl = url.trim();
      // Security: strictly reject unsafe protocols (javascript:, data:, vbscript:, etc.)
      if (/^(javascript|data|vbscript):/i.test(cleanUrl)) {
        return fallbackQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fallbackQuery)}` : '#';
      }
      if (cleanUrl.includes('/maps/dir/')) {
        return cleanUrl.replace('/maps/dir/?api=1&destination=', '/maps/search/?api=1&query=')
                       .replace('/maps/dir/?destination=', '/maps/search/?query=')
                       .replace('/maps/dir/', '/maps/search/')
                       .replace('destination=', 'query=');
      }
      if (cleanUrl.includes('destination=')) {
        return cleanUrl.replace('destination=', 'query=').replace('/dir/', '/search/');
      }
      return cleanUrl;
    }
    return fallbackQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fallbackQuery)}` : '#';
  }


  // --- 1. DATA COLLECTIONS ---

  // 20 Iconic Durga Puja Pandals with Authentic High-Resolution Images & Google Maps
  const PANDALS_DATA = [
    // --- NORTH KOLKATA ZONE ---
    {
      id: 'maniktala-chaltabagan',
      name: 'Maniktala Chaltabagan Lohapatty',
      zone: 'North',
      theme: 'Pioneering Environment & Crystal Glasswork Masterpiece',
      image: 'pandals/maniktala chaltabagan lohapatty.jpg',
      transit: '🚇 Girish Park Metro (5 min walk) • 🚌 Manicktala Crossing Bus',
      transitType: 'metro',
      highlights: 'World-renowned crystal, brass, and glass art installations with glowing night illumination.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Maniktala+Chaltabagan+Lohapatty+Durga+Puja+Kolkata'
    },
    {
      id: 'chorbagan-sarbojanin',
      name: 'Chorebagan Sarbojanin Durgotsab Samity',
      zone: 'North',
      theme: 'Fine Earthen Terracotta & Sustainable Bengal Clay Heritage',
      image: 'pandals/chorebagan.png',
      transit: '🚇 Girish Park Metro (4 min walk) • 🚌 Rammohan Roy Sarani Bus',
      transitType: 'metro',
      highlights: 'Poetic cultural narratives crafted through organic terracotta and rustic traditional craftsmanship.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Chorbagan+Sarbojanin+Durga+Puja+Kolkata'
    },
    {
      id: 'kashi-bose-lane',
      name: 'Kashi Bose Lane Durga Puja Samity',
      zone: 'North',
      theme: 'Social Empathy Installation & Intricate Wooden Sculpture',
      image: 'pandals/kashibose.jpg',
      transit: '🚇 Girish Park Metro (5 min walk) • 🚌 Manicktala Bus Stop',
      transitType: 'metro',
      highlights: 'Award-winning conceptual pandal blending touching social messages with Vedic sculpting.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Kashi+Bose+Lane+Durga+Puja+Samity+Kolkata'
    },
    {
      id: 'ahiritola-sarbojanin',
      name: 'Ahiritola Sarbojanin Durgotsab',
      zone: 'North',
      theme: 'Ganga Riverside Heritage & Glorious Thematic Architecture',
      image: 'pandals/Ahiritola Sarbojanin Durgotsab.jpg',
      transit: '🚇 Sovabazar Sutanuti Metro (5 min walk) • ⛴️ Ahiritola Ferry Ghat',
      transitType: 'metro',
      highlights: 'Historic North Kolkata century-old puja renowned for monumental riverfront gates and exquisite clay idol.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Ahiritola+Sarbojanin+Durgotsab+Kolkata'
    },
    {
      id: 'beniatola-sarbojanin',
      name: 'Beniatola Sarbojanin Durgotsav',
      zone: 'North',
      theme: 'Indo-Saracenic Heritage Architecture & Dokra Metal Craft',
      image: 'pandals/Beniatola Sarbojanin Durgotsav.jpg',
      transit: '🚇 Sovabazar Sutanuti Metro (4 min walk) • 🚌 BK Paul Avenue Bus',
      transitType: 'metro',
      highlights: 'Rare brass Dokra relief sculptures and classical heritage ambience in North Kolkata.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Beniatola+Sarbojanin+Durgotsav+Kolkata'
    },
    {
      id: 'jagat-mukherjee-park',
      name: 'Jagat Mukherjee Park',
      zone: 'North',
      theme: 'Ingenious Thematic Illusion & Kinetic Light Spectacle',
      image: 'pandals/Jagat Mukherjee Park.jpg',
      transit: '🚇 Sovabazar Sutanuti Metro (5 min walk) • 🚌 JM Avenue Bus',
      transitType: 'metro',
      highlights: 'Famed for out-of-the-box conceptual themes including underwater submarines and optical glass tunnels.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Jagat+Mukherjee+Park+Durga+Puja+Kolkata'
    },
    {
      id: 'kumartuli-park',
      name: 'Kumartuli Park Sarbojanin',
      zone: 'North',
      theme: 'Epic Royal Palace Replica & Sculptors Sacred Guild Heritage',
      image: 'pandals/Kumartuli Park Sarbojanin.jpg',
      transit: '🚇 Sovabazar Sutanuti Metro (5 min walk) • ⛴️ Sovabazar Launch Ghat',
      transitType: 'metro',
      highlights: 'Nestled in the legendary idol-makers quarter, showcasing world-class clay mastery and grand palace domes.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Kumartuli+Park+Durga+Puja+Kolkata'
    },
    {
      id: 'pathuriaghata-rajbari',
      name: 'Pathuriaghata Rajbari Durga Puja',
      zone: 'North',
      theme: 'Aristocratic 18th-Century Zamindari Bonedi Courtyard Heritage',
      image: 'pandals/Pathuriaghata Rajbari Durga Puja.jpg',
      transit: '🚇 Girish Park Metro (5 min walk) • 🚌 Nimtala Ghat Street Bus',
      transitType: 'metro',
      highlights: 'Ghosh family heritage Thakurdalan, traditional Ekchala idol with real silver ornaments and family rituals.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Pathuriaghata+Rajbari+Durga+Puja+Kolkata'
    },
    {
      id: 'hatibagan-sarbojanin',
      name: 'Hatibagan Sarbojanin',
      zone: 'North',
      theme: 'Architectural Splendor & Traditional Folk Artistry',
      image: 'pandals/hatibagan.png',
      transit: '🚇 Shyambazar Metro (4 min walk) • 🚌 Hatibagan 5-Point Bus',
      transitType: 'metro',
      highlights: 'Over a century of celebration with majestic thematic facades and authentic community culture.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Hatibagan+Sarbojanin+Durgotsav+Kolkata'
    },

    {
      id: 'nalin-sarkar-street',
      name: 'Nalin Sarkar Street Sarbojanin',
      zone: 'North',
      theme: 'Raw Organic Material Artistry & Creative Clay Sculpture',
      image: 'pandals/Nalin Sarkar Street Sarbojanin.jpg',
      transit: '🚇 Shyambazar Metro (3 min walk) • 🚌 Bidhan Sarani Bus',
      transitType: 'metro',
      highlights: 'Masterful transformations of bamboo, pottery, and jute into breathtaking spatial sculptures.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Nalin+Sarkar+Street+Durga+Puja+Kolkata'
    },
    {
      id: 'bagbazar-sarbojanin',
      name: 'Bagbazar Sarbojanin',
      zone: 'North',
      theme: 'Centenary Traditional Sabeki Idol & Iconic Dhunuchi Naach',
      image: 'pandals/baghbazar.jpg',
      transit: '🚇 Shyambazar Metro (6 min walk) • ⛴️ Bagbazar Launch Ghat',
      transitType: 'metro',
      highlights: 'Pure Bengali tradition with iconic snow-white Daaker Saaj idol, classic Sindoor Khela, and carnival adda.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Bagbazar+Sarbojanin+Durgotsav+Kolkata'
    },
    {
      id: 'sovabazar-rajbari',
      name: 'Sovabazar Rajbari',
      zone: 'North',
      theme: 'Aristocratic 1757 Bonedi Bari Open Courtyard Heritage',
      image: 'pandals/sova bazar rajbari.png',
      transit: '🚇 Sovabazar Sutanuti Metro (2 min walk) • 🚌 Rabindra Sarani Bus',
      transitType: 'metro',
      highlights: 'Raja Nabakrishna Deb historical Natmandir courtyard, canonical Vedic ceremonies, and solemn grace.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Sovabazar+Rajbari+Kolkata'
    },
    {
      id: 'darjipara-mitra-bari',
      name: 'Darjipara Mitra Bari',
      zone: 'North',
      theme: 'Centenary Aristocratic Bonedi Bari Courtyard & Sabeki Ekchala Heritage',
      image: 'pandals/Darjipara-Mitra-Barir-Durga-Puja.webp',
      transit: '🚇 Girish Park Metro (4 min walk) • 🚌 Beadon Street Bus',
      transitType: 'metro',
      highlights: 'Historic 1807 Bonedi courtyard puja featuring an ornate wooden Thakurdalan, majestic Ekchala idol, and century-old aristocratic rituals.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Darjipara+Mitra+Bari+Durga+Puja+Beadon+Street+Kolkata'
    },
    {
      id: 'jorasanko-shib-krishna-daw-rajbari',
      name: 'Jorasanko Shib Krishna Daw Rajbari',
      zone: 'North',
      theme: 'Royal 1840 Zamindari Palace Thakurdalan & Gold-Ornamented Goddess',
      image: 'pandals/jorasanko shib krishna daw Rajbari.jpeg',
      transit: '🚇 Girish Park Metro (4 min walk) • 🚌 Vivekananda Road Bus',
      transitType: 'metro',
      highlights: 'Celebrated 1840 Bonedi Bari puja famed for its majestic arches, Goddess Durga adorned in pure gold and diamond jewellery, and royal courtyard heritage.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Jorasanko+Shib+Krishna+Daw+Rajbari+Durga+Puja+Kolkata'
    },
    {
      id: 'sikdar-bagan',
      name: 'Sikdar Bagan',
      zone: 'North',
      theme: 'Centenary Pure Sculptural Artistry & Intimate North Kolkata Heritage',
      image: 'pandals/sikdar bagan.png',
      transit: '🚇 Shyambazar Metro (3 min walk) • 🚌 Hatibagan Crossing Bus',
      transitType: 'metro',
      highlights: 'Centenary North Kolkata jewel established in 1913, renowned for pure artistic idols, compact exquisite themes, and intimate heritage warmth.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Sikdar+Bagan+Sadharan+Durgotsav+Shyambazar+Kolkata'
    },
    {
      id: 'hatibagan-nabin-pally',
      name: 'Hatibagan Nabin Pally',
      zone: 'North',
      theme: 'Vibrant Community Craftsmanship & Dazzling Street Illumination',
      image: 'pandals/hatibagan nabin pally.webp',
      transit: '🚇 Shyambazar Metro (4 min walk) • 🚌 Shyambazar 5-Point Bus',
      transitType: 'metro',
      highlights: 'Lively North Kolkata landmark recognized for innovative thematic craftsmanship, colorful illumination, and vibrant neighborhood adda.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Hatibagan+Nabin+Pally+Durga+Puja+Kolkata'
    },
    {
      id: 'ahiritola-jubak-brinda',
      name: 'Ahiritola Jubak Brinda',
      zone: 'North',
      theme: 'Riverside Youth Innovation & Kinetic Nighttime Illumination',
      image: 'pandals/Ahiritola Jubak Brinda.jpg',
      transit: '🚇 Sovabazar Sutanuti Metro (4 min walk) • ⛴️ Ahiritola Ferry Ghat',
      transitType: 'metro',
      highlights: 'Vibrant youth-led riverside celebration known for creative modern concepts, lively cultural events, and energetic community participation.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Ahiritola+Jubak+Brinda+Durga+Puja+Kolkata'
    },
    {
      id: 'tala-prattoy',
      name: 'Tala Prattoy',
      zone: 'North',
      theme: 'Visionary Museum-Grade Conceptual Art & Avant-Garde Spatial Installation',
      image: 'pandals/Tala Prattoy.jpg',
      transit: '🚇 Belgachia Metro (5 min walk) • 🚆 Kolkata Chitpur Station',
      transitType: 'metro',
      highlights: 'Internationally acclaimed conceptual benchmark created by maestro artists, featuring groundbreaking experimental architecture and thought-provoking sculptures.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Tala+Prattoy+Durga+Puja+Kolkata'
    },

    // --- SOUTH KOLKATA ZONE ---
    {
      id: 'singhi-park',
      name: 'Singhi Park Sarbojanin',
      zone: 'South',
      theme: 'Classical Indian Temple Monument & Majestic Traditional Idol',
      image: 'pandals/Singhi Park Sarbojanin.jpg',
      transit: '🚇 Kalighat Metro (Auto-link) • 🚌 Gariahat Phari Bus Stop',
      transitType: 'metro',
      highlights: 'Grand temple replicas paired with legendary lighting by Chandannagar electrical artists.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Singhi+Park+Durga+Puja+Kolkata'
    },
    {
      id: 'badamtala-ashar-sangha',
      name: 'Badamtala Ashar Sangha',
      zone: 'South',
      theme: 'Pioneering Creative Thematic Installation & Environmental Art',
      image: 'pandals/Badamtala Ashar Sangha.jpg',
      transit: '🚇 Kalighat Metro (3 min walk) • 🚌 Rashbehari Crossing Bus',
      transitType: 'metro',
      highlights: 'South Kolkata theme-puja benchmark with award-winning creative soundscapes and innovative idol craft.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Badamtala+Ashar+Sangha+Kalighat+Kolkata'
    },

    {
      id: 'hindustan-club',
      name: 'Hindustan Club Sarbojanin',
      zone: 'South',
      theme: 'Regal Aesthetic Marvel & Royal Courtyard Ambience',
      image: 'pandals/Hindustan Club Sarbojanin.png',
      transit: '🚇 Kalighat Metro (6 min walk) • 🚌 Sarat Bose Road Bus',
      transitType: 'metro',
      highlights: 'Lavish architectural designs with brilliant brass embellishments and peaceful devotion.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Hindustan+Club+Durga+Puja+Sarat+Bose+Road+Kolkata'
    },
    {
      id: 'ballygunge-cultural',
      name: 'Ballygunge Cultural Association',
      zone: 'South',
      theme: 'Heritage Terracotta Courtyard & Soulful Classical Music',
      image: 'pandals/ballygunge cultural association.png',
      transit: '🚇 Kalighat Metro (7 min walk) • 🚌 Lake Temple Road Bus',
      transitType: 'metro',
      highlights: 'Beloved South Kolkata legacy puja known for aristocratic restraint, classical morning chants, and warm adda.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Ballygunge+Cultural+Association+Durga+Puja+Kolkata'
    },

    {
      id: 'barisha-club',
      name: 'Barisha Club',
      zone: 'South',
      theme: 'Profound Philosophical Installation & Motherhood Homage',
      image: 'pandals/Barisha Club.jpg',
      transit: '🚇 Behala Chowrasta Metro (5 min walk) • 🚌 DH Road Barisha Bus',
      transitType: 'metro',
      highlights: 'Celebrated across India for deeply moving emotional sculptures honoring maternal resilience and humanity.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Barisha+Club+Durga+Puja+Sakherbazar+Kolkata'
    },
    {
      id: 'behala-nutan-dal',
      name: 'Behala Nutan Dal',
      zone: 'South',
      theme: 'Contemporary Avant-Garde Space & Harmonic Acoustic Architecture',
      image: 'pandals/behala nutan dal.png',
      transit: '🚇 Taratala Metro (6 min walk) • 🚌 Taratala Crossing Bus',
      transitType: 'metro',
      highlights: 'Architectural marvel combining textured metallic acoustics, ambient chimes, and thought-provoking modern art.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Behala+Nutan+Dal+Durga+Puja+Kolkata'
    },
    {
      id: 'rajdanga-naba-uday',
      name: 'Rajdanga Naba Uday Sangha',
      zone: 'South',
      theme: 'Grand Rural Bengal Indigenous Artifacts & Tribal Motifs',
      image: 'pandals/Rajdanga Naba Uday Sangha.jpg',
      transit: '🚇 Ruby Crossing Metro (6 min walk) • 🚌 Kasba Connector Bus',
      transitType: 'metro',
      highlights: 'Spectacular large-scale installations utilizing earthen clay, bell metal, and handmade rural artifacts.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Rajdanga+Naba+Uday+Sangha+Kasba+Kolkata'
    },
    {
      id: 'ekdalia-evergreen',
      name: 'Ekdalia Evergreen Club',
      zone: 'South',
      theme: 'Grand South Indian Temple Architecture & German Chandeliers',
      image: 'pandals/Ekdalia Evergreen Club.jpg',
      transit: '🚇 Kalighat Metro (Auto) • 🚌 Gariahat Crossing Bus Stop',
      transitType: 'metro',
      highlights: 'Glorious illuminated chandeliers, authentic South Indian temple art style with traditional idol.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Ekdalia+Evergreen+Club+Gariahat+Kolkata'
    },
    {
      id: 'suruchi-sangha',
      name: 'Suruchi Sangha (New Alipore)',
      zone: 'South',
      theme: 'Pan-Indian State Craftsmanship & Living Cultural Heritage',
      image: 'pandals/Suruchi_Sangha_Durga_Puja_2019.jpg',
      transit: '🚇 Taratala Metro (6 min walk) • 🚆 Majerhat Local Train',
      transitType: 'metro',
      highlights: 'Different Indian state craftsmanship themes annually, sustainable eco-friendly materials and soulful folk music.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Suruchi+Sangha+New+Alipore+Kolkata'
    },
    {
      id: 'tridhara-sammilani',
      name: 'Tridhara Sammilani',
      zone: 'South',
      theme: 'Tribal Folklore & Contemporary Bengal Installation Art',
      image: 'pandals/Tridhara Sammilani.jpg',
      transit: '🚇 Kalighat Metro (5 min walk) • 🚌 Rashbehari Crossing Bus',
      transitType: 'metro',
      highlights: 'Iconic street installation featuring indigenous art traditions, mesmerizing soundscapes, and expressive idols.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Tridhara+Sammilani+Durga+Puja+Kolkata'
    },
    {
      id: 'mudiali-club',
      name: 'Mudiali Club',
      zone: 'South',
      theme: 'Traditional Environmental Artistry & Exquisite Golden Idol',
      image: 'pandals/mudiali.png',
      transit: '🚇 Rabindra Sarobar Metro (4 min walk) • 🚌 Southern Avenue Bus',
      transitType: 'metro',
      highlights: 'Decades of classical beauty with nature-inspired hand-painted murals and dazzling golden Goddess ornaments.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Mudiali+Club+Durga+Puja+Kolkata'
    },
    {
      id: 'bosepukur-talbagan',
      name: 'Bosepukur Talbagan',
      zone: 'South',
      theme: 'Traditional Bengal Folk Art & Intricate Eco-Craft Architecture',
      image: 'pandals/bosepukur talbagan.jpg',
      transit: '🚆 Ballygunge Local Train • 🚌 Kasba Bosepukur Bus Stop',
      transitType: 'bus',
      highlights: 'Celebrated Kasba landmark famed for heritage environmental installations, rural Bengal crafts, and lively festive atmosphere.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Bosepukur+Talbagan+Durga+Puja+Kasba+Kolkata'
    },
    {
      id: 'shivmandir',
      name: 'Shivmandir',
      zone: 'South',
      theme: 'Ethereal Spiritual Sanctuary & Contemporary Bengali Sculpture',
      image: 'pandals/shiv mandir durga puja.jpg',
      transit: '🚇 Rabindra Sarobar Metro (4 min walk) • 🚌 Lake Kalibari Bus',
      transitType: 'metro',
      highlights: 'Nestled by Rabindra Sarobar Lake, renowned for serene spiritual themes, soul-stirring lighting, and creative idol artistry.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Shiv+Mandir+Sarbojanin+Durga+Puja+Lake+Temple+Road+Kolkata'
    },
    {
      id: 'bosepukur-sitalamandir',
      name: 'Bosepukur Sitalamandir',
      zone: 'South',
      theme: 'Pioneering Thematic Installations & Indigenous Clay Art',
      image: 'pandals/bosepukur sitalamandir.png',
      transit: '🚆 Ballygunge Local Train • 🚌 Bosepukur Connector Bus',
      transitType: 'bus',
      highlights: 'Historic trail-blazer of Kolkata theme puja movement with iconic artistic materials, terracotta motifs, and classical deity.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Bosepukur+Sitalamandir+Durga+Puja+Kasba+Kolkata'
    },
    {
      id: 'deshapriya-park',
      name: 'Deshapriya Park',
      zone: 'South',
      theme: 'Grand Festive Fairground & Towering Thematic Monument',
      image: 'pandals/deshapriya park.jpg',
      transit: '🚇 Kalighat Metro (5 min walk) • 🚌 Deshapriya Park Bus Stop',
      transitType: 'metro',
      highlights: 'One of South Kolkatas most iconic expansive park pujas, known for record-breaking monumental concepts, vast food carnival, and vibrant energy.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Deshapriya+Park+Durga+Puja+Rashbehari+Avenue+Kolkata'
    },
    {
      id: 'chetla-agrani',
      name: 'Chetla Agrani',
      zone: 'South',
      theme: 'Sublime Concept Art & Master Earthen Terracotta Craft',
      image: 'pandals/chetla agrani.jpg',
      transit: '🚇 Kalighat Metro (6 min walk) • 🚌 Chetla Central Road Bus',
      transitType: 'metro',
      highlights: 'Annual masterpiece conceptualized by renowned artists, featuring breathtaking organic architectural pavilions and soulful lighting.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Chetla+Agrani+Club+Durga+Puja+Kolkata'
    },
    {
      id: 'haridevpur-41-pally',
      name: 'Haridevpur 41 Pally',
      zone: 'South',
      theme: 'Experimental Avant-Garde Sculpture & Environmental Narrative',
      image: 'pandals/haridevpur 41 pally.jpg',
      transit: '🚇 Tollygunge Metro (Auto) • 🚌 Haridevpur Bus Stand',
      transitType: 'metro',
      highlights: 'Famed for deep philosophical storytelling, organic sustainable materials, and award-winning creative idol design.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Haridevpur+41+Pally+Durga+Puja+Kolkata'
    },
    {
      id: 'kendua-shanti-shangha',
      name: 'Kendua Shanti Shangha',
      zone: 'South',
      theme: 'Rural Bengal Artisan Heritage & Sustainable Eco-Craft Concept',
      image: 'pandals/kendua shanti shangha.png',
      transit: '🚇 Kavi Subhash Metro (Auto) • 🚆 Garia Local Train',
      transitType: 'metro',
      highlights: 'Prominent South suburban cultural hub recognized for exquisite rural artisan work, sustainable eco-friendly themes, and warm community bonding.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Kendua+Shanti+Sangha+Durga+Puja+Garia+Kolkata'
    },
    {
      id: 'naktala-udayan-sangha',
      name: 'Naktala Udayan Sangha',
      zone: 'South',
      theme: 'Revolutionary Avant-Garde Spatial Design & Mammoth Concept Sculptures',
      image: 'pandals/Naktala Udayan Sangha.jpg',
      transit: '🚇 Gitanjali Metro (3 min walk) • 🚌 NSC Bose Road Bus',
      transitType: 'metro',
      highlights: 'South Kolkatas ultimate crowd magnet featuring revolutionary avant-garde conceptual art, mammoth sculptures, and award-winning idols.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Naktala+Udayan+Sangha+Durga+Puja+Kolkata'
    },
    {
      id: 'maddox-square',
      name: 'Maddox Square',
      zone: 'South',
      theme: 'Traditional Sabeki Ekchala Idol & Legendary Open-Air Cultural Adda',
      image: 'pandals/Maddox Square.jpg',
      transit: '🚇 Netaji Bhavan Metro (6 min walk) • 🚌 Lansdowne Ritchie Rd Bus',
      transitType: 'metro',
      highlights: 'The ultimate open-air festive adda hub of Kolkata, featuring a grand open courtyard pandal and breathtaking golden Sabeki Ekchala idol.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Maddox+Square+Durga+Puja+Ballygunge+Kolkata'
    },

    // --- CENTRAL KOLKATA ZONE ---
    {
      id: 'college-square',
      name: 'College Square',
      zone: 'Central',
      theme: 'Spectacular Water Reflection & Historic Illumination',
      image: 'pandals/College Square.jpg',
      transit: '🚇 Central Metro (4 min walk) • 🚌 College Street Bus Stop',
      transitType: 'metro',
      highlights: 'Huge illuminated lake reflecting thousands of synchronized bulbs, traditional idol by Sanatan Rudra Pal.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=College+Square+Durga+Puja+Kolkata'
    },
    {
      id: 'mohammad-ali-park',
      name: 'Mohammad Ali Park',
      zone: 'Central',
      theme: 'Colossal Royal Fort & Historic Palace Monument Replica',
      image: 'pandals/mohammad ali park.jpg',
      transit: '🚇 MG Road Metro (2 min walk) • 🚌 Central Avenue Bus',
      transitType: 'metro',
      highlights: 'Sprawling park grounds dominated by towering architectural fort replicas and heritage lighting.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Mohammad+Ali+Park+Durga+Puja+Kolkata'
    },
    {
      id: 'santosh-mitra-square',
      name: 'Santosh Mitra Square',
      zone: 'Central',
      theme: 'Monumental Architectural Wonder & Dazzling Laser Spectacle',
      image: 'pandals/santosh mitra.jpg',
      transit: '🚇 Central Metro (5 min walk) • 🚆 Sealdah Local Train',
      transitType: 'metro',
      highlights: 'Legendary mega-scale architectural marvels (such as Ram Mandir replica and Sphere), grand lighting, and massive citywide crowds.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Santosh+Mitra+Square+Durga+Puja+Lebutala+Kolkata'
    },
    {
      id: 'badan-chand-roy-rajbari',
      name: 'Badan Chand Roy Rajbari',
      zone: 'Central',
      theme: 'Historic 1857 Bonedi Bari Thakurdalan & Ancestral Vaishnava Rituals',
      image: 'pandals/Badan Chand Roy Rajbari.jpg',
      transit: '🚇 MG Road Metro (4 min walk) • 🚌 Colootola Bus Stop',
      transitType: 'metro',
      highlights: 'Historical Bonedi Bari Durga Puja celebrated since 1857 at the ancestral Thakurdalan with traditional Ekchala Pratima and legacy Vaishnava customs.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Badan+Chand+Roy+Rajbari+Durga+Puja+Colootola+Kolkata'
    },


    // --- EAST & SALT LAKE ZONE ---
    {
      id: 'sreebhumi-sporting',
      name: 'Sreebhumi Sporting Club',
      zone: 'East',
      theme: 'Monumental World Wonder Architecture & Pure Gold Ornaments',
      image: 'pandals/Sreebhumi Sporting Club.jpg',
      transit: '🚌 VIP Road Lake Town Bus • 🚇 Ultadanga / Dum Dum Metro',
      transitType: 'bus',
      highlights: 'Diamond and pure gold ornamented Goddess idol, breathtaking architectural replica with dynamic laser light show.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Sreebhumi+Sporting+Club+VIP+Road+Kolkata'
    },

    {
      id: 'dum-dum-park-yubak-brinda',
      name: 'Dum Dum Park Yubak Brinda',
      zone: 'East',
      theme: 'Bold Modern Conceptual Installation & Eco-Friendly Design',
      image: 'pandals/Dum Dum Park Yubak Brinda.webp',
      transit: '🚌 VIP Road Dum Dum Park Bus • 🚆 Bidhan Nagar Road Train',
      transitType: 'bus',
      highlights: 'Striking artistic experiments with innovative materials, modern aesthetics, and ambient lights.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Dum+Dum+Park+Yubak+Brinda+Durga+Puja+Kolkata'
    },
    {
      id: 'dum-dum-park-sarbojanin',
      name: 'Dum Dum Park Sarbojanin',
      zone: 'East',
      theme: 'Time-Honored Cultural Heritage & Architectural Grandeur',
      image: 'pandals/Dum Dum Park Sarbojanin.avif',
      transit: '🚌 VIP Road Dum Dum Park Bus • 🚇 Dum Dum Metro (Auto)',
      transitType: 'bus',
      highlights: 'Pioneer of the famous Dum Dum Park puja hub, delivering timeless thematic beauty year after year.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Dum+Dum+Park+Sarbojanin+Durga+Puja+Kolkata'
    },
    {
      id: 'dum-dum-park-bharat-chakra',
      name: 'Dum Dum Park Bharat Chakra',
      zone: 'East',
      theme: 'Social Empathy & Exquisite Textured Sculpture',
      image: 'pandals/Dum Dum Park Bharat Chakra.jpg',
      transit: '🚌 VIP Road Footbridge Bus • 🚇 Dum Dum Metro (Auto)',
      transitType: 'bus',
      highlights: 'Profound societal messages translated through master clay and wood sculptures with moving soundtracks.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Dum+Dum+Park+Bharat+Chakra+Kolkata'
    },
    {
      id: 'dum-dum-park-tarun-dal',
      name: 'Dum Dum Park Tarun Dal',
      zone: 'East',
      theme: 'Surrealistic Spatial Architecture & Dynamic Kinetic Art',
      image: 'pandals/dum dum park tarun dal.png',
      transit: '🚌 VIP Road Dum Dum Park Bus • 🚆 Dum Dum Cantt Train',
      transitType: 'bus',
      highlights: 'Mind-bending geometric forms, kinetic wind sculptures, and immersive illuminated pathways.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Dum+Dum+Park+Tarun+Dal+Durga+Puja+Kolkata'
    },
    {
      id: 'dum-dum-park-tarun-sangha',
      name: 'Dum Dum Park Tarun Sangha',
      zone: 'East',
      theme: 'Nationally Acclaimed Thematic Installation & Master Clay Idol',
      image: 'pandals/Dum Dum Park Tarun Sangha.jpg',
      transit: '🚌 VIP Road Crossing Bus • 🚇 Dum Dum Metro (Auto)',
      transitType: 'bus',
      highlights: 'Multiple Asian Paints Sharod Samman winner celebrating intricate craft, poignant themes, and divine artistry.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Dum+Dum+Park+Tarun+Sangha+Kolkata'
    },
    {
      id: 'dakshindari-youth',
      name: 'Dakshindari Youth Club',
      zone: 'East',
      theme: 'Monumental Heritage Temple Replica & Chandannagar Lights',
      image: 'pandals/Dakshindari Youth Club.png',
      transit: '🚌 VIP Road Ultadanga Bus • 🚆 Bidhan Nagar Road Train',
      transitType: 'bus',
      highlights: 'Giant temple architectural setups along the VIP Road corridor with spectacular night illuminations.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Dakshindari+Youth+Club+Durga+Puja+Kolkata'
    },
    {
      id: 'arjunpur-amra-sabai',
      name: 'Arjunpur Amra Sabai Club',
      zone: 'East',
      theme: 'Avant-Garde Installation Art & Thought-Provoking Themes',
      image: 'pandals/arjunpur amra sabai club.jpg',
      transit: '🚌 Baguiati VIP Road Bus • 🚇 Dum Dum Metro (Auto)',
      transitType: 'bus',
      highlights: 'Renowned for courageous modern concepts, environmental messages, and masterly artistic idols.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Arjunpur+Amra+Sabai+Club+Durga+Puja+Kolkata'
    },
    {
      id: 'salt-lake-bj-block',
      name: 'Salt Lake BJ Block',
      zone: 'East',
      theme: 'Regal Palace Architecture & Massive Cultural Fairground',
      image: 'pandals/BJ Block Durga Puja.jpg',
      transit: '🚇 Karunamoyee Metro (6 min walk) • 🚌 Salt Lake Tank 9 Bus',
      transitType: 'metro',
      highlights: 'Extensive fairground with festive food stalls, royal palace replicas, and traditional community adda.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Salt+Lake+BJ+Block+Durga+Puja+Kolkata'
    },

    {
      id: 'salt-lake-fd-block',
      name: 'Salt Lake FD Block',
      zone: 'East',
      theme: 'Monumental Conceptual Architecture & Festive Mega Fairground',
      image: 'pandals/fd clock.png',
      transit: '🚇 Karunamoyee Metro (6 min walk) • 🚌 Salt Lake FD Block Bus',
      transitType: 'metro',
      highlights: 'Salt Lakes largest crowd-puller featuring colossal architectural replicas and bustling festive melas.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Salt+Lake+FD+Block+Durga+Puja+Kolkata'
    },
    {
      id: 'salt-lake-ib-block',
      name: 'Salt Lake IB Block',
      zone: 'East',
      theme: 'Grand Thematic Architecture & Vibrant Salt Lake Community Fair',
      image: 'pandals/ib block.png',
      transit: '🚇 Salt Lake Stadium Metro (5 min walk) • 🚌 EM Bypass Bus',
      transitType: 'metro',
      highlights: 'Prominent Salt Lake township celebration known for beautiful conceptual pandals, grand community gatherings, and festive cultural functions.',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Salt+Lake+IB+Block+Durga+Puja+Kolkata'
    }
  ];

  // Iconic Kolkata Puja Food Destinations
  const FOOD_DATA = [
    {
      id: 'food-1',
      name: 'Arsalan Restaurant',
      category: 'biryani',
      categoryLabel: 'Kolkata Biryani & Mughlai',
      location: 'Park Circus 7-Point / Ruby / Ultadanga',
      metro: 'Park Circus / Hemanta Mukherjee (Ruby) Metro',
      desc: 'Legendary fragrant long-grain basmati biryani with melt-in-mouth mutton, giant spiced golden potato, and rich Chicken Chaap.',
      mustTry: 'Mutton Special Biryani, Chicken Chaap & Shahi Firni',
      timings: 'All-Night Puja Service',
      image: 'food/arsalan.avif',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Arsalan+Restaurant+Park+Circus+Kolkata',
      nearbyPandals: [
        { name: 'Tridhara Sammilani', url: 'https://www.google.com/maps/search/?api=1&query=Tridhara+Sammilani+Durga+Puja+Kolkata' },
        { name: 'Ekdalia Evergreen Club', url: 'https://www.google.com/maps/search/?api=1&query=Ekdalia+Evergreen+Club+Durga+Puja+Kolkata' },
        { name: 'Ballygunge Cultural Association', url: 'https://www.google.com/maps/search/?api=1&query=Ballygunge+Cultural+Association+Durga+Puja+Kolkata' }
      ]
    },
    {
      id: 'food-2',
      name: 'Golbari',
      category: 'bengali',
      categoryLabel: 'Heritage Bengali Non-Veg',
      location: 'Shyambazar 5-Point Crossing',
      metro: 'Shyambazar Metro (1 min walk)',
      desc: 'Historic 100-year-old culinary institution famous for pitch-black, deeply spiced, slow-braised Kosha Mangsho served with fluffy hot Luchis.',
      mustTry: 'Kosha Mangsho with Layered Luchi & Tamarind Chutney',
      timings: 'All-Day & Late Evening',
      image: 'food/golbari.jpg',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Golbari+Shyambazar+Kolkata',
      nearbyPandals: [
        { name: 'Bagbazar Sarbojanin', url: 'https://www.google.com/maps/search/?api=1&query=Bagbazar+Sarbojanin+Durga+Puja+Kolkata' },
        { name: 'Hatibagan Sarbojanin', url: 'https://www.google.com/maps/search/?api=1&query=Hatibagan+Sarbojanin+Durga+Puja+Kolkata' },
        { name: 'Hatibagan Nabin Pally', url: 'https://www.google.com/maps/search/?api=1&query=Hatibagan+Nabin+Pally+Durga+Puja+Kolkata' }
      ]
    },
    {
      id: 'food-3',
      name: 'Mitra Cafe',
      category: 'bengali',
      categoryLabel: 'Heritage Fry & Cutlet Landmark',
      location: 'Shyambazar / Sovabazar',
      metro: 'Sovabazar Sutanuti Metro (2 min walk)',
      desc: 'Since 1920, the gold standard for traditional Kolkata snack cutlets with lacy egg webs and pungent Kasundi mustard.',
      mustTry: 'Diamond Fish Fry, Fish Kabiraji & Mutton Brain Cutlet',
      timings: 'Afternoon & Evening',
      image: 'food/Mitra Cafe.jpg',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Mitra+Cafe+Shyambazar+Kolkata',
      nearbyPandals: [
        { name: 'Ahiritola Jubak Brinda', url: 'https://www.google.com/maps/search/?api=1&query=Ahiritola+Jubak+Brinda+Durga+Puja+Kolkata' },
        { name: 'Sovabazar Rajbari', url: 'https://www.google.com/maps/search/?api=1&query=Sovabazar+Rajbari+Kolkata' },
        { name: 'Kumartuli Park', url: 'https://www.google.com/maps/search/?api=1&query=Kumartuli+Park+Durga+Puja+Kolkata' }
      ]
    },
    {
      id: 'food-kasturi',
      name: 'Kasturi Restaurant',
      category: 'bengali',
      categoryLabel: 'Authentic Dhakai Bengali Cuisine',
      location: 'Free School St / Ballygunge / Gariahat',
      metro: 'Park Street Metro (4 min walk) / Kalighat Metro',
      desc: 'Famed pioneers of traditional Dhakai Bengali recipes cooked with heritage mustard oil and aromatic spices, serving devotees unforgettable festive feasts.',
      mustTry: 'Kochu Pata Diye Chingri Bhapa, Bhetki Paturi & Dhakai Morog Polao',
      timings: 'Lunch & Dinner (Puja Special Hours)',
      image: 'food/Kasturi Restaurant.jpg',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Kasturi+Restaurant+Free+School+Street+Kolkata',
      nearbyPandals: [
        { name: 'Maddox Square', url: 'https://www.google.com/maps/search/?api=1&query=Maddox+Square+Durga+Puja+Kolkata' },
        { name: 'Tridhara Sammilani', url: 'https://www.google.com/maps/search/?api=1&query=Tridhara+Sammilani+Durga+Puja+Kolkata' },
        { name: 'Mohammad Ali Park', url: 'https://www.google.com/maps/search/?api=1&query=Mohammad+Ali+Park+Durga+Puja+Kolkata' }
      ]
    },
    {
      id: 'food-oudh',
      name: 'Oudh 1590',
      category: 'biryani',
      categoryLabel: 'Period Dining Awadhi Cuisine',
      location: 'Deshapriya Park / Salt Lake / Naktala',
      metro: 'Kalighat Metro (3 min walk) / City Centre Metro',
      desc: 'Kolkata\'s first period dining restaurant recreating the regal dastarkhwan of Lucknow with slow-cooked handi biryanis and melt-in-mouth kebabs.',
      mustTry: 'Awadhi Handi Biryani, Galawati Kebab with Ulta Tawa Paratha & Murgh Pardah Biryani',
      timings: 'Lunch to Midnight',
      image: 'food/Oudh 1590.jpg',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Oudh+1590+Deshapriya+Park+Kolkata',
      nearbyPandals: [
        { name: 'Deshapriya Park', url: 'https://www.google.com/maps/search/?api=1&query=Deshapriya+Park+Durga+Puja+Kolkata' },
        { name: 'Tridhara Sammilani', url: 'https://www.google.com/maps/search/?api=1&query=Tridhara+Sammilani+Durga+Puja+Kolkata' },
        { name: 'Ballygunge Cultural Association', url: 'https://www.google.com/maps/search/?api=1&query=Ballygunge+Cultural+Association+Durga+Puja+Kolkata' }
      ]
    },
    {
      id: 'food-royal',
      name: 'Royal Indian Hotel',
      category: 'biryani',
      categoryLabel: 'Heritage Mughlai Institution (Estd. 1905)',
      location: 'Chitpur (Near Nakhoda Masjid) / Park Circus',
      metro: 'Mahatma Gandhi Road Metro / Girish Park Metro',
      desc: 'Over a century of Mughlai mastery, celebrated across India for its potato-free Lucknowi-style mutton biryani, succulent mutton chaap, and shahi pasinda.',
      mustTry: 'Royal Mutton Chaap, Shahi Mutton Biryani & Mutton Pasinda',
      timings: 'Lunch to Late Night',
      image: 'food/Royal Indian Hotel.jpg',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Royal+Indian+Hotel+Chitpur+Kolkata',
      nearbyPandals: [
        { name: 'Mohammad Ali Park', url: 'https://www.google.com/maps/search/?api=1&query=Mohammad+Ali+Park+Durga+Puja+Kolkata' },
        { name: 'College Square', url: 'https://www.google.com/maps/search/?api=1&query=College+Square+Durga+Puja+Kolkata' },
        { name: 'Santosh Mitra Square', url: 'https://www.google.com/maps/search/?api=1&query=Santosh+Mitra+Square+Durga+Puja+Kolkata' }
      ]
    },
    {
      id: 'food-6',
      name: '6 Ballygunge Place',
      category: 'bengali',
      categoryLabel: 'Aristocratic Bengali Fine Dining',
      location: 'Ballygunge / Salt Lake Sector 1',
      metro: 'Ballygunge Station / City Centre Metro',
      desc: 'Centuries-old recipes recreated in a restored colonial mansion with banana-leaf service and antique portraits.',
      mustTry: 'Daab Chingri, Kacha Lonka Mangsho & Chhanar Paturi',
      timings: 'Lunch & Dinner',
      image: 'food/6 Ballygunge Place.avif',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=6+Ballygunge+Place+Kolkata',
      nearbyPandals: [
        { name: 'Tridhara Sammilani', url: 'https://www.google.com/maps/search/?api=1&query=Tridhara+Sammilani+Durga+Puja+Kolkata' },
        { name: 'Ballygunge Cultural Association', url: 'https://www.google.com/maps/search/?api=1&query=Ballygunge+Cultural+Association+Durga+Puja+Kolkata' },
        { name: 'Deshapriya Park', url: 'https://www.google.com/maps/search/?api=1&query=Deshapriya+Park+Durga+Puja+Kolkata' }
      ]
    },
    {
      id: 'food-7',
      name: 'Bhojohori Manna',
      category: 'bengali',
      categoryLabel: 'Homestyle Bengali Cuisine',
      location: 'Hindustan Road (Gariahat) / Salt Lake',
      metro: 'Kalighat Metro / Karunamoyee Metro',
      desc: 'Named after the famous Manna Dey song, celebrated for authentic home-cooked delicacies and river fish specials.',
      mustTry: 'Ilish Barishali, Bhetki Paturi & Nolen Gurer Ice Cream',
      timings: 'All-Day Dining',
      image: 'food/Bhojohori Manna.avif',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Bhojohori+Manna+Gariahat+Kolkata',
      nearbyPandals: [
        { name: 'Tridhara Sammilani', url: 'https://www.google.com/maps/search/?api=1&query=Tridhara+Sammilani+Durga+Puja+Kolkata' },
        { name: 'Chetla Agrani', url: 'https://www.google.com/maps/search/?api=1&query=Chetla+Agrani+Durga+Puja+Kolkata' },
        { name: 'Mudiali Club', url: 'https://www.google.com/maps/search/?api=1&query=Mudiali+Club+Durga+Puja+Kolkata' }
      ]
    },
    {
      id: 'food-10',
      name: 'Kusum Rolls',
      category: 'food',
      categoryLabel: 'Kolkata Street Kati Roll Pioneer',
      location: 'Park Street (Near Stephen Court / Karnani Mansion)',
      metro: 'Park Street Metro (3 min walk)',
      desc: 'The iconic midnight snacking joint famed for flaky parathas wrapped around succulent chicken and mutton kebabs with lime and green chillies.',
      mustTry: 'Double Egg Double Chicken Roll, Cheese Mutton Roll',
      timings: 'Open Late Night during Puja',
      image: 'food/kusum rolls.jpg',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Kusum+Rolls+Park+Street+Kolkata',
      nearbyPandals: [
        { name: 'Maddox Square', url: 'https://www.google.com/maps/search/?api=1&query=Maddox+Square+Durga+Puja+Kolkata' },
        { name: 'Deshapriya Park', url: 'https://www.google.com/maps/search/?api=1&query=Deshapriya+Park+Durga+Puja+Kolkata' },
        { name: 'Mohammad Ali Park', url: 'https://www.google.com/maps/search/?api=1&query=Mohammad+Ali+Park+Durga+Puja+Kolkata' }
      ]
    }
  ];

  // Famous Kolkata Shopping Districts
  const SHOPPING_DATA = [
    {
      id: 'shop-1',
      name: 'Gariahat Market & Triangular Park',
      type: 'sarees',
      typeLabel: 'Sarees, Jewelry & Street Fashion',
      location: 'Rashbehari Avenue & Gariahat Crossing',
      metro: 'Kalighat Metro / Ballygunge Station (Auto link)',
      desc: 'Kolkata\'s undisputed festive fashion hub: bustling street stalls packed with dokra jewelry, and flagship heritage saree showrooms.',
      bestTime: 'Post-afternoon (3:00 PM IST - 9:30 PM IST)',
      highlight: 'Dhakai Jamdani, Baluchari, Tussar Silks & terracotta necklaces.',
      image: 'food/Gariahat Market & Triangular Park.avif',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Gariahat+Market+Kolkata'
    },
    {
      id: 'shop-2',
      name: 'Hatibagan Market & Shyambazar',
      type: 'sarees',
      typeLabel: 'Traditional Bengali Silk & Cotton Hub',
      location: 'Bidhan Sarani / Shyambazar',
      metro: 'Shyambazar Metro (2 min walk)',
      desc: 'Historic North Kolkata shopping paradise known for authentic Shantipur & Phulia Taant sarees, festive kurtas, dhotis, and vintage charm.',
      bestTime: 'Morning or late evening (11:00 AM IST - 9:00 PM IST)',
      highlight: 'Unbeatable festive deals on Taant cotton sarees and kids\' festive wear.',
      image: 'food/Hatibagan Market & Shyambazar.webp',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Hatibagan+Market+Kolkata'
    },
    {
      id: 'shop-3',
      name: 'New Market (Sir Stuart Hogg Market)',
      type: 'shopping',
      typeLabel: 'Victorian Arcade & All-in-One Bazaar',
      location: 'Lindsay Street / Esplanade',
      metro: 'Esplanade Metro (3 min walk)',
      desc: 'Built in 1874 with red brick Gothic architecture, housing over 2,000 stalls offering shoes, jewelry, brassware, and festive gifts.',
      bestTime: '11:00 AM IST - 8:30 PM IST (Closed Sundays normally, Open during Puja)',
      highlight: 'Nahoum & Sons plum cakes, Kashmiri shawls, silver jewelry & brassware.',
      image: 'food/New Market (Sir Stuart Hogg Market).jpg',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=New+Market+Kolkata'
    },
    {
      id: 'shop-6',
      name: 'Kumartuli Artisan Colony',
      type: 'shopping',
      typeLabel: 'Sacred Clay Sculpture & Idol Alleyways',
      location: 'Kumartuli (North Kolkata Riverbank)',
      metro: 'Sovabazar Sutanuti Metro (5 min walk)',
      desc: 'The 300-year-old potter\'s quarter where world-famous master idol makers mold raw clay into divine Goddess Durga pratimas.',
      bestTime: 'Early morning or late dusk (Golden hour photography)',
      highlight: 'Miniature terracotta clay idols, painted decorative masks, raw fiber straw crafts.',
      image: 'food/Kumartuli Artisan Colony.jpg',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Kumartuli+Kolkata'
    },
    {
      id: 'shop-8',
      name: 'Burrabazar Traditional Wholesale Market',
      type: 'sarees',
      typeLabel: 'Historic Wholesale Textile & Gold Bourse',
      location: 'MG Road / Barabazar',
      metro: 'Mahatma Gandhi Road Metro (3 min walk)',
      desc: 'One of India\'s oldest and largest commercial markets: direct-from-weaver wholesale prices for Banarasi silk, dhotis, and Puja puja-samagri.',
      bestTime: '11:00 AM IST - 7:00 PM IST',
      highlight: 'Pure Banarasi silk sarees, puja brassware lamps, incense & festive gift hampers.',
      image: 'food/Burrabazar Traditional Wholesale Market.jpg',
      locationUrl: 'https://www.google.com/maps/search/?api=1&query=Burrabazar+Kolkata'
    }
  ];

  // --- PRE-BUILT O(1) LOOKUP SETS for food/shop classification ---
  // Used instead of FOOD_DATA.some() / SHOPPING_DATA.some() in filter hot-paths.
  const FOOD_ID_SET = new Set(FOOD_DATA.map(f => f.id));
  const FOOD_NAME_SET = new Set(FOOD_DATA.map(f => (f.name || '').toLowerCase()));
  const SHOP_ID_SET = new Set(SHOPPING_DATA.map(s => s.id));
  const SHOP_NAME_SET = new Set(SHOPPING_DATA.map(s => (s.name || '').toLowerCase()));

  /** Returns true if bookmark b belongs to the food/shopping category */
  function isFoodOrShopBookmark(b) {
    if (b.type === 'food' || b.type === 'shop') return true;
    const cat = b.category || '';
    if (
      cat === 'Food & Shopping' || cat === 'Food' || cat === 'Shop' ||
      cat === 'Famous Food Joints' || cat === 'Food Destination' || cat === 'Shopping Bazaar'
    ) return true;
    const bId = b.id || '';
    const bName = (b.name || '').toLowerCase();
    return FOOD_ID_SET.has(bId) || FOOD_NAME_SET.has(bName) ||
           SHOP_ID_SET.has(bId) || SHOP_NAME_SET.has(bName);
  }

  const TRAILS_DATA = [
    {
      id: 'north-heritage',
      title: 'North Kolkata Heritage Walk',
      tag: 'Sabeki & Aristocratic',
      description: 'Journey through centuries of history visiting Bagbazar, Sovabazar Rajbari, Kumartuli, Ahiritola, and Tala Prattoy.',
      distance: '4.2 km',
      time: '3.5 hours',
      stops: ['Bagbazar Sarbojonin', 'Sovabazar Rajbari', 'Kumartuli Park', 'Ahiritola Sarbojonin', 'Tala Prattoy'],
      foodTip: 'Pair with Golbari Kosha Mangsho & Mitra Cafe Kabiraji.'
    },
    {
      id: 'south-grandeur',
      title: 'South Kolkata Grandeur Circuit',
      tag: 'Theme & Adda Express',
      description: 'The epicenter of modern theme installations and vibrant youth adda around South Kolkata parks.',
      distance: '5.0 km',
      time: '4.5 hours',
      stops: ['Maddox Square', 'Ekdalia Evergreen', 'Tridhara Sammilani', 'Singhi Park', 'Mudiali Club'],
      foodTip: 'Relish Gariahat Rolls & 6 Ballygunge Place Paturi on the way.'
    },
    {
      id: 'east-spectacle',
      title: 'VIP Road & Salt Lake Spectacle',
      tag: 'Mega Palaces & Lighting',
      description: 'Experience the monumental architectural replicas and sprawling fairgrounds of East Kolkata.',
      distance: '6.2 km',
      time: '5 hours',
      stops: ['Sreebhumi Sporting', 'Dum Dum Park Bharat Chakra', 'FD Block Salt Lake'],
      foodTip: 'Enjoy Arsalan Biryani at Ultadanga or Park Circus.'
    }
  ];

  const RITUALS_DATA = [
    {
      day: 'Mahalaya',
      tithi: 'Amavasya Dawn',
      date: '10 October 2026 (Saturday)',
      ceremonies: [
        {
          name: 'Birendra Krishna Bhadra Chandi Path',
          desc: 'The historic 4:00 AM IST All India Radio broadcast of Mahishasuramardini, chanting the sacred verses of Sri Sri Chandi depicting Devi Durga\'s invocation to defeat the demon king Mahishasura.'
        },
        {
          name: 'Ganga Tarpan for Ancestors',
          desc: 'Devotees gather at holy river ghats across Bengal at dawn to offer sacred water and sesame seeds (Tarpan) in loving reverence to departed ancestors.'
        },
        {
          name: 'Chokkhu Daan (Painting Deity Eyes)',
          desc: 'Kumartuli master clay sculptors apply the final sacred brushstrokes, painting the benevolent third eye of Devi Durga to symbolize the awakening of divine consciousness.'
        }
      ],
      significance: 'Marks the divine descent of Mother Durga onto earth and heralds the sacred beginning of Devi Paksha.'
    },
    {
      day: 'Maha Shasthi',
      tithi: 'Shasthi Tithi',
      date: '17 October 2026 (Saturday)',
      ceremonies: [
        {
          name: 'Devi Bodhon under Bilva Tree',
          desc: 'The untimely invocation of Goddess Durga under a sacred wood-apple (Bel) tree, re-enacting Lord Rama\'s autumn awakening of Shakti before his war with Ravana.'
        },
        {
          name: 'Amontron and Adhivas Rituals',
          desc: 'Formal welcoming and Vedic consecration inviting the Mother Goddess and Her four divine children (Lakshmi, Saraswati, Ganesha, and Kartikeya) into the sanctum.'
        },
        {
          name: 'Unveiling of the Divine Idols',
          desc: 'The sacred drape is removed to reveal the resplendent face of Ma Durga amidst resonant Dhak beats, blowing of Shankha (conch), and ringing of bells.'
        }
      ],
      significance: 'Formal awakening and celebratory welcome of Goddess Durga and Her divine family into pandals.'
    },
    {
      day: 'Maha Saptami',
      tithi: 'Saptami Tithi',
      date: '18 October 2026 (Sunday)',
      ceremonies: [
        {
          name: 'Nabapatrika (Kola Bou) River Bathing',
          desc: 'Nine sacred leaves and plants bundled together with a yellow-bordered red-fringed white sari are ritually bathed in the holy Ganges at dawn to venerate nature\'s divine bounty.'
        },
        {
          name: 'Prana Pratishtha Consecration',
          desc: 'Priests infuse the life breath (Prana) into the clay idols with Vedic mantras, sanctifying the deities as living vessels of divine energy.'
        },
        {
          name: 'Saptami Pushpanjali',
          desc: 'Devotees gather in fresh traditional festive clothing to chant Sanskrit hymns and offer fresh flowers and Bel leaves to the Mother.'
        }
      ],
      significance: 'Infusion of vital divine breath into the idols and worship of the nine sacred botanicals of Shakti.'
    },
    {
      day: 'Maha Ashtami',
      tithi: 'Ashtami & Sandhi Tithi',
      date: '19 October 2026 (Monday)',
      ceremonies: [
        {
          name: 'Grand Ashtami Pushpanjali',
          desc: 'The most revered morning prayer of Durga Puja, where millions chant "Sarva Mangala Mangalye Shive Sarvartha Sadhike" with folded hands.'
        },
        {
          name: 'Kumari Puja (Worship of Devi in Young Girl)',
          desc: 'A young girl dressed in vibrant red silk and golden ornaments is worshiped as the living embodiment of pure cosmic Shakti, popularized by Swami Vivekananda.'
        },
        {
          name: 'Sandhi Puja (Peak 48-Minute Conjunction)',
          desc: 'The supreme sacred climax of Durga Puja at the transition of Ashtami to Navami, offering 108 blue lotuses and lighting 108 clay lamps when Devi Chamunda slew Chanda and Munda.'
        }
      ],
      significance: 'The supreme sacred junction of Durga Puja when Devi Chamunda revealed Her cosmic triumph over demonic forces.'
    },
    {
      day: 'Maha Navami',
      tithi: 'Navami Tithi',
      date: '20 October 2026 (Tuesday)',
      ceremonies: [
        {
          name: 'Navami Maha Yajna / Homa',
          desc: 'The grand sacred fire sacrifice where priests offer clarified butter (ghee) and wood-apple leaves into Vedic flames to culminate the sacred rites.'
        },
        {
          name: 'High-Energy Dhunuchi Naach',
          desc: 'Devotees balance smoking clay censers glowing with coconut husk and burning frankincense, dancing energetically to the thunderous syncopation of the Dhak.'
        },
        {
          name: 'Universal Bhog Distribution',
          desc: 'Sacred Khichuri Bhog, Labra (mixed vegetable curry), and sweet tomato chutney are offered to the Goddess and distributed freely to all pilgrims.'
        }
      ],
      significance: 'Celebration of the victorious culmination of the battle against Mahishasura and universal spiritual grace.'
    },
    {
      day: 'Vijaya Dashami',
      tithi: 'Dashami Tithi',
      date: '21 October 2026 (Wednesday)',
      ceremonies: [
        {
          name: 'Devi Baran & Sindoor Khela',
          desc: 'Married women bid an emotional farewell to Ma Durga with sweets and betel leaves, followed by joyous smearing of vermilion (Sindoor) on one another wishing prosperity.'
        },
        {
          name: 'Kola Koli & Universal Brotherhood',
          desc: 'Traditional warm embraces across generations, touching elders\' feet for blessings and sharing traditional Bengali sweets (Rosogolla, Sandesh, Nimki).'
        },
        {
          name: 'Ganga Immersion (Bishorjon)',
          desc: 'The sacred clay idols are carried in grand processions to the river ghats and gently immersed into the holy Ganges with cries of "Asche Bochor Abar Hobe!"'
        }
      ],
      significance: 'Devi Durga returns to Mount Kailash, leaving behind eternal blessings of courage, peace, and spiritual rebirth.'
    }
  ];

  // --- 2. WEB AUDIO SYNTHESIZER ENGINE ---
  class SacredSoundEngine {
    constructor() {
      this.ctx = null;
      this.isDhakLooping = false;
      this.dhakTimer = null;
    }

    init() {
      try {
        if (!this.ctx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            this.ctx = new AudioContext();
          }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
      } catch (e) {
        console.warn('SacredSoundEngine init error:', e);
      }
    }

    playDhakBeat(type = 'dha') {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const bufferSize = this.ctx.sampleRate * 0.15;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(type === 'dha' ? 1200 : 2400, now);
      noiseFilter.Q.setValueAtTime(3.0, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);

      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      const baseFreq = type === 'dha' ? 140 : 210;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * 1.8, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.06);

      oscGain.gain.setValueAtTime(0.7, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + (type === 'dha' ? 0.28 : 0.16));

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    }

    playShankha() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(430, now);
      osc1.frequency.linearRampToValueAtTime(460, now + 0.5);
      osc1.frequency.linearRampToValueAtTime(445, now + 2.0);

      osc2.frequency.setValueAtTime(860, now);
      osc2.frequency.linearRampToValueAtTime(920, now + 0.5);
      osc2.frequency.linearRampToValueAtTime(890, now + 2.0);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(4.0, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.5, now + 0.4);
      gain.gain.setValueAtTime(0.5, now + 1.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 2.8);
      osc2.stop(now + 2.8);
    }

    playBell() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [1046.5, 2093, 3135, 4186];
      const gains = [0.4, 0.25, 0.15, 0.08];

      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        g.gain.setValueAtTime(gains[idx], now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 2.2 - idx * 0.3);

        osc.connect(g);
        g.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 2.5);
      });
    }

    playKanshi() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1760, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(800, now);

      gain.gain.setValueAtTime(0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.95);
    }

    startDhakLoop(onBeatCallback) {
      if (this.isDhakLooping) return;
      this.isDhakLooping = true;
      this.init();
      if (!this.ctx) return;

      const pattern = [
        { type: 'dha', delay: 0 },
        { type: 'kuti', delay: 240 },
        { type: 'dha', delay: 480 },
        { type: 'kuti', delay: 720 },
        { type: 'dha', delay: 960 },
        { type: 'dha', delay: 1140 },
        { type: 'kuti', delay: 1320 },
        { type: 'kuti', delay: 1500 }
      ];

      let step = 0;
      const playStep = () => {
        if (!this.isDhakLooping) return;
        const current = pattern[step];
        this.playDhakBeat(current.type);
        if (onBeatCallback) onBeatCallback(current.type);

        step = (step + 1) % pattern.length;
        const nextTime = step === 0 ? 320 : (pattern[step].delay - pattern[step - 1].delay);
        this.dhakTimer = setTimeout(playStep, Math.max(140, nextTime));
      };

      playStep();
    }

    stopDhakLoop() {
      this.isDhakLooping = false;
      if (this.dhakTimer) {
        clearTimeout(this.dhakTimer);
        this.dhakTimer = null;
      }
    }

    // --- DHAAK TAL RHYTHMIC ENGINE FOR SPECIFIC PUJA DAYS ---
    playRitualTal(day, onBeatCallback) {
      this.init();
      if (this.activeTalDay === day && this.isTalLooping) {
        this.stopRitualTal();
        return false;
      }
      this.stopRitualTal();
      this.stopDhakLoop();

      const TAL_CONFIGS = {
        'Mahalaya': {
          name: 'Agomoni Tal',
          pattern: [
            { type: 'kanshi', delay: 0 },
            { type: 'dha', delay: 0 },
            { type: 'kuti', delay: 220 },
            { type: 'kuti', delay: 380 },
            { type: 'dha', delay: 560 },
            { type: 'kanshi', delay: 780 },
            { type: 'dha', delay: 780 },
            { type: 'kuti', delay: 1000 },
            { type: 'dha', delay: 1200 }
          ]
        },
        'Maha Shasthi': {
          name: 'Bodhon Tal',
          pattern: [
            { type: 'kanshi', delay: 0 },
            { type: 'dha', delay: 0 },
            { type: 'kuti', delay: 190 },
            { type: 'kuti', delay: 350 },
            { type: 'dha', delay: 520 },
            { type: 'dha', delay: 700 },
            { type: 'kuti', delay: 880 },
            { type: 'kanshi', delay: 1060 },
            { type: 'dha', delay: 1060 }
          ]
        },
        'Maha Saptami': {
          name: 'Nabapatrika Triplet Tal',
          pattern: [
            { type: 'kanshi', delay: 0 },
            { type: 'dha', delay: 0 },
            { type: 'kuti', delay: 160 },
            { type: 'kuti', delay: 300 },
            { type: 'dha', delay: 450 },
            { type: 'kuti', delay: 600 },
            { type: 'dha', delay: 750 },
            { type: 'kanshi', delay: 900 },
            { type: 'dha', delay: 900 }
          ]
        },
        'Maha Ashtami': {
          name: 'Sandhi Puja Grand Tal',
          pattern: [
            { type: 'kanshi', delay: 0 },
            { type: 'dha', delay: 0 },
            { type: 'kuti', delay: 140 },
            { type: 'dha', delay: 280 },
            { type: 'kuti', delay: 420 },
            { type: 'kanshi', delay: 560 },
            { type: 'dha', delay: 560 },
            { type: 'dha', delay: 700 },
            { type: 'kuti', delay: 840 },
            { type: 'kuti', delay: 980 }
          ]
        },
        'Maha Navami': {
          name: 'Dhunuchi Naach Fast Tal',
          pattern: [
            { type: 'kanshi', delay: 0 },
            { type: 'dha', delay: 0 },
            { type: 'kuti', delay: 120 },
            { type: 'kuti', delay: 220 },
            { type: 'dha', delay: 320 },
            { type: 'kuti', delay: 420 },
            { type: 'kanshi', delay: 520 },
            { type: 'dha', delay: 520 },
            { type: 'dha', delay: 620 },
            { type: 'kuti', delay: 720 },
            { type: 'kuti', delay: 820 }
          ]
        },
        'Vijaya Dashami': {
          name: 'Bisarjan / Bhasan Tal',
          pattern: [
            { type: 'kanshi', delay: 0 },
            { type: 'dha', delay: 0 },
            { type: 'kuti', delay: 180 },
            { type: 'dha', delay: 340 },
            { type: 'kuti', delay: 500 },
            { type: 'kanshi', delay: 680 },
            { type: 'dha', delay: 680 },
            { type: 'kuti', delay: 860 },
            { type: 'dha', delay: 1040 }
          ]
        }
      };

      const config = TAL_CONFIGS[day] || TAL_CONFIGS['Mahalaya'];
      this.activeTalDay = day;
      this.isTalLooping = true;
      const pattern = config.pattern;

      let step = 0;
      const playStep = () => {
        if (!this.isTalLooping || this.activeTalDay !== day) return;
        const current = pattern[step];
        if (current.type === 'kanshi') {
          this.playKanshi();
        } else {
          this.playDhakBeat(current.type);
        }
        if (onBeatCallback) onBeatCallback(current.type, step);

        step = (step + 1) % pattern.length;
        const nextDelay = step === 0 ? 300 : (pattern[step].delay - pattern[step - 1].delay);
        this.talTimer = setTimeout(playStep, Math.max(100, nextDelay));
      };

      playStep();
      return true;
    }

    stopRitualTal() {
      this.isTalLooping = false;
      this.activeTalDay = null;
      if (this.talTimer) {
        clearTimeout(this.talTimer);
        this.talTimer = null;
      }
    }
  }

  const soundEngine = new SacredSoundEngine();

  // Safe storage initialization (Never wipes existing devotee itinerary items)
  try {
    if (localStorage.getItem('akalbodhon_bookmarks') === null) {
      localStorage.setItem('akalbodhon_bookmarks', JSON.stringify([]));
    }
    if (localStorage.getItem('akalbodhon_custom_plans') === null) {
      localStorage.setItem('akalbodhon_custom_plans', JSON.stringify([]));
    }
  } catch (e) {}

  // ========================================================
  // PERSISTENT PER-IDENTIFIER ITINERARY STORE & MERGE ENGINE
  // ========================================================
  function getUserStorageIdentifier(user) {
    if (!user) return null;
    if (typeof user === 'string') {
      const clean = user.trim().toLowerCase();
      const digits = clean.replace(/[^0-9]/g, '');
      if (!clean.includes('@') && digits.length >= 7) {
        return 'phone_' + (digits.length === 10 ? '91' + digits : (digits.startsWith('0') && digits.length === 11 ? '91' + digits.slice(1) : digits));
      }
      if (clean.includes('@')) {
        return 'email_' + clean.replace(/[^a-z0-9]/g, '_');
      }
      return 'id_' + clean.replace(/[^a-z0-9]/g, '_');
    }

    const rawPhone = user.phone || (user.identifier_type === 'phone' ? user.identifier : null) || (user.provider === 'phone' ? user.identifier : null);
    if (rawPhone) {
      const digits = String(rawPhone).replace(/[^0-9]/g, '');
      if (digits.length >= 7) {
        return 'phone_' + (digits.length === 10 ? '91' + digits : (digits.startsWith('0') && digits.length === 11 ? '91' + digits.slice(1) : digits));
      }
    }

    if (user.identifier) {
      const idStr = String(user.identifier).trim().toLowerCase();
      const digits = idStr.replace(/[^0-9]/g, '');
      if (!idStr.includes('@') && digits.length >= 7) {
        return 'phone_' + (digits.length === 10 ? '91' + digits : (digits.startsWith('0') && digits.length === 11 ? '91' + digits.slice(1) : digits));
      }
      if (idStr.includes('@')) {
        return 'email_' + idStr.replace(/[^a-z0-9]/g, '_');
      }
    }

    if (user.email) {
      return 'email_' + String(user.email).trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
    }

    const uid = user.id || user.user_id || user.uid;
    if (uid) {
      const cleanUid = String(uid).trim().toLowerCase();
      const digits = cleanUid.replace(/[^0-9]/g, '');
      if (!cleanUid.includes('@') && digits.length >= 10 && !cleanUid.includes('-')) {
        return 'phone_' + digits;
      }
      return 'uid_' + cleanUid.replace(/[^a-z0-9]/g, '_');
    }

    return null;
  }
  window.getUserStorageIdentifier = getUserStorageIdentifier;

  function saveUserSpecificItinerary(user, bookmarks, plans) {
    const key = getUserStorageIdentifier(user);
    if (!key) return;
    try {
      const bm = Array.isArray(bookmarks) ? bookmarks : (Storage.getBookmarks() || []);
      const pl = Array.isArray(plans) ? plans : ((typeof customPlans !== 'undefined' && Array.isArray(customPlans)) ? customPlans : []);
      const data = {
        identifier: user.identifier || user.phone || user.email || user.id,
        user_key: key,
        updated_at: new Date().toISOString(),
        bookmarks: bm,
        custom_plans: pl
      };
      localStorage.setItem(`akalbodhon_user_data_${key}`, JSON.stringify(data));
      if (key.startsWith('phone_')) {
        const digits = key.replace('phone_', '');
        localStorage.setItem(`akalbodhon_user_data_${digits}`, JSON.stringify(data));
        if (digits.startsWith('91') && digits.length === 12) {
          localStorage.setItem(`akalbodhon_user_data_${digits.slice(2)}`, JSON.stringify(data));
        }
      }
    } catch (e) {
      console.warn('saveUserSpecificItinerary error:', e);
    }
  }
  window.saveUserSpecificItinerary = saveUserSpecificItinerary;

  function loadUserSpecificItinerary(user) {
    const key = getUserStorageIdentifier(user);
    if (!key) return null;
    try {
      const candidates = [`akalbodhon_user_data_${key}`];
      if (key.startsWith('phone_')) {
        const digits = key.replace('phone_', '');
        candidates.push(`akalbodhon_user_data_${digits}`);
        if (digits.startsWith('91') && digits.length === 12) {
          candidates.push(`akalbodhon_user_data_${digits.slice(2)}`);
        }
      }
      if (user && typeof user === 'object') {
        if (user.id) candidates.push(`akalbodhon_user_data_uid_${String(user.id).replace(/[^a-z0-9]/g, '_')}`);
        if (user.email) candidates.push(`akalbodhon_user_data_email_${String(user.email).toLowerCase().replace(/[^a-z0-9]/g, '_')}`);
      }

      for (const c of candidates) {
        const raw = localStorage.getItem(c);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && (Array.isArray(parsed.bookmarks) || Array.isArray(parsed.custom_plans))) {
            return {
              bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
              custom_plans: Array.isArray(parsed.custom_plans) ? parsed.custom_plans : []
            };
          }
        }
      }
    } catch (e) {
      console.warn('loadUserSpecificItinerary error:', e);
    }
    return null;
  }
  window.loadUserSpecificItinerary = loadUserSpecificItinerary;

  function mergeBookmarks(existingList, newList) {
    const map = new Map();
    (existingList || []).forEach(b => {
      if (b && (b.id || b.name)) map.set(b.id || b.name, b);
    });
    (newList || []).forEach(b => {
      if (b && (b.id || b.name)) map.set(b.id || b.name, b);
    });
    return Array.from(map.values());
  }
  window.mergeBookmarks = mergeBookmarks;

  function mergePlans(existingPlans, newPlans) {
    const map = new Map();
    (existingPlans || []).forEach(p => {
      if (p && p.id) map.set(p.id, p);
    });
    (newPlans || []).forEach(p => {
      if (p && p.id) map.set(p.id, p);
    });
    return Array.from(map.values());
  }
  window.mergePlans = mergePlans;

  // --- 3. LOCAL STORAGE BOOKMARK STORE ---
  const Storage = {
    KEY_BOOKMARKS: 'akalbodhon_bookmarks',
    KEY_THEME: 'akalbodhon_theme',

    getDefaultBookmarks() {
      return [];
    },

    getBookmarks() {
      try {
        if (!isUserLoggedIn() || !currentUser) {
          return [];
        }
        let list = null;
        const saved = localStorage.getItem(this.KEY_BOOKMARKS);
        if (saved !== null) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            list = parsed;
          }
        }
        if (!list) {
          list = [];
          localStorage.setItem(this.KEY_BOOKMARKS, JSON.stringify(list));
        }

        // Auto-heal and sync bookmarks with the latest authentic photos and transit details
        let modified = false;
        list = list.map(b => {
          // Auto-migrate any old direction-based Google Maps links to search-based links
          if (b.link && (b.link.includes('/maps/dir/') || b.link.includes('destination='))) {
            const migrated = toMapsSearchUrl(b.link, b.name ? b.name + ' Kolkata' : '');
            if (b.link !== migrated) {
              b.link = migrated;
              modified = true;
            }
          }
          // Check if matches PANDALS_DATA
          const pandal = PANDALS_DATA.find(p => p.id === b.id || p.name.toLowerCase() === b.name.toLowerCase());
          if (pandal) {
            if (b.image !== pandal.image || b.location !== pandal.transit || b.link !== pandal.locationUrl || b.zone !== pandal.zone) {
              modified = true;
              return {
                ...b,
                id: pandal.id,
                name: pandal.name,
                category: 'Pandal',
                location: pandal.transit,
                zone: pandal.zone,
                link: pandal.locationUrl,
                image: pandal.image
              };
            }
            return b;
          }

          // Check if matches FOOD_DATA
          const food = FOOD_DATA.find(f => f.id === b.id || f.name.toLowerCase() === b.name.toLowerCase());
          if (food) {
            if (b.image !== food.image || b.location !== food.location || b.link !== food.locationUrl) {
              modified = true;
              return {
                ...b,
                id: food.id,
                name: food.name,
                category: 'Food',
                location: food.location,
                link: food.locationUrl,
                image: food.image
              };
            }
            return b;
          }

          // Check if matches SHOPPING_DATA
          const shop = SHOPPING_DATA.find(s => s.id === b.id || s.name.toLowerCase() === b.name.toLowerCase());
          if (shop) {
            if (b.image !== shop.image || b.location !== shop.location || b.link !== shop.locationUrl) {
              modified = true;
              return {
                ...b,
                id: shop.id,
                name: shop.name,
                category: 'Shop',
                location: shop.location,
                link: shop.locationUrl,
                image: shop.image
              };
            }
            return b;
          }

          return b;
        });

        if (modified) {
          try {
            localStorage.setItem(this.KEY_BOOKMARKS, JSON.stringify(list));
          } catch (e) {}
        }

        return list;
      } catch (e) {
        return [];
      }
    },

    setBookmarks(items) {
      const list = Array.isArray(items) ? items : [];
      localStorage.setItem(this.KEY_BOOKMARKS, JSON.stringify(list));
      const user = (typeof currentUser !== 'undefined') ? currentUser : null;
      if (user) {
        user.saved_items = list;
        try {
          localStorage.setItem('akalbodhon_user_profile', JSON.stringify(user));
        } catch (_) {}
        saveUserSpecificItinerary(user, list, (typeof customPlans !== 'undefined' ? customPlans : []));
      }
      if (typeof updateBookmarkCount === 'function') updateBookmarkCount();
      if (typeof renderSavedSection === 'function') renderSavedSection();
      return list;
    },

    toggleBookmark(item) {
      const list = this.getBookmarks();
      const idx = list.findIndex(b => b.id === item.id);
      let isSaved = false;

      if (idx >= 0) {
        list.splice(idx, 1);
        isSaved = false;
      } else {
        list.push(item);
        isSaved = true;
      }

      localStorage.setItem(this.KEY_BOOKMARKS, JSON.stringify(list));

      const user = (typeof currentUser !== 'undefined') ? currentUser : null;
      if (user) {
        user.saved_items = list;
        try {
          localStorage.setItem('akalbodhon_user_profile', JSON.stringify(user));
        } catch (_) {}
        saveUserSpecificItinerary(user, list, (typeof customPlans !== 'undefined' ? customPlans : []));
      }

      // Sync with Supabase under user account
      if (typeof syncUserSavedItemsToSupabase === 'function') {
        syncUserSavedItemsToSupabase(list);
      }

      return isSaved;
    },

    isBookmarked(id) {
      const list = this.getBookmarks();
      return list.some(b => b.id === id);
    },

    clearBookmarks() {
      localStorage.removeItem(this.KEY_BOOKMARKS);
      localStorage.setItem(this.KEY_BOOKMARKS, JSON.stringify([]));
      const user = (typeof currentUser !== 'undefined') ? currentUser : null;
      if (user) {
        user.saved_items = [];
        try {
          localStorage.setItem('akalbodhon_user_profile', JSON.stringify(user));
        } catch (_) {}
        saveUserSpecificItinerary(user, [], (typeof customPlans !== 'undefined' ? customPlans : []));
      }
      if (typeof syncUserSavedItemsToSupabase === 'function') {
        syncUserSavedItemsToSupabase([]);
      }
      if (typeof updateBookmarkCount === 'function') updateBookmarkCount();
      if (typeof renderSavedSection === 'function') renderSavedSection();
    }
  };

  // --- 4. TOAST NOTIFICATIONS ---
  function showToast(message, icon = 'info') {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;

    const iconEl = toast.querySelector('.toast-icon');
    const msgEl = toast.querySelector('.toast-msg');

    if (iconEl) {
      if (!icon || icon === 'music') {
        iconEl.textContent = '';
        iconEl.style.display = 'none';
      } else {
        iconEl.style.display = '';
        iconEl.textContent = icon;
      }
    }
    if (msgEl) msgEl.textContent = message;

    toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 3200);
  }

  // --- 4b. KINETIC SACRED LOADING INTERFACE & TOP SYNC PROGRESS BAR HELPERS ---
  let _activeProgressBarCount = 0;

  function showTopProgressBar() {
    _activeProgressBarCount++;
    const bar = document.getElementById('top-sync-progress-bar');
    if (bar) bar.classList.remove('hidden-progress');
  }
  window.showTopProgressBar = showTopProgressBar;

  function hideTopProgressBar() {
    _activeProgressBarCount = Math.max(0, _activeProgressBarCount - 1);
    if (_activeProgressBarCount === 0) {
      const bar = document.getElementById('top-sync-progress-bar');
      if (bar) bar.classList.add('hidden-progress');
    }
  }
  window.hideTopProgressBar = hideTopProgressBar;

  function showGlobalLoader(title, desc, emoji = '🪔', status = 'Connecting to Cloud Database...') {
    const overlay = document.getElementById('global-loading-overlay');
    if (!overlay) return;
    const titleEl = document.getElementById('loading-overlay-title');
    const descEl = document.getElementById('loading-overlay-desc');
    const emojiEl = document.getElementById('loading-spinner-emoji');
    const statusEl = document.getElementById('loading-overlay-status');

    if (titleEl && title) titleEl.textContent = title;
    if (descEl && desc) descEl.textContent = desc;
    if (emojiEl && emoji) {
      if (emoji === 'google' || emoji.includes('<svg')) {
        emojiEl.innerHTML = emoji === 'google' 
          ? `<svg class="w-7 h-7 sm:w-8 sm:h-8 shrink-0 drop-shadow-sm" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>`
          : emoji;
      } else {
        emojiEl.textContent = emoji;
      }
    }
    if (statusEl && status) statusEl.textContent = status;

    overlay.classList.remove('hidden-loader');
    showTopProgressBar();
  }
  window.showGlobalLoader = showGlobalLoader;

  function hideGlobalLoader() {
    const overlay = document.getElementById('global-loading-overlay');
    if (overlay) {
      overlay.classList.add('hidden-loader');
    }
    hideTopProgressBar();
  }
  window.hideGlobalLoader = hideGlobalLoader;

  // --- 5. SCROLL REVEAL (Fast single-pass reveal without DOM thrashing) ---
  function initScrollReveal(scope) {
    const root = (scope && scope.querySelectorAll) ? scope : document;
    const elements = root.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add('is-revealed');
    }
  }

  // --- 6. REAL-TIME FESTIVAL COUNTDOWN TO MAHALAYA ---
  function initCountdown() {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');
    const zeroMsg = document.getElementById('countdown-zero-message');

    // Mahalaya Dawn Awakening target: 10 October 2026, 4:00 AM IST
    const targetDate = new Date('2026-10-10T04:00:00+05:30');

    function update() {
      const current = new Date();
      let diff = targetDate - current;

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
        if (zeroMsg) zeroMsg.classList.remove('hidden');
        return;
      }

      if (zeroMsg) zeroMsg.classList.add('hidden');

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    }

    update();
    const cdInterval = setInterval(() => {
      // Auto-stop the interval once the target date has passed
      if (targetDate <= new Date()) {
        clearInterval(cdInterval);
        return;
      }
      update();
    }, 1000);
  }

  // 14 Curated Recommended Watch Pandals (Strictly these 14 specified iconic pandals)
  const RECOMMENDED_PANDAL_IDS = [
    'tridhara-sammilani',
    'kashi-bose-lane',
    'hatibagan-sarbojanin',
    'suruchi-sangha',
    'ballygunge-cultural',
    'tala-prattoy',
    'maddox-square',
    'santosh-mitra-square',
    'bagbazar-sarbojanin',
    'chetla-agrani',
    'mudiali-club',
    'behala-nutan-dal',
    'chorbagan-sarbojanin',
    'sovabazar-rajbari'
  ];

  // Rajbari / Bonedi Bari Heritage Pandals
  const RAJBARI_PANDAL_IDS = [
    'sovabazar-rajbari',
    'pathuriaghata-rajbari',
    'darjipara-mitra-bari',
    'jorasanko-shib-krishna-daw-rajbari',
    'badan-chand-roy-rajbari'
  ];

  let currentPandalFilter = 'recommended';
  let currentSubZone = 'all';

  // --- 7. RENDER PANDALS ---
  function renderPandals(filterType = currentPandalFilter, subZone = currentSubZone, searchQuery = '') {
    currentPandalFilter = filterType;
    currentSubZone = subZone;

    const container = document.getElementById('pandals-grid-container');
    if (!container) return;

    let list = PANDALS_DATA;

    if (filterType === 'recommended') {
      list = list.filter(p => RECOMMENDED_PANDAL_IDS.includes(p.id));
    } else if (filterType === 'rajbari') {
      list = list.filter(p => 
        p.id !== 'barisha-club' && (
          RAJBARI_PANDAL_IDS.includes(p.id) || 
          /\b(rajbari|bari)\b/i.test(p.name)
        )
      );
    } else if (filterType === 'zones') {
      if (subZone && subZone !== 'all') {
        list = list.filter(p => p.zone.toLowerCase() === subZone.toLowerCase());
      }
    } else if (filterType !== 'all') {
      // Backward compatibility if called with zone name directly
      list = list.filter(p => p.zone.toLowerCase() === filterType.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.theme.toLowerCase().includes(q) ||
        p.transit.toLowerCase().includes(q) ||
        p.zone.toLowerCase().includes(q)
      );
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-16 glass-panel rounded-2xl p-8 border border-outline-variant/30 dark:border-amber-400/20 reveal-on-scroll">
          <span class="material-symbols-outlined text-5xl text-outline dark:text-amber-300 mb-2">search_off</span>
          <h3 class="font-headline-md text-xl text-on-surface dark:text-white font-bold">No pandals found</h3>
          <p class="text-on-surface-variant dark:text-[#ded5c7] text-sm mt-1">Try selecting another filter or searching a different landmark.</p>
        </div>
      `;
      initScrollReveal();
      return;
    }

    container.innerHTML = list.map((pandal, idx) => {
      const isSaved = Storage.isBookmarked(pandal.id);
      const delayClass = `reveal-delay-${(idx % 6) + 1}`;
      const bookmarkBtnClass = isSaved
        ? 'bg-primary text-white border-primary dark:bg-amber-400 dark:text-black dark:border-amber-400 shadow-md'
        : 'text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300 bg-surface-container-low dark:bg-[#252016] border-outline-variant/50 dark:border-amber-400/30';

      return `
        <div class="pandal-card-item bg-surface-container-lowest dark:bg-[#1c1810] rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-outline-variant/30 dark:border-amber-400/20 flex flex-col h-full relative reveal-on-scroll ${delayClass}" data-pandal-id="${pandal.id}">
          <div class="h-28 sm:h-52 relative overflow-hidden bg-surface-container dark:bg-[#252016]">
            <img 
              src="${pandal.image}" 
              alt="${pandal.name}" 
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onerror="this.src='https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80'"
            />
            <div class="absolute bottom-1.5 left-1.5 sm:bottom-3 sm:left-3 bg-surface/95 dark:bg-[#12100a]/95 backdrop-blur-md text-primary dark:text-amber-300 px-2 py-0.5 sm:px-3.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border border-outline-variant/40 dark:border-amber-400/30 shadow-md">
              ${pandal.zone}
            </div>
          </div>
          <div class="p-2.5 sm:p-5 flex flex-col flex-1 justify-between gap-2.5 sm:gap-4">
            <div>
              <h3 class="text-xs sm:text-lg text-on-surface dark:text-white mb-0.5 sm:mb-1 group-hover:text-primary dark:group-hover:text-amber-300 transition-colors font-bold line-clamp-1 sm:line-clamp-none">${pandal.name}</h3>
              <p class="text-on-surface-variant dark:text-[#ded5c7] text-[10px] sm:text-sm leading-snug sm:leading-relaxed mb-1.5 sm:mb-3 line-clamp-2">${pandal.theme}</p>
              
              <div class="flex items-center gap-1 sm:gap-2 text-on-surface-variant dark:text-[#f3ede2] text-[9px] sm:text-xs bg-surface-container-low dark:bg-[#282217] p-1.5 sm:p-2.5 rounded-lg border border-outline-variant/20 dark:border-amber-400/20">
                <span class="material-symbols-outlined text-[14px] sm:text-[18px] text-primary dark:text-amber-300 shrink-0">
                  ${pandal.transitType === 'metro' ? 'directions_subway' : 'directions_bus'}
                </span>
                <span class="truncate font-medium">${pandal.transit}</span>
              </div>
            </div>

            <div class="pt-2 sm:pt-3 border-t border-outline-variant/30 dark:border-amber-400/20 flex flex-col sm:flex-row gap-1.5 sm:gap-2">
              <a 
                href="${toMapsSearchUrl(pandal.locationUrl, pandal.name + ' Durga Puja Kolkata')}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-full sm:flex-1 bg-amber-400 hover:bg-amber-300 text-black py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-2 shadow-sm hover:shadow"
                title="Search Location in Google Maps"
              >
                <!-- Directions Pin Icon -->
                <img src="maps-pin.png" alt="Open in Maps" class="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 drop-shadow-sm object-contain" />
                <span class="truncate">Open in Maps</span>
              </a>
              <div class="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto shrink-0">
                <button 
                  class="pandal-bookmark-btn flex-1 sm:flex-none w-auto sm:w-10 h-7 sm:h-10 px-2 sm:px-0 border rounded-lg sm:rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer ${bookmarkBtnClass}"
                  data-id="${pandal.id}"
                  title="${isSaved ? 'Remove from saved' : 'Save to Itinerary'}"
                >
                  <span class="material-symbols-outlined text-[15px] sm:text-[20px]" style="${isSaved ? "font-variation-settings: 'FILL' 1;" : ''}">${isSaved ? 'bookmark' : 'bookmark_border'}</span>
                  <span class="save-btn-text text-[10px] font-bold sm:hidden">${isSaved ? 'Saved' : 'Save'}</span>
                </button>
                <button 
                  class="pandal-info-btn flex-1 sm:flex-none w-auto sm:w-10 h-7 sm:h-10 px-2 sm:px-0 border border-outline-variant/50 dark:border-amber-400/30 hover:border-secondary-container dark:hover:border-amber-300 rounded-lg sm:rounded-xl flex items-center justify-center gap-1 text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300 transition-colors cursor-pointer"
                  data-id="${pandal.id}"
                  title="View Full Details"
                >
                  <span class="material-symbols-outlined text-[15px] sm:text-[20px]">info</span>
                  <span class="text-[10px] font-bold sm:hidden">Info</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    attachPandalEventListeners();
    initScrollReveal(container);
  }

  // --- AUTHENTICATION GATE FOR SAVING ITEMS ---
  let pendingSaveAction = null;

  function isUserLoggedIn() {
    if (currentUser) return true;
    try {
      const raw = localStorage.getItem('akalbodhon_user_profile');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && (parsed.id || parsed.identifier || parsed.username)) {
          currentUser = parsed;
          return true;
        }
      }
    } catch (e) {}
    return false;
  }

  function promptAuthBeforeSave({ title, message, categoryName, defaultMode = 'login', onAuthenticatedSave }) {
    if (isUserLoggedIn()) {
      if (typeof onAuthenticatedSave === 'function') onAuthenticatedSave();
      return;
    }

    pendingSaveAction = onAuthenticatedSave;

    // Trigger lock notification toast
    showToast('Please sign in or create an account to save to your itinerary!', 'lock');

    // Open dedicated Devotee Account Required Modal
    const modal = document.getElementById('save-auth-prompt-modal');
    if (modal) {
      document.body.classList.add('modal-open');
      const titleEl = document.getElementById('save-auth-prompt-title');
      const descEl = document.getElementById('save-auth-prompt-desc');
      if (titleEl && title) titleEl.textContent = title;
      if (descEl && message) descEl.innerHTML = message;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    } else {
      openAuthModal(defaultMode, message);
    }
  }

  function closeSaveAuthPromptModal() {
    pendingSaveAction = null;
    const modal = document.getElementById('save-auth-prompt-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    const otherOpen = document.querySelector('.fixed.inset-0:not(.hidden):not(#save-auth-prompt-modal)');
    if (!otherOpen) {
      document.body.classList.remove('modal-open');
    }
  }
  window.closeSaveAuthPromptModal = closeSaveAuthPromptModal;
  window.promptAuthBeforeSave = promptAuthBeforeSave;

  let _pandalDelegationDone = false;
  function attachPandalEventListeners() {
    const container = document.getElementById('pandals-grid-container');
    if (!container || _pandalDelegationDone) return;
    _pandalDelegationDone = true;

    container.addEventListener('click', (e) => {
      const bookmarkBtn = e.target.closest('.pandal-bookmark-btn');
      if (bookmarkBtn) {
        e.stopPropagation();
        const id = bookmarkBtn.dataset.id;
        const pandal = PANDALS_DATA.find(p => p.id === id);
        if (!pandal) return;

        const performSave = () => {
          const isSaved = Storage.toggleBookmark({
            id: pandal.id,
            name: pandal.name,
            category: 'Pandal',
            location: pandal.transit,
            zone: pandal.zone,
            link: pandal.locationUrl,
            image: pandal.image
          });

          const icon = bookmarkBtn.querySelector('.material-symbols-outlined');
          if (icon) {
            icon.textContent = isSaved ? 'bookmark' : 'bookmark_border';
            icon.style.fontVariationSettings = isSaved ? "'FILL' 1" : "";
          }

          const label = bookmarkBtn.querySelector('.save-btn-text');
          if (label) {
            label.textContent = isSaved ? 'Saved' : 'Save';
          }
          bookmarkBtn.title = isSaved ? 'Remove from saved' : 'Save to Itinerary';

          if (isSaved) {
            bookmarkBtn.classList.add('bg-primary', 'text-white', 'border-primary', 'dark:bg-amber-400', 'dark:text-black', 'dark:border-amber-400', 'shadow-md');
            bookmarkBtn.classList.remove('text-on-surface-variant', 'dark:text-[#ded5c7]', 'hover:text-primary', 'dark:hover:text-amber-300', 'bg-surface-container-low', 'dark:bg-[#252016]', 'border-outline-variant/50', 'dark:border-amber-400/30');
          } else {
            bookmarkBtn.classList.remove('bg-primary', 'text-white', 'border-primary', 'dark:bg-amber-400', 'dark:text-black', 'dark:border-amber-400', 'shadow-md');
            bookmarkBtn.classList.add('text-on-surface-variant', 'dark:text-[#ded5c7]', 'hover:text-primary', 'dark:hover:text-amber-300', 'bg-surface-container-low', 'dark:bg-[#252016]', 'border-outline-variant/50', 'dark:border-amber-400/30');
          }

          showToast(isSaved ? `Added "${pandal.name}" to Itinerary!` : `Removed "${pandal.name}" from Itinerary`, isSaved ? 'bookmark_added' : 'bookmark_remove');
          renderSavedItinerary();
        };

        if (!isUserLoggedIn()) {
          promptAuthBeforeSave({
            title: 'Sign In to Save Pandal',
            message: `Please <strong>log in</strong> or <strong>create an account</strong> to save <em>${pandal.name}</em> under Pandals & Transit to your personal itinerary.`,
            categoryName: 'Pandals & Transit',
            defaultMode: 'login',
            onAuthenticatedSave: performSave
          });
          return;
        }

        performSave();
        return;
      }

      const infoBtn = e.target.closest('.pandal-info-btn');
      if (infoBtn) {
        e.stopPropagation();
        const id = infoBtn.dataset.id;
        const pandal = PANDALS_DATA.find(p => p.id === id);
        if (pandal) openDetailModal(pandal, 'pandal');
        return;
      }
    });
  }

  // --- 8. RENDER FOOD & SHOPPING ---
  function renderFoodAndShopping(filter = 'all', searchQuery = '') {
    const foodContainer = document.getElementById('food-cards-container');
    const shopContainer = document.getElementById('shopping-cards-container');
    const foodSectionBlock = document.getElementById('food-section-block');
    const shopSectionBlock = document.getElementById('shopping-section-block');

    let foodList = FOOD_DATA;
    let shopList = SHOPPING_DATA;

    // Filter logic
    if (filter === 'food' || filter === 'biryani' || filter === 'bengali') {
      if (shopSectionBlock) shopSectionBlock.classList.add('hidden');
      if (foodSectionBlock) foodSectionBlock.classList.remove('hidden');
      if (filter !== 'food') {
        foodList = foodList.filter(f => f.category === filter);
      }
    } else if (filter === 'shopping' || filter === 'sarees') {
      if (foodSectionBlock) foodSectionBlock.classList.add('hidden');
      if (shopSectionBlock) shopSectionBlock.classList.remove('hidden');
      if (filter === 'sarees') {
        shopList = shopList.filter(s => s.type === 'sarees');
      }
    } else {
      if (foodSectionBlock) foodSectionBlock.classList.remove('hidden');
      if (shopSectionBlock) shopSectionBlock.classList.remove('hidden');
    }

    // Search query logic
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      foodList = foodList.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q) ||
        f.mustTry.toLowerCase().includes(q) ||
        f.desc.toLowerCase().includes(q)
      );
      shopList = shopList.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.highlight.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q)
      );
    }

    // Render Food Cards
    if (foodContainer) {
      if (foodList.length === 0) {
        foodContainer.innerHTML = `
          <div class="col-span-full text-center py-10 glass-panel rounded-2xl p-6 border border-outline-variant/30 dark:border-amber-400/20 reveal-on-scroll">
            <span class="material-symbols-outlined text-4xl text-outline dark:text-amber-300 mb-2">no_meals</span>
            <p class="text-on-surface-variant dark:text-[#ded5c7] text-sm">No food destinations found matching query.</p>
          </div>
        `;
      } else {
        foodContainer.innerHTML = foodList.map((food, idx) => {
          const isSaved = Storage.isBookmarked(food.id);
          const delayClass = `reveal-delay-${(idx % 6) + 1}`;

          return `
            <div class="food-card-item bg-surface-container-lowest dark:bg-[#1c1810] rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-outline-variant/30 dark:border-amber-400/20 flex flex-col h-full relative reveal-on-scroll ${delayClass}">
              <div class="h-28 sm:h-48 relative overflow-hidden bg-surface-container dark:bg-[#252016]">
                <img 
                  src="${food.image}" 
                  alt="${food.name}" 
                  loading="lazy"
                  decoding="async"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onerror="this.src='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'"
                />
              </div>

              <div class="p-2.5 sm:p-5 flex flex-col flex-1 justify-between gap-2 sm:gap-4">
                <div>
                  <h3 class="text-xs sm:text-lg font-bold text-on-surface dark:text-white mb-0.5 sm:mb-1 group-hover:text-primary dark:group-hover:text-amber-300 transition-colors line-clamp-1 sm:line-clamp-none">${food.name}</h3>
                  <p class="text-[10px] sm:text-xs text-primary dark:text-amber-300 font-semibold mb-1 flex items-center gap-1 line-clamp-1">
                    <span class="material-symbols-outlined text-[13px] sm:text-[15px] shrink-0">pin_drop</span> <span class="truncate">${food.location}</span>
                  </p>
                  <p class="text-[10px] sm:text-sm text-on-surface-variant dark:text-[#ded5c7] leading-snug sm:leading-relaxed mb-1.5 sm:mb-2 line-clamp-2">${food.desc}</p>
                  
                  <div class="bg-surface-container-low dark:bg-[#282217] p-1.5 sm:p-2.5 rounded-lg border border-outline-variant/20 dark:border-amber-400/20 text-[9px] sm:text-xs text-on-surface dark:text-[#f3ede2] mb-1">
                    <span class="text-primary dark:text-amber-300 font-bold block mb-0.5">⭐ Signature:</span>
                    <span class="font-medium line-clamp-1">${food.mustTry}</span>
                  </div>
                </div>

                <div class="pt-2 sm:pt-3 border-t border-outline-variant/30 dark:border-amber-400/20 flex flex-col sm:flex-row gap-1.5 sm:gap-2">
                  <a 
                    href="${toMapsSearchUrl(food.locationUrl, food.name + ' Kolkata')}" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="w-full sm:flex-1 bg-amber-400 hover:bg-amber-300 text-black py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-2 shadow-sm hover:shadow"
                    title="Search Location in Google Maps"
                  >
                    <!-- Directions Pin Icon -->
                    <img src="maps-pin.png" alt="Open in Maps" class="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 drop-shadow-sm object-contain" />
                    <span class="truncate">Open in Maps</span>
                  </a>
                  <div class="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto shrink-0">
                    <button 
                      class="food-bookmark-btn flex-1 sm:flex-none w-auto sm:w-10 h-7 sm:h-10 px-2 sm:px-0 border rounded-lg sm:rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer ${isSaved ? 'bg-primary text-white border-primary dark:bg-amber-400 dark:text-black dark:border-amber-400 shadow-md' : 'text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300 bg-surface-container-low dark:bg-[#252016] border-outline-variant/50 dark:border-amber-400/30'}"
                      data-id="${food.id}"
                      title="${isSaved ? 'Remove from saved' : 'Save to Itinerary'}"
                    >
                      <span class="material-symbols-outlined text-[15px] sm:text-[20px]" style="${isSaved ? "font-variation-settings: 'FILL' 1;" : ''}">${isSaved ? 'bookmark' : 'bookmark_border'}</span>
                      <span class="save-btn-text text-[10px] font-bold sm:hidden">${isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                    <button 
                      class="food-info-btn flex-1 sm:flex-none w-auto sm:w-10 h-7 sm:h-10 px-2 sm:px-0 border border-outline-variant/50 dark:border-amber-400/30 hover:border-secondary-container dark:hover:border-amber-300 rounded-lg sm:rounded-xl flex items-center justify-center gap-1 text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300 transition-colors cursor-pointer"
                      data-id="${food.id}"
                      title="View Full Details"
                    >
                      <span class="material-symbols-outlined text-[15px] sm:text-[20px]">info</span>
                      <span class="text-[10px] font-bold sm:hidden">Info</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Render Shopping Cards
    if (shopContainer) {
      if (shopList.length === 0) {
        shopContainer.innerHTML = `
          <div class="col-span-full text-center py-10 glass-panel rounded-2xl p-6 border border-outline-variant/30 dark:border-amber-400/20 reveal-on-scroll">
            <span class="material-symbols-outlined text-4xl text-outline dark:text-amber-300 mb-2">shopping_bag</span>
            <p class="text-on-surface-variant dark:text-[#ded5c7] text-sm">No shopping districts found matching query.</p>
          </div>
        `;
      } else {
        shopContainer.innerHTML = shopList.map((shop, idx) => {
          const isSaved = Storage.isBookmarked(shop.id);
          const delayClass = `reveal-delay-${(idx % 6) + 1}`;

          return `
            <div class="shop-card-item bg-surface-container-lowest dark:bg-[#1c1810] rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-outline-variant/30 dark:border-amber-400/20 flex flex-col h-full relative reveal-on-scroll ${delayClass}">
              <div class="h-28 sm:h-48 relative overflow-hidden bg-surface-container dark:bg-[#252016]">
                <img 
                  src="${shop.image}" 
                  alt="${shop.name}" 
                  loading="lazy"
                  decoding="async"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onerror="this.src='https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'"
                />
              </div>

              <div class="p-2.5 sm:p-5 flex flex-col flex-1 justify-between gap-2 sm:gap-4">
                <div>
                  <h3 class="text-xs sm:text-lg font-bold text-on-surface dark:text-white mb-0.5 sm:mb-1 group-hover:text-primary dark:group-hover:text-amber-300 transition-colors line-clamp-1 sm:line-clamp-none">${shop.name}</h3>
                  <p class="text-[10px] sm:text-xs text-primary dark:text-amber-300 font-semibold mb-1 flex items-center gap-1 line-clamp-1">
                    <span class="material-symbols-outlined text-[13px] sm:text-[15px] shrink-0">pin_drop</span> <span class="truncate">${shop.location}</span>
                  </p>
                  <p class="text-[10px] sm:text-sm text-on-surface-variant dark:text-[#ded5c7] leading-snug sm:leading-relaxed mb-1.5 sm:mb-2 line-clamp-2">${shop.desc}</p>
                  
                  <div class="bg-surface-container-low dark:bg-[#282217] p-1.5 sm:p-2.5 rounded-lg border border-outline-variant/20 dark:border-amber-400/20 text-[9px] sm:text-xs text-on-surface dark:text-[#f3ede2] mb-1">
                    <span class="text-primary dark:text-amber-300 font-bold block mb-0.5">✨ Specialties:</span>
                    <span class="font-medium line-clamp-1">${shop.highlight}</span>
                  </div>
                </div>

                <div class="pt-2 sm:pt-3 border-t border-outline-variant/30 dark:border-amber-400/20 flex flex-col sm:flex-row gap-1.5 sm:gap-2">
                  <a 
                    href="${toMapsSearchUrl(shop.locationUrl, shop.name + ' Kolkata')}" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="w-full sm:flex-1 bg-amber-400 hover:bg-amber-300 text-black py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-2 shadow-sm hover:shadow"
                    title="Search Location in Google Maps"
                  >
                    <!-- Directions Pin Icon -->
                    <img src="maps-pin.png" alt="Open in Maps" class="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 drop-shadow-sm object-contain" />
                    <span class="truncate">Open in Maps</span>
                  </a>
                  <div class="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto shrink-0">
                    <button 
                      class="shop-bookmark-btn flex-1 sm:flex-none w-auto sm:w-10 h-7 sm:h-10 px-2 sm:px-0 border rounded-lg sm:rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer ${isSaved ? 'bg-primary text-white border-primary dark:bg-amber-400 dark:text-black dark:border-amber-400 shadow-md' : 'text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300 bg-surface-container-low dark:bg-[#252016] border-outline-variant/50 dark:border-amber-400/30'}"
                      data-id="${shop.id}"
                      title="${isSaved ? 'Remove from saved' : 'Save to Itinerary'}"
                    >
                      <span class="material-symbols-outlined text-[15px] sm:text-[20px]" style="${isSaved ? "font-variation-settings: 'FILL' 1;" : ''}">${isSaved ? 'bookmark' : 'bookmark_border'}</span>
                      <span class="save-btn-text text-[10px] font-bold sm:hidden">${isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                    <button 
                      class="shop-info-btn flex-1 sm:flex-none w-auto sm:w-10 h-7 sm:h-10 px-2 sm:px-0 border border-outline-variant/50 dark:border-amber-400/30 hover:border-secondary-container dark:hover:border-amber-300 rounded-lg sm:rounded-xl flex items-center justify-center gap-1 text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300 transition-colors cursor-pointer"
                      data-id="${shop.id}"
                      title="View Full Details"
                    >
                      <span class="material-symbols-outlined text-[15px] sm:text-[20px]">info</span>
                      <span class="text-[10px] font-bold sm:hidden">Info</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    attachFoodAndShopEventListeners();
    initScrollReveal(foodContainer);
    initScrollReveal(shopContainer);
  }

  let _foodShopDelegationDone = false;
  function attachFoodAndShopEventListeners() {
    if (_foodShopDelegationDone) return;
    _foodShopDelegationDone = true;

    // Delegated Food container listener
    const foodContainer = document.getElementById('food-cards-container');
    if (foodContainer) {
      foodContainer.addEventListener('click', (e) => {
        const bookmarkBtn = e.target.closest('.food-bookmark-btn');
        if (bookmarkBtn) {
          e.stopPropagation();
          const id = bookmarkBtn.dataset.id;
          const food = FOOD_DATA.find(f => f.id === id);
          if (!food) return;

          const performSave = () => {
            const isSaved = Storage.toggleBookmark({
              id: food.id,
              name: food.name,
              category: 'Food & Shopping',
              sub_category: food.category || 'Famous Food Joints',
              type: 'food',
              location: food.location,
              zone: food.zone || 'Culinary Landmark',
              link: food.locationUrl,
              image: food.image
            });

            const icon = bookmarkBtn.querySelector('.material-symbols-outlined');
            if (icon) {
              icon.textContent = isSaved ? 'bookmark' : 'bookmark_border';
              icon.style.fontVariationSettings = isSaved ? "'FILL' 1" : "";
            }

            const label = bookmarkBtn.querySelector('.save-btn-text');
            if (label) {
              label.textContent = isSaved ? 'Saved' : 'Save';
            }
            bookmarkBtn.title = isSaved ? 'Remove from saved' : 'Save to Itinerary';

            if (isSaved) {
              bookmarkBtn.classList.add('bg-primary', 'text-white', 'border-primary', 'dark:bg-amber-400', 'dark:text-black', 'dark:border-amber-400', 'shadow-md');
              bookmarkBtn.classList.remove('text-on-surface-variant', 'dark:text-[#ded5c7]', 'hover:text-primary', 'dark:hover:text-amber-300', 'bg-surface-container-low', 'dark:bg-[#252016]', 'border-outline-variant/50', 'dark:border-amber-400/30');
            } else {
              bookmarkBtn.classList.remove('bg-primary', 'text-white', 'border-primary', 'dark:bg-amber-400', 'dark:text-black', 'dark:border-amber-400', 'shadow-md');
              bookmarkBtn.classList.add('text-on-surface-variant', 'dark:text-[#ded5c7]', 'hover:text-primary', 'dark:hover:text-amber-300', 'bg-surface-container-low', 'dark:bg-[#252016]', 'border-outline-variant/50', 'dark:border-amber-400/30');
            }

            showToast(isSaved ? `Added "${food.name}" to Itinerary!` : `Removed "${food.name}" from Itinerary`, isSaved ? 'bookmark_added' : 'bookmark_remove');
            renderSavedItinerary();
          };

          if (!isUserLoggedIn()) {
            promptAuthBeforeSave({
              title: 'Sign In to Save Dining Spot',
              message: `Please <strong>log in</strong> or <strong>create an account</strong> to save <em>${food.name}</em> under Food & Shopping to your personal itinerary.`,
              categoryName: 'Food & Shopping',
              defaultMode: 'login',
              onAuthenticatedSave: performSave
            });
            return;
          }

          performSave();
          return;
        }

        const infoBtn = e.target.closest('.food-info-btn');
        if (infoBtn) {
          e.stopPropagation();
          const id = infoBtn.dataset.id;
          const food = FOOD_DATA.find(f => f.id === id);
          if (food) openDetailModal(food, 'food');
          return;
        }
      });
    }

    // Delegated Shop container listener
    const shopContainer = document.getElementById('shopping-cards-container');
    if (shopContainer) {
      shopContainer.addEventListener('click', (e) => {
        const bookmarkBtn = e.target.closest('.shop-bookmark-btn');
        if (bookmarkBtn) {
          e.stopPropagation();
          const id = bookmarkBtn.dataset.id;
          const shop = SHOPPING_DATA.find(s => s.id === id);
          if (!shop) return;

          const performSave = () => {
            const isSaved = Storage.toggleBookmark({
              id: shop.id,
              name: shop.name,
              category: 'Food & Shopping',
              sub_category: shop.category || 'Shopping Bazaar',
              type: 'shop',
              location: shop.location,
              zone: 'Festive Shopping',
              link: shop.locationUrl,
              image: shop.image
            });

            const icon = bookmarkBtn.querySelector('.material-symbols-outlined');
            if (icon) {
              icon.textContent = isSaved ? 'bookmark' : 'bookmark_border';
              icon.style.fontVariationSettings = isSaved ? "'FILL' 1" : "";
            }

            const label = bookmarkBtn.querySelector('.save-btn-text');
            if (label) {
              label.textContent = isSaved ? 'Saved' : 'Save';
            }
            bookmarkBtn.title = isSaved ? 'Remove from saved' : 'Save to Itinerary';

            if (isSaved) {
              bookmarkBtn.classList.add('bg-primary', 'text-white', 'border-primary', 'dark:bg-amber-400', 'dark:text-black', 'dark:border-amber-400', 'shadow-md');
              bookmarkBtn.classList.remove('text-on-surface-variant', 'dark:text-[#ded5c7]', 'hover:text-primary', 'dark:hover:text-amber-300', 'bg-surface-container-low', 'dark:bg-[#252016]', 'border-outline-variant/50', 'dark:border-amber-400/30');
            } else {
              bookmarkBtn.classList.remove('bg-primary', 'text-white', 'border-primary', 'dark:bg-amber-400', 'dark:text-black', 'dark:border-amber-400', 'shadow-md');
              bookmarkBtn.classList.add('text-on-surface-variant', 'dark:text-[#ded5c7]', 'hover:text-primary', 'dark:hover:text-amber-300', 'bg-surface-container-low', 'dark:bg-[#252016]', 'border-outline-variant/50', 'dark:border-amber-400/30');
            }

            showToast(isSaved ? `Added "${shop.name}" to Itinerary!` : `Removed "${shop.name}" from Itinerary`, isSaved ? 'bookmark_added' : 'bookmark_remove');
            renderSavedItinerary();
          };

          if (!isUserLoggedIn()) {
            promptAuthBeforeSave({
              title: 'Sign In to Save Shopping District',
              message: `Please <strong>log in</strong> or <strong>create an account</strong> to save <em>${shop.name}</em> under Food & Shopping to your personal itinerary.`,
              categoryName: 'Food & Shopping',
              defaultMode: 'login',
              onAuthenticatedSave: performSave
            });
            return;
          }

          performSave();
          return;
        }

        const infoBtn = e.target.closest('.shop-info-btn');
        if (infoBtn) {
          e.stopPropagation();
          const id = infoBtn.dataset.id;
          const shop = SHOPPING_DATA.find(s => s.id === id);
          if (shop) openDetailModal(shop, 'shop');
          return;
        }
      });
    }
  }

  // --- 9. RENDER TRAILS & RITUALS ---
  function renderCuratedTrails() {
    const container = document.getElementById('trails-container');
    if (!container) return;

    container.innerHTML = TRAILS_DATA.map((trail, idx) => `
      <div class="bg-surface-container-low dark:bg-[#1c1810] p-6 md:p-8 rounded-2xl border border-outline-variant/40 dark:border-amber-400/20 relative overflow-hidden group hover:shadow-lg transition-all flex flex-col justify-between reveal-on-scroll reveal-delay-${idx + 1}">
        <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-secondary-container/10 dark:bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="px-3 py-1 rounded-full bg-primary/10 dark:bg-amber-400/20 text-primary dark:text-amber-300 font-label-sm text-xs font-bold tracking-wide uppercase border border-primary/20 dark:border-amber-400/30">
              ${trail.tag}
            </span>
            <span class="text-on-surface-variant dark:text-[#ded5c7] font-label-sm text-xs flex items-center gap-1 font-medium">
              <span class="material-symbols-outlined text-[15px] text-primary dark:text-amber-300">schedule</span> ${trail.time} (${trail.distance})
            </span>
          </div>

          <h3 class="font-display-lg-mobile text-2xl text-primary dark:text-white font-bold mb-2">${trail.title}</h3>
          <p class="text-on-surface-variant dark:text-[#ded5c7] text-sm mb-5 leading-relaxed">${trail.description}</p>

          <div class="space-y-2.5 mb-6">
            <h4 class="font-label-sm text-xs text-on-surface-variant dark:text-amber-300 font-bold uppercase tracking-wider">Trail Waypoints:</h4>
            ${trail.stops.map((stop, sIdx) => `
              <div class="flex items-center gap-3 text-sm text-on-surface dark:text-[#f3ede2]">
                <div class="w-6 h-6 rounded-full bg-primary-container dark:bg-amber-400 text-on-primary dark:text-black flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                  ${sIdx + 1}
                </div>
                <span class="font-medium">${stop}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="pt-4 border-t border-outline-variant/30 dark:border-amber-400/20 flex items-center justify-between gap-4">
          <div class="text-xs text-on-surface-variant dark:text-[#ded5c7] italic">
            💡 ${trail.foodTip}
          </div>
          <button 
            onclick="window.open('https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trail.stops.join(' to '))}', '_blank')"
            class="bg-surface-container-highest dark:bg-[#282217] text-primary dark:text-amber-300 hover:bg-primary dark:hover:bg-amber-400 hover:text-on-primary dark:hover:text-black px-4 py-2 rounded-xl font-label-sm text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 border border-outline-variant/30 dark:border-amber-400/30"
          >
            <span class="material-symbols-outlined text-[16px]">map</span> Open Route
          </button>
        </div>
      </div>
    `).join('');

    initScrollReveal();
  }

  function renderRituals() {
    const container = document.getElementById('rituals-timeline-container');
    if (!container) return;

    // Wire up top Go Back to Home button
    const backBtn = document.getElementById('rituals-go-back-btn');
    if (backBtn && !backBtn.dataset.bound) {
      backBtn.dataset.bound = 'true';
      backBtn.onclick = (e) => {
        e.preventDefault();
        window.location.hash = 'home';
        handleRouting();
      };
    }

    container.innerHTML = RITUALS_DATA.map((rit, idx) => `
      <div class="relative pl-6 sm:pl-8 md:pl-10 pb-8 last:pb-0 border-l-2 border-primary/30 dark:border-amber-400/40 ml-4 sm:ml-6 md:ml-4 group reveal-on-scroll reveal-delay-${(idx % 4) + 1}">
        <div class="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary dark:bg-amber-400 text-on-primary dark:text-black flex items-center justify-center ring-4 ring-surface dark:ring-[#12100a] font-bold text-xs shadow-md">
          ${idx + 1}
        </div>
        <div class="glass-panel p-4 sm:p-6 md:p-7 rounded-2xl border border-outline-variant/30 dark:border-amber-400/25 hover:shadow-lg transition-all space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/20 dark:border-amber-400/15 pb-3">
            <div>
              <span class="text-xs uppercase tracking-widest text-primary dark:text-amber-300 font-bold">${rit.tithi}</span>
              <h3 class="font-headline-md text-2xl text-on-surface dark:text-white font-bold">${rit.day}</h3>
            </div>
            <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
              <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container/30 dark:bg-amber-400/20 text-secondary dark:text-amber-200 text-xs font-bold border border-secondary-container/40 dark:border-amber-400/30 shadow-sm">
                <span class="material-symbols-outlined text-[15px]">calendar_month</span> ${rit.date}
              </div>
            </div>
          </div>
          
          <p class="text-on-surface-variant dark:text-[#ded5c7] text-sm italic">${rit.significance}</p>
          
          <div class="space-y-2.5 pt-1">
            <h4 class="font-label-sm text-xs font-bold uppercase tracking-wider text-primary dark:text-amber-300 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">verified</span>
              <span>Prescribed Ceremonies (Tap to read details)</span>
            </h4>
            
            <div class="space-y-2">
              ${rit.ceremonies.map(c => `
                <div class="ceremony-item rounded-xl bg-surface-container-low dark:bg-[#252016] border border-outline-variant/30 dark:border-amber-400/20 overflow-hidden transition-all shadow-sm">
                  <button class="ceremony-toggle-btn w-full px-4 py-3 text-left flex items-center justify-between gap-3 hover:bg-surface-container dark:hover:bg-[#2e271a] transition-colors cursor-pointer group" aria-expanded="false">
                    <div class="flex items-center gap-2.5 font-semibold text-xs sm:text-sm text-on-surface dark:text-[#f3ede2]">
                      <span class="w-1.5 h-1.5 rounded-full bg-primary dark:bg-amber-400"></span>
                      <span class="group-hover:text-primary dark:group-hover:text-amber-300 transition-colors">${c.name}</span>
                    </div>
                    <span class="material-symbols-outlined text-[18px] text-on-surface-variant dark:text-amber-300 transition-transform duration-300 ceremony-arrow shrink-0">chevron_right</span>
                  </button>
                  <div class="ceremony-desc hidden px-4 pb-3.5 pt-1 text-xs text-on-surface-variant dark:text-[#ded5c7] leading-relaxed border-t border-outline-variant/15 dark:border-amber-400/10 bg-surface-container-lowest/60 dark:bg-[#1a160f]/60">
                    ${c.desc}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Ensure any running ritual sound loop is cleanly stopped
    if (soundEngine && typeof soundEngine.stopLoop === 'function') {
      soundEngine.stopLoop();
    }

    // Attach click listeners to all ceremony accordion buttons
    container.querySelectorAll('.ceremony-toggle-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const item = btn.closest('.ceremony-item');
        if (!item) return;
        const desc = item.querySelector('.ceremony-desc');
        const arrow = item.querySelector('.ceremony-arrow');
        const isClosed = desc.classList.contains('hidden');

        if (isClosed) {
          desc.classList.remove('hidden');
          arrow.classList.add('rotate-90');
          btn.setAttribute('aria-expanded', 'true');
        } else {
          desc.classList.add('hidden');
          arrow.classList.remove('rotate-90');
          btn.setAttribute('aria-expanded', 'false');
        }
      };
    });

    initScrollReveal();
  }

  // --- 10. RENDER SAVED ITINERARY ---
  let activeSavedTab = 'all';

  function updateBookmarkCount() {
    try {
      const loggedIn = isUserLoggedIn() && !!currentUser;
      const bookmarks = loggedIn ? (Storage.getBookmarks() || []) : [];
      const plans = (loggedIn && typeof customPlans !== 'undefined' && Array.isArray(customPlans)) ? customPlans : [];
      const total = bookmarks.length + plans.length;

      // Update Itinerary Section Tab Badges
      const badgeAll = document.getElementById('saved-badge-all');
      if (badgeAll) badgeAll.textContent = loggedIn ? total : 0;

      const pandalCount = loggedIn ? bookmarks.filter(b => !isFoodOrShopBookmark(b)).length : 0;

      const foodCount = loggedIn ? (bookmarks.length - pandalCount) : 0;

      const badgePandals = document.getElementById('saved-badge-pandals');
      if (badgePandals) badgePandals.textContent = pandalCount;

      const badgeFood = document.getElementById('saved-badge-food');
      if (badgeFood) badgeFood.textContent = foodCount;

      const badgePlans = document.getElementById('saved-badge-plans');
      if (badgePlans) badgePlans.textContent = loggedIn ? plans.length : 0;

      // Update Dropdown Options text
      const savedDropdown = document.getElementById('saved-filter-dropdown');
      if (savedDropdown) {
        const optAll = savedDropdown.querySelector('option[value="all"]');
        const optPandals = savedDropdown.querySelector('option[value="pandals"]');
        const optFood = savedDropdown.querySelector('option[value="food-shopping"]');
        const optPlans = savedDropdown.querySelector('option[value="plans"]');
        if (optAll) optAll.textContent = `✨ All Saved (${loggedIn ? total : 0})`;
        if (optPandals) optPandals.textContent = `🏛️ Pandals & Transit (${pandalCount})`;
        if (optFood) optFood.textContent = `🍽️ Food & Shopping (${foodCount})`;
        if (optPlans) optPlans.textContent = `📋 Saved Plans (${loggedIn ? plans.length : 0})`;
      }
    } catch (e) {
      console.warn('updateBookmarkCount warning:', e);
    }
  }
  window.updateBookmarkCount = updateBookmarkCount;

  function openClearItineraryModal() {
    const bookmarks = Storage.getBookmarks() || [];
    const plans = (typeof customPlans !== 'undefined' && Array.isArray(customPlans)) ? customPlans : [];
    if (bookmarks.length === 0 && plans.length === 0) {
      showToast('Your Puja itinerary is already empty', 'info');
      return;
    }
    const modal = document.getElementById('clear-itinerary-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.classList.add('modal-open');
    } else {
      // Fallback if modal is somehow not found
      if (confirm('Clear all saved pandals, food spots, and custom items from your itinerary?')) {
        clearEntireItinerary();
      }
    }
  }
  window.openClearItineraryModal = openClearItineraryModal;

  function closeClearItineraryModal() {
    const modal = document.getElementById('clear-itinerary-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.classList.remove('modal-open');
    }
  }
  window.closeClearItineraryModal = closeClearItineraryModal;

  function clearEntireItinerary() {
    closeClearItineraryModal();
    try {
      Storage.clearBookmarks();
      if (typeof customPlans !== 'undefined') {
        customPlans = [];
      }
      try {
        localStorage.setItem('akalbodhon_custom_plans', JSON.stringify([]));
      } catch (_) {}

      if (currentUser) {
        currentUser.saved_items = [];
        currentUser.custom_plans = [];
        try {
          localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser));
        } catch (_) {}
        if (typeof saveUserSpecificItinerary === 'function') {
          saveUserSpecificItinerary(currentUser, [], []);
        }
        if (typeof syncUserSavedItemsToSupabase === 'function') {
          syncUserSavedItemsToSupabase([]);
        }
        if (window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
          try {
            window.AkalbodhonFirebase.saveBookmarks(currentUser, []).catch(() => {});
            const targetUid = currentUser.id || currentUser.user_id;
            window.AkalbodhonFirebase.syncProfile({ id: targetUid, custom_plans: [] }).catch(() => {});
          } catch (_) {}
        }
      }

      // Also sanitize any cached user data entries in localStorage
      try {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('akalbodhon_user_data_') || key === 'akalbodhon_bookmarks')) {
            try {
              const item = JSON.parse(localStorage.getItem(key));
              if (item && typeof item === 'object') {
                item.bookmarks = [];
                item.custom_plans = [];
                localStorage.setItem(key, JSON.stringify(item));
              }
            } catch (_) {}
          }
        }
      } catch (_) {}

      updateBookmarkCount();
      renderSavedItinerary();
      if (typeof renderPandals === 'function') renderPandals();
      if (typeof renderFoodAndShopping === 'function') renderFoodAndShopping();
      if (typeof renderFestivalPlans === 'function') renderFestivalPlans();
      showToast('Your Puja itinerary has been cleared', 'delete');
    } catch (err) {
      console.error('Error clearing itinerary:', err);
      showToast('Itinerary cleared', 'delete');
    }
  }
  window.clearEntireItinerary = clearEntireItinerary;
  window.renderSavedSection = renderSavedItinerary;

  function attachSavedItineraryTabEvents() {
    document.querySelectorAll('.saved-tab-btn').forEach(btn => {
      btn.onclick = () => {
        const cat = btn.dataset.category;
        renderSavedItinerary(cat);
      };
    });

    const savedDropdownSelect = document.getElementById('saved-filter-dropdown');
    if (savedDropdownSelect) {
      savedDropdownSelect.onchange = (e) => {
        renderSavedItinerary(e.target.value);
      };
    }

    const clearAllBtn = document.getElementById('clear-all-bookmarks-btn');
    if (clearAllBtn) {
      clearAllBtn.onclick = (e) => {
        e.preventDefault();
        openClearItineraryModal();
      };
    }
  }

  function attachSavedItineraryItemEvents(displayPandals, displayFood) {
    document.querySelectorAll('.remove-single-bookmark').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const b = displayPandals.concat(displayFood).find(item => item.id === id);
        if (b) {
          Storage.toggleBookmark(b);
          renderSavedItinerary();
          renderPandals();
          renderFoodAndShopping();
          showToast(`Updated "${b.name}" in Itinerary`, 'delete');
        }
      };
    });
  }

  function renderSavedItinerary(filterCategory = activeSavedTab) {
    activeSavedTab = filterCategory;
    const container = document.getElementById('saved-itinerary-container');
    if (!container) return;

    // If no user is logged in, show a login-required empty state and keep itinerary clear
    if (!isUserLoggedIn() || !currentUser) {
      updateBookmarkCount();
      const clearBtn = document.getElementById('clear-all-bookmarks-btn');
      if (clearBtn) clearBtn.style.display = 'none';

      // Zero out all tab badges
      const badgeAll = document.getElementById('saved-badge-all');
      const badgePandals = document.getElementById('saved-badge-pandals');
      const badgeFood = document.getElementById('saved-badge-food');
      const badgePlans = document.getElementById('saved-badge-plans');
      if (badgeAll) badgeAll.textContent = '0';
      if (badgePandals) badgePandals.textContent = '0';
      if (badgeFood) badgeFood.textContent = '0';
      if (badgePlans) badgePlans.textContent = '0';

      const savedDropdown = document.getElementById('saved-filter-dropdown');
      if (savedDropdown) {
        const optAll = savedDropdown.querySelector('option[value="all"]');
        const optPandals = savedDropdown.querySelector('option[value="pandals"]');
        const optFood = savedDropdown.querySelector('option[value="food-shopping"]');
        const optPlans = savedDropdown.querySelector('option[value="plans"]');
        if (optAll) optAll.textContent = '✨ All Saved (0)';
        if (optPandals) optPandals.textContent = '🏛️ Pandals & Transit (0)';
        if (optFood) optFood.textContent = '🍽️ Food & Shopping (0)';
        if (optPlans) optPlans.textContent = '📋 Saved Plans (0)';
      }

      container.innerHTML = `
        <div class="glass-panel p-8 sm:p-12 rounded-3xl border border-outline-variant/30 dark:border-amber-400/20 text-center max-w-xl mx-auto my-6 space-y-5 reveal-on-scroll">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-400/10 dark:bg-amber-400/20 text-primary dark:text-amber-300 flex items-center justify-center mx-auto shadow-inner">
            <span class="material-symbols-outlined text-[36px] sm:text-[44px]">lock</span>
          </div>
          <div class="space-y-2">
            <h3 class="font-display text-xl sm:text-2xl font-bold text-on-surface dark:text-white">Sign In to View Your Itinerary</h3>
            <p class="text-xs sm:text-sm text-on-surface-variant dark:text-[#ded5c7] leading-relaxed max-w-md mx-auto">
              Your personal Puja itinerary — saved pandals, dining spots, and custom plans — is protected and synced to your devotee account. Please log in or create an account to view and customize your itinerary.
            </p>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <button onclick="if(window.openAuthModal) window.openAuthModal('login'); else window.location.href='login.html';" class="px-5 py-2.5 rounded-xl bg-primary text-white dark:bg-amber-400 dark:text-black font-bold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">login</span> Sign In
            </button>
            <button onclick="if(window.openAuthModal) window.openAuthModal('signup'); else window.location.href='login.html#signup';" class="px-5 py-2.5 rounded-xl bg-surface-container-high dark:bg-[#252016] text-on-surface dark:text-[#f3ede2] border border-outline-variant/30 dark:border-amber-400/30 font-bold text-xs sm:text-sm hover:bg-surface-container-highest dark:hover:bg-[#322c20] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">person_add</span> Create Account
            </button>
          </div>
        </div>
      `;
      attachSavedItineraryTabEvents();
      initScrollReveal();
      return;
    }

    const clearBtn = document.getElementById('clear-all-bookmarks-btn');
    if (clearBtn) clearBtn.style.display = 'flex';

    const bookmarks = Storage.getBookmarks();
    
    // Split into categories using O(1) lookup sets (avoids O(n×m) .some() on every render)
    let pandalBookmarks = bookmarks.filter(b => !isFoodOrShopBookmark(b));
    let foodBookmarks = bookmarks.filter(b => isFoodOrShopBookmark(b));

    // Recover customPlans if empty in memory from user profile or local user store
    if ((!customPlans || customPlans.length === 0) && currentUser) {
      if (Array.isArray(currentUser.custom_plans) && currentUser.custom_plans.length > 0) {
        customPlans = [...currentUser.custom_plans];
      } else {
        const specific = loadUserSpecificItinerary(currentUser);
        if (specific && Array.isArray(specific.custom_plans) && specific.custom_plans.length > 0) {
          customPlans = [...specific.custom_plans];
        }
      }
    }

    // Display all custom plans saved in user's itinerary
    let myPlans = (customPlans && customPlans.length > 0) ? [...customPlans] : [];

    let displayPandals = [...pandalBookmarks];
    let displayFood = [...foodBookmarks];
    let displayPlans = [...myPlans];

    // Update Tab Badges & Dropdown Options
    const badgeAll = document.getElementById('saved-badge-all');
    const badgePandals = document.getElementById('saved-badge-pandals');
    const badgeFood = document.getElementById('saved-badge-food');
    const badgePlans = document.getElementById('saved-badge-plans');

    const totalCount = displayPandals.length + displayFood.length + displayPlans.length;
    if (badgeAll) badgeAll.textContent = totalCount;
    if (badgePandals) badgePandals.textContent = displayPandals.length;
    if (badgeFood) badgeFood.textContent = displayFood.length;
    if (badgePlans) badgePlans.textContent = displayPlans.length;

    // Synchronize Mobile Dropdown Options & Selected Value
    const savedDropdown = document.getElementById('saved-filter-dropdown');
    if (savedDropdown) {
      savedDropdown.value = activeSavedTab;
      const optAll = savedDropdown.querySelector('option[value="all"]');
      const optPandals = savedDropdown.querySelector('option[value="pandals"]');
      const optFood = savedDropdown.querySelector('option[value="food-shopping"]');
      const optPlans = savedDropdown.querySelector('option[value="plans"]');
      if (optAll) optAll.textContent = `✨ All Saved (${totalCount})`;
      if (optPandals) optPandals.textContent = `🏛️ Pandals & Transit (${displayPandals.length})`;
      if (optFood) optFood.textContent = `🍽️ Food & Shopping (${displayFood.length})`;
      if (optPlans) optPlans.textContent = `📋 Saved Plans (${displayPlans.length})`;
    }

    // Update active tab styling
    document.querySelectorAll('.saved-tab-btn').forEach(btn => {
      const cat = btn.dataset.category;
      if (cat === activeSavedTab) {
        btn.classList.add('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black', 'shadow-md');
        btn.classList.remove('bg-surface-container-high', 'text-on-surface', 'dark:bg-[#252016]', 'dark:text-[#f3ede2]');
      } else {
        btn.classList.remove('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black', 'shadow-md');
        btn.classList.add('bg-surface-container-high', 'text-on-surface', 'dark:bg-[#252016]', 'dark:text-[#f3ede2]');
      }
    });

    // When the itinerary is completely empty, show an inviting empty state
    if (totalCount === 0) {
      container.innerHTML = `
        <div class="glass-panel p-8 sm:p-12 rounded-3xl border border-outline-variant/30 dark:border-amber-400/20 text-center max-w-xl mx-auto my-6 space-y-5 reveal-on-scroll">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-400/10 dark:bg-amber-400/20 text-primary dark:text-amber-300 flex items-center justify-center mx-auto shadow-inner">
            <span class="material-symbols-outlined text-[36px] sm:text-[44px]">bookmark_border</span>
          </div>
          <div class="space-y-2">
            <h3 class="font-display text-xl sm:text-2xl font-bold text-on-surface dark:text-white">Your Puja Itinerary is Empty</h3>
            <p class="text-xs sm:text-sm text-on-surface-variant dark:text-[#ded5c7] leading-relaxed max-w-md mx-auto">
              You haven't saved any pandals, iconic dining spots, or festival plans yet. Explore Kolkata's festival highlights and tap the bookmark icon on any card to curate your personal itinerary!
            </p>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <a href="#pandals" onclick="document.querySelector('nav a[href=\\'#pandals\\']')?.click();" class="px-4 py-2.5 rounded-xl bg-primary text-white dark:bg-amber-400 dark:text-black font-bold text-xs shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">explore</span> Explore Pandals
            </a>
            <a href="#food-shopping" onclick="document.querySelector('nav a[href=\\'#food-shopping\\']')?.click();" class="px-4 py-2.5 rounded-xl bg-surface-container-high dark:bg-[#252016] text-on-surface dark:text-[#f3ede2] border border-outline-variant/30 dark:border-amber-400/30 font-bold text-xs hover:bg-surface-container-highest dark:hover:bg-[#322c20] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">restaurant</span> Discover Food Spots
            </a>
            <a href="#plans" onclick="document.querySelector('nav a[href=\\'#plans\\']')?.click();" class="px-4 py-2.5 rounded-xl bg-surface-container-high dark:bg-[#252016] text-on-surface dark:text-[#f3ede2] border border-outline-variant/30 dark:border-amber-400/30 font-bold text-xs hover:bg-surface-container-highest dark:hover:bg-[#322c20] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">event_note</span> Puja Plans
            </a>
          </div>
        </div>
      `;
      attachSavedItineraryTabEvents();
      initScrollReveal();
      return;
    }

    let html = '';

    // 1. PANDALS & TRANSIT SECTION (At least 3 side-by-side on laptop view)
    if (activeSavedTab === 'all' || activeSavedTab === 'pandals') {
      if (displayPandals.length > 0) {
        html += `
          <div class="space-y-3 sm:space-y-4">
            <div class="flex items-center justify-between border-b border-outline-variant/20 dark:border-amber-400/20 pb-2">
              <h3 class="font-display text-base sm:text-xl font-bold text-on-surface dark:text-white flex items-center gap-2">
                <span class="material-symbols-outlined text-primary dark:text-amber-300 text-[18px] sm:text-[22px]">explore</span>
                <span>Saved Pandals & Transit (${displayPandals.length})</span>
              </h3>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 saved-itinerary-grid">
              ${displayPandals.map((b) => {
                const pandalData = PANDALS_DATA.find(p => p.id === b.id || ((p.name || '').toLowerCase() === (b.name || '').toLowerCase()));
                const pandalImg = (pandalData && pandalData.image) 
                  ? pandalData.image 
                  : (b.image && !b.image.includes('unsplash.com') ? b.image : 'pandals/maniktala chaltabagan lohapatty.jpg');
                const pandalZone = (pandalData && pandalData.zone) ? pandalData.zone : (b.zone || 'North');
                const pandalTransit = (pandalData && pandalData.transit) ? pandalData.transit : (b.location || 'Kolkata Metro');
                const pandalLink = (pandalData && pandalData.locationUrl) ? pandalData.locationUrl : (b.link || '#');

                return `
                <div class="glass-panel p-2.5 sm:p-4 rounded-2.5xl sm:rounded-3xl border border-outline-variant/30 dark:border-amber-400/20 flex flex-col justify-between gap-2.5 sm:gap-3.5 reveal-on-scroll overflow-hidden group hover:shadow-lg hover:border-primary/50 dark:hover:border-amber-400/50 transition-all">
                  <div>
                    <!-- Pandal Picture Thumbnail -->
                    <div class="relative w-full h-24 sm:h-36 md:h-44 rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-2.5 bg-surface-container-high dark:bg-[#252016]">
                      <img src="${pandalImg}" alt="${b.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" onerror="this.src='pandals/maniktala chaltabagan lohapatty.jpg'" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                      <span class="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-white text-[8.5px] sm:text-[10px] font-bold border border-white/20 truncate max-w-[85%]">${pandalZone} Zone</span>
                    </div>
                    <h4 class="font-headline-md text-xs sm:text-base font-bold text-on-surface dark:text-white line-clamp-1 group-hover:text-primary dark:group-hover:text-amber-300 transition-colors" title="${b.name}">${b.name}</h4>
                    <p class="text-[10px] sm:text-xs text-on-surface-variant dark:text-[#ded5c7] flex items-center gap-1 font-medium truncate mt-0.5" title="${pandalTransit}">
                      <span class="material-symbols-outlined text-[13px] sm:text-[15px] text-primary dark:text-amber-300 shrink-0">near_me</span>
                      <span class="truncate">${pandalTransit}</span>
                    </p>
                  </div>
                  <div class="flex items-center justify-between gap-1 sm:gap-2 pt-2 sm:pt-3 border-t border-outline-variant/20 dark:border-amber-400/20 mt-auto">
                    <a href="${toMapsSearchUrl(pandalLink, b.name + ' Durga Puja Kolkata')}" target="_blank" rel="noopener noreferrer" class="flex-1 bg-amber-400 hover:bg-amber-300 text-black text-[10px] sm:text-xs font-bold py-1.5 px-1.5 sm:px-3 rounded-xl flex items-center justify-center gap-1 shadow-xs hover:shadow active:scale-95 transition-all cursor-pointer truncate" title="Search Location in Google Maps">
                      <img src="maps-pin.png" alt="Open in Maps" class="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 object-contain" />
                      <span class="truncate">Open in Maps</span>
                    </a>
                    <button class="remove-single-bookmark p-1 sm:p-1.5 rounded-lg border border-outline-variant/30 text-outline hover:text-error hover:bg-red-500/10 dark:text-[#ded5c7] dark:hover:text-red-400 transition-all cursor-pointer shrink-0" data-id="${b.id}" title="Remove">
                      <span class="material-symbols-outlined text-[16px] sm:text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              `;
              }).join('')}
            </div>
          </div>
        `;
      } else if (activeSavedTab === 'pandals') {
        html += `
          <div class="glass-panel p-8 sm:p-10 rounded-3xl border border-outline-variant/30 dark:border-amber-400/20 text-center max-w-lg mx-auto my-4 space-y-3">
            <div class="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-amber-400/20 text-primary dark:text-amber-300 flex items-center justify-center mx-auto">
              <span class="material-symbols-outlined text-[28px]">explore</span>
            </div>
            <h4 class="font-display text-base sm:text-lg font-bold text-on-surface dark:text-white">No Pandals Saved Yet</h4>
            <p class="text-xs sm:text-sm text-on-surface-variant dark:text-[#ded5c7]">Explore Kolkata's 100+ iconic pandals and tap the bookmark icon on any pandal to add it to your itinerary.</p>
            <a href="#pandals" onclick="document.querySelector('nav a[href=\\'#pandals\\']')?.click();" class="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-white dark:bg-amber-400 dark:text-black font-bold text-xs shadow-md cursor-pointer">
              <span class="material-symbols-outlined text-[15px]">explore</span> Explore Pandals
            </a>
          </div>
        `;
      }
    }

    // 2. FOOD & SHOPPING SECTION (At least 3 side-by-side on laptop view)
    if (activeSavedTab === 'all' || activeSavedTab === 'food-shopping') {
      if (displayFood.length > 0) {
        html += `
          <div class="space-y-3 sm:space-y-4 pt-4">
            <div class="flex items-center justify-between border-b border-outline-variant/20 dark:border-amber-400/20 pb-2">
              <h3 class="font-display text-base sm:text-xl font-bold text-on-surface dark:text-white flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary dark:text-amber-300 text-[18px] sm:text-[22px]">restaurant</span>
                <span>Saved Food & Shopping Spots (${displayFood.length})</span>
              </h3>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 saved-itinerary-grid">
              ${displayFood.map((b) => {
                const foodData = FOOD_DATA.find(f => f.id === b.id || ((f.name || '').toLowerCase() === (b.name || '').toLowerCase()));
                const shopData = SHOPPING_DATA.find(s => s.id === b.id || ((s.name || '').toLowerCase() === (b.name || '').toLowerCase()));
                const spotImg = (foodData && foodData.image) || (shopData && shopData.image) || (b.image && !b.image.includes('unsplash.com') ? b.image : 'food/arsalan.avif');
                const spotCat = (foodData && foodData.category) || (shopData && shopData.category) || b.category || 'Food & Shopping';
                const spotLoc = (foodData && foodData.location) || (shopData && shopData.location) || b.location || 'Kolkata';
                const spotLink = (foodData && foodData.locationUrl) || (shopData && shopData.locationUrl) || b.link || '#';

                return `
                <div class="glass-panel p-2.5 sm:p-4 rounded-2.5xl sm:rounded-3xl border border-outline-variant/30 dark:border-amber-400/20 flex flex-col justify-between gap-2.5 sm:gap-3.5 reveal-on-scroll overflow-hidden group hover:shadow-lg hover:border-primary/50 dark:hover:border-amber-400/50 transition-all">
                  <div>
                    <!-- Food/Shopping Picture Thumbnail -->
                    <div class="relative w-full h-24 sm:h-36 md:h-44 rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-2.5 bg-surface-container-high dark:bg-[#252016]">
                      <img src="${spotImg}" alt="${b.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" onerror="this.src='food/arsalan.avif'" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                      <span class="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-white text-[8.5px] sm:text-[10px] font-bold border border-white/20 truncate max-w-[85%]">${spotCat}</span>
                    </div>
                    <h4 class="font-headline-md text-xs sm:text-base font-bold text-on-surface dark:text-white line-clamp-1 group-hover:text-primary dark:group-hover:text-amber-300 transition-colors" title="${b.name}">${b.name}</h4>
                    <p class="text-[10px] sm:text-xs text-on-surface-variant dark:text-[#ded5c7] flex items-center gap-1 font-medium truncate mt-0.5" title="${spotLoc}">
                      <span class="material-symbols-outlined text-[13px] sm:text-[15px] text-secondary dark:text-amber-300 shrink-0">pin_drop</span>
                      <span class="truncate">${spotLoc}</span>
                    </p>
                  </div>
                  <div class="flex items-center justify-between gap-1 sm:gap-2 pt-2 sm:pt-3 border-t border-outline-variant/20 dark:border-amber-400/20 mt-auto">
                    <a href="${toMapsSearchUrl(spotLink, b.name + ' Kolkata')}" target="_blank" rel="noopener noreferrer" class="flex-1 bg-amber-400 hover:bg-amber-300 text-black text-[10px] sm:text-xs font-bold py-1.5 px-1.5 sm:px-3 rounded-xl flex items-center justify-center gap-1 shadow-xs hover:shadow active:scale-95 transition-all cursor-pointer truncate" title="Search Location in Google Maps">
                      <img src="maps-pin.png" alt="Open in Maps" class="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 object-contain" />
                      <span class="truncate">Open in Maps</span>
                    </a>
                    <button class="remove-single-bookmark p-1 sm:p-1.5 rounded-lg border border-outline-variant/30 text-outline hover:text-error hover:bg-red-500/10 dark:text-[#ded5c7] dark:hover:text-red-400 transition-all cursor-pointer shrink-0" data-id="${b.id}" title="Remove">
                      <span class="material-symbols-outlined text-[16px] sm:text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              `;
              }).join('')}
            </div>
          </div>
        `;
      } else if (activeSavedTab === 'food-shopping') {
        html += `
          <div class="glass-panel p-8 sm:p-10 rounded-3xl border border-outline-variant/30 dark:border-amber-400/20 text-center max-w-lg mx-auto my-4 space-y-3">
            <div class="w-14 h-14 rounded-2xl bg-secondary/10 dark:bg-amber-400/20 text-secondary dark:text-amber-300 flex items-center justify-center mx-auto">
              <span class="material-symbols-outlined text-[28px]">restaurant</span>
            </div>
            <h4 class="font-display text-base sm:text-lg font-bold text-on-surface dark:text-white">No Food & Shopping Spots Saved</h4>
            <p class="text-xs sm:text-sm text-on-surface-variant dark:text-[#ded5c7]">Bookmark Kolkata's legendary restaurants, roll hubs, and heritage mishti shops to build your festival trail.</p>
            <a href="#food-shopping" onclick="document.querySelector('nav a[href=\\'#food-shopping\\']')?.click();" class="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-white dark:bg-amber-400 dark:text-black font-bold text-xs shadow-md cursor-pointer">
              <span class="material-symbols-outlined text-[15px]">restaurant</span> Discover Food Spots
            </a>
          </div>
        `;
      }
    }

    // 3. SAVED / CUSTOM PLANS SECTION (At least 3 side-by-side on laptop view)
    if (activeSavedTab === 'all' || activeSavedTab === 'plans') {
      if (displayPlans.length > 0) {
        html += `
          <div class="space-y-3 sm:space-y-4 pt-4">
            <div class="flex items-center justify-between border-b border-outline-variant/20 dark:border-amber-400/20 pb-2">
              <h3 class="font-display text-base sm:text-xl font-bold text-on-surface dark:text-white flex items-center gap-2">
                <span class="material-symbols-outlined text-primary dark:text-amber-300 text-[18px] sm:text-[22px]">event_note</span>
                <span>Saved Puja Plans (${displayPlans.length})</span>
              </h3>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 saved-itinerary-grid">
              ${displayPlans.map((p) => {
                const pandalList = p.pandals || [];
                const foodList = p.food_stops || [];
                const isMine = isCurrentUserPlan(p, currentUser);
                const isMasterPlan = p.is_template || MASTER_PUJA_PLANS.some(mp => mp.id === p.id);
                const creatorNameText = isMine 
                  ? `You (${p.creator_name || (currentUser && currentUser.username) || 'Devotee'})` 
                  : (p.creator_name || 'Devotee');

                return `
                <div id="itinerary-plan-${p.id}" class="glass-panel p-3 sm:p-5 rounded-2.5xl sm:rounded-3xl border border-outline-variant/30 dark:border-amber-400/20 flex flex-col justify-between gap-3 reveal-on-scroll hover:shadow-lg hover:border-primary/50 dark:hover:border-amber-400/50 transition-all">
                  <div>
                    <!-- Prominent Creator Banner -->
                    <div class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface-container-high/90 dark:bg-[#252016]/90 border border-outline-variant/30 dark:border-amber-400/25 mb-2.5 shadow-xs" title="Created by: ${escapeHtml(p.creator_name || 'Devotee')}">
                      <span class="text-xs shrink-0">${p.creator_avatar || '🌺'}</span>
                      <span class="text-[10px] sm:text-[11px] font-semibold text-on-surface dark:text-[#ded5c7] truncate">
                        Created by: <span class="font-bold text-primary dark:text-amber-300">${escapeHtml(creatorNameText)}</span>
                      </span>
                    </div>

                    <div class="flex items-center justify-between gap-1 mb-1">
                      <span class="px-2.5 py-0.5 rounded-full bg-primary/10 dark:bg-amber-400/20 text-primary dark:text-amber-300 text-[9.5px] sm:text-[11px] font-bold truncate">${escapeHtml(p.day_tag || 'Puja Plan')}</span>
                      <span class="text-[8.5px] sm:text-xs text-on-surface-variant/70 dark:text-[#ded5c7]/60 truncate shrink-0">${escapeHtml(p.date_str || '')}</span>
                    </div>

                    <h4 class="font-headline-md text-xs sm:text-base font-bold text-on-surface dark:text-white line-clamp-2 mt-1 mb-1">${escapeHtml(p.title || 'Untitled Plan')}</h4>
                    
                    <p class="text-[9.5px] sm:text-xs text-on-surface-variant/80 dark:text-[#ded5c7]/80 flex items-center gap-1 font-medium truncate mt-0.5">
                      <span class="material-symbols-outlined text-[13px] text-primary dark:text-amber-300 shrink-0">temple_hindu</span>
                      <span>${pandalList.length} Pandals</span>
                      ${foodList.length > 0 ? `<span>• 🍽️ ${foodList.length} Food</span>` : ''}
                    </p>
                    ${p.route_summary ? `<p class="text-[9.5px] sm:text-xs text-primary dark:text-amber-300 truncate mt-1 flex items-center gap-1">
                      <span class="material-symbols-outlined text-[12px] sm:text-[14px] shrink-0">near_me</span>
                      <span class="truncate">${escapeHtml(p.route_summary)}</span>
                    </p>` : ''}
                  </div>

                  <div class="pt-2.5 border-t border-outline-variant/20 dark:border-amber-400/20 flex items-center justify-between gap-1 mt-auto">
                    <button onclick="window.openViewPlanModal('${p.id}')" class="text-[10px] sm:text-xs font-bold text-primary dark:text-amber-300 hover:underline flex items-center gap-0.5 cursor-pointer">
                      <span class="material-symbols-outlined text-[14px]">visibility</span>
                      <span>View Plan</span>
                    </button>
                    <div class="flex items-center gap-2">
                      <button onclick="event.stopPropagation(); window.openSharePlanModal('${p.id}')" class="text-primary dark:text-amber-300 hover:text-primary-container text-[10px] sm:text-xs font-semibold cursor-pointer flex items-center gap-0.5" title="Share Plan">
                        <span class="material-symbols-outlined text-[14px]">share</span>
                        <span>Share</span>
                      </button>
                      ${isMine ? `
                        <button onclick="event.stopPropagation(); window.deleteCustomPlan('${p.id}')" class="text-red-500 hover:text-red-600 dark:text-red-400 text-[10px] sm:text-xs font-semibold cursor-pointer flex items-center gap-0.5" title="Delete Plan (Removes from Database & Receivers)">
                          <span class="material-symbols-outlined text-[14px]">delete</span>
                          <span>Delete</span>
                        </button>
                      ` : `
                        <button onclick="event.stopPropagation(); window.removePlanFromItinerary('${p.id}')" class="text-outline hover:text-error dark:text-[#ded5c7] dark:hover:text-red-400 text-[10px] sm:text-xs font-semibold cursor-pointer flex items-center gap-0.5" title="Remove from Itinerary">
                          <span class="material-symbols-outlined text-[14px]">delete</span>
                          <span>Remove</span>
                        </button>
                      `}
                    </div>
                  </div>
                </div>
              `;
              }).join('')}
            </div>
          </div>
        `;
      } else if (activeSavedTab === 'plans') {
        html += `
          <div class="glass-panel p-8 sm:p-10 rounded-3xl border border-outline-variant/30 dark:border-amber-400/20 text-center max-w-lg mx-auto my-4 space-y-3">
            <div class="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-amber-400/20 text-primary dark:text-amber-300 flex items-center justify-center mx-auto">
              <span class="material-symbols-outlined text-[28px]">event_note</span>
            </div>
            <h4 class="font-display text-base sm:text-lg font-bold text-on-surface dark:text-white">No Custom Plans in Itinerary</h4>
            <p class="text-xs sm:text-sm text-on-surface-variant dark:text-[#ded5c7]">Build your own personalized Puja itinerary with custom pandals and food pit-stops, or save a plan shared by your friends.</p>
            <button onclick="document.getElementById('open-create-plan-btn').click()" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white dark:bg-amber-400 dark:text-black font-bold text-xs shadow-md cursor-pointer">
              <span class="material-symbols-outlined text-[15px]">add_circle</span> Make Your Own Plan
            </button>
          </div>
        `;
      }
    }

    container.innerHTML = html;
    attachSavedItineraryTabEvents();
    attachSavedItineraryItemEvents(displayPandals, displayFood);
    initScrollReveal();
  }

  // --- 11. DETAILS MODAL HANDLER ---
  function openDetailModal(item, type = 'pandal') {
    document.body.classList.add('modal-open');
    const modal = document.getElementById('pandal-detail-modal');
    if (!modal) return;

    modal.querySelector('#modal-pandal-img').src = item.image;
    modal.querySelector('#modal-pandal-title').textContent = item.name;

    const crowdBadge = modal.querySelector('#modal-pandal-crowd');
    const estContainer = modal.querySelector('#modal-pandal-est')?.closest('div');

    if (type === 'pandal') {
      modal.querySelector('#modal-pandal-zone').innerHTML = `<span class="material-symbols-outlined text-[13px] inline-block align-middle mr-1">location_on</span>${item.zone} Zone`;
      if (crowdBadge) crowdBadge.classList.add('hidden');
      modal.querySelector('#modal-pandal-theme').textContent = item.theme;
      if (estContainer) estContainer.classList.add('hidden');
      modal.querySelector('#modal-pandal-transit').textContent = item.transit;
      modal.querySelector('#modal-pandal-highlights').textContent = item.highlights;
    } else if (type === 'food') {
      modal.querySelector('#modal-pandal-zone').innerHTML = `<span class="material-symbols-outlined text-[13px] inline-block align-middle mr-1">restaurant</span>${item.categoryLabel}`;
      if (crowdBadge) {
        crowdBadge.classList.remove('hidden');
        crowdBadge.innerHTML = `<span class="material-symbols-outlined text-[13px] inline-block align-middle mr-1">schedule</span>${item.timings}`;
      }
      modal.querySelector('#modal-pandal-theme').textContent = item.desc;
      if (estContainer) estContainer.classList.add('hidden');
      modal.querySelector('#modal-pandal-transit').textContent = `${item.location} • ${item.metro}`;
      modal.querySelector('#modal-pandal-highlights').textContent = item.mustTry;
    } else if (type === 'shop') {
      modal.querySelector('#modal-pandal-zone').innerHTML = `<span class="material-symbols-outlined text-[13px] inline-block align-middle mr-1">shopping_bag</span>${item.typeLabel}`;
      if (crowdBadge) crowdBadge.classList.add('hidden');
      modal.querySelector('#modal-pandal-theme').textContent = item.desc;
      if (estContainer) estContainer.classList.add('hidden');
      modal.querySelector('#modal-pandal-transit').textContent = `${item.location} • ${item.metro}`;
      modal.querySelector('#modal-pandal-highlights').textContent = item.highlight;
    }

    // Nearby Pandals section — shown only for food/restaurants, hidden for shop & pandal
    const nearbySection = modal.querySelector('#modal-nearby-pandals-section');
    const nearbyList = modal.querySelector('#modal-nearby-pandals-list');
    if (nearbySection && nearbyList) {
      if (type === 'food' && item.nearbyPandals && item.nearbyPandals.length > 0) {
        nearbyList.innerHTML = item.nearbyPandals.map(p => `
          <a
            href="${toMapsSearchUrl(p.url, p.name + ' Durga Puja Kolkata')}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/8 dark:bg-amber-400/10 border border-primary/20 dark:border-amber-400/25 text-[10px] sm:text-xs font-semibold text-primary dark:text-amber-300 hover:bg-primary/15 dark:hover:bg-amber-400/20 transition-all"
            title="Search ${escapeHtml(p.name)} on Google Maps"
          >
            <span class="material-symbols-outlined text-[12px]">location_on</span>
            ${p.name}
          </a>
        `).join('');
        nearbySection.classList.remove('hidden');
      } else {
        nearbyList.innerHTML = '';
        nearbySection.classList.add('hidden');
      }
    }

    modal.querySelector('#modal-pandal-nav-btn').href = toMapsSearchUrl(item.locationUrl, (item.name || '') + ' Kolkata');
    modal.querySelector('#modal-pandal-nav-btn').title = `Search ${escapeHtml(item.name || '')} on Google Maps`;
    const shareBtn = modal.querySelector('#modal-pandal-share-btn');
    if (shareBtn) {
      if (type === 'food') {
        shareBtn.title = `Share ${escapeHtml(item.name || 'Food Destination')}`;
      } else if (type === 'shop') {
        shareBtn.title = `Share ${escapeHtml(item.name || 'Shopping District')}`;
      } else {
        shareBtn.title = `Share ${escapeHtml(item.name || 'Puja Pandal & Transit')}`;
      }
    }
    window.currentDetailModalItem = item;
    window.currentDetailModalType = type;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  // --- 12. ROUTING & TAB NAVIGATION ---
  function handleRouting() {
    // 1. Check URL query parameters (?plan=..., ?pandal=..., ?food=..., ?shop=...)
    const urlParams = new URLSearchParams(window.location.search);
    const queryPlan = urlParams.get('plan');
    const queryPandal = urlParams.get('pandal');
    const queryFood = urlParams.get('food');
    const queryShop = urlParams.get('shop');

    // 2. Check URL hash (#plan=..., #pandal=..., #food=..., #shop=...)
    const rawHash = window.location.hash.slice(1) || '';
    let hashPlan = null;
    let hashPandal = null;
    let hashFood = null;
    let hashShop = null;
    if (rawHash.startsWith('plan=')) {
      hashPlan = rawHash.slice(5);
    } else if (rawHash.startsWith('pandal=')) {
      hashPandal = rawHash.slice(7);
    } else if (rawHash.startsWith('food=')) {
      hashFood = rawHash.slice(5);
    } else if (rawHash.startsWith('shop=')) {
      hashShop = rawHash.slice(5);
    }

    const targetPlan = queryPlan || hashPlan;
    const targetPandal = queryPandal || hashPandal;
    const targetFood = queryFood || hashFood;
    const targetShop = queryShop || hashShop;

    const validSections = ['home', 'pandals', 'plans', 'audio', 'food-shopping', 'rituals', 'saved', 'login'];
    const isExplicitSectionNav = validSections.includes(rawHash);

    // If user explicitly navigated to a section other than plans/pandals/food-shopping, prioritize user navigation and clear lingering deep link query params!
    if (isExplicitSectionNav && rawHash !== 'plans' && rawHash !== 'pandals' && rawHash !== 'food-shopping') {
      if (queryPlan || queryPandal || queryFood || queryShop) {
        window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
      }
    } else if (targetPlan) {
      handleSharedPlanDeepLink(targetPlan);
      return;
    } else if (targetPandal) {
      handleSharedPandalDeepLink(targetPandal);
      return;
    } else if (targetFood) {
      handleSharedFoodDeepLink(targetFood);
      return;
    } else if (targetShop) {
      handleSharedShopDeepLink(targetShop);
      return;
    }

    const effectiveHash = rawHash || 'home';
    if (effectiveHash === 'login' || effectiveHash === 'account') {
      if (currentUser) {
        openProfileModal();
      }
    }

    const activeSection = validSections.includes(rawHash) ? rawHash : 'home';

    document.querySelectorAll('.app-section').forEach(sec => {
      sec.classList.add('hidden');
    });

    const targetEl = document.getElementById(`section-${activeSection}`);
    if (targetEl) {
      targetEl.classList.remove('hidden');
      targetEl.classList.add('tab-content');
    }

    document.querySelectorAll('[data-nav-target]').forEach(link => {
      // When rituals is active, highlight 'home' yellow in the menu per user specifications
      const effectiveSection = activeSection === 'rituals' ? 'home' : activeSection;
      const isTarget = link.dataset.navTarget === effectiveSection;
      if (isTarget) {
        link.classList.add('text-primary', 'dark:text-amber-300', 'font-bold');
        link.classList.remove('text-on-surface-variant', 'font-normal');
      } else {
        link.classList.remove('text-primary', 'dark:text-amber-300', 'font-bold');
        link.classList.add('text-on-surface-variant', 'font-normal');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (activeSection === 'plans') {
      renderFestivalPlans();
    } else if (activeSection === 'saved') {
      renderSavedItinerary();
    } else if (activeSection === 'food-shopping') {
      renderFoodAndShopping();
    } else if (activeSection === 'rituals') {
      renderRituals();
    }

    setTimeout(initScrollReveal, 60);
  }

  // Curated Spotify & YouTube Durga Puja Playlists & Songs
  const PUJA_RADIO_PLAYLISTS = {
    sharodiya: {
      id: '7EFTbXOZuUZEqdt5cMwaH5',
      name: 'Sharodiya hits',
      songCount: 21,
      spotifyUrl: 'https://open.spotify.com/playlist/7EFTbXOZuUZEqdt5cMwaH5?si=YBxuDKpVR22HV8vvie_UMg&utm_source=whatsapp',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/7EFTbXOZuUZEqdt5cMwaH5?utm_source=generator&theme=0',
      youtubeUrl: 'https://www.youtube.com/watch?v=sf6usUybi3k&list=PLNW14fSkx0r8',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/sf6usUybi3k?list=PLNW14fSkx0r8&autoplay=1&enablejsapi=1',
      cover: 'radio/dugga_ma_asche.jpg',
      description: 'Festive Bengali chartbusters, dhak rhythms, and celebratory pandal anthems.'
    },
    mahalaya: {
      id: '5dUPbjW2MgX96HUlQX81Xs',
      name: 'Mahalaya',
      songCount: 11,
      spotifyUrl: 'https://open.spotify.com/playlist/5dUPbjW2MgX96HUlQX81Xs?si=BlPUrpc2S3aqv_2As2-Xig&utm_source=whatsapp',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/5dUPbjW2MgX96HUlQX81Xs?utm_source=generator&theme=0',
      youtubeUrl: 'https://www.youtube.com/watch?v=8FytVk54-dw&list=PLJVPabLHUolo',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/8FytVk54-dw?list=PLJVPabLHUolo&autoplay=1&enablejsapi=1',
      cover: 'radio/durga_vandana.jpg',
      description: 'The eternal dawn Mahishasuramardini, sacred Vedic stotras, and Birendra Krishna Bhadra invocation.'
    }
  };
  const SPOTIFY_PLAYLISTS = PUJA_RADIO_PLAYLISTS;

  const PUJA_RADIO_SONGS = [
    {
      id: '0qo204uS81FwkIQDYkQfCi',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Dugga Ma Asche',
      duration: '3:33',
      spotifyTrackId: '0qo204uS81FwkIQDYkQfCi',
      spotifyUrl: 'https://open.spotify.com/track/0qo204uS81FwkIQDYkQfCi',
      embedUrl: 'https://open.spotify.com/embed/track/0qo204uS81FwkIQDYkQfCi?utm_source=generator&theme=0',
      youtubeId: 'sf6usUybi3k',
      youtubeUrl: 'https://www.youtube.com/watch?v=sf6usUybi3k',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/sf6usUybi3k?autoplay=1&enablejsapi=1',
      cover: 'radio/dugga_ma_asche.jpg'
    },
    {
      id: '0Z9Ok50nu5nxyJPP9jZqPM',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Dugga Ma',
      duration: '4:30',
      spotifyTrackId: '0Z9Ok50nu5nxyJPP9jZqPM',
      spotifyUrl: 'https://open.spotify.com/track/0Z9Ok50nu5nxyJPP9jZqPM',
      embedUrl: 'https://open.spotify.com/embed/track/0Z9Ok50nu5nxyJPP9jZqPM?utm_source=generator&theme=0',
      youtubeId: 'sPuZ0Q3KDWo',
      youtubeUrl: 'https://www.youtube.com/watch?v=sPuZ0Q3KDWo',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/sPuZ0Q3KDWo?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b27327fe75746b882c2cf91b7624'
    },
    {
      id: '0nspNLUZLF1RwbpP7uIwox',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Dhak Baja Kashor Baja',
      duration: '4:25',
      spotifyTrackId: '0nspNLUZLF1RwbpP7uIwox',
      spotifyUrl: 'https://open.spotify.com/track/0nspNLUZLF1RwbpP7uIwox',
      embedUrl: 'https://open.spotify.com/embed/track/0nspNLUZLF1RwbpP7uIwox?utm_source=generator&theme=0',
      youtubeId: 'id5_3dKvEBg',
      youtubeUrl: 'https://www.youtube.com/watch?v=id5_3dKvEBg',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/id5_3dKvEBg?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b27321792f8da1279de3b03b4b80'
    },
    {
      id: '14mxoVNHA77ja4bre40T1p',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Dugga Elo',
      duration: '2:26',
      spotifyTrackId: '14mxoVNHA77ja4bre40T1p',
      spotifyUrl: 'https://open.spotify.com/track/14mxoVNHA77ja4bre40T1p',
      embedUrl: 'https://open.spotify.com/embed/track/14mxoVNHA77ja4bre40T1p?utm_source=generator&theme=0',
      youtubeId: 'xlElO06nQy8',
      youtubeUrl: 'https://www.youtube.com/watch?v=xlElO06nQy8',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/xlElO06nQy8?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273877df1f4d86607531a93ead2'
    },
    {
      id: '1xcq7GEsaUKGNiK7NQliB9',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Aamaar Dugga',
      duration: '3:19',
      spotifyTrackId: '1xcq7GEsaUKGNiK7NQliB9',
      spotifyUrl: 'https://open.spotify.com/track/1xcq7GEsaUKGNiK7NQliB9',
      embedUrl: 'https://open.spotify.com/embed/track/1xcq7GEsaUKGNiK7NQliB9?utm_source=generator&theme=0',
      youtubeId: '4h5DXcN6cd4',
      youtubeUrl: 'https://www.youtube.com/watch?v=4h5DXcN6cd4',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/4h5DXcN6cd4?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273a0ae69b032b80eb175748db2'
    },
    {
      id: '0dJGrIiwlyshcRuvMddU66',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Hote Paare Na',
      duration: '5:13',
      spotifyTrackId: '0dJGrIiwlyshcRuvMddU66',
      spotifyUrl: 'https://open.spotify.com/track/0dJGrIiwlyshcRuvMddU66',
      embedUrl: 'https://open.spotify.com/embed/track/0dJGrIiwlyshcRuvMddU66?utm_source=generator&theme=0',
      youtubeId: '6GY5s8DbBlg',
      youtubeUrl: 'https://www.youtube.com/watch?v=6GY5s8DbBlg',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/6GY5s8DbBlg?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b27327fe75746b882c2cf91b7624'
    },
    {
      id: '6HNbprsATKyydJ7YdrLuPd',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Ebar Jeno Onno Rokom Pujo',
      duration: '3:32',
      spotifyTrackId: '6HNbprsATKyydJ7YdrLuPd',
      spotifyUrl: 'https://open.spotify.com/track/6HNbprsATKyydJ7YdrLuPd',
      embedUrl: 'https://open.spotify.com/embed/track/6HNbprsATKyydJ7YdrLuPd?utm_source=generator&theme=0',
      youtubeId: 'E2zfQEo7Q_M',
      youtubeUrl: 'https://www.youtube.com/watch?v=E2zfQEo7Q_M',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/E2zfQEo7Q_M?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273dff82889c347a6db8a7e4fe5'
    },
    {
      id: '5gGAG8v5UAeUW7kxq9BK0y',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Gouri Elo Dekhe Jalo',
      duration: '5:39',
      spotifyTrackId: '5gGAG8v5UAeUW7kxq9BK0y',
      spotifyUrl: 'https://open.spotify.com/track/5gGAG8v5UAeUW7kxq9BK0y',
      embedUrl: 'https://open.spotify.com/embed/track/5gGAG8v5UAeUW7kxq9BK0y?utm_source=generator&theme=0',
      youtubeId: 'asdoVzpUFsE',
      youtubeUrl: 'https://www.youtube.com/watch?v=asdoVzpUFsE',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/asdoVzpUFsE?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273aff57a62be756269cad3f23b'
    },
    {
      id: '21rIO2dhW37d8CVJBT0Ass',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Elo Je Maa',
      duration: '5:07',
      spotifyTrackId: '21rIO2dhW37d8CVJBT0Ass',
      spotifyUrl: 'https://open.spotify.com/track/21rIO2dhW37d8CVJBT0Ass',
      embedUrl: 'https://open.spotify.com/embed/track/21rIO2dhW37d8CVJBT0Ass?utm_source=generator&theme=0',
      youtubeId: '2U416kTo0as',
      youtubeUrl: 'https://www.youtube.com/watch?v=2U416kTo0as',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/2U416kTo0as?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273bccb335165d31c982c1d5919'
    },
    {
      id: '0lbpCmeKfDa8O8rwezno3i',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Dhaker Taley',
      duration: '4:42',
      spotifyTrackId: '0lbpCmeKfDa8O8rwezno3i',
      spotifyUrl: 'https://open.spotify.com/track/0lbpCmeKfDa8O8rwezno3i',
      embedUrl: 'https://open.spotify.com/embed/track/0lbpCmeKfDa8O8rwezno3i?utm_source=generator&theme=0',
      youtubeId: 'hbXuXt7gkFY',
      youtubeUrl: 'https://www.youtube.com/watch?v=hbXuXt7gkFY',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/hbXuXt7gkFY?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b2734c8f943b782b3cfc146125e4'
    },
    {
      id: '5dOHCKsalASHbAn2mZCWgq',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Ailo Uma Barite',
      duration: '3:52',
      spotifyTrackId: '5dOHCKsalASHbAn2mZCWgq',
      spotifyUrl: 'https://open.spotify.com/track/5dOHCKsalASHbAn2mZCWgq',
      embedUrl: 'https://open.spotify.com/embed/track/5dOHCKsalASHbAn2mZCWgq?utm_source=generator&theme=0',
      youtubeId: '4zyCkmAS1Oo',
      youtubeUrl: 'https://www.youtube.com/watch?v=4zyCkmAS1Oo',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/4zyCkmAS1Oo?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b27312369566acbeabf040cd9ef0'
    },
    {
      id: '6XbWY7TpYBcdBCBiTOh5EA',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Dakatiya Banshi (From "Bohurupi")',
      duration: '3:56',
      spotifyTrackId: '6XbWY7TpYBcdBCBiTOh5EA',
      spotifyUrl: 'https://open.spotify.com/track/6XbWY7TpYBcdBCBiTOh5EA',
      embedUrl: 'https://open.spotify.com/embed/track/6XbWY7TpYBcdBCBiTOh5EA?utm_source=generator&theme=0',
      youtubeId: 'wF9oo8dJ5t4',
      youtubeUrl: 'https://www.youtube.com/watch?v=wF9oo8dJ5t4',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/wF9oo8dJ5t4?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b2730f9df00be51e525670195af5'
    },
    {
      id: '4MQPlquCDaltOs006z65aG',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Jaago Uma',
      duration: '5:17',
      spotifyTrackId: '4MQPlquCDaltOs006z65aG',
      spotifyUrl: 'https://open.spotify.com/track/4MQPlquCDaltOs006z65aG',
      embedUrl: 'https://open.spotify.com/embed/track/4MQPlquCDaltOs006z65aG?utm_source=generator&theme=0',
      youtubeId: 'OWhOsOHQjY0',
      youtubeUrl: 'https://www.youtube.com/watch?v=OWhOsOHQjY0',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/OWhOsOHQjY0?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273facb0bc10d8032ba2d4996ea'
    },
    {
      id: '5fN2XXtz5pAHo0iRTMfQnj',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Aamaar Dugga (Festive Single)',
      duration: '3:19',
      spotifyTrackId: '5fN2XXtz5pAHo0iRTMfQnj',
      spotifyUrl: 'https://open.spotify.com/track/5fN2XXtz5pAHo0iRTMfQnj',
      embedUrl: 'https://open.spotify.com/embed/track/5fN2XXtz5pAHo0iRTMfQnj?utm_source=generator&theme=0',
      youtubeId: '4h5DXcN6cd4',
      youtubeUrl: 'https://www.youtube.com/watch?v=4h5DXcN6cd4',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/4h5DXcN6cd4?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273a0ae69b032b80eb175748db2'
    },
    {
      id: '7hQN6fL1OI0L6O2qkfTsBk',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Emon Madhur Sandhyay',
      duration: '5:43',
      spotifyTrackId: '7hQN6fL1OI0L6O2qkfTsBk',
      spotifyUrl: 'https://open.spotify.com/track/7hQN6fL1OI0L6O2qkfTsBk',
      embedUrl: 'https://open.spotify.com/embed/track/7hQN6fL1OI0L6O2qkfTsBk?utm_source=generator&theme=0',
      youtubeId: 'uBNSBgO-Imw',
      youtubeUrl: 'https://www.youtube.com/watch?v=uBNSBgO-Imw',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/uBNSBgO-Imw?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b27388eb8bd72f0b5f649c941797'
    },
    {
      id: '17gIko1QQ6f19KFdLfy29u',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Aar Koto Raat Eka Thakbo',
      duration: '6:13',
      spotifyTrackId: '17gIko1QQ6f19KFdLfy29u',
      spotifyUrl: 'https://open.spotify.com/track/17gIko1QQ6f19KFdLfy29u',
      embedUrl: 'https://open.spotify.com/embed/track/17gIko1QQ6f19KFdLfy29u?utm_source=generator&theme=0',
      youtubeId: '64vvyOokAn4',
      youtubeUrl: 'https://www.youtube.com/watch?v=64vvyOokAn4',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/64vvyOokAn4?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b27327f30dba0f8f29ef9a080177'
    },
    {
      id: '5uOOUslPTmopqWmfxHwTYS',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Gold Priter Sari',
      duration: '5:46',
      spotifyTrackId: '5uOOUslPTmopqWmfxHwTYS',
      spotifyUrl: 'https://open.spotify.com/track/5uOOUslPTmopqWmfxHwTYS',
      embedUrl: 'https://open.spotify.com/embed/track/5uOOUslPTmopqWmfxHwTYS?utm_source=generator&theme=0',
      youtubeId: 'zoAIg8_5Cto',
      youtubeUrl: 'https://www.youtube.com/watch?v=zoAIg8_5Cto',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/zoAIg8_5Cto?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b2734084058303be1a2542d3f556'
    },
    {
      id: '3xZ0zNtVRhWY4ukiMC3bRh',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Ashtami Te Tomar Paray',
      duration: '3:53',
      spotifyTrackId: '3xZ0zNtVRhWY4ukiMC3bRh',
      spotifyUrl: 'https://open.spotify.com/track/3xZ0zNtVRhWY4ukiMC3bRh',
      embedUrl: 'https://open.spotify.com/embed/track/3xZ0zNtVRhWY4ukiMC3bRh?utm_source=generator&theme=0',
      youtubeId: 'yD0dpeS1eak',
      youtubeUrl: 'https://www.youtube.com/watch?v=yD0dpeS1eak',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/yD0dpeS1eak?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b27336c009c80b6fe5ea98a6a2ec'
    },
    {
      id: '38HoPYFgz9RbYWItrKxsVo',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Sei Raate Raat Chhilo Purnima',
      duration: '4:05',
      spotifyTrackId: '38HoPYFgz9RbYWItrKxsVo',
      spotifyUrl: 'https://open.spotify.com/track/38HoPYFgz9RbYWItrKxsVo',
      embedUrl: 'https://open.spotify.com/embed/track/38HoPYFgz9RbYWItrKxsVo?utm_source=generator&theme=0',
      youtubeId: '07BadGcIEe4',
      youtubeUrl: 'https://www.youtube.com/watch?v=07BadGcIEe4',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/07BadGcIEe4?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b27306f8db75dac07d9bbb5cbb79'
    },
    {
      id: '1sTggjsam1Q59GYhLmtmLp',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Nilanjana - I - Se Pratham Prem',
      duration: '5:35',
      spotifyTrackId: '1sTggjsam1Q59GYhLmtmLp',
      spotifyUrl: 'https://open.spotify.com/track/1sTggjsam1Q59GYhLmtmLp',
      embedUrl: 'https://open.spotify.com/embed/track/1sTggjsam1Q59GYhLmtmLp?utm_source=generator&theme=0',
      youtubeId: '2SsglpexdZM',
      youtubeUrl: 'https://www.youtube.com/watch?v=2SsglpexdZM',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/2SsglpexdZM?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b2735b5399e2b75b3d21550949db'
    },
    {
      id: '3in4LAp0Tcq9NRfpr7EKjm',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Bolo Dugga Elo',
      duration: '3:19',
      spotifyTrackId: '3in4LAp0Tcq9NRfpr7EKjm',
      spotifyUrl: 'https://open.spotify.com/track/3in4LAp0Tcq9NRfpr7EKjm',
      embedUrl: 'https://open.spotify.com/embed/track/3in4LAp0Tcq9NRfpr7EKjm?utm_source=generator&theme=0',
      youtubeId: 'PiMa4BW9Vrw',
      youtubeUrl: 'https://www.youtube.com/watch?v=PiMa4BW9Vrw',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/PiMa4BW9Vrw?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b2735eeab3e4aab3f8bec5f40493'
    },
    {
      id: '0BAwwUhO60U01O9c1OxHfe',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Tabo Achintya Rupa - Charita - Mahima',
      duration: '3:58',
      spotifyTrackId: '0BAwwUhO60U01O9c1OxHfe',
      spotifyUrl: 'https://open.spotify.com/track/0BAwwUhO60U01O9c1OxHfe',
      embedUrl: 'https://open.spotify.com/embed/track/0BAwwUhO60U01O9c1OxHfe?utm_source=generator&theme=0',
      youtubeId: '6rwF1iQPVzc',
      youtubeUrl: 'https://www.youtube.com/watch?v=6rwF1iQPVzc',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/6rwF1iQPVzc?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b2732a497efb96016d4d26cb83b4'
    },
    {
      id: '3w0q9HtvdnU19IdAbOl1XQ',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Ogo Amar Agamani - Alo',
      duration: '3:19',
      spotifyTrackId: '3w0q9HtvdnU19IdAbOl1XQ',
      spotifyUrl: 'https://open.spotify.com/track/3w0q9HtvdnU19IdAbOl1XQ',
      embedUrl: 'https://open.spotify.com/embed/track/3w0q9HtvdnU19IdAbOl1XQ?utm_source=generator&theme=0',
      youtubeId: '2RZZzJdzGPM',
      youtubeUrl: 'https://www.youtube.com/watch?v=2RZZzJdzGPM',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/2RZZzJdzGPM?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b2732a497efb96016d4d26cb83b4'
    },
    {
      id: '0hJmNTKYGevHLMIWvCUE8c',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Jago Durga Dashapraharanadharinee',
      duration: '1:47',
      spotifyTrackId: '0hJmNTKYGevHLMIWvCUE8c',
      spotifyUrl: 'https://open.spotify.com/track/0hJmNTKYGevHLMIWvCUE8c',
      embedUrl: 'https://open.spotify.com/embed/track/0hJmNTKYGevHLMIWvCUE8c?utm_source=generator&theme=0',
      youtubeId: 'IfSJy3_Lkuo',
      youtubeUrl: 'https://www.youtube.com/watch?v=IfSJy3_Lkuo',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/IfSJy3_Lkuo?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b2732a497efb96016d4d26cb83b4'
    },
    {
      id: '3FrWOsMayIJcPWduMVEVF6',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Bajlo Tomar Aalor Benu With Narration',
      duration: '4:23',
      spotifyTrackId: '3FrWOsMayIJcPWduMVEVF6',
      spotifyUrl: 'https://open.spotify.com/track/3FrWOsMayIJcPWduMVEVF6',
      embedUrl: 'https://open.spotify.com/embed/track/3FrWOsMayIJcPWduMVEVF6?utm_source=generator&theme=0',
      youtubeId: 'IlerrCPk_0Y',
      youtubeUrl: 'https://www.youtube.com/watch?v=IlerrCPk_0Y',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/IlerrCPk_0Y?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273759df1fcaea412cb5dbd5dca'
    },
    {
      id: '2ArskmlOgluJZ86RD1z0qq',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Simhastha Sashisekhara',
      duration: '0:54',
      spotifyTrackId: '2ArskmlOgluJZ86RD1z0qq',
      spotifyUrl: 'https://open.spotify.com/track/2ArskmlOgluJZ86RD1z0qq',
      embedUrl: 'https://open.spotify.com/embed/track/2ArskmlOgluJZ86RD1z0qq?utm_source=generator&theme=0',
      youtubeId: 'dQZrQ-za8Gc',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQZrQ-za8Gc',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQZrQ-za8Gc?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273c958a88351e5c690101ec1f9'
    },
    {
      id: '0SEnZ1JaMXSQr32TOupRQF',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Ya Chandi',
      duration: '1:36',
      spotifyTrackId: '0SEnZ1JaMXSQr32TOupRQF',
      spotifyUrl: 'https://open.spotify.com/track/0SEnZ1JaMXSQr32TOupRQF',
      embedUrl: 'https://open.spotify.com/embed/track/0SEnZ1JaMXSQr32TOupRQF?utm_source=generator&theme=0',
      youtubeId: '8FytVk54-dw',
      youtubeUrl: 'https://www.youtube.com/watch?v=8FytVk54-dw',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/8FytVk54-dw?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273c958a88351e5c690101ec1f9'
    },
    {
      id: '4mnYGUG890pny5QTjCaZWr',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Aham Rudrebhirvasubhischara',
      duration: '3:59',
      spotifyTrackId: '4mnYGUG890pny5QTjCaZWr',
      spotifyUrl: 'https://open.spotify.com/track/4mnYGUG890pny5QTjCaZWr',
      embedUrl: 'https://open.spotify.com/embed/track/4mnYGUG890pny5QTjCaZWr?utm_source=generator&theme=0',
      youtubeId: 'GJccKU4_5wg',
      youtubeUrl: 'https://www.youtube.com/watch?v=GJccKU4_5wg',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/GJccKU4_5wg?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273c958a88351e5c690101ec1f9'
    },
    {
      id: '2iKRC4L9MihhRVlGBRb3H8',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Subhra Sankha - Rabe',
      duration: '2:48',
      spotifyTrackId: '2iKRC4L9MihhRVlGBRb3H8',
      spotifyUrl: 'https://open.spotify.com/track/2iKRC4L9MihhRVlGBRb3H8',
      embedUrl: 'https://open.spotify.com/embed/track/2iKRC4L9MihhRVlGBRb3H8?utm_source=generator&theme=0',
      youtubeId: 'FVmMOP9dKQM',
      youtubeUrl: 'https://www.youtube.com/watch?v=FVmMOP9dKQM',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/FVmMOP9dKQM?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273c958a88351e5c690101ec1f9'
    },
    {
      id: '5CGYig9Hg49EL6g6NlxNhv',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Jaya Jaya Japyajaye',
      duration: '2:31',
      spotifyTrackId: '5CGYig9Hg49EL6g6NlxNhv',
      spotifyUrl: 'https://open.spotify.com/track/5CGYig9Hg49EL6g6NlxNhv',
      embedUrl: 'https://open.spotify.com/embed/track/5CGYig9Hg49EL6g6NlxNhv?utm_source=generator&theme=0',
      youtubeId: 'AB4IUcvuEXs',
      youtubeUrl: 'https://www.youtube.com/watch?v=AB4IUcvuEXs',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/AB4IUcvuEXs?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273c958a88351e5c690101ec1f9'
    },
    {
      id: '742moqjpE88LUEAs1W9yVY',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Akhila - Bimane Taba Jaya - Gane',
      duration: '4:01',
      spotifyTrackId: '742moqjpE88LUEAs1W9yVY',
      spotifyUrl: 'https://open.spotify.com/track/742moqjpE88LUEAs1W9yVY',
      embedUrl: 'https://open.spotify.com/embed/track/742moqjpE88LUEAs1W9yVY?utm_source=generator&theme=0',
      youtubeId: 'FrHp3pXxeNU',
      youtubeUrl: 'https://www.youtube.com/watch?v=FrHp3pXxeNU',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/FrHp3pXxeNU?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273c958a88351e5c690101ec1f9'
    },
    {
      id: '0a7c4amhDaDZlaJqSwIu7f',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Jatajutasamayuktamardhendukrita - Sekharam',
      duration: '2:15',
      spotifyTrackId: '0a7c4amhDaDZlaJqSwIu7f',
      spotifyUrl: 'https://open.spotify.com/track/0a7c4amhDaDZlaJqSwIu7f',
      embedUrl: 'https://open.spotify.com/embed/track/0a7c4amhDaDZlaJqSwIu7f?utm_source=generator&theme=0',
      youtubeId: 'h5O3igngxCU',
      youtubeUrl: 'https://www.youtube.com/watch?v=h5O3igngxCU',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/h5O3igngxCU?autoplay=1&enablejsapi=1',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273c958a88351e5c690101ec1f9'
    }
  ];

  const YOUTUBE_TRACK_IDS = {
    '0qo204uS81FwkIQDYkQfCi': 'sf6usUybi3k', // Dugga Ma Asche
    '0Z9Ok50nu5nxyJPP9jZqPM': 'sPuZ0Q3KDWo', // Dugga Ma
    '0nspNLUZLF1RwbpP7uIwox': 'id5_3dKvEBg', // Dhak Baja Kashor Baja
    '14mxoVNHA77ja4bre40T1p': 'xlElO06nQy8', // Dugga Elo
    '1xcq7GEsaUKGNiK7NQliB9': '4h5DXcN6cd4', // Aamaar Dugga
    '0dJGrIiwlyshcRuvMddU66': '6GY5s8DbBlg', // Hote Paare Na
    '6HNbprsATKyydJ7YdrLuPd': 'E2zfQEo7Q_M', // Ebar Jeno Onno Rokom Pujo
    '5gGAG8v5UAeUW7kxq9BK0y': 'asdoVzpUFsE', // Gouri Elo Dekhe Jalo
    '21rIO2dhW37d8CVJBT0Ass': '2U416kTo0as', // Elo Je Maa
    '0lbpCmeKfDa8O8rwezno3i': 'hbXuXt7gkFY', // Dhaker Taley
    '5dOHCKsalASHbAn2mZCWgq': '4zyCkmAS1Oo', // Ailo Uma Barite
    '6XbWY7TpYBcdBCBiTOh5EA': 'wF9oo8dJ5t4', // Dakatiya Banshi (From "Bohurupi")
    '4MQPlquCDaltOs006z65aG': 'OWhOsOHQjY0', // Jaago Uma
    '5fN2XXtz5pAHo0iRTMfQnj': '4h5DXcN6cd4', // Aamaar Dugga (Festive Single)
    '7hQN6fL1OI0L6O2qkfTsBk': 'uBNSBgO-Imw', // Emon Madhur Sandhyay
    '17gIko1QQ6f19KFdLfy29u': '64vvyOokAn4', // Aar Koto Raat Eka Thakbo
    '5uOOUslPTmopqWmfxHwTYS': 'zoAIg8_5Cto', // Gold Priter Sari
    '3xZ0zNtVRhWY4ukiMC3bRh': 'yD0dpeS1eak', // Ashtami Te Tomar Paray
    '38HoPYFgz9RbYWItrKxsVo': '07BadGcIEe4', // Sei Raate Raat Chhilo Purnima
    '1sTggjsam1Q59GYhLmtmLp': '2SsglpexdZM', // Nilanjana - I - Se Pratham Prem
    '3in4LAp0Tcq9NRfpr7EKjm': 'PiMa4BW9Vrw', // Bolo Dugga Elo
    '0BAwwUhO60U01O9c1OxHfe': '6rwF1iQPVzc', // Tabo Achintya Rupa - Charita - Mahima
    '3w0q9HtvdnU19IdAbOl1XQ': '2RZZzJdzGPM', // Ogo Amar Agamani - Alo
    '0hJmNTKYGevHLMIWvCUE8c': 'IfSJy3_Lkuo', // Jago Durga Dashapraharanadharinee
    '3FrWOsMayIJcPWduMVEVF6': 'IlerrCPk_0Y', // Bajlo Tomar Aalor Benu With Narration
    '2ArskmlOgluJZ86RD1z0qq': 'dQZrQ-za8Gc', // Simhastha Sashisekhara
    '0SEnZ1JaMXSQr32TOupRQF': '8FytVk54-dw', // Ya Chandi
    '4mnYGUG890pny5QTjCaZWr': 'GJccKU4_5wg', // Aham Rudrebhirvasubhischara
    '2iKRC4L9MihhRVlGBRb3H8': 'FVmMOP9dKQM', // Subhra Sankha - Rabe
    '5CGYig9Hg49EL6g6NlxNhv': 'AB4IUcvuEXs', // Jaya Jaya Japyajaye
    '742moqjpE88LUEAs1W9yVY': 'FrHp3pXxeNU', // Akhila - Bimane Taba Jaya - Gane
    '0a7c4amhDaDZlaJqSwIu7f': 'h5O3igngxCU', // Jatajutasamayuktamardhendukrita - Sekharam
  };

  // Initialize YouTube playback endpoints for all tracks
  PUJA_RADIO_SONGS.forEach(song => {
    const ytId = YOUTUBE_TRACK_IDS[song.id];
    if (ytId) {
      song.youtubeId = ytId;
      song.youtubeUrl = `https://www.youtube.com/watch?v=${ytId}`;
      song.youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&enablejsapi=1`;
    } else {
      const q = encodeURIComponent(`${song.title} Durga Puja`);
      song.youtubeUrl = `https://www.youtube.com/results?search_query=${q}`;
      const parentPl = PUJA_RADIO_PLAYLISTS[song.playlist];
      song.youtubeEmbedUrl = parentPl ? parentPl.youtubeEmbedUrl : `https://www.youtube-nocookie.com/embed/sf6usUybi3k?list=PLNW14fSkx0r8&autoplay=1&enablejsapi=1`;
    }
  });

  let activeRadioSongId = null;
  let activeRadioItem = null; // { type: 'song', song } or { type: 'playlist', playlist, key }
  let activeRadioEngine = 'spotify'; // 'spotify' or 'youtube'

  function updateActiveRadioPlayer() {
    if (!activeRadioItem) return;
    const activeBox = document.getElementById('radio-active-player-box');
    const titleEl = document.getElementById('active-song-title');
    const artistEl = document.getElementById('active-song-artist');
    const badgeEl = document.getElementById('active-song-playlist-badge');
    const sourceBadgeEl = document.getElementById('active-song-source-badge');
    const sourceIconEl = document.getElementById('active-player-source-icon');
    const visualizerEl = document.getElementById('active-song-visualizer');
    const playerHolder = document.getElementById('radio-yt-player-holder');
    const extLinksEl = document.getElementById('active-song-external-links');
    const spotifyBtn = document.getElementById('radio-toggle-spotify-btn');
    const youtubeBtn = document.getElementById('radio-toggle-youtube-btn');

    if (!activeBox || !playerHolder) return;

    activeBox.classList.remove('hidden');
    activeBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (visualizerEl) visualizerEl.classList.add('is-playing');

    // Update stream engine switcher UI
    if (activeRadioEngine === 'spotify') {
      if (spotifyBtn) {
        spotifyBtn.className = "px-2.5 py-1 rounded-lg bg-[#1DB954]/25 text-[#1DB954] dark:text-[#1ed760] font-bold text-[11px] flex items-center gap-1 border border-[#1DB954]/40 cursor-pointer shadow-xs transition-all";
      }
      if (youtubeBtn) {
        youtubeBtn.className = "px-2.5 py-1 rounded-lg bg-surface-container-high dark:bg-[#252016] text-on-surface-variant dark:text-[#ded5c7] hover:text-[#FF0000] font-semibold text-[11px] flex items-center gap-1 border border-outline-variant/30 dark:border-amber-400/20 cursor-pointer transition-all";
      }
      if (sourceBadgeEl) {
        sourceBadgeEl.textContent = 'Spotify Stream';
        sourceBadgeEl.className = 'text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#1DB954]/20 text-[#1DB954] dark:text-[#1ed760]';
      }
      if (sourceIconEl) {
        sourceIconEl.className = 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1DB954] text-white flex items-center justify-center font-bold shadow-md shrink-0';
        sourceIconEl.innerHTML = `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`;
      }
    } else {
      if (youtubeBtn) {
        youtubeBtn.className = "px-2.5 py-1 rounded-lg bg-[#FF0000]/20 text-[#FF0000] dark:text-[#ff4e4e] font-bold text-[11px] flex items-center gap-1 border border-[#FF0000]/40 cursor-pointer shadow-xs transition-all";
      }
      if (spotifyBtn) {
        spotifyBtn.className = "px-2.5 py-1 rounded-lg bg-surface-container-high dark:bg-[#252016] text-on-surface-variant dark:text-[#ded5c7] hover:text-[#1DB954] font-semibold text-[11px] flex items-center gap-1 border border-outline-variant/30 dark:border-amber-400/20 cursor-pointer transition-all";
      }
      if (sourceBadgeEl) {
        sourceBadgeEl.textContent = 'YouTube Video';
        sourceBadgeEl.className = 'text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FF0000]/20 text-[#FF0000] dark:text-[#ff4e4e]';
      }
      if (sourceIconEl) {
        sourceIconEl.className = 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FF0000] text-white flex items-center justify-center font-bold shadow-md shrink-0';
        sourceIconEl.innerHTML = `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`;
      }
    }

    if (activeRadioItem.type === 'song') {
      const song = activeRadioItem.song;
      if (titleEl) titleEl.textContent = song.title;
      if (artistEl) {
        artistEl.textContent = '';
        artistEl.classList.add('hidden');
      }
      if (badgeEl) badgeEl.textContent = `• ${song.playlistName}`;

      if (extLinksEl) {
        extLinksEl.innerHTML = '';
      }

      if (activeRadioEngine === 'spotify') {
        playerHolder.innerHTML = `
          <iframe 
            style="border-radius: 16px;" 
            src="${song.embedUrl}" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            class="w-full rounded-2xl shadow-lg"
          ></iframe>
        `;
      } else {
        playerHolder.innerHTML = `
          <iframe 
            width="100%" 
            height="220" 
            src="${song.youtubeEmbedUrl}" 
            title="${song.title}"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen 
            class="w-full rounded-2xl shadow-lg"
          ></iframe>
        `;
      }
    } else if (activeRadioItem.type === 'playlist') {
      const pl = activeRadioItem.playlist;
      if (titleEl) titleEl.textContent = pl.name;
      if (artistEl) {
        artistEl.textContent = pl.description;
        artistEl.classList.remove('hidden');
      }
      if (badgeEl) badgeEl.textContent = `• Official Playlist`;

      if (extLinksEl) {
        extLinksEl.innerHTML = '';
      }

      if (activeRadioEngine === 'spotify') {
        playerHolder.innerHTML = `
          <iframe 
            style="border-radius: 16px;" 
            src="${pl.spotifyEmbedUrl}" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            class="w-full rounded-2xl shadow-xl"
          ></iframe>
        `;
      } else {
        playerHolder.innerHTML = `
          <iframe 
            width="100%" 
            height="260" 
            src="${pl.youtubeEmbedUrl}" 
            title="${pl.name}"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen 
            class="w-full rounded-2xl shadow-xl"
          ></iframe>
        `;
      }
    }
  }

  function focusActiveRadioPlayer() {
    const activeBox = document.getElementById('radio-active-player-box');
    if (activeBox) {
      setTimeout(() => {
        activeBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        activeBox.classList.add('player-active-pulse', 'ring-2', 'ring-primary', 'dark:ring-amber-400');
        setTimeout(() => {
          activeBox.classList.remove('player-active-pulse', 'ring-2', 'ring-primary', 'dark:ring-amber-400');
        }, 2000);
      }, 150);
    }
  }

  function playRadioSong(song, engine) {
    activeRadioSongId = song.id;
    activeRadioItem = { type: 'song', song };
    if (engine) activeRadioEngine = engine;
    updateActiveRadioPlayer();
    showToast(`Streaming "${song.title}" on ${activeRadioEngine === 'youtube' ? 'YouTube' : 'Spotify'}`, 'graphic_eq');
  }

  function playRadioPlaylist(playlistKey, engine) {
    const pl = PUJA_RADIO_PLAYLISTS[playlistKey];
    if (!pl) return;
    activeRadioItem = { type: 'playlist', playlist: pl, key: playlistKey };
    if (engine) activeRadioEngine = engine;
    updateActiveRadioPlayer();
    showToast(`Streaming "${pl.name}" on ${activeRadioEngine === 'youtube' ? 'YouTube' : 'Spotify'}`, 'graphic_eq');
  }

  window.playRadioPlaylist = function(playlistKey, engine = 'spotify') {
    const audioSec = document.getElementById('section-audio');
    if (audioSec && audioSec.classList.contains('hidden')) {
      window.location.hash = 'audio';
    }
    playRadioPlaylist(playlistKey, engine);
    focusActiveRadioPlayer();
  };

  window.playRadioSongById = function(songId, engine = 'spotify') {
    const song = PUJA_RADIO_SONGS.find(s => s.id === songId);
    if (!song) return;
    const audioSec = document.getElementById('section-audio');
    if (audioSec && audioSec.classList.contains('hidden')) {
      window.location.hash = 'audio';
    }
    playRadioSong(song, engine);
    focusActiveRadioPlayer();
  };

  window.playSpotifyPlaylist = function(playlistKey) {
    window.playRadioPlaylist(playlistKey, 'spotify');
  };

  function renderPujaRadioSongs() {
    const sharodiyaContainer = document.getElementById('radio-songs-sharodiya-list') || document.getElementById('radio-songs-hiphop-list');
    const mahalayaContainer = document.getElementById('radio-songs-mahalaya-list');
    const legacyList = document.getElementById('puja-radio-songs-list');

    const renderSongItem = (song, index) => `
      <div 
        class="glass-panel p-2 sm:p-3 rounded-2xl border border-outline-variant/30 dark:border-amber-400/20 hover:border-[#1DB954]/50 dark:hover:border-amber-400/50 transition-all flex flex-col justify-between gap-2 group hover:shadow-md cursor-pointer"
        id="song-card-${song.id}"
        onclick="window.playRadioSongById('${song.id}')"
      >
        <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div class="w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden shrink-0 shadow-sm border border-outline-variant/20 dark:border-amber-400/20 relative">
            <img 
              src="${song.cover}" 
              alt="${song.title}" 
              loading="lazy" 
              decoding="async" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              onerror="this.src='logo.jpg'"
            />
            <div class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span class="material-symbols-outlined text-white text-[16px]">play_arrow</span>
            </div>
          </div>
          <div class="min-w-0 flex-1">
            <h4 class="font-display font-bold text-xs sm:text-sm text-on-surface dark:text-white truncate group-hover:text-primary dark:group-hover:text-amber-300 transition-colors" title="${song.title}">${song.title}</h4>
            <div class="flex items-center gap-1.5 mt-1">
              <span class="text-[9px] font-mono text-on-surface-variant/70 dark:text-[#ded5c7]/60">${song.duration}</span>
              <span class="text-[8px] font-bold px-1.5 py-0.2 rounded-full ${song.playlist === 'sharodiya' ? 'bg-[#1DB954]/15 text-[#1DB954] dark:text-[#1ed760]' : 'bg-amber-400/15 text-primary dark:text-amber-300'}">${index + 1}</span>
            </div>
          </div>
        </div>

        <!-- In-Website Stream Actions: Spotify & YouTube (No play button, streams directly on website player) -->
        <div class="flex items-center justify-end gap-1.5 pt-1.5 border-t border-outline-variant/20 dark:border-amber-400/15" onclick="event.stopPropagation()">
          <button 
            type="button"
            class="play-song-spotify-btn w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1DB954]/15 hover:bg-[#1DB954] text-[#1DB954] hover:text-white dark:bg-[#1DB954]/25 dark:hover:bg-[#1DB954] dark:text-[#1ed760] dark:hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            data-song-id="${song.id}"
            title="Stream Track on Spotify Player"
          >
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
          </button>
          <button 
            type="button"
            class="play-song-yt-btn w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FF0000]/15 hover:bg-[#FF0000] text-[#FF0000] hover:text-white dark:bg-[#FF0000]/25 dark:hover:bg-[#FF0000] dark:text-[#ff4e4e] dark:hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            data-song-id="${song.id}"
            title="Stream Track on YouTube Player"
          >
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </button>
        </div>
      </div>
    `;

    const sharodiyaSongs = PUJA_RADIO_SONGS.filter(s => s.playlist === 'sharodiya');
    const mahalayaSongs = PUJA_RADIO_SONGS.filter(s => s.playlist === 'mahalaya');

    if (sharodiyaContainer) sharodiyaContainer.innerHTML = sharodiyaSongs.map(renderSongItem).join('');
    if (mahalayaContainer) mahalayaContainer.innerHTML = mahalayaSongs.map(renderSongItem).join('');
    if (legacyList) legacyList.innerHTML = PUJA_RADIO_SONGS.map(renderSongItem).join('');

    // Attach stream handlers
    document.querySelectorAll('.play-song-spotify-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const songId = btn.dataset.songId;
        const song = PUJA_RADIO_SONGS.find(s => s.id === songId);
        if (song) {
          playRadioSong(song, 'spotify');
          focusActiveRadioPlayer();
        }
      });
    });

    document.querySelectorAll('.play-song-yt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const songId = btn.dataset.songId;
        const song = PUJA_RADIO_SONGS.find(s => s.id === songId);
        if (song) {
          playRadioSong(song, 'youtube');
          focusActiveRadioPlayer();
        }
      });
    });

    // Attach play entire playlist handlers
    document.querySelectorAll('.play-entire-playlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const playlistKey = btn.dataset.playlist;
        if (playlistKey) playRadioPlaylist(playlistKey);
      });
    });
  }

  // ========================================================
  // PLAYLIST DETAIL & SONGS MODAL ENGINE
  // ========================================================
  window.openPlaylistDetailModal = function(playlistKey) {
    const modal = document.getElementById('playlist-detail-modal');
    if (!modal) return;

    const pl = PUJA_RADIO_PLAYLISTS[playlistKey] || {
      name: playlistKey === 'mahalaya' ? 'Mahalaya' : 'Sharodiya hits',
      title: playlistKey === 'mahalaya' ? 'Mahalaya' : 'Sharodiya hits',
      description: playlistKey === 'mahalaya' 
        ? 'The eternal dawn Mahishasuramardini, Vedic stotras, and Chandi Path chants.' 
        : 'Festive Bengali chartbusters, dhak rhythms, and celebratory pandal anthems.',
      cover: playlistKey === 'mahalaya' 
        ? 'radio/durga_vandana.jpg' 
        : 'radio/dugga_ma_asche.jpg',
      spotifyUrl: playlistKey === 'mahalaya'
        ? 'https://open.spotify.com/playlist/5dUPbjW2MgX96HUlQX81Xs?si=BlPUrpc2S3aqv_2As2-Xig&utm_source=whatsapp'
        : 'https://open.spotify.com/playlist/7EFTbXOZuUZEqdt5cMwaH5?si=YBxuDKpVR22HV8vvie_UMg&utm_source=whatsapp',
      youtubeUrl: playlistKey === 'mahalaya'
        ? 'https://www.youtube.com/watch?v=8FytVk54-dw&list=PLJVPabLHUolo'
        : 'https://www.youtube.com/watch?v=sf6usUybi3k&list=PLNW14fSkx0r8'
    };

    const songs = PUJA_RADIO_SONGS.filter(s => s.playlist === playlistKey);

    const coverEl = document.getElementById('pl-modal-cover');
    const titleEl = document.getElementById('pl-modal-title');
    const descEl = document.getElementById('pl-modal-desc');
    const countEl = document.getElementById('pl-modal-count');
    const spotifyBtn = document.getElementById('pl-modal-spotify-btn');
    const youtubeBtn = document.getElementById('pl-modal-youtube-btn');
    const playAllBtn = document.getElementById('pl-modal-play-all-btn');

    if (coverEl) coverEl.src = pl.cover;
    if (titleEl) titleEl.textContent = pl.name || pl.title;
    const headerTitleEl = document.getElementById('pl-modal-header-title');
    if (headerTitleEl) headerTitleEl.textContent = pl.name || pl.title;
    if (descEl) descEl.textContent = pl.description || '';
    if (countEl) countEl.textContent = `${songs.length} Tracks`;

    // Direct streaming on website player from modal header
    if (spotifyBtn) {
      spotifyBtn.onclick = (e) => {
        e.stopPropagation();
        closePlaylistDetailModal();
        const audioSec = document.getElementById('section-audio');
        if (audioSec && audioSec.classList.contains('hidden')) {
          window.location.hash = 'audio';
        }
        playRadioPlaylist(playlistKey, 'spotify');
        focusActiveRadioPlayer();
      };
    }
    if (youtubeBtn) {
      youtubeBtn.onclick = (e) => {
        e.stopPropagation();
        closePlaylistDetailModal();
        const audioSec = document.getElementById('section-audio');
        if (audioSec && audioSec.classList.contains('hidden')) {
          window.location.hash = 'audio';
        }
        playRadioPlaylist(playlistKey, 'youtube');
        focusActiveRadioPlayer();
      };
    }

    if (playAllBtn) {
      playAllBtn.onclick = () => {
        // 1. Close playlist detail modal immediately
        closePlaylistDetailModal();

        // 2. Ensure Puja Radio tab is visible
        const audioSec = document.getElementById('section-audio');
        if (audioSec && audioSec.classList.contains('hidden')) {
          window.location.hash = 'audio';
        }

        // 3. Play playlist on player
        playRadioPlaylist(playlistKey);

        // 4. Smoothly focus on and pulse player box so user sees it actively playing
        focusActiveRadioPlayer();

        showToast(`🎶 Streaming ${pl.name || pl.title} on Akalbodhon player!`, 'celebration');
      };
    }

    const tracklistEl = document.getElementById('playlist-modal-tracklist');
    if (tracklistEl) {
      tracklistEl.innerHTML = songs.map((song, idx) => `
        <div onclick="window.playSongFromPlaylistModal('${song.id}', 'spotify')" class="glass-panel p-2.5 sm:p-3 rounded-2xl border border-outline-variant/30 dark:border-amber-400/20 hover:border-primary/50 dark:hover:border-amber-400/50 transition-all flex items-center justify-between gap-2.5 group hover:shadow-md cursor-pointer">
          <div class="flex items-center gap-2.5 min-w-0 flex-1">
            <span class="text-xs font-mono font-bold text-on-surface-variant/60 dark:text-amber-400/60 w-5 text-center shrink-0">${idx + 1}</span>
            <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shrink-0 shadow-sm border border-outline-variant/20 dark:border-amber-400/20 relative">
              <img src="${song.cover}" alt="${song.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='logo.jpg'" loading="lazy" decoding="async" />
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="font-display font-bold text-xs sm:text-sm text-on-surface dark:text-white break-words leading-snug group-hover:text-primary dark:group-hover:text-amber-300 transition-colors" title="${song.title}">
                ${song.title}
              </h4>
              <span class="text-[9px] font-mono text-on-surface-variant/70 dark:text-[#ded5c7]/60 mt-0.5 block">${song.duration}</span>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0" onclick="event.stopPropagation()">
            <!-- Spotify Track Button (Streams directly on in-website player) -->
            <button 
              type="button"
              onclick="event.stopPropagation(); window.playSongFromPlaylistModal('${song.id}', 'spotify')" 
              class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1DB954]/15 hover:bg-[#1DB954] text-[#1DB954] hover:text-white dark:bg-[#1DB954]/25 dark:hover:bg-[#1DB954] dark:text-[#1ed760] dark:hover:text-black flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Stream on Spotify Player"
            >
              <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            </button>

            <!-- YouTube Track Button (Streams directly on in-website player) -->
            <button 
              type="button"
              onclick="event.stopPropagation(); window.playSongFromPlaylistModal('${song.id}', 'youtube')" 
              class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FF0000]/15 hover:bg-[#FF0000] text-[#FF0000] hover:text-white dark:bg-[#FF0000]/25 dark:hover:bg-[#FF0000] dark:text-[#ff4e4e] dark:hover:text-white flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Stream on YouTube Player"
            >
              <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </button>
          </div>
        </div>
      `).join('');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('modal-open');
  };

  window.closePlaylistDetailModal = function() {
    const modal = document.getElementById('playlist-detail-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    document.body.classList.remove('modal-open');
  };

  window.playSongFromPlaylistModal = function(songId, engine = 'spotify') {
    const song = PUJA_RADIO_SONGS.find(s => s.id === songId);
    if (!song) return;

    // 1. Close playlist detail modal immediately so user returns to the page
    if (typeof window.closePlaylistDetailModal === 'function') {
      window.closePlaylistDetailModal();
    }

    // 2. Ensure user is on the Puja Radio section
    const audioSec = document.getElementById('section-audio');
    if (audioSec && audioSec.classList.contains('hidden')) {
      window.location.hash = 'audio';
    }

    // 3. Play chosen song on website player with selected engine
    playRadioSong(song, engine);

    // 4. Return to and smoothly center on active player with visual pulse
    focusActiveRadioPlayer();
  };

  // --- 13. AUDIO & RADIO CONTROLLER ---
  function initAudioHub() {
    renderPujaRadioSongs();

    // Close playlist detail modal on backdrop click
    const plModal = document.getElementById('playlist-detail-modal');
    if (plModal) {
      plModal.addEventListener('click', (e) => {
        if (e.target === plModal) window.closePlaylistDetailModal();
      });
    }

    // Toggle stream engine (Spotify vs YouTube) in active player
    const spotifyToggleBtn = document.getElementById('radio-toggle-spotify-btn');
    const youtubeToggleBtn = document.getElementById('radio-toggle-youtube-btn');
    const closePlayerBtn = document.getElementById('close-radio-player-btn');

    if (spotifyToggleBtn) {
      spotifyToggleBtn.addEventListener('click', () => {
        activeRadioEngine = 'spotify';
        updateActiveRadioPlayer();
      });
    }

    if (youtubeToggleBtn) {
      youtubeToggleBtn.addEventListener('click', () => {
        activeRadioEngine = 'youtube';
        updateActiveRadioPlayer();
      });
    }

    if (closePlayerBtn) {
      closePlayerBtn.addEventListener('click', () => {
        const activeBox = document.getElementById('radio-active-player-box');
        const playerHolder = document.getElementById('radio-yt-player-holder');
        const visualizerEl = document.getElementById('active-song-visualizer');
        if (activeBox) activeBox.classList.add('hidden');
        if (playerHolder) playerHolder.innerHTML = '';
        if (visualizerEl) visualizerEl.classList.remove('is-playing');
      });
    }

    // --- YOUTUBE ANTHEM PLAYER ENGINE ("Dugga Elo" by Monali Thakur) ---
    // --- MAHALAYA BROADCAST (BIRENDRA KRISHNA BHADRA) ENGINE ---
    const mahalayaChandiBtn = document.getElementById('mahalaya-chandi-jump-btn');
    const mahalayaStartBtn = document.getElementById('mahalaya-start-jump-btn');
    const mahalayaIframe = document.getElementById('mahalaya-youtube-iframe');

    if (mahalayaChandiBtn && mahalayaIframe) {
      mahalayaChandiBtn.addEventListener('click', () => {
        mahalayaIframe.src = 'https://www.youtube-nocookie.com/embed/YQyo8QeoYhc?start=558&autoplay=1&rel=0&enablejsapi=1';
        showToast('Playing Mahalaya: Chandi Path (9:18) — Birendra Krishna Bhadra', 'graphic_eq');
      });
    }

    if (mahalayaStartBtn && mahalayaIframe) {
      mahalayaStartBtn.addEventListener('click', () => {
        mahalayaIframe.src = 'https://www.youtube-nocookie.com/embed/YQyo8QeoYhc?start=0&autoplay=1&rel=0&enablejsapi=1';
        showToast('Playing Mahalaya from beginning — Birendra Krishna Bhadra', 'graphic_eq');
      });
    }

    // Hero Secondary Ceremonial Dhak Button (Synthesizer)
    const heroDhakBtn = document.getElementById('hero-dhak-btn');
    if (heroDhakBtn) {
      heroDhakBtn.addEventListener('click', () => {
        const icon = heroDhakBtn.querySelector('.material-symbols-outlined');
        if (!soundEngine.isDhakLooping) {
          soundEngine.startDhakLoop();
          if (icon) icon.textContent = 'pause';
          heroDhakBtn.classList.add('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black');
          showToast('Ceremonial Dhak rhythmic loop active!', 'album');
        } else {
          soundEngine.stopDhakLoop();
          if (icon) icon.textContent = 'album';
          heroDhakBtn.classList.remove('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black');
        }
      });
    }

    // --- 14. HIGHLIGHT BROADCAST: MAHALAYA (SAREGAMA BENGALI) ---
    const mahalayaPlayBtn = document.getElementById('mahalaya-play-btn');
    const mahalayaVisualizer = document.getElementById('mahalaya-audio-visualizer');
    const mahalayaProgressBar = document.getElementById('mahalaya-progress-bar');
    const mahalayaProgressContainer = document.getElementById('mahalaya-progress-container');
    const mahalayaTimeCurrent = document.getElementById('mahalaya-time-current');
    const mahalayaContainer = document.getElementById('mahalaya-player-container');
    
    let isMahalayaPlaying = false;
    let mahalayaDuration = 5325; // 1:28:45 in seconds
    let mahalayaTimer = null;

    if (mahalayaPlayBtn) {
      mahalayaPlayBtn.addEventListener('click', () => {
        isMahalayaPlaying = !isMahalayaPlaying;
        const icon = mahalayaPlayBtn.querySelector('.material-symbols-outlined');

        if (isMahalayaPlaying) {
          if (icon) icon.textContent = 'pause';
          if (mahalayaVisualizer) mahalayaVisualizer.classList.add('is-playing');
          if (mahalayaContainer) {
            mahalayaContainer.classList.remove('hidden');
            mahalayaContainer.innerHTML = `
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/YQyo8QeoYhc?autoplay=1&enablejsapi=1&playsinline=1&modestbranding=1&rel=0" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                class="w-full h-full rounded-2xl"
              ></iframe>
            `;
          }
          showToast('Now Broadcasting: Mahalaya (Mahishasuramardini) — Saregama Bengali', 'graphic_eq');
        } else {
          if (icon) icon.textContent = 'play_arrow';
          if (mahalayaVisualizer) mahalayaVisualizer.classList.remove('is-playing');
          if (mahalayaContainer) {
            mahalayaContainer.innerHTML = '';
            mahalayaContainer.classList.add('hidden');
          }
        }
      });
    }
  }

  // --- 14. THEME TOGGLE (LIGHT / DARK) & CENTER-SCREEN ANIMATION ---
  function playCenterThemeAnimation(isDark) {
    const container = document.getElementById('theme-switch-anim-container');
    const badge = document.getElementById('theme-switch-anim-badge');
    if (!container || !badge) return;

    badge.className = 'relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 transition-transform';

    if (isDark) {
      badge.classList.add('bg-[#140f09]', 'border-amber-400', 'text-amber-300');
      badge.style.boxShadow = '0 0 30px rgba(251, 191, 36, 0.28)';
      badge.innerHTML = `
        <div class="relative w-full h-full flex items-center justify-center pointer-events-none">
          <svg class="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] text-amber-400/40 anim-ray-spin" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="44" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 6"/>
            <circle cx="50" cy="6" r="2.5" fill="currentColor"/>
            <circle cx="50" cy="94" r="2.5" fill="currentColor"/>
            <circle cx="6" cy="50" r="2.5" fill="currentColor"/>
            <circle cx="94" cy="50" r="2.5" fill="currentColor"/>
          </svg>
          <span class="material-symbols-outlined text-5xl sm:text-6xl text-amber-300">dark_mode</span>
        </div>
      `;
    } else {
      badge.classList.add('bg-[#fffdf7]', 'border-amber-500', 'text-amber-500');
      badge.style.boxShadow = '0 0 30px rgba(245, 158, 11, 0.25)';
      badge.innerHTML = `
        <div class="relative w-full h-full flex items-center justify-center pointer-events-none">
          <svg class="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] text-amber-500/40 anim-ray-spin" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="44" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 6"/>
            <circle cx="50" cy="6" r="2.5" fill="currentColor"/>
            <circle cx="50" cy="94" r="2.5" fill="currentColor"/>
            <circle cx="6" cy="50" r="2.5" fill="currentColor"/>
            <circle cx="94" cy="50" r="2.5" fill="currentColor"/>
          </svg>
          <span class="material-symbols-outlined text-5xl sm:text-6xl text-amber-500">light_mode</span>
        </div>
      `;
    }

    container.classList.remove('hidden');
    badge.classList.remove('theme-burst-active');
    void badge.offsetWidth;
    badge.classList.add('theme-burst-active');

    clearTimeout(container._hideTimeout);
    container._hideTimeout = setTimeout(() => {
      container.classList.add('hidden');
      badge.classList.remove('theme-burst-active');
    }, 850);
  }

  function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const savedTheme = localStorage.getItem(Storage.KEY_THEME) || 'light';
    const isDarkInitial = savedTheme === 'dark';

    if (isDarkInitial) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }

    if (themeBtn) {
      const icon = themeBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = isDarkInitial ? 'light_mode' : 'dark_mode';

      themeBtn.addEventListener('click', () => {
        const isDark = !document.documentElement.classList.contains('dark');

        // Fade icon out, switch, fade back in
        if (icon) {
          icon.style.opacity = '0';
          icon.style.transform = 'rotate(90deg) scale(0.7)';
          setTimeout(() => {
            icon.textContent = isDark ? 'light_mode' : 'dark_mode';
            icon.style.opacity = '1';
            icon.style.transform = 'rotate(0deg) scale(1)';
          }, 180);
          icon.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
        }

        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.classList.toggle('light', !isDark);
        localStorage.setItem(Storage.KEY_THEME, isDark ? 'dark' : 'light');

        // Play Center Screen Theme Burst Animation
        playCenterThemeAnimation(isDark);

        showToast(isDark ? 'Pandal Night View activated' : 'Day View activated', isDark ? 'dark_mode' : 'light_mode');
      });
    }
  }

  // --- 15. DYNAMIC DEVOTEES CONNECTED COUNTER ---
  function initDevoteesCounter() {
    const counterEl = document.getElementById('devotees-count-val');
    if (!counterEl) return;

    // Purge any legacy count keys that held >=100
    try {
      localStorage.removeItem('akalbodhon_devotee_count');
    } catch (e) {}

    const STORAGE_KEY = 'akalbodhon_devotee_count_v2';
    const VISITOR_KEY = 'akalbodhon_visitor_logged_v2';

    let currentCount = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    // Unconditionally reset if missing, NaN, or outside strictly <100 range
    if (!currentCount || isNaN(currentCount) || currentCount < 45 || currentCount >= 95) {
      currentCount = Math.floor(Math.random() * 22) + 55; // 55 to 76
      localStorage.setItem(STORAGE_KEY, currentCount.toString());
    }

    if (!sessionStorage.getItem(VISITOR_KEY)) {
      if (currentCount < 88) {
        currentCount += 1;
      }
      sessionStorage.setItem(VISITOR_KEY, 'true');
      localStorage.setItem(STORAGE_KEY, currentCount.toString());
    }

    // Hard guarantee: always strictly below 100 (capped at 92)
    currentCount = Math.min(92, Math.max(45, currentCount));
    counterEl.textContent = currentCount.toLocaleString();

    setInterval(() => {
      let delta;
      if (currentCount >= 88) {
        // Dip down when approaching higher 80s to strictly stay under 100
        delta = -Math.floor(Math.random() * 3 + 1);
      } else if (currentCount <= 50) {
        delta = Math.floor(Math.random() * 3 + 1);
      } else {
        delta = Math.random() > 0.48 ? 1 : -1;
      }
      // Strict guarantee: always stays between 45 and 92 (strictly under 100)
      currentCount = Math.max(45, Math.min(92, currentCount + delta));
      localStorage.setItem(STORAGE_KEY, currentCount.toString());
      if (counterEl) {
        counterEl.textContent = currentCount.toLocaleString();
        counterEl.classList.add('scale-110', 'text-secondary-container');
        setTimeout(() => counterEl.classList.remove('scale-110', 'text-secondary-container'), 600);
      }
    }, 24000);
  }

  // ========================================================
  // 16. SUPABASE CLIENT & AUTHENTICATION MODULE
  // ========================================================
  const SUPABASE_URL = (typeof window !== 'undefined' && (window.__AKALBODHON_SUPABASE_CONFIG__?.url || window.__SUPABASE_CONFIG__?.url)) || '';
  const SUPABASE_ANON_KEY = (typeof window !== 'undefined' && (window.__AKALBODHON_SUPABASE_CONFIG__?.anonKey || window.__SUPABASE_CONFIG__?.anonKey)) || '';

  let supabaseClient = null;
  try {
    if (window.supabase && typeof window.supabase.createClient === 'function' && SUPABASE_URL && SUPABASE_ANON_KEY) {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      
      // Listen for OAuth session callbacks (e.g. Google Sign-In)
      supabaseClient.auth.onAuthStateChange(async (event, session) => {
        if (session && session.user) {
          const user = session.user;
          const googleUser = {
            id: user.id,
            user_id: user.id,
            identifier: user.email || 'devotee@gmail.com',
            identifier_type: 'google',
            username: user.user_metadata?.full_name || user.user_metadata?.name || (user.email ? user.email.split('@')[0] : 'Devotee'),
            avatar: '🪔',
            google_photo_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
            custom_avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
            created_at: user.created_at || new Date().toISOString()
          };

          // Fetch devotee profile from profiles table if exists
          try {
            const { data: existingProf } = await supabaseClient.from('profiles').select('*').eq('id', user.id).single();
            if (existingProf) {
              if (existingProf.avatar) googleUser.avatar = existingProf.avatar;
              if (existingProf.username) googleUser.username = existingProf.username;
              const photo = user.user_metadata?.avatar_url || user.user_metadata?.picture || existingProf.google_photo_url || existingProf.custom_avatar_url || null;
              googleUser.google_photo_url = photo;
              googleUser.custom_avatar_url = photo;
              if (Array.isArray(existingProf.saved_items) && existingProf.saved_items.length > 0) {
                googleUser.saved_items = existingProf.saved_items;
              }
              if (Array.isArray(existingProf.custom_plans) && existingProf.custom_plans.length > 0) {
                googleUser.custom_plans = existingProf.custom_plans;
              }
            } else {
              // Upsert newly signed in Google devotee
              await supabaseClient.from('profiles').upsert({
                id: googleUser.id,
                user_id: googleUser.id,
                identifier: googleUser.identifier,
                identifier_type: googleUser.identifier_type,
                username: googleUser.username,
                email: user.email,
                avatar: googleUser.avatar,
                custom_avatar_url: googleUser.custom_avatar_url,
                google_photo_url: googleUser.google_photo_url,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              });
            }
          } catch (e) {
            console.warn('Profile sync notice:', e);
          }

          saveUserSession(googleUser);
          closeAuthModal();

          if (typeof renderSavedSection === 'function') renderSavedSection();
          if (typeof updateBookmarkCount === 'function') updateBookmarkCount();
          if (typeof renderFestivalPlans === 'function') renderFestivalPlans(activePlanFilter);

          showToast(`Welcome, ${googleUser.username}! Signed in with Google.`, 'celebration');

          // Clean up OAuth hash params from address bar
          if (window.location.hash && (window.location.hash.includes('access_token=') || window.location.hash.includes('error='))) {
            history.replaceState(null, '', window.location.pathname);
          }
        }
      });
    }
  } catch (err) {
    console.warn('Supabase client initialization warning:', err);
  }

  // Active User Profile State
  let currentUser = null;
  let customPlans = [];
  let userTimers = [];
  let pendingPlanJoinId = null;
  let activePlanFilter = 'all';
  window.activeViewingPlanId = null;

  // 14 Authentic Puja-Themed Avatars with Bengali Sacred Meaning
  const PUJA_AVATARS = [
    { id: 'pradeep', icon: '🪔', name: 'Pradeep (Diya)', meaning: 'The sacred brass oil lamp illuminated during Bodhon to dispel darkness and awaken divine presence.' },
    { id: 'dhak', icon: '🪘', name: 'Ceremonial Dhak', meaning: 'The twin-headed sacred drum whose thunderous rhythmic beats form the very heartbeat of Sharadotsav.' },
    { id: 'raktajaba', icon: '🌺', name: 'Rakta Jaba (Red Hibiscus)', meaning: 'The holy crimson flower most cherished by Maa Durga, representing raw cosmic Shakti and devotion.' },
    { id: 'trishul', icon: '🔱', name: 'Maa Durga\'s Trishul', meaning: 'The supreme three-pronged trident symbolizing truth, wisdom, and triumph over Mahishasura.' },
    { id: 'japamala', icon: '📿', name: 'Japa Mala (Rudraksha)', meaning: 'The sacred 108 rosary prayer beads used for devout chanting of Sri Sri Chandi Path and Devi Suktam.' },
    { id: 'neelpadma', icon: '🪷', name: '108 Neel Padma (Blue Lotus)', meaning: 'The celestial blue lotuses brought from Devidaha by Hanuman for Lord Rama\'s historic autumn Akalbodhon.' },
    { id: 'dhunuchi_naach', icon: '💃', name: 'Dhunuchi Naach', meaning: 'The ecstatic devotional Aarti dance performed to the thunderous rhythmic tempo of dhak and gong.' },
    { id: 'mayur', icon: '🦚', name: 'Sacred Mayur (Peacock)', meaning: 'The glorious vahana mount of Lord Kartikeya, symbolizing divine majesty, vigilance, and regal beauty.' },
    { id: 'kalash', icon: '🏺', name: 'Mangal Ghat (Kalash)', meaning: 'The consecrated sacred water vessel topped with mango leaves and coconut, invoking the Devi\'s presence.' },
    { id: 'dhunuchi', icon: '🔥', name: 'Dhunuchi (Aarti Flame)', meaning: 'The traditional earthen incense chalice filled with burning coconut husk and camphor for the Sandhi Aarti dance.' },
    { id: 'shankha', icon: '🐚', name: 'Sacred Shankha (Conch)', meaning: 'The holy conch shell blown during Aarti to sanctify the atmosphere with the primordial sound of Om.' },
    { id: 'kanshi', icon: '🥁', name: 'Dhol & Kanshi', meaning: 'The resonating bell-metal gong and percussion accompanying pushpanjali prayers and ceremonial chants.' },
    { id: 'surya', icon: '☀️', name: 'Sharad Surya (Autumn Sun)', meaning: 'The auspicious golden autumn dawn breaking on Mahalaya as Chandi Path echoes across Bengal.' },
    { id: 'kashphool', icon: '🌾', name: 'Kash Phool (White Reeds)', meaning: 'The silken white wild grass swaying along riverbanks, heralding the joyous descent of Uma from Mount Kailash.' }
  ];

  const PUJA_AVATAR_ICONS = ['🪔', '🪘', '🌺', '🔱', '📿', '🪷', '💃', '🦚', '🏺', '🔥', '🐚', '🥁', '☀️', '🌾'];
  function getRandomPujaIcon() {
    return PUJA_AVATAR_ICONS[Math.floor(Math.random() * PUJA_AVATAR_ICONS.length)];
  }

  // 6 Pandal-Hopping Festival Master Reference Plans
  const MASTER_PUJA_PLANS = [
    {
      id: 'plan-mahalaya',
      title: 'Mahalaya Artisan Trail: Kumartuli Deity Eye-Drawing (Chokkhu Daan)',
      day_tag: 'Mahalaya',
      day_key: 'mahalaya',
      date_str: '10 October 2026',
      creator_name: 'the.transparent.coder',
      creator_avatar: '🪔',
      creator_id: 'akalbodhon-official',
      is_template: true,
      route_summary: 'Sovabazar Metro -> Kumartuli Artisan Quarter -> Kumartuli Park -> Ahiritola Sarbojanin',
      pandals: ['Kumartuli Park Sarbojanin', 'Ahiritola Sarbojanin Durgotsab', 'Sovabazar Rajbari', 'Beniatola Sarbojanin Durgotsav'],
      food_stops: [
        { name: 'Mitra Cafe (Shyambazar)', dish: 'Original Diamond Fish Fry & Hot Tea' },
        { name: 'Golbari (Shyambazar)', dish: 'Kosha Mangsho with Hot Luchis' }
      ],
      custom_notes: 'Arrive at Kumartuli pottery lanes early morning to witness the legendary master sculptors draw the third eye and lotus eyes (Chokkhu Daan) on the clay idols of Maa Durga, heralding the advent of Devi Paksha.'
    },
    {
      id: 'plan-shasthi',
      title: 'Maha Shasthi North Kolkata Heritage & Bodhon Pandal Trail',
      day_tag: 'Maha Shasthi',
      day_key: 'shasthi',
      date_str: '17 October 2026',
      creator_name: 'the.transparent.coder',
      creator_avatar: '🌺',
      creator_id: 'akalbodhon-official',
      is_template: true,
      route_summary: 'Shyambazar Metro -> Bagbazar -> Hatibagan -> Nalin Sarkar St -> Kashi Bose Lane -> Chaltabagan',
      pandals: ['Bagbazar Sarbojanin', 'Hatibagan Sarbojanin', 'Nalin Sarkar Street Sarbojanin', 'Kashi Bose Lane Durga Puja Samity', 'Maniktala Chaltabagan Lohapatty'],
      food_stops: [
        { name: 'Golbari (Shyambazar)', dish: 'Legendary Kosha Mangsho & Crisp Parathas' }
      ],
      custom_notes: 'North Kolkata is best explored on foot. Experience the classic century-old sabeki daaker saaj idols and majestic thematic lighting.'
    },
    {
      id: 'plan-saptami',
      title: 'Maha Saptami VIP Road & Central Lake Illumination Circuit',
      day_tag: 'Maha Saptami',
      day_key: 'saptami',
      date_str: '18 October 2026',
      creator_name: 'the.transparent.coder',
      creator_avatar: '🔱',
      creator_id: 'akalbodhon-official',
      is_template: true,
      route_summary: 'VIP Road Lake Town -> Sreebhumi -> Dum Dum Park Cluster -> College Square -> Mohammad Ali Park',
      pandals: ['Sreebhumi Sporting Club', 'Dum Dum Park Tarun Sangha', 'Dum Dum Park Bharat Chakra', 'College Square', 'Mohammad Ali Park'],
      food_stops: [
        { name: 'Mitra Cafe (Shyambazar)', dish: 'Diamond Fish Fry & Kabiraji' },
        { name: 'Arsalan Restaurant', dish: 'Kolkata Mutton Biryani' }
      ],
      custom_notes: 'Hop Sreebhumi and Dum Dum Park early in the day to beat massive queues, then take the metro to College Square as dusk illuminates the lake.'
    },
    {
      id: 'plan-ashtami',
      title: 'Maha Ashtami Sacred Pushpanjali & South Kolkata Grandeur Trail',
      day_tag: 'Maha Ashtami',
      day_key: 'ashtami',
      date_str: '19 October 2026',
      creator_name: 'the.transparent.coder',
      creator_avatar: '🪷',
      creator_id: 'akalbodhon-official',
      is_template: true,
      route_summary: 'Badamtala Ashar Sangha ➔ Ballygunge Cultural ➔ Singhi Park ➔ Ekdalia Evergreen ➔ Maddox Square',
      pandals: [
        'Badamtala Ashar Sangha',
        'Ballygunge Cultural Association',
        'Singhi Park Sarbojanin',
        'Ekdalia Evergreen Club',
        'Maddox Square'
      ],
      food_stops: [
        { name: '6 Ballygunge Place', dish: 'Traditional Ashtami Bhog & Kosha Mangsho' },
        { name: 'Paramount Sherbets', dish: 'Historic Malai Roll & Daab Sarbat' }
      ],
      custom_notes: 'Offer sacred Pushpanjali with fresh flowers and Bel leaves at your local pandal. After taking an afternoon rest, head out for a classic South Kolkata pandal hopping trail to witness majestic art installations and dazzling evening illuminations.'
    },
    {
      id: 'plan-navami',
      title: 'Maha Navami All-Night Carnival & Mega Theme Pandal Hop',
      day_tag: 'Maha Navami',
      day_key: 'navami',
      date_str: '20 October 2026',
      creator_name: 'the.transparent.coder',
      creator_avatar: '💃',
      creator_id: 'akalbodhon-official',
      is_template: true,
      route_summary: 'New Alipore -> Suruchi Sangha -> Chetla Agrani -> Mudiali Club -> Behala Nutan Dal -> Barisha Club',
      pandals: ['Suruchi Sangha (New Alipore)', 'Mudiali Club', 'Behala Nutan Dal', 'Barisha Club', 'Rajdanga Naba Uday Sangha'],
      food_stops: [
        { name: 'Oudh 1590 (Deshapriya Park)', dish: 'Awadhi Handi Biryani & Galawati Kebab' },
        { name: 'Kusum Rolls', dish: 'Double Chicken Egg Roll' }
      ],
      custom_notes: 'Navami is the night when the entire city stays awake! Metro trains run late into the night. Enjoy dramatic thematic installations and mesmerizing Dhunuchi Naach.'
    },
    {
      id: 'plan-dashami',
      title: 'Bijoya Dashami Devi Baran, Sindoor Khela & Bijoya Milita with Family & Friends',
      day_tag: 'Bijoya Dashami',
      day_key: 'dashami',
      date_str: '21 October 2026',
      creator_name: 'the.transparent.coder',
      creator_avatar: '🐚',
      creator_id: 'akalbodhon-official',
      is_template: true,
      route_summary: 'Visiting Family, Relatives & Friends (Bijoya Milita & Greetings)',
      pandals: [],
      food_stops: [],
      custom_notes: 'Perform the sacred farewell rituals of Devi Baran and joyous Sindoor Khela for women at your local pandal before the evening immersion. Afterwards, visit beloved family, relatives, and friends to exchange traditional Shubho Bijoya embraces (Kola-Koli) and share festive sweet blessings.'
    }
  ];

  // Helper: Validate Password (Alphanumeric combination >= 5 elements)
  function validatePassword(pwd) {
    if (!pwd || typeof pwd !== 'string') return false;
    if (pwd.length < 5) return false;
    const hasAlpha = /[a-zA-Z]/.test(pwd);
    const hasNum = /[0-9]/.test(pwd);
    return hasAlpha && hasNum;
  }

  // Load Saved User State immediately from local storage (Synchronous, zero-delay)
  function loadLocalUserSession() {
    setAccountLoading(true);
    try {
      const raw = localStorage.getItem('akalbodhon_user_profile');
      if (raw) {
        currentUser = JSON.parse(raw);
        if (currentUser.identifier_type === 'google') {
          if (currentUser.google_photo_url && !currentUser.custom_avatar_url) {
            currentUser.custom_avatar_url = currentUser.google_photo_url;
          }
        } else if (currentUser.identifier_type === 'phone' || currentUser.identifier_type === 'email') {
          if (!currentUser.avatar || !currentUser.avatar_assigned) {
            currentUser.avatar = getRandomPujaIcon();
            currentUser.avatar_assigned = true;
            currentUser.custom_avatar_url = null;
            localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser));
          }
        }
        // Ensure user-specific itinerary items are restored if active store was empty
        const specificData = loadUserSpecificItinerary(currentUser);
        const curBm = Storage.getBookmarks() || [];
        if (curBm.length === 0) {
          if (Array.isArray(currentUser.saved_items) && currentUser.saved_items.length > 0) {
            Storage.setBookmarks(currentUser.saved_items);
          } else if (specificData && Array.isArray(specificData.bookmarks) && specificData.bookmarks.length > 0) {
            Storage.setBookmarks(specificData.bookmarks);
          }
        }
        if (!customPlans || customPlans.length === 0) {
          if (Array.isArray(currentUser.custom_plans) && currentUser.custom_plans.length > 0) {
            customPlans = [...currentUser.custom_plans];
            localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));
          } else if (specificData && Array.isArray(specificData.custom_plans) && specificData.custom_plans.length > 0) {
            customPlans = [...specificData.custom_plans];
            localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));
          }
        }
        updateAccountUI();
        syncRemoteUserSession();
      } else {
        updateAccountUI();
      }
    } catch (e) {
      console.warn('Session parse error:', e);
      updateAccountUI();
    }
  }
  window.loadLocalUserSession = loadLocalUserSession;
  window.getCurrentUser = () => currentUser;

  // Background sync for user credentials & saved items from Firestore
  async function syncRemoteUserSession() {
    if (!currentUser) return;
    if (window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
      try {
        const fbSaved = await window.AkalbodhonFirebase.fetchUserSavedItems(currentUser);
        if (Array.isArray(fbSaved) && fbSaved.length > 0) {
          const curBm = Storage.getBookmarks() || [];
          const mergedBm = mergeBookmarks(curBm, fbSaved);
          Storage.setBookmarks(mergedBm);
          currentUser.saved_items = mergedBm;
          localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser));
          saveUserSpecificItinerary(currentUser, mergedBm, customPlans);
          if (typeof renderSavedItinerary === 'function') renderSavedItinerary();
          if (typeof renderSavedSection === 'function') renderSavedSection();
          if (typeof updateBookmarkCount === 'function') updateBookmarkCount();
          if (typeof renderPandals === 'function') renderPandals();
          if (typeof renderFoodAndShopping === 'function') renderFoodAndShopping();
        } else if ((Storage.getBookmarks() || []).length > 0) {
          // If remote is empty, push local bookmarks to remote
          window.AkalbodhonFirebase.saveBookmarks(currentUser, Storage.getBookmarks()).catch(() => {});
        }

        const fbPlans = await window.AkalbodhonFirebase.fetchUserPlans(currentUser);
        if (Array.isArray(fbPlans) && fbPlans.length > 0) {
          const mergedPlans = mergePlans(customPlans, fbPlans);
          customPlans = mergedPlans;
          currentUser.custom_plans = mergedPlans;
          localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));
          localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser));
          saveUserSpecificItinerary(currentUser, Storage.getBookmarks(), customPlans);
          if (typeof renderFestivalPlans === 'function') renderFestivalPlans(activePlanFilter || 'all');
          if (typeof renderSavedItinerary === 'function') renderSavedItinerary();
          if (typeof renderSavedSection === 'function') renderSavedSection();
        } else if (customPlans && customPlans.length > 0) {
          const targetUid = currentUser.id || currentUser.user_id;
          window.AkalbodhonFirebase.syncProfile({
            ...currentUser,
            id: targetUid,
            custom_plans: customPlans
          }).catch(() => {});
        }

        // Sync account-specific feedback cooldown timer from remote database on login
        const userDocId = currentUser.id || currentUser.user_id || currentUser.identifier;
        if (userDocId && typeof window.AkalbodhonFirebase.getProfile === 'function') {
          const profile = await window.AkalbodhonFirebase.getProfile(userDocId);
          if (profile) {
            let updated = false;
            if (currentUser.identifier_type === 'google') {
              const gPhoto = currentUser.google_photo_url || profile.google_photo_url || profile.custom_avatar_url || currentUser.custom_avatar_url;
              if (gPhoto && currentUser.custom_avatar_url !== gPhoto) {
                currentUser.custom_avatar_url = gPhoto;
                currentUser.google_photo_url = gPhoto;
                updated = true;
              }
            } else {
              if (profile.avatar && profile.avatar !== currentUser.avatar) {
                currentUser.avatar = profile.avatar;
                currentUser.avatar_assigned = true;
                updated = true;
              }
              if (currentUser.custom_avatar_url) {
                currentUser.custom_avatar_url = null;
                updated = true;
              }
            }
            const isRecentlyEditedLocally = currentUser.profile_updated_at && (Date.now() - currentUser.profile_updated_at < 120000);
            if (!isRecentlyEditedLocally && profile.username && profile.username.trim() && profile.username !== currentUser.username) {
              currentUser.username = profile.username.trim();
              updated = true;
            }

            if (profile.feedback_cooldown_until !== undefined) {
              const exp = parseInt(profile.feedback_cooldown_until, 10);
              const key = typeof getFeedbackCooldownKey === 'function' ? getFeedbackCooldownKey(currentUser) : null;
              if (key) {
                if (!isNaN(exp) && exp > Date.now()) {
                  localStorage.setItem(key, exp.toString());
                  currentUser.feedback_cooldown_until = exp;
                  updated = true;
                } else {
                  localStorage.removeItem(key);
                  if (currentUser.feedback_cooldown_until) {
                    delete currentUser.feedback_cooldown_until;
                    updated = true;
                  }
                }
              }
            }

            if (updated) {
              localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser));
              updateAccountUI();
              updateProfileAvatarDisplay();
            }

            if (typeof window.checkFeedbackCooldown === 'function') {
              window.checkFeedbackCooldown();
            }
          }
        }
      } catch (e) {
        console.warn('Firestore user data background restore notice:', e);
      }
    }
  }

  // Save User State & apply user-specific data isolation
  async function saveUserSession(user) {
    if (user) {
      currentUser = user;
      localStorage.setItem('akalbodhon_user_profile', JSON.stringify(user));

      // Restore account-specific feedback cooldown immediately
      if (user.feedback_cooldown_until) {
        const exp = parseInt(user.feedback_cooldown_until, 10);
        const key = typeof getFeedbackCooldownKey === 'function' ? getFeedbackCooldownKey(user) : null;
        if (key) {
          if (!isNaN(exp) && exp > Date.now()) {
            localStorage.setItem(key, exp.toString());
          } else {
            localStorage.removeItem(key);
          }
        }
      }

      // 1. Retrieve user-specific itinerary saved previously under devotee's specific identifier
      const specificData = loadUserSpecificItinerary(user);
      const specificBookmarks = specificData ? specificData.bookmarks : [];
      const specificPlans = specificData ? specificData.custom_plans : [];

      // 2. Retrieve current local device bookmarks & custom plans
      const currentLocalBookmarks = Storage.getBookmarks() || [];
      const currentLocalPlans = (customPlans && customPlans.length > 0) ? customPlans : (loadLocalCustomPlans() || []);

      // 3. User profile saved items & custom plans
      const userProfileBookmarks = Array.isArray(user.saved_items) ? user.saved_items : [];
      const userProfilePlans = Array.isArray(user.custom_plans) ? user.custom_plans : [];

      // Seamlessly merge all sources so no devotee item is ever lost:
      // specific identifier store + profile cloud items + current local session
      let mergedBookmarks = mergeBookmarks(specificBookmarks, userProfileBookmarks);
      mergedBookmarks = mergeBookmarks(mergedBookmarks, currentLocalBookmarks);

      let mergedPlans = mergePlans(specificPlans, userProfilePlans);
      mergedPlans = mergePlans(mergedPlans, currentLocalPlans);

      // Set active bookmarks & plans
      Storage.setBookmarks(mergedBookmarks);
      customPlans = mergedPlans;
      localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));

      user.saved_items = mergedBookmarks;
      user.custom_plans = mergedPlans;
      currentUser = user;
      localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser));

      // Persist permanently under devotee's specific identifier
      saveUserSpecificItinerary(user, mergedBookmarks, mergedPlans);

      // Non-blocking background sync for remote cloud items (Firestore + Supabase)
      // Loads remote devotee data in the background after bringing user to the page!
      setTimeout(() => {
        syncRemoteUserSession();
      }, 30);
    } else {
      if (currentUser) {
        saveUserSpecificItinerary(currentUser, Storage.getBookmarks(), customPlans);
      }
      currentUser = null;
      localStorage.removeItem('akalbodhon_user_profile');
      localStorage.removeItem('akalbodhon_bookmarks');
      localStorage.removeItem('akalbodhon_custom_plans');
      customPlans = [];
    }

    updateAccountUI();
    if (typeof updateBookmarkCount === 'function') updateBookmarkCount();
    if (typeof renderSavedSection === 'function') renderSavedSection();
    if (typeof renderSavedItinerary === 'function') renderSavedItinerary();
    if (typeof renderFestivalPlans === 'function') renderFestivalPlans(activePlanFilter);
    if (typeof renderPandals === 'function') renderPandals();
    if (typeof renderFoodAndShopping === 'function') renderFoodAndShopping();

    if (user && typeof pendingSaveAction === 'function') {
      try {
        const action = pendingSaveAction;
        pendingSaveAction = null;
        setTimeout(() => action(), 180);
      } catch (e) {
        console.warn('Pending save action error:', e);
      }
    }

    if (user && window.__pendingSharedPlanId) {
      const pId = window.__pendingSharedPlanId;
      window.__pendingSharedPlanId = null;
      setTimeout(() => {
        if (typeof window.openViewPlanModal === 'function') {
          window.openViewPlanModal(pId);
        }
      }, 300);
    }

    if (user && pendingPlanJoinId) {
      pendingPlanJoinId = null;
    }
  }

  // Account Space Loading Animation Controller
  function setAccountLoading(loading) {
    const loader = document.getElementById('account-btn-loader');
    if (loader) {
      if (loading) {
        loader.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
        loader.classList.add('flex', 'opacity-100');
      } else {
        loader.classList.remove('opacity-100');
        loader.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
          if (loader.classList.contains('opacity-0')) {
            loader.classList.add('hidden');
            loader.classList.remove('flex');
          }
        }, 300);
      }
    }
  }
  window.setAccountLoading = setAccountLoading;

  // Update Header Account Button & Avatar
  function updateAccountUI() {
    const avatarPreview = document.getElementById('account-avatar-preview');
    const btnLabel = document.getElementById('account-btn-label');
    const heroCta = document.getElementById('hero-account-cta-btn');

    if (currentUser) {
      if (avatarPreview) {
        if (currentUser.custom_avatar_url || (currentUser.identifier_type === 'google' && currentUser.google_photo_url)) {
          const photoSrc = currentUser.custom_avatar_url || currentUser.google_photo_url;
          avatarPreview.innerHTML = `<img src="${photoSrc}" alt="Avatar" class="w-full h-full object-cover rounded-full" onerror="this.parentElement.textContent='${currentUser.avatar || '🪔'}'" />`;
        } else {
          avatarPreview.textContent = currentUser.avatar || '🪔';
        }
      }
      if (btnLabel) {
        btnLabel.textContent = currentUser.username || currentUser.identifier?.split('@')[0] || 'Account';
      }
      if (heroCta) {
        const photoSrc = currentUser.custom_avatar_url || (currentUser.identifier_type === 'google' ? currentUser.google_photo_url : null);
        const iconHtml = photoSrc 
          ? `<img src="${photoSrc}" alt="Avatar" class="w-5 h-5 object-cover rounded-full inline-block mr-1.5" onerror="this.outerHTML='<span class=\\'text-base\\'>${currentUser.avatar || '🪔'}</span>'" />`
          : `<span class="text-base">${currentUser.avatar || '🪔'}</span>`;
        heroCta.innerHTML = `${iconHtml} <span class="font-bold">${escapeHtml(currentUser.username)}</span>`;
      }
    } else {
      if (avatarPreview) avatarPreview.textContent = '🪔';
      if (btnLabel) btnLabel.textContent = 'Sign In';
      if (heroCta) {
        heroCta.innerHTML = `<span class="text-base">🪔</span> <span class="font-bold">Sign In</span>`;
      }
    }
    setAccountLoading(false);
    if (typeof window.checkFeedbackCooldown === 'function') {
      window.checkFeedbackCooldown();
    }
  }

  // Open Account / Profile Modal
  function openAccountModal() {
    if (currentUser) {
      openProfileModal();
    } else {
      openAuthModal('login');
    }
  }

  // Active auth modal state
  let currentAuthModalMode = 'login'; // 'login' | 'signup'
  let currentAuthModalMethod = 'email'; // 'email'

  function clearAuthModalAlerts() {
    const errorAlert = document.getElementById('auth-error-alert');
    const successAlert = document.getElementById('auth-success-alert');
    const errorActionContainer = document.getElementById('auth-error-action-container');
    if (errorAlert) errorAlert.classList.add('hidden');
    if (successAlert) successAlert.classList.add('hidden');
    if (errorActionContainer) {
      errorActionContainer.innerHTML = '';
      errorActionContainer.classList.add('hidden');
    }
  }

  function showAuthModalError(msg, actionElement = null) {
    const alertEl = document.getElementById('auth-error-alert');
    const msgEl = document.getElementById('auth-error-msg');
    const actionContainer = document.getElementById('auth-error-action-container');
    if (alertEl && msgEl) {
      msgEl.innerHTML = msg;
      if (actionContainer) {
        actionContainer.innerHTML = '';
        if (actionElement) {
          actionContainer.appendChild(actionElement);
          actionContainer.classList.remove('hidden');
        } else {
          actionContainer.classList.add('hidden');
        }
      }
      alertEl.classList.remove('hidden');
    }
  }

  function showAuthModalSuccess(msg) {
    const successEl = document.getElementById('auth-success-alert');
    const msgEl = document.getElementById('auth-success-msg');
    if (successEl && msgEl) {
      msgEl.innerHTML = msg;
      successEl.classList.remove('hidden');
    }
  }

  function setAuthMethodModal(method = 'email') {
    currentAuthModalMethod = 'email';
    clearAuthModalAlerts();
    const emailSection = document.getElementById('auth-email-section');
    emailSection?.classList.remove('hidden');
  }

  function setAuthMode(mode = 'login', presetValue = '') {
    currentAuthModalMode = 'login';
    clearAuthModalAlerts();
    const titleEl = document.getElementById('auth-modal-title');
    if (titleEl) titleEl.textContent = 'Devotee Sign In';
  }

  function openAuthModal(mode = 'login') {
    document.body.classList.add('modal-open');
    const modal = document.getElementById('auth-modal');
    if (!modal) return;

    setAuthMode('login');

    const titleEl = document.getElementById('auth-modal-title');
    if (titleEl) titleEl.textContent = 'Devotee Sign In';
    const subtitleEl = document.getElementById('auth-modal-subtitle');
    if (subtitleEl) subtitleEl.textContent = 'Sign in with Google to save custom plans, pandals, and sacred itineraries.';

    const googleBtn = document.getElementById('google-auth-btn');
    if (googleBtn) googleBtn.disabled = false;
    const googleLabel = document.getElementById('google-auth-btn-label');
    if (googleLabel) googleLabel.textContent = 'Continue with Google';

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  window.openAuthModal = openAuthModal;

  function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    const otherOpen = document.querySelector('.fixed.inset-0:not(.hidden):not(#auth-modal)');
    if (!otherOpen) {
      document.body.classList.remove('modal-open');
    }
  }
  window.closeAuthModal = closeAuthModal;

  function showAuthError(msg, isPage = false) {
    if (isPage) {
      const alertEl = document.getElementById('page-error-alert');
      const msgEl = document.getElementById('page-error-msg');
      if (alertEl && msgEl) {
        msgEl.innerHTML = msg;
        alertEl.classList.remove('hidden');
      }
    } else {
      showAuthModalError(msg);
    }
  }

  // Profile Modal Handler
  function openProfileModal() {
    document.body.classList.add('modal-open');
    if (!currentUser) {
      try {
        const raw = localStorage.getItem('akalbodhon_user_profile');
        if (raw) currentUser = JSON.parse(raw);
      } catch (_) {}
    }
    if (!currentUser) return;
    const modal = document.getElementById('profile-modal');
    if (!modal) return;

    // Set fields
    const dispName = document.getElementById('profile-display-name');
    const dispId = document.getElementById('profile-display-identifier');
    const nameInput = document.getElementById('profile-edit-name-input');

    if (dispName) dispName.textContent = currentUser.username || currentUser.displayName || 'Devotee';
    if (dispId) dispId.textContent = currentUser.identifier || '';
    if (nameInput) nameInput.value = currentUser.username || currentUser.displayName || '';

    updateProfileAvatarDisplay();

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  window.openProfileModal = openProfileModal;

  function closeProfileModal() {
    document.body.classList.remove('modal-open');
    const modal = document.getElementById('profile-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }
  window.closeProfileModal = closeProfileModal;

  function updateProfileAvatarDisplay() {
    const el = document.getElementById('current-profile-avatar-display');
    if (!el || !currentUser) return;

    if (currentUser.custom_avatar_url || (currentUser.identifier_type === 'google' && currentUser.google_photo_url)) {
      const photoSrc = currentUser.custom_avatar_url || currentUser.google_photo_url;
      el.innerHTML = `<img src="${photoSrc}" alt="Avatar" class="w-full h-full object-cover rounded-2xl" onerror="this.parentElement.textContent='${currentUser.avatar || '🪔'}'" />`;
    } else {
      el.textContent = currentUser.avatar || '🪔';
    }
  }

  // Save Profile Changes
  async function handleSaveProfile(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();

    // 1. Recover currentUser from localStorage if null in memory
    if (!currentUser) {
      try {
        const raw = localStorage.getItem('akalbodhon_user_profile');
        if (raw) currentUser = JSON.parse(raw);
      } catch (_) {}
    }

    const nameInput = document.getElementById('profile-edit-name-input');
    const newName = (nameInput ? nameInput.value : '').trim();

    if (!currentUser) {
      currentUser = {
        id: 'devotee_' + Date.now(),
        user_id: 'devotee_' + Date.now(),
        username: newName || 'Devotee',
        displayName: newName || 'Devotee',
        identifier: 'devotee@akalbodhon.com',
        identifier_type: 'devotee',
        avatar: '🪔'
      };
    }

    if (newName) {
      currentUser.username = newName;
      currentUser.displayName = newName;
      currentUser.name = newName;
    }

    // Protect newly edited profile name from being overwritten by stale cloud sync
    currentUser.profile_updated_at = Date.now();
    currentUser.updated_at = new Date().toISOString();

    // Button visual loading feedback
    const saveBtn = document.getElementById('save-profile-btn');
    const originalBtnHtml = saveBtn ? saveBtn.innerHTML : '';
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = `<span class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span> Saving...`;
    }

    showTopProgressBar();

    try {
      // 1. Instant local persistence & sync
      localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser));

      const dispName = document.getElementById('profile-display-name');
      if (dispName) dispName.textContent = currentUser.username;

      await saveUserSession(currentUser);
      updateAccountUI();

      // 2. Immediately close profile modal and show success toast
      closeProfileModal();
      if (typeof renderFestivalPlans === 'function') {
        try {
          renderFestivalPlans(activePlanFilter || 'all');
        } catch (_) {}
      }
      showToast(`Profile updated for ${currentUser.username}!`, 'check_circle');

      // 3. Background cloud sync (Supabase & Firebase) - non-blocking
      (async () => {
        // Sync to Supabase
        if (supabaseClient) {
          try {
            await supabaseClient.from('profiles').upsert({
              id: currentUser.id || currentUser.user_id,
              user_id: currentUser.user_id || currentUser.id,
              identifier: currentUser.identifier,
              identifier_type: currentUser.identifier_type || 'email',
              username: currentUser.username,
              avatar: currentUser.avatar || '🪔',
              custom_avatar_url: currentUser.custom_avatar_url || null,
              google_photo_url: currentUser.google_photo_url || null,
              updated_at: currentUser.updated_at
            });
          } catch (err) {
            console.warn('Profile sync warning to Supabase:', err);
          }
        }

        // Sync to Firebase Firestore
        if (window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
          try {
            await window.AkalbodhonFirebase.syncProfile({
              id: currentUser.id || currentUser.user_id,
              user_id: currentUser.user_id || currentUser.id,
              username: currentUser.username,
              avatar: currentUser.avatar || '🪔',
              custom_avatar_url: currentUser.custom_avatar_url || null,
              google_photo_url: currentUser.google_photo_url || null,
              updated_at: currentUser.updated_at
            });
          } catch (fbErr) {
            console.warn('Profile sync warning to Firebase:', fbErr);
          }
        }
      })().catch(() => {});

    } catch (err) {
      console.error('Error in handleSaveProfile:', err);
      showToast(`Profile updated for ${currentUser.username}!`, 'check_circle');
      closeProfileModal();
    } finally {
      hideTopProgressBar();
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalBtnHtml || `<span class="material-symbols-outlined text-[18px]">check_circle</span> Save Profile`;
      }
    }
  }
  window.handleSaveProfile = handleSaveProfile;

  // --- Dynamic Input Counters & Validation ---
  function updateDynamicCounter(inputEl, counterEl, limit, mode = 'length') {
    if (!counterEl || !inputEl) return;
    const val = inputEl.value || '';
    if (mode === 'length') {
      const len = Math.min(val.length, limit);
      counterEl.textContent = `(${len}/${limit})`;
    } else if (mode === 'alphanumeric') {
      const matches = val.match(/[a-zA-Z0-9]/g) || [];
      const count = matches.length;
      counterEl.textContent = `(${count}/${limit})`;
      if (count >= limit) {
        counterEl.classList.add('text-emerald-500', 'dark:text-emerald-400');
        counterEl.classList.remove('text-primary', 'dark:text-amber-300');
      } else {
        counterEl.classList.remove('text-emerald-500', 'dark:text-emerald-400');
        counterEl.classList.add('text-primary', 'dark:text-amber-300');
      }
    }
  }

  async function hashPassword(str) {
    if (!str) return '';
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(str + '_akalbodhon_salt_2026');
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
      }
      return 'fb_' + Math.abs(hash);
    }
  }

  // Sync saved items under active devotee's account to Supabase
  async function syncUserSavedItemsToSupabase(list) {
    if (!currentUser || !currentUser.id) return;
    showTopProgressBar();
    try {
      const savedItems = Array.isArray(list) ? list : Storage.getBookmarks();
      currentUser.saved_items = savedItems;
      localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser));
      
      const targetId = (currentUser.id || '').toLowerCase();
      const targetUid = currentUser.user_id || currentUser.id;

      // Sync to Firebase Firestore Database ('profiles' and 'users' collections)
      if (window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
        try {
          await window.AkalbodhonFirebase.saveBookmarks(currentUser, savedItems);
        } catch (fbErr) {
          console.warn('Firebase bookmark sync notice:', fbErr);
        }
      }

      if (!supabaseClient) return;

      // 1. Update/Upsert in Supabase PostgreSQL Database (profiles table)
      try {
        await supabaseClient
          .from('profiles')
          .upsert({
            id: targetId,
            user_id: targetUid,
            identifier: currentUser.identifier || currentUser.email || targetUid,
            email: currentUser.email || null,
            username: currentUser.username || 'Devotee',
            saved_items: savedItems,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' });
      } catch (_) {
        await supabaseClient
          .from('profiles')
          .update({
            saved_items: savedItems,
            updated_at: new Date().toISOString()
          })
          .or(`id.eq.${targetId},identifier.eq.${targetId},user_id.eq.${targetUid}`);
      }

      // 2. Cloud storage backup in Supabase Storage (devotee-data bucket)
      try {
        const payload = JSON.stringify({
          userId: targetUid,
          username: currentUser.username,
          saved_items: savedItems,
          syncedAt: new Date().toISOString()
        }, null, 2);
        const blob = new Blob([payload], { type: 'application/json' });
        const cleanId = targetUid.replace(/[^a-zA-Z0-9_-]/g, '_');
        await supabaseClient.storage
          .from('devotee-data')
          .upload(`saved_${cleanId}.json`, blob, {
            contentType: 'application/json',
            upsert: true
          });
      } catch (storageErr) {
        console.warn('Storage backup notice:', storageErr);
      }
    } catch (err) {
      console.warn('Supabase bookmark sync error:', err);
    } finally {
      hideTopProgressBar();
    }
  }

  // Normalize devotee phone numbers to standard E.164 format (+91 default for Bengal / India)
  function normalizePhone(raw) {
    if (!raw) return '';
    const clean = String(raw).trim();
    const digits = clean.replace(/[^0-9]/g, '');
    if (clean.startsWith('+')) return '+' + digits;
    if (digits.length === 10) return '+91' + digits; // Kolkata / India default (+91)
    if (digits.length === 11 && digits.startsWith('0')) return '+91' + digits.slice(1);
    if (digits.length === 12 && digits.startsWith('91')) return '+' + digits;
    return '+' + digits;
  }
  window.formatPhoneNumber = normalizePhone;
  window.normalizePhone = normalizePhone;

  // Helper: Check if devotee account exists in databases (Firebase, Supabase, LocalStorage)
  async function checkDevoteeAccountExists(identifier) {
    if (!identifier) return null;
    const clean = String(identifier).trim().toLowerCase();
    const digits = clean.replace(/[^0-9]/g, '');
    const isPhone = digits.length >= 7 && !clean.includes('@');
    const formatted = isPhone ? normalizePhone(clean) : null;
    const safeDocId = isPhone ? digits : clean.replace(/[^a-z0-9]/g, '_');

    // 1. Check Firebase Firestore
    if (window.AkalbodhonFirebase && typeof window.AkalbodhonFirebase.getProfileByIdentifier === 'function') {
      try {
        const fbProf = await window.AkalbodhonFirebase.getProfileByIdentifier(identifier);
        if (fbProf) return fbProf;
      } catch (_) {}
    }
    if (window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
      try {
        const p = await window.AkalbodhonFirebase.getProfile(safeDocId) || await window.AkalbodhonFirebase.getProfile(clean);
        if (p) return p;
      } catch (_) {}
    }

    // 2. Check Supabase
    if (supabaseClient) {
      try {
        const safeClean = clean.replace(/[^a-zA-Z0-9@._-]/g, '');
        const safeFormatted = String(formatted || '').replace(/[^a-zA-Z0-9+]/g, '');
        const safeDigits = String(digits || '').replace(/[^0-9]/g, '');
        const orQuery = isPhone 
          ? `identifier.eq.${safeFormatted},identifier.eq.${safeDigits},phone.eq.${safeFormatted},phone.eq.${safeDigits},id.eq.${safeDigits}`
          : `identifier.eq.${safeClean},email.eq.${safeClean},id.eq.${safeDocId}`;
        const { data } = await supabaseClient.from('profiles').select('*').or(orQuery).limit(1);
        if (data && data.length > 0) return data[0];
      } catch (_) {}
    }

    // 3. Check persistent localStorage
    const candidates = [
      `akalbodhon_user_data_${isPhone ? 'phone_' + digits : 'email_' + safeDocId}`,
      `akalbodhon_user_data_${digits}`,
      `akalbodhon_user_data_id_${safeDocId}`
    ];
    for (const cand of candidates) {
      const raw = localStorage.getItem(cand);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && (parsed.id || parsed.identifier || parsed.username)) return parsed;
        } catch (_) {}
      }
    }

    return null;
  }
  window.checkDevoteeAccountExists = checkDevoteeAccountExists;

  // -------------------------------------------------------------
  // EMAIL & PASSWORD MODAL HANDLERS
  // -------------------------------------------------------------
  async function handleEmailAuthModal() {
    clearAuthModalAlerts();
    const emailAddressInput = document.getElementById('auth-email-address-input');
    const emailPasswordInput = document.getElementById('auth-email-password-input');
    const emailNameInput = document.getElementById('auth-email-name-input');
    const emailSubmitBtn = document.getElementById('auth-email-submit-btn');
    const emailSubmitLabel = document.getElementById('auth-email-submit-label');

    const rawEmail = emailAddressInput ? emailAddressInput.value.trim().toLowerCase() : '';
    const rawPassword = emailPasswordInput ? emailPasswordInput.value : '';
    const rawName = emailNameInput ? emailNameInput.value.trim() : '';

    if (!rawEmail || !rawEmail.includes('@') || !rawEmail.includes('.')) {
      showAuthModalError('Please enter a valid email address.');
      emailAddressInput?.focus();
      return;
    }

    if (rawPassword.length < 6) {
      showAuthModalError('Password must be at least 6 characters (letters and numbers recommended).');
      emailPasswordInput?.focus();
      return;
    }

    if (currentAuthModalMode === 'signup' && !rawName) {
      showAuthModalError('Please enter your name so we know what to call you.');
      emailNameInput?.focus();
      return;
    }

    if (emailSubmitBtn) emailSubmitBtn.disabled = true;
    if (emailSubmitLabel) emailSubmitLabel.innerHTML = `<span class="btn-loading-spinner mr-2"></span> ${currentAuthModalMode === 'signup' ? 'Creating Account...' : 'Signing In...'}`;
    showGlobalLoader(
      currentAuthModalMode === 'signup' ? 'Creating Account...' : 'Signing In...',
      'Authenticating with devotee sanctuary...',
      '🪔',
      'Securing session...'
    );

    try {
      if (currentAuthModalMode === 'signup') {
        // --- CREATE ACCOUNT WITH EMAIL & PASSWORD ---
        let profile = null;
        try {
          profile = await window.AkalbodhonFirebase.registerWithEmailPassword(rawEmail, rawPassword, rawName);
        } catch (regErr) {
          if (regErr.code === 'auth/email-already-in-use') {
            hideGlobalLoader();
            if (emailSubmitBtn) emailSubmitBtn.disabled = false;
            if (emailSubmitLabel) emailSubmitLabel.textContent = 'Create Account with Email';

            const actionBtn = document.createElement('button');
            actionBtn.type = 'button';
            actionBtn.className = 'mt-2 px-3.5 py-1.5 rounded-xl bg-primary text-white dark:bg-amber-400 dark:text-black font-bold text-xs shadow hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer';
            actionBtn.innerHTML = '<span class="material-symbols-outlined text-[15px]">login</span> Sign In with this Email';
            actionBtn.onclick = () => {
              setAuthMode('login', rawEmail, 'email');
            };

            showAuthModalError(`An account with <strong>${escapeHtml(rawEmail)}</strong> already exists. Please sign in instead.`, actionBtn);
            return;
          }
          throw regErr;
        }

        if (profile) {
          hideGlobalLoader();
          saveUserSession(profile);
          closeAuthModal();
          closeSaveAuthPromptModal();

          if (typeof renderSavedSection === 'function') renderSavedSection();
          if (typeof updateBookmarkCount === 'function') updateBookmarkCount();
          if (typeof renderFestivalPlans === 'function') renderFestivalPlans(activePlanFilter);

          window.location.hash = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });

          showToast(`Welcome, ${profile.username}! Your devotee account has been created.`, 'celebration');

          if (pendingSaveAction) {
            const action = pendingSaveAction;
            pendingSaveAction = null;
            action();
          }
        }

      } else {
        // --- SIGN IN WITH EMAIL & PASSWORD ---
        // 1. First check if account exists in database
        const existing = await checkDevoteeAccountExists(rawEmail);
        if (!existing) {
          hideGlobalLoader();
          if (emailSubmitBtn) emailSubmitBtn.disabled = false;
          if (emailSubmitLabel) emailSubmitLabel.textContent = 'Sign In with Email';

          const actionBtn = document.createElement('button');
          actionBtn.type = 'button';
          actionBtn.className = 'mt-2 px-3.5 py-1.5 rounded-xl bg-amber-400 text-black font-bold text-xs shadow hover:bg-amber-300 transition-all flex items-center gap-1.5 cursor-pointer';
          actionBtn.innerHTML = '<span class="material-symbols-outlined text-[15px]">person_add</span> Create Account with this Email';
          actionBtn.onclick = () => {
            setAuthMode('signup', rawEmail, 'email');
          };

          showAuthModalError(
            `No devotee account found with <strong>${escapeHtml(rawEmail)}</strong>. Please create a new account to join Akalbodhon.`,
            actionBtn
          );
          return;
        }

        // 2. Authenticate with Firebase Email & Password
        let profile = null;
        try {
          profile = await window.AkalbodhonFirebase.signInWithEmailPassword(rawEmail, rawPassword);
        } catch (signInErr) {
          console.warn('Firebase email sign in error:', signInErr);
          if (signInErr.code === 'auth/wrong-password' || signInErr.code === 'auth/invalid-credential') {
            hideGlobalLoader();
            if (emailSubmitBtn) emailSubmitBtn.disabled = false;
            if (emailSubmitLabel) emailSubmitLabel.textContent = 'Sign In with Email';
            showAuthModalError('Incorrect password. Please verify your password and try again.');
            return;
          } else if (signInErr.code === 'auth/user-not-found') {
            hideGlobalLoader();
            if (emailSubmitBtn) emailSubmitBtn.disabled = false;
            if (emailSubmitLabel) emailSubmitLabel.textContent = 'Sign In with Email';

            const actionBtn = document.createElement('button');
            actionBtn.type = 'button';
            actionBtn.className = 'mt-2 px-3.5 py-1.5 rounded-xl bg-amber-400 text-black font-bold text-xs shadow hover:bg-amber-300 transition-all flex items-center gap-1.5 cursor-pointer';
            actionBtn.innerHTML = '<span class="material-symbols-outlined text-[15px]">person_add</span> Create Account with this Email';
            actionBtn.onclick = () => { setAuthMode('signup', rawEmail, 'email'); };

            showAuthModalError(`No devotee account found with <strong>${escapeHtml(rawEmail)}</strong>. Please create a new account to join Akalbodhon.`, actionBtn);
            return;
          }
          throw signInErr;
        }

        if (profile) {
          hideGlobalLoader();
          saveUserSession(profile);
          closeAuthModal();
          closeSaveAuthPromptModal();

          if (typeof renderSavedSection === 'function') renderSavedSection();
          if (typeof updateBookmarkCount === 'function') updateBookmarkCount();
          if (typeof renderFestivalPlans === 'function') renderFestivalPlans(activePlanFilter);

          window.location.hash = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });

          showToast(`Welcome back, ${profile.username}! Signed in successfully.`, 'celebration');

          if (pendingSaveAction) {
            const action = pendingSaveAction;
            pendingSaveAction = null;
            action();
          }
        }
      }
    } catch (err) {
      console.error('Email auth modal error:', err);
      hideGlobalLoader();
      if (emailSubmitBtn) emailSubmitBtn.disabled = false;
      if (emailSubmitLabel) emailSubmitLabel.textContent = currentAuthModalMode === 'signup' ? 'Create Account with Email' : 'Sign In with Email';
      showAuthModalError(err.message || 'Authentication error occurred. Please try again.');
    }
  }

  // Fallback unified submit handler
  async function handleAuthSubmit(isPage = false) {
    if (!isPage) {
      return handleEmailAuthModal();
    }
    const pageUseridInput = document.getElementById('page-userid-input');
    const pagePwdInput = document.getElementById('page-password-input');
    const email = pageUseridInput ? pageUseridInput.value.trim() : '';
    const pwd = pagePwdInput ? pagePwdInput.value : '';
    const modalEmail = document.getElementById('auth-email-address-input');
    const modalPwd = document.getElementById('auth-email-password-input');
    if (modalEmail && email) modalEmail.value = email;
    if (modalPwd && pwd) modalPwd.value = pwd;
    openAuthModal('login');
  }





  // Sign in with Google Handler (Popup with Seamless Redirect Fallback)
  let isGoogleAuthInProgress = false;

  async function handleGoogleSignIn() {
    if (isGoogleAuthInProgress) return;
    isGoogleAuthInProgress = true;

    const errorAlert = document.getElementById('auth-error-alert');
    const btn = document.getElementById('google-auth-btn');
    const label = document.getElementById('google-auth-btn-label');
    const saveBtn = document.getElementById('save-auth-google-btn');
    const saveLabel = document.getElementById('save-auth-google-btn-label');

    function resetGoogleButtons() {
      isGoogleAuthInProgress = false;
      hideGlobalLoader();
      setAccountLoading(false);
      if (btn) btn.disabled = false;
      if (label) label.textContent = 'Sign in with Google';
      if (saveBtn) saveBtn.disabled = false;
      if (saveLabel) saveLabel.textContent = 'Continue with Google';
    }

    if (errorAlert) errorAlert.classList.add('hidden');
    if (btn) btn.disabled = true;
    if (label) label.innerHTML = '<span class="btn-loading-spinner mr-2"></span> Initiating Google Sign-In...';
    if (saveBtn) saveBtn.disabled = true;
    if (saveLabel) saveLabel.innerHTML = '<span class="btn-loading-spinner mr-2"></span> Initiating Google Sign-In...';

    setAccountLoading(true);
    showGlobalLoader(
      'Connecting to Google...',
      'Please authenticate your devotee Google account in the popup window...',
      'google',
      'Authenticating with Google...'
    );

    // 1. If Firebase SDK is not yet ready, wait briefly
    if (!window.AkalbodhonFirebase || !window.AkalbodhonFirebase.isAvailable()) {
      await new Promise(resolve => {
        if (window.__akalbodhonFirebaseReady && window.AkalbodhonFirebase) return resolve();
        const handler = () => { resolve(); window.removeEventListener('akalbodhon:firebase-ready', handler); };
        window.addEventListener('akalbodhon:firebase-ready', handler);
        setTimeout(resolve, 1000);
      });
    }

    if (!window.AkalbodhonFirebase || !window.AkalbodhonFirebase.isAvailable()) {
      showAuthError('Firebase Authentication is connecting. Please try again in a few moments.', false);
      resetGoogleButtons();
      return;
    }

    // 2. Primary: Firebase Google OAuth Popup
    try {
      const profile = await window.AkalbodhonFirebase.signInWithGoogle();
      if (profile) {
        hideGlobalLoader();
        await saveUserSession(profile);
        closeAuthModal();
        closeSaveAuthPromptModal();

        if (typeof renderSavedSection === 'function') renderSavedSection();
        if (typeof renderSavedItinerary === 'function') renderSavedItinerary();
        if (typeof updateBookmarkCount === 'function') updateBookmarkCount();
        if (typeof renderFestivalPlans === 'function') renderFestivalPlans(activePlanFilter);
        if (typeof renderPandals === 'function') renderPandals();
        if (typeof renderFoodAndShopping === 'function') renderFoodAndShopping();

        // Bring devotee to home page & top
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });

        showToast(`Welcome, ${profile.username}! Signed in with Google.`, 'celebration');
        resetGoogleButtons();
        setTimeout(syncAllRemoteData, 60);
        return;
      }
    } catch (fbErr) {
      console.warn('Firebase Google Sign-In notice:', fbErr);

      if (fbErr.code === 'auth/popup-closed-by-user') {
        // Devotee dismissed the popup window voluntarily
        resetGoogleButtons();
        return;
      }

      if (fbErr.code === 'auth/popup-blocked') {
        showGlobalLoader(
          'Redirecting to Google...',
          'Popup was blocked by your browser. Redirecting directly to Google Sign-In portal...',
          'google',
          'Redirecting...'
        );

        // Browser popup blocker prevented window.open — fall back immediately to redirect
        showAuthError(
          `<div class="space-y-1.5">
            <p class="font-medium">Popup was blocked by your browser. Redirecting directly to Google Sign-In...</p>
            <div class="pt-1">
              <button type="button" id="auth-force-redirect-btn" class="px-3 py-1 bg-amber-400 text-black font-bold rounded-lg text-xs hover:bg-amber-300 transition-all cursor-pointer shadow-sm">
                Continue to Google Sign-In ↗
              </button>
            </div>
          </div>`,
          false
        );

        const forceBtn = document.getElementById('auth-force-redirect-btn');
        if (forceBtn) {
          forceBtn.onclick = () => {
            window.AkalbodhonFirebase.signInWithGoogleRedirect();
          };
        }

        try {
          await window.AkalbodhonFirebase.signInWithGoogleRedirect();
          return;
        } catch (redirErr) {
          console.error('Redirect sign-in error:', redirErr);
          showAuthError(
            'Unable to start Google sign-in redirect. Please allow popups for this site or sign in using email.',
            false
          );
          resetGoogleButtons();
          return;
        }
      }

      showAuthError(fbErr.message || 'Google sign-in could not be completed. Please try again or use email.', false);
      resetGoogleButtons();
      return;
    }
  }
  window.handleGoogleSignIn = handleGoogleSignIn;

  function handleLogout() {
    if (currentUser) {
      saveUserSpecificItinerary(currentUser, Storage.getBookmarks(), customPlans);
      if (typeof syncUserSavedItemsToSupabase === 'function') {
        syncUserSavedItemsToSupabase(Storage.getBookmarks());
      }
    }
    currentUser = null;
    localStorage.removeItem('akalbodhon_user_profile');
    localStorage.removeItem('akalbodhon_bookmarks');
    localStorage.removeItem('akalbodhon_custom_plans');
    customPlans = [];

    if (window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
      window.AkalbodhonFirebase.signOutUser().catch(() => {});
    }
    if (supabaseClient) {
      supabaseClient.auth.signOut().catch(() => {});
    }
    updateAccountUI();
    closeProfileModal();
    if (typeof updateBookmarkCount === 'function') updateBookmarkCount();
    if (typeof renderSavedSection === 'function') renderSavedSection();
    if (typeof renderSavedItinerary === 'function') renderSavedItinerary();
    if (typeof renderPandals === 'function') renderPandals();
    if (typeof renderFoodAndShopping === 'function') renderFoodAndShopping();
    if (typeof renderFestivalPlans === 'function') renderFestivalPlans(activePlanFilter);
    showToast('Signed out of Akalbodhon.', 'logout');
  }

  // ========================================================
  // 17. FESTIVAL PUJA PLANS & CUSTOM BUILDER ENGINE
  // ========================================================
  // Synchronous local cache loader for custom plans (Instant, zero-delay rendering)
  function loadLocalCustomPlans() {
    try {
      if (!isUserLoggedIn() || !currentUser) {
        customPlans = [];
        return;
      }
      const local = localStorage.getItem('akalbodhon_custom_plans');
      if (local) {
        const parsed = JSON.parse(local);
        // Guard: only accept arrays, discard corrupted values
        customPlans = Array.isArray(parsed) ? parsed : [];
      }

      // If local cache was empty, recover from currentUser or specific itinerary
      if (!Array.isArray(customPlans) || customPlans.length === 0) {
        if (currentUser && Array.isArray(currentUser.custom_plans) && currentUser.custom_plans.length > 0) {
          customPlans = [...currentUser.custom_plans];
        } else {
          const specific = loadUserSpecificItinerary(currentUser);
          if (specific && Array.isArray(specific.custom_plans) && specific.custom_plans.length > 0) {
            customPlans = [...specific.custom_plans];
          }
        }
      }

      customPlans = (customPlans || []).filter(p => {
        if (!p || typeof p !== 'object' || !p.id) return false;
        return true;
      });
      localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));
    } catch (e) {
      console.warn('Local plans cache error:', e);
      if (currentUser && Array.isArray(currentUser.custom_plans) && currentUser.custom_plans.length > 0) {
        customPlans = [...currentUser.custom_plans];
      } else {
        customPlans = [];
      }
    }
  }

  // Asynchronous remote sync for plans (Scoped strictly to current user's created plans and shared plans)
  async function syncRemotePlans() {
    let hasPlanChanges = false;
    const initialPlanCount = (customPlans || []).length;

    // 1. User-specific created plans sync
    if (currentUser) {
      const candidateIds = [
        currentUser.id,
        currentUser.user_id,
        currentUser.uid,
        currentUser.firebase_uid,
        currentUser.identifier,
        currentUser.email,
        currentUser.phone
      ].filter(Boolean).map(s => String(s).trim());

      // A. Firebase Firestore sync: fetch only plans created by this user
      if (window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
        try {
          const fbPlans = await window.AkalbodhonFirebase.fetchUserPlans(currentUser);
          if (Array.isArray(fbPlans)) {
            fbPlans.forEach(p => {
              if (!p || !p.id) return;
              const idx = customPlans.findIndex(cp => cp.id === p.id);
              if (idx >= 0) {
                customPlans[idx] = { ...customPlans[idx], ...p };
              } else {
                customPlans.push(p);
                hasPlanChanges = true;
              }
            });
          }
        } catch (fbErr) {
          console.warn('Firebase user plans load notice:', fbErr);
        }
      }

      // B. Supabase sync: fetch only plans where creator_id or creator_email belongs to current user
      if (supabaseClient && candidateIds.length > 0) {
        try {
          let supaQuery = supabaseClient.from('puja_plans').select('*');
          if (currentUser.email) {
            supaQuery = supaQuery.or(`creator_id.in.(${candidateIds.join(',')}),creator_email.eq.${currentUser.email.toLowerCase()}`);
          } else {
            supaQuery = supaQuery.in('creator_id', candidateIds);
          }
          const { data, error } = await supaQuery.order('created_at', { ascending: false });

          if (!error && Array.isArray(data)) {
            const remotePlans = data
              .map(p => {
                let parsedPandals = [];
                try { parsedPandals = typeof p.pandals === 'string' ? JSON.parse(p.pandals) : (p.pandals || []); } catch (_) { parsedPandals = []; }
                let parsedFood = [];
                try { parsedFood = typeof p.food_stops === 'string' ? JSON.parse(p.food_stops) : (p.food_stops || []); } catch (_) { parsedFood = []; }
                let parsedRituals = [];
                try { parsedRituals = typeof p.rituals === 'string' ? JSON.parse(p.rituals) : (p.rituals || []); } catch (_) { parsedRituals = []; }

                return {
                  id: p.id,
                  title: p.title,
                  day_tag: p.day_tag,
                  day_key: (p.day_tag || '').toLowerCase().replace(/[^a-z]/g, ''),
                  date_str: p.date_str,
                  creator_name: p.creator_name,
                  creator_avatar: p.creator_avatar || '🌺',
                  creator_id: p.creator_id,
                  route_summary: p.route_summary,
                  pandals: parsedPandals,
                  food_stops: parsedFood,
                  rituals: parsedRituals,
                  custom_notes: p.custom_notes
                };
              });

            remotePlans.forEach(p => {
              const idx = customPlans.findIndex(cp => cp.id === p.id);
              if (idx >= 0) {
                customPlans[idx] = { ...customPlans[idx], ...p };
              } else {
                customPlans.push(p);
                hasPlanChanges = true;
              }
            });
          }
        } catch (supaErr) {
          console.warn('Supabase user plans load notice:', supaErr);
        }
      }
    }

    // 2. Cascade Deletion & Verification for Shared Plans:
    // Only check plans with an explicit tombstone in deleted_plans collection
    const sharedPlansToCheck = (customPlans || []).filter(p => !p.is_template && p.is_shared === true && !isCurrentUserPlan(p, currentUser));
    if (sharedPlansToCheck.length > 0) {
      const deletedPlanIds = new Set();

      // Check against Firestore deleted_plans tombstone collection ONLY
      if (window.AkalbodhonFirebase && typeof window.AkalbodhonFirebase.getDeletedPlanIds === 'function') {
        try {
          const tombstoned = await window.AkalbodhonFirebase.getDeletedPlanIds(sharedPlansToCheck.map(p => p.id));
          if (Array.isArray(tombstoned)) {
            tombstoned.forEach(id => deletedPlanIds.add(id));
          }
        } catch (_) {}
      }

      if (deletedPlanIds.size > 0) {
        customPlans = customPlans.filter(p => !deletedPlanIds.has(p.id));
        hasPlanChanges = true;

        if (currentUser && Array.isArray(currentUser.custom_plans)) {
          currentUser.custom_plans = currentUser.custom_plans.filter(p => !deletedPlanIds.has(p.id));
          try {
            localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser));
            saveUserSpecificItinerary(currentUser, Storage.getBookmarks(), customPlans);
          } catch (_) {}

          if (window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
            window.AkalbodhonFirebase.syncProfile({
              id: currentUser.id || currentUser.user_id,
              custom_plans: customPlans
            }).catch(() => {});
          }
        }

        // If receiver is currently viewing an explicitly tombstoned plan in the modal, close modal and warn
        if (window.activeViewingPlanId && deletedPlanIds.has(window.activeViewingPlanId)) {
          if (typeof window.closeViewPlanModal === 'function') window.closeViewPlanModal();
          showToast('This shared plan was deleted by its creator.', 'warning');
        }
      }
    }

    // 3. Persist and trigger re-render if plans changed
    if (hasPlanChanges || customPlans.length !== initialPlanCount) {
      localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));
      if (currentUser) {
        currentUser.custom_plans = customPlans;
        try { localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser)); } catch (_) {}
      }
      if (typeof renderFestivalPlans === 'function') {
        renderFestivalPlans(activePlanFilter || 'all');
      }
      if (typeof renderSavedItinerary === 'function') {
        renderSavedItinerary();
      }
      if (typeof renderSavedSection === 'function') {
        renderSavedSection();
      }
      if (typeof updateBookmarkCount === 'function') {
        updateBookmarkCount();
      }
    }
  }

  // Combined background remote data synchronizer
  async function syncAllRemoteData() {
    showTopProgressBar();
    try {
      await Promise.allSettled([
        syncRemotePlans(),
        syncRemoteUserSession()
      ]);
    } finally {
      hideTopProgressBar();
    }
  }

  // Robust check if a custom plan belongs to the current devotee across all auth providers
  function isCurrentUserPlan(plan, user) {
    if (!plan) return false;
    if (plan.is_template || MASTER_PUJA_PLANS.some(mp => mp.id === plan.id)) return false;

    // If explicitly marked as an imported shared plan with a different creator ID
    if (plan.is_shared === true && plan.creator_id) {
      if (!user) return false;
      const creatorId = String(plan.creator_id).trim().toLowerCase();
      const candidateIds = [
        user.id,
        user.user_id,
        user.uid,
        user.firebase_uid,
        user.identifier,
        user.email,
        user.phone,
        user.username
      ].filter(Boolean).map(s => String(s).trim().toLowerCase());

      if (candidateIds.includes(creatorId)) return true;

      const creatorDigits = creatorId.replace(/[^0-9]/g, '');
      if (creatorDigits.length >= 7) {
        for (const cid of candidateIds) {
          const uDigits = cid.replace(/[^0-9]/g, '');
          if (uDigits.length >= 7 && (uDigits.endsWith(creatorDigits) || creatorDigits.endsWith(uDigits))) {
            return true;
          }
        }
      }
      return false;
    }

    // Any plan created or present in the current user's session is their own plan
    return true;
  }

  function renderFestivalPlans(dayFilter = 'all') {
    activePlanFilter = dayFilter;
    const planDropdown = document.getElementById('plan-filter-dropdown');
    if (planDropdown && planDropdown.value !== dayFilter) {
      planDropdown.value = dayFilter;
    }
    const container = document.getElementById('plans-list-container');
    if (!container) return;

    // Master Festival Plans ONLY for the public website (custom plans live in personal Itinerary)
    let allPlans = [...MASTER_PUJA_PLANS];

    if (dayFilter !== 'all') {
      allPlans = allPlans.filter(p => {
        const tag = (p.day_tag || '').toLowerCase();
        const key = (p.day_key || '').toLowerCase();
        return tag.includes(dayFilter) || key.includes(dayFilter);
      });
    }

    if (allPlans.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-16 px-4 rounded-3xl bg-surface-container-low dark:bg-[#1a160f] border border-outline-variant/30 dark:border-amber-400/20 space-y-3">
          <span class="text-4xl">🪔</span>
          <h3 class="font-display text-xl font-bold text-on-surface dark:text-white">
            No festival plans found for this selection
          </h3>
          <p class="text-xs text-on-surface-variant dark:text-[#ded5c7] max-w-sm mx-auto">
            Choose another festive day from the filter above or craft your bespoke plan for your personal itinerary!
          </p>
          <button onclick="document.getElementById('open-create-plan-btn').click()" class="mt-2 px-4 py-2 rounded-xl bg-primary dark:bg-amber-400 text-white dark:text-black text-xs font-bold shadow-md cursor-pointer">
            + Make Your Own Plan
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = allPlans.map(plan => {
      const isCustom = !plan.is_template;
      const isMyPlan = isCurrentUserPlan(plan, currentUser);
      const pandalCount = (plan.pandals || []).length;
      const foodCount = (plan.food_stops || []).length;
      const creatorNameDisplay = isMyPlan 
        ? `You (${plan.creator_name || (currentUser && currentUser.username) || 'Devotee'})` 
        : (plan.creator_name || 'Community Devotee');

      return `
        <div id="plan-card-${plan.id}" data-plan-id="${plan.id}" class="plan-card-item glass-panel p-3 sm:p-6 rounded-2xl sm:rounded-3xl border border-outline-variant/30 dark:border-amber-400/25 shadow-xl flex flex-col justify-between space-y-3 sm:space-y-4 relative overflow-hidden group hover:border-primary/50 dark:hover:border-amber-400/50 transition-all duration-300">
          <div class="space-y-2 sm:space-y-3">
            <!-- Header: Puja Day Centered in Middle with Badge -->
            <div class="flex items-center justify-between w-full">
              <span class="px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-primary/10 dark:bg-amber-400/20 text-primary dark:text-amber-300 text-[10px] sm:text-xs font-bold text-center border border-primary/20 dark:border-amber-400/30 shadow-sm">
                ${plan.day_tag || 'Festive Day'}
              </span>
              ${isCustom ? `
                <span class="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${isMyPlan ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-secondary-container/30 text-secondary dark:text-amber-300 border border-secondary-container/40'}">
                  ${isMyPlan ? 'My Plan' : 'Shared'}
                </span>
              ` : ''}
            </div>

            <!-- Subheader: Date & Creator Name prominently displayed on plan -->
            <div class="flex flex-col items-start gap-1.5 pt-0.5 w-full">
              ${plan.date_str ? `
                <div class="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-on-surface-variant dark:text-[#ded5c7] leading-snug w-full">
                  <span class="material-symbols-outlined text-[13px] sm:text-[15px] text-primary dark:text-amber-300 shrink-0">calendar_month</span>
                  <span class="break-words font-medium">${plan.date_str}</span>
                </div>
              ` : ''}

              <!-- Creator: Clean Sacred Badge with Unbroken Creator Attribution -->
              <div class="creator-bar inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border max-w-full shadow-sm" title="Plan Creator: ${escapeHtml(plan.creator_name || 'Devotee')}">
                <span class="text-xs shrink-0">${plan.creator_avatar || '🌺'}</span>
                <span class="text-[10.5px] sm:text-xs text-neutral-800 dark:text-[#ded5c7] font-medium whitespace-nowrap shrink-0">Created by:</span>
                <span class="creator-name-pill text-[10.5px] sm:text-xs font-extrabold truncate min-w-0">${escapeHtml(plan.creator_name || creatorNameDisplay)}</span>
              </div>
            </div>

            <!-- Title -->
            <div>
              <h3 class="font-display text-xs sm:text-lg font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-amber-300 transition-colors line-clamp-2">
                ${plan.title}
              </h3>
              ${(plan.custom_notes || plan.description) ? `
                <p class="text-[11px] text-on-surface-variant/90 dark:text-[#ded5c7]/80 line-clamp-2 italic pt-1">
                  "${escapeHtml(plan.custom_notes || plan.description)}"
                </p>
              ` : ''}
            </div>

            <!-- Compact Preview Badges -->
            <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5 text-[9px] sm:text-xs text-on-surface-variant dark:text-[#ded5c7]">
              ${pandalCount > 0 ? `
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-high dark:bg-[#252016] border border-outline-variant/20 dark:border-amber-400/20 font-medium">
                  🏛️ ${pandalCount} Pandals
                </span>
              ` : `
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-high dark:bg-[#252016] border border-outline-variant/20 dark:border-amber-400/20 font-medium">
                  🪷 Rituals & Family Gathering
                </span>
              `}
              ${foodCount > 0 ? `
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-high dark:bg-[#252016] border border-outline-variant/20 dark:border-amber-400/20 font-medium">
                  🍽️ ${foodCount} Food Stops
                </span>
              ` : ''}
            </div>
          </div>

          <!-- Action: View Plan Button & Quick Save to Itinerary -->
          <div class="pt-2 sm:pt-3 border-t border-outline-variant/30 dark:border-amber-400/20 flex items-center gap-2">
            <button onclick="window.openViewPlanModal('${plan.id}')" class="flex-1 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl bg-primary dark:bg-amber-400 hover:bg-primary-container dark:hover:bg-amber-300 text-white dark:text-black font-bold text-xs sm:text-sm shadow-md hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[15px] sm:text-[18px]">visibility</span>
              <span>View Plan</span>
            </button>
            <button onclick="event.stopPropagation(); window.savePlanToItinerary('${plan.id}')" class="p-2 sm:p-2.5 rounded-xl border ${customPlans.some(p => p.id === plan.id) ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500 dark:text-emerald-400' : 'border-outline-variant/40 dark:border-amber-400/30 text-primary dark:text-amber-300 hover:bg-primary/10'} text-xs font-bold transition-all flex items-center justify-center cursor-pointer shrink-0" title="${customPlans.some(p => p.id === plan.id) ? 'Saved in Itinerary (Click to Remove)' : 'Save entire plan to Itinerary'}">
              <span class="material-symbols-outlined text-[17px]">${customPlans.some(p => p.id === plan.id) ? 'bookmark_added' : 'bookmark_add'}</span>
            </button>
            ${isCustom && isMyPlan ? `
              <button onclick="event.stopPropagation(); window.deleteCustomPlan('${plan.id}')" class="p-2 sm:p-2.5 rounded-xl border border-outline-variant/40 dark:border-amber-400/30 text-outline hover:text-error hover:bg-red-500/10 dark:text-[#ded5c7] dark:hover:text-red-400 transition-all cursor-pointer shrink-0" title="Delete Plan">
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    setTimeout(initScrollReveal, 50);
  }

  // Active listener unsubscribe handle for real-time plan members sync
  let activePlanListenerUnsub = null;

  // Discontinued: Friends Hopping Together feature removed per user specifications
  async function joinPlanAsMember(planId, userProfile) {
    return;
  }
  window.joinPlanAsMember = joinPlanAsMember;

  // Helper: Creator-Controlled Custom Plan Description Updater (Stored in DB and Synced with Plan)
  window.updatePlanDescription = async function (planId, newDescription) {
    if (!planId) return false;
    const cleanDesc = (newDescription || '').trim();

    // 1. Update in local memory & local storage
    const localPlan = customPlans.find(p => p.id === planId);
    if (localPlan) {
      localPlan.custom_notes = cleanDesc;
      localPlan.description = cleanDesc;
      localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));
    }

    // 2. Save directly to Firebase Firestore ('plans' collection and devotee account)
    if (window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
      try {
        await window.AkalbodhonFirebase.savePlan({
          id: planId,
          custom_notes: cleanDesc,
          description: cleanDesc,
          updated_at: new Date().toISOString()
        });
      } catch (fbErr) {
        console.warn('Firebase plan description sync notice:', fbErr);
      }
    }

    // 3. Save to Supabase (puja_plans table)
    if (supabaseClient) {
      try {
        await supabaseClient.from('puja_plans').update({
          custom_notes: cleanDesc,
          updated_at: new Date().toISOString()
        }).eq('id', planId);
      } catch (sbErr) {
        console.warn('Supabase plan description sync notice:', sbErr);
      }
    }

    return true;
  };

  // ========================================================
  // VIEW FULL PUJA PLAN OVERLAY MODAL ENGINE
  // ========================================================
  window.openViewPlanModal = function (planId) {
    if (!customPlans || customPlans.length === 0) {
      loadLocalCustomPlans();
    }
    let allPlans = [...MASTER_PUJA_PLANS, ...customPlans];
    if (window.__sharedPlansMap && window.__sharedPlansMap.has(planId)) {
      allPlans.push(window.__sharedPlansMap.get(planId));
    }
    if (currentUser && Array.isArray(currentUser.custom_plans)) {
      currentUser.custom_plans.forEach(cp => {
        if (cp && cp.id && !allPlans.some(p => p.id === cp.id)) {
          allPlans.push(cp);
        }
      });
    }
    const plan = allPlans.find(p => p.id === planId);
    if (!plan) return;

    window.activeViewingPlanId = plan.id;

    const modal = document.getElementById('view-plan-modal');
    if (!modal) return;

    // Day badge
    const dayBadge = document.getElementById('vp-day-badge');
    if (dayBadge) dayBadge.textContent = plan.day_tag || 'Festive Day';

    // Date
    const dateEl = document.getElementById('vp-date');
    if (dateEl) {
      dateEl.innerHTML = `<span class="material-symbols-outlined text-[14px] text-primary dark:text-amber-300">calendar_month</span> <span>${escapeHtml(plan.date_str || plan.day_tag || 'Festive Day')}</span>`;
    }

    // Host & Creator Name
    const hostAvatar = document.getElementById('vp-host-avatar');
    const hostName = document.getElementById('vp-host-name');
    if (hostAvatar) hostAvatar.textContent = plan.creator_avatar || '🌺';
    if (hostName) {
      if (currentUser && (plan.creator_id === currentUser.id || plan.creator_id === currentUser.user_id)) {
        hostName.textContent = `You (${plan.creator_name || currentUser.username || 'Devotee'})`;
      } else {
        hostName.textContent = plan.creator_name || 'Community Devotee';
      }
    }

    // Title
    const titleEl = document.getElementById('vp-title');
    if (titleEl) titleEl.textContent = plan.title;

    // Determine if viewer is the plan creator (only creator can edit description anytime)
    const isPlanCreator = !plan.is_template && currentUser && (
      plan.creator_id === currentUser.id ||
      plan.creator_id === currentUser.user_id ||
      plan.creator_id === currentUser.uid ||
      (currentUser.username && plan.creator_name && currentUser.username.toLowerCase() === plan.creator_name.toLowerCase())
    );

    // Custom Description & Creator Edit Logic
    const descSection = document.getElementById('vp-desc-section');
    const descView = document.getElementById('vp-desc-view');
    const notesEl = document.getElementById('vp-notes');
    const editDescBtn = document.getElementById('vp-edit-desc-btn');
    const editDescBtnText = document.getElementById('vp-edit-desc-btn-text');
    const editForm = document.getElementById('vp-desc-edit-form');
    const descInput = document.getElementById('vp-desc-input');
    const cancelDescBtn = document.getElementById('vp-desc-cancel-btn');
    const saveDescBtn = document.getElementById('vp-desc-save-btn');

    function renderDescriptionDisplay() {
      const currentDesc = (plan.custom_notes || plan.description || '').trim();
      if (editForm) editForm.classList.add('hidden');
      if (descView) descView.classList.remove('hidden');

      if (notesEl) {
        if (currentDesc) {
          notesEl.textContent = `"${currentDesc}"`;
          notesEl.classList.remove('hidden');
        } else {
          notesEl.textContent = '';
          notesEl.classList.add('hidden');
        }
      }

      if (editDescBtn) {
        if (isPlanCreator) {
          editDescBtn.classList.remove('hidden');
          if (editDescBtnText) {
            editDescBtnText.textContent = currentDesc ? 'Edit Description' : 'Add Custom Description';
          }
        } else {
          editDescBtn.classList.add('hidden');
        }
      }
    }

    renderDescriptionDisplay();

    if (editDescBtn && isPlanCreator) {
      editDescBtn.onclick = () => {
        if (descView) descView.classList.add('hidden');
        if (editForm) {
          editForm.classList.remove('hidden');
          if (descInput) {
            descInput.value = (plan.custom_notes || plan.description || '').trim();
            descInput.focus();
          }
        }
      };
    }

    if (cancelDescBtn) {
      cancelDescBtn.onclick = () => {
        renderDescriptionDisplay();
      };
    }

    if (saveDescBtn && isPlanCreator) {
      saveDescBtn.onclick = async () => {
        const newDesc = descInput ? descInput.value.trim() : '';
        saveDescBtn.disabled = true;
        saveDescBtn.innerHTML = `<span class="material-symbols-outlined animate-spin text-[14px]">progress_activity</span> Saving...`;

        try {
          await window.updatePlanDescription(plan.id, newDesc);
          plan.custom_notes = newDesc;
          plan.description = newDesc;
          renderDescriptionDisplay();
          if (typeof renderFestivalPlans === 'function') {
            renderFestivalPlans(activePlanFilter);
          }
          showToast('Custom description updated successfully!', 'success');
        } catch (err) {
          console.warn('Failed to update plan description:', err);
          showToast('Failed to save description. Please try again.', 'error');
        } finally {
          saveDescBtn.disabled = false;
          saveDescBtn.innerHTML = `<span class="material-symbols-outlined text-[14px]">check</span> Save Description`;
        }
      };
    }

    // Route summary
    const routeSec = document.getElementById('vp-route-section');
    const routeText = document.getElementById('vp-route-text');
    if (routeSec && routeText) {
      if (plan.route_summary) {
        routeText.textContent = plan.route_summary;
        routeSec.classList.remove('hidden');
      } else {
        routeSec.classList.add('hidden');
      }
    }

    // Pandals list
    const pandalsSec = document.getElementById('vp-pandals-section');
    const pandalsList = document.getElementById('vp-pandals-list');
    const pandalsCount = document.getElementById('vp-pandals-count');
    const pandals = plan.pandals || [];
    if (pandalsSec) {
      if (pandals.length > 0) {
        pandalsSec.classList.remove('hidden');
      } else {
        pandalsSec.classList.add('hidden');
      }
    }
    if (pandalsCount) pandalsCount.textContent = `${pandals.length} Pandals`;

    if (pandalsList) {
      pandalsList.innerHTML = pandals.map(p => {
        const pName = typeof p === 'string' ? p : p.name;
        const isLocal = pName.toLowerCase().includes('local') || pName.toLowerCase().includes('respective');
        if (isLocal) {
          return `
            <div class="p-2.5 sm:p-3 rounded-xl bg-surface-container-high dark:bg-[#252016] border border-outline-variant/30 dark:border-amber-400/20 flex items-center justify-between gap-2 shadow-sm">
              <div class="min-w-0 flex-1">
                <span class="font-bold text-xs text-on-surface dark:text-white block">🏛️ ${escapeHtml(pName)}</span>
              </div>
              <span class="py-1 px-2.5 rounded-xl bg-primary/10 dark:bg-amber-400/20 text-primary dark:text-amber-300 text-[11px] font-semibold flex items-center gap-1 shrink-0">
                <span class="material-symbols-outlined text-[13px]">home_pin</span>
                <span>Your Locality</span>
              </span>
            </div>
          `;
        }

        const matched = PANDALS_DATA.find(pd => pd.name.toLowerCase() === pName.toLowerCase());
        const metro = matched ? (matched.metro_station || matched.transit_info || matched.location) : null;
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pName + ' Durga Puja Kolkata')}`;

        return `
          <div class="p-2.5 sm:p-3 rounded-xl bg-surface-container-high dark:bg-[#252016] border border-outline-variant/30 dark:border-amber-400/20 flex items-center justify-between gap-2 shadow-sm hover:border-primary/40 dark:hover:border-amber-400/40 transition-all">
            <div class="min-w-0 flex-1">
              <span class="font-bold text-xs text-on-surface dark:text-white block truncate">🏛️ ${escapeHtml(pName)}</span>
              ${metro ? `
                <div class="mt-1 flex items-center gap-1 text-[10px] text-on-surface-variant dark:text-[#ded5c7]">
                  <span class="material-symbols-outlined text-[12px] text-primary dark:text-amber-300 shrink-0">directions_transit</span>
                  <span class="truncate">${escapeHtml(metro)}</span>
                </div>
              ` : ''}
            </div>
            <a href="${toMapsSearchUrl(mapsUrl, pName + ' Durga Puja Kolkata')}" target="_blank" rel="noopener noreferrer" class="py-1 px-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-bold shadow-sm hover:scale-105 transition-all flex items-center gap-1 shrink-0 cursor-pointer" title="Search Location in Google Maps">
              <img src="maps-pin.png" alt="Open in Maps" class="w-3.5 h-3.5 shrink-0 object-contain" />
              <span>Open in Maps</span>
            </a>
          </div>
        `;
      }).join('');
    }

    // Food stops list
    const foodSec = document.getElementById('vp-food-section');
    const foodList = document.getElementById('vp-food-list');
    const foodStops = plan.food_stops || [];
    if (foodSec && foodList) {
      if (foodStops.length > 0) {
        foodSec.classList.remove('hidden');
        foodList.innerHTML = foodStops.map(f => {
          const fName = typeof f === 'string' ? f : f.name;
          const dish = typeof f === 'object' && f.dish ? f.dish : null;
          const matchedFood = FOOD_DATA.find(fd => fd.name.toLowerCase() === fName.toLowerCase());
          const foodMapsUrl = toMapsSearchUrl(matchedFood && matchedFood.locationUrl ? matchedFood.locationUrl : null, fName + ' Kolkata');
          return `
            <div class="p-2 sm:p-2.5 rounded-xl bg-surface-container-high dark:bg-[#252016] border border-outline-variant/30 dark:border-amber-400/20 flex items-center justify-between gap-2 shadow-sm hover:border-primary/40 dark:hover:border-amber-400/40 transition-all">
              <div class="min-w-0 flex-1">
                <span class="font-semibold text-xs text-on-surface dark:text-white block truncate">🍽️ ${escapeHtml(fName)}</span>
                ${dish ? `<span class="text-on-surface-variant dark:text-[#ded5c7] block text-[11px] truncate">${escapeHtml(dish)}</span>` : ''}
              </div>
              <a href="${foodMapsUrl}" target="_blank" rel="noopener noreferrer" class="py-1 px-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-bold shadow-sm hover:scale-105 transition-all flex items-center gap-1 shrink-0 cursor-pointer" title="Search Location in Google Maps">
                <img src="maps-pin.png" alt="Open in Maps" class="w-3.5 h-3.5 shrink-0 object-contain" />
                <span>Open in Maps</span>
              </a>
            </div>
          `;
        }).join('');
      } else {
        foodSec.classList.add('hidden');
      }
    }

    // Fetch freshest plan from Firebase Firestore (safely update notes/description if available)
    if (window.AkalbodhonFirebase && typeof window.AkalbodhonFirebase.fetchPlanById === 'function') {
      window.AkalbodhonFirebase.fetchPlanById(plan.id).then(fresh => {
        if (fresh) {
          if (fresh.custom_notes !== undefined || fresh.description !== undefined) {
            const freshDesc = (fresh.custom_notes !== undefined ? fresh.custom_notes : fresh.description) || '';
            plan.custom_notes = freshDesc;
            plan.description = freshDesc;
            renderDescriptionDisplay();
          }
        }
      }).catch(() => {});
    }

    // Set up real-time listener: reflect remote description edits safely
    if (activePlanListenerUnsub) {
      try { activePlanListenerUnsub(); } catch (e) {}
      activePlanListenerUnsub = null;
    }
    if (window.AkalbodhonFirebase && typeof window.AkalbodhonFirebase.listenToPlan === 'function') {
      activePlanListenerUnsub = window.AkalbodhonFirebase.listenToPlan(plan.id, (fresh) => {
        if (fresh && !fresh.deleted) {
          if (fresh.custom_notes !== undefined || fresh.description !== undefined) {
            const freshDesc = (fresh.custom_notes !== undefined ? fresh.custom_notes : fresh.description) || '';
            plan.custom_notes = freshDesc;
            plan.description = freshDesc;
            renderDescriptionDisplay();
          }
        }
      });
    }

    // Share button in Bottom action bar - Available for all plans (master and custom)
    const shareBtn = document.getElementById('vp-share-btn');
    if (shareBtn) {
      shareBtn.classList.remove('hidden');
      shareBtn.onclick = () => {
        window.openSharePlanModal(plan.id);
      };
    }

    // Save button (adapts for personal itinerary vs shared plan)
    const saveBtn = document.getElementById('vp-save-btn');
    if (saveBtn) {
      const isSaved = customPlans.some(p => p.id === plan.id);
      if (isSaved) {
        saveBtn.innerHTML = `<span class="material-symbols-outlined text-[17px]">bookmark_added</span> <span id="vp-save-btn-text">Saved in Itinerary</span>`;
        saveBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-700', 'text-white');
        saveBtn.classList.remove('text-on-surface', 'dark:text-amber-300');
        saveBtn.title = "Click to remove this plan from your Itinerary";
      } else {
        saveBtn.innerHTML = `<span class="material-symbols-outlined text-[17px]">bookmark_add</span> <span id="vp-save-btn-text">Save to Itinerary</span>`;
        saveBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700', 'text-white');
        saveBtn.classList.add('text-on-surface', 'dark:text-amber-300');
        saveBtn.title = "Save entire plan to your Itinerary";
      }
      saveBtn.onclick = () => {
        window.savePlanToItinerary(plan.id);
      };
    }

    // Delete button (strictly for custom created plans owned by active user)
    const deleteBtn = document.getElementById('vp-delete-btn');
    const isDeletable = !plan.is_template && currentUser && (plan.creator_id === currentUser.id || plan.creator_id === currentUser.user_id);
    if (deleteBtn) {
      if (isDeletable) {
        deleteBtn.classList.remove('hidden');
        deleteBtn.onclick = () => {
          window.closeViewPlanModal();
          window.deleteCustomPlan(plan.id);
        };
      } else {
        deleteBtn.classList.add('hidden');
      }
    }

    document.body.classList.add('modal-open');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  window.closeViewPlanModal = function () {
    window.activeViewingPlanId = null;
    if (activePlanListenerUnsub) {
      try { activePlanListenerUnsub(); } catch (e) {}
      activePlanListenerUnsub = null;
    }
    const modal = document.getElementById('view-plan-modal');
    if (modal) {
      document.body.classList.remove('modal-open');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('plan') || urlParams.has('pdata')) {
      const cleanUrl = window.location.pathname + (window.location.hash || '#plans');
      window.history.replaceState({}, document.title, cleanUrl);
    }
  };

  function initViewPlanModal() {
    const modal = document.getElementById('view-plan-modal');
    const closeBtn = document.getElementById('close-view-plan-modal-btn');
    if (closeBtn) {
      closeBtn.onclick = window.closeViewPlanModal;
    }
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          window.closeViewPlanModal();
        }
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        window.closeViewPlanModal();
      }
    });
  }

  // Create Custom Plan Modal
  function initPlanCreatorModal() {
    const openBtn = document.getElementById('open-create-plan-btn');
    const modal = document.getElementById('create-plan-modal');
    const closeBtn = document.getElementById('close-create-plan-modal-btn');
    const form = document.getElementById('create-plan-form');
    const saveBtn = document.getElementById('save-new-plan-btn');
    const pandalsPicker = document.getElementById('plan-pandals-picker');

    if (pandalsPicker) {
      pandalsPicker.innerHTML = PANDALS_DATA.map(p => `
        <label class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-high dark:hover:bg-[#252016] text-xs text-on-surface dark:text-white cursor-pointer select-none">
          <input type="checkbox" value="${p.name}" class="rounded text-primary focus:ring-primary dark:accent-amber-400" />
          <span class="truncate">${p.name}</span>
        </label>
      `).join('');
    }

    function openModal() {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    if (openBtn && modal) {
      openBtn.onclick = (e) => {
        if (e) e.preventDefault();
        if (!isUserLoggedIn() || !currentUser) {
          promptAuthBeforeSave({
            title: 'Sign In to Create Custom Plan',
            message: 'Please <strong>log in</strong> or <strong>create an account</strong> to craft your custom Puja plan and save it to your personal itinerary.',
            categoryName: 'Custom Plans',
            defaultMode: 'login',
            onAuthenticatedSave: () => {
              openModal();
            }
          });
          return;
        }
        openModal();
      };
    }

    if (closeBtn && modal) {
      closeBtn.onclick = (e) => {
        if (e) e.preventDefault();
        closeModal();
      };
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    async function handleSaveNewPlan(e) {
      if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
      }

      let title = document.getElementById('plan-title-input')?.value.trim() || '';
      const day = document.getElementById('plan-day-select')?.value || '';
      const route = document.getElementById('plan-route-input')?.value.trim() || '';
      const customPandals = document.getElementById('plan-custom-pandals-input')?.value.trim();
      const food = document.getElementById('plan-food-input')?.value.trim() || '';
      const rituals = document.getElementById('plan-rituals-input')?.value.trim() || '';
      const customDescription = document.getElementById('plan-description-input')?.value.trim() || '';

      // Collect checked pandals (if user skips, remains empty)
      let checkedPandals = Array.from(pandalsPicker?.querySelectorAll('input[type="checkbox"]:checked') || []).map(cb => cb.value);
      if (customPandals) {
        customPandals.split(',').map(s => s.trim()).filter(Boolean).forEach(p => checkedPandals.push(p));
      }

      const foodStopsList = food ? food.split(',').map(s => ({ name: s.trim() })).filter(s => s.name) : [];
      const ritualsList = rituals ? rituals.split(',').map(s => ({ name: s.trim() })).filter(s => s.name) : [];

      // Determine creator identity
      let creatorUserId;
      let creatorDisplayName;
      let creatorAvatar;

      if (currentUser && (currentUser.id || currentUser.user_id || currentUser.identifier)) {
        creatorUserId = currentUser.id || currentUser.user_id || currentUser.identifier;
        creatorDisplayName = currentUser.username || currentUser.name || currentUser.identifier || 'Devotee';
        creatorAvatar = currentUser.avatar || '🌺';
      } else {
        let guestId = null;
        try { guestId = localStorage.getItem('akalbodhon_guest_devotee_id'); } catch (_) {}
        if (!guestId) {
          guestId = 'devotee_' + Date.now().toString(36);
          try { localStorage.setItem('akalbodhon_guest_devotee_id', guestId); } catch (_) {}
        }
        creatorUserId = guestId;
        creatorDisplayName = 'Devotee';
        creatorAvatar = (Array.isArray(PUJA_AVATARS) && PUJA_AVATARS.length > 0)
          ? PUJA_AVATARS[Math.floor(Math.random() * PUJA_AVATARS.length)].icon
          : '🌺';
      }

      const PUJA_DAY_DATES = {
        'Mahalaya': '10 October 2026',
        'Maha Shasthi': '17 October 2026',
        'Maha Saptami': '18 October 2026',
        'Maha Ashtami': '19 October 2026',
        'Maha Navami': '20 October 2026',
        'Bijoya Dashami': '21 October 2026',
        'Custom Festival Day': 'Durga Puja 2026'
      };
      const resolvedDateStr = day ? (PUJA_DAY_DATES[day] || (day.includes('2026') ? day : `${day} (Durga Puja 2026)`)) : '';

      const newPlan = {
        id: 'plan_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5),
        creator_id: creatorUserId,
        creator_email: (currentUser?.email || '').toLowerCase().trim(),
        creator_name: creatorDisplayName,
        creator_avatar: creatorAvatar,
        title: title,
        day_tag: day,
        day_key: day ? day.toLowerCase().replace(/[^a-z]/g, '') : '',
        date_str: resolvedDateStr,
        route_summary: route,
        pandals: checkedPandals,
        food_stops: foodStopsList,
        rituals: ritualsList,
        custom_notes: customDescription,
        description: customDescription,
        created_at: new Date().toISOString()
      };

      showTopProgressBar();

      // OPTIMISTIC LOCAL SAVE (Custom plans are strictly scoped to devotee's personal itinerary)
      newPlan.saved_to_itinerary = true;
      customPlans.unshift(newPlan);
      try {
        localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));
      } catch (err) {
        console.warn('LocalStorage save error:', err);
      }

      if (currentUser) {
        currentUser.custom_plans = customPlans;
        try {
          localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser));
        } catch (_) {}
        saveUserSpecificItinerary(currentUser, Storage.getBookmarks(), customPlans);
      }

      // Close modal and reset form
      closeModal();
      if (form) form.reset();
      const titleInput = document.getElementById('plan-title-input');
      if (titleInput) titleInput.value = '';
      const descInputEl = document.getElementById('plan-description-input');
      if (descInputEl) descInputEl.value = '';

      // Navigate devotee directly to personal itinerary under Custom Plans
      activeSavedTab = 'plans';
      window.location.hash = 'saved';
      document.querySelectorAll('.app-section').forEach(sec => sec.classList.add('hidden'));
      const savedSec = document.getElementById('section-saved');
      if (savedSec) {
        savedSec.classList.remove('hidden');
        savedSec.classList.add('tab-content');
      }
      document.querySelectorAll('[data-nav-target]').forEach(link => {
        if (link.dataset.navTarget === 'saved') {
          link.classList.add('text-primary', 'dark:text-amber-300', 'font-bold');
          link.classList.remove('text-on-surface-variant', 'font-normal');
        } else {
          link.classList.remove('text-primary', 'dark:text-amber-300', 'font-bold');
          link.classList.add('text-on-surface-variant', 'font-normal');
        }
      });

      renderSavedItinerary('plans');
      updateBookmarkCount();

      // Smoothly highlight new plan card in the Itinerary
      setTimeout(() => {
        const newCard = document.getElementById(`itinerary-plan-${newPlan.id}`);
        if (newCard) {
          newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          newCard.classList.add('ring-2', 'ring-primary', 'dark:ring-amber-400');
          setTimeout(() => newCard.classList.remove('ring-2', 'ring-primary', 'dark:ring-amber-400'), 2500);
        }
      }, 200);

      showToast(`🎉 "${title}" created and saved to your personal Itinerary!`, 'celebration');
      setTimeout(hideTopProgressBar, 500);

      // NON-BLOCKING REMOTE SYNC (Cloud persistence in background)
      (async () => {
        // 1. Supabase insert
        if (supabaseClient) {
          try {
            await supabaseClient.from('puja_plans').insert([{
              id: newPlan.id,
              creator_id: newPlan.creator_id,
              creator_email: newPlan.creator_email || null,
              creator_name: newPlan.creator_name,
              creator_avatar: newPlan.creator_avatar,
              title: newPlan.title,
              day_tag: newPlan.day_tag,
              date_str: newPlan.date_str,
              route_summary: newPlan.route_summary,
              pandals: newPlan.pandals,
              food_stops: newPlan.food_stops,
              rituals: newPlan.rituals,
              custom_notes: newPlan.custom_notes || ''
            }]);
          } catch (sbErr) {
            console.warn('Supabase custom plan insert notice:', sbErr);
          }

          if (currentUser) {
            try {
              const targetId = (currentUser.id || '').toLowerCase();
              const targetUid = currentUser.user_id || currentUser.id;
              await supabaseClient.from('profiles').upsert({
                id: targetId,
                user_id: targetUid,
                email: currentUser.email || null,
                custom_plans: customPlans,
                updated_at: new Date().toISOString()
              }, { onConflict: 'id' });
            } catch (_) {}
          }
        }

        // 2. Firebase Firestore insert
        if (window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
          try {
            await window.AkalbodhonFirebase.savePlan(newPlan);
          } catch (fbErr) {
            console.warn('Firebase custom plan save notice:', fbErr);
          }

          if (currentUser) {
            try {
              await window.AkalbodhonFirebase.syncProfile({
                ...currentUser,
                id: currentUser.id || currentUser.user_id,
                custom_plans: customPlans
              });
            } catch (_) {}
          }
        }
      })().catch(bgErr => console.warn('Background sync notice:', bgErr));

      return false;
    }

    if (form) {
      form.onsubmit = handleSaveNewPlan;
    }
    if (saveBtn) {
      saveBtn.onclick = handleSaveNewPlan;
    }
  }

  // ========================================================
  // 17. MULTI-CHANNEL SOCIAL SHARE & SMART DEEP LINKING
  // ========================================================

  async function copyTextToClipboard(text) {
    if (!text) return false;
    let ok = false;
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch (e) {
      console.warn('Clipboard writeText failed, falling back:', e);
    }
    if (!ok) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        textArea.style.left = '-9999px';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        ok = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (err) {
        console.warn('Fallback execCommand failed:', err);
      }
    }
    return ok;
  }

  function formatCustomPlanShareMessage(plan) {
    if (!plan) return '';
    const parts = [];

    // 1. Plan Name
    const title = (plan.title || '').trim();
    if (title) {
      parts.push(`🌺 *Plan Name:* ${title}`);
    }

    // 2. Puja Day
    const day = (plan.day_tag || '').trim();
    const date = (plan.date_str || '').trim();
    if (day && date && !date.includes(day)) {
      parts.push(`🗓️ *Puja Day:* ${day} (${date})`);
    } else if (day) {
      parts.push(`🗓️ *Puja Day:* ${day}`);
    } else if (date) {
      parts.push(`🗓️ *Puja Day:* ${date}`);
    }

    // 3. Route & Transit Summary
    const route = (plan.route_summary || '').trim();
    if (route) {
      parts.push(`🚇 *Route & Transit Summary:* ${route}`);
    }

    // 4. Plan Description
    const desc = (plan.custom_notes || plan.description || '').trim();
    if (desc) {
      parts.push(`📝 *Plan Description:* ${desc}`);
    }

    // 5. Pandals to Visit
    let pandals = [];
    if (Array.isArray(plan.pandals)) {
      pandals = plan.pandals.map(p => typeof p === 'string' ? p.trim() : (p && p.name ? p.name.trim() : '')).filter(Boolean);
    } else if (typeof plan.pandals === 'string' && plan.pandals.trim()) {
      pandals = plan.pandals.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (pandals.length > 0) {
      const pandalText = pandals.map((p, idx) => `  ${idx + 1}. ${p}`).join('\n');
      parts.push(`🏛️ *Pandals to Visit:*\n${pandalText}`);
    }

    // 6. Where to Eat
    let foodStops = [];
    if (Array.isArray(plan.food_stops)) {
      foodStops = plan.food_stops.map(f => typeof f === 'string' ? f.trim() : (f && f.name ? f.name.trim() : '')).filter(Boolean);
    } else if (typeof plan.food_stops === 'string' && plan.food_stops.trim()) {
      foodStops = plan.food_stops.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (foodStops.length > 0) {
      const foodText = foodStops.map(f => `  • ${f}`).join('\n');
      parts.push(`🍽️ *Where to Eat:*\n${foodText}`);
    }

    // 7. Rituals to Follow
    let rituals = [];
    if (Array.isArray(plan.rituals)) {
      rituals = plan.rituals.map(r => typeof r === 'string' ? r.trim() : (r && r.name ? r.name.trim() : '')).filter(Boolean);
    } else if (typeof plan.rituals === 'string' && plan.rituals.trim()) {
      rituals = plan.rituals.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (rituals.length > 0) {
      const ritualText = rituals.map(r => `  • ${r}`).join('\n');
      parts.push(`🪔 *Rituals to Follow:*\n${ritualText}`);
    }

    // 8. Creator Name
    const creator = (plan.creator_name || '').trim();
    if (creator) {
      parts.push(`👤 *Creator:* ${creator}`);
    }

    // 9. Website Link
    const siteUrl = (typeof window !== 'undefined' && window.location && window.location.origin) ? `${window.location.origin}${window.location.pathname}` : 'https://akalbodhon.com';
    parts.push(`🌐 *Website:* ${siteUrl}`);

    return parts.join('\n\n');
  }

  function shareToWhatsApp(message, shareUrl) {
    let fullText = message;
    if (shareUrl && !message.includes(shareUrl)) {
      fullText = `${message}\n\n👉 Open here: ${shareUrl}`;
    }
    try {
      copyTextToClipboard(fullText);
    } catch (_) {}
    const encoded = encodeURIComponent(fullText);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      const start = Date.now();
      window.location.href = `whatsapp://send?text=${encoded}`;
      setTimeout(() => {
        if (Date.now() - start < 1200) {
          window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
        }
      }, 400);
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    }
  }

  function shareToSnapchat(message, shareUrl) {
    const fullText = `${message}\n\n👉 Open here: ${shareUrl}`;
    try {
      navigator.clipboard.writeText(fullText);
    } catch (e) {}
    showToast('📋 Festive link copied! Opening Snapchat Chat...', 'send');

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      const start = Date.now();
      window.location.href = 'snapchat://chat';
      setTimeout(() => {
        if (Date.now() - start < 1500) {
          window.open('https://web.snapchat.com/', '_blank');
        }
      }, 500);
    } else {
      window.open('https://web.snapchat.com/', '_blank');
    }
  }

  function shareToInstagram(message, shareUrl) {
    const fullText = `${message}\n\n👉 Open here: ${shareUrl}`;
    try {
      navigator.clipboard.writeText(fullText);
    } catch (e) {}
    showToast('📋 Festive link copied! Opening Instagram Messages...', 'send');

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      const start = Date.now();
      window.location.href = 'instagram://direct-inbox';
      setTimeout(() => {
        if (Date.now() - start < 1500) {
          window.open('https://www.instagram.com/direct/inbox/', '_blank');
        }
      }, 500);
    } else {
      window.open('https://www.instagram.com/direct/inbox/', '_blank');
    }
  }

  async function shareViaNativeSheet(title, message, shareUrl) {
    const fullText = `${message}\n\n👉 Open here: ${shareUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Akalbodhon — Kolkata Durga Puja 2026',
          text: fullText,
          url: shareUrl
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          navigator.clipboard.writeText(shareUrl).then(() => {
            showToast('Share link copied to clipboard!', 'link');
          });
        }
      }
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Direct link copied to clipboard!', 'link');
      });
    }
  }

  window.openShareModal = function ({ type = 'website', id = null, item = null } = {}) {
    const modal = document.getElementById('share-plan-modal');
    if (!modal) return;

    let heading = 'Share Akalbodhon';
    let subTitle = 'Kolkata Durga Puja 2026';
    let shareUrl = `${window.location.origin}${window.location.pathname}`;
    let message = '';
    let label = 'Direct Website Link';
    let isCustomPlan = false;

    if (type === 'plan') {
      if (!customPlans || customPlans.length === 0) {
        loadLocalCustomPlans();
      }
      let allPlans = [...MASTER_PUJA_PLANS, ...customPlans];
      if (window.__sharedPlansMap && window.__sharedPlansMap.has(id)) {
        allPlans.push(window.__sharedPlansMap.get(id));
      }
      if (currentUser && Array.isArray(currentUser.custom_plans)) {
        currentUser.custom_plans.forEach(cp => {
          if (cp && cp.id && !allPlans.some(p => p.id === cp.id)) {
            allPlans.push(cp);
          }
        });
      }
      const plan = item || allPlans.find(p => p.id === id);
      if (!plan) return;

      const isCustom = !plan.is_template && !plan.is_shared && !MASTER_PUJA_PLANS.some(mp => mp.id === plan.id) && !(window.__sharedPlansMap && window.__sharedPlansMap.has(plan.id));

      if (isCustom) {
        isCustomPlan = true;
        heading = 'Share Custom Puja Plan';
        subTitle = `${plan.title || 'Puja Plan'} • By ${plan.creator_name || 'Devotee'}`;
        label = 'Website Link';
        shareUrl = `${window.location.origin}${window.location.pathname}`;
        message = formatCustomPlanShareMessage(plan);
      } else {
        heading = 'Share Puja Plan';
        subTitle = `${plan.title} • Listed Festival Plan`;
        label = 'Direct Plan Link';
        shareUrl = `${window.location.origin}${window.location.pathname}?plan=${encodeURIComponent(plan.id)}`;

        const pandalStops = (plan.pandals || []).slice(0, 3).map(p => typeof p === 'string' ? p : (p.name || p)).join(' ➔ ');
        const transitText = plan.route_summary ? `\n🚇 Route / Transit: ${plan.route_summary}` : '';

        message = `🌺 *Durga Puja 2026 Plan: "${plan.title}"* (${plan.day_tag || 'Festive Days'})
✨ Curated Festival Plan: Akalbodhon
🏛️ Curated Pandals: ${pandalStops || 'Iconic pandal hopping circuit'}${transitText}
🪔 View the full itinerary, map directions & food pit-stops on Akalbodhon:`;
      }

    } else if (type === 'pandal') {
      const pandal = item || PANDALS_DATA.find(p => p.id === id);
      if (!pandal) return;

      heading = 'Share Puja Pandal';
      subTitle = `${pandal.name} (${pandal.zone || 'Kolkata'})`;
      shareUrl = `${window.location.origin}${window.location.pathname}?pandal=${encodeURIComponent(pandal.id)}`;
      label = 'Direct Pandal Link';

      message = `🌸 *Durga Puja 2026: ${pandal.name}* (${pandal.zone || 'Kolkata'})
✨ Theme: ${pandal.theme || 'Heritage Pandal Art & Illumination'}
🚇 Nearest Transit: ${pandal.transit || pandal.metro || 'Kolkata Metro'}
📍 Explore pandal route, timings & nearby bhog spots on Akalbodhon:`;

    } else if (type === 'food') {
      const food = item || FOOD_DATA.find(f => f.id === id);
      if (!food) return;

      heading = 'Share Food Destination';
      subTitle = `${food.name} (${food.location || 'Kolkata'})`;
      shareUrl = `${window.location.origin}${window.location.pathname}?food=${encodeURIComponent(food.id)}`;
      label = 'Direct Food Link';

      message = `🍽️ *Durga Puja 2026 Food Trail: ${food.name}* (${food.location || 'Kolkata'})
⭐ Signature Delicacy: ${food.mustTry || 'Festive Specialty'}
🚇 Transit: ${food.metro || 'Metro Accessible'}
📍 Explore festive food trails & nearby pandals on Akalbodhon:`;

    } else if (type === 'shop') {
      const shop = item || SHOPPING_DATA.find(s => s.id === id);
      if (!shop) return;

      heading = 'Share Festive Shopping District';
      subTitle = `${shop.name} (${shop.location || 'Kolkata'})`;
      shareUrl = `${window.location.origin}${window.location.pathname}?shop=${encodeURIComponent(shop.id)}`;
      label = 'Direct Shopping Link';

      message = `🛍️ *Durga Puja 2026 Festive Shopping: ${shop.name}* (${shop.location || 'Kolkata'})
✨ Highlights: ${shop.highlight || 'Traditional Festive Shopping'}
🚇 Transit: ${shop.metro || 'Metro Accessible'}
📍 Explore shopping bazaars & festive guide on Akalbodhon:`;

    } else {
      // Website
      heading = 'Share Akalbodhon Website';
      subTitle = 'Kolkata\'s Grand Durga Puja 2026 Guide';
      shareUrl = `${window.location.origin}${window.location.pathname}`;
      label = 'Direct Website Link';

      message = `🌸 *Akalbodhon — Kolkata Durga Puja 2026!*
Explore 30+ iconic pandals, heritage Bonedi Bari circuits, live Sharodiya radio hits & Mahalaya streaming, rituals countdown, and collaborative puja plans!
✨ Check out the festive guide here:`;
    }

    // Set UI elements
    const headingEl = document.getElementById('share-modal-heading');
    if (headingEl) headingEl.textContent = heading;

    const titleEl = document.getElementById('share-modal-plan-title');
    if (titleEl) titleEl.textContent = subTitle;

    const labelEl = document.getElementById('share-link-label');
    if (labelEl) labelEl.textContent = label;

    const inputEl = document.getElementById('share-link-input');
    if (inputEl) inputEl.value = shareUrl;

    // WhatsApp Button (Synchronous user gesture preserves native window.open popup permission)
    const waBtn = document.getElementById('share-wa-btn');
    if (waBtn) {
      waBtn.onclick = () => {
        const fullMessage = isCustomPlan ? message : `${message}\n\n👉 Open here: ${shareUrl}`;
        copyTextToClipboard(fullMessage);
        showToast('Plan details copied! Opening WhatsApp...', 'send');
        shareToWhatsApp(fullMessage, isCustomPlan ? '' : shareUrl);
      };
    }

    // Copy Link Buttons
    const copyBtn = document.getElementById('share-copy-btn');
    if (copyBtn) {
      copyBtn.onclick = () => {
        const fullMessage = isCustomPlan ? message : `${message}\n\n👉 Open here: ${shareUrl}`;
        copyTextToClipboard(fullMessage);
        showToast(isCustomPlan ? 'Plan details copied to clipboard!' : 'Share link copied to clipboard!', 'check');
      };
    }

    const inlineCopyBtn = document.getElementById('copy-link-inline-btn');
    if (inlineCopyBtn) {
      inlineCopyBtn.onclick = () => {
        const fullMessage = isCustomPlan ? message : shareUrl;
        copyTextToClipboard(fullMessage);
        inlineCopyBtn.textContent = 'Copied!';
        setTimeout(() => inlineCopyBtn.textContent = 'Copy', 2000);
        showToast(isCustomPlan ? 'Plan details copied to clipboard!' : 'Direct URL copied!', 'link');
      };
    }

    document.body.classList.add('modal-open');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  // Aliases for convenient caller usage
  window.openSharePlanModal = function (planId) {
    if (!customPlans || customPlans.length === 0) {
      loadLocalCustomPlans();
    }
    let allPlans = [...MASTER_PUJA_PLANS, ...customPlans];
    if (window.__sharedPlansMap && window.__sharedPlansMap.has(planId)) {
      allPlans.push(window.__sharedPlansMap.get(planId));
    }
    if (currentUser && Array.isArray(currentUser.custom_plans)) {
      currentUser.custom_plans.forEach(cp => {
        if (cp && cp.id && !allPlans.some(p => p.id === cp.id)) {
          allPlans.push(cp);
        }
      });
    }
    const plan = allPlans.find(p => p.id === planId);
    if (!plan) return;

    window.openShareModal({ type: 'plan', id: planId, item: plan });
  };

  window.closeSharePlanModal = function () {
    const modal = document.getElementById('share-plan-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.classList.remove('modal-open');
    }
  };

  window.openShareWebsiteModal = function () {
    window.openShareModal({ type: 'website' });
  };

  window.openSharePandalModal = function (pandalId) {
    window.openShareModal({ type: 'pandal', id: pandalId });
  };

  window.openShareFoodModal = function (foodId) {
    window.openShareModal({ type: 'food', id: foodId });
  };

  window.openShareShopModal = function (shopId) {
    window.openShareModal({ type: 'shop', id: shopId });
  };

  // Food Deep Link Handler (Receiver views shared food spot on website)
  function handleSharedFoodDeepLink(foodId) {
    const cleanId = decodeURIComponent(foodId).trim().toLowerCase();
    const food = FOOD_DATA.find(f => f.id === cleanId || f.id === foodId || (f.name && f.name.toLowerCase().includes(cleanId)));

    document.querySelectorAll('.app-section').forEach(sec => sec.classList.add('hidden'));
    const fsSec = document.getElementById('section-food-shopping');
    if (fsSec) {
      fsSec.classList.remove('hidden');
      fsSec.classList.add('tab-content');
    }
    document.querySelectorAll('[data-nav-target]').forEach(link => {
      if (link.dataset.navTarget === 'food-shopping') {
        link.classList.add('text-primary', 'dark:text-amber-300', 'font-bold');
        link.classList.remove('text-on-surface-variant', 'font-normal');
      } else {
        link.classList.remove('text-primary', 'dark:text-amber-300', 'font-bold');
        link.classList.add('text-on-surface-variant', 'font-normal');
      }
    });

    if (food) {
      openDetailModal(food, 'food');
      showToast(`🍽️ Opened shared dining spot: "${food.name}"`, 'restaurant');
      setTimeout(() => {
        const card = document.querySelector(`[data-id="${food.id}"]`) || document.getElementById(`food-card-${food.id}`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.add('ring-2', 'ring-amber-400');
          setTimeout(() => card.classList.remove('ring-2', 'ring-amber-400'), 2500);
        }
      }, 300);
      const cleanUrl = window.location.pathname + '#food-shopping';
      window.history.replaceState({}, document.title, cleanUrl);
    } else {
      showToast('Dining spot not found, explore festive food options below.', 'restaurant');
      const cleanUrl = window.location.pathname + '#food-shopping';
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }

  // Shopping Deep Link Handler (Receiver views shared shopping district on website)
  function handleSharedShopDeepLink(shopId) {
    const cleanId = decodeURIComponent(shopId).trim().toLowerCase();
    const shop = SHOPPING_DATA.find(s => s.id === cleanId || s.id === shopId || (s.name && s.name.toLowerCase().includes(cleanId)));

    document.querySelectorAll('.app-section').forEach(sec => sec.classList.add('hidden'));
    const fsSec = document.getElementById('section-food-shopping');
    if (fsSec) {
      fsSec.classList.remove('hidden');
      fsSec.classList.add('tab-content');
    }
    document.querySelectorAll('[data-nav-target]').forEach(link => {
      if (link.dataset.navTarget === 'food-shopping') {
        link.classList.add('text-primary', 'dark:text-amber-300', 'font-bold');
        link.classList.remove('text-on-surface-variant', 'font-normal');
      } else {
        link.classList.remove('text-primary', 'dark:text-amber-300', 'font-bold');
        link.classList.add('text-on-surface-variant', 'font-normal');
      }
    });

    if (shop) {
      openDetailModal(shop, 'shop');
      showToast(`🛍️ Opened shared shopping district: "${shop.name}"`, 'shopping_bag');
      setTimeout(() => {
        const card = document.querySelector(`[data-id="${shop.id}"]`) || document.getElementById(`shop-card-${shop.id}`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.add('ring-2', 'ring-amber-400');
          setTimeout(() => card.classList.remove('ring-2', 'ring-amber-400'), 2500);
        }
      }, 300);
      const cleanUrl = window.location.pathname + '#food-shopping';
      window.history.replaceState({}, document.title, cleanUrl);
    } else {
      showToast('Shopping district not found, explore shopping bazaars below.', 'shopping_bag');
      const cleanUrl = window.location.pathname + '#food-shopping';
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }

  // Pandal Deep Link Handler
  function handleSharedPandalDeepLink(pandalId) {
    const cleanId = decodeURIComponent(pandalId).trim().toLowerCase();
    const pandal = PANDALS_DATA.find(p => p.id === cleanId || p.id === pandalId || (p.name && p.name.toLowerCase().includes(cleanId)));

    document.querySelectorAll('.app-section').forEach(sec => sec.classList.add('hidden'));
    const pandalsSec = document.getElementById('section-pandals');
    if (pandalsSec) {
      pandalsSec.classList.remove('hidden');
      pandalsSec.classList.add('tab-content');
    }
    document.querySelectorAll('[data-nav-target]').forEach(link => {
      if (link.dataset.navTarget === 'pandals') {
        link.classList.add('text-primary', 'dark:text-amber-300', 'font-bold');
        link.classList.remove('text-on-surface-variant', 'font-normal');
      } else {
        link.classList.remove('text-primary', 'dark:text-amber-300', 'font-bold');
        link.classList.add('text-on-surface-variant', 'font-normal');
      }
    });

    if (pandal) {
      openDetailModal(pandal, 'pandal');
      showToast(`✨ Opened shared pandal: "${pandal.name}"`, 'explore');
      setTimeout(() => {
        const card = document.querySelector(`[data-id="${pandal.id}"]`) || document.getElementById(`pandal-card-${pandal.id}`);
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
      const cleanUrl = window.location.pathname + '#pandals';
      window.history.replaceState({}, document.title, cleanUrl);
    } else {
      showToast('Pandal not found, explore all pandals below.', 'explore');
      const cleanUrl = window.location.pathname + '#pandals';
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }

  // Deep Link Plan Handler (Receiver directly opens the shared plan)
  // Deep Link Plan Handler (Receiver directly opens the shared plan)
  async function handleSharedPlanDeepLink(planId) {
    const cleanId = decodeURIComponent(planId).trim();
    const isMasterPlan = MASTER_PUJA_PLANS.some(p => p.id === cleanId);

    // 1. For custom plans, verify if creator deleted it from database
    if (!isMasterPlan) {
      if (window.AkalbodhonFirebase && typeof window.AkalbodhonFirebase.isPlanDeleted === 'function') {
        try {
          const wasDeleted = await window.AkalbodhonFirebase.isPlanDeleted(cleanId);
          if (wasDeleted) {
            showToast('This custom Puja plan has been deleted by its creator and is no longer available.', 'warning');
            customPlans = customPlans.filter(p => p.id !== cleanId);
            localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));
            if (currentUser && Array.isArray(currentUser.custom_plans)) {
              currentUser.custom_plans = currentUser.custom_plans.filter(p => p.id !== cleanId);
              try { localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser)); } catch (_) {}
            }
            const cleanUrl = window.location.pathname + '#saved';
            window.history.replaceState({}, document.title, cleanUrl);
            return;
          }
        } catch (_) {}
      }
    }

    let allPlans = [...MASTER_PUJA_PLANS, ...customPlans];
    let plan = allPlans.find(p => p.id === cleanId || p.id === planId);

    const isRemoteFetch = !plan;
    if (isRemoteFetch) {
      showGlobalLoader(
        'Opening Shared Festival Plan...',
        'Fetching shared route, pandals, and devotee hopping list...',
        '🗺️',
        'Loading Plan Details...'
      );
    }

    try {
      // Check for serialized custom plan data in URL (?pdata=...)
      const urlParams = new URLSearchParams(window.location.search);
      const pdataParam = urlParams.get('pdata');
      if (!plan && pdataParam) {
        try {
          const decoded = JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(pdataParam)))));
          if (decoded && decoded.id && typeof decoded.id === 'string') {
            const cleanStr = (val, maxLen = 200) => typeof val === 'string' ? val.trim().slice(0, maxLen) : '';
            plan = {
              id: cleanStr(decoded.id, 64),
              title: cleanStr(decoded.title, 120) || 'Custom Puja Plan',
              day_tag: cleanStr(decoded.day_tag, 60) || 'Festive Day',
              day_key: cleanStr(decoded.day_tag, 60).toLowerCase().replace(/[^a-z]/g, ''),
              date_str: cleanStr(decoded.date_str || decoded.day_tag, 60),
              creator_name: cleanStr(decoded.creator_name, 60) || 'Devotee',
              creator_avatar: cleanStr(decoded.creator_avatar, 10) || '🌺',
              creator_id: cleanStr(decoded.creator_id, 64) || 'shared',
              route_summary: cleanStr(decoded.route_summary, 250),
              pandals: Array.isArray(decoded.pandals) ? decoded.pandals.slice(0, 50) : [],
              food_stops: Array.isArray(decoded.food_stops) ? decoded.food_stops.slice(0, 50) : [],
              rituals: Array.isArray(decoded.rituals) ? decoded.rituals.slice(0, 50) : [],
              custom_notes: cleanStr(decoded.custom_notes || decoded.description, 1000),
              members: []
            };
          }
        } catch (err) {
          console.warn('Error parsing shared custom plan pdata:', err);
        }
      }

      // 1. Try fetching from Firebase Firestore Database
      if (!plan && window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
        try {
          const fbPlan = await window.AkalbodhonFirebase.fetchPlanById(cleanId);
          if (fbPlan) {
            plan = fbPlan;
          }
        } catch (fbErr) {
          console.warn('Firebase deep link plan lookup error:', fbErr);
        }
      }

      // 2. Supabase fallback
      if (!plan && supabaseClient) {
        try {
          const { data } = await supabaseClient.from('puja_plans').select('*').eq('id', cleanId).single();
          if (data) {
            let members = [];
            try {
              const { data: mData } = await supabaseClient.from('plan_members').select('*').eq('plan_id', cleanId);
              if (Array.isArray(mData)) members = mData;
            } catch (_) {}

            let parsedPandals = [];
            try { parsedPandals = typeof data.pandals === 'string' ? JSON.parse(data.pandals) : (data.pandals || []); } catch (_) { parsedPandals = []; }
            let parsedFood = [];
            try { parsedFood = typeof data.food_stops === 'string' ? JSON.parse(data.food_stops) : (data.food_stops || []); } catch (_) { parsedFood = []; }
            let parsedRituals = [];
            try { parsedRituals = typeof data.rituals === 'string' ? JSON.parse(data.rituals) : (data.rituals || []); } catch (_) { parsedRituals = []; }

            plan = {
              id: data.id,
              title: data.title,
              day_tag: data.day_tag,
              day_key: (data.day_tag || '').toLowerCase().replace(/[^a-z]/g, ''),
              date_str: data.date_str,
              creator_name: data.creator_name,
              creator_avatar: data.creator_avatar || '🌺',
              creator_id: data.creator_id,
              route_summary: data.route_summary,
              pandals: parsedPandals,
              food_stops: parsedFood,
              rituals: parsedRituals,
              members: members,
              custom_notes: data.custom_notes
            };
          }
        } catch (err) {
          console.warn('Deep link plan lookup error:', err);
        }
      }

      if (!plan) {
        showToast('Puja plan link could not be found or has expired.', 'warning');
        const cleanUrl = window.location.pathname + '#plans';
        window.history.replaceState({}, document.title, cleanUrl);
        return;
      }

      // Mark as shared in temporary memory map
      window.__sharedPlansMap = window.__sharedPlansMap || new Map();
      window.__sharedPlansMap.set(plan.id, plan);

      // If it's a master festival plan, switch to plans section; else to saved itinerary section
      if (isMasterPlan) {
        document.querySelectorAll('.app-section').forEach(sec => sec.classList.add('hidden'));
        const plansSec = document.getElementById('section-plans');
        if (plansSec) {
          plansSec.classList.remove('hidden');
          plansSec.classList.add('tab-content');
        }
        document.querySelectorAll('[data-nav-target]').forEach(link => {
          if (link.dataset.navTarget === 'plans') {
            link.classList.add('text-primary', 'dark:text-amber-300', 'font-bold');
            link.classList.remove('text-on-surface-variant', 'font-normal');
          } else {
            link.classList.remove('text-primary', 'dark:text-amber-300', 'font-bold');
            link.classList.add('text-on-surface-variant', 'font-normal');
          }
        });
      }

      // Open the plan modal directly for the receiver
      if (typeof window.openViewPlanModal === 'function') {
        window.openViewPlanModal(plan.id);
      }

      showToast(`🌺 Opened shared plan: "${plan.title}" by ${plan.creator_name || 'Devotee'}`, 'event_available');
      const cleanUrl = window.location.pathname + (isMasterPlan ? '#plans' : '#saved');
      window.history.replaceState({}, document.title, cleanUrl);
    } finally {
      if (isRemoteFetch) {
        hideGlobalLoader();
      }
    }
  }

  // Delete Custom Plan (Strictly Creator Only: deletes from database permanently)
  window.deleteCustomPlan = function (planId) {
    const plan = customPlans.find(p => p.id === planId);
    if (!plan) return;

    // Guard: Only the creator can delete the plan from the database!
    const isCreator = isCurrentUserPlan(plan, currentUser);
    if (!isCreator && !plan.is_template) {
      showToast('Only the creator can delete this plan permanently. Removing from your itinerary.', 'info');
      window.removePlanFromItinerary(planId);
      return;
    }

    if (!confirm('Are you sure you want to delete this custom Puja plan? It will be permanently removed for you and all receivers.')) return;
    showTopProgressBar();
    const planTitle = plan ? plan.title : 'Plan';
    customPlans = customPlans.filter(p => p.id !== planId);
    localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));

    // Permanent delete from Supabase database
    if (supabaseClient) {
      supabaseClient.from('puja_plans').delete().eq('id', planId).then(() => {});
    }

    if (currentUser) {
      currentUser.custom_plans = customPlans;
      localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser));
      saveUserSpecificItinerary(currentUser, Storage.getBookmarks(), customPlans);
      const targetUid = currentUser.id || currentUser.user_id;

      // Permanent delete from Firebase Firestore Database (root collection and creator collection)
      if (window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
        window.AkalbodhonFirebase.deletePlan(planId, targetUid).catch(() => {});
        window.AkalbodhonFirebase.syncProfile({
          id: targetUid,
          custom_plans: customPlans
        }).catch(() => {});
      }

      if (supabaseClient) {
        const targetId = (currentUser.id || '').toLowerCase().replace(/[^a-zA-Z0-9@._-]/g, '');
        const targetSafeUid = String(targetUid || '').replace(/[^a-zA-Z0-9@._-]/g, '');
        supabaseClient.from('profiles').update({
          custom_plans: customPlans,
          updated_at: new Date().toISOString()
        }).or(`id.eq.${targetId},identifier.eq.${targetId},user_id.eq.${targetSafeUid}`).then(() => {});
      }
    }

    renderFestivalPlans(activePlanFilter);
    renderSavedItinerary(activeSavedTab);
    showToast(`Plan "${planTitle}" permanently deleted from database.`, 'delete');
    setTimeout(hideTopProgressBar, 600);
  };

  // Remove Plan from Itinerary (Non-destructive: strictly removes from receiver's own itinerary without deleting from database)
  window.removePlanFromItinerary = function (planId) {
    showTopProgressBar();
    const plan = customPlans.find(p => p.id === planId);
    const planTitle = plan ? plan.title : 'Plan';
    customPlans = customPlans.filter(p => p.id !== planId);
    localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));

    if (currentUser) {
      currentUser.custom_plans = customPlans;
      localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser));
      saveUserSpecificItinerary(currentUser, Storage.getBookmarks(), customPlans);
      const targetUid = currentUser.id || currentUser.user_id;

      // Update devotee's own profile without touching the plan in the database!
      if (window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
        window.AkalbodhonFirebase.syncProfile({
          ...currentUser,
          id: targetUid,
          custom_plans: customPlans
        }).catch(() => {});
      }

      if (supabaseClient) {
        const targetId = (currentUser.id || '').toLowerCase();
        supabaseClient.from('profiles').upsert({
          id: targetId,
          user_id: targetUid,
          email: currentUser.email || null,
          custom_plans: customPlans,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' }).then(() => {});
      }
    }

    renderFestivalPlans(activePlanFilter);
    renderSavedItinerary(activeSavedTab);
    showToast(`Removed "${planTitle}" from your Itinerary`, 'delete');
    setTimeout(hideTopProgressBar, 600);

    // Update modal save button if open
    const modalSaveBtn = document.getElementById('vp-save-btn');
    if (modalSaveBtn) {
      modalSaveBtn.innerHTML = `<span class="material-symbols-outlined text-[17px]">bookmark</span> <span>Save to Itinerary</span>`;
      modalSaveBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
      modalSaveBtn.title = "Save entire plan to your Itinerary";
    }
  };

  // Save Plan to Itinerary as a Whole Puja Plan (Allowed for both Creator and Receiver)
  window.savePlanToItinerary = function (planId) {
    let allPlans = [...MASTER_PUJA_PLANS, ...customPlans];
    // Also check in shared plans map (receiver viewing a plan shared via link)
    if (window.__sharedPlansMap && window.__sharedPlansMap.has(planId)) {
      allPlans.push(window.__sharedPlansMap.get(planId));
    }
    const plan = allPlans.find(p => p.id === planId);
    if (!plan) return;

    const performSave = () => {
      showTopProgressBar();
      const isAlreadySaved = customPlans.some(p => p.id === plan.id);
      if (isAlreadySaved) {
        // Toggle off if already saved
        window.removePlanFromItinerary(plan.id);
        return;
      }

      const isCreator = isCurrentUserPlan(plan, currentUser);

      // Save plan as a WHOLE entity in customPlans preserving original creator details
      const planToSave = {
        ...plan,
        saved_to_itinerary: true,
        saved_at: new Date().toISOString(),
        creator_id: plan.creator_id || (currentUser ? (currentUser.id || currentUser.user_id) : 'devotee'),
        creator_email: (plan.creator_email || currentUser?.email || '').toLowerCase().trim()
      };

      customPlans.unshift(planToSave);
      localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));

      if (currentUser) {
        currentUser.custom_plans = customPlans;
        localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser));
        saveUserSpecificItinerary(currentUser, Storage.getBookmarks(), customPlans);
        const targetUid = currentUser.id || currentUser.user_id;

        // Firebase Firestore sync:
        // ONLY call savePlan if current user is the CREATOR.
        // If receiver, ONLY sync user profile so it's in their personal itinerary without overwriting DB root plan!
        if (window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
          if (isCreator) {
            window.AkalbodhonFirebase.savePlan(planToSave).catch(() => {});
          }
          window.AkalbodhonFirebase.syncProfile({
            ...currentUser,
            id: targetUid,
            custom_plans: customPlans
          }).catch(() => {});
        }

        if (supabaseClient) {
          const targetId = (currentUser.id || '').toLowerCase();
          supabaseClient.from('profiles').upsert({
            id: targetId,
            user_id: targetUid,
            email: currentUser.email || null,
            custom_plans: customPlans,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' }).then(() => {});
        }
      }

      showToast(`Puja Plan "${plan.title}" saved to your Itinerary!`, 'bookmark_added');
      renderFestivalPlans(activePlanFilter);
      renderSavedItinerary();
      setTimeout(hideTopProgressBar, 600);

      // Update modal save button if open
      const modalSaveBtn = document.getElementById('vp-save-btn');
      if (modalSaveBtn) {
        modalSaveBtn.innerHTML = `<span class="material-symbols-outlined text-[17px]">bookmark_added</span> <span>Saved in Itinerary</span>`;
        modalSaveBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
        modalSaveBtn.title = "Click to remove this plan from your Itinerary";
      }
    };

    if (!isUserLoggedIn()) {
      promptAuthBeforeSave({
        title: 'Sign In to Save Plan',
        message: `Please <strong>log in</strong> or <strong>create an account</strong> to save the plan <strong>${escapeHtml(plan.title)}</strong> to your personal itinerary.`,
        categoryName: 'Puja Plans',
        defaultMode: 'login',
        onAuthenticatedSave: performSave
      });
      return;
    }

    performSave();
  };

  // ========================================================
  // 18. DEVICE TIMERS & RITUAL ALARMS ENGINE
  // ========================================================
  function initDeviceTimers() {
    const openBtn = document.getElementById('open-timers-btn');
    const modal = document.getElementById('timer-modal');
    const closeBtn = document.getElementById('close-timer-modal-btn');
    const customForm = document.getElementById('custom-timer-form');

    if (openBtn && modal) {
      openBtn.onclick = () => {
        renderActiveTimers();
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      };
    }

    if (closeBtn && modal) {
      closeBtn.onclick = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      };
    }

    // Quick Presets
    document.querySelectorAll('.quick-timer-preset').forEach(btn => {
      btn.onclick = () => {
        const mins = parseInt(btn.dataset.mins, 10) || 15;
        const title = btn.dataset.title || 'Ritual Timer';
        createDeviceTimer(title, mins);
      };
    });

    if (customForm) {
      customForm.onsubmit = () => {
        const titleInput = document.getElementById('custom-timer-title');
        const minsInput = document.getElementById('custom-timer-mins');
        const title = titleInput ? titleInput.value.trim() : 'Custom Timer';
        const mins = parseInt(minsInput ? minsInput.value : '15', 10);

        if (title && mins > 0) {
          createDeviceTimer(title, mins);
          customForm.reset();
        }
      };
    }

    // Timer Ticker Interval (1s)
    setInterval(tickRunningTimers, 1000);
  }

  function createDeviceTimer(title, mins) {
    const targetTime = Date.now() + mins * 60 * 1000;
    const newTimer = {
      id: 'timer_' + Date.now().toString(36),
      title: title,
      targetTime: targetTime,
      totalSecs: mins * 60,
      createdAt: Date.now()
    };

    userTimers.push(newTimer);
    renderActiveTimers();
    showToast(`⏱️ Timer set for ${mins} mins: ${title}`, 'timer');

    // Request Notification permission if possible
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  window.setRitualTimer = function (ritualName) {
    createDeviceTimer(ritualName, 15);
    const modal = document.getElementById('timer-modal');
    if (modal) {
      renderActiveTimers();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  };

  function tickRunningTimers() {
    if (userTimers.length === 0) return;

    const now = Date.now();
    userTimers.forEach((t, idx) => {
      const remainingMs = t.targetTime - now;
      if (remainingMs <= 0 && !t.hasTriggered) {
        t.hasTriggered = true;
        triggerTimerAlarm(t);
      }
    });

    // Remove expired triggered timers after 10s
    userTimers = userTimers.filter(t => !t.hasTriggered || (now - t.targetTime < 10000));
    renderActiveTimers();
  }

  function triggerTimerAlarm(timer) {
    // Play sacred temple chime / Dhak synthesizer alert
    try {
      playCeremonialSound('ghanta');
      setTimeout(() => playCeremonialSound('shankha'), 400);
    } catch (e) {}

    showToast(`🔔 TIME'S UP: ${timer.title}!`, 'notifications_active');

    // Web Notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🌺 Akalbodhon Puja Reminder', {
        body: `Time for your scheduled ritual: ${timer.title}`,
        icon: 'logo.jpg'
      });
    }
  }

  function renderActiveTimers() {
    const container = document.getElementById('active-timers-list');
    if (!container) return;

    if (userTimers.length === 0) {
      container.innerHTML = `<div class="text-xs text-on-surface-variant/70 dark:text-[#ded5c7]/60 text-center py-3 italic">No active running timers</div>`;
      return;
    }

    const now = Date.now();
    container.innerHTML = userTimers.map((t, idx) => {
      const remainingSecs = Math.max(0, Math.round((t.targetTime - now) / 1000));
      const m = Math.floor(remainingSecs / 60);
      const s = remainingSecs % 60;
      const formatted = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

      return `
        <div class="flex items-center justify-between p-3 rounded-2xl bg-surface-container-high dark:bg-[#252016] border border-outline-variant/30 dark:border-amber-400/20 ${remainingSecs > 0 ? 'timer-running' : ''}">
          <div class="min-w-0">
            <div class="text-xs font-bold text-on-surface dark:text-white truncate">${t.title}</div>
            <div class="text-[10px] text-primary dark:text-amber-300 font-semibold mt-0.5">Remaining: ${formatted}</div>
          </div>
          <button onclick="window.cancelTimer(${idx})" class="w-7 h-7 rounded-full bg-surface-container-low dark:bg-[#1a160f] text-red-500 hover:bg-red-500/10 flex items-center justify-center transition-all cursor-pointer" title="Cancel Timer">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      `;
    }).join('');
  }

  window.cancelTimer = function (idx) {
    if (userTimers[idx]) {
      userTimers.splice(idx, 1);
      renderActiveTimers();
      showToast('Timer cancelled', 'timer_off');
    }
  };

  // Initialize Page Section Login
  function initPageAuthSection() {
    const pageGoogleBtn = document.getElementById('page-google-auth-btn');
    if (pageGoogleBtn) {
      pageGoogleBtn.addEventListener('click', handleGoogleSignIn);
    }
  }

  // ========================================================
  // 17. LATERAL FESTIVE SLIDE ANIMATION (KAASH & DHAKIS)
  // ========================================================
  function initFestiveLateralSlider() {
    const slider = document.getElementById('festive-lateral-slider');
    const replayBtn = document.getElementById('festive-unveil-replay-btn');
    if (!slider) return;

    let cleanupTimeout = null;
    let isAnimating = false;

    function triggerUnveil(force = false) {
      if (isAnimating && !force) return;
      isAnimating = true;
      clearTimeout(cleanupTimeout);

      slider.style.display = 'flex';
      slider.classList.remove('festive-fade-out');
      void slider.offsetWidth;
      slider.classList.add('festive-active');

      // Restart flower & aura animations
      const leftFlower = slider.querySelector('#festive-kaash-left');
      const rightFlower = slider.querySelector('#festive-kaash-right');
      const centerEmblem = slider.querySelector('#festive-center-emblem');

      if (leftFlower) {
        leftFlower.classList.remove('kaash-anim-left');
        void leftFlower.offsetWidth;
        leftFlower.classList.add('kaash-anim-left');
      }
      if (rightFlower) {
        rightFlower.classList.remove('kaash-anim-right');
        void rightFlower.offsetWidth;
        rightFlower.classList.add('kaash-anim-right');
      }
      if (centerEmblem) {
        centerEmblem.classList.remove('emblem-aura-anim');
        void centerEmblem.offsetWidth;
        centerEmblem.classList.add('emblem-aura-anim');
      }

      // Clean up after slide animation finishes (2.2s animation + 0.65s fade)
      cleanupTimeout = setTimeout(() => {
        slider.classList.add('festive-fade-out');
        slider.classList.remove('festive-active');
        setTimeout(() => {
          slider.style.display = 'none';
          if (leftFlower) leftFlower.classList.remove('kaash-anim-left');
          if (rightFlower) rightFlower.classList.remove('kaash-anim-right');
          if (centerEmblem) centerEmblem.classList.remove('emblem-aura-anim');
          isAnimating = false;
        }, 650);
      }, 2200);
    }

    window.triggerFestiveLateralReveal = (force = true) => triggerUnveil(force);

    if (replayBtn) {
      replayBtn.addEventListener('click', (e) => {
        e.preventDefault();
        triggerUnveil(true);
      });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const forceFromUrl = urlParams.has('welcome');

    // Trigger ONCE smoothly per browser session (avoids double animation on load/refresh)
    if (forceFromUrl || !sessionStorage.getItem('akalbodhon_welcome_shown')) {
      sessionStorage.setItem('akalbodhon_welcome_shown', '1');
      setTimeout(() => triggerUnveil(false), 200);
    } else {
      slider.style.display = 'none';
      slider.classList.add('festive-fade-out');
    }
  }

  // ========================================================
  // 18. DURGA PUJA AI CHATBOT (SHAROD.AI - GEMINI POWERED)
  // ========================================================
  function initPujaAIChatbot() {
    const triggerBtn = document.getElementById('puja-ai-trigger-btn');
    const chatWindow = document.getElementById('puja-ai-chat-window');
    const closeBtn = document.getElementById('ai-chat-close-btn');
    const clearBtn = document.getElementById('ai-chat-clear-btn');
    const chatForm = document.getElementById('ai-chat-form');
    const chatInput = document.getElementById('ai-chat-input');
    const messagesContainer = document.getElementById('ai-chat-messages');

    if (!triggerBtn || !chatWindow || !messagesContainer) return;

    let chatHistory = [];
    let isWaitingResponse = false;
    const STORAGE_API_KEY = 'akalbodhon_gemini_api_key';

    function renderGreeting() {
      messagesContainer.innerHTML = '';
      appendAIMessage(
        `🙏 **Nomoshkar! Welcome to Akalbodhon AI (sharod.ai)**\n\n` +
        `I am your dedicated 24/7 Kolkata Durga Puja Companion. Ask me anything about:\n` +
        `• 🏛️ **Top Pandals & Crowd Forecasts** (North, South & Heritage Bonedi Bari circuits)\n` +
        `• 🪔 **Puja Rituals & Mahashtami Sandhi Puja Timings**\n` +
        `• 🍲 **Midnight Street Food Guides & Dhaba Recommendations**\n` +
        `• 🚇 **Kolkata Metro Timings & Midnight Special Trains**\n` +
        `• 🌐 **Any questions**: Culture, science, coding, or personalized festival itineraries!\n\n` +
        `*Feel free to ask for opinions, comparisons, or recommendations below!*`
      );
    }

    function openChat() {
      document.body.classList.add('ai-chat-opened');
      if (triggerBtn) {
        triggerBtn.style.setProperty('display', 'none', 'important');
      }
      chatWindow.classList.remove('hidden');
      void chatWindow.offsetWidth;
      chatWindow.classList.add('chat-open');
      if (messagesContainer.children.length === 0) {
        renderGreeting();
      }
      setTimeout(() => chatInput?.focus(), 150);
    }

    function closeChat() {
      document.body.classList.remove('ai-chat-opened');
      if (triggerBtn) {
        triggerBtn.style.removeProperty('display');
      }
      chatWindow.classList.remove('chat-open');
      setTimeout(() => chatWindow.classList.add('hidden'), 250);
    }

    triggerBtn.onclick = (e) => {
      e.stopPropagation();
      if (chatWindow.classList.contains('chat-open')) {
        closeChat();
      } else {
        openChat();
      }
    };

    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeChat();
    });

    // Close chat on click outside
    document.addEventListener('click', (e) => {
      if (!chatWindow.classList.contains('chat-open')) return;
      if (!chatWindow.contains(e.target) && !triggerBtn.contains(e.target)) {
        closeChat();
      }
    });

    // Close chat on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chatWindow.classList.contains('chat-open')) {
        closeChat();
      }
    });

    clearBtn?.addEventListener('click', () => {
      chatHistory = [];
      renderGreeting();
      showToast('Conversation refreshed', 'refresh');
    });

    // Handle Quick Chips
    document.querySelectorAll('.ai-quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.trim().replace(/^[^\w\s]+/, '').trim();
        handleUserSend(text);
      });
    });

    chatForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (text) {
        chatInput.value = '';
        handleUserSend(text);
      }
    });

    function appendUserMessage(text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'ai-message-bubble ai-bubble-user px-4 py-2.5 shadow-sm text-right';
      msgDiv.textContent = text;
      messagesContainer.appendChild(msgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Global Section & Filter Navigator (callable from AI chat & links)
    window.navigateToAppSection = function(section, filter = '') {
      if (!section) return;

      // 1. Switch active view via hash router
      window.location.hash = section;

      // 2. Filter pandals and scroll cleanly
      if (section === 'pandals') {
        setTimeout(() => {
          const dropdown = document.getElementById('pandal-filter-dropdown');
          if (dropdown) {
            const f = (filter || '').toLowerCase();
            if (f.includes('south')) dropdown.value = 'zone-South';
            else if (f.includes('north')) dropdown.value = 'zone-North';
            else if (f.includes('central')) dropdown.value = 'zone-Central';
            else if (f.includes('east') || f.includes('salt')) dropdown.value = 'zone-East';
            else if (f.includes('rajbari') || f.includes('bonedi')) dropdown.value = 'rajbari';
            else if (f.includes('all')) dropdown.value = 'all';
            else dropdown.value = 'recommended';
            dropdown.dispatchEvent(new Event('change'));
          }

          const grid = document.getElementById('pandals-grid-container');
          if (grid) {
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            grid.classList.add('ring-2', 'ring-amber-400', 'ring-offset-4', 'transition-all');
            setTimeout(() => grid.classList.remove('ring-2', 'ring-amber-400', 'ring-offset-4'), 2500);
          }
        }, 120);
      } else if (section === 'food-shopping') {
        setTimeout(() => {
          const el = document.getElementById('section-food-shopping');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      } else if (section === 'rituals') {
        setTimeout(() => {
          const el = document.getElementById('section-rituals');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      } else if (section === 'audio') {
        setTimeout(() => {
          const el = document.getElementById('section-audio');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      } else if (section === 'saved') {
        setTimeout(() => {
          const el = document.getElementById('section-saved');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      } else if (section === 'plans') {
        setTimeout(() => {
          const el = document.getElementById('section-plans');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }

      const label = filter ? `${filter} ${section}` : section;
      if (typeof showToast === 'function') {
        showToast(`📍 Directing you to ${label}!`, 'explore');
      }
    };

    function appendAIMessage(markdownText, groundedWeb = false) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'ai-message-bubble ai-bubble-bot px-4 py-3 shadow-md';
      
      let badgeHtml = '';
      if (groundedWeb) {
        badgeHtml = '<div class="ai-web-badge"><span class="material-symbols-outlined text-[13px]">travel_explore</span> Grounded with Web Search</div>';
      }

      msgDiv.innerHTML = badgeHtml + formatPujaMarkdown(markdownText);
      messagesContainer.appendChild(msgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
      const id = 'ai-typing-indicator';
      const existing = document.getElementById(id);
      if (existing) existing.remove();

      const typingDiv = document.createElement('div');
      typingDiv.id = id;
      typingDiv.className = 'ai-message-bubble ai-bubble-bot px-4 py-2.5 shadow-sm flex items-center gap-1.5 w-20';
      typingDiv.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-primary dark:bg-amber-400 ai-typing-dot"></span>
        <span class="w-2 h-2 rounded-full bg-primary dark:bg-amber-400 ai-typing-dot" style="animation-delay: 0.2s"></span>
        <span class="w-2 h-2 rounded-full bg-primary dark:bg-amber-400 ai-typing-dot" style="animation-delay: 0.4s"></span>
      `;
      messagesContainer.appendChild(typingDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function removeTypingIndicator() {
      const el = document.getElementById('ai-typing-indicator');
      if (el) el.remove();
    }

    async function handleUserSend(text) {
      if (isWaitingResponse) return;
      appendUserMessage(text);
      showTypingIndicator();
      isWaitingResponse = true;

      const apiKey = localStorage.getItem(STORAGE_API_KEY) || '';

      try {
        const resp = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            history: chatHistory,
            apiKey: apiKey
          })
        });

        if (resp.ok) {
          const data = await resp.json();
          removeTypingIndicator();

          if (data.success && data.response) {
            appendAIMessage(data.response, Boolean(data.grounded_web));
            chatHistory.push({ role: 'user', text: text });
            chatHistory.push({ role: 'model', text: data.response });
            return;
          }
        }
        throw new Error('Server response not ok');
      } catch (err) {
        // Direct browser-level Gemini fallback if client has custom key
        if (apiKey) {
          const clientModels = ['gemini-3.5-flash-lite', 'gemini-flash-lite-latest', 'gemini-3.1-flash-lite', 'gemini-3.6-flash'];
          for (const cModel of clientModels) {
            try {
              const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${cModel}:generateContent?key=${apiKey}`;
              const gResp = await fetch(geminiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [{ role: 'user', parts: [{ text: text }] }]
                })
              });
              if (gResp.ok) {
                const gData = await gResp.json();
                const reply = gData?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (reply) {
                  removeTypingIndicator();
                  appendAIMessage(reply, false);
                  chatHistory.push({ role: 'user', text: text });
                  chatHistory.push({ role: 'model', text: reply });
                  return;
                }
              }
            } catch (clientErr) {
              console.warn(`Direct Gemini API fallback (${cModel}) error:`, clientErr);
            }
          }
        }

        removeTypingIndicator();
        const smartFallback = getClientSmartResponse(text);
        appendAIMessage(smartFallback, false);
        chatHistory.push({ role: 'user', text: text });
        chatHistory.push({ role: 'model', text: smartFallback });
      } finally {
        isWaitingResponse = false;
      }
    }

    function getClientSmartResponse(query) {
      const q = (query || '').toLowerCase().trim();

      // Attire, Dress Code & Fashion
      if (['suit', 'wear', 'outfit', 'dress', 'saree', 'sari', 'dhoti', 'kurta', 'clothes', 'fashion'].some(k => q.includes(k))) {
        if (q.includes('ashtami') || q.includes('ashthami')) {
          return (
            `**Wearing a Suit on Maha Ashtami — Style & Tradition Guide** 👗✨\n\n` +
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

      // Greetings
      if (['hi', 'hello', 'hey', 'namaste', 'nomoshkar', 'joy maa durga', 'pranam'].some(g => q.includes(g)) && q.split(/\s+/).length <= 4) {
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

      // South Pandals
      if ((q.includes('south') && (q.includes('pandal') || q.includes('zone') || q.includes('best') || q.includes('route'))) || ['tridhara', 'suruchi', 'maddox', 'ekdalia', 'mudiali', 'badamtala'].some(p => q.includes(p))) {
        return (
          `**Top South Kolkata Durga Puja Pandals (2026)** 🏛️✨\n\n` +
          `South Kolkata is the epicenter of monumental architectural innovation, conceptual art installations, and vibrant youth carnival energy:\n\n` +
          `1. **Tridhara Sammilani** (Ballygunge / Kalighat Metro): Avant-garde sensory concepts blending contemporary architecture with timeless spiritual reverence.\n` +
          `2. **Suruchi Sangha** (New Alipore): Acclaimed thematic spectacles spotlighting diverse Indian regional traditions.\n` +
          `3. **Ekdalia Evergreen Club** (Gariahat): Heritage classic showcasing jaw-dropping temple replicas with colossal German crystal chandeliers.\n` +
          `4. **Maddox Square** (Ritchie Road): The legendary heartbeat of youth adda, massive open park lawns, and rolling dhaak beats.\n` +
          `5. **Mudiali Club & Shiv Mandir** (Southern Avenue): Breathtaking eco-art decor, lake-side serenity, and mesmerizing illumination.\n\n` +
          `👉 **[Explore South Kolkata Pandals on Akalbodhon](action:nav:pandals:South)**`
        );
      }

      // North Pandals
      if ((q.includes('north') && (q.includes('pandal') || q.includes('zone') || q.includes('best') || q.includes('route'))) || ['bagbazar', 'kumartuli', 'sovabazar', 'ahiritola', 'tala prattoy'].some(p => q.includes(p))) {
        return (
          `**Top North Kolkata Durga Puja Pandals (2026)** 🏛️🪔\n\n` +
          `North Kolkata is the soul of authentic heritage, colonial aristocracy, and classical Bengali sabeki craftsmanship:\n\n` +
          `1. **Bagbazar Sarbojanin**: The centenary benchmark of pure traditional Sabeki idol draped in shimmering Daaker Saaj.\n` +
          `2. **Kumartuli Park**: Cutting-edge creative brilliance nestled inside the centuries-old idol-sculptors' quarters.\n` +
          `3. **Sovabazar Rajbari**: Historic 1757 Bonedi Bari celebration founded by Raja Nabakrishna Deb in the grand open Natmandir.\n` +
          `4. **Tala Prattoy**: Internationally recognized contemporary installation that elevates pandal art into a world-class outdoor gallery.\n` +
          `5. **Ahiritola Sarbojanin**: Riverside heritage festival celebrated for socially resonant themes and rich community spirit.\n\n` +
          `👉 **[Explore North Kolkata Pandals on Akalbodhon](action:nav:pandals:North)**`
        );
      }

      // East & Salt Lake
      if (['east', 'salt lake', 'sreebhumi', 'fd block', 'dum dum'].some(k => q.includes(k))) {
        return (
          `**Top East Kolkata & Salt Lake Pandals (2026)** 🏛️💎\n\n` +
          `1. **Sreebhumi Sporting Club** (Lake Town / VIP Road): Spectacular royal palace replicas adorned with glittering Chandannagar illumination.\n` +
          `2. **FD Block & BJ Block** (Salt Lake): Sprawling park pavilions showcasing imaginative visual arts and peaceful walkways.\n` +
          `3. **Dum Dum Park Tarun Sangha & Bharat Chakra**: High-concept fine art installations featuring exquisite rural handicrafts.\n\n` +
          `👉 **[Explore East & Salt Lake Pandals on Akalbodhon](action:nav:pandals:East)**`
        );
      }

      // Rituals
      if (['ritual', 'sandhi', 'pushpanjali', 'anjali', 'kumari', 'dhunuchi', 'ashtami', 'shasthi', 'navami', 'dashami', 'sindoor', 'bhashan'].some(k => q.includes(k))) {
        return (
          `**Sacred Vedic Durga Puja Rituals Schedule** 🪔🕊️\n\n` +
          `• **Maha Shasthi (*Devi Bodhon*)**: Awakening the Divine Mother under the sacred Bel tree.\n` +
          `• **Maha Saptami (*Nabapatrika Snan*)**: Dawn bathing of *Kola Bou* in the holy Hooghly river followed by *Prana Pratishtha*.\n` +
          `• **Maha Ashtami (*Pushpanjali & Sandhi Puja*)**: Morning **Pushpanjali** flower offerings; **Kumari Puja**; and the celestial **Sandhi Puja** with 108 blue lotuses and 108 burning clay lamps.\n` +
          `• **Maha Navami (*Maha Yajna & Dhunuchi Naach*)**: Sacred Vedic fire sacrifice followed by electrifying *Dhunuchi Naach* to rolling dhaak rhythms.\n` +
          `• **Vijaya Dashami (*Devi Baran & Sindoor Khela*)**: Bidding farewell to Maa Durga, vibrant *Sindoor Khela*, and holy immersion (*Bhashan*).\n\n` +
          `👉 **[Explore Rituals on Akalbodhon](action:nav:rituals)**`
        );
      }

      // Food & Dining
      if (['food', 'eat', 'restaurant', 'biryani', 'roll', 'sweet', 'mishti', 'kabiraji', 'bhog'].some(k => q.includes(k))) {
        return (
          `**Iconic Kolkata Durga Puja Culinary Trail** 🍲🍗\n\n` +
          `• **Kolkata Biryani & Mughlai**: Arsalan (Park Circus), Oudh 1590 (Deshapriya Park), Aminia, and Royal Indian Hotel (Barabazar).\n` +
          `• **Legendary Street Bites**: Kusum Rolls (Park Street), Mitra Cafe (Shyambazar Mutton Kabiraji), and Paramount Sharbat.\n` +
          `• **Sacred Puja Bhog**: Hot Gobindobhog khichuri, begun bhaja, spiced labra, chholar dal, and sweet chutney.\n` +
          `• **Heritage Bengali Sweets**: Balaram Mullick (Baked Rosogolla), Girish Ch. Dey & Nakur Ch. Nandy (Sandesh), and Chittaranjan.\n\n` +
          `👉 **[Open Food & Shopping Guide on Akalbodhon](action:nav:food-shopping)**`
        );
      }

      // Metro & Transit
      if (['metro', 'transit', 'train', 'transport', 'bus', 'route'].some(k => q.includes(k))) {
        return (
          `**Kolkata Metro & Transit Guide for Durga Puja** 🚇🎫\n\n` +
          `• **Blue Line (North-South)**: Connects Sovabazar (Bagbazar/Kumartuli), MG Road (Central), Kalighat (Tridhara), and Jatin Das Park (Maddox Sq).\n` +
          `• **Green Line (East-West)**: Connects Howrah Station beneath the Hooghly river directly to Esplanade and Salt Lake pandals.\n` +
          `• **All-Night Special Trains**: Kolkata Metro runs overnight train frequencies until 4:00 AM on Saptami, Ashtami, and Navami!\n\n` +
          `👉 **[View Pandals with Nearest Metro Stations](action:nav:pandals:all)**`
        );
      }

      // General fallback
      return (
        `Thank you for asking: **"${query}"**! 🌟\n\n` +
        `I am **sharod.ai**, your AI companion on Akalbodhon. Here is how you can explore further:\n\n` +
        `• You can explore over 45+ premier pandals across North, South, East, and Central Kolkata circuits.\n` +
        `• Feel free to ask about festival dress codes, ritual timings, transit routes, or iconic Kolkata food spots!\n\n` +
        `👉 [Explore South Kolkata Pandals](action:nav:pandals:South) | [View Rituals](action:nav:rituals) | [Food Guide](action:nav:food-shopping)`
      );
    }

    function formatPujaMarkdown(text) {
      if (!text) return '';
      let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // 1. Headers (###, ##, #)
      html = html.replace(/^###\s+(.*)$/gm, '<div class="font-bold text-xs sm:text-sm text-primary dark:text-amber-300 mt-2.5 mb-1 pb-0.5 border-b border-primary/15 dark:border-amber-400/20 flex items-center gap-1.5">$1</div>');
      html = html.replace(/^##\s+(.*)$/gm, '<div class="font-bold text-sm text-primary dark:text-amber-300 mt-3 mb-1 flex items-center gap-1.5">$1</div>');
      html = html.replace(/^#\s+(.*)$/gm, '<div class="font-bold text-base text-primary dark:text-amber-300 mt-3 mb-1 flex items-center gap-1.5">$1</div>');

      // 2. Bold and Italics
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

      // 3. Numbered lists: render explicit number from markdown ($1.) without relying on browser CSS counters
      html = html.replace(/^(\d+)\.\s+(.*)$/gm, '<div class="ai-list-item flex items-start gap-1.5 my-1 ml-0.5"><span class="font-bold text-primary dark:text-amber-400 select-none shrink-0">$1.</span><div class="flex-1">$2</div></div>');

      // 4. Bullet points (•, -, *)
      html = html.replace(/^[•\-\*]\s+(.*)$/gm, '<div class="ai-bullet-item flex items-start gap-2 my-0.5 ml-3"><span class="text-primary dark:text-amber-400 text-xs shrink-0 select-none leading-relaxed">•</span><div class="flex-1">$1</div></div>');

      // 5. Paragraph breaks and newlines
      html = html.replace(/\n\n+/g, '<div class="h-2"></div>');
      html = html.replace(/\n/g, '<br/>');
      html = html.replace(/<br\/>\s*(<div[\s>])/g, '$1');
      html = html.replace(/(<\/div>)\s*<br\/>/g, '$1');

      // Convert action links into interactive buttons
      // [Label](action:nav:section:filter)
      html = html.replace(
        /\[(.*?)\]\(action:nav:([^:\)]+)(?::([^:\)]+))?\)/g,
        function(match, label, section, filter) {
          const safeSection = String(section || '').replace(/[^a-zA-Z0-9_-]/g, '');
          const safeFilter = String(filter || '').replace(/[^a-zA-Z0-9_\s-]/g, '').replace(/'/g, "\\'");
          const filterArg = safeFilter ? `'${safeFilter}'` : "''";
          return `<button type="button" class="ai-nav-chip" onclick="window.navigateToAppSection('${safeSection}', ${filterArg})"><span class="material-symbols-outlined text-[14px]">explore</span> ${label}</button>`;
        }
      );

      // Convert standard hash links [Label](#section?zone=filter)
      html = html.replace(
        /\[(.*?)\]\(#(pandals|food-shopping|rituals|audio|saved|plans)(?:\?(?:zone=)?([^:\)]+))?\)/g,
        function(match, label, section, filter) {
          const filterArg = filter ? `'${filter}'` : "''";
          return `<button type="button" class="ai-nav-chip" onclick="window.navigateToAppSection('${section}', ${filterArg})"><span class="material-symbols-outlined text-[14px]">explore</span> ${label}</button>`;
        }
      );

      // Add contextual navigation buttons if relevant topics appear in response
      const lower = text.toLowerCase();
      const actionButtons = [];

      if (lower.includes('south') && (lower.includes('pandal') || lower.includes('kolkata')) && !html.includes("navigateToAppSection('pandals', 'South')")) {
        actionButtons.push(`<button type="button" class="ai-nav-chip" onclick="window.navigateToAppSection('pandals', 'South')"><span class="material-symbols-outlined text-[14px]">explore</span> View South Pandals</button>`);
      }
      if (lower.includes('north') && (lower.includes('pandal') || lower.includes('kolkata')) && !html.includes("navigateToAppSection('pandals', 'North')")) {
        actionButtons.push(`<button type="button" class="ai-nav-chip" onclick="window.navigateToAppSection('pandals', 'North')"><span class="material-symbols-outlined text-[14px]">explore</span> View North Pandals</button>`);
      }
      if (lower.includes('east') && (lower.includes('pandal') || lower.includes('sreebhumi') || lower.includes('salt lake')) && !html.includes("navigateToAppSection('pandals', 'East')")) {
        actionButtons.push(`<button type="button" class="ai-nav-chip" onclick="window.navigateToAppSection('pandals', 'East')"><span class="material-symbols-outlined text-[14px]">explore</span> View East Pandals</button>`);
      }
      if ((lower.includes('ritual') || lower.includes('sandhi') || lower.includes('pushpanjali')) && !html.includes("navigateToAppSection('rituals'")) {
        actionButtons.push(`<button type="button" class="ai-nav-chip" onclick="window.navigateToAppSection('rituals')"><span class="material-symbols-outlined text-[14px]">calendar_month</span> Explore Rituals</button>`);
      }
      if ((lower.includes('food') || lower.includes('biryani') || lower.includes('roll') || lower.includes('sweet') || lower.includes('restaurant')) && !html.includes("navigateToAppSection('food-shopping'")) {
        actionButtons.push(`<button type="button" class="ai-nav-chip" onclick="window.navigateToAppSection('food-shopping')"><span class="material-symbols-outlined text-[14px]">restaurant</span> Food Guide</button>`);
      }
      if ((lower.includes('itinerary') || lower.includes('bookmark') || lower.includes('saved')) && !html.includes("navigateToAppSection('saved'")) {
        actionButtons.push(`<button type="button" class="ai-nav-chip" onclick="window.navigateToAppSection('saved')"><span class="material-symbols-outlined text-[14px]">bookmark</span> Open Itinerary</button>`);
      }
      if ((lower.includes('radio') || lower.includes('song') || lower.includes('audio') || lower.includes('playlist')) && !html.includes("navigateToAppSection('audio'")) {
        actionButtons.push(`<button type="button" class="ai-nav-chip" onclick="window.navigateToAppSection('audio')"><span class="material-symbols-outlined text-[14px]">radio</span> Puja Radio</button>`);
      }

      if (actionButtons.length > 0) {
        html += '<div class="mt-2.5 pt-2 border-t border-outline-variant/20 dark:border-amber-400/15 flex flex-wrap gap-1 items-center">' +
          actionButtons.join('') +
          '</div>';
      }

      return html;
    }
  }

  // ========================================================
  // 19. GLOBAL INITIALIZATION & ROBUST ROUTING
  // ========================================================
  async function initApp() {
    try {
      initTheme();
    } catch (e) { console.warn('initTheme error:', e); }

    try {
      initFestiveLateralSlider();
    } catch (e) { console.warn('initFestiveLateralSlider error:', e); }

    try {
      initPujaAIChatbot();
    } catch (e) { console.warn('initPujaAIChatbot error:', e); }

    try {
      initDevoteesCounter();
    } catch (e) { console.warn('initDevoteesCounter error:', e); }

    try {
      initCountdown();
    } catch (e) { console.warn('initCountdown error:', e); }

    try {
      initAudioHub();
    } catch (e) { console.warn('initAudioHub error:', e); }

    // Instant local cache loading (Synchronous, zero network delay)
    try {
      loadLocalUserSession();
      loadLocalCustomPlans();
    } catch (e) { console.warn('loadLocalData error:', e); }

    // Instant UI rendering from local data
    try {
      renderPandals('recommended');
      renderFoodAndShopping('all');
      renderRituals();
      renderSavedItinerary();
      renderFestivalPlans('all');
    } catch (e) { console.warn('renderViews error:', e); }

    try {
      initPlanCreatorModal();
      initViewPlanModal();
      initDeviceTimers();
      initPageAuthSection();
    } catch (e) { console.warn('initModals error:', e); }

    // Account Button Click Handlers
    const accountBtn = document.getElementById('account-btn');
    if (accountBtn) {
      accountBtn.addEventListener('click', () => openAccountModal());
    }

    const heroCtaBtn = document.getElementById('hero-account-cta-btn');
    if (heroCtaBtn) {
      heroCtaBtn.addEventListener('click', () => openAccountModal());
    }

    // Hero Rituals CTA Click
    const heroRitualsBtn = document.getElementById('hero-rituals-cta-btn');
    if (heroRitualsBtn) {
      heroRitualsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = 'rituals';
        handleRouting();
      });
    }

    // Navigation Links Explicit Fallback Handling
    document.querySelectorAll('[data-nav-target]').forEach(link => {
      link.addEventListener('click', () => {
        const target = link.dataset.navTarget;
        if (target) {
          window.location.hash = target;
          handleRouting();
        }
      });
    });

    // Auth Modal Handlers
    document.getElementById('google-auth-btn')?.addEventListener('click', handleGoogleSignIn);
    document.getElementById('save-auth-google-btn')?.addEventListener('click', handleGoogleSignIn);
    document.getElementById('close-auth-modal-btn')?.addEventListener('click', closeAuthModal);
    document.getElementById('close-save-auth-prompt-btn')?.addEventListener('click', closeSaveAuthPromptModal);
    document.getElementById('save-auth-dismiss-btn')?.addEventListener('click', closeSaveAuthPromptModal);

    const saveAuthModal = document.getElementById('save-auth-prompt-modal');
    if (saveAuthModal) {
      saveAuthModal.addEventListener('click', (e) => {
        if (e.target === saveAuthModal) closeSaveAuthPromptModal();
      });
    }

    const authModalEl = document.getElementById('auth-modal');
    if (authModalEl) {
      authModalEl.addEventListener('click', (e) => {
        if (e.target === authModalEl) closeAuthModal();
      });
    }

    // Profile Modal Handlers
    document.getElementById('close-profile-modal-btn')?.addEventListener('click', closeProfileModal);
    document.getElementById('save-profile-btn')?.addEventListener('click', handleSaveProfile);
    document.getElementById('auth-logout-btn')?.addEventListener('click', handleLogout);

    // Allow Enter key inside profile display name input to save
    document.getElementById('profile-edit-name-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSaveProfile(e);
      }
    });

    // Delegated click handler on document for save and logout buttons (resilient to re-renders)
    document.addEventListener('click', (e) => {
      if (e.target.closest('#save-profile-btn')) {
        handleSaveProfile(e);
      } else if (e.target.closest('#auth-logout-btn')) {
        handleLogout();
      }
    });

    const profileModal = document.getElementById('profile-modal');
    if (profileModal) {
      profileModal.addEventListener('click', (e) => {
        if (e.target === profileModal) closeProfileModal();
      });
    }



    // Modal scroll reset helper
    function resetModalScroll(modalEl) {
      if (!modalEl) return;
      modalEl.scrollTop = 0;
      if (typeof modalEl.scrollTo === 'function') {
        modalEl.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      const scrollables = modalEl.querySelectorAll('.modal-scrollable, .overflow-y-auto, [class*="overflow-y"]');
      scrollables.forEach(el => {
        el.scrollTop = 0;
        if (typeof el.scrollTo === 'function') {
          el.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      });
    }

    // Akalbodhon Sacred Story Presentation Modal Handlers
    const storyModal = document.getElementById('akalbodhon-story-modal');
    const openStoryBtn = document.getElementById('open-akalbodhon-story-btn');
    const closeStoryBtn = document.getElementById('close-akalbodhon-story-btn');
    const dismissStoryBtn = document.getElementById('dismiss-akalbodhon-story-btn');

    if (openStoryBtn && storyModal) {
      openStoryBtn.addEventListener('click', () => {
        resetModalScroll(storyModal);
        document.body.classList.add('modal-open');
        storyModal.classList.remove('hidden');
        storyModal.classList.add('flex');
        resetModalScroll(storyModal);
        requestAnimationFrame(() => resetModalScroll(storyModal));
        setTimeout(() => resetModalScroll(storyModal), 30);
      });
    }

    const closeStory = () => {
      document.body.classList.remove('modal-open');
      if (storyModal) {
        storyModal.classList.add('hidden');
        storyModal.classList.remove('flex');
        resetModalScroll(storyModal);
      }
    };

    closeStoryBtn?.addEventListener('click', closeStory);
    dismissStoryBtn?.addEventListener('click', closeStory);
    if (storyModal) {
      storyModal.addEventListener('click', (e) => {
        if (e.target === storyModal) closeStory();
      });
    }

    // Welcome & Shared Plan Gate Handlers
    document.getElementById('gate-login-btn')?.addEventListener('click', () => {
      localStorage.setItem('akalbodhon_welcomed', 'true');
      document.body.classList.remove('modal-open');
      document.getElementById('shared-plan-gate-modal')?.classList.add('hidden');
      document.getElementById('shared-plan-gate-modal')?.classList.remove('flex');
      openAuthModal('signup');
    });

    document.getElementById('gate-dismiss-btn')?.addEventListener('click', () => {
      localStorage.setItem('akalbodhon_welcomed', 'true');
      document.body.classList.remove('modal-open');
      document.getElementById('shared-plan-gate-modal')?.classList.add('hidden');
      document.getElementById('shared-plan-gate-modal')?.classList.remove('flex');
      showToast('🌺 Welcome to Akalbodhon! Enjoy your festival tour.', 'celebration');
    });

    // Plan Filter Dropdown Menu Handler
    const planDropdown = document.getElementById('plan-filter-dropdown');
    if (planDropdown) {
      planDropdown.addEventListener('change', (e) => {
        const day = e.target.value || 'all';
        renderFestivalPlans(day);
      });
    }

    // Pandal Filter Dropdown Menu Handler
    const pandalDropdown = document.getElementById('pandal-filter-dropdown');
    if (pandalDropdown) {
      pandalDropdown.addEventListener('change', (e) => {
        const val = e.target.value;
        const searchInput = document.getElementById('pandal-search-input');
        const q = searchInput ? searchInput.value : '';

        if (val === 'recommended') {
          renderPandals('recommended', 'all', q);
        } else if (val === 'rajbari') {
          renderPandals('rajbari', 'all', q);
        } else if (val === 'all') {
          renderPandals('all', 'all', q);
        } else if (val.startsWith('zone-')) {
          const subzone = val.replace('zone-', '');
          renderPandals('zones', subzone, q);
        }
      });
    }

    // Debounce helper to prevent excessive re-rendering during search input
    function debounce(fn, delay = 150) {
      let timer = null;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    }

    // Pandal Search (Debounced 150ms)
    const handlePandalSearch = debounce((e) => {
      const query = e.target.value;
      renderPandals(currentPandalFilter, currentSubZone, query);
    }, 150);
    document.getElementById('pandal-search-input')?.addEventListener('input', handlePandalSearch);

    // Food & Shopping Dropdown Filter
    const foodFilterDropdown = document.getElementById('food-filter-dropdown');
    if (foodFilterDropdown) {
      foodFilterDropdown.addEventListener('change', (e) => {
        const filter = e.target.value || 'all';
        const searchInput = document.getElementById('food-shop-search-input');
        renderFoodAndShopping(filter, searchInput ? searchInput.value : '');
      });
    }

    // Food & Shopping Search (Debounced 150ms)
    const handleFoodShopSearch = debounce((e) => {
      const query = e.target.value;
      const foodDropdown = document.getElementById('food-filter-dropdown');
      const filter = foodDropdown ? foodDropdown.value : 'all';
      renderFoodAndShopping(filter, query);
    }, 150);
    document.getElementById('food-shop-search-input')?.addEventListener('input', handleFoodShopSearch);

    // About the Page & Developer Modal Handlers
    const aboutBtn = document.getElementById('about-page-btn') || document.getElementById('social-links-btn');
    const aboutModal = document.getElementById('about-page-modal') || document.getElementById('social-links-modal');
    const closeAboutBtn = document.getElementById('close-about-modal-btn') || document.getElementById('close-social-modal-btn');
    const dismissAboutBtn = document.getElementById('dismiss-about-modal-btn');

    const openAbout = (e) => {
      if (e) e.stopPropagation();
      if (aboutModal) {
        resetModalScroll(aboutModal);
        document.body.classList.add('modal-open');
        aboutModal.classList.remove('hidden');
        aboutModal.classList.add('flex');
        resetModalScroll(aboutModal);
        requestAnimationFrame(() => resetModalScroll(aboutModal));
        setTimeout(() => resetModalScroll(aboutModal), 30);
        checkFeedbackCooldown();
      }
    };

    const closeAbout = () => {
      document.body.classList.remove('modal-open');
      if (aboutModal) {
        aboutModal.classList.add('hidden');
        aboutModal.classList.remove('flex');
        resetModalScroll(aboutModal);
      }
    };

    if (aboutBtn && aboutModal) {
      aboutBtn.addEventListener('click', openAbout);
    }
    if (closeAboutBtn) {
      closeAboutBtn.addEventListener('click', closeAbout);
    }
    if (dismissAboutBtn) {
      dismissAboutBtn.addEventListener('click', closeAbout);
    }
    if (aboutModal) {
      aboutModal.addEventListener('click', (e) => {
        if (e.target === aboutModal) closeAbout();
      });
    }

    // Feedback Form Logic & 7-Hour User-Specific Cooldown Timer
    const feedbackTextarea = document.getElementById('feedback-textarea');
    const feedbackWordCount = document.getElementById('feedback-word-count');
    const feedbackSubmitBtn = document.getElementById('submit-feedback-btn');
    const feedbackThanks = document.getElementById('feedback-thanks');
    const feedbackFormArea = document.getElementById('feedback-form-area');
    const feedbackCooldownTimer = document.getElementById('feedback-cooldown-timer');

    const SEVEN_HOURS_MS = 7 * 60 * 60 * 1000;
    let feedbackCooldownInterval = null;

    function getFeedbackCooldownKey(user = currentUser) {
      if (!user) return 'akalbodhon_feedback_cooldown_guest';
      const id = String(user.id || user.user_id || user.identifier || user.email || user.phone || 'guest').trim().toLowerCase();
      return `akalbodhon_feedback_cooldown_${id.replace(/[^a-z0-9]/g, '_')}`;
    }

    function checkFeedbackCooldown() {
      if (!feedbackFormArea || !feedbackThanks) return;

      const key = getFeedbackCooldownKey(currentUser);
      const storedExpiry = localStorage.getItem(key);
      const userProfileExpiry = currentUser?.feedback_cooldown_until ? parseInt(currentUser.feedback_cooldown_until, 10) : 0;

      let expiry = 0;
      if (storedExpiry) {
        expiry = Math.max(expiry, parseInt(storedExpiry, 10) || 0);
      }
      if (userProfileExpiry && !isNaN(userProfileExpiry)) {
        expiry = Math.max(expiry, userProfileExpiry);
      }

      const now = Date.now();
      if (!expiry || expiry <= now) {
        // No active cooldown for this devotee account
        if (storedExpiry) localStorage.removeItem(key);
        if (feedbackCooldownInterval) {
          clearInterval(feedbackCooldownInterval);
          feedbackCooldownInterval = null;
        }
        feedbackThanks.classList.add('hidden');
        feedbackFormArea.classList.remove('hidden');
        if (feedbackTextarea) feedbackTextarea.value = '';
        if (feedbackWordCount) {
          feedbackWordCount.textContent = '0 / 300 letters';
          feedbackWordCount.classList.remove('text-red-500');
        }
        return;
      }

      // Ensure active expiry is mirrored in localStorage for this account
      localStorage.setItem(key, expiry.toString());

      const updateTimer = () => {
        const currentTime = Date.now();
        const diffMs = expiry - currentTime;

        if (diffMs <= 0) {
          // Timer reached zero: clear cooldown & restore form for this account
          localStorage.removeItem(key);
          if (currentUser && currentUser.feedback_cooldown_until) {
            delete currentUser.feedback_cooldown_until;
            localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser));
            if (window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
              window.AkalbodhonFirebase.syncProfile({
                id: currentUser.id || currentUser.user_id || currentUser.identifier,
                feedback_cooldown_until: null
              }).catch(() => {});
            }
          }
          if (feedbackCooldownInterval) {
            clearInterval(feedbackCooldownInterval);
            feedbackCooldownInterval = null;
          }
          feedbackThanks.classList.add('hidden');
          feedbackFormArea.classList.remove('hidden');
          if (feedbackTextarea) feedbackTextarea.value = '';
          if (feedbackWordCount) {
            feedbackWordCount.textContent = '0 / 300 letters';
            feedbackWordCount.classList.remove('text-red-500');
          }
          return;
        }

        // Active cooldown: keep thanks visible and form area hidden
        feedbackFormArea.classList.add('hidden');
        feedbackThanks.classList.remove('hidden');

        // Live precision countdown: displays hours, minutes, and ticking seconds
        const totalSecs = Math.max(0, Math.floor(diffMs / 1000));
        const hours = Math.floor(totalSecs / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;

        if (feedbackCooldownTimer) {
          if (hours > 0) {
            feedbackCooldownTimer.textContent = `${hours}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
          } else if (mins > 0) {
            feedbackCooldownTimer.textContent = `${mins}m ${secs.toString().padStart(2, '0')}s`;
          } else {
            feedbackCooldownTimer.textContent = `${secs}s`;
          }
        }
      };

      updateTimer();
      if (feedbackCooldownInterval) {
        clearInterval(feedbackCooldownInterval);
      }
      feedbackCooldownInterval = setInterval(updateTimer, 1000);
    }

    // Expose checkFeedbackCooldown globally so account changes can trigger it
    window.checkFeedbackCooldown = checkFeedbackCooldown;

    if (feedbackTextarea && feedbackWordCount) {
      const updateFeedbackLetterCount = () => {
        const count = feedbackTextarea.value.length;
        feedbackWordCount.textContent = `${count} / 300 letters`;
        // Limit to 300 letters
        if (count >= 300) {
          feedbackWordCount.classList.add('text-red-500');
        } else {
          feedbackWordCount.classList.remove('text-red-500');
        }
      };
      feedbackTextarea.addEventListener('input', updateFeedbackLetterCount);
      feedbackTextarea.addEventListener('keyup', updateFeedbackLetterCount);
      feedbackTextarea.addEventListener('change', updateFeedbackLetterCount);
    }

    if (feedbackSubmitBtn) {
      feedbackSubmitBtn.addEventListener('click', async () => {
        // Enforce devotee authentication before sending feedback
        if (!isUserLoggedIn() || !currentUser) {
          const pendingText = feedbackTextarea ? feedbackTextarea.value.trim() : '';
          showToast('Please sign in or create an account to send feedback.', 'lock');
          promptAuthBeforeSave({
            title: 'Sign In to Send Feedback',
            message: `Please <strong>log in</strong> or <strong>create an account</strong> before sending suggestions or feedback so our team can follow up with you.`,
            categoryName: 'Feedback',
            defaultMode: 'login',
            onAuthenticatedSave: () => {
              const aboutModal = document.getElementById('about-page-modal') || document.getElementById('social-links-modal');
              if (aboutModal) {
                aboutModal.classList.remove('hidden');
                aboutModal.classList.add('flex');
                document.body.classList.add('modal-open');
              }
              if (feedbackTextarea && pendingText) {
                feedbackTextarea.value = pendingText;
              }
              if (pendingText) {
                setTimeout(() => {
                  feedbackSubmitBtn?.click();
                }, 200);
              }
            }
          });
          return;
        }

        const text = feedbackTextarea ? feedbackTextarea.value.trim() : '';
        if (!text) {
          showToast('Please write your feedback before submitting.', 'error');
          return;
        }
        if (text.length > 300) {
          showToast('Feedback must be 300 letters or less.', 'error');
          return;
        }

        // Disable button while sending
        feedbackSubmitBtn.disabled = true;
        feedbackSubmitBtn.innerHTML = '<span class="btn-loading-spinner mr-1.5"></span> Sending…';
        showTopProgressBar();

        // Automatically fetch the user's logged-in email or phone number
        const senderName = currentUser?.username || currentUser?.name || 'Devotee';
        const userContact = (currentUser?.email) || 
                            (currentUser?.phone) || 
                            (currentUser?.identifier) || 
                            (currentUser?.user_id) || 
                            'Devotee Contact';
        const isEmail = typeof userContact === 'string' && userContact.includes('@');
        // Web3Forms requires a valid email format for its 'email' parameter
        const senderEmail = isEmail 
          ? userContact 
          : (currentUser?.email || `devotee.${(currentUser?.id || currentUser?.user_id || 'user').replace(/[^a-zA-Z0-9]/g, '')}@akalbodhon.com`);

        // Send via Web3Forms so the feedback arrives as an email
        let emailDelivered = false;
        try {
          // FormData payload is the official and most reliable format for Web3Forms
          // Web3Forms public access key - can be overridden via window.__AKALBODHON_WEB3FORMS_KEY__
          const web3FormsKey = (typeof window !== 'undefined' && window.__AKALBODHON_WEB3FORMS_KEY__) || '61c7f9d3-94bb-42e4-8353-a70f98af0434';
          const formData = new FormData();
          formData.append('access_key', web3FormsKey);
          formData.append('name', senderName);
          formData.append('email', senderEmail);
          formData.append('phone_or_identifier', userContact);
          formData.append('account_type', currentUser?.identifier_type || (isEmail ? 'email' : 'phone'));
          formData.append('user_id', currentUser?.id || currentUser?.user_id || '');
          formData.append('subject', `Akalbodhon Feedback from ${senderName} (${userContact})`);
          formData.append('from_name', `Akalbodhon Durga Puja App`);
          formData.append('botcheck', '');
          formData.append('message', `[Akalbodhon Devotee Feedback]\nDevotee: ${senderName}\nContact (${isEmail ? 'Email' : 'Phone / ID'}): ${userContact}\nUser Account ID: ${currentUser?.id || currentUser?.user_id || 'N/A'}\n\nFeedback Message:\n${text}`);

          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
          });

          const result = await response.json();
          if (result && result.success) {
            emailDelivered = true;
          } else {
            console.warn('Web3Forms response not successful, attempting JSON payload fallback:', result);
            const jsonResp = await fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify({
                access_key: web3FormsKey,
                name: senderName,
                email: senderEmail,
                phone_or_identifier: userContact,
                account_type: currentUser?.identifier_type || (isEmail ? 'email' : 'phone'),
                user_id: currentUser?.id || currentUser?.user_id || '',
                subject: `Akalbodhon Feedback from ${senderName} (${userContact})`,
                from_name: `Akalbodhon Durga Puja App`,
                botcheck: '',
                message: `[Akalbodhon Devotee Feedback]\nDevotee: ${senderName}\nContact (${isEmail ? 'Email' : 'Phone / ID'}): ${userContact}\nUser Account ID: ${currentUser?.id || currentUser?.user_id || 'N/A'}\n\nFeedback Message:\n${text}`
              })
            });
            const jsonResult = await jsonResp.json();
            if (jsonResult && jsonResult.success) {
              emailDelivered = true;
            } else {
              console.warn('Web3Forms JSON fallback also returned:', jsonResult);
            }
          }
        } catch (err) {
          console.warn('Feedback email delivery network error:', err);
        } finally {
          hideTopProgressBar();
          feedbackSubmitBtn.disabled = false;
          feedbackSubmitBtn.innerHTML = '<span class="material-symbols-outlined text-[15px]">send</span> Submit';
        }

        if (!emailDelivered) {
          showToast('Feedback email could not be delivered. Please check connection and try again.', 'error');
          return;
        }

        // Store feedback locally as a backup record
        try {
          const feedbackList = JSON.parse(localStorage.getItem('akalbodhon_feedback') || '[]');
          feedbackList.push({ text, ts: new Date().toISOString(), user: senderName, contact: userContact });
          localStorage.setItem('akalbodhon_feedback', JSON.stringify(feedbackList));
        } catch (e) {}

        // Set 7-hour cooldown timer linked specifically to this user's account
        const key = getFeedbackCooldownKey(currentUser);
        const expiryTime = Date.now() + SEVEN_HOURS_MS;
        localStorage.setItem(key, expiryTime.toString());

        currentUser.feedback_cooldown_until = expiryTime;
        localStorage.setItem('akalbodhon_user_profile', JSON.stringify(currentUser));

        // Sync cooldown to Firebase Firestore
        if (window.AkalbodhonFirebase && window.AkalbodhonFirebase.isAvailable()) {
          window.AkalbodhonFirebase.syncProfile({
            id: currentUser.id || currentUser.user_id || currentUser.identifier,
            feedback_cooldown_until: expiryTime
          }).catch(() => {});
        }

        // Sync cooldown to Supabase
        if (supabaseClient) {
          const targetId = (currentUser.id || currentUser.user_id || '').toLowerCase().replace(/[^a-zA-Z0-9@._-]/g, '');
          supabaseClient.from('profiles').update({
            feedback_cooldown_until: expiryTime,
            updated_at: new Date().toISOString()
          }).or(`id.eq.${targetId},identifier.eq.${targetId},user_id.eq.${targetId}`).then(() => {});
        }

        // Update UI with cooldown state
        checkFeedbackCooldown();
        showToast('Feedback email delivered! We appreciate your valuable suggestions. 🙏', 'check_circle');
      });
    }

    // Initial check on load
    checkFeedbackCooldown();

    // Top Navigation Website Share
    document.getElementById('top-share-website-btn')?.addEventListener('click', () => {
      window.openShareWebsiteModal();
    });

    // Pandal / Food / Shopping Detail Modal Share
    document.getElementById('modal-pandal-share-btn')?.addEventListener('click', () => {
      if (window.currentDetailModalItem && window.currentDetailModalItem.id) {
        if (window.currentDetailModalType === 'food') {
          window.openShareFoodModal(window.currentDetailModalItem.id);
        } else if (window.currentDetailModalType === 'shop') {
          window.openShareShopModal(window.currentDetailModalItem.id);
        } else {
          window.openSharePandalModal(window.currentDetailModalItem.id);
        }
      }
    });

    // About Modal Section 3 Social Share Buttons
    document.getElementById('about-share-wa')?.addEventListener('click', (e) => {
      e.preventDefault();
      shareToWhatsApp('🌸 Celebrate Kolkata Durga Puja 2026 with Akalbodhon! Pandal maps, transit guide, food trails & custom plans:', window.location.origin + window.location.pathname);
    });

    // Share Modal Close
    document.getElementById('close-share-modal-btn')?.addEventListener('click', () => {
      window.closeSharePlanModal();
    });

    const shareModal = document.getElementById('share-plan-modal');
    if (shareModal) {
      shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) {
          window.closeSharePlanModal();
        }
      });
    }

    // Detail Modal Close
    const cleanPandalUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('pandal') || urlParams.has('food') || urlParams.has('shop')) {
        const cleanUrl = window.location.pathname + (window.location.hash || '');
        window.history.replaceState({}, document.title, cleanUrl);
      }
    };

    document.getElementById('close-pandal-modal-btn')?.addEventListener('click', () => {
      document.body.classList.remove('modal-open');
      document.getElementById('pandal-detail-modal')?.classList.add('hidden');
      cleanPandalUrlParams();
    });

    const pandalModal = document.getElementById('pandal-detail-modal');
    if (pandalModal) {
      pandalModal.addEventListener('click', (e) => {
        if (e.target === pandalModal) {
          document.body.classList.remove('modal-open');
          pandalModal.classList.add('hidden');
          cleanPandalUrlParams();
        }
      });
    }

    // First-Time Visitor Welcome Modal (Only shown if no deep link and not already welcomed)
    const checkUrlParams = new URLSearchParams(window.location.search);
    const hasInitialDeepLink = checkUrlParams.get('plan') || checkUrlParams.get('pandal') || checkUrlParams.get('food') || checkUrlParams.get('shop') || window.location.hash.startsWith('#plan=') || window.location.hash.startsWith('#pandal=') || window.location.hash.startsWith('#food=') || window.location.hash.startsWith('#shop=');

    if (!localStorage.getItem('akalbodhon_welcomed') && !hasInitialDeepLink && !currentUser) {
      const gateModal = document.getElementById('shared-plan-gate-modal');
      const gateTitle = document.getElementById('gate-modal-title');
      const gateEyebrow = document.getElementById('gate-modal-eyebrow');
      const gateDesc = document.getElementById('gate-modal-desc');
      const gateDismiss = document.getElementById('gate-dismiss-btn');

      if (gateModal) {
        if (gateEyebrow) gateEyebrow.textContent = 'Welcome to Kolkata Durga Puja 2026';
        if (gateTitle) gateTitle.textContent = 'Welcome to Akalbodhon';
        if (gateDesc) gateDesc.textContent = 'Explore Kolkata\'s most immersive Durga Puja guide. Discover 30+ iconic pandals, heritage Bonedi Bari circuits, live Sharodiya radio, and collaborative festival plans.';
        if (gateDismiss) gateDismiss.textContent = 'Explore Akalbodon';

        document.body.classList.add('modal-open');
        gateModal.classList.remove('hidden');
        gateModal.classList.add('flex');
      }
    }

    // Global helper aliases
    window.openPandalDetail = function (pandalId) {
      handleSharedPandalDeepLink(pandalId);
    };
    window.openFoodDetail = function (foodId) {
      handleSharedFoodDeepLink(foodId);
    };
    window.openShopDetail = function (shopId) {
      handleSharedShopDeepLink(shopId);
    };
    window.viewFestivalPlan = function (planId) {
      if (typeof window.openViewPlanModal === 'function') {
        window.openViewPlanModal(planId);
      }
    };

    // Universal Modal Body Scroll Lock Observer & Global Escape Key Handler
    const modalIds = [
      'view-plan-modal', 'create-plan-modal', 'share-plan-modal',
      'pandal-detail-modal', 'auth-modal', 'save-auth-prompt-modal',
      'profile-modal', 'playlist-detail-modal', 'about-page-modal',
      'devotee-feedback-modal', 'gate-welcome-modal', 'clear-itinerary-modal'
    ];
    
    function checkAndSyncModalScrollLock() {
      let isAnyModalOpen = false;
      for (const id of modalIds) {
        const el = document.getElementById(id);
        if (el && !el.classList.contains('hidden')) {
          isAnyModalOpen = true;
          break;
        }
      }
      if (isAnyModalOpen) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    }

    // Attach MutationObservers to all modal containers
    if ('MutationObserver' in window) {
      const modalObserver = new MutationObserver(checkAndSyncModalScrollLock);
      modalIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          modalObserver.observe(el, { attributes: true, attributeFilter: ['class', 'style'] });
        }
      });
    }

    // Universal Global Escape Key Handler
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const clearModal = document.getElementById('clear-itinerary-modal');
        if (clearModal && !clearModal.classList.contains('hidden')) {
          if (typeof closeClearItineraryModal === 'function') closeClearItineraryModal();
          return;
        }
        const feedbackModal = document.getElementById('devotee-feedback-modal');
        if (feedbackModal && !feedbackModal.classList.contains('hidden')) {
          document.getElementById('close-feedback-modal-btn')?.click();
          return;
        }
        const authModal = document.getElementById('auth-modal');
        if (authModal && !authModal.classList.contains('hidden')) {
          if (typeof closeAuthModal === 'function') closeAuthModal();
          return;
        }
        const saveAuthPrompt = document.getElementById('save-auth-prompt-modal');
        if (saveAuthPrompt && !saveAuthPrompt.classList.contains('hidden')) {
          if (typeof closeSaveAuthPromptModal === 'function') closeSaveAuthPromptModal();
          return;
        }
        const shareModal = document.getElementById('share-plan-modal');
        if (shareModal && !shareModal.classList.contains('hidden')) {
          if (typeof window.closeSharePlanModal === 'function') window.closeSharePlanModal();
          return;
        }
        const createPlanModal = document.getElementById('create-plan-modal');
        if (createPlanModal && !createPlanModal.classList.contains('hidden')) {
          document.getElementById('close-create-plan-modal-btn')?.click();
          return;
        }
        const viewPlanModal = document.getElementById('view-plan-modal');
        if (viewPlanModal && !viewPlanModal.classList.contains('hidden')) {
          if (typeof window.closeViewPlanModal === 'function') window.closeViewPlanModal();
          return;
        }
        const pandalModal = document.getElementById('pandal-detail-modal');
        if (pandalModal && !pandalModal.classList.contains('hidden')) {
          document.getElementById('close-pandal-modal-btn')?.click();
          return;
        }
        const profileModal = document.getElementById('profile-modal');
        if (profileModal && !profileModal.classList.contains('hidden')) {
          if (typeof closeProfileModal === 'function') closeProfileModal();
          return;
        }
        const playlistModal = document.getElementById('playlist-detail-modal');
        if (playlistModal && !playlistModal.classList.contains('hidden')) {
          if (typeof window.closePlaylistDetailModal === 'function') window.closePlaylistDetailModal();
          return;
        }
        const aboutModal = document.getElementById('about-page-modal');
        if (aboutModal && !aboutModal.classList.contains('hidden')) {
          document.getElementById('close-about-modal-btn')?.click();
          return;
        }
        const gateModal = document.getElementById('gate-welcome-modal');
        if (gateModal && !gateModal.classList.contains('hidden')) {
          document.getElementById('close-gate-modal-btn')?.click();
          return;
        }
      }
    });

    // Wire up Clear Itinerary Confirmation Modal actions
    const clearItineraryModal = document.getElementById('clear-itinerary-modal');
    if (clearItineraryModal) {
      document.getElementById('confirm-clear-itinerary-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        clearEntireItinerary();
      });
      document.getElementById('cancel-clear-itinerary-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        closeClearItineraryModal();
      });
      document.getElementById('close-clear-itinerary-modal-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        closeClearItineraryModal();
      });
      clearItineraryModal.addEventListener('click', (e) => {
        if (e.target === clearItineraryModal) {
          closeClearItineraryModal();
        }
      });
    }

    // Direct binding for Clear All button in Itinerary section header
    const clearAllItineraryBtn = document.getElementById('clear-all-bookmarks-btn');
    if (clearAllItineraryBtn) {
      clearAllItineraryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openClearItineraryModal();
      });
    }

    // Initial bookmark count update across navigation and tabs
    if (typeof updateBookmarkCount === 'function') updateBookmarkCount();

    window.addEventListener('hashchange', handleRouting);
    handleRouting();
    initScrollReveal();

    // Google Redirect Sign-In Session Recovery
    function handleRedirectAuthSuccess(profile) {
      if (!profile) return;
      saveUserSession(profile);
      closeAuthModal();
      closeSaveAuthPromptModal();
      if (typeof renderSavedSection === 'function') renderSavedSection();
      if (typeof renderSavedItinerary === 'function') renderSavedItinerary();
      if (typeof updateBookmarkCount === 'function') updateBookmarkCount();
      if (typeof renderFestivalPlans === 'function') renderFestivalPlans(activePlanFilter);
      if (typeof renderPandals === 'function') renderPandals();
      if (typeof renderFoodAndShopping === 'function') renderFoodAndShopping();
      showToast(`Welcome, ${profile.username}! Signed in with Google.`, 'celebration');
      setTimeout(syncAllRemoteData, 50);
    }

    window.addEventListener('akalbodhon:auth-redirect-success', (e) => {
      handleRedirectAuthSuccess(e.detail);
    });

    if (window.__akalbodhonRedirectProfile) {
      handleRedirectAuthSuccess(window.__akalbodhonRedirectProfile);
    }

    // Listen for background user cloud data load (hydrates saved items & custom plans smoothly)
    window.addEventListener('akalbodhon:userDataLoaded', (e) => {
      const updatedProfile = e.detail;
      if (updatedProfile && currentUser) {
        const matchesUser = (currentUser.id === updatedProfile.id || currentUser.uid === updatedProfile.uid || (currentUser.email && updatedProfile.email && currentUser.email.toLowerCase() === updatedProfile.email.toLowerCase()));
        if (matchesUser) {
          if (Array.isArray(updatedProfile.saved_items) && updatedProfile.saved_items.length > 0) {
            const mergedBm = mergeBookmarks(Storage.getBookmarks() || [], updatedProfile.saved_items);
            Storage.setBookmarks(mergedBm);
            currentUser.saved_items = mergedBm;
            saveUserSpecificItinerary(currentUser, mergedBm, customPlans);
          }
          if (Array.isArray(updatedProfile.custom_plans) && updatedProfile.custom_plans.length > 0) {
            const mergedPlans = mergePlans(customPlans || [], updatedProfile.custom_plans);
            customPlans = mergedPlans;
            currentUser.custom_plans = mergedPlans;
            saveUserSpecificItinerary(currentUser, Storage.getBookmarks(), mergedPlans);
          }
          if (typeof renderSavedSection === 'function') renderSavedSection();
          if (typeof renderSavedItinerary === 'function') renderSavedItinerary();
          if (typeof updateBookmarkCount === 'function') updateBookmarkCount();
          if (typeof renderFestivalPlans === 'function') renderFestivalPlans(activePlanFilter);
          if (typeof renderPandals === 'function') renderPandals();
          if (typeof renderFoodAndShopping === 'function') renderFoodAndShopping();
        }
      }
    });

    // Trigger background remote data synchronizer (Firestore + Supabase)
    setTimeout(syncAllRemoteData, 50);
    // Firebase ready-event race fix:
    if (window.__akalbodhonFirebaseReady) {
      setTimeout(syncAllRemoteData, 80);
    } else {
      window.addEventListener('akalbodhon:firebase-ready', syncAllRemoteData, { once: true });
    }
  }

  // Execute immediately if DOM is ready, or wait for DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
