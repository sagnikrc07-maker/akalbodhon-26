/**
 * Akalbodhon — Festival Guide
 * Core Reactive Controller, Sound Synthesizer, Routing, Scroll Reveal & Data Store
 */

(function () {
  'use strict';

  // --- 1. DATA COLLECTIONS ---

  // 20 Iconic Durga Puja Pandals with Authentic High-Resolution Images & Google Maps
  const PANDALS_DATA = [
    {
      id: 'bagbazar-sarbojonin',
      name: 'Bagbazar Sarbojonin',
      zone: 'North',
      theme: 'Traditional Sabeki Ekchala Idol with Pure Silver Daaker Saaj',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Bagbazar_Sarbojanin_Arnab_Dutta_2010.JPG',
      crowd: 'Heavy Crowd',
      crowdLevel: 'high',
      transit: 'Shyambazar Metro (5 min walk)',
      transitType: 'metro',
      estYear: '1919 (100+ years)',
      highlights: 'Grand immersion carnival on Dashami, Sabeki pratima, heritage ambiance on the banks of the Ganges.',
      locationUrl: 'https://maps.google.com/?q=Bagbazar+Sarbojonin+Durgotsav+Kolkata'
    },
    {
      id: 'maddox-square',
      name: 'Maddox Square',
      zone: 'South',
      theme: 'Open-air Heritage Puja & Cultural Adda Epicenter',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Durga_Puja_pandal_decorations_in_Kolkata.jpg',
      crowd: 'Moderate Crowd',
      crowdLevel: 'medium',
      transit: 'Rabindra Sadan / Netaji Bhavan Metro (10 min walk)',
      transitType: 'metro',
      estYear: '1935',
      highlights: 'Sprawling park with traditional sabeki lighting, youth adda epicenter, live acoustic music.',
      locationUrl: 'https://maps.google.com/?q=Maddox+Square+Durga+Puja+Kolkata'
    },
    {
      id: 'sreebhumi-sporting',
      name: 'Sreebhumi Sporting Club',
      zone: 'East',
      theme: 'Majestic Architectural Wonder & Royal Palace Replica',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Sreebhumi_Durga_Puja_2022.jpg',
      crowd: 'Heavy Crowd',
      crowdLevel: 'high',
      transit: 'Lake Town Crossing (VIP Road Auto / Bus)',
      transitType: 'bus',
      estYear: '1969',
      highlights: 'Diamond and pure gold ornamented Goddess idol, breathtaking architectural replica with dynamic laser light show.',
      locationUrl: 'https://maps.google.com/?q=Sreebhumi+Sporting+Club+VIP+Road+Kolkata'
    },
    {
      id: 'ekdalia-evergreen',
      name: 'Ekdalia Evergreen Club',
      zone: 'South',
      theme: 'South Indian Temple Architecture Replica & German Chandelier',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Colorful_Durga_Puja_pandal_decorations_from_Kolkata.jpg',
      crowd: 'Moderate Crowd',
      crowdLevel: 'medium',
      transit: 'Gariahat Junction / Ballygunge Phari (7 min walk)',
      transitType: 'metro',
      estYear: '1945',
      highlights: 'Glorious illuminated chandeliers, authentic South Indian temple art style with traditional idol.',
      locationUrl: 'https://maps.google.com/?q=Ekdalia+Evergreen+Club+Gariahat+Kolkata'
    },
    {
      id: 'college-square',
      name: 'College Square',
      zone: 'Central',
      theme: 'Spectacular Water Reflection & Historic Illumination',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Vibrant_decorations_at_a_Durga_Puja_pandal_in_Kolkata.jpg',
      crowd: 'Heavy Crowd',
      crowdLevel: 'high',
      transit: 'Central / Mahatma Gandhi Road Metro (5 min walk)',
      transitType: 'metro',
      estYear: '1948',
      highlights: 'Huge illuminated lake reflecting thousands of synchronized bulbs, traditional idol by Sanatan Rudra Pal.',
      locationUrl: 'https://maps.google.com/?q=College+Square+Durga+Puja+Kolkata'
    },
    {
      id: 'suruchi-sangha',
      name: 'Suruchi Sangha (New Alipore)',
      zone: 'South',
      theme: 'Indian Cultural Diversity & Sustainable Craftsmanship',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Suruchi_Sangha_Durga_Puja_2019.jpg',
      crowd: 'Moderate Crowd',
      crowdLevel: 'medium',
      transit: 'Majerhat Station / Taratala Metro (8 min walk)',
      transitType: 'metro',
      estYear: '1954',
      highlights: 'Different Indian state craftsmanship themes annually, sustainable eco-friendly materials and soulful folk music.',
      locationUrl: 'https://maps.google.com/?q=Suruchi+Sangha+New+Alipore+Kolkata'
    },
    {
      id: 'sovabazar-rajbari',
      name: 'Sovabazar Rajbari',
      zone: 'North',
      theme: 'Aristocratic 18th-Century Bonedi Bari Heritage Courtyard',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
      crowd: 'Low Crowd',
      crowdLevel: 'low',
      transit: 'Sovabazar Sutanuti Metro (2 min walk)',
      transitType: 'metro',
      estYear: '1757 (Started by Raja Nabakrishna Deb)',
      highlights: 'Historical Natmandir open courtyard, canonical Vaishnava-Shakta rituals, peaceful aristocratic devotion.',
      locationUrl: 'https://maps.google.com/?q=Sovabazar+Rajbari+Kolkata'
    },
    {
      id: 'fd-block-salt-lake',
      name: 'FD Block Salt Lake',
      zone: 'East',
      theme: 'Monumental Conceptual Architecture & Festive Fairground',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Durga_Puja_Pandal_in_Salt_Lake%2C_Kolkata_2019.jpg',
      crowd: 'Low Crowd',
      crowdLevel: 'low',
      transit: 'Karunamoyee / Central Park Metro (6 min walk)',
      transitType: 'metro',
      estYear: '1985',
      highlights: 'Wide open green grounds, child-friendly walking avenues, vibrant Sharodiya fairgrounds and artisan stalls.',
      locationUrl: 'https://maps.google.com/?q=FD+Block+Durga+Puja+Salt+Lake+Kolkata'
    },
    {
      id: 'tridhara-sammilani',
      name: 'Tridhara Sammilani',
      zone: 'South',
      theme: 'Avant-Garde Installation Art & Contemporary Aesthetics',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Tridhara_Sammilani_Durga_Puja_2016_39.jpg',
      crowd: 'Moderate Crowd',
      crowdLevel: 'medium',
      transit: 'Kalighat / Jatin Das Park Metro (10 min walk)',
      transitType: 'metro',
      estYear: '1947',
      highlights: 'Thought-provoking environmental themes, artistic sculpture craftsmanship, seamlessly blended lights.',
      locationUrl: 'https://maps.google.com/?q=Tridhara+Sammilani+Manoharpukur+Road+Kolkata'
    },
    {
      id: 'kumartuli-park',
      name: 'Kumartuli Park',
      zone: 'North',
      theme: 'Homage to the Master Sculptors & Clay Artisans',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/DurgaPuja2022_-_Durga_Idol_of_Kumartuli_Park_29.jpg',
      crowd: 'Moderate Crowd',
      crowdLevel: 'medium',
      transit: 'Sovabazar Sutanuti Metro (8 min walk)',
      transitType: 'metro',
      estYear: '1995',
      highlights: 'Located adjacent to the world-famous clay idol sculpting alleys of Kumartuli; sublime idol craftsmanship.',
      locationUrl: 'https://maps.google.com/?q=Kumartuli+Park+Durga+Puja+Kolkata'
    },
    {
      id: 'santosh-mitra-square',
      name: 'Santosh Mitra Square (Lebutala)',
      zone: 'Central',
      theme: 'High-Tech Laser Light Show & Grand Monumental Facade',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Durga_Puja_Pandal_in_Kolkata%2C_2023_07.jpg',
      crowd: 'Heavy Crowd',
      crowdLevel: 'high',
      transit: 'Central / Sealdah Metro (8 min walk)',
      transitType: 'metro',
      estYear: '1936',
      highlights: 'Nationally famous for opulent thematic structures, synchronized sphere lighting, and 3D architectural mapping.',
      locationUrl: 'https://maps.google.com/?q=Santosh+Mitra+Square+Kolkata'
    },
    {
      id: 'mohammad-ali-park',
      name: 'Mohammad Ali Park',
      zone: 'Central',
      theme: 'Palatial Heritage Monuments & Classical Illuminations',
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/DurgaPuja2017_-_Pandal_of_Mohammad_Ali_Park_08.jpg',
      crowd: 'Heavy Crowd',
      crowdLevel: 'high',
      transit: 'Mahatma Gandhi Road Metro (3 min walk)',
      transitType: 'metro',
      estYear: '1969',
      highlights: 'Intricate replicas of historic Indian palaces with vibrant Chandannagar lighting surrounding a central water body.',
      locationUrl: 'https://maps.google.com/?q=Mohammad+Ali+Park+Durga+Puja+Kolkata'
    },
    {
      id: 'mudiali-club',
      name: 'Mudiali Club',
      zone: 'South',
      theme: 'Traditional Environmental Motifs & Golden Illumination',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Mudiali_club_Durga_puja_kolkata_2019_IMG_20191005_125557_04.jpg',
      crowd: 'Moderate Crowd',
      crowdLevel: 'medium',
      transit: 'Rabindra Sarobar / Kalighat Metro (5 min walk)',
      transitType: 'metro',
      estYear: '1935',
      highlights: 'Multi-award-winning aesthetic lighting, traditional idols, and organic natural art installations.',
      locationUrl: 'https://maps.google.com/?q=Mudiali+Club+Southern+Avenue+Kolkata'
    },
    {
      id: 'shiv-mandir',
      name: 'Shiv Mandir Sarbojonin',
      zone: 'South',
      theme: 'Sacred Vedic Architecture & Ethereal Sound Design',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Durga_Puja_Pandal_in_Kolkata%2C_2023_02.jpg',
      crowd: 'Moderate Crowd',
      crowdLevel: 'medium',
      transit: 'Rabindra Sarobar Metro / Lake Market (4 min walk)',
      transitType: 'metro',
      estYear: '1936',
      highlights: 'Adjacent to Rabindra Sarobar Lake, famous for intricate artistic idols and meditative soundscapes.',
      locationUrl: 'https://maps.google.com/?q=Shiv+Mandir+Durga+Puja+Lake+Temple+Road+Kolkata'
    },
    {
      id: 'singhi-park',
      name: 'Singhi Park Sarbojanin',
      zone: 'South',
      theme: 'Classical Indian Temple Heritage & Grand Chandeliers',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Durga_Puja_Idol_at_Singhi_Park%2C_Kolkata.jpg',
      crowd: 'Moderate Crowd',
      crowdLevel: 'medium',
      transit: 'Gariahat Junction / Dover Lane (5 min walk)',
      transitType: 'metro',
      estYear: '1941',
      highlights: 'Imposing replica of ancient Indian stone temples with classical sabeki pratima and Chandannagar lighting.',
      locationUrl: 'https://maps.google.com/?q=Singhi+Park+Durga+Puja+Dover+Lane+Kolkata'
    },
    {
      id: 'chetla-agrani',
      name: 'Chetla Agrani Club',
      zone: 'South',
      theme: 'Soulful Bengal Folk Heritage & Terracotta Mastery',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Durga_Puja_Pandal_at_Chetla_Agrani%2C_Kolkata.jpg',
      crowd: 'Heavy Crowd',
      crowdLevel: 'high',
      transit: 'Kalighat / Rashbehari Metro (10 min walk)',
      transitType: 'metro',
      estYear: '1959',
      highlights: 'Intricate handcrafted rural Bengal folk art, sculpted clay walls, and master-crafted deity idols.',
      locationUrl: 'https://maps.google.com/?q=Chetla+Agrani+Club+Kolkata'
    },
    {
      id: 'ahiritola-sarbojonin',
      name: 'Ahiritola Sarbojonin',
      zone: 'North',
      theme: 'Heritage Riverfront Cultural Art & Societal Narratives',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/DurgaPuja2022_-_Durga_Puja_Pandal_of_Ahiritola_Sarbojonin_22.jpg',
      crowd: 'Moderate Crowd',
      crowdLevel: 'medium',
      transit: 'Sovabazar Sutanuti Metro / Ahiritola Launch Ghat (5 min walk)',
      transitType: 'metro',
      estYear: '1940',
      highlights: 'Historic North Kolkata riverfront puja celebrated for thought-provoking social themes and artisanal artistry.',
      locationUrl: 'https://maps.google.com/?q=Ahiritola+Sarbojanin+Durgotsab+Kolkata'
    },
    {
      id: 'hatibagan-sarbojonin',
      name: 'Hatibagan Sarbojonin',
      zone: 'North',
      theme: '90+ Years of Traditional Bengali Craftsmanship & Weaves',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Hatibagan_Sarbojanin_Durga_Puja_Idol.jpg',
      crowd: 'Moderate Crowd',
      crowdLevel: 'medium',
      transit: 'Shyambazar Metro / Hatibagan Market (3 min walk)',
      transitType: 'metro',
      estYear: '1935',
      highlights: 'Located in the historic theatre district, highlighting Bengal\'s rich handloom weaving traditions.',
      locationUrl: 'https://maps.google.com/?q=Hatibagan+Sarbojanin+Durgotsav+Kolkata'
    },
    {
      id: 'dum-dum-park-bharat-chakra',
      name: 'Dum Dum Park Bharat Chakra',
      zone: 'East',
      theme: 'Contemporary Installation Art & Multi-Sensory Environment',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Durga_Puja_Pandal_at_Dum_Dum_Park_Bharat_Chakra.jpg',
      crowd: 'Moderate Crowd',
      crowdLevel: 'medium',
      transit: 'Dum Dum Metro / Nagerbazar Auto (10 min ride)',
      transitType: 'metro',
      estYear: '2001',
      highlights: 'Stunning modern conceptual art installations with synchronized ambient acoustics and artistic lighting.',
      locationUrl: 'https://maps.google.com/?q=Dum+Dum+Park+Bharat+Chakra+Kolkata'
    },
    {
      id: 'tala-prattoy',
      name: 'Tala Prattoy',
      zone: 'North',
      theme: 'Pure Architectural Modernism & Experimental Sculpture',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Durga_Puja_Idol_at_Tala_Prattoy_Kolkata.jpg',
      crowd: 'Heavy Crowd',
      crowdLevel: 'high',
      transit: 'Shyambazar / Belgachia Metro (8 min walk)',
      transitType: 'metro',
      estYear: '1963',
      highlights: 'Global award-winning monumental public art installations curated by leading Indian contemporary artists.',
      locationUrl: 'https://maps.google.com/?q=Tala+Prattoy+Durga+Puja+Kolkata'
    }
  ];

  // 12 Iconic Kolkata Food Destinations
  const FOOD_DATA = [
    {
      id: 'food-1',
      name: 'Arsalan Restaurant',
      category: 'biryani',
      categoryLabel: 'Kolkata Biryani & Mughlai',
      location: 'Park Circus 7-Point Crossing',
      metro: 'Park Circus / Rabindra Sadan Metro (Auto link)',
      desc: 'Legendary fragrant long-grain basmati biryani with melt-in-mouth mutton, giant spiced potato, and rich Chicken Chaap.',
      mustTry: 'Mutton Special Biryani, Chicken Chaap & Shahi Firni',
      timings: '11:00 AM - 4:00 AM (Open All Night during Puja)',
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
      timings: '12:00 PM - 11:30 PM',
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
      timings: '4:00 PM - 11:00 PM',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Mitra+Cafe+Shyambazar+Kolkata'
    },
    {
      id: 'food-4',
      name: 'Peter Cat',
      category: 'food',
      categoryLabel: 'Park Street Continental Icon',
      location: 'Park Street (Mother Teresa Sarani)',
      metro: 'Park Street Metro (3 min walk)',
      desc: 'Calcutta\'s most iconic dining room, globally famous for buttered aromatic rice served with grilled chicken/mutton skewers, egg, and sizzling platters.',
      mustTry: 'Original Chelo Kebab & Sizzling Steaks',
      timings: '11:30 AM - 11:30 PM',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Peter+Cat+Park+Street+Kolkata'
    },
    {
      id: 'food-5',
      name: 'Flurys',
      category: 'sweets',
      categoryLabel: '1927 British Heritage Tearoom',
      location: 'Park Street',
      metro: 'Park Street Metro (4 min walk)',
      desc: 'Established in 1927, this European tearoom is quintessential Kolkata nostalgia for morning English breakfast, rum balls, and pastries.',
      mustTry: 'Heritage Full English Breakfast, Rum Balls & Viennese Pastries',
      timings: '7:30 AM - 11:00 PM',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Flurys+Park+Street+Kolkata'
    },
    {
      id: 'food-6',
      name: '6 Ballygunge Place',
      category: 'bengali',
      categoryLabel: 'Authentic Bengali Fine Dining',
      location: 'Ballygunge / Sector V',
      metro: 'Ballygunge Phari / Gariahat (5 min walk)',
      desc: 'Housed in a 100-year-old white colonial bungalow, offering aristocratic Bengali recipes from Thakur Bari (Tagore household) archives.',
      mustTry: 'Daab Chingri (Prawns in tender coconut), Bhetki Paturi & Grand Thali',
      timings: '12:00 PM - 11:00 PM',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=6+Ballygunge+Place+Kolkata'
    },
    {
      id: 'food-7',
      name: 'Paramount Cold Drinks & Syrups',
      category: 'sweets',
      categoryLabel: '1918 Freedom Era Sherbet Oasis',
      location: 'College Street (Near College Square)',
      metro: 'Central / MG Road Metro (4 min walk)',
      desc: 'Historic 1918 sherbet joint frequented by Subhas Chandra Bose and Satyajit Ray; cooling oasis during hot afternoon pandal walks.',
      mustTry: 'Daab Sherbet (Tender coconut with secret spices), Passion Fruit & Malai Sherbet',
      timings: '11:00 AM - 10:00 PM',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Paramount+Cold+Drinks+College+Street+Kolkata'
    },
    {
      id: 'food-8',
      name: 'Balaram Mullick & Radharaman Mullick',
      category: 'sweets',
      categoryLabel: 'Centuries of Sweetmaking Mastery',
      location: 'Bhowanipore / Salt Lake / Gariahat',
      metro: 'Netaji Bhavan Metro (3 min walk)',
      desc: 'Since 1885, pioneers of revolutionary confectionery, creating melt-in-mouth fusion and classical sandesh sweets.',
      mustTry: 'Baked Rosogolla, Mishti Doi, Mango Gelato Sandesh & Nolen Gur Soufflé',
      timings: '8:00 AM - 11:00 PM',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Bengali_sandesh_Kolkata_-_West_Bengal_-_DSC_0044.jpg',
      locationUrl: 'https://maps.google.com/?q=Balaram+Mullick+Radharaman+Mullick+Bhowanipore+Kolkata'
    },
    {
      id: 'food-9',
      name: 'Nizam\'s',
      category: 'food',
      categoryLabel: 'Birthplace of the Kathi Roll',
      location: 'New Market (Hogg Street / Esplanade)',
      metro: 'Esplanade Metro (5 min walk)',
      desc: 'The historic restaurant that invented the Kathi Roll in 1932: smoky kebabs wrapped in flaky parathas with chopped onions and lime.',
      mustTry: 'Double Mutton Single Egg Kathi Roll & Beef/Chicken Kebabs',
      timings: '11:00 AM - 11:30 PM',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Paneer_kathi_roll_homemade.jpg',
      locationUrl: 'https://maps.google.com/?q=Nizam+Restaurant+New+Market+Kolkata'
    },
    {
      id: 'food-10',
      name: 'Dacre Lane (Decker\'s Lane)',
      category: 'food',
      categoryLabel: 'Kolkata\'s Street Food Mecca',
      location: 'Esplanade / BBD Bagh',
      metro: 'Chandni Chowk / Esplanade Metro (3 min walk)',
      desc: 'Legendary office alleyway acclaimed by UNESCO for historic street cuisine, led by Chittoda\'s pepper-infused chicken stew.',
      mustTry: 'Chittoda\'s Chicken Stew with Butter Toast, Fish Fingers & Mutton Toast',
      timings: '9:00 AM - 9:30 PM',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Dacres+Lane+Esplanade+Kolkata'
    },
    {
      id: 'food-11',
      name: 'Bhojohori Manna',
      category: 'bengali',
      categoryLabel: 'Grand Homestyle Bengali Feast',
      location: 'Gariahat / Sector V / Hatibagan',
      metro: 'Gariahat Crossing (2 min walk)',
      desc: 'Named after Manna Dey\'s famous song, serving authentic homestyle seasonal fish curries, kosha dishes, and Gobindobhog delicacies.',
      mustTry: 'Ilish Bhapa, Chingri Malai Curry, Kacha Lonka Murgi & Chitol Muitha',
      timings: '12:00 PM - 10:30 PM',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Bhojohori+Manna+Gariahat+Kolkata'
    },
    {
      id: 'food-12',
      name: 'Community Pandal Mahabhog',
      category: 'bengali',
      categoryLabel: 'Sacred Divine Prasadam',
      location: 'All Major Community Pandals (Bagbazar, Maddox, College Sq)',
      metro: 'Nearest Metro to any major pandal',
      desc: 'Sacred festive prasad cooked with pure desi ghee and fragrant Gobindobhog rice, served on sal leaves to thousands of devotees.',
      mustTry: 'Bhoger Khichuri, Labra (Mixed Veg), Beguni, Plastic Chutney & Nolen Gur Payesh',
      timings: '1:30 PM - 3:30 PM (Saptami to Navami)',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
      locationUrl: 'https://maps.google.com/?q=Bagbazar+Sarbojonin+Durgotsav+Kolkata'
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
      date: 'Tarpan & Agomoni Invocation',
      time: '04:00 AM - 07:30 AM',
      rituals: ['Birendra Krishna Bhadra Chandi Path', 'Ganga Tarpan for ancestors', 'Chokkhu Daan (Painting Deity Eyes)'],
      significance: 'Marks the descent of the Divine Mother Durga onto earth.'
    },
    {
      day: 'Maha Shasthi',
      tithi: 'Shasthi Tithi',
      date: 'Bodhon & Adhivas',
      time: '06:30 PM - 09:00 PM',
      rituals: ['Devi Bodhon under Bilva tree', 'Amontron and Adhivas rituals', 'Unveiling of the divine idols'],
      significance: 'Formal awakening and welcome of Goddess Durga and her children.'
    },
    {
      day: 'Maha Saptami',
      tithi: 'Saptami Tithi',
      date: 'Kola Bou Snan & Prana Pratishtha',
      time: '06:00 AM - 10:30 AM',
      rituals: ['Nabapatrika (Kola Bou) river bathing procession', 'Prana Pratishtha consecration', 'Saptami Pushpanjali'],
      significance: 'Infusion of vital divine breath into the idols and worship of nine sacred plants.'
    },
    {
      day: 'Maha Ashtami',
      tithi: 'Ashtami & Sandhi Tithi',
      date: 'Kumari Puja & Sandhi Puja (Peak Ritual)',
      time: 'Pushpanjali: 10:00 AM | Sandhi Puja: 05:48 PM',
      rituals: ['Mass Pushpanjali in pristine attire', 'Kumari Puja (worship of prepubescent girl as Shakti)', '108 lotus offering & 108 clay lamps lit for Sandhi Puja'],
      significance: 'The precise sacred junction when Devi Chamunda vanquished Chanda and Munda.'
    },
    {
      day: 'Maha Navami',
      tithi: 'Navami Tithi',
      date: 'Maha Aarti & Dhunuchi Naach',
      time: '11:00 AM - 08:30 PM',
      rituals: ['Navami Homa / Yajna', 'High-energy Dhunuchi dance competitions to fiery Dhak beats', 'Daridra Narayana Seva'],
      significance: 'Culmination of the cosmic battle of Good against Mahishasura.'
    },
    {
      day: 'Vijaya Dashami',
      tithi: 'Dashami Tithi',
      date: 'Sindoor Khela & Immersion (Bishorjon)',
      time: 'Sindoor Khela: 11:30 AM | Immersion: 04:00 PM onwards',
      rituals: ['Devi Baran and Sindoor Khela among women', 'Kola Koli (warm embrace of universal brotherhood)', 'Ganga Immersion carnival & chanting "Asche Bochor Abar Hobe"'],
      significance: 'Devi returns to Mount Kailash. Celebration of peace, sweets, and sweet anticipation.'
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

  // --- 5. APPLE-STYLE SCROLL REVEAL OBSERVER ---
  let scrollObserver = null;

  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));
      return;
    }

    if (scrollObserver) {
      scrollObserver.disconnect();
    }

    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      scrollObserver.observe(el);
    });
  }

  // --- 6. REAL-TIME FESTIVAL COUNTDOWN TO AKALBODHON ---
  function initCountdown() {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    // Akalbodhon / Maha Shasthi target: 16 October 2026, 6:30 PM
    const targetDate = new Date(2026, 9, 16, 18, 30, 0);

    function update() {
      const current = new Date();
      let diff = targetDate - current;

      if (diff <= 0) {
        // Dynamic next year fallback
        const nextYearTarget = new Date(current.getFullYear() + 1, 9, 16, 18, 30, 0);
        diff = nextYearTarget - current;
      }

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
      const crowdBadgeClass = pandal.crowdLevel === 'high'
        ? 'bg-error text-on-error'
        : pandal.crowdLevel === 'medium'
        ? 'bg-secondary-container text-on-secondary-container dark:bg-amber-400 dark:text-black'
        : 'bg-emerald-700 text-white dark:bg-emerald-600';

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
            <div class="absolute top-3 right-3 ${crowdBadgeClass} px-3 py-1 rounded-full font-label-sm text-xs font-semibold flex items-center gap-1.5 shadow-md">
              <span class="material-symbols-outlined text-[15px]">groups</span> ${pandal.crowd}
            </div>
            <div class="absolute bottom-3 left-3 bg-surface/95 dark:bg-[#12100a]/95 backdrop-blur-md text-primary dark:text-amber-300 px-3 py-1 rounded-full font-label-sm text-xs font-bold border border-outline-variant/40 dark:border-amber-400/30 shadow-sm">
              ${pandal.zone} Zone • Est. ${pandal.estYear}
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
              >
                <span class="material-symbols-outlined text-[16px]">near_me</span> Get Directions
              </a>
              <button 
                class="pandal-bookmark-btn w-10 h-10 border border-outline-variant/50 dark:border-amber-400/30 hover:border-primary rounded-xl flex items-center justify-center transition-colors ${isSaved ? 'text-primary dark:text-amber-300 bg-primary/10 dark:bg-amber-400/20' : 'text-on-surface-variant dark:text-[#ded5c7] hover:text-primary dark:hover:text-amber-300'}"
                data-id="${pandal.id}"
                title="${isSaved ? 'Remove from saved' : 'Save to Itinerary'}"
              >
                <span class="material-symbols-outlined text-[20px]">${isSaved ? 'bookmark' : 'bookmark_border'}</span>
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

        btn.querySelector('.material-symbols-outlined').textContent = isSaved ? 'bookmark' : 'bookmark_border';
        btn.classList.toggle('text-primary', isSaved);
        btn.classList.toggle('dark:text-amber-300', isSaved);
        btn.classList.toggle('bg-primary/10', isSaved);

        soundEngine.playBell();
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
                <div class="absolute bottom-3 left-3 bg-surface/95 dark:bg-[#12100a]/95 backdrop-blur-md text-primary dark:text-amber-300 px-3 py-1 rounded-full font-label-sm text-xs font-bold border border-outline-variant/40 dark:border-amber-400/30 shadow-sm flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">schedule</span> ${food.timings}
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
                    <span class="material-symbols-outlined text-[16px]">near_me</span> Get Directions
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
                    <span class="material-symbols-outlined text-[16px]">near_me</span> Get Directions
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

    container.innerHTML = RITUALS_DATA.map((rit, idx) => `
      <div class="relative pl-8 md:pl-10 pb-8 last:pb-0 border-l-2 border-primary/20 dark:border-amber-400/40 group reveal-on-scroll reveal-delay-${(idx % 4) + 1}">
        <div class="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary dark:bg-amber-400 text-on-primary dark:text-black flex items-center justify-center ring-4 ring-surface dark:ring-[#12100a] font-bold text-xs shadow-md">
          ${idx + 1}
        </div>
        <div class="glass-panel p-6 rounded-2xl border border-outline-variant/30 dark:border-amber-400/25 hover:shadow-lg transition-all">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
            <div>
              <span class="text-xs uppercase tracking-widest text-primary dark:text-amber-300 font-bold">${rit.tithi}</span>
              <h3 class="font-headline-md text-2xl text-on-surface dark:text-white font-bold">${rit.day} — ${rit.date}</h3>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 dark:bg-amber-400/20 text-secondary dark:text-amber-200 text-xs font-bold self-start md:self-auto border dark:border-amber-400/30">
              <span class="material-symbols-outlined text-[15px]">schedule</span> ${rit.time}
            </div>
          </div>
          <p class="text-on-surface-variant dark:text-[#ded5c7] text-sm italic mb-4">${rit.significance}</p>
          <div class="space-y-2">
            <h4 class="font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-amber-300">Prescribed Ceremonies:</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              ${rit.rituals.map(r => `
                <div class="flex items-center gap-2 text-sm text-on-surface dark:text-[#f3ede2] bg-surface-container-low dark:bg-[#282217] p-2.5 rounded-lg border dark:border-amber-400/10 font-medium">
                  <span class="material-symbols-outlined text-[16px] text-primary dark:text-amber-300">check_circle</span>
                  <span>${r}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `).join('');

    initScrollReveal();
  }

  // --- 10. RENDER SAVED ITINERARY ---
  function renderSavedItinerary() {
    const container = document.getElementById('saved-itinerary-container');
    const countBadge = document.getElementById('saved-count-badge');
    const bookmarks = Storage.getBookmarks();

    if (countBadge) {
      countBadge.textContent = bookmarks.length;
      countBadge.classList.toggle('hidden', bookmarks.length === 0);
    }

    if (!container) return;

    if (bookmarks.length === 0) {
      container.innerHTML = `
        <div class="text-center py-16 glass-panel rounded-2xl p-8 border border-outline-variant/30 dark:border-amber-400/20 max-w-lg mx-auto reveal-on-scroll">
          <span class="material-symbols-outlined text-5xl text-outline dark:text-amber-300 mb-3">bookmark_border</span>
          <h3 class="font-headline-md text-xl text-on-surface dark:text-white font-bold mb-1">Your Itinerary is Empty</h3>
          <p class="text-on-surface-variant dark:text-[#ded5c7] text-sm mb-6">Explore Pandals, Food Spots and Shopping Bazaars, and tap the bookmark icon to create your custom Puja schedule.</p>
          <div class="flex justify-center gap-3">
            <a href="#pandals" class="inline-flex items-center gap-2 bg-primary dark:bg-amber-400 hover:bg-primary-container text-on-primary dark:text-black px-6 py-2.5 rounded-full font-label-sm text-sm font-bold transition-all">
              <span class="material-symbols-outlined text-[18px]">explore</span> Explore Pandals
            </a>
            <a href="#food-shopping" class="inline-flex items-center gap-2 bg-surface-container-high dark:bg-[#252016] text-on-surface dark:text-white px-6 py-2.5 rounded-full font-label-sm text-sm font-bold transition-all border dark:border-amber-400/30">
              <span class="material-symbols-outlined text-[18px]">restaurant</span> Explore Food
            </a>
          </div>
        </div>
      `;
      initScrollReveal();
      return;
    }

    container.innerHTML = `
      <div class="flex items-center justify-between mb-6 reveal-on-scroll">
        <h3 class="font-headline-md text-xl text-on-surface dark:text-white font-bold">Bookmarked Locations (${bookmarks.length})</h3>
        <div class="flex gap-2">
          <button id="export-itinerary-btn" class="bg-surface-container-high dark:bg-[#252016] hover:bg-surface-container text-on-surface dark:text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border border-outline-variant/30 dark:border-amber-400/30">
            <span class="material-symbols-outlined text-[16px] text-primary dark:text-amber-300">file_download</span> Export JSON
          </button>
          <button id="clear-itinerary-btn" class="bg-error/10 hover:bg-error text-error hover:text-on-error px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border border-error/20">
            <span class="material-symbols-outlined text-[16px]">delete_sweep</span> Clear All
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${bookmarks.map((b, idx) => `
          <div class="glass-panel p-5 rounded-2xl border border-outline-variant/30 dark:border-amber-400/20 flex flex-col justify-between gap-4 reveal-on-scroll reveal-delay-${(idx % 4) + 1}">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-primary/10 dark:bg-amber-400/20 text-primary dark:text-amber-300 text-[11px] font-bold">${b.category || 'Pandal'}</span>
                ${b.zone ? `<span class="text-xs text-on-surface-variant dark:text-[#ded5c7]">${b.zone}</span>` : ''}
              </div>
              <h4 class="font-headline-md text-lg text-on-surface dark:text-white font-bold mb-1">${b.name}</h4>
              <p class="text-xs text-on-surface-variant dark:text-[#ded5c7] flex items-center gap-1 font-medium">
                <span class="material-symbols-outlined text-[14px] text-primary dark:text-amber-300">near_me</span> ${b.location}
              </p>
            </div>
            <div class="flex items-center justify-between gap-2 pt-3 border-t border-outline-variant/20 dark:border-amber-400/20">
              <a href="${b.link || '#'}" target="_blank" class="text-primary dark:text-amber-300 text-xs font-bold hover:underline flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">directions</span> Navigate in Maps
              </a>
              <button class="remove-single-bookmark text-outline hover:text-error dark:text-[#ded5c7] dark:hover:text-red-400 transition-colors" data-id="${b.id}">
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    document.getElementById('clear-itinerary-btn')?.addEventListener('click', () => {
      if (confirm('Clear all saved pandals and food items from your itinerary?')) {
        Storage.clearBookmarks();
        renderSavedItinerary();
        renderPandals();
        renderFoodAndShopping();
        showToast('Itinerary cleared', 'delete');
      }
    });

    document.getElementById('export-itinerary-btn')?.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(Storage.getBookmarks(), null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', 'Akalbodhon_Puja_Itinerary.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Akalbodhon Itinerary JSON exported!', 'download');
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
    const modal = document.getElementById('pandal-detail-modal');
    if (!modal) return;

    modal.querySelector('#modal-pandal-img').src = item.image;
    modal.querySelector('#modal-pandal-title').textContent = item.name;

    if (type === 'pandal') {
      modal.querySelector('#modal-pandal-zone').textContent = `${item.zone} Zone`;
      modal.querySelector('#modal-pandal-crowd').textContent = item.crowd;
      modal.querySelector('#modal-pandal-theme').textContent = item.theme;
      modal.querySelector('#modal-pandal-est').textContent = item.estYear;
      modal.querySelector('#modal-pandal-transit').textContent = item.transit;
      modal.querySelector('#modal-pandal-highlights').textContent = item.highlights;
    } else if (type === 'food') {
      modal.querySelector('#modal-pandal-zone').textContent = item.categoryLabel;
      modal.querySelector('#modal-pandal-crowd').textContent = item.timings;
      modal.querySelector('#modal-pandal-theme').textContent = item.desc;
      modal.querySelector('#modal-pandal-est').textContent = 'Historic Landmark';
      modal.querySelector('#modal-pandal-transit').textContent = `${item.location} • ${item.metro}`;
      modal.querySelector('#modal-pandal-highlights').textContent = item.mustTry;
    } else if (type === 'shop') {
      modal.querySelector('#modal-pandal-zone').textContent = item.typeLabel;
      modal.querySelector('#modal-pandal-crowd').textContent = item.bestTime;
      modal.querySelector('#modal-pandal-theme').textContent = item.desc;
      modal.querySelector('#modal-pandal-est').textContent = 'Traditional Bazaar';
      modal.querySelector('#modal-pandal-transit').textContent = `${item.location} • ${item.metro}`;
      modal.querySelector('#modal-pandal-highlights').textContent = item.highlight;
    }

    modal.querySelector('#modal-pandal-nav-btn').href = item.locationUrl;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  // --- 12. ROUTING & TAB NAVIGATION ---
  function handleRouting() {
    const hash = window.location.hash.slice(1) || 'home';
    const validSections = ['home', 'pandals', 'audio', 'food-shopping', 'rituals', 'saved'];
    const activeSection = validSections.includes(hash) ? hash : 'home';

    document.querySelectorAll('.app-section').forEach(sec => {
      sec.classList.add('hidden');
    });

    const targetEl = document.getElementById(`section-${activeSection}`);
    if (targetEl) {
      targetEl.classList.remove('hidden');
      targetEl.classList.add('tab-content');
    }

    document.querySelectorAll('[data-nav-target]').forEach(link => {
      const isTarget = link.dataset.navTarget === activeSection;
      if (isTarget) {
        link.classList.add('text-primary', 'dark:text-amber-300', 'font-bold');
        link.classList.remove('text-on-surface-variant', 'font-normal');
      } else {
        link.classList.remove('text-primary', 'dark:text-amber-300', 'font-bold');
        link.classList.add('text-on-surface-variant', 'font-normal');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (activeSection === 'saved') {
      renderSavedItinerary();
    } else if (activeSection === 'food-shopping') {
      renderFoodAndShopping();
    }

    setTimeout(initScrollReveal, 60);
  }

  // --- 13. AUDIO & SOUNDBOARD CONTROLLER ---
  function initAudioHub() {
    document.querySelectorAll('.soundboard-pad').forEach(pad => {
      pad.addEventListener('click', () => {
        const sound = pad.dataset.sound;
        pad.classList.add('is-triggered');
        setTimeout(() => pad.classList.remove('is-triggered'), 200);

        if (sound === 'dhak-dha') soundEngine.playDhakBeat('dha');
        else if (sound === 'dhak-kuti') soundEngine.playDhakBeat('kuti');
        else if (sound === 'shankha') soundEngine.playShankha();
        else if (sound === 'bell') soundEngine.playBell();
        else if (sound === 'kanshi') soundEngine.playKanshi();
      });
    });

    const heroDhakBtn = document.getElementById('dhak-btn');
    const heroDhakContainer = document.getElementById('dhak-container');
    const heroSoundRings = heroDhakContainer ? heroDhakContainer.querySelectorAll('.soundwave-ring') : [];

    if (heroDhakBtn && heroDhakContainer) {
      heroDhakBtn.addEventListener('click', () => {
        if (!soundEngine.isDhakLooping) {
          soundEngine.startDhakLoop((beatType) => {
            heroSoundRings.forEach(ring => ring.classList.remove('hidden'));
          });
          heroDhakContainer.classList.add('dhak-playing');
          heroDhakBtn.querySelector('.material-symbols-outlined').textContent = 'pause';
          heroDhakBtn.querySelector('span:last-child').textContent = 'Rhythm Active';
          showToast('Dhak rhythmic tempo started! Feel the beats of Akalbodhon.', 'music_note');
        } else {
          soundEngine.stopDhakLoop();
          heroDhakContainer.classList.remove('dhak-playing');
          heroSoundRings.forEach(ring => ring.classList.add('hidden'));
          heroDhakBtn.querySelector('.material-symbols-outlined').textContent = 'music_note';
          heroDhakBtn.querySelector('span:last-child').textContent = 'Play Dhak';
        }
      });
    }

    const playerPlayBtn = document.getElementById('player-play-btn');
    const visualizerEl = document.getElementById('audio-visualizer-container');
    let isWebPlayerActive = false;

    if (playerPlayBtn) {
      playerPlayBtn.addEventListener('click', () => {
        isWebPlayerActive = !isWebPlayerActive;
        if (isWebPlayerActive) {
          soundEngine.startDhakLoop();
          playerPlayBtn.querySelector('.material-symbols-outlined').textContent = 'pause';
          if (visualizerEl) visualizerEl.classList.add('is-playing');
          showToast('Playing: Mahishasuramardini by Birendra Krishna Bhadra', 'graphic_eq');
        } else {
          soundEngine.stopDhakLoop();
          playerPlayBtn.querySelector('.material-symbols-outlined').textContent = 'play_arrow';
          if (visualizerEl) visualizerEl.classList.remove('is-playing');
        }
      });
    }
  }

  // --- 14. THEME TOGGLE (LIGHT / DARK) ---
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
        const isDark = document.documentElement.classList.toggle('dark');
        document.documentElement.classList.toggle('light', !isDark);
        localStorage.setItem(Storage.KEY_THEME, isDark ? 'dark' : 'light');
        showToast(isDark ? 'Pandal Night High-Contrast View activated' : 'Day Parchment View activated', isDark ? 'dark_mode' : 'light_mode');
      });
    }
  }

  // --- 15. LANGUAGE SYSTEM & MODAL ---
  function initLanguageSystem() {
    const langBtn = document.getElementById('lang-toggle-btn');
    const langModal = document.getElementById('language-modal');
    const closeLangBtn = document.getElementById('close-lang-modal-btn');
    const langGrid = document.getElementById('language-grid-container');
    const langSearch = document.getElementById('lang-search-input');
    const currentLangCodeEl = document.getElementById('current-lang-code');

    const LANGUAGES = [
      { code: 'en', name: 'English', native: 'English', flag: '🌐' },
      { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🌺' },
      { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🪔' },
      { code: 'as', name: 'Assamese', native: 'অসমীয়া', flag: '🌾' },
      { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🌴' },
      { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🚩' },
      { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🥁' },
      { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🪡' },
      { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🛕' },
      { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
      { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
      { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
      { code: 'zh-CN', name: 'Chinese', native: '中文', flag: '🇨🇳' },
      { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
      { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
      { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰' }
    ];

    function renderLangGrid(filter = '') {
      if (!langGrid) return;
      const q = filter.toLowerCase().trim();
      const filtered = LANGUAGES.filter(l => l.name.toLowerCase().includes(q) || l.native.toLowerCase().includes(q) || l.code.toLowerCase().includes(q));

      langGrid.innerHTML = filtered.map(lang => `
        <button 
          class="lang-select-item flex items-center justify-between p-3 rounded-xl bg-surface-container-low dark:bg-[#252016] border border-outline-variant/30 dark:border-amber-400/20 hover:border-primary dark:hover:border-amber-400 hover:bg-primary/5 dark:hover:bg-amber-400/10 transition-all text-left group"
          data-code="${lang.code}"
          data-name="${lang.name}"
        >
          <div class="flex items-center gap-2.5">
            <span class="text-xl">${lang.flag}</span>
            <div>
              <div class="font-bold text-sm text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-amber-300 transition-colors">${lang.native}</div>
              <div class="text-[11px] text-on-surface-variant/70 dark:text-[#ded5c7]/60">${lang.name}</div>
            </div>
          </div>
          <span class="text-xs uppercase font-mono px-2 py-0.5 rounded bg-surface-container-high dark:bg-[#1a160f] text-on-surface-variant dark:text-amber-300 font-semibold">${lang.code}</span>
        </button>
      `).join('');

      document.querySelectorAll('.lang-select-item').forEach(btn => {
        btn.onclick = () => {
          const code = btn.dataset.code;
          const name = btn.dataset.name;
          if (currentLangCodeEl) currentLangCodeEl.textContent = code.toUpperCase().slice(0, 2);

          // Trigger Google Translate element if present
          const selectEl = document.querySelector('.goog-te-combo');
          if (selectEl) {
            selectEl.value = code;
            selectEl.dispatchEvent(new Event('change'));
          }

          if (langModal) langModal.classList.add('hidden');
          showToast(`Language switched to ${name}`, 'translate');
        };
      });
    }

    if (langBtn && langModal) {
      langBtn.onclick = () => {
        langModal.classList.remove('hidden');
        langModal.classList.add('flex');
        renderLangGrid();
        if (langSearch) langSearch.focus();
      };
    }

    if (closeLangBtn && langModal) {
      closeLangBtn.onclick = () => {
        langModal.classList.add('hidden');
        langModal.classList.remove('flex');
      };
    }

    if (langSearch) {
      langSearch.oninput = (e) => renderLangGrid(e.target.value);
    }
  }

  // --- 16. INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguageSystem();
    initCountdown();
    initAudioHub();

    renderPandals('all');
    renderCuratedTrails();
    renderFoodAndShopping('all');
    renderRituals();
    renderSavedItinerary();

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

    // Food & Shopping Category Filters
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

    // Food & Shopping Search
    const handleFoodShopSearch = (e) => {
      const query = e.target.value;
      const activeFilterBtn = document.querySelector('.food-filter-btn.bg-primary, .food-filter-btn.dark\\:bg-amber-400');
      const filter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
      renderFoodAndShopping(filter, query);
    };
    document.getElementById('food-shop-search-input')?.addEventListener('input', handleFoodShopSearch);

    // Social & Developer Links Dropdown Toggle
    const socialBtn = document.getElementById('social-links-btn');
    const socialDropdown = document.getElementById('social-links-dropdown');

    if (socialBtn && socialDropdown) {
      socialBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        socialDropdown.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!socialDropdown.contains(e.target) && !socialBtn.contains(e.target)) {
          socialDropdown.classList.add('hidden');
        }
      });
    }

    // Modal Close
    document.getElementById('close-pandal-modal-btn')?.addEventListener('click', () => {
      document.getElementById('pandal-detail-modal')?.classList.add('hidden');
    });

    window.addEventListener('hashchange', handleRouting);
    handleRouting();
    initScrollReveal();
  });

})();
