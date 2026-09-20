import http.server
import socketserver
import os
import json
import urllib.request
import sys
import random
import gzip
import mimetypes

PUJA_ICONS = ['🪔', '🪘', '🌺', '🔱', '📿', '🪷', '💃', '🦚', '🏺', '🔥', '🐚', '🥁', '☀️', '🌾']

# Configure UTF-8 output
if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_env_setting(key, default=""):
    val = os.environ.get(key)
    if val:
        return val.strip()
    env_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
    if os.path.exists(env_file):
        try:
            with open(env_file, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if line.startswith(f'{key}='):
                        return line.split('=', 1)[1].strip(' "\'')
        except Exception:
            pass
    return default

PORT = int(get_env_setting('PORT', '8080'))
MAX_BODY_SIZE = 1048576  # 1 MB maximum payload protection against DoS
SUPABASE_URL = get_env_setting("SUPABASE_URL", "")
SUPABASE_ANON_KEY = get_env_setting("SUPABASE_ANON_KEY", "")

ALLOWED_STATIC_EXTS = {
    '.html', '.htm', '.css', '.js', '.jpg', '.jpeg', '.png',
    '.webp', '.avif', '.svg', '.ico', '.woff', '.woff2'
}
COMPRESSIBLE_EXTS = {'.html', '.htm', '.js', '.css', '.json', '.svg', '.txt', '.xml'}

class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    daemon_threads = True
    allow_reuse_address = True

class AkalbodhonHandler(http.server.SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Content-Length', '0')
        self.end_headers()

    def do_GET(self):
        # Clean URL handling for SPA routes
        clean_path = self.path.split('?')[0].rstrip('/')
        if clean_path == '/login':
            self.path = '/login.html'
        elif clean_path in ['', '/', '/plans', '/pandals', '/rituals', '/food-shopping', '/audio', '/saved', '/account']:
            self.path = '/index.html'
        
        # API: Get Health
        if clean_path == '/api/health':
            payload = json.dumps({
                "status": "online",
                "festival": "Akalbodhon Sharodiya Durga Puja 2026",
                "supabase_project": get_env_setting('SUPABASE_PROJECT_ID', '')
            }).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Content-Length', str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return

        # API: Get Firebase Client Configuration
        if clean_path == '/api/firebase-config':
            fb_config = {
                "apiKey": get_env_setting('FIREBASE_API_KEY', ''),
                "authDomain": get_env_setting('FIREBASE_AUTH_DOMAIN', ''),
                "projectId": get_env_setting('FIREBASE_PROJECT_ID', ''),
                "storageBucket": get_env_setting('FIREBASE_STORAGE_BUCKET', ''),
                "messagingSenderId": get_env_setting('FIREBASE_MESSAGING_SENDER_ID', ''),
                "appId": get_env_setting('FIREBASE_APP_ID', ''),
                "measurementId": get_env_setting('FIREBASE_MEASUREMENT_ID', ''),
                "supabase": {
                    "url": SUPABASE_URL,
                    "anonKey": SUPABASE_ANON_KEY
                }
            }
            payload = json.dumps(fb_config).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Content-Length', str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return

        # Security: Resolve file path and enforce strict sandbox containment
        root_dir = os.path.abspath(os.getcwd())
        filepath = self.translate_path(self.path)

        if os.path.isdir(filepath):
            for index in ["index.html", "index.htm"]:
                idx_path = os.path.join(filepath, index)
                if os.path.isfile(idx_path):
                    filepath = idx_path
                    break

        abs_filepath = os.path.abspath(filepath)

        # 1. Path Traversal Defense: Ensure target is strictly inside root_dir
        if not abs_filepath.startswith(root_dir) or os.path.commonpath([abs_filepath, root_dir]) != root_dir:
            self.send_error(403, "Access Denied")
            return

        # 2. Block sensitive directories, hidden dotfiles (.git, .env), and scratch code
        rel_path = os.path.relpath(abs_filepath, root_dir)
        path_parts = rel_path.replace('\\', '/').split('/')
        for part in path_parts:
            if part.startswith('.') or part in {'scratch', '__pycache__', 'node_modules'}:
                self.send_error(404, "File not found")
                return

        # 3. Extension Allowlist: Block server scripts (.py, .sql, .sh, .bat, etc.)
        _, ext = os.path.splitext(filepath)
        ext = ext.lower()
        is_allowed = (ext in ALLOWED_STATIC_EXTS) or (ext == '.json' and os.path.basename(filepath) == 'manifest.json')
        if not is_allowed:
            self.send_error(404, "File not found")
            return

        # Static file serving with Keep-Alive, gzip compression, and caching
        if os.path.isfile(filepath):
            ctype = self.guess_type(filepath) or 'application/octet-stream'
            
            try:
                with open(filepath, 'rb') as f:
                    content = f.read()
            except OSError:
                self.send_error(404, "File not found")
                return

            accept_encoding = self.headers.get('Accept-Encoding', '')
            use_gzip = ('gzip' in accept_encoding) and (
                ext in COMPRESSIBLE_EXTS or 
                ctype.startswith(('text/', 'application/javascript', 'application/json', 'image/svg+xml'))
            )

            self.send_response(200)
            self.send_header('Content-Type', ctype)
            
            if ext in {'.html', '.htm', '.js', '.css'}:
                self.send_header('Cache-Control', 'no-cache, must-revalidate')
            else:
                self.send_header('Cache-Control', 'public, max-age=86400')
            
            if use_gzip:
                compressed = gzip.compress(content, compresslevel=6)
                self.send_header('Content-Encoding', 'gzip')
                self.send_header('Vary', 'Accept-Encoding')
                self.send_header('Content-Length', str(len(compressed)))
                self.end_headers()
                self.wfile.write(compressed)
            else:
                self.send_header('Content-Length', str(len(content)))
                self.end_headers()
                self.wfile.write(content)
            return

        self.send_error(404, "File not found")

    def do_POST(self):
        clean_path = self.path.split('?')[0]
        if clean_path == '/api/auth/devotee':
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > MAX_BODY_SIZE:
                self.send_error(413, "Payload Too Large")
                return
            if content_length <= 0:
                self.send_error(400, "Bad Request: Empty Body")
                return

            body = self.rfile.read(content_length).decode('utf-8')
            try:
                data = json.loads(body)
                identifier = data.get('identifier', '').strip()
                username = data.get('username', '').strip() or 'Devotee'
                avatar = data.get('avatar') or random.choice(PUJA_ICONS)
                user_id = data.get('id') or ('user_' + btoa_py(identifier))

                # Proxy/Sync to Supabase Profiles
                req_data = json.dumps({
                    "id": user_id,
                    "identifier": identifier,
                    "identifier_type": "email" if "@" in identifier else "phone",
                    "username": username,
                    "avatar": avatar,
                    "updated_at": "now()"
                }).encode('utf-8')

                req = urllib.request.Request(
                    f"{SUPABASE_URL}/rest/v1/profiles",
                    data=req_data,
                    headers={
                        "apikey": SUPABASE_ANON_KEY,
                        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
                        "Content-Type": "application/json",
                        "Prefer": "resolution=merge-duplicates"
                    },
                    method="POST"
                )

                with urllib.request.urlopen(req) as resp:
                    res_body = resp.read().decode('utf-8')

                payload = json.dumps({
                    "success": True,
                    "user": {
                        "id": user_id,
                        "identifier": identifier,
                        "username": username,
                        "avatar": avatar
                    }
                }).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)
            except Exception as e:
                err_payload = json.dumps({"success": False, "error": str(e)}).encode('utf-8')
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(err_payload)))
                self.end_headers()
                self.wfile.write(err_payload)
            return

        elif clean_path == '/api/chat':
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > MAX_BODY_SIZE:
                self.send_error(413, "Payload Too Large")
                return
            if content_length <= 0:
                self.send_error(400, "Bad Request: Empty Body")
                return

            body = self.rfile.read(content_length).decode('utf-8')
            try:
                data = json.loads(body)
                user_msg = data.get('message', '').strip()
                history = data.get('history', [])
                client_key = data.get('apiKey', '').strip() or self.headers.get('x-goog-api-key', '').strip()

                if not user_msg:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({"success": False, "error": "Message is required"}).encode('utf-8'))
                    return

                # Call Gemini Chat Service with Unconstrained Intelligence & Web Grounding
                reply, source, has_web = process_durga_puja_chat(user_msg, history, client_key)

                payload = json.dumps({
                    "success": True,
                    "response": reply,
                    "source": source,
                    "grounded_web": has_web
                }).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)
            except (ConnectionResetError, ConnectionAbortedError, BrokenPipeError):
                return
            except Exception as e:
                try:
                    err_payload = json.dumps({"success": False, "error": str(e)}).encode('utf-8')
                    self.send_response(500)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Content-Length', str(len(err_payload)))
                    self.end_headers()
                    self.wfile.write(err_payload)
                except Exception:
                    pass
            return

        self.send_response(404)
        self.send_header('Content-Length', '0')
        self.end_headers()

