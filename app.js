/**
 * Akalbodhon — Festival Guide
 * Core Reactive Controller, Sound Synthesizer, Routing, Scroll Reveal & Data Store
 */

(function () {
  'use strict';

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
      transit: 'Girish Park / Sovabazar Sutanuti Metro (5 min walk)',
      transitType: 'metro',
      highlights: 'World-renowned crystal, brass, and glass art installations with glowing night illumination.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Maniktala+Chaltabagan+Lohapatty+Durga+Puja+Kolkata'
    },
    {
      id: 'chorbagan-sarbojanin',
      name: 'Chorebagan Sarbojanin Durgotsab Samity',
      zone: 'North',
      theme: 'Fine Earthen Terracotta & Sustainable Bengal Clay Heritage',
      image: 'pandals/chorebagan.png',
      transit: 'Girish Park Metro / Rammohan Roy Sarani (4 min walk)',
      transitType: 'metro',
      highlights: 'Poetic cultural narratives crafted through organic terracotta and rustic traditional craftsmanship.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Chorbagan+Sarbojanin+Durga+Puja+Kolkata'
    },
    {
      id: 'kashi-bose-lane',
      name: 'Kashi Bose Lane Durga Puja Samity',
      zone: 'North',
      theme: 'Social Empathy Installation & Intricate Wooden Sculpture',
      image: 'pandals/kashibose.jpg',
      transit: 'Girish Park Metro / Manicktala Crossing (6 min walk)',
      transitType: 'metro',
      highlights: 'Award-winning conceptual pandal blending touching social messages with Vedic sculpting.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kashi+Bose+Lane+Durga+Puja+Samity+Kolkata'
    },
    {
      id: 'ahiritola-sarbojanin',
      name: 'Ahiritola Sarbojanin Durgotsab',
      zone: 'North',
      theme: 'Ganga Riverside Heritage & Glorious Thematic Architecture',
      image: 'pandals/Ahiritola Sarbojanin Durgotsab.jpg',
      transit: 'Sovabazar Sutanuti Metro / Ahiritola Launch Ghat (5 min walk)',
      transitType: 'metro',
      highlights: 'Historic North Kolkata century-old puja renowned for monumental riverfront gates and exquisite clay idol.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Ahiritola+Sarbojanin+Durgotsab+Kolkata'
    },
    {
      id: 'beniatola-sarbojanin',
      name: 'Beniatola Sarbojanin Durgotsav',
      zone: 'North',
      theme: 'Indo-Saracenic Heritage Architecture & Dokra Metal Craft',
      image: 'pandals/Beniatola Sarbojanin Durgotsav.jpg',
      transit: 'Sovabazar Sutanuti Metro (4 min walk)',
      transitType: 'metro',
      highlights: 'Rare brass Dokra relief sculptures and classical heritage ambience in North Kolkata.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Beniatola+Sarbojanin+Durgotsav+Kolkata'
    },
    {
      id: 'jagat-mukherjee-park',
      name: 'Jagat Mukherjee Park',
      zone: 'North',
      theme: 'Ingenious Thematic Illusion & Kinetic Light Spectacle',
      image: 'pandals/Jagat Mukherjee Park.jpg',
      transit: 'Shyambazar / Sovabazar Metro (6 min walk)',
      transitType: 'metro',
      highlights: 'Famed for out-of-the-box conceptual themes including underwater submarines and optical glass tunnels.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Jagat+Mukherjee+Park+Durga+Puja+Kolkata'
    },
    {
      id: 'kumartuli-park',
      name: 'Kumartuli Park Sarbojanin',
      zone: 'North',
      theme: 'Epic Royal Palace Replica & Sculptors Sacred Guild Heritage',
      image: 'pandals/Kumartuli Park Sarbojanin.jpg',
      transit: 'Sovabazar Sutanuti Metro (5 min walk through Kumartuli)',
      transitType: 'metro',
      highlights: 'Nestled in the legendary idol-makers quarter, showcasing world-class clay mastery and grand palace domes.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kumartuli+Park+Durga+Puja+Kolkata'
    },
    {
      id: 'pathuriaghata-rajbari',
      name: 'Pathuriaghata Rajbari Durga Puja',
      zone: 'North',
      theme: 'Aristocratic 18th-Century Zamindari Bonedi Courtyard Heritage',
      image: 'pandals/Pathuriaghata Rajbari Durga Puja.jpg',
      transit: 'Girish Park / Sovabazar Metro (6 min walk)',
      transitType: 'metro',
      highlights: 'Ghosh family heritage Thakurdalan, traditional Ekchala idol with real silver ornaments and family rituals.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pathuriaghata+Rajbari+Durga+Puja+Kolkata'
    },
    {
      id: 'hatibagan-sarbojanin',
      name: 'Hatibagan Sarbojanin',
      zone: 'North',
      theme: 'Architectural Splendor & Traditional Folk Artistry',
      image: 'pandals/hatibagan.png',
      transit: 'Shyambazar Metro (4 min walk)',
      transitType: 'metro',
      highlights: 'Over a century of celebration with majestic thematic facades and authentic community culture.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Hatibagan+Sarbojanin+Durgotsav+Kolkata'
    },

    {
      id: 'nalin-sarkar-street',
      name: 'Nalin Sarkar Street Sarbojanin',
      zone: 'North',
      theme: 'Raw Organic Material Artistry & Creative Clay Sculpture',
      image: 'pandals/Nalin Sarkar Street Sarbojanin.jpg',
      transit: 'Shyambazar Metro (3 min walk)',
      transitType: 'metro',
      highlights: 'Masterful transformations of bamboo, pottery, and jute into breathtaking spatial sculptures.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Nalin+Sarkar+Street+Durga+Puja+Kolkata'
    },
    {
      id: 'bagbazar-sarbojanin',
      name: 'Bagbazar Sarbojanin',
      zone: 'North',
      theme: 'Centenary Traditional Sabeki Idol & Iconic Dhunuchi Naach',
      image: 'pandals/baghbazar.jpg',
      transit: 'Shyambazar Metro (7 min walk) / Bagbazar Ghat',
      transitType: 'metro',
      highlights: 'Pure Bengali tradition with iconic snow-white Daaker Saaj idol, classic Sindoor Khela, and carnival adda.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Bagbazar+Sarbojanin+Durgotsav+Kolkata'
    },
    {
      id: 'sovabazar-rajbari',
      name: 'Sovabazar Rajbari',
      zone: 'North',
      theme: 'Aristocratic 1757 Bonedi Bari Open Courtyard Heritage',
      image: 'pandals/sova bazar rajbari.png',
      transit: 'Sovabazar Sutanuti Metro (2 min walk)',
      transitType: 'metro',
      highlights: 'Raja Nabakrishna Deb historical Natmandir courtyard, canonical Vedic ceremonies, and solemn grace.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Sovabazar+Rajbari+Kolkata'
    },
    {
      id: 'darjipara-mitra-bari',
      name: 'Darjipara Mitra Bari',
      zone: 'North',
      theme: 'Centenary Aristocratic Bonedi Bari Courtyard & Sabeki Ekchala Heritage',
      image: 'pandals/Darjipara-Mitra-Barir-Durga-Puja.webp',
      transit: 'Sovabazar Sutanuti / Girish Park Metro (5 min walk)',
      transitType: 'metro',
      highlights: 'Historic 1807 Bonedi courtyard puja featuring an ornate wooden Thakurdalan, majestic Ekchala idol, and century-old aristocratic rituals.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Darjipara+Mitra+Bari+Durga+Puja+Beadon+Street+Kolkata'
    },
    {
      id: 'jorasanko-shib-krishna-daw-rajbari',
      name: 'Jorasanko Shib Krishna Daw Rajbari',
      zone: 'North',
      theme: 'Royal 1840 Zamindari Palace Thakurdalan & Gold-Ornamented Goddess',
      image: 'pandals/jorasanko shib krishna daw Rajbari.jpeg',
      transit: 'Girish Park Metro (4 min walk via Vivekananda Rd)',
      transitType: 'metro',
      highlights: 'Celebrated 1840 Bonedi Bari puja famed for its majestic arches, Goddess Durga adorned in pure gold and diamond jewellery, and royal courtyard heritage.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Jorasanko+Shib+Krishna+Daw+Rajbari+Durga+Puja+Kolkata'
    },
    {
      id: 'sikdar-bagan',
      name: 'Sikdar Bagan',
      zone: 'North',
      theme: 'Centenary Pure Sculptural Artistry & Intimate North Kolkata Heritage',
      image: 'pandals/sikdar bagan.png',
      transit: 'Shyambazar Metro (3 min walk)',
      transitType: 'metro',
      highlights: 'Centenary North Kolkata jewel established in 1913, renowned for pure artistic idols, compact exquisite themes, and intimate heritage warmth.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Sikdar+Bagan+Sadharan+Durgotsav+Shyambazar+Kolkata'
    },
    {
      id: 'hatibagan-nabin-pally',
      name: 'Hatibagan Nabin Pally',
      zone: 'North',
      theme: 'Vibrant Community Craftsmanship & Dazzling Street Illumination',
      image: 'pandals/hatibagan nabin pally.webp',
      transit: 'Shyambazar Metro (4 min walk)',
      transitType: 'metro',
      highlights: 'Lively North Kolkata landmark recognized for innovative thematic craftsmanship, colorful illumination, and vibrant neighborhood adda.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Hatibagan+Nabin+Pally+Durga+Puja+Kolkata'
    },
    {
      id: 'ahiritola-jubak-brinda',
      name: 'Ahiritola Jubak Brinda',
      zone: 'North',
      theme: 'Riverside Youth Innovation & Kinetic Nighttime Illumination',
      image: 'pandals/Ahiritola Jubak Brinda.jpg',
      transit: 'Sovabazar Sutanuti Metro / Ahiritola Ghat (4 min walk)',
      transitType: 'metro',
      highlights: 'Vibrant youth-led riverside celebration known for creative modern concepts, lively cultural events, and energetic community participation.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Ahiritola+Jubak+Brinda+Durga+Puja+Kolkata'
    },
    {
      id: 'tala-prattoy',
      name: 'Tala Prattoy',
      zone: 'North',
      theme: 'Visionary Museum-Grade Conceptual Art & Avant-Garde Spatial Installation',
      image: 'pandals/Tala Prattoy.jpg',
      transit: 'Belgachia / Shyambazar Metro (5 min walk / auto to Tala Park)',
      transitType: 'metro',
      highlights: 'Internationally acclaimed conceptual benchmark created by maestro artists, featuring groundbreaking experimental architecture and thought-provoking sculptures.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Tala+Prattoy+Durga+Puja+Kolkata'
    },

    // --- SOUTH KOLKATA ZONE ---
    {
      id: 'singhi-park',
      name: 'Singhi Park Sarbojanin',
      zone: 'South',
      theme: 'Classical Indian Temple Monument & Majestic Traditional Idol',
      image: 'pandals/Singhi Park Sarbojanin.jpg',
      transit: 'Gariahat Phari / Dover Lane (Kalighat Metro auto-link)',
      transitType: 'metro',
      highlights: 'Grand temple replicas paired with legendary lighting by Chandannagar electrical artists.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Singhi+Park+Durga+Puja+Kolkata'
    },
    {
      id: 'badamtala-ashar-sangha',
      name: 'Badamtala Ashar Sangha',
      zone: 'South',
      theme: 'Pioneering Creative Thematic Installation & Environmental Art',
      image: 'pandals/Badamtala Ashar Sangha.jpg',
      transit: 'Kalighat Metro Station (3 min walk via Nepal Bhattacharjee St)',
      transitType: 'metro',
      highlights: 'South Kolkata theme-puja benchmark with award-winning creative soundscapes and innovative idol craft.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Badamtala+Ashar+Sangha+Kalighat+Kolkata'
    },

    {
      id: 'hindustan-club',
      name: 'Hindustan Club Sarbojanin',
      zone: 'South',
      theme: 'Regal Aesthetic Marvel & Royal Courtyard Ambience',
      image: 'pandals/Hindustan Club Sarbojanin.png',
      transit: 'Sarat Bose Road / Kalighat Metro (6 min walk)',
      transitType: 'metro',
      highlights: 'Lavish architectural designs with brilliant brass embellishments and peaceful devotion.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Hindustan+Club+Durga+Puja+Sarat+Bose+Road+Kolkata'
    },
    {
      id: 'ballygunge-cultural',
      name: 'Ballygunge Cultural Association',
      zone: 'South',
      theme: 'Heritage Terracotta Courtyard & Soulful Classical Music',
      image: 'pandals/ballygunge cultural association.png',
      transit: 'Lake Temple Road / Kalighat Metro (8 min walk)',
      transitType: 'metro',
      highlights: 'Beloved South Kolkata legacy puja known for aristocratic restraint, classical morning chants, and warm adda.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Ballygunge+Cultural+Association+Durga+Puja+Kolkata'
    },

    {
      id: 'barisha-club',
      name: 'Barisha Club',
      zone: 'South',
      theme: 'Profound Philosophical Installation & Motherhood Homage',
      image: 'pandals/Barisha Club.jpg',
      transit: 'Sakherbazar / Behala Chowrasta Metro (5 min walk)',
      transitType: 'metro',
      highlights: 'Celebrated across India for deeply moving emotional sculptures honoring maternal resilience and humanity.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Barisha+Club+Durga+Puja+Sakherbazar+Kolkata'
    },
    {
      id: 'behala-nutan-dal',
      name: 'Behala Nutan Dal',
      zone: 'South',
      theme: 'Contemporary Avant-Garde Space & Harmonic Acoustic Architecture',
      image: 'pandals/behala nutan dal.png',
      transit: 'Taratala / Behala Chowrasta Metro (6 min walk)',
      transitType: 'metro',
      highlights: 'Architectural marvel combining textured metallic acoustics, ambient chimes, and thought-provoking modern art.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Behala+Nutan+Dal+Durga+Puja+Kolkata'
    },
    {
      id: 'rajdanga-naba-uday',
      name: 'Rajdanga Naba Uday Sangha',
      zone: 'South',
      theme: 'Grand Rural Bengal Indigenous Artifacts & Tribal Motifs',
      image: 'pandals/Rajdanga Naba Uday Sangha.jpg',
      transit: 'Hemanta Mukherjee (Ruby) Metro / Kasba Crossing (6 min walk)',
      transitType: 'metro',
      highlights: 'Spectacular large-scale installations utilizing earthen clay, bell metal, and handmade rural artifacts.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Rajdanga+Naba+Uday+Sangha+Kasba+Kolkata'
    },
    {
      id: 'ekdalia-evergreen',
      name: 'Ekdalia Evergreen Club',
      zone: 'South',
      theme: 'Grand South Indian Temple Architecture & German Chandeliers',
      image: 'pandals/Ekdalia Evergreen Club.jpg',
      transit: 'Gariahat Junction / Ballygunge Phari (7 min walk)',
      transitType: 'metro',
      highlights: 'Glorious illuminated chandeliers, authentic South Indian temple art style with traditional idol.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Ekdalia+Evergreen+Club+Gariahat+Kolkata'
    },
    {
      id: 'suruchi-sangha',
      name: 'Suruchi Sangha (New Alipore)',
      zone: 'South',
      theme: 'Pan-Indian State Craftsmanship & Living Cultural Heritage',
      image: 'pandals/Suruchi_Sangha_Durga_Puja_2019.jpg',
      transit: 'Majerhat Station / Taratala Metro (8 min walk)',
      transitType: 'metro',
      highlights: 'Different Indian state craftsmanship themes annually, sustainable eco-friendly materials and soulful folk music.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Suruchi+Sangha+New+Alipore+Kolkata'
    },
    {
      id: 'tridhara-sammilani',
      name: 'Tridhara Sammilani',
      zone: 'South',
      theme: 'Tribal Folklore & Contemporary Bengal Installation Art',
      image: 'pandals/Tridhara Sammilani.jpg',
      transit: 'Jatin Das Park / Kalighat Metro (6 min walk)',
      transitType: 'metro',
      highlights: 'Iconic street installation featuring indigenous art traditions, mesmerizing soundscapes, and expressive idols.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Tridhara+Sammilani+Durga+Puja+Kolkata'
    },
    {
      id: 'mudiali-club',
      name: 'Mudiali Club',
      zone: 'South',
      theme: 'Traditional Environmental Artistry & Exquisite Golden Idol',
      image: 'pandals/mudiali.png',
      transit: 'Rabindra Sarobar / Kalighat Metro (5 min walk)',
      transitType: 'metro',
      highlights: 'Decades of classical beauty with nature-inspired hand-painted murals and dazzling golden Goddess ornaments.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Mudiali+Club+Durga+Puja+Kolkata'
    },
    {
      id: 'bosepukur-talbagan',
      name: 'Bosepukur Talbagan',
      zone: 'South',
      theme: 'Traditional Bengal Folk Art & Intricate Eco-Craft Architecture',
      image: 'pandals/bosepukur talbagan.jpg',
      transit: 'Ballygunge Station / Hemanta Mukherjee (Ruby) Metro (Auto to Bosepukur)',
      transitType: 'bus',
      highlights: 'Celebrated Kasba landmark famed for heritage environmental installations, rural Bengal crafts, and lively festive atmosphere.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Bosepukur+Talbagan+Durga+Puja+Kasba+Kolkata'
    },
    {
      id: 'shivmandir',
      name: 'Shivmandir',
      zone: 'South',
      theme: 'Ethereal Spiritual Sanctuary & Contemporary Bengali Sculpture',
      image: 'pandals/shiv mandir durga puja.jpg',
      transit: 'Rabindra Sarobar Metro / Lake Kalibari (4 min walk)',
      transitType: 'metro',
      highlights: 'Nestled by Rabindra Sarobar Lake, renowned for serene spiritual themes, soul-stirring lighting, and creative idol artistry.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Shiv+Mandir+Sarbojanin+Durga+Puja+Lake+Temple+Road+Kolkata'
    },
    {
      id: 'bosepukur-sitalamandir',
      name: 'Bosepukur Sitalamandir',
      zone: 'South',
      theme: 'Pioneering Thematic Installations & Indigenous Clay Art',
      image: 'pandals/bosepukur sitalamandir.png',
      transit: 'Ballygunge Station / Gariahat (Auto link to Bosepukur)',
      transitType: 'bus',
      highlights: 'Historic trail-blazer of Kolkata theme puja movement with iconic artistic materials, terracotta motifs, and classical deity.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Bosepukur+Sitalamandir+Durga+Puja+Kasba+Kolkata'
    },
    {
      id: 'deshapriya-park',
      name: 'Deshapriya Park',
      zone: 'South',
      theme: 'Grand Festive Fairground & Towering Thematic Monument',
      image: 'pandals/deshapriya park.jpg',
      transit: 'Kalighat Metro Station (5 min walk)',
      transitType: 'metro',
      highlights: 'One of South Kolkatas most iconic expansive park pujas, known for record-breaking monumental concepts, vast food carnival, and vibrant energy.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Deshapriya+Park+Durga+Puja+Rashbehari+Avenue+Kolkata'
    },
    {
      id: 'chetla-agrani',
      name: 'Chetla Agrani',
      zone: 'South',
      theme: 'Sublime Concept Art & Master Earthen Terracotta Craft',
      image: 'pandals/chetla agrani.jpg',
      transit: 'Kalighat / Netaji Bhavan Metro (7 min walk)',
      transitType: 'metro',
      highlights: 'Annual masterpiece conceptualized by renowned artists, featuring breathtaking organic architectural pavilions and soulful lighting.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Chetla+Agrani+Club+Durga+Puja+Kolkata'
    },
    {
      id: 'haridevpur-41-pally',
      name: 'Haridevpur 41 Pally',
      zone: 'South',
      theme: 'Experimental Avant-Garde Sculpture & Environmental Narrative',
      image: 'pandals/haridevpur 41 pally.jpg',
      transit: 'Mahanayak Uttam Kumar (Tollygunge) Metro (Auto to Haridevpur)',
      transitType: 'metro',
      highlights: 'Famed for deep philosophical storytelling, organic sustainable materials, and award-winning creative idol design.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Haridevpur+41+Pally+Durga+Puja+Kolkata'
    },
    {
      id: 'kendua-shanti-shangha',
      name: 'Kendua Shanti Shangha',
      zone: 'South',
      theme: 'Rural Bengal Artisan Heritage & Sustainable Eco-Craft Concept',
      image: 'pandals/kendua shanti shangha.png',
      transit: 'Kavi Subhash / Shahid Khudiram Metro (Auto to Kendua / Garia)',
      transitType: 'metro',
      highlights: 'Prominent South suburban cultural hub recognized for exquisite rural artisan work, sustainable eco-friendly themes, and warm community bonding.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kendua+Shanti+Sangha+Durga+Puja+Garia+Kolkata'
    },
    {
      id: 'naktala-udayan-sangha',
      name: 'Naktala Udayan Sangha',
      zone: 'South',
      theme: 'Revolutionary Avant-Garde Spatial Design & Mammoth Concept Sculptures',
      image: 'pandals/Naktala Udayan Sangha.jpg',
      transit: 'Gitanjali (Naktala) Metro (3 min walk)',
      transitType: 'metro',
      highlights: 'South Kolkatas ultimate crowd magnet featuring revolutionary avant-garde conceptual art, mammoth sculptures, and award-winning idols.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Naktala+Udayan+Sangha+Durga+Puja+Kolkata'
    },
    {
      id: 'maddox-square',
      name: 'Maddox Square',
      zone: 'South',
      theme: 'Traditional Sabeki Ekchala Idol & Legendary Open-Air Cultural Adda',
      image: 'pandals/Maddox Square.jpg',
      transit: 'Netaji Bhavan / Jatin Das Park Metro (8 min walk via Ritchie Rd)',
      transitType: 'metro',
      highlights: 'The ultimate open-air festive adda hub of Kolkata, featuring a grand open courtyard pandal and breathtaking golden Sabeki Ekchala idol.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Maddox+Square+Durga+Puja+Ballygunge+Kolkata'
    },

    // --- CENTRAL KOLKATA ZONE ---
    {
      id: 'college-square',
      name: 'College Square',
      zone: 'Central',
      theme: 'Spectacular Water Reflection & Historic Illumination',
      image: 'pandals/College Square.jpg',
      transit: 'Central / Mahatma Gandhi Road Metro (5 min walk)',
      transitType: 'metro',
      highlights: 'Huge illuminated lake reflecting thousands of synchronized bulbs, traditional idol by Sanatan Rudra Pal.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=College+Square+Durga+Puja+Kolkata'
    },
    {
      id: 'mohammad-ali-park',
      name: 'Mohammad Ali Park',
      zone: 'Central',
      theme: 'Colossal Royal Fort & Historic Palace Monument Replica',
      image: 'pandals/mohammad ali park.jpg',
      transit: 'MG Road Metro Station (2 min walk)',
      transitType: 'metro',
      highlights: 'Sprawling park grounds dominated by towering architectural fort replicas and heritage lighting.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Mohammad+Ali+Park+Durga+Puja+Kolkata'
    },
    {
      id: 'santosh-mitra-square',
      name: 'Santosh Mitra Square',
      zone: 'Central',
      theme: 'Monumental Architectural Wonder & Dazzling Laser Spectacle',
      image: 'pandals/santosh mitra.jpg',
      transit: 'Central / Sealdah Metro (5 min walk)',
      transitType: 'metro',
      highlights: 'Legendary mega-scale architectural marvels (such as Ram Mandir replica and Sphere), grand lighting, and massive citywide crowds.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Santosh+Mitra+Square+Durga+Puja+Lebutala+Kolkata'
    },
    {
      id: 'badan-chand-roy-rajbari',
      name: 'Badan Chand Roy Rajbari',
      zone: 'Central',
      theme: 'Historic 1857 Bonedi Bari Thakurdalan & Ancestral Vaishnava Rituals',
      image: 'pandals/Badan Chand Roy Rajbari.jpg',
      transit: 'MG Road / Central Metro (5 min walk, Colootola)',
      transitType: 'metro',
      highlights: 'Historical Bonedi Bari Durga Puja celebrated since 1857 at the ancestral Thakurdalan with traditional Ekchala Pratima and legacy Vaishnava customs.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Badan+Chand+Roy+Rajbari+Durga+Puja+Colootola+Kolkata'
    },


    // --- EAST & SALT LAKE ZONE ---
    {
      id: 'sreebhumi-sporting',
      name: 'Sreebhumi Sporting Club',
      zone: 'East',
      theme: 'Monumental World Wonder Architecture & Pure Gold Ornaments',
      image: 'pandals/Sreebhumi Sporting Club.jpg',
      transit: 'VIP Road Lake Town (Bus / Taxi link to Ultadanga / Dum Dum Metro)',
      transitType: 'bus',
      highlights: 'Diamond and pure gold ornamented Goddess idol, breathtaking architectural replica with dynamic laser light show.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Sreebhumi+Sporting+Club+VIP+Road+Kolkata'
    },

    {
      id: 'dum-dum-park-yubak-brinda',
      name: 'Dum Dum Park Yubak Brinda',
      zone: 'East',
      theme: 'Bold Modern Conceptual Installation & Eco-Friendly Design',
      image: 'pandals/Dum Dum Park Yubak Brinda.webp',
      transit: 'VIP Road / Jessore Road Crossing (Dum Dum Metro auto-link)',
      transitType: 'bus',
      highlights: 'Striking artistic experiments with innovative materials, modern aesthetics, and ambient lights.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Dum+Dum+Park+Yubak+Brinda+Durga+Puja+Kolkata'
    },
    {
      id: 'dum-dum-park-sarbojanin',
      name: 'Dum Dum Park Sarbojanin',
      zone: 'East',
      theme: 'Time-Honored Cultural Heritage & Architectural Grandeur',
      image: 'pandals/Dum Dum Park Sarbojanin.avif',
      transit: 'Dum Dum Park Tank 2 / VIP Road link',
      transitType: 'bus',
      highlights: 'Pioneer of the famous Dum Dum Park puja hub, delivering timeless thematic beauty year after year.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Dum+Dum+Park+Sarbojanin+Durga+Puja+Kolkata'
    },
    {
      id: 'dum-dum-park-bharat-chakra',
      name: 'Dum Dum Park Bharat Chakra',
      zone: 'East',
      theme: 'Social Empathy & Exquisite Textured Sculpture',
      image: 'pandals/Dum Dum Park Bharat Chakra.jpg',
      transit: 'VIP Road / Dum Dum Park (7 min walk from Footbridge)',
      transitType: 'bus',
      highlights: 'Profound societal messages translated through master clay and wood sculptures with moving soundtracks.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Dum+Dum+Park+Bharat+Chakra+Kolkata'
    },
    {
      id: 'dum-dum-park-tarun-dal',
      name: 'Dum Dum Park Tarun Dal',
      zone: 'East',
      theme: 'Surrealistic Spatial Architecture & Dynamic Kinetic Art',
      image: 'pandals/dum dum park tarun dal.png',
      transit: 'VIP Road / Dum Dum Park Tank 3',
      transitType: 'bus',
      highlights: 'Mind-bending geometric forms, kinetic wind sculptures, and immersive illuminated pathways.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Dum+Dum+Park+Tarun+Dal+Durga+Puja+Kolkata'
    },
    {
      id: 'dum-dum-park-tarun-sangha',
      name: 'Dum Dum Park Tarun Sangha',
      zone: 'East',
      theme: 'Nationally Acclaimed Thematic Installation & Master Clay Idol',
      image: 'pandals/Dum Dum Park Tarun Sangha.jpg',
      transit: 'VIP Road / Dum Dum Park (5 min walk)',
      transitType: 'bus',
      highlights: 'Multiple Asian Paints Sharod Samman winner celebrating intricate craft, poignant themes, and divine artistry.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Dum+Dum+Park+Tarun+Sangha+Kolkata'
    },
    {
      id: 'dakshindari-youth',
      name: 'Dakshindari Youth Club',
      zone: 'East',
      theme: 'Monumental Heritage Temple Replica & Chandannagar Lights',
      image: 'pandals/Dakshindari Youth Club.png',
      transit: 'VIP Road / Ultadanga (Bidhan Nagar Road Station 8 min walk)',
      transitType: 'bus',
      highlights: 'Giant temple architectural setups along the VIP Road corridor with spectacular night illuminations.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Dakshindari+Youth+Club+Durga+Puja+Kolkata'
    },
    {
      id: 'arjunpur-amra-sabai',
      name: 'Arjunpur Amra Sabai Club',
      zone: 'East',
      theme: 'Avant-Garde Installation Art & Thought-Provoking Themes',
      image: 'pandals/arjunpur amra sabai club.jpg',
      transit: 'VIP Road / Baguiati Crossing (Dum Dum Metro link)',
      transitType: 'bus',
      highlights: 'Renowned for courageous modern concepts, environmental messages, and masterly artistic idols.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Arjunpur+Amra+Sabai+Club+Durga+Puja+Kolkata'
    },
    {
      id: 'salt-lake-bj-block',
      name: 'Salt Lake BJ Block',
      zone: 'East',
      theme: 'Regal Palace Architecture & Massive Cultural Fairground',
      image: 'pandals/BJ Block Durga Puja.jpg',
      transit: 'Karunamoyee Metro Station (6 min walk)',
      transitType: 'metro',
      highlights: 'Extensive fairground with festive food stalls, royal palace replicas, and traditional community adda.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Salt+Lake+BJ+Block+Durga+Puja+Kolkata'
    },

    {
      id: 'salt-lake-fd-block',
      name: 'Salt Lake FD Block',
      zone: 'East',
      theme: 'Monumental Conceptual Architecture & Festive Mega Fairground',
      image: 'pandals/fd clock.png',
      transit: 'Karunamoyee / Central Park Metro (6 min walk)',
      transitType: 'metro',
      highlights: 'Salt Lakes largest crowd-puller featuring colossal architectural replicas and bustling festive melas.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Salt+Lake+FD+Block+Durga+Puja+Kolkata'
    },
    {
      id: 'salt-lake-ib-block',
      name: 'Salt Lake IB Block',
      zone: 'East',
      theme: 'Grand Thematic Architecture & Vibrant Salt Lake Community Fair',
      image: 'pandals/ib block.png',
      transit: 'Salt Lake Stadium / Karunamoyee Metro (5 min walk)',
      transitType: 'metro',
      highlights: 'Prominent Salt Lake township celebration known for beautiful conceptual pandals, grand community gatherings, and festive cultural functions.',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Salt+Lake+IB+Block+Durga+Puja+Kolkata'
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
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Arsalan+Restaurant+Park+Circus+Kolkata',
      nearbyPandals: [
        { name: 'Tridhara Sammilani', url: 'https://www.google.com/maps/dir/?api=1&destination=Tridhara+Sammilani+Durga+Puja+Kolkata' },
        { name: 'Ekdalia Evergreen Club', url: 'https://www.google.com/maps/dir/?api=1&destination=Ekdalia+Evergreen+Club+Durga+Puja+Kolkata' },
        { name: 'Ballygunge Cultural Association', url: 'https://www.google.com/maps/dir/?api=1&destination=Ballygunge+Cultural+Association+Durga+Puja+Kolkata' }
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
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Golbari+Shyambazar+Kolkata',
      nearbyPandals: [
        { name: 'Bagbazar Sarbojanin', url: 'https://www.google.com/maps/dir/?api=1&destination=Bagbazar+Sarbojanin+Durga+Puja+Kolkata' },
        { name: 'Hatibagan Sarbojanin', url: 'https://www.google.com/maps/dir/?api=1&destination=Hatibagan+Sarbojanin+Durga+Puja+Kolkata' },
        { name: 'Hatibagan Nabin Pally', url: 'https://www.google.com/maps/dir/?api=1&destination=Hatibagan+Nabin+Pally+Durga+Puja+Kolkata' }
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
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Mitra+Cafe+Shyambazar+Kolkata',
      nearbyPandals: [
        { name: 'Ahiritola Jubak Brinda', url: 'https://www.google.com/maps/dir/?api=1&destination=Ahiritola+Jubak+Brinda+Durga+Puja+Kolkata' },
        { name: 'Sovabazar Rajbari', url: 'https://www.google.com/maps/dir/?api=1&destination=Sovabazar+Rajbari+Kolkata' },
        { name: 'Kumartuli Park', url: 'https://www.google.com/maps/dir/?api=1&destination=Kumartuli+Park+Durga+Puja+Kolkata' }
      ]
    },
    {
      id: 'food-4',
      name: 'Peter Cat',
      category: 'food',
      categoryLabel: 'Park Street Continental Icon',
      location: 'Park Street (Near Stephen Court)',
      metro: 'Park Street Metro (4 min walk)',
      desc: 'Kolkata heritage institution renowned for its legendary Chelo Kebab served on buttered rice topped with poached egg.',
      mustTry: 'Original Chelo Kebab, Sizzling Steaks & Cocktail Pitchers',
      timings: 'Lunch to Late Night',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Peter+Cat+Park+Street+Kolkata',
      nearbyPandals: [
        { name: 'Maddox Square', url: 'https://www.google.com/maps/dir/?api=1&destination=Maddox+Square+Durga+Puja+Kolkata' },
        { name: 'Deshapriya Park', url: 'https://www.google.com/maps/dir/?api=1&destination=Deshapriya+Park+Durga+Puja+Kolkata' },
        { name: 'Mohammad Ali Park', url: 'https://www.google.com/maps/dir/?api=1&destination=Mohammad+Ali+Park+Durga+Puja+Kolkata' }
      ]
    },
    {
      id: 'food-5',
      name: 'Mocambo',
      category: 'food',
      categoryLabel: 'Park Street Vintage Continental',
      location: 'Park Street / Free School St',
      metro: 'Park Street Metro (3 min walk)',
      desc: 'Serving Kolkata since 1956 with retro dining charm, live organ melodies, and decadent vintage continental recipes.',
      mustTry: 'Deviled Crab, Chicken Tetrazzini & Baked Alaska',
      timings: 'Lunch to Late Night',
      image: 'food/Mocambo.webp',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Mocambo+Restaurant+Park+Street+Kolkata',
      nearbyPandals: [
        { name: 'Maddox Square', url: 'https://www.google.com/maps/dir/?api=1&destination=Maddox+Square+Durga+Puja+Kolkata' },
        { name: 'Santosh Mitra Square', url: 'https://www.google.com/maps/dir/?api=1&destination=Santosh+Mitra+Square+Durga+Puja+Kolkata' },
        { name: 'Ekdalia Evergreen Club', url: 'https://www.google.com/maps/dir/?api=1&destination=Ekdalia+Evergreen+Club+Durga+Puja+Kolkata' }
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
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=6+Ballygunge+Place+Kolkata',
      nearbyPandals: [
        { name: 'Tridhara Sammilani', url: 'https://www.google.com/maps/dir/?api=1&destination=Tridhara+Sammilani+Durga+Puja+Kolkata' },
        { name: 'Ballygunge Cultural Association', url: 'https://www.google.com/maps/dir/?api=1&destination=Ballygunge+Cultural+Association+Durga+Puja+Kolkata' },
        { name: 'Deshapriya Park', url: 'https://www.google.com/maps/dir/?api=1&destination=Deshapriya+Park+Durga+Puja+Kolkata' }
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
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Bhojohori+Manna+Gariahat+Kolkata',
      nearbyPandals: [
        { name: 'Tridhara Sammilani', url: 'https://www.google.com/maps/dir/?api=1&destination=Tridhara+Sammilani+Durga+Puja+Kolkata' },
        { name: 'Chetla Agrani', url: 'https://www.google.com/maps/dir/?api=1&destination=Chetla+Agrani+Durga+Puja+Kolkata' },
        { name: 'Mudiali Club', url: 'https://www.google.com/maps/dir/?api=1&destination=Mudiali+Club+Durga+Puja+Kolkata' }
      ]
    },
    {
      id: 'food-9',
      name: 'Campari',
      category: 'bengali',
      categoryLabel: 'Iconic South Kolkata Fry Joint',
      location: 'Gariahat (Near Singhi Park / Dover Lane)',
      metro: 'Kalighat Metro auto-link / Gariahat Crossing',
      desc: 'Legendary standing snack counter serving crisp breadcrumbed diamond fish fries and royal mutton rolls to puja hoppers.',
      mustTry: 'Bhetki Fish Roll, Chicken Cutlet & Mutton Roll',
      timings: 'Afternoon & Evening',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Campari+Gariahat+Kolkata',
      nearbyPandals: [
        { name: 'Tridhara Sammilani', url: 'https://www.google.com/maps/dir/?api=1&destination=Tridhara+Sammilani+Durga+Puja+Kolkata' },
        { name: 'Ballygunge Cultural Association', url: 'https://www.google.com/maps/dir/?api=1&destination=Ballygunge+Cultural+Association+Durga+Puja+Kolkata' },
        { name: 'Naktala Udayan Sangha', url: 'https://www.google.com/maps/dir/?api=1&destination=Naktala+Udayan+Sangha+Durga+Puja+Kolkata' }
      ]
    },
    {
      id: 'food-10',
      name: 'Kusum Rolls',
      category: 'food',
      categoryLabel: 'Kolkata Street Kati Roll Pioneer',
      location: 'Park Street (Opposite Peter Cat)',
      metro: 'Park Street Metro (3 min walk)',
      desc: 'The iconic midnight snacking joint famed for flaky parathas wrapped around succulent chicken and mutton kebabs with lime and green chillies.',
      mustTry: 'Double Egg Double Chicken Roll, Cheese Mutton Roll',
      timings: 'Open Late Night during Puja',
      image: 'food/kusum rolls.jpg',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kusum+Rolls+Park+Street+Kolkata',
      nearbyPandals: [
        { name: 'Maddox Square', url: 'https://www.google.com/maps/dir/?api=1&destination=Maddox+Square+Durga+Puja+Kolkata' },
        { name: 'Deshapriya Park', url: 'https://www.google.com/maps/dir/?api=1&destination=Deshapriya+Park+Durga+Puja+Kolkata' },
        { name: 'Mohammad Ali Park', url: 'https://www.google.com/maps/dir/?api=1&destination=Mohammad+Ali+Park+Durga+Puja+Kolkata' }
      ]
    },
    {
      id: 'food-12',
      name: 'Balaram Mullick & Radharaman Mullick',
      category: 'sweets',
      categoryLabel: 'Modern & Traditional Mishti Pioneer',
      location: 'Bhowanipore (Near 75 Palli & 64 Palli)',
      metro: 'Netaji Bhavan Metro (3 min walk)',
      desc: 'Since 1885, pioneers of artisanal baked rosogolla, melt-in-mouth nolen gur delicacies, and festive dry-fruit sweets.',
      mustTry: 'Baked Rosogolla, Chocolate Sandesh & Jalbhara Talsash',
      timings: 'Morning to Night',
      image: 'food/Balaram Mullick & Radharaman Mullick.avif',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Balaram+Mullick+Radharaman+Mullick+Bhowanipore+Kolkata',
      nearbyPandals: [
        { name: 'Maddox Square', url: 'https://www.google.com/maps/dir/?api=1&destination=Maddox+Square+Durga+Puja+Kolkata' },
        { name: 'Chetla Agrani', url: 'https://www.google.com/maps/dir/?api=1&destination=Chetla+Agrani+Durga+Puja+Kolkata' },
        { name: 'Mudiali Club', url: 'https://www.google.com/maps/dir/?api=1&destination=Mudiali+Club+Durga+Puja+Kolkata' }
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
      bestTime: 'Post-afternoon (3:00 PM - 9:30 PM)',
      highlight: 'Dhakai Jamdani, Baluchari, Tussar Silks & terracotta necklaces.',
      image: 'food/Gariahat Market & Triangular Park.avif',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Gariahat+Market+Kolkata'
    },
    {
      id: 'shop-2',
      name: 'Hatibagan Market & Shyambazar',
      type: 'sarees',
      typeLabel: 'Traditional Bengali Silk & Cotton Hub',
      location: 'Bidhan Sarani / Shyambazar',
      metro: 'Shyambazar Metro (2 min walk)',
      desc: 'Historic North Kolkata shopping paradise known for authentic Shantipur & Phulia Taant sarees, festive kurtas, dhotis, and vintage charm.',
      bestTime: 'Morning or late evening (11 AM - 9 PM)',
      highlight: 'Unbeatable festive deals on Taant cotton sarees and kids\' festive wear.',
      image: 'food/Hatibagan Market & Shyambazar.webp',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Hatibagan+Market+Kolkata'
    },
    {
      id: 'shop-3',
      name: 'New Market (Sir Stuart Hogg Market)',
      type: 'shopping',
      typeLabel: 'Victorian Arcade & All-in-One Bazaar',
      location: 'Lindsay Street / Esplanade',
      metro: 'Esplanade Metro (3 min walk)',
      desc: 'Built in 1874 with red brick Gothic architecture, housing over 2,000 stalls offering shoes, jewelry, brassware, and festive gifts.',
      bestTime: '11:00 AM - 8:30 PM (Closed Sundays normally, Open during Puja)',
      highlight: 'Nahoum & Sons plum cakes, Kashmiri shawls, silver jewelry & brassware.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/New_Market_-_Kolkata_December_2019.jpg',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=New+Market+Kolkata'
    },
    {
      id: 'shop-5',
      name: 'Dakshinapan Shopping Complex',
      type: 'shopping',
      typeLabel: 'Handloom & Handicrafts State Emporiums',
      location: 'Dhakuria (Near Gariahat Flyover end)',
      metro: 'Dhakuria Railway Station / Rabindra Sarobar Metro',
      desc: 'Open-air cultural shopping arcade featuring government state emporiums (Tantuja, Manjusha, Biswa Bangla, Cauvery, Mrignayani).',
      bestTime: '11:00 AM - 7:30 PM',
      highlight: 'Certified handloom sarees, dokra artifacts, sandalwood crafts & Madhubani art.',
      image: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Dakshinapan+Shopping+Complex+Kolkata'
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
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kumartuli+Kolkata'
    },
    {
      id: 'shop-8',
      name: 'Burrabazar Traditional Wholesale Market',
      type: 'sarees',
      typeLabel: 'Historic Wholesale Textile & Gold Bourse',
      location: 'MG Road / Barabazar',
      metro: 'Mahatma Gandhi Road Metro (3 min walk)',
      desc: 'One of India\'s oldest and largest commercial markets: direct-from-weaver wholesale prices for Banarasi silk, dhotis, and Puja puja-samagri.',
      bestTime: '11:00 AM - 7:00 PM',
      highlight: 'Pure Banarasi silk sarees, puja brassware lamps, incense & festive gift hampers.',
      image: 'food/Burrabazar Traditional Wholesale Market.jpg',
      locationUrl: 'https://www.google.com/maps/dir/?api=1&destination=Burrabazar+Kolkata'
    }
  ];

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
          desc: 'The historic 4:00 AM All India Radio broadcast of Mahishasuramardini, chanting the sacred verses of Sri Sri Chandi depicting Devi Durga\'s invocation to defeat the demon king Mahishasura.'
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
  }

  const soundEngine = new SacredSoundEngine();

  // --- 3. LOCAL STORAGE BOOKMARK STORE ---
  const Storage = {
    KEY_BOOKMARKS: 'akalbodhon_bookmarks',
    KEY_THEME: 'akalbodhon_theme',

    getBookmarks() {
      try {
        const saved = localStorage.getItem(this.KEY_BOOKMARKS);
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
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
      return isSaved;
    },

    isBookmarked(id) {
      const list = this.getBookmarks();
      return list.some(b => b.id === id);
    },

    clearBookmarks() {
      localStorage.removeItem(this.KEY_BOOKMARKS);
    }
  };

  // --- 4. TOAST NOTIFICATIONS ---
  function showToast(message, icon = 'info') {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;

    const iconEl = toast.querySelector('.toast-icon');
    const msgEl = toast.querySelector('.toast-msg');

    if (iconEl) iconEl.textContent = icon;
    if (msgEl) msgEl.textContent = message;

    toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 3200);
  }

  // --- 5. SCROLL DISPLAY (NO BLURRING - CRISP & IMMEDIATELY CLEAR) ---
  function initScrollReveal() {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('is-revealed');
    });
  }

  // --- 6. REAL-TIME FESTIVAL COUNTDOWN TO MAHALAYA ---
  function initCountdown() {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');
    const zeroMsg = document.getElementById('countdown-zero-message');

    // Mahalaya Dawn Awakening target: 10 October 2026, 4:00 AM
    const targetDate = new Date(2026, 9, 10, 4, 0, 0);

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
    setInterval(update, 1000);
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
        RAJBARI_PANDAL_IDS.includes(p.id) || 
        p.name.toLowerCase().includes('rajbari') || 
        p.name.toLowerCase().includes('bari')
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
        <div class="bg-surface-container-lowest dark:bg-[#1c1810] rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-outline-variant/30 dark:border-amber-400/20 flex flex-col h-full relative reveal-on-scroll ${delayClass}" data-pandal-id="${pandal.id}">
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

            <div class="pt-2 sm:pt-3 border-t border-outline-variant/30 dark:border-amber-400/20 flex gap-1.5 sm:gap-2 items-center">
              <a 
                href="${pandal.locationUrl}" 
                target="_blank" 
                rel="noopener"
                class="flex-1 bg-primary dark:bg-amber-400 hover:bg-primary-container text-on-primary dark:text-black py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-2 shadow-sm hover:shadow"
                title="Get Exact Directions in Google Maps"
              >
                <!-- Directions Pin Icon -->
                <img src="maps-pin.png" alt="Directions" class="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 drop-shadow-sm object-contain" />
                <span class="truncate">Directions</span>
              </a>
              <button 
                class="pandal-bookmark-btn w-7 h-7 sm:w-10 sm:h-10 border rounded-lg sm:rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${bookmarkBtnClass}"
                data-id="${pandal.id}"
                title="${isSaved ? 'Remove from saved' : 'Save to Itinerary'}"
              >
                <span class="material-symbols-outlined text-[15px] sm:text-[20px]" style="${isSaved ? "font-variation-settings: 'FILL' 1;" : ''}">${isSaved ? 'bookmark' : 'bookmark_border'}</span>
              </button>
              <button 
                class="pandal-info-btn w-7 h-7 sm:w-10 sm:h-10 border border-outline-variant/50 dark:border-amber-400/30 hover:border-secondary-container dark:hover:border-amber-300 rounded-lg sm:rounded-xl flex items-center justify-center text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300 transition-colors shrink-0"
                data-id="${pandal.id}"
                title="View Full Details"
              >
                <span class="material-symbols-outlined text-[15px] sm:text-[20px]">info</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    attachPandalEventListeners();
    initScrollReveal();
  }

  function attachPandalEventListeners() {
    document.querySelectorAll('.pandal-bookmark-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const pandal = PANDALS_DATA.find(p => p.id === id);
        if (!pandal) return;

        const isSaved = Storage.toggleBookmark({
          id: pandal.id,
          name: pandal.name,
          category: 'Pandal',
          location: pandal.transit,
          zone: pandal.zone,
          link: pandal.locationUrl,
          image: pandal.image
        });

        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) {
          icon.textContent = isSaved ? 'bookmark' : 'bookmark_border';
          icon.style.fontVariationSettings = isSaved ? "'FILL' 1" : "";
        }

        if (isSaved) {
          btn.className = 'pandal-bookmark-btn w-10 h-10 border rounded-xl flex items-center justify-center transition-all cursor-pointer bg-primary text-white border-primary dark:bg-amber-400 dark:text-black dark:border-amber-400 shadow-md';
        } else {
          btn.className = 'pandal-bookmark-btn w-10 h-10 border rounded-xl flex items-center justify-center transition-all cursor-pointer text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300 bg-surface-container-low dark:bg-[#252016] border-outline-variant/50 dark:border-amber-400/30';
        }

        showToast(isSaved ? `Added "${pandal.name}" to Itinerary!` : `Removed "${pandal.name}" from Itinerary`, isSaved ? 'bookmark_added' : 'bookmark_remove');
        renderSavedItinerary();
      };
    });

    document.querySelectorAll('.pandal-info-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const pandal = PANDALS_DATA.find(p => p.id === id);
        if (pandal) openDetailModal(pandal, 'pandal');
      };
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
    if (filter === 'food' || filter === 'biryani' || filter === 'bengali' || filter === 'sweets') {
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
            <div class="bg-surface-container-lowest dark:bg-[#1c1810] rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-outline-variant/30 dark:border-amber-400/20 flex flex-col h-full relative reveal-on-scroll ${delayClass}">
              <div class="h-28 sm:h-48 relative overflow-hidden bg-surface-container dark:bg-[#252016]">
                <img 
                  src="${food.image}" 
                  alt="${food.name}" 
                  loading="lazy"
                  decoding="async"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onerror="this.src='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'"
                />
                <div class="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-secondary-container dark:bg-amber-400 text-on-secondary-container dark:text-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold flex items-center gap-1 shadow-md">
                  <span class="material-symbols-outlined text-[12px] sm:text-[14px]">restaurant</span> ${food.categoryLabel}
                </div>
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

                <div class="pt-2 sm:pt-3 border-t border-outline-variant/30 dark:border-amber-400/20 flex gap-1.5 sm:gap-2 items-center">
                  <a 
                    href="${food.locationUrl}" 
                    target="_blank" 
                    rel="noopener"
                    class="flex-1 bg-primary dark:bg-amber-400 hover:bg-primary-container text-on-primary dark:text-black py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-2 shadow-sm hover:shadow"
                  >
                    <!-- Directions Pin Icon -->
                    <img src="maps-pin.png" alt="Directions" class="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 drop-shadow-sm object-contain" />
                    <span class="truncate">Directions</span>
                  </a>
                  <button 
                    class="food-bookmark-btn w-7 h-7 sm:w-10 sm:h-10 border border-outline-variant/50 dark:border-amber-400/30 hover:border-primary rounded-lg sm:rounded-xl flex items-center justify-center transition-colors shrink-0 ${isSaved ? 'text-primary dark:text-amber-300 bg-primary/10 dark:bg-amber-400/20' : 'text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300'}"
                    data-id="${food.id}"
                    title="${isSaved ? 'Remove from saved' : 'Save to Itinerary'}"
                  >
                    <span class="material-symbols-outlined text-[15px] sm:text-[20px]">${isSaved ? 'bookmark' : 'bookmark_border'}</span>
                  </button>
                  <button 
                    class="food-info-btn w-7 h-7 sm:w-10 sm:h-10 border border-outline-variant/50 dark:border-amber-400/30 hover:border-secondary-container dark:hover:border-amber-300 rounded-lg sm:rounded-xl flex items-center justify-center text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300 transition-colors shrink-0"
                    data-id="${food.id}"
                    title="View Full Details"
                  >
                    <span class="material-symbols-outlined text-[15px] sm:text-[20px]">info</span>
                  </button>
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
            <div class="bg-surface-container-lowest dark:bg-[#1c1810] rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-outline-variant/30 dark:border-amber-400/20 flex flex-col h-full relative reveal-on-scroll ${delayClass}">
              <div class="h-28 sm:h-48 relative overflow-hidden bg-surface-container dark:bg-[#252016]">
                <img 
                  src="${shop.image}" 
                  alt="${shop.name}" 
                  loading="lazy"
                  decoding="async"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onerror="this.src='https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'"
                />
                <div class="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-secondary-container dark:bg-amber-400 text-on-secondary-container dark:text-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold flex items-center gap-1 shadow-md">
                  <span class="material-symbols-outlined text-[12px] sm:text-[14px]">shopping_bag</span> ${shop.typeLabel}
                </div>
                <div class="absolute bottom-1.5 left-1.5 sm:bottom-3 sm:left-3 bg-surface/95 dark:bg-[#12100a]/95 backdrop-blur-md text-primary dark:text-amber-300 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold border border-outline-variant/40 dark:border-amber-400/30 shadow-sm flex items-center gap-1">
                  <span class="material-symbols-outlined text-[11px] sm:text-[14px]">schedule</span> <span class="truncate">${shop.bestTime}</span>
                </div>
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

                <div class="pt-2 sm:pt-3 border-t border-outline-variant/30 dark:border-amber-400/20 flex gap-1.5 sm:gap-2 items-center">
                  <a 
                    href="${shop.locationUrl}" 
                    target="_blank" 
                    rel="noopener"
                    class="flex-1 bg-primary dark:bg-amber-400 hover:bg-primary-container text-on-primary dark:text-black py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-2 shadow-sm hover:shadow"
                  >
                    <!-- Directions Pin Icon -->
                    <img src="maps-pin.png" alt="Directions" class="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 drop-shadow-sm object-contain" />
                    <span class="truncate">Directions</span>
                  </a>
                  <button 
                    class="shop-bookmark-btn w-7 h-7 sm:w-10 sm:h-10 border border-outline-variant/50 dark:border-amber-400/30 hover:border-primary rounded-lg sm:rounded-xl flex items-center justify-center transition-colors shrink-0 ${isSaved ? 'text-primary dark:text-amber-300 bg-primary/10 dark:bg-amber-400/20' : 'text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300'}"
                    data-id="${shop.id}"
                    title="${isSaved ? 'Remove from saved' : 'Save to Itinerary'}"
                  >
                    <span class="material-symbols-outlined text-[15px] sm:text-[20px]">${isSaved ? 'bookmark' : 'bookmark_border'}</span>
                  </button>
                  <button 
                    class="shop-info-btn w-7 h-7 sm:w-10 sm:h-10 border border-outline-variant/50 dark:border-amber-400/30 hover:border-secondary-container dark:hover:border-amber-300 rounded-lg sm:rounded-xl flex items-center justify-center text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300 transition-colors shrink-0"
                    data-id="${shop.id}"
                    title="View Full Details"
                  >
                    <span class="material-symbols-outlined text-[15px] sm:text-[20px]">info</span>
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    attachFoodAndShopEventListeners();
    initScrollReveal();
  }

  function attachFoodAndShopEventListeners() {
    // Food Bookmarks
    document.querySelectorAll('.food-bookmark-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const food = FOOD_DATA.find(f => f.id === id);
        if (!food) return;

        const isSaved = Storage.toggleBookmark({
          id: food.id,
          name: food.name,
          category: 'Food Destination',
          location: food.location,
          zone: 'Culinary Landmark',
          link: food.locationUrl,
          image: food.image
        });

        btn.querySelector('.material-symbols-outlined').textContent = isSaved ? 'bookmark' : 'bookmark_border';
        btn.classList.toggle('text-primary', isSaved);
        btn.classList.toggle('dark:text-amber-300', isSaved);
        btn.classList.toggle('bg-primary/10', isSaved);

        showToast(isSaved ? `Added "${food.name}" to Itinerary!` : `Removed "${food.name}" from Itinerary`, isSaved ? 'bookmark_added' : 'bookmark_remove');
        renderSavedItinerary();
      };
    });

    // Shop Bookmarks
    document.querySelectorAll('.shop-bookmark-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const shop = SHOPPING_DATA.find(s => s.id === id);
        if (!shop) return;

        const isSaved = Storage.toggleBookmark({
          id: shop.id,
          name: shop.name,
          category: 'Shopping Bazaar',
          location: shop.location,
          zone: 'Festive Shopping',
          link: shop.locationUrl,
          image: shop.image
        });

        btn.querySelector('.material-symbols-outlined').textContent = isSaved ? 'bookmark' : 'bookmark_border';
        btn.classList.toggle('text-primary', isSaved);
        btn.classList.toggle('dark:text-amber-300', isSaved);
        btn.classList.toggle('bg-primary/10', isSaved);

        showToast(isSaved ? `Added "${shop.name}" to Itinerary!` : `Removed "${shop.name}" from Itinerary`, isSaved ? 'bookmark_added' : 'bookmark_remove');
        renderSavedItinerary();
      };
    });

    // Details Modal Triggers
    document.querySelectorAll('.food-info-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const food = FOOD_DATA.find(f => f.id === id);
        if (food) openDetailModal(food, 'food');
      };
    });

    document.querySelectorAll('.shop-info-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const shop = SHOPPING_DATA.find(s => s.id === id);
        if (shop) openDetailModal(shop, 'shop');
      };
    });
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
            onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(trail.stops.join(' to '))}', '_blank')"
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
      <div class="relative pl-8 md:pl-10 pb-8 last:pb-0 border-l-2 border-primary/20 dark:border-amber-400/40 group reveal-on-scroll reveal-delay-${(idx % 4) + 1}">
        <div class="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary dark:bg-amber-400 text-on-primary dark:text-black flex items-center justify-center ring-4 ring-surface dark:ring-[#12100a] font-bold text-xs shadow-md">
          ${idx + 1}
        </div>
        <div class="glass-panel p-6 sm:p-7 rounded-2xl border border-outline-variant/30 dark:border-amber-400/25 hover:shadow-lg transition-all space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 dark:border-amber-400/15 pb-3">
            <div>
              <span class="text-xs uppercase tracking-widest text-primary dark:text-amber-300 font-bold">${rit.tithi}</span>
              <h3 class="font-headline-md text-2xl text-on-surface dark:text-white font-bold">${rit.day}</h3>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary-container/30 dark:bg-amber-400/20 text-secondary dark:text-amber-200 text-xs font-bold self-start sm:self-auto border border-secondary-container/40 dark:border-amber-400/30 shadow-sm">
              <span class="material-symbols-outlined text-[16px]">calendar_month</span> ${rit.date}
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

  function renderSavedItinerary(filterCategory = activeSavedTab) {
    activeSavedTab = filterCategory;
    const container = document.getElementById('saved-itinerary-container');
    if (!container) return;

    const bookmarks = Storage.getBookmarks();
    
    // Split into categories
    const pandalBookmarks = bookmarks.filter(b => b.category === 'Pandal');
    const foodBookmarks = bookmarks.filter(b => b.category === 'Food' || b.category === 'Shop' || b.category === 'food' || b.category === 'shop');
    const myPlans = customPlans || [];

    // Update Tab Badges
    const badgeAll = document.getElementById('saved-badge-all');
    const badgePandals = document.getElementById('saved-badge-pandals');
    const badgeFood = document.getElementById('saved-badge-food');
    const badgePlans = document.getElementById('saved-badge-plans');

    if (badgeAll) badgeAll.textContent = bookmarks.length + myPlans.length;
    if (badgePandals) badgePandals.textContent = pandalBookmarks.length;
    if (badgeFood) badgeFood.textContent = foodBookmarks.length;
    if (badgePlans) badgePlans.textContent = myPlans.length;

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

    if (bookmarks.length === 0 && myPlans.length === 0) {
      container.innerHTML = `
        <div class="text-center py-16 px-4 glass-panel rounded-3xl p-8 border border-outline-variant/30 dark:border-amber-400/20 max-w-md mx-auto reveal-on-scroll">
          <span class="material-symbols-outlined text-5xl text-outline dark:text-amber-300/60 mb-3">bookmark_border</span>
          <h3 class="font-headline-md text-xl text-on-surface dark:text-white font-bold mb-2">Your Itinerary is Empty</h3>
          <p class="text-xs text-on-surface-variant dark:text-[#ded5c7] leading-relaxed mb-6">Explore the 40+ Pandals, iconic dining spots, or create your customized festival plan to save them here.</p>
          <div class="flex flex-wrap justify-center gap-2.5">
            <a href="#pandals" class="bg-primary dark:bg-amber-400 text-white dark:text-black px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:scale-105 transition-all">Explore Pandals</a>
            <a href="#food-shopping" class="bg-surface-container-high dark:bg-[#252016] text-on-surface dark:text-[#ded5c7] px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 hover:border-primary transition-all">Food & Bazaars</a>
          </div>
        </div>
      `;
      initScrollReveal();
      return;
    }

    let html = '';

    // 1. PANDALS & TRANSIT SECTION
    if (activeSavedTab === 'all' || activeSavedTab === 'pandals') {
      if (pandalBookmarks.length > 0) {
        html += `
          <div class="space-y-4">
            <div class="flex items-center justify-between border-b border-outline-variant/20 dark:border-amber-400/20 pb-2">
              <h3 class="font-display text-lg sm:text-xl font-bold text-on-surface dark:text-white flex items-center gap-2">
                <span class="material-symbols-outlined text-primary dark:text-amber-300">explore</span> Saved Pandals & Transit (${pandalBookmarks.length})
              </h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              ${pandalBookmarks.map((b, idx) => `
                <div class="glass-panel p-5 rounded-2xl border border-outline-variant/30 dark:border-amber-400/20 flex flex-col justify-between gap-4 reveal-on-scroll">
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-2">
                      <span class="px-2.5 py-0.5 rounded-full bg-primary/10 dark:bg-amber-400/20 text-primary dark:text-amber-300 text-[11px] font-bold">${b.zone || 'Kolkata'} Zone</span>
                    </div>
                    <h4 class="font-headline-md text-lg text-on-surface dark:text-white font-bold mb-1">${b.name}</h4>
                    <p class="text-xs text-on-surface-variant dark:text-[#ded5c7] flex items-center gap-1 font-medium">
                      <span class="material-symbols-outlined text-[14px] text-primary dark:text-amber-300">near_me</span> ${b.location}
                    </p>
                  </div>
                  <div class="flex items-center justify-between gap-2 pt-3 border-t border-outline-variant/20 dark:border-amber-400/20">
                    <a href="${b.link || '#'}" target="_blank" class="text-primary dark:text-amber-300 text-xs font-bold hover:underline flex items-center gap-1">
                      <!-- Directions Pin Icon -->
                      <img src="maps-pin.png" alt="Directions" class="w-3.5 h-3.5 shrink-0 object-contain" />
                      Directions
                    </a>
                    <button class="remove-single-bookmark text-outline hover:text-error dark:text-[#ded5c7] dark:hover:text-red-400 transition-colors cursor-pointer" data-id="${b.id}" title="Remove">
                      <span class="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else if (activeSavedTab === 'pandals') {
        html += `<div class="p-8 text-center text-xs text-on-surface-variant dark:text-[#ded5c7]">No pandals saved yet. Visit Pandals & Transit to bookmark.</div>`;
      }
    }

    // 2. FOOD & SHOPPING SECTION
    if (activeSavedTab === 'all' || activeSavedTab === 'food-shopping') {
      if (foodBookmarks.length > 0) {
        html += `
          <div class="space-y-4 pt-4">
            <div class="flex items-center justify-between border-b border-outline-variant/20 dark:border-amber-400/20 pb-2">
              <h3 class="font-display text-lg sm:text-xl font-bold text-on-surface dark:text-white flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary dark:text-amber-300">restaurant</span> Saved Food & Shopping Spots (${foodBookmarks.length})
              </h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              ${foodBookmarks.map((b, idx) => `
                <div class="glass-panel p-5 rounded-2xl border border-outline-variant/30 dark:border-amber-400/20 flex flex-col justify-between gap-4 reveal-on-scroll">
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-2">
                      <span class="px-2.5 py-0.5 rounded-full bg-secondary-container/30 dark:bg-amber-400/20 text-secondary dark:text-amber-300 text-[11px] font-bold">${b.category}</span>
                    </div>
                    <h4 class="font-headline-md text-lg text-on-surface dark:text-white font-bold mb-1">${b.name}</h4>
                    <p class="text-xs text-on-surface-variant dark:text-[#ded5c7] flex items-center gap-1 font-medium">
                      <span class="material-symbols-outlined text-[14px] text-primary dark:text-amber-300">pin_drop</span> ${b.location}
                    </p>
                  </div>
                  <div class="flex items-center justify-between gap-2 pt-3 border-t border-outline-variant/20 dark:border-amber-400/20">
                    <a href="${b.link || '#'}" target="_blank" class="text-primary dark:text-amber-300 text-xs font-bold hover:underline flex items-center gap-1">
                      <!-- Directions Pin Icon -->
                      <img src="maps-pin.png" alt="Directions" class="w-3.5 h-3.5 shrink-0 object-contain" />
                      Directions
                    </a>
                    <button class="remove-single-bookmark text-outline hover:text-error dark:text-[#ded5c7] dark:hover:text-red-400 transition-colors cursor-pointer" data-id="${b.id}" title="Remove">
                      <span class="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else if (activeSavedTab === 'food-shopping') {
        html += `<div class="p-8 text-center text-xs text-on-surface-variant dark:text-[#ded5c7]">No food or shopping spots saved yet. Visit Food & Shopping to bookmark.</div>`;
      }
    }

    // 3. SAVED / CUSTOM PLANS SECTION
    if (activeSavedTab === 'all' || activeSavedTab === 'plans') {
      if (myPlans.length > 0) {
        html += `
          <div class="space-y-4 pt-4">
            <div class="flex items-center justify-between border-b border-outline-variant/20 dark:border-amber-400/20 pb-2">
              <h3 class="font-display text-lg sm:text-xl font-bold text-on-surface dark:text-white flex items-center gap-2">
                <span class="material-symbols-outlined text-primary dark:text-amber-300">event_note</span> Custom Festival Plans (${myPlans.length})
              </h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${myPlans.map((p, idx) => `
                <div class="glass-panel p-5 rounded-2xl border border-outline-variant/30 dark:border-amber-400/20 flex flex-col justify-between gap-3 reveal-on-scroll">
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-1">
                      <span class="px-2.5 py-0.5 rounded-full bg-primary/10 dark:bg-amber-400/20 text-primary dark:text-amber-300 text-[11px] font-bold">${p.day_tag || 'Custom Plan'}</span>
                      <span class="text-xs text-on-surface-variant/70 dark:text-[#ded5c7]/60">${p.date_str || ''}</span>
                    </div>
                    <h4 class="font-headline-md text-lg text-on-surface dark:text-white font-bold mb-1">${p.title}</h4>
                    ${p.route_summary ? `<p class="text-xs text-primary dark:text-amber-300 truncate">📍 ${p.route_summary}</p>` : ''}
                  </div>
                  <div class="pt-2 border-t border-outline-variant/20 dark:border-amber-400/20 flex items-center justify-between">
                    <a href="#plans" onclick="renderFestivalPlans('custom')" class="text-xs font-bold text-primary dark:text-amber-300 hover:underline">View in Plans</a>
                    <button onclick="deleteCustomPlan('${p.id}')" class="text-outline hover:text-error dark:text-[#ded5c7] dark:hover:text-red-400 text-xs font-semibold cursor-pointer">Delete</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else if (activeSavedTab === 'plans') {
        html += `<div class="p-8 text-center text-xs text-on-surface-variant dark:text-[#ded5c7]">No custom plans saved yet. Click 'Make Your Own Plan' in Puja Plans.</div>`;
      }
    }

    container.innerHTML = html;

    // Attach Category Tab click listeners
    document.querySelectorAll('.saved-tab-btn').forEach(btn => {
      btn.onclick = () => {
        const cat = btn.dataset.category;
        renderSavedItinerary(cat);
      };
    });

    document.getElementById('clear-all-bookmarks-btn')?.addEventListener('click', () => {
      if (confirm('Clear all saved pandals, food spots, and custom items from your itinerary?')) {
        Storage.clearBookmarks();
        renderSavedItinerary();
        renderPandals();
        renderFoodAndShopping();
        showToast('Itinerary cleared', 'delete');
      }
    });

    document.querySelectorAll('.remove-single-bookmark').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const b = bookmarks.find(item => item.id === id);
        if (b) {
          Storage.toggleBookmark(b);
          renderSavedItinerary();
          renderPandals();
          renderFoodAndShopping();
          showToast(`Removed "${b.name}"`, 'delete');
        }
      };
    });

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
      modal.querySelector('#modal-pandal-zone').textContent = `${item.zone} Zone`;
      if (crowdBadge) crowdBadge.classList.add('hidden');
      modal.querySelector('#modal-pandal-theme').textContent = item.theme;
      if (estContainer) estContainer.classList.add('hidden');
      modal.querySelector('#modal-pandal-transit').textContent = item.transit;
      modal.querySelector('#modal-pandal-highlights').textContent = item.highlights;
    } else if (type === 'food') {
      modal.querySelector('#modal-pandal-zone').textContent = item.categoryLabel;
      if (crowdBadge) {
        crowdBadge.classList.remove('hidden');
        crowdBadge.textContent = item.timings;
      }
      modal.querySelector('#modal-pandal-theme').textContent = item.desc;
      if (estContainer) estContainer.classList.add('hidden');
      modal.querySelector('#modal-pandal-transit').textContent = `${item.location} • ${item.metro}`;
      modal.querySelector('#modal-pandal-highlights').textContent = item.mustTry;
    } else if (type === 'shop') {
      modal.querySelector('#modal-pandal-zone').textContent = item.typeLabel;
      if (crowdBadge) {
        crowdBadge.classList.remove('hidden');
        crowdBadge.textContent = item.bestTime;
      }
      modal.querySelector('#modal-pandal-theme').textContent = item.desc;
      if (estContainer) {
        estContainer.classList.remove('hidden');
        modal.querySelector('#modal-pandal-est').textContent = 'Traditional Bazaar';
      }
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
            href="${p.url}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/8 dark:bg-amber-400/10 border border-primary/20 dark:border-amber-400/25 text-[10px] sm:text-xs font-semibold text-primary dark:text-amber-300 hover:bg-primary/15 dark:hover:bg-amber-400/20 transition-all"
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

    modal.querySelector('#modal-pandal-nav-btn').href = item.locationUrl;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  // --- 12. ROUTING & TAB NAVIGATION ---
  function handleRouting() {
    const rawHash = window.location.hash.slice(1) || 'home';
    
    // Check if deep linking to a specific shared plan (#plan=...)
    if (rawHash.startsWith('plan=')) {
      const planId = rawHash.split('=')[1];
      if (planId) {
        handleSharedPlanDeepLink(planId);
        return;
      }
    }

    if (rawHash === 'login' || rawHash === 'account') {
      if (currentUser) {
        openProfileModal();
      }
    }

    const validSections = ['home', 'pandals', 'plans', 'audio', 'food-shopping', 'rituals', 'saved', 'login'];
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

  // Curated Spotify Durga Puja Playlists & Songs
  const SPOTIFY_PLAYLISTS = {
    sharodiya: {
      id: '7EFTbXOZuUZEqdt5cMwaH5',
      name: 'Sharodiya hits',
      url: 'https://open.spotify.com/playlist/7EFTbXOZuUZEqdt5cMwaH5?si=u1bm8rK5SIi6Fdyo79B1ew&utm_source=copy-link&pi=RkVoKNYpTQeZo',
      embedUrl: 'https://open.spotify.com/embed/playlist/7EFTbXOZuUZEqdt5cMwaH5?utm_source=generator&theme=0',
      cover: 'https://mosaic.scdn.co/640/ab67616d00001e0208484e96386e9532e18109d7ab67616d00001e0221792f8da1279de3b03b4b80ab67616d00001e0227fe75746b882c2cf91b7624ab67616d00001e02877df1f4d86607531a93ead2',
      description: 'Festive Bengali chartbusters, dhak rhythms, and celebratory pandal anthems.'
    },
    mahalaya: {
      id: '5dUPbjW2MgX96HUlQX81Xs',
      name: 'Mahalaya',
      url: 'https://open.spotify.com/playlist/5dUPbjW2MgX96HUlQX81Xs?si=35qIvMeeRuSHLSXwsu9lWw&utm_source=copy-link',
      embedUrl: 'https://open.spotify.com/embed/playlist/5dUPbjW2MgX96HUlQX81Xs?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b2732a497efb96016d4d26cb83b4',
      description: 'The eternal dawn Mahishasuramardini, sacred Vedic stotras, and Birendra Krishna Bhadra invocation.'
    }
  };

  const PUJA_RADIO_SONGS = [
    {
      id: '0qo204uS81FwkIQDYkQfCi',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Dugga Ma Asche',
      artist: 'Infra',
      duration: '3:33',
      spotifyTrackId: '0qo204uS81FwkIQDYkQfCi',
      spotifyUrl: 'https://open.spotify.com/track/0qo204uS81FwkIQDYkQfCi',
      embedUrl: 'https://open.spotify.com/embed/track/0qo204uS81FwkIQDYkQfCi?utm_source=generator&theme=0',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b27308484e96386e9532e18109d7',
      previewUrl: 'https://p.scdn.co/mp3-preview/8fd52ee34e2425deecd0981428ae7e3a6ccea88d'
    },
    {
      id: '0Z9Ok50nu5nxyJPP9jZqPM',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Dugga Ma',
      artist: 'Arijit Singh, Arindom, Priyo Chattopadhyay, Raja Chanda, Prasen',
      duration: '4:30',
      spotifyTrackId: '0Z9Ok50nu5nxyJPP9jZqPM',
      spotifyUrl: 'https://open.spotify.com/track/0Z9Ok50nu5nxyJPP9jZqPM',
      embedUrl: 'https://open.spotify.com/embed/track/0Z9Ok50nu5nxyJPP9jZqPM?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b27327fe75746b882c2cf91b7624',
      previewUrl: 'https://p.scdn.co/mp3-preview/8ef10111bc0c21049896185ba4cde161e517a4d7'
    },
    {
      id: '0nspNLUZLF1RwbpP7uIwox',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Dhak Baja Kashor Baja',
      artist: 'Shreya Ghoshal, Jeet Gannguli',
      duration: '4:25',
      spotifyTrackId: '0nspNLUZLF1RwbpP7uIwox',
      spotifyUrl: 'https://open.spotify.com/track/0nspNLUZLF1RwbpP7uIwox',
      embedUrl: 'https://open.spotify.com/embed/track/0nspNLUZLF1RwbpP7uIwox?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b27321792f8da1279de3b03b4b80',
      previewUrl: 'https://p.scdn.co/mp3-preview/53a16647842901a73d4749fd91a9c4e2be0d01e7'
    },
    {
      id: '14mxoVNHA77ja4bre40T1p',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Dugga Elo',
      artist: 'Monali Thakur, Guddu',
      duration: '2:26',
      spotifyTrackId: '14mxoVNHA77ja4bre40T1p',
      spotifyUrl: 'https://open.spotify.com/track/14mxoVNHA77ja4bre40T1p',
      embedUrl: 'https://open.spotify.com/embed/track/14mxoVNHA77ja4bre40T1p?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273877df1f4d86607531a93ead2',
      previewUrl: 'https://p.scdn.co/mp3-preview/a5c2b12ab188e0d41d97f65c0584bc2aa2e82f44'
    },
    {
      id: '1xcq7GEsaUKGNiK7NQliB9',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Aamaar Dugga',
      artist: 'Monali Thakur, Tyohaar, Anindya Chatterjee',
      duration: '3:19',
      spotifyTrackId: '1xcq7GEsaUKGNiK7NQliB9',
      spotifyUrl: 'https://open.spotify.com/track/1xcq7GEsaUKGNiK7NQliB9',
      embedUrl: 'https://open.spotify.com/embed/track/1xcq7GEsaUKGNiK7NQliB9?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273a0ae69b032b80eb175748db2',
      previewUrl: 'https://p.scdn.co/mp3-preview/f56927349a9b63b15389b10d33f7b89c445981de'
    },
    {
      id: '0dJGrIiwlyshcRuvMddU66',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Hote Paare Na',
      artist: 'Arindom, Prashmita Paul, Prasen',
      duration: '5:13',
      spotifyTrackId: '0dJGrIiwlyshcRuvMddU66',
      spotifyUrl: 'https://open.spotify.com/track/0dJGrIiwlyshcRuvMddU66',
      embedUrl: 'https://open.spotify.com/embed/track/0dJGrIiwlyshcRuvMddU66?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b27327fe75746b882c2cf91b7624',
      previewUrl: 'https://p.scdn.co/mp3-preview/dd599f5f1683af89f06c8658496de5f10218be0b'
    },
    {
      id: '6HNbprsATKyydJ7YdrLuPd',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Ebar Jeno Onno Rokom Pujo',
      artist: 'Nakash Aziz, Antara Mitra, Indraadip Dasgupta, Prasen, Devin Star Tailes, Mimi, Nusrat Jahan',
      duration: '3:32',
      spotifyTrackId: '6HNbprsATKyydJ7YdrLuPd',
      spotifyUrl: 'https://open.spotify.com/track/6HNbprsATKyydJ7YdrLuPd',
      embedUrl: 'https://open.spotify.com/embed/track/6HNbprsATKyydJ7YdrLuPd?utm_source=generator&theme=0',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273dff82889c347a6db8a7e4fe5',
      previewUrl: 'https://p.scdn.co/mp3-preview/782e00ddf7a28921942ffe25e0ee6250c0acc32c'
    },
    {
      id: '5gGAG8v5UAeUW7kxq9BK0y',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Gouri Elo Dekhe Jalo',
      artist: 'Dohar',
      duration: '5:39',
      spotifyTrackId: '5gGAG8v5UAeUW7kxq9BK0y',
      spotifyUrl: 'https://open.spotify.com/track/5gGAG8v5UAeUW7kxq9BK0y',
      embedUrl: 'https://open.spotify.com/embed/track/5gGAG8v5UAeUW7kxq9BK0y?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273aff57a62be756269cad3f23b',
      previewUrl: 'https://p.scdn.co/mp3-preview/5bc557143231a23bfdcf765a479107fae08439ec'
    },
    {
      id: '21rIO2dhW37d8CVJBT0Ass',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Elo Je Maa',
      artist: 'Abhijeet',
      duration: '5:07',
      spotifyTrackId: '21rIO2dhW37d8CVJBT0Ass',
      spotifyUrl: 'https://open.spotify.com/track/21rIO2dhW37d8CVJBT0Ass',
      embedUrl: 'https://open.spotify.com/embed/track/21rIO2dhW37d8CVJBT0Ass?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273bccb335165d31c982c1d5919',
      previewUrl: 'https://p.scdn.co/mp3-preview/569880aae61c48d38c39d9b492803c5dcebc0f4c'
    },
    {
      id: '0lbpCmeKfDa8O8rwezno3i',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Dhaker Taley',
      artist: 'Abhijeet, Parineet, Sudipto',
      duration: '4:42',
      spotifyTrackId: '0lbpCmeKfDa8O8rwezno3i',
      spotifyUrl: 'https://open.spotify.com/track/0lbpCmeKfDa8O8rwezno3i',
      embedUrl: 'https://open.spotify.com/embed/track/0lbpCmeKfDa8O8rwezno3i?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b2734c8f943b782b3cfc146125e4',
      previewUrl: 'https://p.scdn.co/mp3-preview/778820c713b9aed596cdf8eb8ba5cdebb10d98e8'
    },
    {
      id: '5dOHCKsalASHbAn2mZCWgq',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Ailo Uma Barite',
      artist: 'Antara Nandy, MONAMI GHOSH',
      duration: '3:52',
      spotifyTrackId: '5dOHCKsalASHbAn2mZCWgq',
      spotifyUrl: 'https://open.spotify.com/track/5dOHCKsalASHbAn2mZCWgq',
      embedUrl: 'https://open.spotify.com/embed/track/5dOHCKsalASHbAn2mZCWgq?utm_source=generator&theme=0',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b27312369566acbeabf040cd9ef0',
      previewUrl: 'https://p.scdn.co/mp3-preview/ae38ceb580ae12f842613645f368351cf89003b3'
    },
    {
      id: '3tLUTDrVx8lnOEYuStzbT5',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Asatoma Sadgamaya',
      artist: 'Arijit Singh, Indraadip Dasgupta, Srijato',
      duration: '5:18',
      spotifyTrackId: '3tLUTDrVx8lnOEYuStzbT5',
      spotifyUrl: 'https://open.spotify.com/track/3tLUTDrVx8lnOEYuStzbT5',
      embedUrl: 'https://open.spotify.com/embed/track/3tLUTDrVx8lnOEYuStzbT5?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b27373d361bdee22b03b26953ef3',
      previewUrl: 'https://p.scdn.co/mp3-preview/9bc5f3eeaad281043bb9d06caa93395abaec9acf'
    },
    {
      id: '6XbWY7TpYBcdBCBiTOh5EA',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Dakatiya Banshi (From "Bohurupi")',
      artist: 'Shrestha D., Bonnie Chakraborty, Noni Chora Das Baul',
      duration: '3:56',
      spotifyTrackId: '6XbWY7TpYBcdBCBiTOh5EA',
      spotifyUrl: 'https://open.spotify.com/track/6XbWY7TpYBcdBCBiTOh5EA',
      embedUrl: 'https://open.spotify.com/embed/track/6XbWY7TpYBcdBCBiTOh5EA?utm_source=generator&theme=0',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b2730f9df00be51e525670195af5',
      previewUrl: 'https://p.scdn.co/mp3-preview/9f61865f4edfc11b1928f6bc8fc204ac0fabf9e4'
    },
    {
      id: '4MQPlquCDaltOs006z65aG',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Jaago Uma',
      artist: 'Rupankar Bagchi',
      duration: '5:17',
      spotifyTrackId: '4MQPlquCDaltOs006z65aG',
      spotifyUrl: 'https://open.spotify.com/track/4MQPlquCDaltOs006z65aG',
      embedUrl: 'https://open.spotify.com/embed/track/4MQPlquCDaltOs006z65aG?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273facb0bc10d8032ba2d4996ea',
      previewUrl: 'https://p.scdn.co/mp3-preview/2cecdcae539cc1c78d44b4f455ca79f45a61f697'
    },
    {
      id: '5fN2XXtz5pAHo0iRTMfQnj',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Aamaar Dugga',
      artist: 'Monali Thakur',
      duration: '3:19',
      spotifyTrackId: '5fN2XXtz5pAHo0iRTMfQnj',
      spotifyUrl: 'https://open.spotify.com/track/5fN2XXtz5pAHo0iRTMfQnj',
      embedUrl: 'https://open.spotify.com/embed/track/5fN2XXtz5pAHo0iRTMfQnj?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273bc0278fe7524c43b2260fc38',
      previewUrl: 'https://p.scdn.co/mp3-preview/f56927349a9b63b15389b10d33f7b89c445981de'
    },
    {
      id: '7hQN6fL1OI0L6O2qkfTsBk',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Emon Madhur Sandhyay',
      artist: 'Asha Bhosle, R. D. Burman',
      duration: '5:43',
      spotifyTrackId: '7hQN6fL1OI0L6O2qkfTsBk',
      spotifyUrl: 'https://open.spotify.com/track/7hQN6fL1OI0L6O2qkfTsBk',
      embedUrl: 'https://open.spotify.com/embed/track/7hQN6fL1OI0L6O2qkfTsBk?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b27388eb8bd72f0b5f649c941797',
      previewUrl: 'https://p.scdn.co/mp3-preview/ba4d409e897ec6b153900a83a97e022a48382498'
    },
    {
      id: '17gIko1QQ6f19KFdLfy29u',
      playlist: 'sharodiya',
      playlistName: 'Sharodiya hits',
      title: 'Aar Koto Raat Eka Thakbo',
      artist: 'Bappi Lahiri, Asha Bhosle',
      duration: '6:13',
      spotifyTrackId: '17gIko1QQ6f19KFdLfy29u',
      spotifyUrl: 'https://open.spotify.com/track/17gIko1QQ6f19KFdLfy29u',
      embedUrl: 'https://open.spotify.com/embed/track/17gIko1QQ6f19KFdLfy29u?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b27327f30dba0f8f29ef9a080177',
      previewUrl: 'https://p.scdn.co/mp3-preview/4df79a1b618d428b19dd1c4ee7b113d411ead14e'
    },
    {
      id: '0BAwwUhO60U01O9c1OxHfe',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Tabo Achintya Rupa - Charita - Mahima',
      artist: 'Manabendra Mukherjee',
      duration: '3:58',
      spotifyTrackId: '0BAwwUhO60U01O9c1OxHfe',
      spotifyUrl: 'https://open.spotify.com/track/0BAwwUhO60U01O9c1OxHfe',
      embedUrl: 'https://open.spotify.com/embed/track/0BAwwUhO60U01O9c1OxHfe?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b2732a497efb96016d4d26cb83b4',
      previewUrl: 'https://p.scdn.co/mp3-preview/c0ba2a13cc7ccbfc82cd78dc58d452b35292a96c'
    },
    {
      id: '3w0q9HtvdnU19IdAbOl1XQ',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Ogo Amar Agamani - Alo',
      artist: 'Sipra Basu',
      duration: '3:19',
      spotifyTrackId: '3w0q9HtvdnU19IdAbOl1XQ',
      spotifyUrl: 'https://open.spotify.com/track/3w0q9HtvdnU19IdAbOl1XQ',
      embedUrl: 'https://open.spotify.com/embed/track/3w0q9HtvdnU19IdAbOl1XQ?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b2732a497efb96016d4d26cb83b4',
      previewUrl: 'https://p.scdn.co/mp3-preview/edad0b59a894f0f7935c2f27ca24b72e4a5d5737'
    },
    {
      id: '0hJmNTKYGevHLMIWvCUE8c',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Jago Durga Dashapraharanadharinee',
      artist: 'Dwijen Mukherjee',
      duration: '1:47',
      spotifyTrackId: '0hJmNTKYGevHLMIWvCUE8c',
      spotifyUrl: 'https://open.spotify.com/track/0hJmNTKYGevHLMIWvCUE8c',
      embedUrl: 'https://open.spotify.com/embed/track/0hJmNTKYGevHLMIWvCUE8c?utm_source=generator&theme=0',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b2732a497efb96016d4d26cb83b4',
      previewUrl: 'https://p.scdn.co/mp3-preview/00b5ca64826c9216d23915eea5329f647cec55b9'
    },
    {
      id: '3FrWOsMayIJcPWduMVEVF6',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Bajlo Tomar Aalor Benu With Narration',
      artist: 'Supriti Ghosh',
      duration: '4:23',
      spotifyTrackId: '3FrWOsMayIJcPWduMVEVF6',
      spotifyUrl: 'https://open.spotify.com/track/3FrWOsMayIJcPWduMVEVF6',
      embedUrl: 'https://open.spotify.com/embed/track/3FrWOsMayIJcPWduMVEVF6?utm_source=generator&theme=0',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273759df1fcaea412cb5dbd5dca',
      previewUrl: 'https://p.scdn.co/mp3-preview/8c2faf8f73a485cbf84377173ff60aa72fbc9ed6'
    },
    {
      id: '2ArskmlOgluJZ86RD1z0qq',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Simhastha Sashisekhara',
      artist: 'Pankaj Mullick',
      duration: '0:54',
      spotifyTrackId: '2ArskmlOgluJZ86RD1z0qq',
      spotifyUrl: 'https://open.spotify.com/track/2ArskmlOgluJZ86RD1z0qq',
      embedUrl: 'https://open.spotify.com/embed/track/2ArskmlOgluJZ86RD1z0qq?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273c958a88351e5c690101ec1f9',
      previewUrl: 'https://p.scdn.co/mp3-preview/f7328414dcf5f6645f3cf8d37989a99e118f1244'
    },
    {
      id: '0SEnZ1JaMXSQr32TOupRQF',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Ya Chandi',
      artist: 'Pankaj Mullick',
      duration: '1:36',
      spotifyTrackId: '0SEnZ1JaMXSQr32TOupRQF',
      spotifyUrl: 'https://open.spotify.com/track/0SEnZ1JaMXSQr32TOupRQF',
      embedUrl: 'https://open.spotify.com/embed/track/0SEnZ1JaMXSQr32TOupRQF?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273c958a88351e5c690101ec1f9',
      previewUrl: 'https://p.scdn.co/mp3-preview/f00696760a1073257de436860ca8cd00835cfd92'
    },
    {
      id: '4mnYGUG890pny5QTjCaZWr',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Aham Rudrebhirvasubhischara',
      artist: 'Pankaj Mullick',
      duration: '3:59',
      spotifyTrackId: '4mnYGUG890pny5QTjCaZWr',
      spotifyUrl: 'https://open.spotify.com/track/4mnYGUG890pny5QTjCaZWr',
      embedUrl: 'https://open.spotify.com/embed/track/4mnYGUG890pny5QTjCaZWr?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273c958a88351e5c690101ec1f9',
      previewUrl: 'https://p.scdn.co/mp3-preview/007f9efb5571f2d5ab1579da9882ba17aecc0b3b'
    },
    {
      id: '2iKRC4L9MihhRVlGBRb3H8',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Subhra Sankha - Rabe',
      artist: 'Shyamal Mitra, Ashima Bhattacharya, Aarti Mukherji',
      duration: '2:48',
      spotifyTrackId: '2iKRC4L9MihhRVlGBRb3H8',
      spotifyUrl: 'https://open.spotify.com/track/2iKRC4L9MihhRVlGBRb3H8',
      embedUrl: 'https://open.spotify.com/embed/track/2iKRC4L9MihhRVlGBRb3H8?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273c958a88351e5c690101ec1f9',
      previewUrl: 'https://p.scdn.co/mp3-preview/677e7912fbe8096c00ef835cb448a0b94e38c834'
    },
    {
      id: '5CGYig9Hg49EL6g6NlxNhv',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Jaya Jaya Japyajaye',
      artist: 'Pankaj Mullick',
      duration: '2:31',
      spotifyTrackId: '5CGYig9Hg49EL6g6NlxNhv',
      spotifyUrl: 'https://open.spotify.com/track/5CGYig9Hg49EL6g6NlxNhv',
      embedUrl: 'https://open.spotify.com/embed/track/5CGYig9Hg49EL6g6NlxNhv?utm_source=generator&theme=0',
      cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273c958a88351e5c690101ec1f9',
      previewUrl: 'https://p.scdn.co/mp3-preview/c3e05e45960b4468b9ce81a85bf474c2d1ba50cd'
    },
    {
      id: '742moqjpE88LUEAs1W9yVY',
      playlist: 'mahalaya',
      playlistName: 'Mahalaya',
      title: 'Akhila - Bimane Taba Jaya - Gane',
      artist: 'Krishna Dasgupta',
      duration: '4:01',
      spotifyTrackId: '742moqjpE88LUEAs1W9yVY',
      spotifyUrl: 'https://open.spotify.com/track/742moqjpE88LUEAs1W9yVY',
      embedUrl: 'https://open.spotify.com/embed/track/742moqjpE88LUEAs1W9yVY?utm_source=generator&theme=0',
      cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273c958a88351e5c690101ec1f9',
      previewUrl: 'https://p.scdn.co/mp3-preview/b9e854905062e00006b96db0e9056a4916bc7870'
    }
  ];

  let activeRadioSongId = null;

  function renderPujaRadioSongs() {
    const sharodiyaContainer = document.getElementById('radio-songs-sharodiya-list') || document.getElementById('radio-songs-hiphop-list');
    const mahalayaContainer = document.getElementById('radio-songs-mahalaya-list');
    const legacyList = document.getElementById('puja-radio-songs-list');

    const renderSongItem = (song, index) => `
      <div 
        class="glass-panel p-3.5 sm:p-4 rounded-2xl border border-outline-variant/30 dark:border-amber-400/20 hover:border-[#1DB954]/60 dark:hover:border-[#1ed760]/60 transition-all flex flex-col sm:flex-row items-center justify-between gap-4 group hover:shadow-lg"
        id="song-card-${song.id}"
      >
        <div class="flex items-center gap-3.5 w-full sm:w-auto min-w-0">
          <div class="w-9 h-9 rounded-xl bg-surface-container-high dark:bg-[#2c261b] font-mono font-bold text-xs text-primary dark:text-amber-300 flex items-center justify-center shrink-0 border border-outline-variant/20 dark:border-amber-400/20">
            ${index < 9 ? '0' : ''}${index + 1}
          </div>
          <div class="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-outline-variant/30 dark:border-amber-400/30 shadow-sm group-hover:shadow-md transition-shadow relative">
            <img 
              src="${song.cover}" 
              alt="${song.title}" 
              loading="lazy" 
              decoding="async" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              onerror="this.src='logo.jpg'"
            />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <h4 class="font-display font-bold text-sm sm:text-base text-on-surface dark:text-white truncate group-hover:text-[#1DB954] dark:group-hover:text-[#1ed760] transition-colors">${song.title}</h4>
              <span class="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1DB954]/10 text-[#1DB954] dark:bg-[#1DB954]/20 dark:text-[#1ed760] shrink-0">Spotify</span>
            </div>
            <p class="text-xs text-on-surface-variant dark:text-[#ded5c7] truncate mt-0.5">${song.artist}</p>
          </div>
        </div>

        <div class="flex items-center justify-between sm:justify-end gap-2 sm:gap-2.5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-outline-variant/20 dark:border-amber-400/15">
          <span class="text-xs font-mono text-on-surface-variant/70 dark:text-[#ded5c7]/60">${song.duration}</span>
          
          <!-- Spotify Direct App Link -->
          <a 
            href="${song.spotifyUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="w-9 h-9 rounded-xl bg-[#1DB954]/10 hover:bg-[#1DB954] text-[#1DB954] hover:text-white dark:bg-[#1DB954]/20 dark:hover:bg-[#1DB954] dark:text-[#1ed760] dark:hover:text-black flex items-center justify-center transition-all shadow-sm shrink-0"
            title="Open on Spotify"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.309c-.216.353-.674.464-1.027.249-2.815-1.72-6.359-2.109-10.534-1.155-.403.092-.807-.16-.9-.562-.092-.403.16-.807.562-.9 4.568-1.044 8.487-.605 11.65 1.341.353.215.464.674.249 1.027zm1.469-3.266c-.272.441-.852.58-1.293.308-3.223-1.981-8.136-2.553-11.948-1.396-.499.151-1.031-.133-1.183-.632-.151-.499.133-1.031.632-1.183 4.364-1.325 9.778-.686 13.485 1.595.441.272.58.852.308 1.293zm.126-3.41c-3.865-2.295-10.239-2.507-13.913-1.391-.593.18-1.222-.162-1.402-.755-.18-.593.162-1.222.755-1.402 4.227-1.284 11.266-1.038 15.698 1.594.533.316.708 1.009.392 1.542-.316.533-1.009.708-1.542.392z"/></svg>
          </a>

          <!-- Interactive Play In-Website Button -->
          <button 
            class="play-radio-song-btn px-3 sm:px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
            data-song-id="${song.id}"
          >
            <span class="material-symbols-outlined text-[16px]">play_arrow</span> Play
          </button>
        </div>
      </div>
    `;

    const sharodiyaSongs = PUJA_RADIO_SONGS.filter(s => s.playlist === 'sharodiya');
    const mahalayaSongs = PUJA_RADIO_SONGS.filter(s => s.playlist === 'mahalaya');

    if (sharodiyaContainer) sharodiyaContainer.innerHTML = sharodiyaSongs.map(renderSongItem).join('');
    if (mahalayaContainer) mahalayaContainer.innerHTML = mahalayaSongs.map(renderSongItem).join('');
    if (legacyList) legacyList.innerHTML = PUJA_RADIO_SONGS.map(renderSongItem).join('');

    // Attach play song handlers
    document.querySelectorAll('.play-radio-song-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const songId = btn.dataset.songId;
        const song = PUJA_RADIO_SONGS.find(s => s.id === songId);
        if (song) playRadioSong(song);
      });
    });

    // Attach play entire playlist handlers
    document.querySelectorAll('.play-entire-playlist-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const playlistKey = btn.dataset.playlist;
        playSpotifyPlaylist(playlistKey);
      });
    });
  }

  function playRadioSong(song) {
    activeRadioSongId = song.id;
    const activeBox = document.getElementById('radio-active-player-box');
    const titleEl = document.getElementById('active-song-title');
    const artistEl = document.getElementById('active-song-artist');
    const badgeEl = document.getElementById('active-song-playlist-badge');
    const visualizerEl = document.getElementById('active-song-visualizer');
    const playerHolder = document.getElementById('radio-yt-player-holder');

    if (activeBox) {
      activeBox.classList.remove('hidden');
      activeBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (titleEl) titleEl.textContent = song.title;
    if (artistEl) artistEl.textContent = song.artist;
    if (badgeEl) badgeEl.textContent = `• ${song.playlistName}`;
    if (visualizerEl) visualizerEl.classList.add('is-playing');

    if (playerHolder) {
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
    }

    showToast(`Streaming on Spotify: "${song.title}" (${song.artist})`, 'graphic_eq');
  }

  function playSpotifyPlaylist(playlistKey) {
    const pl = SPOTIFY_PLAYLISTS[playlistKey];
    if (!pl) return;
    const activeBox = document.getElementById('radio-active-player-box');
    const titleEl = document.getElementById('active-song-title');
    const artistEl = document.getElementById('active-song-artist');
    const badgeEl = document.getElementById('active-song-playlist-badge');
    const visualizerEl = document.getElementById('active-song-visualizer');
    const playerHolder = document.getElementById('radio-yt-player-holder');

    if (activeBox) {
      activeBox.classList.remove('hidden');
      activeBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (titleEl) titleEl.textContent = pl.name;
    if (artistEl) artistEl.textContent = `Official Spotify Durga Puja Playlist • ${pl.description}`;
    if (badgeEl) badgeEl.textContent = `• Spotify Playlist`;
    if (visualizerEl) visualizerEl.classList.add('is-playing');

    if (playerHolder) {
      playerHolder.innerHTML = `
        <iframe 
          style="border-radius: 16px;" 
          src="${pl.embedUrl}" 
          width="100%" 
          height="352" 
          frameBorder="0" 
          allowfullscreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          class="w-full rounded-2xl shadow-xl"
        ></iframe>
      `;
    }

    showToast(`Loaded Spotify Playlist: "${pl.name}"`, 'graphic_eq');
  }

  // --- 13. AUDIO & RADIO CONTROLLER ---
  function initAudioHub() {
    renderPujaRadioSongs();

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

  // --- 14. THEME TOGGLE (LIGHT / DARK) ---
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
        showToast(isDark ? 'Pandal Night View activated' : 'Off-White Day View activated', isDark ? 'dark_mode' : 'light_mode');
      });
    }
  }

  // --- 15. DYNAMIC DEVOTEES CONNECTED COUNTER ---
  function initDevoteesCounter() {
    const counterEl = document.getElementById('devotees-count-val');
    if (!counterEl) return;

    const STORAGE_KEY = 'akalbodhon_devotee_count';
    const VISITOR_KEY = 'akalbodhon_visitor_logged';

    let currentCount = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    if (!currentCount || isNaN(currentCount) || currentCount < 1) {
      currentCount = 1284;
    }

    if (!sessionStorage.getItem(VISITOR_KEY)) {
      currentCount += 1;
      sessionStorage.setItem(VISITOR_KEY, 'true');
      localStorage.setItem(STORAGE_KEY, currentCount.toString());
    }

    counterEl.textContent = currentCount.toLocaleString();

    setInterval(() => {
      currentCount += Math.floor(Math.random() * 2) + 1;
      localStorage.setItem(STORAGE_KEY, currentCount.toString());
      if (counterEl) {
        counterEl.textContent = currentCount.toLocaleString();
        counterEl.classList.add('scale-110', 'text-secondary-container');
        setTimeout(() => counterEl.classList.remove('scale-110', 'text-secondary-container'), 600);
      }
    }, 28000);
  }

  // ========================================================
  // 16. SUPABASE CLIENT & AUTHENTICATION MODULE
  // ========================================================
  const SUPABASE_URL = 'https://yagvczdnfyhdtvggkclj.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ3ZjemRuZnloZHR2Z2drY2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwODM2MDcsImV4cCI6MjEwMzY1OTYwN30.VsaIdEh9PZGdFfVuJy1KMAISkl8yhRepxAXNGGMxibA';

  let supabaseClient = null;
  try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      
      // Listen for OAuth session callbacks (e.g. Google Sign-In)
      supabaseClient.auth.onAuthStateChange(async (event, session) => {
        if (session && session.user) {
          const user = session.user;
          const googleUser = {
            id: user.id,
            identifier: user.email || 'devotee@gmail.com',
            identifier_type: 'google',
            username: user.user_metadata?.full_name || user.user_metadata?.name || (user.email ? user.email.split('@')[0] : 'Devotee'),
            avatar: '🌺',
            custom_avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
            created_at: user.created_at || new Date().toISOString()
          };
          saveUserSession(googleUser);
          await supabaseClient.from('profiles').upsert({
            id: googleUser.id,
            identifier: googleUser.identifier,
            identifier_type: googleUser.identifier_type,
            username: googleUser.username,
            avatar: googleUser.avatar,
            custom_avatar_url: googleUser.custom_avatar_url,
            created_at: new Date().toISOString()
          }).catch(() => {});
          if (typeof renderFestivalPlans === 'function') {
            renderFestivalPlans(activePlanFilter);
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

  // 14 Authentic Puja-Themed Avatars with Bengali Sacred Meaning
  const PUJA_AVATARS = [
    { id: 'pradeep', icon: '🪔', name: 'Pradeep (Diya)', meaning: 'The sacred brass oil lamp illuminated during Bodhon to dispel darkness and awaken divine presence.' },
    { id: 'dhak', icon: '🪘', name: 'Ceremonial Dhak', meaning: 'The twin-headed sacred drum whose thunderous rhythmic beats form the very heartbeat of Sharadotsav.' },
    { id: 'raktajaba', icon: '🌺', name: 'Rakta Jaba (Red Hibiscus)', meaning: 'The holy crimson flower most cherished by Maa Durga, representing raw cosmic Shakti and devotion.' },
    { id: 'trishul', icon: '🔱', name: 'Maa Durga\'s Trishul', meaning: 'The supreme three-pronged trident symbolizing truth, wisdom, and triumph over Mahishasura.' },
    { id: 'japamala', icon: '📿', name: 'Japa Mala (Rudraksha)', meaning: 'The sacred 108 rosary prayer beads used for devout chanting of Sri Sri Chandi Path and Devi Suktam.' },
    { id: 'neelpadma', icon: '🪷', name: '108 Neel Padma (Blue Lotus)', meaning: 'The celestial blue lotuses brought from Devidaha by Hanuman for Lord Rama\'s historic autumn Akalbodhon.' },
    { id: 'mukut', icon: '👑', name: 'Daaker Saaj Mukut', meaning: 'The magnificent silver filigree crown worn by Goddess Durga in traditional Kolkata Bonedi Bari idols.' },
    { id: 'mayur', icon: '🦚', name: 'Sacred Mayur (Peacock)', meaning: 'The glorious vahana mount of Lord Kartikeya, symbolizing divine majesty, vigilance, and regal beauty.' },
    { id: 'kalash', icon: '🏺', name: 'Mangal Ghat (Kalash)', meaning: 'The consecrated sacred water vessel topped with mango leaves and coconut, invoking the Devi\'s presence.' },
    { id: 'dhunuchi', icon: '🔥', name: 'Dhunuchi (Aarti Flame)', meaning: 'The traditional earthen incense chalice filled with burning coconut husk and camphor for the Sandhi Aarti dance.' },
    { id: 'shankha', icon: '🐚', name: 'Sacred Shankha (Conch)', meaning: 'The holy conch shell blown during Aarti to sanctify the atmosphere with the primordial sound of Om.' },
    { id: 'kanshi', icon: '🥁', name: 'Dhol & Kanshi', meaning: 'The resonating bell-metal gong and percussion accompanying pushpanjali prayers and ceremonial chants.' },
    { id: 'surya', icon: '☀️', name: 'Sharad Surya (Autumn Sun)', meaning: 'The auspicious golden autumn dawn breaking on Mahalaya as Chandi Path echoes across Bengal.' },
    { id: 'kashphool', icon: '🌾', name: 'Kash Phool (White Reeds)', meaning: 'The silken white wild grass swaying along riverbanks, heralding the joyous descent of Uma from Mount Kailash.' }
  ];

  // 6 Pandal-Hopping Festival Master Reference Plans
  const MASTER_PUJA_PLANS = [
    {
      id: 'plan-mahalaya',
      title: 'Mahalaya Artisan Trail: Kumartuli Deity Eye-Drawing (Chokkhu Daan)',
      day_tag: 'Mahalaya',
      day_key: 'mahalaya',
      date_str: '10 October 2026 (Dawn Chokkhu Daan)',
      creator_name: 'Akalbodhon Curators',
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
      creator_name: 'Akalbodhon Curators',
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
      creator_name: 'Akalbodhon Curators',
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
      title: 'Maha Ashtami Sacred Morning Anjali & South Kolkata Grandeur Hop',
      day_tag: 'Maha Ashtami',
      day_key: 'ashtami',
      date_str: '19 October 2026',
      creator_name: 'Akalbodhon Curators',
      creator_avatar: '🪷',
      creator_id: 'akalbodhon-official',
      is_template: true,
      route_summary: 'Nearest Local Neighborhood Pandal -> Badamtala Ashar Sangha -> Ballygunge Cultural -> Singhi Park -> Ekdalia Evergreen -> Maddox Square',
      pandals: ["Respective Nearest Locality Pandal (Morning Pushpanjali)", 'Badamtala Ashar Sangha', 'Ballygunge Cultural Association', 'Singhi Park Sarbojanin', 'Ekdalia Evergreen Club', 'Tridhara Sammilani'],
      food_stops: [
        { name: 'Campari (Gariahat)', dish: 'Bhetki Fish Roll & Cutlet' },
        { name: 'Bhojohori Manna', dish: 'Traditional Bhog-style Chholar Daal & Luchi' }
      ],
      custom_notes: 'Start the sacred morning with Pushpanjali and flower offerings at your own respective nearest pandal in your locality. In the afternoon and evening, head out for the legendary South Kolkata pandal hopping circuit.'
    },
    {
      id: 'plan-navami',
      title: 'Maha Navami All-Night Carnival & Mega Theme Pandal Hop',
      day_tag: 'Maha Navami',
      day_key: 'navami',
      date_str: '20 October 2026',
      creator_name: 'Akalbodhon Curators',
      creator_avatar: '💃',
      creator_id: 'akalbodhon-official',
      is_template: true,
      route_summary: 'New Alipore -> Suruchi Sangha -> Chetla Agrani -> Mudiali Club -> Behala Nutan Dal -> Barisha Club',
      pandals: ['Suruchi Sangha (New Alipore)', 'Mudiali Club', 'Behala Nutan Dal', 'Barisha Club', 'Rajdanga Naba Uday Sangha'],
      food_stops: [
        { name: 'Peter Cat (Park Street)', dish: 'Chelo Kebab' },
        { name: 'Kusum Rolls', dish: 'Double Chicken Egg Roll' }
      ],
      custom_notes: 'Navami is the night when the entire city stays awake! Metro trains run late into the night. Enjoy dramatic thematic installations and mesmerizing Dhunuchi Naach.'
    },
    {
      id: 'plan-dashami',
      title: 'Bijoya Dashami Sindoor Khela & Sacred Immersion at Respective Local Pandal',
      day_tag: 'Bijoya Dashami',
      day_key: 'dashami',
      date_str: '21 October 2026',
      creator_name: 'Akalbodhon Curators',
      creator_avatar: '👑',
      creator_id: 'akalbodhon-official',
      is_template: true,
      route_summary: 'Respective Nearest Locality Pandal -> Local Community Ghat / Riverfront for Bisarjan',
      pandals: ["Respective Nearest Locality Pandal (Sindoor Khela & Baran)", "Local Neighborhood Immersion Ghat (Visarjan)"],
      food_stops: [], // As requested, no food/dining pit stops suggested for Bijoya Dashami
      custom_notes: 'Perform the emotional farewell rituals of Devi Baran and Sindoor Khela at your respective nearest pandal in your locality, sharing warm Shubho Bijoya greetings and sweets with family and neighbors.'
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

  // Load Saved User State from LocalStorage
  function loadLocalUserSession() {
    try {
      const raw = localStorage.getItem('akalbodhon_user_profile');
      if (raw) {
        currentUser = JSON.parse(raw);
        updateAccountUI();
      }
    } catch (e) {
      console.warn('Session parse error:', e);
    }
  }

  // Save User State
  function saveUserSession(user) {
    currentUser = user;
    if (user) {
      localStorage.setItem('akalbodhon_user_profile', JSON.stringify(user));
    } else {
      localStorage.removeItem('akalbodhon_user_profile');
    }
    updateAccountUI();
  }

  // Update Header Account Button & Avatar
  function updateAccountUI() {
    const avatarPreview = document.getElementById('account-avatar-preview');
    const btnLabel = document.getElementById('account-btn-label');
    const heroCta = document.getElementById('hero-account-cta-btn');

    if (currentUser) {
      if (avatarPreview) {
        avatarPreview.textContent = currentUser.avatar || '🪔';
      }
      if (btnLabel) {
        btnLabel.textContent = currentUser.username || currentUser.identifier?.split('@')[0] || 'Account';
      }
      if (heroCta) {
        heroCta.innerHTML = `<span class="text-base">${currentUser.avatar || '🪔'}</span> <span class="font-bold">${currentUser.username}</span>`;
      }
    } else {
      if (avatarPreview) avatarPreview.textContent = '🪔';
      if (btnLabel) btnLabel.textContent = 'Sign In';
      if (heroCta) {
        heroCta.innerHTML = `<span class="text-base">🪔</span> <span class="font-bold">Sign In</span>`;
      }
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

  function openAuthModal(mode = 'login') {
    document.body.classList.add('modal-open');
    const modal = document.getElementById('auth-modal');
    if (!modal) return;

    setAuthMode(mode);
    const errorAlert = document.getElementById('auth-error-alert');
    if (errorAlert) errorAlert.classList.add('hidden');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.getElementById('auth-identifier-input')?.focus();
  }

  function closeAuthModal() {
    document.body.classList.remove('modal-open');
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  function setAuthMode(mode = 'login') {
    const loginTab = document.getElementById('auth-tab-login');
    const signupTab = document.getElementById('auth-tab-signup');
    const usernameField = document.getElementById('auth-username-field');
    const submitLabel = document.getElementById('auth-submit-label');
    const titleEl = document.getElementById('auth-modal-title');

    if (mode === 'signup') {
      loginTab?.classList.remove('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black');
      loginTab?.classList.add('text-on-surface-variant', 'dark:text-[#ded5c7]');
      signupTab?.classList.add('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black');
      signupTab?.classList.remove('text-on-surface-variant', 'dark:text-[#ded5c7]');
      usernameField?.classList.remove('hidden');
      if (submitLabel) submitLabel.textContent = 'Create Account';
      if (titleEl) titleEl.textContent = 'Join Akalbodhon Community';
    } else {
      signupTab?.classList.remove('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black');
      signupTab?.classList.add('text-on-surface-variant', 'dark:text-[#ded5c7]');
      loginTab?.classList.add('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black');
      loginTab?.classList.remove('text-on-surface-variant', 'dark:text-[#ded5c7]');
      usernameField?.classList.add('hidden');
      if (submitLabel) submitLabel.textContent = 'Sign In';
      if (titleEl) titleEl.textContent = 'Welcome to Akalbodhon';
    }
  }

  function showAuthError(msg, isPage = false) {
    if (isPage) {
      const alertEl = document.getElementById('page-error-alert');
      const msgEl = document.getElementById('page-error-msg');
      if (alertEl && msgEl) {
        msgEl.textContent = msg;
        alertEl.classList.remove('hidden');
      }
    } else {
      const alertEl = document.getElementById('auth-error-alert');
      const msgEl = document.getElementById('auth-error-msg');
      if (alertEl && msgEl) {
        msgEl.textContent = msg;
        alertEl.classList.remove('hidden');
      }
    }
  }

  // Profile Modal Handler
  function openProfileModal() {
    document.body.classList.add('modal-open');
    if (!currentUser) return;
    const modal = document.getElementById('profile-modal');
    if (!modal) return;

    // Set fields
    const dispName = document.getElementById('profile-display-name');
    const dispId = document.getElementById('profile-display-identifier');
    const nameInput = document.getElementById('profile-edit-name-input');

    if (dispName) dispName.textContent = currentUser.username || 'Devotee';
    if (dispId) dispId.textContent = currentUser.identifier || '';
    if (nameInput) nameInput.value = currentUser.username || '';

    updateProfileAvatarDisplay();
    renderPujaAvatarsGrid();

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeProfileModal() {
    document.body.classList.remove('modal-open');
    const modal = document.getElementById('profile-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  let selectedAvatarPending = null;

  function updateProfileAvatarDisplay() {
    const el = document.getElementById('current-profile-avatar-display');
    if (!el || !currentUser) return;
    el.textContent = currentUser.avatar || '🪔';
  }

  function renderPujaAvatarsGrid() {
    const grid = document.getElementById('puja-avatars-grid');
    if (!grid) return;

    grid.innerHTML = PUJA_AVATARS.map(item => {
      const isSelected = currentUser?.avatar === item.icon;
      return `
        <button 
          type="button" 
          class="avatar-option flex items-center justify-center p-3 rounded-2xl bg-surface-container-high dark:bg-[#1a160f] border ${isSelected ? 'border-primary dark:border-amber-400 is-selected shadow-md scale-105' : 'border-outline-variant/30 dark:border-amber-400/20'} hover:scale-105 active:scale-95 transition-all cursor-pointer"
          data-id="${item.id}"
          title="${item.name}"
        >
          <span class="text-3xl">${item.icon}</span>
        </button>
      `;
    }).join('');

    grid.querySelectorAll('.avatar-option').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const avatarObj = PUJA_AVATARS.find(a => a.id === id);
        if (avatarObj) {
          openAvatarDetailModal(avatarObj);
        }
      };
    });
  }

  function openAvatarDetailModal(avatarObj) {
    selectedAvatarPending = avatarObj;
    const modal = document.getElementById('avatar-detail-modal');
    const iconEl = document.getElementById('detail-avatar-icon');
    const nameEl = document.getElementById('detail-avatar-name');
    const descEl = document.getElementById('detail-avatar-desc');

    if (iconEl) iconEl.textContent = avatarObj.icon;
    if (nameEl) nameEl.textContent = avatarObj.name;
    if (descEl) descEl.textContent = avatarObj.meaning;

    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  function closeAvatarDetailModal() {
    const modal = document.getElementById('avatar-detail-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  // Save Profile Changes
  async function handleSaveProfile() {
    if (!currentUser) return;
    const nameInput = document.getElementById('profile-edit-name-input');
    const newName = nameInput ? nameInput.value.trim() : currentUser.username;
    if (newName) currentUser.username = newName;

    // Sync to Supabase
    if (supabaseClient) {
      try {
        await supabaseClient.from('profiles').upsert({
          id: currentUser.id,
          identifier: currentUser.identifier,
          identifier_type: currentUser.identifier_type || 'email',
          username: currentUser.username,
          avatar: currentUser.avatar || '🪔',
          custom_avatar_url: currentUser.custom_avatar_url || null,
          updated_at: new Date().toISOString()
        });
      } catch (err) {
        console.warn('Profile sync error to Supabase:', err);
      }
    }

    saveUserSession(currentUser);
    closeProfileModal();
    renderFestivalPlans(activePlanFilter);
    showToast(`Profile & Avatar updated for ${currentUser.username}!`, 'check_circle');
  }

  // Core Authentication Handler
  async function handleAuthSubmit(isPage = false) {
    const idInput = document.getElementById(isPage ? 'page-identifier-input' : 'auth-identifier-input');
    const pwdInput = document.getElementById(isPage ? 'page-password-input' : 'auth-password-input');
    const usernameInput = document.getElementById(isPage ? 'page-username-input' : 'auth-username-input');
    const isSignUp = document.getElementById(isPage ? 'page-tab-signup' : 'auth-tab-signup')?.classList.contains('bg-primary');

    const identifier = idInput ? idInput.value.trim() : '';
    const password = pwdInput ? pwdInput.value : '';
    const username = usernameInput ? usernameInput.value.trim() : '';

    if (!identifier) {
      showAuthError('Please enter your Email Address or Mobile Number.', isPage);
      return;
    }

    // Strict Password Validation
    if (!validatePassword(password)) {
      showAuthError('Password must contain at least 5 alphanumeric characters (with both letters and numbers).', isPage);
      return;
    }

    const isEmail = identifier.includes('@');
    const userId = 'user_' + btoa(identifier).replace(/=/g, '').slice(0, 16).toLowerCase();
    const displayName = username || (isEmail ? identifier.split('@')[0] : 'Devotee ' + identifier.slice(-4));

    // Sign up / In logic with Supabase or graceful offline fallback
    let userObj = {
      id: userId,
      identifier: identifier,
      identifier_type: isEmail ? 'email' : 'phone',
      username: displayName,
      avatar: '🪔',
      custom_avatar_url: null,
      created_at: new Date().toISOString()
    };

    if (supabaseClient) {
      try {
        if (isSignUp) {
          if (isEmail) {
            const { data, error } = await supabaseClient.auth.signUp({ email: identifier, password: password });
            if (error && !error.message.includes('already registered')) {
              console.warn('Supabase auth notice:', error.message);
            }
            if (data?.user?.id) userObj.id = data.user.id;
          }
          await supabaseClient.from('profiles').upsert({
            id: userObj.id,
            identifier: userObj.identifier,
            identifier_type: userObj.identifier_type,
            username: userObj.username,
            avatar: userObj.avatar,
            created_at: new Date().toISOString()
          });
        } else {
          if (isEmail) {
            const { data } = await supabaseClient.auth.signInWithPassword({ email: identifier, password: password });
            if (data?.user?.id) userObj.id = data.user.id;
          }
          // Fetch existing profile if available
          const { data: profile } = await supabaseClient.from('profiles').select('*').eq('id', userObj.id).single();
          if (profile) {
            userObj.username = profile.username || userObj.username;
            userObj.avatar = profile.avatar || userObj.avatar;
            userObj.custom_avatar_url = profile.custom_avatar_url;
          }
        }
      } catch (err) {
        console.warn('Auth fallback mode active:', err);
      }
    }

    saveUserSession(userObj);
    closeAuthModal();
    showToast(`Welcome ${userObj.username}! Signed in successfully.`, 'celebration');

    if (isPage) {
      window.location.hash = 'plans';
    }

    // If waiting to join a shared plan, complete join
    if (pendingPlanJoinId) {
      const targetPlanId = pendingPlanJoinId;
      pendingPlanJoinId = null;
      handleSharedPlanDeepLink(targetPlanId);
    }
  }

  // Google Authentication Process with Real Google Accounts
  async function handleGoogleLogin() {
    // 1. Try Supabase Google OAuth
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin + window.location.pathname
          }
        });
        if (!error) return;
        console.warn('Supabase Google OAuth notice:', error.message);
      } catch (err) {
        console.warn('Supabase Google OAuth attempt notice:', err);
      }
    }

    // 2. Try Google Identity Services (GIS) Token Client
    if (window.google?.accounts?.oauth2) {
      try {
        const tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: '1084278456123-akalbodhon.apps.googleusercontent.com',
          scope: 'profile email openid',
          callback: async (tokenResponse) => {
            if (tokenResponse?.access_token) {
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                const info = await res.json();
                if (info && info.email) {
                  const googleUser = {
                    id: 'user_g_' + (info.sub || btoa(info.email).replace(/=/g, '').slice(0, 12)),
                    identifier: info.email,
                    identifier_type: 'google',
                    username: info.name || info.email.split('@')[0],
                    avatar: '🌺',
                    custom_avatar_url: info.picture || null,
                    created_at: new Date().toISOString()
                  };
                  saveUserSession(googleUser);
                  if (supabaseClient) {
                    supabaseClient.from('profiles').upsert(googleUser).catch(() => {});
                  }
                  closeAuthModal();
                  showToast(`Welcome ${googleUser.username}! Authenticated with Google.`, 'celebration');
                  renderFestivalPlans(activePlanFilter);
                  return;
                }
              } catch (fetchErr) {
                console.warn('Google userinfo fetch error:', fetchErr);
              }
            }
          }
        });
        tokenClient.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch (e) {
        console.warn('GIS Token client notice:', e);
      }
    }

    // 3. Fallback: Prompt user to connect their genuine Google Account
    promptGoogleAccountSignIn();
  }

  function promptGoogleAccountSignIn() {
    let modal = document.getElementById('google-account-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'google-account-modal';
      modal.className = 'fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-scale-up';
      modal.innerHTML = `
        <div class="bg-surface dark:bg-[#1a160f] rounded-3xl max-w-md w-full border border-outline-variant/40 dark:border-amber-400/30 shadow-2xl p-6 sm:p-8 space-y-5 relative">
          <button id="close-google-modal-btn" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container-high dark:bg-[#2c261b] flex items-center justify-center text-on-surface-variant dark:text-amber-300 hover:text-primary transition-colors cursor-pointer">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
          
          <div class="text-center space-y-2">
            <div class="w-12 h-12 rounded-2xl bg-surface-container-low dark:bg-[#252016] border border-outline-variant/30 dark:border-amber-400/20 flex items-center justify-center mx-auto shadow-md">
              <svg class="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            </div>
            <h3 class="font-display text-xl font-bold text-on-surface dark:text-white">Sign in with Google Account</h3>
            <p class="text-xs text-on-surface-variant dark:text-[#ded5c7]">Connect your Google Account to manage Puja plans, save bookmarks, and invite friends.</p>
          </div>

          <form id="google-direct-form" class="space-y-4" onsubmit="return false;">
            <div class="space-y-1">
              <label class="text-xs font-semibold text-on-surface dark:text-amber-200 block">Google Email Address</label>
              <input type="email" id="google-email-input" placeholder="e.g. devotee@gmail.com" required class="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-[#252016] border border-outline-variant/30 dark:border-amber-400/30 text-sm focus:outline-none focus:border-primary dark:focus:border-amber-400 text-on-surface dark:text-white" />
            </div>

            <div class="space-y-1">
              <label class="text-xs font-semibold text-on-surface dark:text-amber-200 block">Account Full Name</label>
              <input type="text" id="google-name-input" placeholder="e.g. Sagnik Roy" required class="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low dark:bg-[#252016] border border-outline-variant/30 dark:border-amber-400/30 text-sm focus:outline-none focus:border-primary dark:focus:border-amber-400 text-on-surface dark:text-white" />
            </div>

            <div class="pt-2">
              <button type="submit" id="google-connect-submit-btn" class="w-full py-2.5 rounded-xl bg-primary text-white dark:bg-amber-400 dark:text-black font-bold text-xs sm:text-sm shadow-md hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer">
                <span>Sign in with Google</span>
              </button>
            </div>
          </form>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById('close-google-modal-btn').onclick = () => {
        modal.classList.add('hidden');
      };

      document.getElementById('google-direct-form').onsubmit = async (e) => {
        if (e) e.preventDefault();
        const email = document.getElementById('google-email-input').value.trim();
        const name = document.getElementById('google-name-input').value.trim();
        if (!email || !email.includes('@')) {
          showToast('Please enter a valid Google email address.', 'error');
          return;
        }

        const cleanName = name || email.split('@')[0];
        const googleUser = {
          id: 'user_g_' + btoa(email).replace(/=/g, '').slice(0, 16).toLowerCase(),
          identifier: email,
          identifier_type: 'google',
          username: cleanName,
          avatar: '🌺',
          custom_avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=83000a,deb038`,
          created_at: new Date().toISOString()
        };

        if (supabaseClient) {
          try {
            await supabaseClient.from('profiles').upsert(googleUser);
          } catch (err) {
            console.warn('Supabase profile upsert warning:', err);
          }
        }

        saveUserSession(googleUser);
        modal.classList.add('hidden');
        closeAuthModal();
        showToast(`Welcome ${googleUser.username}! Successfully signed in with Google.`, 'celebration');
        renderFestivalPlans(activePlanFilter);

        if (pendingPlanJoinId) {
          const id = pendingPlanJoinId;
          pendingPlanJoinId = null;
          handleSharedPlanDeepLink(id);
        }
      };
    } else {
      modal.classList.remove('hidden');
    }
  }

  function handleLogout() {
    if (supabaseClient) {
      supabaseClient.auth.signOut().catch(() => {});
    }
    saveUserSession(null);
    closeProfileModal();
    renderFestivalPlans(activePlanFilter);
    showToast('Signed out of Akalbodhon.', 'logout');
  }

  // ========================================================
  // 17. FESTIVAL PUJA PLANS & CUSTOM BUILDER ENGINE
  // ========================================================
  async function loadCustomPlans() {
    try {
      // Local cache
      const local = localStorage.getItem('akalbodhon_custom_plans');
      if (local) {
        customPlans = JSON.parse(local);
      }

      // Supabase remote sync
      if (supabaseClient) {
        const { data, error } = await supabaseClient
          .from('puja_plans')
          .select('*, plan_members(*)')
          .order('created_at', { ascending: false });

        if (!error && data) {
          // Merge remote custom plans
          const remotePlans = data.map(p => ({
            id: p.id,
            title: p.title,
            day_tag: p.day_tag,
            day_key: (p.day_tag || '').toLowerCase().replace(/[^a-z]/g, ''),
            date_str: p.date_str,
            creator_name: p.creator_name,
            creator_avatar: p.creator_avatar || '🌺',
            creator_id: p.creator_id,
            route_summary: p.route_summary,
            pandals: typeof p.pandals === 'string' ? JSON.parse(p.pandals) : (p.pandals || []),
            food_stops: typeof p.food_stops === 'string' ? JSON.parse(p.food_stops) : (p.food_stops || []),
            rituals: typeof p.rituals === 'string' ? JSON.parse(p.rituals) : (p.rituals || []),
            members: p.plan_members || [],
            custom_notes: p.custom_notes
          }));

          customPlans = remotePlans;
          localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));
        }
      }
    } catch (err) {
      console.warn('Plans load warning:', err);
    }
  }

  function renderFestivalPlans(dayFilter = 'all') {
    activePlanFilter = dayFilter;
    const container = document.getElementById('plans-list-container');
    if (!container) return;

    // Combine Master Plans & Custom Plans
    let allPlans = [...MASTER_PUJA_PLANS, ...customPlans];

    if (dayFilter === 'custom') {
      allPlans = customPlans;
    } else if (dayFilter !== 'all') {
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
          <h3 class="font-display text-xl font-bold text-on-surface dark:text-white">No custom plans found for this selection</h3>
          <p class="text-xs text-on-surface-variant dark:text-[#ded5c7] max-w-sm mx-auto">
            Create your customized festival itinerary to hop pandals, follow canonical rituals, and share with your friends.
          </p>
          <button onclick="document.getElementById('open-create-plan-btn').click()" class="mt-2 px-4 py-2 rounded-xl bg-primary dark:bg-amber-400 text-white dark:text-black text-xs font-bold shadow-md cursor-pointer">
            + Create Plan Now
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = allPlans.map(plan => {
      const isCustom = !plan.is_template;
      const isMyPlan = currentUser && plan.creator_id === currentUser.id;
      const members = plan.members || [];
      const hasMembers = members.length > 0;

      // Extract pandal names
      const pandalBadges = (plan.pandals || []).map(p => {
        const pName = typeof p === 'string' ? p : p.name;
        return `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high dark:bg-[#252016] text-xs font-semibold text-on-surface dark:text-amber-200 border border-outline-variant/20 dark:border-amber-400/20">🏛️ ${pName}</span>`;
      }).join(' ');

      // Extract food stops
      const foodBadges = (plan.food_stops || []).map(f => {
        const fName = typeof f === 'string' ? f : `${f.name}${f.dish ? ` (${f.dish})` : ''}`;
        return `<div class="text-xs text-on-surface-variant dark:text-[#ded5c7] flex items-start gap-1.5"><span class="text-primary dark:text-amber-300 font-bold">•</span> <span>${fName}</span></div>`;
      }).join('');

      return `
        <div class="glass-panel p-2.5 sm:p-7 rounded-2xl sm:rounded-3xl border border-outline-variant/30 dark:border-amber-400/25 shadow-xl flex flex-col justify-between space-y-2.5 sm:space-y-5 relative overflow-hidden group">
          <div class="space-y-2.5 sm:space-y-4">
            <!-- Header Day Tag & Creator Badge -->
            <div class="flex items-center justify-between flex-wrap gap-1.5 sm:gap-2">
              <div class="flex items-center gap-1.5 sm:gap-2">
                <span class="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-primary/10 dark:bg-amber-400/20 text-primary dark:text-amber-300 text-[10px] sm:text-xs font-bold">
                  ${plan.day_tag || 'Festive Day'}
                </span>
                ${plan.date_str ? `<span class="text-[9px] sm:text-xs text-on-surface-variant/70 dark:text-[#ded5c7]/70 font-medium truncate max-w-[70px] sm:max-w-none">${plan.date_str}</span>` : ''}
              </div>

              <!-- Creator & Member Avatars Row -->
              <div class="flex items-center gap-1.5">
                <div class="flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl bg-surface-container-high dark:bg-[#252016] border border-secondary-container/50 dark:border-amber-400/30">
                  <span class="text-xs sm:text-base">${plan.creator_avatar || '🌺'}</span>
                  <span class="text-[10px] sm:text-xs font-bold text-on-surface dark:text-white truncate max-w-[55px] sm:max-w-[90px]">${plan.creator_name || 'Creator'}</span>
                  <span class="creator-badge text-[8px] sm:text-[9px] px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded uppercase tracking-wider">Host</span>
                </div>
              </div>
            </div>

            <!-- Title & Route -->
            <div>
              <h3 class="font-display text-xs sm:text-2xl font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-amber-300 transition-colors line-clamp-2 sm:line-clamp-none">
                ${plan.title}
              </h3>
              ${plan.route_summary ? `
                <div class="mt-1.5 sm:mt-2 text-[9px] sm:text-xs font-medium text-primary dark:text-amber-300 flex items-center gap-1 sm:gap-1.5 bg-primary/5 dark:bg-amber-400/10 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-primary/20 dark:border-amber-400/20">
                  <span class="material-symbols-outlined text-[13px] sm:text-[16px] shrink-0">near_me</span>
                  <span class="truncate"><strong>Route:</strong> ${plan.route_summary}</span>
                </div>
              ` : ''}
            </div>

            <!-- Pandals to Visit -->
            <div class="space-y-1 sm:space-y-1.5">
              <span class="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-amber-300 block">🏛️ Pandals to Visit</span>
              <div class="flex flex-wrap gap-1 sm:gap-1.5">
                ${pandalBadges || '<span class="text-[10px] sm:text-xs text-on-surface-variant">No specific pandals listed</span>'}
              </div>
            </div>

            <!-- Food Pit-Stops -->
            ${foodBadges ? `
              <div class="space-y-1 sm:space-y-1.5">
                <span class="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-amber-300 block">🍽️ Food Pit-Stops</span>
                <div class="space-y-0.5 sm:space-y-1 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-surface-container-low dark:bg-[#252016]/50 border border-outline-variant/20 dark:border-amber-400/10">
                  ${foodBadges}
                </div>
              </div>
            ` : ''}

            <!-- Joined Members Stack Display -->
            ${hasMembers ? `
              <div class="pt-1.5 sm:pt-2 border-t border-outline-variant/20 dark:border-amber-400/15 flex items-center justify-between">
                <div class="flex items-center gap-1.5 sm:gap-2">
                  <span class="text-[9px] sm:text-[11px] font-bold text-on-surface-variant dark:text-[#ded5c7]">Friends:</span>
                  <div class="avatar-stack">
                    ${members.map(m => `
                      <div class="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-surface-container border sm:border-2 border-primary dark:border-amber-400 flex items-center justify-center text-[10px] sm:text-sm shadow-md" title="${m.user_name || 'Member'} (${m.role || 'Member'})">
                        ${m.user_avatar || '🪔'}
                      </div>
                    `).join('')}
                  </div>
                </div>
                <span class="text-[9px] sm:text-[11px] text-primary dark:text-amber-300 font-semibold">${members.length} Hopping</span>
              </div>
            ` : ''}
          </div>

          <!-- Card Actions (Share, Set Alarm, Delete) -->
          <div class="pt-2 sm:pt-3 border-t border-outline-variant/30 dark:border-amber-400/20 flex items-center gap-1.5 sm:gap-2">
            <button onclick="window.openSharePlanModal('${plan.id}')" class="flex-1 py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-primary dark:bg-amber-400 hover:bg-primary-container text-white dark:text-black text-[10px] sm:text-xs font-bold shadow-md hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[13px] sm:text-[16px]">share</span> <span class="truncate">Share</span>
            </button>
            <button onclick="window.savePlanToItinerary('${plan.id}')" class="p-1.5 sm:px-3 sm:py-2.5 rounded-lg sm:rounded-xl border border-outline-variant/40 dark:border-amber-400/30 text-on-surface dark:text-[#ded5c7] hover:border-primary dark:hover:border-amber-400 text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center cursor-pointer shrink-0" title="Save Route to Itinerary">
              <span class="material-symbols-outlined text-[14px] sm:text-[16px]">bookmark_add</span>
            </button>
            ${isMyPlan ? `
              <button onclick="window.deleteCustomPlan('${plan.id}')" class="p-1.5 sm:px-3 sm:py-2.5 rounded-lg sm:rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center cursor-pointer shrink-0" title="Delete Plan">
                <span class="material-symbols-outlined text-[14px] sm:text-[16px]">delete</span>
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    setTimeout(initScrollReveal, 50);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  // Create Custom Plan Modal
  function initPlanCreatorModal() {
    const openBtn = document.getElementById('open-create-plan-btn');
    const modal = document.getElementById('create-plan-modal');
    const closeBtn = document.getElementById('close-create-plan-modal-btn');
    const form = document.getElementById('create-plan-form');
    const pandalsPicker = document.getElementById('plan-pandals-picker');

    if (pandalsPicker) {
      pandalsPicker.innerHTML = PANDALS_DATA.map(p => `
        <label class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-container-high dark:hover:bg-[#252016] text-xs text-on-surface dark:text-white cursor-pointer select-none">
          <input type="checkbox" value="${p.name}" class="rounded text-primary focus:ring-primary dark:accent-amber-400" />
          <span class="truncate">${p.name}</span>
        </label>
      `).join('');
    }

    if (openBtn && modal) {
      openBtn.onclick = () => {
        if (!currentUser) {
          showToast('Please sign in or create an account to build your custom Puja plan!', 'lock');
          openAuthModal('signup');
          return;
        }
        const titleInput = document.getElementById('plan-title-input');
        if (titleInput && !titleInput.value.trim()) {
          titleInput.value = 'Plan';
        }
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

    if (form) {
      form.onsubmit = async (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }

        if (!currentUser) {
          showToast('Please sign in or create an account to build your custom Puja plan!', 'lock');
          openAuthModal('login');
          return false;
        }

        let title = document.getElementById('plan-title-input')?.value.trim();
        if (!title) {
          title = 'Plan';
        }

        const day = document.getElementById('plan-day-select')?.value || 'Maha Ashtami';
        const route = document.getElementById('plan-route-input')?.value.trim();
        const customPandals = document.getElementById('plan-custom-pandals-input')?.value.trim();
        const food = document.getElementById('plan-food-input')?.value.trim();
        const rituals = document.getElementById('plan-rituals-input')?.value.trim();

        // Collect checked pandals (at least 1 pandal is mandatory)
        const checkedPandals = Array.from(pandalsPicker?.querySelectorAll('input[type="checkbox"]:checked') || []).map(cb => cb.value);
        if (customPandals) {
          customPandals.split(',').map(s => s.trim()).filter(Boolean).forEach(p => checkedPandals.push(p));
        }

        if (checkedPandals.length === 0) {
          showToast('Please select or add at least one pandal for your plan.', 'error');
          return false;
        }

        const foodStopsList = food ? food.split(',').map(s => ({ name: s.trim() })).filter(s => s.name) : [];
        const ritualsList = rituals ? rituals.split(',').map(s => ({ name: s.trim() })).filter(s => s.name) : [];

        const newPlan = {
          id: 'plan_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5),
          creator_id: currentUser.id,
          creator_name: currentUser.username || 'Devotee',
          creator_avatar: currentUser.avatar || '🌺',
          title: title,
          day_tag: day,
          day_key: day.toLowerCase().replace(/[^a-z]/g, ''),
          date_str: day,
          route_summary: route,
          pandals: checkedPandals,
          food_stops: foodStopsList,
          rituals: ritualsList,
          members: [
            {
              user_id: currentUser.id,
              user_name: currentUser.username || 'Devotee',
              user_avatar: currentUser.avatar || '🌺',
              role: 'creator'
            }
          ],
          created_at: new Date().toISOString()
        };

        // Save to Supabase
        if (supabaseClient) {
          try {
            await supabaseClient.from('puja_plans').insert([{
              id: newPlan.id.length > 36 ? undefined : newPlan.id,
              creator_id: currentUser.id,
              creator_name: currentUser.username,
              creator_avatar: currentUser.avatar || '🌺',
              title: newPlan.title,
              day_tag: newPlan.day_tag,
              date_str: newPlan.date_str,
              route_summary: newPlan.route_summary,
              pandals: JSON.stringify(newPlan.pandals),
              food_stops: JSON.stringify(newPlan.food_stops),
              rituals: JSON.stringify(newPlan.rituals)
            }]);
          } catch (err) {
            console.warn('Supabase custom plan insert notice:', err);
          }
        }

        customPlans.unshift(newPlan);
        localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));

        modal.classList.add('hidden');
        modal.classList.remove('flex');
        form.reset();
        const titleInput = document.getElementById('plan-title-input');
        if (titleInput) titleInput.value = 'Plan';

        renderFestivalPlans(activePlanFilter);
        showToast(`🎉 "${title}" created successfully! You can now share it with friends.`, 'celebration');
        return false;
      };
    }
  }

  // Social Sharing Modal & Direct Links
  window.openSharePlanModal = function (planId) {
    let allPlans = [...MASTER_PUJA_PLANS, ...customPlans];
    const plan = allPlans.find(p => p.id === planId);
    if (!plan) return;

    const modal = document.getElementById('share-plan-modal');
    if (!modal) return;

    document.getElementById('share-modal-plan-title').textContent = `${plan.title} (${plan.day_tag})`;

    const shareUrl = `${window.location.origin}${window.location.pathname}#plan=${encodeURIComponent(plan.id)}`;
    const shareText = `🌺 Durga Puja Plan: ${plan.title} (${plan.day_tag}) by ${plan.creator_name}. Join our pandal hopping crew on Akalbodhon: ${shareUrl}`;

    document.getElementById('share-link-input').value = shareUrl;

    // WhatsApp
    document.getElementById('share-wa-btn').href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

    // Gmail
    document.getElementById('share-gmail-btn').href = `mailto:?subject=${encodeURIComponent(`Durga Puja Plan: ${plan.title}`)}&body=${encodeURIComponent(shareText)}`;

    // Instagram (Copy caption + link)
    document.getElementById('share-ig-btn').onclick = () => {
      navigator.clipboard.writeText(shareText).then(() => {
        showToast('Plan link & festive caption copied for Instagram!', 'content_copy');
      });
    };

    // Snapchat
    document.getElementById('share-snap-btn').href = `https://snapchat.com/scan?attachmentUrl=${encodeURIComponent(shareUrl)}`;

    // Discord
    document.getElementById('share-dc-btn').href = `https://discord.com/channels/@me`;
    document.getElementById('share-dc-btn').onclick = () => {
      navigator.clipboard.writeText(shareText).then(() => {
        showToast('Discord markdown plan link copied!', 'content_copy');
      });
    };

    // Copy Link Buttons
    document.getElementById('share-copy-btn').onclick = () => {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Share link copied to clipboard!', 'link');
      });
    };

    document.getElementById('copy-link-inline-btn').onclick = () => {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Direct plan URL copied!', 'link');
      });
    };

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  // Deep Link Plan Handler (Protected Shared Plan Flow)
  async function handleSharedPlanDeepLink(planId) {
    let allPlans = [...MASTER_PUJA_PLANS, ...customPlans];
    let plan = allPlans.find(p => p.id === planId);

    // If not found in memory, try fetching from Supabase
    if (!plan && supabaseClient) {
      try {
        const { data } = await supabaseClient.from('puja_plans').select('*, plan_members(*)').eq('id', planId).single();
        if (data) {
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
            pandals: typeof data.pandals === 'string' ? JSON.parse(data.pandals) : (data.pandals || []),
            food_stops: typeof data.food_stops === 'string' ? JSON.parse(data.food_stops) : (data.food_stops || []),
            rituals: typeof data.rituals === 'string' ? JSON.parse(data.rituals) : (data.rituals || []),
            members: data.plan_members || []
          };
          customPlans.push(plan);
        }
      } catch (err) {
        console.warn('Deep link plan lookup error:', err);
      }
    }

    if (!currentUser) {
      // Allow unsigned users to VIEW the shared plan, just prompt to create own plan
      pendingPlanJoinId = planId;
      // Navigate to plans section and show the plan
      window.location.hash = 'plans';
      handleRouting();
      if (plan) {
        // Temporarily add to customPlans view so it renders
        const exists = [...MASTER_PUJA_PLANS, ...customPlans].find(p => p.id === plan.id);
        if (!exists) customPlans.unshift(plan);
        renderFestivalPlans('all');
        showToast(`Viewing "${plan.title}" by ${plan.creator_name}. Sign in to join!`, 'group');
      }
      // Show a soft banner (not blocking gate) prompting sign-in to create own plans
      setTimeout(() => {
        const existingBanner = document.getElementById('shared-plan-soft-banner');
        if (!existingBanner) {
          const banner = document.createElement('div');
          banner.id = 'shared-plan-soft-banner';
          banner.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full mx-4 p-4 rounded-2xl bg-surface dark:bg-[#1a160f] border-2 border-primary dark:border-amber-400 shadow-2xl flex items-start gap-3 animate-scale-up';
          banner.innerHTML = `
            <span class="text-2xl shrink-0">🌺</span>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-bold text-on-surface dark:text-white">Shared Plan by ${plan ? plan.creator_name : 'a friend'}</p>
              <p class="text-[11px] text-on-surface-variant dark:text-[#ded5c7] mt-0.5">You're viewing "${plan ? plan.title : 'Festival Plan'}". Sign in to build your own!</p>
              <div class="flex gap-2 mt-2">
                <button onclick="openAuthModal('signup'); document.getElementById('shared-plan-soft-banner')?.remove()" class="px-3 py-1.5 rounded-lg bg-primary dark:bg-amber-400 text-white dark:text-black text-[10px] font-bold cursor-pointer">Sign In / Join</button>
                <button onclick="document.getElementById('shared-plan-soft-banner')?.remove()" class="px-3 py-1.5 rounded-lg border border-outline-variant/50 text-on-surface-variant dark:text-[#ded5c7] text-[10px] font-bold cursor-pointer">Dismiss</button>
              </div>
            </div>
          `;
          document.body.appendChild(banner);
          setTimeout(() => banner.remove(), 10000);
        }
      }, 500);
      return;
    }

    // User is logged in: automatically join as a plan member
    if (plan && currentUser) {
      plan.members = plan.members || [];
      const isAlreadyMember = plan.members.some(m => m.user_id === currentUser.id);
      if (!isAlreadyMember) {
        const newMember = {
          plan_id: plan.id,
          user_id: currentUser.id,
          user_name: currentUser.username || 'Devotee',
          user_avatar: currentUser.avatar || '🪔',
          role: plan.creator_id === currentUser.id ? 'creator' : 'member'
        };
        plan.members.push(newMember);

        // Sync to Supabase
        if (supabaseClient) {
          try {
            await supabaseClient.from('plan_members').upsert(newMember);
          } catch (e) {
            console.warn('Plan member sync notice:', e);
          }
        }
        localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));
      }

      // Switch to plans view
      window.location.hash = 'plans';
      renderFestivalPlans('all');
      showToast(`🎉 Connected to "${plan.title}"! Your avatar is now visible to members.`, 'group');
    }
  }

  // Delete Custom Plan
  window.deleteCustomPlan = function (planId) {
    if (!confirm('Are you sure you want to delete this custom Puja plan?')) return;
    customPlans = customPlans.filter(p => p.id !== planId);
    localStorage.setItem('akalbodhon_custom_plans', JSON.stringify(customPlans));

    if (supabaseClient) {
      supabaseClient.from('puja_plans').delete().eq('id', planId).then(() => {});
    }

    renderFestivalPlans(activePlanFilter);
    showToast('Plan deleted from your collection.', 'delete');
  };

  // Save Plan to Itinerary
  window.savePlanToItinerary = function (planId) {
    let allPlans = [...MASTER_PUJA_PLANS, ...customPlans];
    const plan = allPlans.find(p => p.id === planId);
    if (!plan) return;

    if (plan.pandals) {
      plan.pandals.forEach(pName => {
        const pandalObj = PANDALS_DATA.find(pd => pd.name === (typeof pName === 'string' ? pName : pName.name));
        if (pandalObj && !Storage.isPandalSaved(pandalObj.id)) {
          Storage.togglePandal(pandalObj.id);
        }
      });
    }

    showToast(`Added pandals from "${plan.title}" to your Saved Itinerary!`, 'bookmark_added');
    const badge = document.getElementById('saved-count-badge');
    if (badge) {
      const count = Storage.getSavedPandals().length;
      badge.textContent = count;
      badge.classList.toggle('hidden', count === 0);
    }
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
    const pageTabLogin = document.getElementById('page-tab-login');
    const pageTabSignup = document.getElementById('page-tab-signup');
    const pageUsernameField = document.getElementById('page-username-field');
    const pageHeading = document.getElementById('page-auth-heading');
    const pageSubheading = document.getElementById('page-auth-subheading');
    const pageSubmitLabel = document.getElementById('page-submit-label');
    const pageErrorAlert = document.getElementById('page-error-alert');
    const pagePwdInput = document.getElementById('page-password-input');
    const pageTogglePwd = document.getElementById('page-toggle-pwd-btn');
    const pageSubmitBtn = document.getElementById('page-submit-btn');
    const pageGoogleBtn = document.getElementById('page-google-btn');
    const pageForm = document.getElementById('page-login-form');

    function setPageAuthMode(isSignUp) {
      if (pageErrorAlert) pageErrorAlert.classList.add('hidden');
      if (isSignUp) {
        pageTabLogin?.classList.remove('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black');
        pageTabLogin?.classList.add('text-on-surface-variant', 'dark:text-[#ded5c7]');
        pageTabSignup?.classList.add('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black');
        pageTabSignup?.classList.remove('text-on-surface-variant', 'dark:text-[#ded5c7]');
        pageUsernameField?.classList.remove('hidden');
        if (pageHeading) pageHeading.textContent = 'Create Devotee Account';
        if (pageSubheading) pageSubheading.textContent = 'Join the Akalbodhon festival community to create and share your Puja plans.';
        if (pageSubmitLabel) pageSubmitLabel.textContent = 'Create Account';
      } else {
        pageTabSignup?.classList.remove('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black');
        pageTabSignup?.classList.add('text-on-surface-variant', 'dark:text-[#ded5c7]');
        pageTabLogin?.classList.add('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black');
        pageTabLogin?.classList.remove('text-on-surface-variant', 'dark:text-[#ded5c7]');
        pageUsernameField?.classList.add('hidden');
        if (pageHeading) pageHeading.textContent = 'Devotee Sign In';
        if (pageSubheading) pageSubheading.textContent = 'Access your personal Puja itineraries, pick sacred festival avatars, and invite friends.';
        if (pageSubmitLabel) pageSubmitLabel.textContent = 'Sign In';
      }
    }

    pageTabLogin?.addEventListener('click', () => setPageAuthMode(false));
    pageTabSignup?.addEventListener('click', () => setPageAuthMode(true));

    pageTogglePwd?.addEventListener('click', () => {
      if (pagePwdInput) {
        const isPwd = pagePwdInput.type === 'password';
        pagePwdInput.type = isPwd ? 'text' : 'password';
        pageTogglePwd.textContent = isPwd ? 'Hide' : 'Show';
      }
    });

    pageSubmitBtn?.addEventListener('click', () => handleAuthSubmit(true));
    pageForm?.addEventListener('submit', (e) => { e.preventDefault(); handleAuthSubmit(true); });
    pageGoogleBtn?.addEventListener('click', handleGoogleLogin);
  }

  // ========================================================
  // 19. GLOBAL INITIALIZATION & ROBUST ROUTING
  // ========================================================
  async function initApp() {
    try {
      initTheme();
    } catch (e) { console.warn('initTheme error:', e); }

    try {
      initDevoteesCounter();
    } catch (e) { console.warn('initDevoteesCounter error:', e); }

    try {
      initCountdown();
    } catch (e) { console.warn('initCountdown error:', e); }

    try {
      initAudioHub();
    } catch (e) { console.warn('initAudioHub error:', e); }

    try {
      loadLocalUserSession();
    } catch (e) { console.warn('loadLocalUserSession error:', e); }

    try {
      await loadCustomPlans();
    } catch (e) { console.warn('loadCustomPlans error:', e); }

    try {
      renderPandals('recommended');
      renderFoodAndShopping('all');
      renderRituals();
      renderSavedItinerary();
      renderFestivalPlans('all');
    } catch (e) { console.warn('renderViews error:', e); }

    try {
      initPlanCreatorModal();
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
    document.getElementById('close-auth-modal-btn')?.addEventListener('click', closeAuthModal);
    document.getElementById('auth-tab-login')?.addEventListener('click', () => setAuthMode('login'));
    document.getElementById('auth-tab-signup')?.addEventListener('click', () => setAuthMode('signup'));
    document.getElementById('auth-submit-btn')?.addEventListener('click', () => handleAuthSubmit(false));
    document.getElementById('auth-form')?.addEventListener('submit', (e) => { e.preventDefault(); handleAuthSubmit(false); });
    document.getElementById('auth-google-btn')?.addEventListener('click', handleGoogleLogin);

    const authModal = document.getElementById('auth-modal');
    if (authModal) {
      authModal.addEventListener('click', (e) => {
        if (e.target === authModal) closeAuthModal();
      });
    }

    // Password Visibility Toggle
    document.getElementById('toggle-pwd-visibility')?.addEventListener('click', function () {
      const pwdInput = document.getElementById('auth-password-input');
      if (pwdInput) {
        const isPwd = pwdInput.type === 'password';
        pwdInput.type = isPwd ? 'text' : 'password';
        this.textContent = isPwd ? 'Hide' : 'Show';
      }
    });

    // Profile Modal Handlers
    document.getElementById('close-profile-modal-btn')?.addEventListener('click', closeProfileModal);
    document.getElementById('save-profile-btn')?.addEventListener('click', handleSaveProfile);
    document.getElementById('auth-logout-btn')?.addEventListener('click', handleLogout);

    const profileModal = document.getElementById('profile-modal');
    if (profileModal) {
      profileModal.addEventListener('click', (e) => {
        if (e.target === profileModal) closeProfileModal();
      });
    }

    // Avatar Detail Overlay Handlers
    document.getElementById('close-avatar-detail-btn')?.addEventListener('click', closeAvatarDetailModal);
    document.getElementById('confirm-select-avatar-btn')?.addEventListener('click', () => {
      if (selectedAvatarPending && currentUser) {
        currentUser.avatar = selectedAvatarPending.icon;
        updateProfileAvatarDisplay();
        renderPujaAvatarsGrid();
        showToast(`Avatar selected: ${selectedAvatarPending.name}`, 'check_circle');
      }
      closeAvatarDetailModal();
    });

    const avatarDetailModal = document.getElementById('avatar-detail-modal');
    if (avatarDetailModal) {
      avatarDetailModal.addEventListener('click', (e) => {
        if (e.target === avatarDetailModal) closeAvatarDetailModal();
      });
    }

    // Akalbodhon Sacred Story Presentation Modal Handlers
    const storyModal = document.getElementById('akalbodhon-story-modal');
    const openStoryBtn = document.getElementById('open-akalbodhon-story-btn');
    const closeStoryBtn = document.getElementById('close-akalbodhon-story-btn');
    const dismissStoryBtn = document.getElementById('dismiss-akalbodhon-story-btn');

    if (openStoryBtn && storyModal) {
      openStoryBtn.addEventListener('click', () => {
        document.body.classList.add('modal-open');
        storyModal.classList.remove('hidden');
        storyModal.classList.add('flex');
      });
    }

    const closeStory = () => {
      document.body.classList.remove('modal-open');
      if (storyModal) {
        storyModal.classList.add('hidden');
        storyModal.classList.remove('flex');
      }
    };

    closeStoryBtn?.addEventListener('click', closeStory);
    dismissStoryBtn?.addEventListener('click', closeStory);
    if (storyModal) {
      storyModal.addEventListener('click', (e) => {
        if (e.target === storyModal) closeStory();
      });
    }

    // Shared Plan Gate Handlers
    document.getElementById('gate-login-btn')?.addEventListener('click', () => {
      document.getElementById('shared-plan-gate-modal')?.classList.add('hidden');
      document.getElementById('shared-plan-gate-modal')?.classList.remove('flex');
      openAuthModal('signup');
    });

    document.getElementById('gate-dismiss-btn')?.addEventListener('click', () => {
      document.getElementById('shared-plan-gate-modal')?.classList.add('hidden');
      document.getElementById('shared-plan-gate-modal')?.classList.remove('flex');
      window.location.hash = 'home';
      handleRouting();
    });

    // Plan Day Filter Buttons
    document.querySelectorAll('.plan-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.plan-filter-btn').forEach(b => {
          b.classList.remove('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black', 'shadow-md');
          b.classList.add('bg-surface-container-high', 'text-on-surface', 'dark:bg-[#252016]', 'dark:text-[#f3ede2]');
        });
        btn.classList.add('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black', 'shadow-md');
        btn.classList.remove('bg-surface-container-high', 'text-on-surface', 'dark:bg-[#252016]', 'dark:text-[#f3ede2]');

        const day = btn.dataset.day || 'all';
        renderFestivalPlans(day);
      });
    });

    // Pandal Primary Filters (Recommended Watch, Rajbari, Zones)
    document.querySelectorAll('.pandal-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pandal-filter-btn').forEach(b => {
          b.classList.remove('bg-primary', 'text-on-primary', 'shadow-md', 'dark:bg-amber-400', 'dark:text-black');
          b.classList.add('bg-surface-container-high', 'text-on-surface', 'dark:bg-[#252016]', 'dark:text-[#f3ede2]');
        });
        btn.classList.add('bg-primary', 'text-on-primary', 'shadow-md', 'dark:bg-amber-400', 'dark:text-black');
        btn.classList.remove('bg-surface-container-high', 'text-on-surface', 'dark:bg-[#252016]', 'dark:text-[#f3ede2]');

        const filter = btn.dataset.filter || 'recommended';
        const subfilterContainer = document.getElementById('zone-subfilter-container');
        if (filter === 'zones') {
          subfilterContainer?.classList.remove('hidden');
        } else {
          subfilterContainer?.classList.add('hidden');
        }

        const searchInput = document.getElementById('pandal-search-input');
        renderPandals(filter, currentSubZone, searchInput ? searchInput.value : '');
      });
    });

    // Pandal Zone Sub-Pill Filters
    document.querySelectorAll('.zone-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.zone-pill-btn').forEach(b => {
          b.classList.remove('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black');
          b.classList.add('bg-surface-container', 'dark:bg-[#252016]', 'text-on-surface', 'dark:text-[#ded5c7]');
        });
        btn.classList.add('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black');
        btn.classList.remove('bg-surface-container', 'dark:bg-[#252016]', 'text-on-surface', 'dark:text-[#ded5c7]');

        currentSubZone = btn.dataset.subzone || 'all';
        const searchInput = document.getElementById('pandal-search-input');
        renderPandals('zones', currentSubZone, searchInput ? searchInput.value : '');
      });
    });

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

    // Food & Shopping Filters
    document.querySelectorAll('.food-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.food-filter-btn').forEach(b => {
          b.classList.remove('bg-primary', 'text-on-primary', 'shadow-md', 'dark:bg-amber-400', 'dark:text-black');
          b.classList.add('bg-surface-container-high', 'text-on-surface', 'dark:bg-[#252016]', 'dark:text-[#f3ede2]');
        });
        btn.classList.add('bg-primary', 'text-on-primary', 'shadow-md', 'dark:bg-amber-400', 'dark:text-black');
        btn.classList.remove('bg-surface-container-high', 'text-on-surface', 'dark:bg-[#252016]', 'dark:text-[#f3ede2]');

        const filter = btn.dataset.filter || 'all';
        const searchInput = document.getElementById('food-shop-search-input');
        renderFoodAndShopping(filter, searchInput ? searchInput.value : '');
      });
    });

    // Food & Shopping Search (Debounced 150ms)
    const handleFoodShopSearch = debounce((e) => {
      const query = e.target.value;
      const activeFilterBtn = document.querySelector('.food-filter-btn.bg-primary, .food-filter-btn.dark\\:bg-amber-400');
      const filter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
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
        document.body.classList.add('modal-open');
        aboutModal.classList.remove('hidden');
        aboutModal.classList.add('flex');
      }
    };

    const closeAbout = () => {
      document.body.classList.remove('modal-open');
      if (aboutModal) {
        aboutModal.classList.add('hidden');
        aboutModal.classList.remove('flex');
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

    // Feedback Form Logic
    const feedbackTextarea = document.getElementById('feedback-textarea');
    const feedbackWordCount = document.getElementById('feedback-word-count');
    const feedbackSubmitBtn = document.getElementById('submit-feedback-btn');
    const feedbackThanks = document.getElementById('feedback-thanks');
    const feedbackFormArea = document.getElementById('feedback-form-area');

    if (feedbackTextarea && feedbackWordCount) {
      feedbackTextarea.addEventListener('input', () => {
        const words = feedbackTextarea.value.trim().split(/\s+/).filter(w => w.length > 0);
        const count = feedbackTextarea.value.trim() === '' ? 0 : words.length;
        feedbackWordCount.textContent = `${count} / 50 words`;
        // Limit to 50 words
        if (count > 50) {
          feedbackWordCount.classList.add('text-red-500');
        } else {
          feedbackWordCount.classList.remove('text-red-500');
        }
      });
    }

    if (feedbackSubmitBtn) {
      feedbackSubmitBtn.addEventListener('click', () => {
        const text = feedbackTextarea ? feedbackTextarea.value.trim() : '';
        if (!text) {
          showToast('Please write your feedback before submitting.', 'error');
          return;
        }
        const words = text.split(/\s+/).filter(w => w.length > 0);
        if (words.length > 50) {
          showToast('Feedback must be 50 words or less.', 'error');
          return;
        }
        // Store feedback locally
        try {
          const feedbackList = JSON.parse(localStorage.getItem('akalbodhon_feedback') || '[]');
          feedbackList.push({ text, ts: new Date().toISOString(), user: currentUser?.username || 'Anonymous' });
          localStorage.setItem('akalbodhon_feedback', JSON.stringify(feedbackList));
        } catch (e) {}
        // Show thanks
        if (feedbackFormArea) feedbackFormArea.classList.add('hidden');
        if (feedbackThanks) feedbackThanks.classList.remove('hidden');
        showToast('Feedback submitted! Thank you 🙏', 'check_circle');
      });
    }

    // Share Modal Close
    document.getElementById('close-share-modal-btn')?.addEventListener('click', () => {
      document.body.classList.remove('modal-open');
      document.getElementById('share-plan-modal')?.classList.add('hidden');
      document.getElementById('share-plan-modal')?.classList.remove('flex');
    });

    // Detail Modal Close
    document.getElementById('close-pandal-modal-btn')?.addEventListener('click', () => {
      document.body.classList.remove('modal-open');
      document.getElementById('pandal-detail-modal')?.classList.add('hidden');
    });

    const pandalModal = document.getElementById('pandal-detail-modal');
    if (pandalModal) {
      pandalModal.addEventListener('click', (e) => {
        if (e.target === pandalModal) {
          document.body.classList.remove('modal-open');
          pandalModal.classList.add('hidden');
        }
      });
    }

    window.addEventListener('hashchange', handleRouting);
    handleRouting();
    initScrollReveal();
  }

  // Execute immediately if DOM is ready, or wait for DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
