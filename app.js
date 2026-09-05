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
      locationUrl: 'https://maps.google.com/?q=Maniktala+Chaltabagan+Lohapatty+Durga+Puja+Kolkata'
    },
    {
      id: 'chorbagan-sarbojanin',
      name: 'Chorbagan Sarbojanin',
      zone: 'North',
      theme: 'Fine Earthen Terracotta & Sustainable Bengal Clay Heritage',
      image: 'pandals/chorebagan.png',
      transit: 'Girish Park Metro / Rammohan Roy Sarani (4 min walk)',
      transitType: 'metro',
      highlights: 'Poetic cultural narratives crafted through organic terracotta and rustic traditional craftsmanship.',
      locationUrl: 'https://maps.google.com/?q=Chorbagan+Sarbojanin+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Kashi+Bose+Lane+Durga+Puja+Samity+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Ahiritola+Sarbojanin+Durgotsab+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Beniatola+Sarbojanin+Durgotsav+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Jagat+Mukherjee+Park+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Kumartuli+Park+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Pathuriaghata+Rajbari+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Hatibagan+Sarbojanin+Durgotsav+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Nalin+Sarkar+Street+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Bagbazar+Sarbojanin+Durgotsav+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Sovabazar+Rajbari+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Darjipara+Mitra+Bari+Durga+Puja+Beadon+Street+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Jorasanko+Shib+Krishna+Daw+Rajbari+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Sikdar+Bagan+Sadharan+Durgotsav+Shyambazar+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Hatibagan+Nabin+Pally+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Ahiritola+Jubak+Brinda+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Tala+Prattoy+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Singhi+Park+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Badamtala+Ashar+Sangha+Kalighat+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Hindustan+Club+Durga+Puja+Sarat+Bose+Road+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Ballygunge+Cultural+Association+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Barisha+Club+Durga+Puja+Sakherbazar+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Behala+Nutan+Dal+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Rajdanga+Naba+Uday+Sangha+Kasba+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Ekdalia+Evergreen+Club+Gariahat+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Suruchi+Sangha+New+Alipore+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Tridhara+Sammilani+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Mudiali+Club+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Bosepukur+Talbagan+Durga+Puja+Kasba+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Shiv+Mandir+Sarbojanin+Durga+Puja+Lake+Temple+Road+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Bosepukur+Sitalamandir+Durga+Puja+Kasba+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Deshapriya+Park+Durga+Puja+Rashbehari+Avenue+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Chetla+Agrani+Club+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Haridevpur+41+Pally+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Kendua+Shanti+Sangha+Durga+Puja+Garia+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Naktala+Udayan+Sangha+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=College+Square+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Mohammad+Ali+Park+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Santosh+Mitra+Square+Durga+Puja+Lebutala+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Badan+Chand+Roy+Rajbari+Durga+Puja+Colootola+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Sreebhumi+Sporting+Club+VIP+Road+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Dum+Dum+Park+Yubak+Brinda+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Dum+Dum+Park+Sarbojanin+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Dum+Dum+Park+Bharat+Chakra+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Dum+Dum+Park+Tarun+Dal+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Dum+Dum+Park+Tarun+Sangha+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Dakshindari+Youth+Club+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Arjunpur+Amra+Sabai+Club+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Salt+Lake+BJ+Block+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Salt+Lake+FD+Block+Durga+Puja+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Salt+Lake+IB+Block+Durga+Puja+Kolkata'
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
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Kolkata_mutton_biryani.jpg',
      locationUrl: 'https://maps.google.com/?q=Arsalan+Restaurant+Park+Circus+Kolkata'
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
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Golbari+Shyambazar+Kolkata'
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
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Mitra+Cafe+Shyambazar+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Peter+Cat+Park+Street+Kolkata'
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
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Mocambo+Restaurant+Park+Street+Kolkata'
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
      image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=6+Ballygunge+Place+Kolkata'
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
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Bhojohori+Manna+Gariahat+Kolkata'
    },
    {
      id: 'food-8',
      name: 'Paramount Sherbets & Syrups',
      category: 'sweets',
      categoryLabel: 'Historic Century-Old Sherbet Institution',
      location: 'College Square (Bankim Chatterjee St)',
      metro: 'Central / MG Road Metro (3 min walk)',
      desc: 'Since 1918, founded by freedom fighters, patronized by Netaji Subhash Chandra Bose and Satyajit Ray.',
      mustTry: 'Daab Sherbet with Tender Coconut Malai, Cocoa Malai & Cream Kesar',
      timings: 'Morning to Night',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Paramount+Sherbets+College+Square+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Campari+Gariahat+Kolkata'
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
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Kusum+Rolls+Park+Street+Kolkata'
    },
    {
      id: 'food-11',
      name: 'Chittaranjan Sweets',
      category: 'sweets',
      categoryLabel: 'Centenary Sweet Confectioner',
      location: 'Shyambazar (Sovabazar area)',
      metro: 'Shyambazar Metro (2 min walk)',
      desc: 'Over 115 years old, creator of spongy white syrupy Rosogollas and pure chhana sweetmeats made without additives.',
      mustTry: 'Sponge Rosogolla, Madhuparka & Nolen Gur Sandesh',
      timings: 'Morning to Night',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Chittaranjan+Sweets+Shyambazar+Kolkata'
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
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Balaram+Mullick+Radharaman+Mullick+Bhowanipore+Kolkata'
    }
  ];

  // 8 Famous Kolkata Shopping Districts
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
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Gariahat_Road_and_Flyover_at_Rashbehari_Avenue_crossing%2C_in_Kolkata.jpg',
      locationUrl: 'https://maps.google.com/?q=Gariahat+Market+Kolkata'
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
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Hatibagan+Market+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=New+Market+Kolkata'
    },
    {
      id: 'shop-4',
      name: 'College Street Boi Para',
      type: 'shopping',
      typeLabel: 'World\'s Largest Secondhand Book Market',
      location: 'College Street (Between Bowbazar & MG Road)',
      metro: 'Central / MG Road Metro (4 min walk)',
      desc: 'The intellectual heart of Bengal: 1.5 km of wooden book kiosks selling rare volumes and collecting prized Sharadiya festive annuals.',
      bestTime: '2:00 PM - 8:00 PM',
      highlight: 'Desh & Anandamela Sharadiya editions, Coffee House adda, vintage prints.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/College_Street_in_Kolkata.jpg',
      locationUrl: 'https://maps.google.com/?q=College+Street+Boi+Para+Kolkata'
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
      locationUrl: 'https://maps.google.com/?q=Dakshinapan+Shopping+Complex+Kolkata'
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
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Kumartuli_potters_colony_in_Kolkata.jpg',
      locationUrl: 'https://maps.google.com/?q=Kumartuli+Kolkata'
    },
    {
      id: 'shop-7',
      name: 'Swabhumi The Heritage Plaza',
      type: 'shopping',
      typeLabel: 'Ethnic Artisan Craft Village',
      location: 'EM Bypass (Near Salt Lake Stadium)',
      metro: 'Salt Lake Stadium Metro (5 min walk)',
      desc: 'Sprawling cultural village blending traditional Indian architecture with artisanal workshops, live folk dance, and craft boutiques.',
      bestTime: '4:00 PM - 9:00 PM',
      highlight: 'Traditional brass jewelry, ethnic home decor, Kantha stitch sarees.',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Swabhumi+The+Heritage+Plaza+Kolkata'
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
      image: 'https://images.unsplash.com/photo-1577975882846-431adc8c2009?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Burrabazar+Kolkata'
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
      foodTip: 'Pair with Golbari Kosha Mangsho & Paramount Daab Sherbet.'
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
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playDhakBeat(type = 'dha') {
      this.init();
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

  // --- 7. RENDER PANDALS ---
  function renderPandals(zone = 'all', searchQuery = '') {
    const container = document.getElementById('pandals-grid-container');
    if (!container) return;

    let list = PANDALS_DATA;

    if (zone !== 'all') {
      list = list.filter(p => p.zone.toLowerCase() === zone.toLowerCase());
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
          <h3 class="font-headline-md text-xl text-on-surface dark:text-white">No pandals found</h3>
          <p class="text-on-surface-variant dark:text-[#ded5c7] text-sm mt-1">Try searching for a different zone, landmark or metro station.</p>
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
        <div class="bg-surface-container-lowest dark:bg-[#1c1810] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-outline-variant/30 dark:border-amber-400/20 flex flex-col h-full relative reveal-on-scroll ${delayClass}" data-pandal-id="${pandal.id}">
          <div class="h-52 relative overflow-hidden bg-surface-container dark:bg-[#252016]">
            <img 
              src="${pandal.image}" 
              alt="${pandal.name}" 
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onerror="this.src='https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80'"
            />
            <div class="absolute bottom-3 left-3 bg-surface/95 dark:bg-[#12100a]/95 backdrop-blur-md text-primary dark:text-amber-300 px-3.5 py-1 rounded-full font-label-sm text-xs font-bold border border-outline-variant/40 dark:border-amber-400/30 shadow-md">
              ${pandal.zone} Zone
            </div>
          </div>
          <div class="p-6 flex flex-col flex-1 justify-between gap-4">
            <div>
              <h3 class="font-headline-md text-xl text-on-surface dark:text-white mb-1.5 group-hover:text-primary dark:group-hover:text-amber-300 transition-colors font-bold">${pandal.name}</h3>
              <p class="text-on-surface-variant dark:text-[#ded5c7] text-sm leading-relaxed mb-3 line-clamp-2">${pandal.theme}</p>
              
              <div class="flex items-center gap-2 text-on-surface-variant dark:text-[#f3ede2] font-label-sm text-xs bg-surface-container-low dark:bg-[#282217] p-2.5 rounded-lg border border-outline-variant/20 dark:border-amber-400/20">
                <span class="material-symbols-outlined text-[18px] text-primary dark:text-amber-300">
                  ${pandal.transitType === 'metro' ? 'directions_subway' : 'directions_bus'}
                </span>
                <span class="truncate font-medium">${pandal.transit}</span>
              </div>
            </div>

            <div class="pt-4 border-t border-outline-variant/30 dark:border-amber-400/20 flex gap-2 items-center">
              <a 
                href="${pandal.locationUrl}" 
                target="_blank" 
                rel="noopener"
                class="flex-1 bg-primary dark:bg-amber-400 hover:bg-primary-container text-on-primary dark:text-black py-2.5 px-3 rounded-xl font-label-sm text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
                title="Open in Google Maps"
              >
                <!-- Directions Pin Icon -->
                <img src="maps-pin.png" alt="Directions" class="w-4 h-4 shrink-0 drop-shadow-sm object-contain" />
                <span>Get Directions</span>
              </a>
              <button 
                class="pandal-bookmark-btn w-10 h-10 border rounded-xl flex items-center justify-center transition-all cursor-pointer ${bookmarkBtnClass}"
                data-id="${pandal.id}"
                title="${isSaved ? 'Remove from saved' : 'Save to Itinerary'}"
              >
                <span class="material-symbols-outlined text-[20px]" style="${isSaved ? "font-variation-settings: 'FILL' 1;" : ''}">${isSaved ? 'bookmark' : 'bookmark_border'}</span>
              </button>
              <button 
                class="pandal-info-btn w-10 h-10 border border-outline-variant/50 dark:border-amber-400/30 hover:border-secondary-container dark:hover:border-amber-300 rounded-xl flex items-center justify-center text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300 transition-colors"
                data-id="${pandal.id}"
                title="View Full Details"
              >
                <span class="material-symbols-outlined text-[20px]">info</span>
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
            <div class="bg-surface-container-lowest dark:bg-[#1c1810] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-outline-variant/30 dark:border-amber-400/20 flex flex-col h-full relative reveal-on-scroll ${delayClass}">
              <div class="h-48 relative overflow-hidden bg-surface-container dark:bg-[#252016]">
                <img 
                  src="${food.image}" 
                  alt="${food.name}" 
                  loading="lazy"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onerror="this.src='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'"
                />
                <div class="absolute top-3 right-3 bg-secondary-container dark:bg-amber-400 text-on-secondary-container dark:text-black px-3 py-1 rounded-full font-label-sm text-xs font-bold flex items-center gap-1 shadow-md">
                  <span class="material-symbols-outlined text-[14px]">restaurant</span> ${food.categoryLabel}
                </div>

              </div>

              <div class="p-6 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <h3 class="font-headline-md text-xl text-on-surface dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-amber-300 transition-colors font-bold">${food.name}</h3>
                  <p class="text-xs text-primary dark:text-amber-300 font-semibold mb-2 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[15px]">pin_drop</span> ${food.location}
                  </p>
                  <p class="text-on-surface-variant dark:text-[#ded5c7] text-sm leading-relaxed mb-3 line-clamp-2">${food.desc}</p>
                  
                  <div class="bg-surface-container-low dark:bg-[#282217] p-2.5 rounded-lg border border-outline-variant/20 dark:border-amber-400/20 text-xs text-on-surface dark:text-[#f3ede2] mb-1">
                    <span class="text-primary dark:text-amber-300 font-bold block mb-0.5">⭐ Signature Delicacy:</span>
                    <span class="font-medium">${food.mustTry}</span>
                  </div>
                </div>

                <div class="pt-4 border-t border-outline-variant/30 dark:border-amber-400/20 flex gap-2 items-center">
                  <a 
                    href="${food.locationUrl}" 
                    target="_blank" 
                    rel="noopener"
                    class="flex-1 bg-primary dark:bg-amber-400 hover:bg-primary-container text-on-primary dark:text-black py-2.5 px-3 rounded-xl font-label-sm text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
                  >
                    <!-- Directions Pin Icon -->
                    <img src="maps-pin.png" alt="Directions" class="w-4 h-4 shrink-0 drop-shadow-sm object-contain" />
                    <span>Get Directions</span>
                  </a>
                  <button 
                    class="food-bookmark-btn w-10 h-10 border border-outline-variant/50 dark:border-amber-400/30 hover:border-primary rounded-xl flex items-center justify-center transition-colors ${isSaved ? 'text-primary dark:text-amber-300 bg-primary/10 dark:bg-amber-400/20' : 'text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300'}"
                    data-id="${food.id}"
                    title="${isSaved ? 'Remove from saved' : 'Save to Itinerary'}"
                  >
                    <span class="material-symbols-outlined text-[20px]">${isSaved ? 'bookmark' : 'bookmark_border'}</span>
                  </button>
                  <button 
                    class="food-info-btn w-10 h-10 border border-outline-variant/50 dark:border-amber-400/30 hover:border-secondary-container dark:hover:border-amber-300 rounded-xl flex items-center justify-center text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300 transition-colors"
                    data-id="${food.id}"
                    title="View Full Details"
                  >
                    <span class="material-symbols-outlined text-[20px]">info</span>
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
            <div class="bg-surface-container-lowest dark:bg-[#1c1810] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-outline-variant/30 dark:border-amber-400/20 flex flex-col h-full relative reveal-on-scroll ${delayClass}">
              <div class="h-48 relative overflow-hidden bg-surface-container dark:bg-[#252016]">
                <img 
                  src="${shop.image}" 
                  alt="${shop.name}" 
                  loading="lazy"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onerror="this.src='https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'"
                />
                <div class="absolute top-3 right-3 bg-secondary-container dark:bg-amber-400 text-on-secondary-container dark:text-black px-3 py-1 rounded-full font-label-sm text-xs font-bold flex items-center gap-1 shadow-md">
                  <span class="material-symbols-outlined text-[14px]">shopping_bag</span> ${shop.typeLabel}
                </div>
                <div class="absolute bottom-3 left-3 bg-surface/95 dark:bg-[#12100a]/95 backdrop-blur-md text-primary dark:text-amber-300 px-3 py-1 rounded-full font-label-sm text-xs font-bold border border-outline-variant/40 dark:border-amber-400/30 shadow-sm flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">schedule</span> ${shop.bestTime}
                </div>
              </div>

              <div class="p-6 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <h3 class="font-headline-md text-xl text-on-surface dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-amber-300 transition-colors font-bold">${shop.name}</h3>
                  <p class="text-xs text-primary dark:text-amber-300 font-semibold mb-2 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[15px]">pin_drop</span> ${shop.location}
                  </p>
                  <p class="text-on-surface-variant dark:text-[#ded5c7] text-sm leading-relaxed mb-3 line-clamp-2">${shop.desc}</p>
                  
                  <div class="bg-surface-container-low dark:bg-[#282217] p-2.5 rounded-lg border border-outline-variant/20 dark:border-amber-400/20 text-xs text-on-surface dark:text-[#f3ede2] mb-1">
                    <span class="text-primary dark:text-amber-300 font-bold block mb-0.5">✨ Key Specialties:</span>
                    <span class="font-medium">${shop.highlight}</span>
                  </div>
                </div>

                <div class="pt-4 border-t border-outline-variant/30 dark:border-amber-400/20 flex gap-2 items-center">
                  <a 
                    href="${shop.locationUrl}" 
                    target="_blank" 
                    rel="noopener"
                    class="flex-1 bg-primary dark:bg-amber-400 hover:bg-primary-container text-on-primary dark:text-black py-2.5 px-3 rounded-xl font-label-sm text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
                  >
                    <!-- Directions Pin Icon -->
                    <img src="maps-pin.png" alt="Directions" class="w-4 h-4 shrink-0 drop-shadow-sm object-contain" />
                    <span>Get Directions</span>
                  </a>
                  <button 
                    class="shop-bookmark-btn w-10 h-10 border border-outline-variant/50 dark:border-amber-400/30 hover:border-primary rounded-xl flex items-center justify-center transition-colors ${isSaved ? 'text-primary dark:text-amber-300 bg-primary/10 dark:bg-amber-400/20' : 'text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300'}"
                    data-id="${shop.id}"
                    title="${isSaved ? 'Remove from saved' : 'Save to Itinerary'}"
                  >
                    <span class="material-symbols-outlined text-[20px]">${isSaved ? 'bookmark' : 'bookmark_border'}</span>
                  </button>
                  <button 
                    class="shop-info-btn w-10 h-10 border border-outline-variant/50 dark:border-amber-400/30 hover:border-secondary-container dark:hover:border-amber-300 rounded-xl flex items-center justify-center text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300 transition-colors"
                    data-id="${shop.id}"
                    title="View Full Details"
                  >
                    <span class="material-symbols-outlined text-[20px]">info</span>
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

        soundEngine.playBell();
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

        soundEngine.playBell();
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
            onclick="window.open('https://maps.google.com/?q=${encodeURIComponent(trail.stops.join(' to '))}', '_blank')"
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
      if (estContainer) {
        estContainer.classList.remove('hidden');
        if (estContainer) estContainer.classList.add('hidden');
      }
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

  // Curated Songs Grouped by 3 Vibe Modes
  const PUJA_RADIO_SONGS = [
    // --- 1. PUJO HIP HOP & FESTIVE BEATS MODE ---
    {
      id: 'dugga-elo',
      mode: 'hiphop',
      title: 'Dugga Elo',
      artist: 'Monali Thakur & Guddu',
      uploader: 'SVF',
      duration: '3:45',
      ytId: '6M-9X9f6n5Y',
      spotifyUrl: 'https://open.spotify.com/search/Dugga%20Elo%20Monali%20Thakur',
      youtubeUrl: 'https://www.youtube.com/watch?v=6M-9X9f6n5Y',
      cover: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'bolo-dugga-maiki',
      mode: 'hiphop',
      title: 'Bolo Dugga Maiki',
      artist: 'Arijit Singh & Nikhita Gandhi',
      uploader: 'SVF Music',
      duration: '4:12',
      ytId: 'X3s3uG1y-bA',
      spotifyUrl: 'https://open.spotify.com/search/Bolo%20Dugga%20Maiki%20Arijit%20Singh',
      youtubeUrl: 'https://www.youtube.com/watch?v=X3s3uG1y-bA',
      cover: 'logo.jpg'
    },
    {
      id: 'dhaker-taaley',
      mode: 'hiphop',
      title: 'Dhaker Taaley',
      artist: 'Abhijeet Bhattacharya, Monali Thakur & Chorus',
      uploader: 'SVF Music',
      duration: '4:18',
      ytId: 'o6A_qT3v2rI',
      spotifyUrl: 'https://open.spotify.com/search/Dhaker%20Taaley%20Abhijeet',
      youtubeUrl: 'https://www.youtube.com/watch?v=o6A_qT3v2rI',
      cover: 'logo.jpg'
    },
    {
      id: 'dhak-baja-kashor-baaja',
      mode: 'hiphop',
      title: 'Dhak Baja Kashor Baaja',
      artist: 'Shreya Ghoshal & Jeet Gannguli',
      uploader: 'SVF Music',
      duration: '3:55',
      ytId: 'GzQ3Z4W6i-s',
      spotifyUrl: 'https://open.spotify.com/search/Dhak%20Baja%20Kashor%20Baaja%20Shreya%20Ghoshal',
      youtubeUrl: 'https://www.youtube.com/watch?v=GzQ3Z4W6i-s',
      cover: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80'
    },

    // --- 2. PUJA PLEASANT MODE ---
    {
      id: 'elo-je-maa',
      mode: 'pleasant',
      title: 'Elo Je Maa',
      artist: 'Abhijeet Bhattacharya & Shreya Ghoshal',
      uploader: 'SVF Music',
      duration: '4:22',
      ytId: 'A3nFh_M5D8c',
      spotifyUrl: 'https://open.spotify.com/search/Elo%20Je%20Maa%20Abhijeet',
      youtubeUrl: 'https://www.youtube.com/watch?v=A3nFh_M5D8c',
      cover: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'joy-maa-durga',
      mode: 'pleasant',
      title: 'Joy Maa Durga',
      artist: 'Pandit Ajoy Chakrabarty & Kaushiki Chakraborty',
      uploader: 'Saregama Bengali',
      duration: '5:10',
      ytId: 'YQyo8QeoYhc',
      spotifyUrl: 'https://open.spotify.com/search/Joy%20Maa%20Durga%20Ajoy%20Chakrabarty',
      youtubeUrl: 'https://www.youtube.com/watch?v=YQyo8QeoYhc',
      cover: 'logo.jpg'
    },
    {
      id: 'bajlo-tomar-alor-benu',
      mode: 'pleasant',
      title: 'Bajlo Tomar Alor Benu',
      artist: 'Suprava Sarkar',
      uploader: 'Saregama Bengali',
      duration: '3:30',
      ytId: 'YQyo8QeoYhc',
      spotifyUrl: 'https://open.spotify.com/search/Bajlo%20Tomar%20Alor%20Benu',
      youtubeUrl: 'https://www.youtube.com/watch?v=YQyo8QeoYhc',
      cover: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80'
    },

    // --- 3. MAHALAYA MODE ---
    {
      id: 'mahalaya-full-chandi',
      mode: 'mahalaya',
      title: 'Mahishasuramardini (Full Dawn Narration)',
      artist: 'Birendra Krishna Bhadra',
      uploader: 'Saregama Bengali',
      duration: '1:28:45',
      ytId: 'YQyo8QeoYhc',
      spotifyUrl: 'https://open.spotify.com/album/42v3gD94Q8JoxD57sL20Qx',
      youtubeUrl: 'https://www.youtube.com/watch?v=YQyo8QeoYhc',
      cover: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'jaago-tumi-jaago',
      mode: 'mahalaya',
      title: 'Jaago Tumi Jaago',
      artist: 'Dwijen Mukhopadhyay',
      uploader: 'Saregama Bengali',
      duration: '4:15',
      ytId: 'YQyo8QeoYhc',
      spotifyUrl: 'https://open.spotify.com/search/Jaago%20Tumi%20Jaago%20Dwijen%20Mukhopadhyay',
      youtubeUrl: 'https://www.youtube.com/watch?v=YQyo8QeoYhc',
      cover: 'logo.jpg'
    },
    {
      id: 'rupang-dehi-jayang-dehi',
      mode: 'mahalaya',
      title: 'Rupang Dehi Jayang Dehi',
      artist: 'Birendra Krishna Bhadra & Chorus',
      uploader: 'Saregama Bengali',
      duration: '4:50',
      ytId: 'YQyo8QeoYhc',
      spotifyUrl: 'https://open.spotify.com/search/Rupang%20Dehi%20Jayang%20Dehi%20Birendra%20Krishna%20Bhadra',
      youtubeUrl: 'https://www.youtube.com/watch?v=YQyo8QeoYhc',
      cover: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80'
    }
  ];

  let ytMahalayaPlayer = null;
  let ytRadioPlayer = null;
  let activeRadioSongId = null;

  function renderPujaRadioSongs() {
    const hiphopContainer = document.getElementById('radio-songs-hiphop-list');
    const pleasantContainer = document.getElementById('radio-songs-pleasant-list');
    const mahalayaContainer = document.getElementById('radio-songs-mahalaya-list');
    const legacyList = document.getElementById('puja-radio-songs-list');

    const renderSongItem = (song, index) => `
      <div 
        class="glass-panel p-4 rounded-2xl border border-outline-variant/30 dark:border-amber-400/20 hover:border-primary/50 dark:hover:border-amber-300 transition-all flex flex-col sm:flex-row items-center justify-between gap-4 group"
        id="song-card-${song.id}"
      >
        <div class="flex items-center gap-3.5 w-full sm:w-auto min-w-0">
          <div class="w-10 h-10 rounded-xl bg-surface-container-high dark:bg-[#2c261b] font-mono font-bold text-xs text-primary dark:text-amber-300 flex items-center justify-center shrink-0 border border-outline-variant/20 dark:border-amber-400/20">
            0${index + 1}
          </div>
          <div class="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-outline-variant/30 dark:border-amber-400/30">
            <img src="${song.cover}" alt="${song.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <h4 class="font-display font-bold text-base text-on-surface dark:text-white truncate">${song.title}</h4>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 dark:bg-amber-400/20 text-primary dark:text-amber-300 shrink-0">${song.uploader}</span>
            </div>
            <p class="text-xs text-on-surface-variant dark:text-[#ded5c7] truncate mt-0.5">${song.artist}</p>
          </div>
        </div>

        <div class="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-outline-variant/20 dark:border-amber-400/15">
          <span class="text-xs font-mono text-on-surface-variant/70 dark:text-[#ded5c7]/60">${song.duration}</span>
          
          <!-- Spotify Direct Play Link -->
          <a 
            href="${song.spotifyUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="w-9 h-9 rounded-xl bg-[#1DB954]/10 hover:bg-[#1DB954] text-[#1DB954] hover:text-white dark:bg-[#1DB954]/20 dark:hover:bg-[#1DB954] dark:text-[#1ed760] dark:hover:text-black flex items-center justify-center transition-all shadow-sm"
            title="Stream on Spotify"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.309c-.216.353-.674.464-1.027.249-2.815-1.72-6.359-2.109-10.534-1.155-.403.092-.807-.16-.9-.562-.092-.403.16-.807.562-.9 4.568-1.044 8.487-.605 11.65 1.341.353.215.464.674.249 1.027zm1.469-3.266c-.272.441-.852.58-1.293.308-3.223-1.981-8.136-2.553-11.948-1.396-.499.151-1.031-.133-1.183-.632-.151-.499.133-1.031.632-1.183 4.364-1.325 9.778-.686 13.485 1.595.441.272.58.852.308 1.293zm.126-3.41c-3.865-2.295-10.239-2.507-13.913-1.391-.593.18-1.222-.162-1.402-.755-.18-.593.162-1.222.755-1.402 4.227-1.284 11.266-1.038 15.698 1.594.533.316.708 1.009.392 1.542-.316.533-1.009.708-1.542.392z"/></svg>
          </a>

          <!-- YouTube Direct Play Link -->
          <a 
            href="${song.youtubeUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="w-9 h-9 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white dark:bg-red-500/20 dark:hover:bg-red-600 dark:text-red-400 dark:hover:text-white flex items-center justify-center transition-all shadow-sm"
            title="Stream on YouTube"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>

          <!-- Interactive Play In-App Button -->
          <button 
            class="play-radio-song-btn px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-container text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
            data-song-id="${song.id}"
            data-yt-id="${song.ytId}"
            data-title="${song.title}"
            data-artist="${song.artist}"
          >
            <span class="material-symbols-outlined text-[16px]">play_arrow</span> Play
          </button>
        </div>
      </div>
    `;

    const hiphopSongs = PUJA_RADIO_SONGS.filter(s => s.mode === 'hiphop');
    const pleasantSongs = PUJA_RADIO_SONGS.filter(s => s.mode === 'pleasant');
    const mahalayaSongs = PUJA_RADIO_SONGS.filter(s => s.mode === 'mahalaya');

    if (hiphopContainer) hiphopContainer.innerHTML = hiphopSongs.map(renderSongItem).join('');
    if (pleasantContainer) pleasantContainer.innerHTML = pleasantSongs.map(renderSongItem).join('');
    if (mahalayaContainer) mahalayaContainer.innerHTML = mahalayaSongs.map(renderSongItem).join('');
    if (legacyList) legacyList.innerHTML = PUJA_RADIO_SONGS.map(renderSongItem).join('');

    // Attach play song handlers
    document.querySelectorAll('.play-radio-song-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const songId = btn.dataset.songId;
        const ytId = btn.dataset.ytId;
        const title = btn.dataset.title;
        const artist = btn.dataset.artist;
        playRadioSong(songId, ytId, title, artist);
      });
    });
  }

  function playRadioSong(songId, ytId, title, artist) {
    activeRadioSongId = songId;
    const activeBox = document.getElementById('radio-active-player-box');
    const titleEl = document.getElementById('active-song-title');
    const artistEl = document.getElementById('active-song-artist');
    const visualizerEl = document.getElementById('active-song-visualizer');
    const playerHolder = document.getElementById('radio-yt-player-holder');

    if (activeBox) activeBox.classList.remove('hidden');
    if (titleEl) titleEl.textContent = title;
    if (artistEl) artistEl.textContent = artist;
    if (visualizerEl) visualizerEl.classList.add('is-playing');

    if (playerHolder) {
      playerHolder.innerHTML = `
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/${ytId}?autoplay=1&enablejsapi=1&playsinline=1&modestbranding=1&rel=0" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          class="w-full h-full rounded-2xl"
        ></iframe>
      `;
    }

    showToast(`Playing: "${title}" (${artist})`, 'graphic_eq');
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
        if (!soundEngine.isDhakLooping) {
          soundEngine.startDhakLoop();
          heroDhakBtn.querySelector('.material-symbols-outlined').textContent = 'pause';
          heroDhakBtn.classList.add('bg-primary', 'text-white', 'dark:bg-amber-400', 'dark:text-black');
          showToast('Ceremonial Dhak rhythmic loop active!', 'album');
        } else {
          soundEngine.stopDhakLoop();
          heroDhakBtn.querySelector('.material-symbols-outlined').textContent = 'album';
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

        if (isMahalayaPlaying) {
          mahalayaPlayBtn.querySelector('.material-symbols-outlined').textContent = 'pause';
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
          mahalayaPlayBtn.querySelector('.material-symbols-outlined').textContent = 'play_arrow';
          if (mahalayaVisualizer) mahalayaVisualizer.classList.remove('is-playing');
          if (mahalayaContainer) {
            mahalayaContainer.innerHTML = '';
            mahalayaContainer.classList.add('hidden');
          }
        }
      });
    }
  }

  // --- 14. THEME TOGGLE (LIGHT / DARK WITH SUN <-> MOON MORPHING) ---
  function triggerCelestialThemeTransition(toDark) {
    const overlay = document.getElementById('theme-transition-overlay');
    if (!overlay) return;

    overlay.classList.remove('morph-to-dark', 'morph-to-light', 'active');
    void overlay.offsetWidth; // Force reflow

    overlay.classList.add(toDark ? 'morph-to-dark' : 'morph-to-light', 'active');

    setTimeout(() => {
      overlay.classList.remove('active');
    }, 750);
  }

  function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const savedTheme = localStorage.getItem(Storage.KEY_THEME) || 'light';

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isDark = !document.documentElement.classList.contains('dark');
        triggerCelestialThemeTransition(isDark);

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
        { name: 'Chittaranjan Sweets', dish: 'Fresh Sponge Rosogollas' }
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
        { name: 'Paramount Sherbets (College Square)', dish: 'Iconic Daab Sherbet with Tender Coconut' },
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

  // Google OAuth Login
  async function handleGoogleLogin() {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin + window.location.pathname
          }
        });
        if (error) throw error;
      } catch (err) {
        console.warn('Google OAuth notice:', err);
        // Fallback fast Google sign-in demo
        const fakeEmail = 'google.devotee@gmail.com';
        const userObj = {
          id: 'user_google_' + Date.now().toString(36),
          identifier: fakeEmail,
          identifier_type: 'google',
          username: 'Google Devotee',
          avatar: '🪷',
          custom_avatar_url: null,
          created_at: new Date().toISOString()
        };
        saveUserSession(userObj);
        closeAuthModal();
        showToast('Signed in with Google Account!', 'celebration');
        if (pendingPlanJoinId) {
          const id = pendingPlanJoinId;
          pendingPlanJoinId = null;
          handleSharedPlanDeepLink(id);
        }
      }
    } else {
      const userObj = {
        id: 'user_google_' + Date.now().toString(36),
        identifier: 'devotee@gmail.com',
        identifier_type: 'google',
        username: 'Google Devotee',
        avatar: '🪷',
        custom_avatar_url: null,
        created_at: new Date().toISOString()
      };
      saveUserSession(userObj);
      closeAuthModal();
      showToast('Signed in with Google Account!', 'celebration');
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
        <div class="glass-panel p-6 sm:p-7 rounded-3xl border border-outline-variant/30 dark:border-amber-400/25 shadow-xl flex flex-col justify-between space-y-5 relative overflow-hidden group">
          <div class="space-y-4">
            <!-- Header Day Tag & Creator Badge -->
            <div class="flex items-center justify-between flex-wrap gap-2">
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 rounded-full bg-primary/10 dark:bg-amber-400/20 text-primary dark:text-amber-300 text-xs font-bold">
                  ${plan.day_tag || 'Festive Day'}
                </span>
                ${plan.date_str ? `<span class="text-xs text-on-surface-variant/70 dark:text-[#ded5c7]/70 font-medium">${plan.date_str}</span>` : ''}
              </div>

              <!-- Creator & Member Avatars Row -->
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-surface-container-high dark:bg-[#252016] border border-secondary-container/50 dark:border-amber-400/30">
                  <span class="text-base">${plan.creator_avatar || '🌺'}</span>
                  <span class="text-xs font-bold text-on-surface dark:text-white truncate max-w-[90px]">${plan.creator_name || 'Creator'}</span>
                  <span class="creator-badge text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">Creator</span>
                </div>
              </div>
            </div>

            <!-- Title & Route -->
            <div>
              <h3 class="font-display text-xl sm:text-2xl font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-amber-300 transition-colors">
                ${plan.title}
              </h3>
              ${plan.route_summary ? `
                <div class="mt-2 text-xs font-medium text-primary dark:text-amber-300 flex items-center gap-1.5 bg-primary/5 dark:bg-amber-400/10 p-2.5 rounded-xl border border-primary/20 dark:border-amber-400/20">
                  <span class="material-symbols-outlined text-[16px] shrink-0">near_me</span>
                  <span class="truncate"><strong>Route:</strong> ${plan.route_summary}</span>
                </div>
              ` : ''}
            </div>

            <!-- Pandals to Visit -->
            <div class="space-y-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-amber-300 block">🏛️ Pandals to Visit or Watch</span>
              <div class="flex flex-wrap gap-1.5">
                ${pandalBadges || '<span class="text-xs text-on-surface-variant">No specific pandals listed</span>'}
              </div>
            </div>

            <!-- Food Pit-Stops -->
            ${foodBadges ? `
              <div class="space-y-1.5">
                <span class="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-amber-300 block">🍽️ Food & Dining Pit-Stops</span>
                <div class="space-y-1 p-2.5 rounded-xl bg-surface-container-low dark:bg-[#252016]/50 border border-outline-variant/20 dark:border-amber-400/10">
                  ${foodBadges}
                </div>
              </div>
            ` : ''}

            <!-- Joined Members Stack Display -->
            ${hasMembers ? `
              <div class="pt-2 border-t border-outline-variant/20 dark:border-amber-400/15 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-[11px] font-bold text-on-surface-variant dark:text-[#ded5c7]">Joined Devotees:</span>
                  <div class="avatar-stack">
                    ${members.map(m => `
                      <div class="w-7 h-7 rounded-full bg-surface-container border-2 border-primary dark:border-amber-400 flex items-center justify-center text-sm shadow-md" title="${m.user_name || 'Member'} (${m.role || 'Member'})">
                        ${m.user_avatar || '🪔'}
                      </div>
                    `).join('')}
                  </div>
                </div>
                <span class="text-[11px] text-primary dark:text-amber-300 font-semibold">${members.length} Friends Hopping</span>
              </div>
            ` : ''}
          </div>

          <!-- Card Actions (Share, Set Alarm, Delete) -->
          <div class="pt-3 border-t border-outline-variant/30 dark:border-amber-400/20 flex items-center gap-2">
            <button onclick="window.openSharePlanModal('${plan.id}')" class="flex-1 py-2.5 rounded-xl bg-primary dark:bg-amber-400 hover:bg-primary-container text-white dark:text-black text-xs font-bold shadow-md hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">share</span> Share with Friends
            </button>
            <button onclick="window.savePlanToItinerary('${plan.id}')" class="px-3 py-2.5 rounded-xl border border-outline-variant/40 dark:border-amber-400/30 text-on-surface dark:text-[#ded5c7] hover:border-primary dark:hover:border-amber-400 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer" title="Save Route to Itinerary">
              <span class="material-symbols-outlined text-[16px]">bookmark_add</span>
            </button>
            ${isMyPlan ? `
              <button onclick="window.deleteCustomPlan('${plan.id}')" class="px-3 py-2.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer" title="Delete Plan">
                <span class="material-symbols-outlined text-[16px]">delete</span>
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
      form.onsubmit = async () => {
        if (!currentUser) {
          openAuthModal('login');
          return;
        }

        const title = document.getElementById('plan-title-input')?.value.trim();
        const day = document.getElementById('plan-day-select')?.value || 'Maha Ashtami';
        const route = document.getElementById('plan-route-input')?.value.trim();
        const customPandals = document.getElementById('plan-custom-pandals-input')?.value.trim();
        const food = document.getElementById('plan-food-input')?.value.trim();
        const rituals = document.getElementById('plan-rituals-input')?.value.trim();

        if (!title) {
          showToast('Please provide a title for your Puja plan.', 'error');
          return;
        }

        // Collect checked pandals
        const checkedPandals = Array.from(pandalsPicker?.querySelectorAll('input[type="checkbox"]:checked') || []).map(cb => cb.value);
        if (customPandals) {
          customPandals.split(',').map(s => s.trim()).filter(Boolean).forEach(p => checkedPandals.push(p));
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

        renderFestivalPlans(activePlanFilter);
        showToast(`🎉 "${title}" created successfully! You can now share it with friends.`, 'celebration');
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
      // Must be logged in to view and join
      pendingPlanJoinId = planId;
      const gateModal = document.getElementById('shared-plan-gate-modal');
      const gateDesc = document.getElementById('gate-modal-desc');
      if (gateModal) {
        if (gateDesc) {
          gateDesc.innerHTML = `Your friend <strong>${plan ? plan.creator_name : 'a fellow devotee'}</strong> has shared their Puja plan <em>"${plan ? plan.title : 'Festival Plan'}"</em> with you! Please log in or create an account to join with your chosen Puja avatar.`;
        }
        gateModal.classList.remove('hidden');
        gateModal.classList.add('flex');
      }
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
      renderPandals('all');
      renderCuratedTrails();
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

    // Pandal Zone Filters
    document.querySelectorAll('.zone-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.zone-filter-btn').forEach(b => {
          b.classList.remove('bg-primary', 'text-on-primary', 'shadow-md', 'dark:bg-amber-400', 'dark:text-black');
          b.classList.add('bg-surface-container-high', 'text-on-surface', 'dark:bg-[#252016]', 'dark:text-[#f3ede2]');
        });
        btn.classList.add('bg-primary', 'text-on-primary', 'shadow-md', 'dark:bg-amber-400', 'dark:text-black');
        btn.classList.remove('bg-surface-container-high', 'text-on-surface', 'dark:bg-[#252016]', 'dark:text-[#f3ede2]');

        const zone = btn.dataset.zone || 'all';
        const searchInput = document.getElementById('pandal-search-input');
        renderPandals(zone, searchInput ? searchInput.value : '');
      });
    });

    // Pandal Search
    const handlePandalSearch = (e) => {
      const query = e.target.value;
      const activeZoneBtn = document.querySelector('.zone-filter-btn.bg-primary, .zone-filter-btn.dark\\:bg-amber-400');
      const zone = activeZoneBtn ? activeZoneBtn.dataset.zone : 'all';
      renderPandals(zone, query);
    };
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

    const handleFoodShopSearch = (e) => {
      const query = e.target.value;
      const activeFilterBtn = document.querySelector('.food-filter-btn.bg-primary, .food-filter-btn.dark\\:bg-amber-400');
      const filter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
      renderFoodAndShopping(filter, query);
    };
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