def btoa_py(s):
    import base64
    return base64.b64encode(s.encode()).decode().replace('=', '')[:16].lower()

def get_gemini_api_key(client_key=None):
    if client_key and len(client_key) > 10:
        return client_key.strip()
    env_key = os.environ.get('GEMINI_API_KEY')
    if env_key and len(env_key) > 10:
        return env_key.strip()
    # Check .env file
    env_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
    if os.path.exists(env_file):
        try:
            with open(env_file, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if line.startswith('GEMINI_API_KEY='):
                        val = line.split('=', 1)[1].strip(' "\'')
                        if val:
                            return val
        except Exception:
            pass
    return ""

def search_web_background(query):
    snippets = []
    # 1. Try DuckDuckGo HTML search for real-time web results
    try:
        url = "https://html.duckduckgo.com/html/"
        data = urllib.parse.urlencode({'q': query}).encode('utf-8')
        req = urllib.request.Request(url, data=data, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referer': 'https://html.duckduckgo.com/'
        })
        with urllib.request.urlopen(req, timeout=3.5) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            import re
            raw_matches = re.findall(r'<a class="result__snippet[^>]*>(.*?)</a>', html, re.S)
            for m in raw_matches[:3]:
                clean = re.sub(r'<[^>]+>', '', m).strip()
                if clean and clean not in snippets:
                    snippets.append(clean)
    except Exception:
        pass

    # 2. Try Wikipedia API for deep factual, cultural, and geographic grounding
    try:
        wiki_url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + urllib.parse.quote(query) + "&utf8=&format=json"
        req = urllib.request.Request(wiki_url, headers={'User-Agent': 'AkalbodhonBot/2.0 (Durga Puja Guide)'})
        with urllib.request.urlopen(req, timeout=3.0) as resp:
            wdata = json.loads(resp.read().decode('utf-8'))
            import re
            for r in wdata.get('query', {}).get('search', [])[:2]:
                clean = re.sub(r'<[^>]+>', '', r.get('snippet', '')).strip()
                if clean:
                    snippets.append(f"{r['title']}: {clean}")
    except Exception:
        pass

    return snippets

def generate_local_puja_response(query, web_snippets=None):
    q = query.lower()

    # Greetings
    if any(g in q for g in ['hi', 'hello', 'hey', 'namaste', 'nomoshkar', 'joy maa durga', 'pranam']) and len(q.split()) <= 4:
        return (
            "Joy Maa Durga! 🌺 **Nomoshkar and welcome to Akalbodhon 2026!**\n\n"
            "I am **sharod.ai**, your personal AI Guide modeled with the intelligence of Gemini. I am here to help you with:\n"
            "• 🏛️ **Finding & Filtering Pandals**: North, South, East, or Central Kolkata circuits\n"
            "• 🪔 **Vedic Rituals & Timings**: Sandhi Puja, Pushpanjali, Dhunuchi Naach\n"
            "• 🍲 **Kolkata Culinary Guide**: Legendary Biryani, Rolls, Kabiraji, and Sweets\n"
            "• 🚇 **Kolkata Metro & Transit**: Timings, nearest stations, and night schedules\n"
            "• 🌐 **Any general questions**: Culture, science, history, coding, or festival planning!\n\n"
            "👉 [Explore South Kolkata Pandals](action:nav:pandals:South) | [View Rituals](action:nav:rituals) | [Food Guide](action:nav:food-shopping)"
        )

    # South Pandals Query
    if ('south' in q and ('pandal' in q or 'zone' in q or 'best' in q or 'which' in q)) or 'tridhara' in q or 'suruchi' in q or 'maddox' in q or 'ekdalia' in q:
        res = (
            "**Top South Kolkata Durga Puja Pandals (2026)** 🏛️\n\n"
            "South Kolkata is world-renowned for monumental modern thematic architecture, museum-grade conceptual art, and electrifying carnival energy:\n\n"
            "1. **Tridhara Sammilani** (Ballygunge / Kalighat Metro): Avant-garde sensory and spatial installations that redefine contemporary installation art.\n"
            "2. **Suruchi Sangha** (New Alipore / Majerhat): Renowned for state-based cultural motifs, intricate craftsmanship, and social harmony themes.\n"
            "3. **Ekdalia Evergreen Club** (Gariahat): Glorious traditional South Indian/Rajasthani temple replicas with towering German chandeliers and eternal sabeki pratima.\n"
            "4. **Maddox Square** (Ritchie Road): The heart of Kolkata youth adda, sprawling green park lawns, and thunderous live dhaak beats.\n"
            "5. **Mudiali Club & Shiv Mandir** (Southern Avenue): Breathtaking environmental decor and ethereal lake-side lighting installations.\n"
            "6. **Badamtala Ashar Sangha** (Kalighat): A pioneer of theme puja artistry with thought-provoking architectural concepts.\n\n"
            "👉 **[Click Here to View All South Zone Pandals on Akalbodhon](action:nav:pandals:South)**\n\n"
            "*(This will automatically switch your view to Pandals and filter to South Kolkata!)*"
        )
        return res

    # North Pandals Query
    if ('north' in q and ('pandal' in q or 'zone' in q or 'best' in q or 'which' in q)) or 'bagbazar' in q or 'kumartuli' in q or 'sovabazar' in q or 'ahiritola' in q:
        return (
            "**Top North Kolkata Durga Puja Pandals (2026)** 🏛️\n\n"
            "North Kolkata preserves the pure soul, aristocracy, and heritage of traditional Durga Puja:\n\n"
            "1. **Bagbazar Sarbojanin**: The 100+ year-old benchmark of pure traditional Sabeki idol adorned in shimmering Daaker Saaj.\n"
            "2. **Kumartuli Park**: Conceptual artistic wonder created right in the heart of Kolkata's legendary idol-makers' colony.\n"
            "3. **Sovabazar Rajbari**: Historic 1757 Bonedi Bari celebration founded by Raja Nabakrishna Deb in the grand open Natmandir.\n"
            "4. **Tala Prattoy**: Landmark avant-garde contemporary art installation drawing international art critics.\n"
            "5. **Ahiritola Sarbojanin**: Heritage riverside puja famed for social themes and cultural richness.\n\n"
            "👉 **[Click Here to View All North Zone Pandals on Akalbodhon](action:nav:pandals:North)**"
        )

    # East / Salt Lake / VIP Road Pandals
    if 'east' in q or 'salt lake' in q or 'sreebhumi' in q or 'fd block' in q:
        return (
            "**Top East Kolkata & Salt Lake Pandals (2026)** 🏛️\n\n"
            "1. **Sreebhumi Sporting Club** (Lake Town / VIP Road): Spectacular royal palace architectural replicas with dazzling Chandannagar illumination.\n"
            "2. **FD Block & BJ Block** (Salt Lake): Grand community festivals with spacious park setups and high-concept creative pavilions.\n"
            "3. **Dum Dum Park Tarun Sangha & Bharat Chakra**: High-concept fine art installations and innovative socio-cultural themes.\n\n"
            "👉 **[Click Here to View All East Zone Pandals on Akalbodhon](action:nav:pandals:East)**"
        )

    # General Pandals
    if 'pandal' in q or 'zone' in q:
        return (
            "**Kolkata Durga Puja Pandal Explorer** 🌟\n\n"
            "Akalbodhon categorizes over 45+ premier pandals across all 4 major Kolkata zones with verified metro and transit routes:\n\n"
            "• **South Kolkata**: Tridhara, Suruchi Sangha, Ekdalia Evergreen, Maddox Square, Mudiali\n"
            "• **North Kolkata**: Bagbazar Sarbojanin, Kumartuli Park, Tala Prattoy, Sovabazar Rajbari\n"
            "• **East & Salt Lake**: Sreebhumi Sporting Club, FD Block Salt Lake, Dum Dum Park\n"
            "• **Heritage Rajbari**: 250+ year-old Bonedi Bari ancestral estates\n\n"
            "👉 **Direct Navigation Buttons**:\n"
            "• [Explore South Zone Pandals](action:nav:pandals:South)\n"
            "• [Explore North Zone Pandals](action:nav:pandals:North)\n"
            "• [Explore East Zone Pandals](action:nav:pandals:East)\n"
            "• [Explore Heritage Rajbari Pujas](action:nav:pandals:rajbari)"
        )

    # Rituals
    if 'ritual' in q or 'sandhi' in q or 'pushpanjali' in q or 'ashtami' in q or 'shasthi' in q or 'navami' in q or 'dashami' in q:
        return (
            "**Sacred Vedic Rituals Schedule** 🪔\n\n"
            "• **Maha Shasthi**: *Devi Bodhon* under the Bel tree awakening the Divine Mother.\n"
            "• **Maha Saptami**: *Nabapatrika Snan* (Kola Bou bathing at dawn in the holy Ganges) and *Prana Pratishtha*.\n"
            "• **Maha Ashtami**: Morning **Pushpanjali** followed by the celestial climax **Sandhi Puja** (108 blue lotuses & 108 diyas).\n"
            "• **Maha Navami**: Electrifying **Dhunuchi Naach**, Maha Yajna, and festive Bhog.\n"
            "• **Vijaya Dashami**: *Devi Baran*, vibrant *Sindoor Khela*, and bittersweet immersion (*Bhashan*).\n\n"
            "👉 **[Click Here to Explore Rituals on Akalbodhon](action:nav:rituals)**"
        )

    # Food & Dining
    if 'food' in q or 'eat' in q or 'restaurant' in q or 'biryani' in q or 'roll' in q or 'sweet' in q or 'kabiraji' in q:
        return (
            "**Iconic Kolkata Puja Food Trail** 🍲\n\n"
            "Food hopping is integral to the Durga Puja experience:\n\n"
            "• **Kolkata Biryani & Mughlai**: Arsalan (Park Circus), Oudh 1590 (Deshapriya Park), Royal Indian Hotel (Barabazar).\n"
            "• **Heritage Street Food**: Kusum Rolls (Park Street), Mitra Cafe (Mutton Kabiraji at Shyambazar), Golbari Kosha Mangsho.\n"
            "• **Bengali Sweets**: Balaram Mullick (Baked Rosogolla & Mango Sandesh), Girish Ch. Dey & Nakur Ch. Nandy.\n\n"
            "👉 **[Click Here to Open the Food & Shopping Guide](action:nav:food-shopping)**"
        )

    # Transit & Metro
    if 'metro' in q or 'transit' in q or 'train' in q or 'transport' in q:
        return (
            "**Kolkata Metro & Transit Guide** 🚇\n\n"
            "The Kolkata Metro is the fastest way to travel between pandal clusters without getting caught in road traffic:\n"
            "• **Blue Line (North-South)**: Connects Sovabazar (Bagbazar/Kumartuli), MG Road (College Sq/Central), Kalighat (Tridhara/Badamtala), and Jatin Das Park (Maddox Sq).\n"
            "• **Green Line (East-West)**: Connects Howrah Railway Station under the Hooghly river directly to Salt Lake pandals.\n"
            "• **Night Service**: Kolkata Metro operates overnight trains on Saptami, Ashtami, and Navami until 4:00 AM!\n\n"
            "👉 **[View Pandals with Nearest Metro Stations](action:nav:pandals:all)**"
        )

    # If web search snippets were retrieved in background, synthesize them
    if web_snippets:
        snippet_text = "\n".join(f"• {s}" for s in web_snippets[:3])
        return (
            f"Here is what I found regarding **'{query}'**:\n\n"
            f"{snippet_text}\n\n"
            "Feel free to ask follow-up questions, request specific pandal routes, or explore sections of the site!\n\n"
            "👉 [Explore Pandals](action:nav:pandals:all) | [Explore Rituals](action:nav:rituals) | [Food Guide](action:nav:food-shopping)"
        )

    # General Knowledge / Versatile Gemini-style response
    return (
        f"Thank you for asking about **'{query}'**! I am **sharod.ai**, your Gemini-powered assistant on Akalbodhon:\n\n"
        "I am ready to help you with detailed answers, creative suggestions, opinions, or festival navigation.\n\n"
        "• If your question is about **Durga Puja celebrations**, I can direct you to exact pandal circuits, ritual timings, or culinary hotspots.\n"
        "• If your question is general knowledge, technology, coding, or lifestyle, ask away and I will provide full solutions!\n\n"
        "👉 **Quick Navigation Links**:\n"
        "• [View South Kolkata Pandals](action:nav:pandals:South)\n"
        "• [View North Kolkata Pandals](action:nav:pandals:North)\n"
        "• [Explore Sacred Rituals](action:nav:rituals)\n"
        "• [Browse Kolkata Food Spots](action:nav:food-shopping)"
    )

def process_durga_puja_chat(user_msg, history, client_key=None):
    api_key = get_gemini_api_key(client_key)

    # 1. Real-time background web search for grounding
    web_snippets = search_web_background(user_msg)

    # 2. If no Gemini API key, use versatile local engine with web snippets
    if not api_key:
        return generate_local_puja_response(user_msg, web_snippets), "local_engine", bool(web_snippets)

    # 3. Prepare Unconstrained Gemini Prompt (Model of Google Gemini)
    system_instruction = (
        "You are sharod.ai, the intelligent AI Assistant and festival concierge modeled after Google Gemini on Akalbodhon "
        "(the premier Kolkata Durga Puja web platform).\n\n"
        "UNCONSTRAINED AI CAPABILITIES:\n"
        "1. VERSATILE & BROAD: You can answer ANY question the user asks—including general knowledge, science, coding, "
        "lifestyle, history, mathematics, philosophy, creative writing, or opinions. Do NOT restrict yourself or refuse "
        "questions simply because they are outside Durga Puja. Answer with Gemini's signature clarity, depth, and helpfulness.\n"
        "2. DURGA PUJA & BENGALI CULTURE EXPERTISE: While versatile on all topics, you have profound, vivid expertise in "
        "Kolkata Durga Puja 2026, Vedic rituals, Bonedi Bari traditions, idol sculpting in Kumartuli, culinary trails, and transit.\n"
        "3. DIRECT WEBSITE NAVIGATION ACTIONS: When answering questions regarding pandals, zones, food, rituals, radio, or itinerary, "
        "you MUST include direct clickable navigation actions in your markdown so the user can immediately jump to that section:\n"
        "   - South Pandals: `👉 [Explore South Kolkata Pandals](action:nav:pandals:South)`\n"
        "   - North Pandals: `👉 [Explore North Kolkata Pandals](action:nav:pandals:North)`\n"
        "   - East / Salt Lake Pandals: `👉 [Explore East Pandals](action:nav:pandals:East)`\n"
        "   - Central Pandals: `👉 [Explore Central Pandals](action:nav:pandals:Central)`\n"
        "   - Heritage Rajbari: `👉 [Explore Heritage Rajbari](action:nav:pandals:rajbari)`\n"
        "   - Rituals: `👉 [Explore Rituals](action:nav:rituals)`\n"
        "   - Food & Shopping: `👉 [Browse Food & Shopping](action:nav:food-shopping)`\n"
        "   - Saved Itinerary: `👉 [Open My Itinerary](action:nav:saved)`\n"
        "   - Curated Plans: `👉 [View Curated Plans](action:nav:plans)`\n"
        "   - Puja Radio: `👉 [Tune into Puja Radio](action:nav:audio)`\n"
        "4. OPINIONS & COMPARISONS: When asked for opinions (e.g. North vs South pandals, best time for Maddox Square, "
        "Biryani recommendations), provide insightful, nuanced, and culturally authentic advice.\n"
        "5. TONE: Warm, intelligent, engaging, structured with markdown bolding, bullet points, and festive Bengali warmth.\n"
        "6. FORMATTING: Use conversational paragraphs, bold highlights, and clean bullet points (•). Avoid excessive or high-numbered lists (e.g. 1., 2., 3., ...) unless the user specifically asks for step-by-step instructions or ranked top-N lists."
    )

    if web_snippets:
        system_instruction += "\n\nLIVE BACKGROUND WEB SEARCH RESULTS (Grounded Data):\n" + "\n".join(f"- {s}" for s in web_snippets)

    contents = []
    for h in (history[-6:] if history else []):
        role = "user" if h.get("role") == "user" else "model"
        text = h.get("text") or h.get("content") or ""
        if text:
            contents.append({"role": role, "parts": [{"text": text}]})

    contents.append({"role": "user", "parts": [{"text": user_msg}]})

    req_payload = {
        "system_instruction": {
            "parts": [{"text": system_instruction}]
        },
        "contents": contents,
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 1000
        }
    }

    candidate_models = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-flash-latest", "gemini-2.5-flash"]
    for model_name in candidate_models:
        gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
        try:
            req = urllib.request.Request(
                gemini_url,
                data=json.dumps(req_payload).encode('utf-8'),
                headers={
                    "Content-Type": "application/json",
                    "x-goog-api-key": api_key
                },
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=6) as resp:
                resp_data = json.loads(resp.read().decode('utf-8'))
                candidates = resp_data.get('candidates', [])
                if candidates:
                    parts = candidates[0].get('content', {}).get('parts', [])
                    if parts:
                        return parts[0].get('text', ''), f"gemini_api:{model_name}", bool(web_snippets)
        except Exception as e:
            print(f"Gemini API ({model_name}) error: {e}")
            continue

    return generate_local_puja_response(user_msg, web_snippets), "local_fallback", bool(web_snippets)


if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with ThreadedTCPServer(("0.0.0.0", PORT), AkalbodhonHandler) as httpd:
        print(f"🪔 Akalbodhon Secure Server running at http://localhost:{PORT}")
        print(f"🌺 Supabase Backend Connected: {SUPABASE_URL}")
        sys.stdout.flush()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
