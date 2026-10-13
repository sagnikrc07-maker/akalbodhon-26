import http.server
import socketserver
import os
import json
import urllib.request
import urllib.parse
import sys
import random
import gzip
import mimetypes
import re

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
        root_dir = os.path.dirname(os.path.abspath(__file__))
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
    q = query.lower().strip()

    # Domain keyword indicators
    is_food = any(k in q for k in ['food', 'eat', 'dining', 'restaurant', 'biryani', 'roll', 'kathi roll', 'sweet', 'mishti', 'kabiraji', 'bhog', 'cafe', 'dhaba', 'snack', 'phuchka', 'puchka', 'chaap'])
    is_transit = any(k in q for k in ['how to get', 'how to reach', 'how do i', 'how can i', 'direction', 'route', 'station', 'sealdah', 'howrah', 'airport', 'metro to', 'bus to', 'taxi to', 'to reach']) or (' to ' in q and not is_food)
    is_metro_general = any(k in q for k in ['metro timing', 'midnight metro', 'night metro', 'metro train', 'special train', 'subway', 'metro schedule'])
    is_attire = any(k in q for k in ['suit', 'wear', 'outfit', 'dress', 'saree', 'sari', 'dhoti', 'kurta', 'clothes', 'fashion', 'attire'])
    is_ritual = any(k in q for k in ['ritual', 'sandhi', 'pushpanjali', 'anjali', 'kumari', 'dhunuchi', 'sindoor', 'baran', 'bhashan', 'visarjan', 'bodhon', 'akalbodhon', 'nabapatrika', 'kola bou', 'chakkhudaan', 'mahalaya', 'shashthi', 'sashthi', 'shasthi', 'saptami', 'tithi', 'panjika', 'calendar', 'date', 'dates', 'schedule', 'when'])
    is_plan = any(k in q for k in ['1-day', '1 day', 'one day', 'itinerary', 'day plan', 'hop plan', 'curated plan', 'master plan'])

    # 1. SPECIAL PANDAL HOPPING ROUTE: Kumartuli to Bagbazar
    if ('kumartuli' in q and 'bagbazar' in q) and (' to ' in q or 'walk' in q or 'hop' in q or 'route' in q or 'distance' in q or is_transit):
        return (
            "**Pandal Hopping Route: Kumartuli Park ➔ Bagbazar Sarbojanin** 🚶‍♂️🪔\n\n"
            "This is one of the most iconic, scenic, and spiritually evocative walking corridors in North Kolkata:\n\n"
            "• **Distance & Walking Time**: approx. **700 meters (8–10 minutes on foot)** down Bagbazar Street / Rabindra Sarani.\n"
            "• **Step-by-Step Walking Trail**:\n"
            "  1. Start at **Kumartuli Park Sarbojanin** (beside the historic Kumartuli idol-makers' colony and launch ghat).\n"
            "  2. Walk northwards along Rabindra Sarani or through the charming riverside lane toward Bagbazar Ghat.\n"
            "  3. Turn right into **Bagbazar Street**; you will immediately feel the century-old festival fervor and smell roasted peanuts, ghugni, and hot tea.\n"
            "  4. Arrive at **Bagbazar Sarbojanin Durgotsav ground** (near Girish Mancha) to witness the pure white Daaker Saaj Sabeki idol!\n"
            "• 🛺 **Local Transit Option**: Hand-pulled rickshaws or shared e-rickshaws (Toto) are available between Kumartuli Ghat and Bagbazar 5-Point Crossing (~₹15–₹20).\n"
            "• 🌟 **Bonus Heritage Hop**: From Kumartuli, you can also walk 10 minutes south along Central Avenue to visit the historic **Sovabazar Rajbari** (1757 Natmandir)!\n\n"
            "👉 **[Explore North Kolkata Pandals](action:nav:pandals:North)** | 🗺️ [Open Google Maps Walking Trail](https://www.google.com/maps/dir/Kumartuli+Park+Durga+Puja/Bagbazar+Sarbojanin+Durga+Puja)"
        )

    # 2. SPECIFIC TRANSIT & PANDAL DIRECTIONS
    if is_transit:
        # Chetla Agrani
        if 'chetla' in q or ('agrani' in q and 'bagbazar' not in q):
            is_sealdah = 'sealdah' in q or 'sealda' in q
            is_howrah = 'howrah' in q
            is_airport = 'airport' in q or 'ccu' in q
            origin = "Sealdah Railway Station" if is_sealdah else ("Howrah Railway Station" if is_howrah else ("Kolkata Airport (CCU)" if is_airport else "Your Location"))
            
            if is_sealdah:
                metro_info = (
                    "1. 🚇 **By Kolkata Metro (Fastest & Traffic-Free)**:\n"
                    "   • **Step 1 (Green Line)**: Board the East-West Green Line at **Sealdah Metro Station** heading to **Esplanade** (1 stop / 4 mins).\n"
                    "   • **Step 2 (Underground Subway Interchange at Esplanade)**: Walk through the direct subway passage to the North-South **Blue Line** platform.\n"
                    "   • **Step 3 (Blue Line Southbound)**: Board the Southbound train (towards Kavi Subhash) and disembark at **Kalighat Metro Station** (Exit Gate 3/4 towards Rashbehari / Chetla Central Rd).\n"
                    "   • **Step 4 (Final Stretch)**: Walk **7–9 mins (~650m)** down Chetla Central Road or take a quick auto to Chetla Agrani Club.\n"
                    "   • ⏱️ *Total Travel Time*: ~22–28 mins without any surface road congestion!"
                )
            elif is_howrah:
                metro_info = (
                    "1. 🚇 **By Kolkata Metro (Underwater River Tunnel)**:\n"
                    "   • Board Green Line Metro at **Howrah Station** traveling under the Hooghly river directly to **Esplanade** in 5 minutes!\n"
                    "   • Take the underground interchange to the Blue Line Southbound and disembark at **Kalighat Metro Station**.\n"
                    "   • Walk 7 mins down Chetla Central Road to the pandal."
                )
            elif is_airport:
                metro_info = "1. 🚕 **By Taxi / Cab**: Take VIP Road ➔ Maa Flyover ➔ AJC Bose Flyover ➔ Hazra / Chetla (approx. 22 km, 45–60 mins)."
            else:
                metro_info = "1. 🚇 **By Metro**: Take the Blue Line to **Kalighat Metro Station** (Rashbehari exit) and walk 7 mins down Chetla Central Road."

            return (
                f"**Directions from {origin} to Chetla Agrani Club** 🚇🚕\n\n"
                f"{metro_info}\n\n"
                "---\n\n"
                "2. 🚕 **By Yellow Taxi / App-Cab (Uber, Ola, Yatri Sathi)**:\n"
                "   • **Corridor**: AJC Bose Road Flyover ➔ Exide Crossing / Asutosh Mukherjee Road ➔ Hazra Road or Rashbehari Avenue ➔ Chetla Central Road (~8.5 km, 25–35 mins).\n"
                "   • 💡 *Puja Pro-Tip*: After 4:00 PM, vehicular traffic on Chetla Central Road is restricted for pedestrian pandal hoppers. Ask your driver to drop you near Rashbehari Crossing or Chetla Bridge and walk the last 300 meters.\n\n"
                "3. 🚌 **By Public Bus**:\n"
                "   • Board buses towards Kalighat / Hazra / Behala (e.g. 218, 47/1 or Taratala minibuses) to Rashbehari Crossing.\n\n"
                "---\n\n"
                "### 🚶 Nearby Mega Pandals to Hop Next (Walking Cluster)\n"
                "• **Suruchi Sangha (New Alipore - right across Chetla lock-gate bridge)**\n"
                "• **Badamtala Ashar Sangha**\n"
                "• **66 Pally & Nepal Bhattacharjee Street**\n"
                "• **Mudiali Club & Shiv Mandir**\n\n"
                "👉 **[Explore South Kolkata Pandals](action:nav:pandals:South)** | 🗺️ [Open Google Maps Directions](https://www.google.com/maps/search/?api=1&query=Chetla+Agrani+Club+Durga+Puja+Kolkata)"
            )

        # Maddox Square
        if 'maddox' in q:
            return (
                "**Directions to Maddox Square (Ritchie Road / Ballygunge)** 🚇🚕\n\n"
                "1. 🚇 **By Metro**: Take the Blue Line to **Netaji Bhavan** or **Jatin Das Park** Station ➔ 8–10 minute walk down Lansdowne / Ritchie Road.\n"
                "   • *From Sealdah*: Green Line to Esplanade (1 stop) ➔ Blue Line Southbound to Netaji Bhavan (~20 mins).\n"
                "2. 🚕 **By Taxi / Cab**: Sarat Bose Road ➔ Ritchie Road entrance (~6.2 km from Sealdah).\n"
                "3. 🌳 **The Vibe**: Celebrated open park lawns, youth adda, and timeless Ekchala Sabeki Pratima with Daaker Saaj.\n\n"
                "👉 **[Explore South Kolkata Pandals](action:nav:pandals:South)** | 🗺️ [Open Google Maps](https://www.google.com/maps/search/?api=1&query=Maddox+Square+Durga+Puja+Kolkata)"
            )

        # Suruchi Sangha
        if 'suruchi' in q:
            return (
                "**Directions to Suruchi Sangha (New Alipore)** 🎨🕊️\n\n"
                "1. 🚇 **By Metro**: Take Blue Line to **Rabindra Sarobar** or **Kalighat** Metro ➔ 10 min auto to New Alipore Petrol Pump / Block SB.\n"
                "2. 🚶 **Hop from Chetla Agrani**: Suruchi Sangha is just 600m across the Chetla Lock Gate Bridge from Chetla Agrani!\n"
                "3. 🎨 **The Theme**: Famous for state-based indigenous art, vibrant cultural craftsmanship, and original musical compositions.\n\n"
                "👉 **[Explore South Kolkata Pandals](action:nav:pandals:South)**"
            )

        # Bagbazar
        if 'bagbazar' in q or 'baghbazar' in q:
            return (
                "**Directions to Bagbazar Sarbojanin Durgotsav** 🌺🪔\n\n"
                "1. 🚇 **By Metro**: Take Blue Line to **Shyambazar Metro Station** ➔ 6–8 minute walk down Bagbazar Street towards the Launch Ghat.\n"
                "   • *From Sealdah*: Green Line to Esplanade ➔ Blue Line Northbound to Shyambazar (approx. 20 mins); or direct APC Road bus.\n"
                "2. 🌺 **The Pratima**: Centenary benchmark of pure traditional Sabeki idol with serene eyes, draped in pure snow-white Daaker Saaj.\n\n"
                "👉 **[Explore North Kolkata Pandals](action:nav:pandals:North)**"
            )

    # 3. METRO & MIDNIGHT TRANSIT GUIDE
    if is_metro_general or (('metro' in q or 'train' in q) and ('timing' in q or 'night' in q or 'midnight' in q or 'schedule' in q or 'hours' in q)):
        return (
            "**Kolkata Metro & Midnight Special Trains Schedule (2026)** 🚇🎫\n\n"
            "Kolkata Metro is the ultimate lifeline for seamless, traffic-free pandal hopping during Durga Puja:\n\n"
            "• 🌙 **All-Night Special Midnight Trains**:\n"
            "  - **Saptami, Ashtami & Navami**: Overnight trains operate on the **Blue Line (Dakshineswar ➔ Kavi Subhash)** continuously until **4:00 AM**!\n"
            "  - **Train Frequency**: Every 12–15 minutes during peak midnight hopping hours (11:00 PM – 3:30 AM).\n"
            "• 🌊 **Green Line (East-West Underwater Corridor)**:\n"
            "  - Connects **Howrah Railway Station** under the Hooghly river to **Esplanade** in 5 minutes flat, continuing to Sealdah and Salt Lake Sector V.\n"
            "• 🔄 **Key Junctions**:\n"
            "  - **Esplanade Interchange**: Seamless subterranean connection between Blue Line and Green Line.\n"
            "  - **Kalighat Station**: Gateway to Chetla Agrani, Tridhara, Badamtala, and Mudiali.\n"
            "  - **Sovabazar & Shyambazar**: Lifeline for Bagbazar, Kumartuli, Ahiritola, and Rajbari circuits.\n"
            "• 💡 **Smart Ticketing Tip**: Purchase Metro QR tickets via the official app to bypass long counter queues at busy stations.\n\n"
            "👉 **[Explore Pandals with Nearest Metro Stations](action:nav:pandals:all)**"
        )

    # 4. FOOD & CULINARY TRAILS (checked BEFORE pandal spotlights so "Food near Maddox Square" works properly!)
    if is_food:
        if 'maddox' in q:
            return (
                "**Food & Adda Trail around Maddox Square (Ritchie Road)** 🍲☕\n\n"
                "Maddox Square is the epicenter of Kolkata's festive youth adda, and its culinary surroundings are legendary:\n\n"
                "• 🎪 **Inside & Around the Park Grounds**:\n"
                "  - **Phuchka & Churmur Stalls**: Crisp, tangy gondhoraj-scented phuchka stalls lining the Ritchie Road pavement.\n"
                "  - **Kolkata Kathi Rolls & Chowmein**: Sizzling Mughlai parathas, egg-chicken rolls, and spicy street noodles right outside the main gate.\n"
                "• 🥛 **Balwant Singh's Eating House (Harish Mukherjee Road, 7 mins walk)**:\n"
                "  - The world-famous **Doodh Cola** (sweet condensed milk blended with fizzy cola in tall earthen glasses)!\n"
                "  - Hot Kesar Chai served in clay bhars and freshly fried piping hot club kachoris with aloo dum.\n"
                "• 🍛 **Sarat Bose Road Dining & Cafes**:\n"
                "  - **Oudh 1590 (Deshapriya Park, 10 mins walk)**: Regal Awadhi handi biryani, Galawati kababs, and Raan Biryani.\n"
                "  - **Saptapadi (Purna Das Road)**: Authentic Bengali artisanal thali with Ilish, Chingri Malai Curry, and Kosha Mangsho.\n"
                "  - **Jai Hind Dhaba (Bhawanipore)**: Midnight Butter Naan, Chicken Bharta, and Tandoori Kebabs.\n\n"
                "👉 **[Browse Food & Shopping Guide on Akalbodhon](action:nav:food-shopping)** | [Explore South Kolkata Pandals](action:nav:pandals:South)"
            )
        elif 'biryani' in q:
            return (
                "**Legendary Kolkata Biryani & Mughlai Guide** 🍗✨\n\n"
                "Kolkata Biryani is characterized by aromatic Awadhi basmati rice, tender meat, and that melt-in-mouth golden ghee-roasted potato (*aloo*):\n\n"
                "• **Arsalan (Park Circus 7-Point / Ruby / Hatibagan)**: The gold standard of fragrant long-grain biryani and Mutton Chaap.\n"
                "• **Oudh 1590 (Deshapriya Park / Salt Lake / Naktala)**: Period dining with dum-pukht Handi Biryani and melt-in-mouth Galawati Kabab.\n"
                "• **Royal Indian Hotel (Barabazar / Park Circus)**: Authentic Lucknowi Biryani (traditionally without potato) and Mutton Pasinda since 1905.\n"
                "• **Shiraz Golden Restaurant (Mullick Bazar / Park Street)**: Famous for rich Golden Special Biryani and Chicken Rezala.\n"
                "• **Aminia (New Market / Golpark / Behala)**: Heritage Mughlai diner serving stellar Biryani and classic Mutton Awadhi.\n\n"
                "👉 **[Open Food & Nightlife Guide](action:nav:food-shopping)**"
            )
        elif 'bhog' in q:
            return (
                "**Sacred Durga Puja Bhog — Flavors of Divine Grace** 🪔🍲\n\n"
                "Consuming sacred community Bhog on Saptami, Ashtami, and Navami is the spiritual highlight of Durga Puja:\n\n"
                "• **Gobindobhog Khichuri**: Aromatic small-grain Gobindobhog rice and roasted yellow moong dal slow-cooked with whole spices and pure desi ghee.\n"
                "• **Labra**: A rich, five-spice melange of seasonal vegetables (pumpkin, raw banana, brinjal, radish, and sweet potato).\n"
                "• **Begun Bhaja**: Thick slices of eggplant seasoned with turmeric and fried to golden perfection.\n"
                "• **Chholar Dal with Narkel**: Bengal gram dal cooked with aromatic cinnamon, cloves, and fried coconut slices.\n"
                "• **Tomato-Khejur Plastic Chutney**: Translucent raw papaya and sweet date chutney seasoned with panch phoron.\n"
                "• **Payesh & Mishti Doi**: Rich thickened milk kheer and caramelized clay-pot curd.\n\n"
                "👉 **[Explore Rituals on Akalbodhon](action:nav:rituals)**"
            )
        else:
            return (
                "**Iconic Kolkata Durga Puja Culinary Trail** 🍲🍗\n\n"
                "Pandal hopping in Kolkata is incomplete without indulging in its legendary street food and heritage diners:\n\n"
                "• **Kolkata Biryani & Mughlai**: Arsalan (Park Circus), Oudh 1590 (Deshapriya Park), Royal Indian Hotel (Barabazar).\n"
                "• **Legendary Street Food**: Kusum Rolls (Park Street), Mitra Cafe (Shyambazar Mutton Kabiraji), Dacres Lane stew.\n"
                "• **Traditional Puja Bhog**: Hot Gobindobhog khichuri, begun bhaja, spiced labra, chholar dal, and sweet chutney.\n"
                "• **Heritage Bengali Sweets**: Balaram Mullick (Baked Rosogolla), Girish Ch. Dey & Nakur Ch. Nandy (Sandesh), and Chittaranjan.\n\n"
                "👉 **[Click Here to Open Food & Shopping Guide](action:nav:food-shopping)**"
            )

    # 5. ATTIRE & SARTORIAL ETIQUETTE
    if is_attire:
        if 'ashtami' in q or 'suit' in q:
            return (
                "**Wearing a Suit on Maha Ashtami — Complete Style & Tradition Guide** 👗✨\n\n"
                "**Yes, absolutely! You can definitely wear a suit on Ashtami.** Durga Puja in Kolkata is an exhilarating celebration of personal style, culture, and joyous devotion. Here is the ideal breakdown:\n\n"
                "• **Ethnic Suits (Salwar, Anarkali & Sharara)**:\n"
                "  - Traditional Indian ethnic suits (such as an embroidered Anarkali, mirror-work Sharara, or silk Salwar Kameez) are hugely popular on Ashtami. Festive hues like crimson red, rani pink, mustard yellow, royal blue, or ivory-gold look stunning.\n"
                "  - They are extraordinarily comfortable for long hours of pandal-hopping while honoring traditional festive aesthetics.\n\n"
                "• **Western Suits / Blazers**:\n"
                "  - Modern western suits, tailored blazers, or smart Indo-Western tuxedos/jackets look very chic for evening celebrations, club events, and high-end restaurant dinners.\n"
                "  - *Pro-Tip for Kolkata Weather*: Pandal grounds get very crowded and humid. If you choose a western suit or blazer, opt for lightweight, breathable fabrics like linen or cotton-blends, or wear a sleek waist-coat/Nehru jacket instead of a heavy woolen coat.\n\n"
                "• **Morning Pushpanjali Tradition**:\n"
                "  - For morning Pushpanjali (sacred flower offering), traditional ethnic attire is customary. Men traditionally wear crisp cotton/tussar Dhoti-Panjabi or Kurta-Pyjama; women wear Lal-Paad Shada Saree (white with red border) or elegant ethnic suits.\n"
                "  - In the evening and night, fashion rules are free, bold, and modern!\n\n"
                "👉 [Explore Rituals & Pushpanjali](action:nav:rituals) | [Explore South Kolkata Pandals](action:nav:pandals:South) | [Browse Food & Nightlife](action:nav:food-shopping)"
            )
        return (
            "**Durga Puja Fashion & Dress Code Guide (Day-by-Day)** 🥻👔\n\n"
            "Each day of Durga Puja has its own distinctive sartorial vibe:\n\n"
            "• **Maha Shasthi (16 Oct)**: Casual chic or contemporary Indo-Western wear to kick off the festive week.\n"
            "• **Maha Saptami (17–18 Oct)**: Vibrant handloom sarees (Tant, Dhakai Jamdani), printed kurtas, stylish co-ord sets, or smart ethnic fusion.\n"
            "• **Maha Ashtami (19 Oct)**: The grand traditional showcase! Traditional Bengali sarees (Tussar, Silk, Lal-Paad Shada), Dhoti-Kurtas, and heavy ethnic suits for morning Pushpanjali. Sleek contemporary fashion or blazers for night pandal hopping.\n"
            "• **Maha Navami (20 Oct)**: High glamor, royal silhouettes, festive gowns, Indo-western suits, and statement ethnic wear.\n"
            "• **Bijoya Dashami (21 Oct)**: Red & white sarees for *Sindoor Khela*; classic formal ethnic or crisp white kurtas for *Bijoya Shubhechha*.\n\n"
            "👉 [Explore Rituals](action:nav:rituals) | [View Pandals](action:nav:pandals:all)"
        )

    # 6. SACRED VEDIC RITUALS & OFFICIAL DATES (Checked BEFORE greetings to avoid false matches!)
    if is_ritual:
        if 'sandhi' in q:
            return (
                "**Sandhi Puja — The Divine Climax of Maha Ashtami** 🪔🕊️\n\n"
                "• **Astronomical Juncture & Timing**: Sandhi Puja takes place on **Maha Ashtami (Monday, 19 October 2026)** at the precise astronomical juncture between the final 24 minutes of Maha Ashtami and the first 24 minutes of Maha Navami (a sacred **48-minute celestial window**).\n"
                "• **Mythology & Chamunda Avatara**: At this exact threshold, Devi Durga manifested in Her fierce, all-conquering aspect as **Devi Chamunda** to vanquish the demon chieftains Chanda and Munda.\n"
                "• **108 Sacred Blue Lotuses (*Neel Kamal*)**: Exactly 108 lotuses are offered in memory of Lord Rama's devotion during his autumn invocation (*Akalbodhon*).\n"
                "• **108 Earthen Diyas**: 108 clay lamps are lit in absolute synchronization as thunderous dhaak beats, conch shells (*shankha*), and Kanshi reverberate through the pandal.\n"
                "• **Sacred Balidan**: Symbolic non-violent vegetable sacrifice of sugarcane (*aakh*), chalkumro (wax gourd), and banana is performed before the Deity.\n\n"
                "👉 **[Click Here to Explore All Rituals on Akalbodhon](action:nav:rituals)**"
            )
        elif 'pushpanjali' in q or 'anjali' in q:
            return (
                "**Maha Ashtami Pushpanjali — Sacred Sanskrit Floral Offering** 🌸🪔\n\n"
                "• **Timing**: Performed on the morning of **Maha Ashtami (Monday, 19 October 2026)** typically between **9:00 AM and 11:30 AM**, depending on the tithi.\n"
                "• **Ritual & Fasting**: Devotees traditionally observe a fast (*upavasa*) until Pushpanjali is concluded. Offering Bel leaves (*bel pata*), fresh flowers, and sandalwood paste in three sacred rounds.\n"
                "• **Sacred Mantra**: Concluded with the revered prayer: *\"Om Jayanti Mangala Kali Bhadrakali Kapalini, Durga Shiva Kshama Dhatri Svaha Svadha Namostute.\"*\n"
                "• **Traditional Attire**: Women traditionally wear Lal-Paad Shada Saree or silk ethnic suits; men wear crisp Dhoti-Panjabi or Kurta.\n\n"
                "👉 **[View Vedic Rituals Timeline](action:nav:rituals)**"
            )
        elif 'kumari' in q:
            return (
                "**Kumari Puja — Honoring the Living Goddess** 👑🌸\n\n"
                "• **Spiritual Meaning**: Kumari Puja honors a young pre-pubescent girl (aged between 1 to 16) as the pure, unmanifested living embodiment of Devi Mahamaya / Durga.\n"
                "• **Belur Math Landmark**: Popularized in 1901 by **Swami Vivekananda** at Belur Math, where thousands gather on **Maha Ashtami morning (19 Oct 2026)** to witness the serene ritual.\n"
                "• **Rituals**: The Kumari is dressed in fine red silk, adorned with flower garlands, and worshipped with sacred mantras, aarti, and bhog offerings.\n\n"
                "👉 **[Explore Rituals on Akalbodhon](action:nav:rituals)**"
            )
        elif 'dhunuchi' in q:
            return (
                "**Dhunuchi Naach — The Ecstatic Rhythm of Maha Navami** 🔥🥁\n\n"
                "• **The Tradition**: The exhilarating devotional dance performed during evening Aarti on **Maha Navami (Tuesday, 20 October 2026)** and Vijaya Dashami.\n"
                "• **The Chalice (*Dhunuchi*)**: Earthen chalices filled with burning coconut husk, glowing camphor, and fragrant frankincense (*dhuno*), emitting dense, sacred aromatic smoke.\n"
                "• **The Dance**: Devotees dance with one, two, or even balancing a burning dhunuchi in their teeth, matching step-for-step with rolling, frenetic dhaak beats and kanshi rhythms.\n\n"
                "👉 **[Explore Sacred Rituals](action:nav:rituals)**"
            )
        elif 'sindoor' in q or 'baran' in q:
            return (
                "**Sindoor Khela & Devi Baran — Bittersweet Farewell of Vijaya Dashami** 🌺❤️\n\n"
                "• **Devi Baran**: On the morning of **Bijoya Dashami (Wednesday, 21 October 2026)**, married women bid a tearful farewell to Maa Durga by wiping Her tears with betel leaves, feeding Her sweet sandesh, and touching Her feet.\n"
                "• **Sindoor Khela**: Women apply vibrant red vermilion (*sindoor*) on the Goddess's forehead, followed by joyously smearing sindoor on each other, praying for marital longevity and happiness.\n"
                "• **Subho Bijoya**: Exchanging warm embraces (*kolakoli*), touching the feet of elders, and distributing sweet Rosogollas and Nimki.\n\n"
                "👉 **[Explore Rituals on Akalbodhon](action:nav:rituals)**"
            )
        elif 'akalbodhon' in q or 'bodhon' in q:
            return (
                "**The Scriptural Origin of Akalbodhon (Untimely Invocation)** 🏹🪔\n\n"
                "• **Mythological Root**: According to Krittivasi Ramayana, Lord Rama invoked Devi Durga in the autumn (*Sharad*) season before fighting the demon king Ravana.\n"
                "• **Why 'Akal' (Untimely)**: Durga Puja traditionally occurs in spring (*Basanta* - Basanti Puja). Because the Sun was in *Dakshinayana* (the southern solstice, when deities rest), Lord Rama performed an 'untimely' awakening (*Akalbodhon*).\n"
                "• **108 Blue Lotuses**: Lord Rama needed 108 Neel Kamal. When one was missing, He prepared to sacrifice His own lotus-like eye (*Padmalochana*), at which point the Divine Mother appeared to grant Him victory.\n\n"
                "👉 **[Explore Rituals on Akalbodhon](action:nav:rituals)**"
            )
        elif any(k in q for k in ['date', 'when', 'schedule', 'calendar', 'panjika', 'shashthi', 'sashthi', 'shasthi', 'saptami', 'tithi']):
            return (
                "**Durga Puja 2026 Official Dates & Ritual Schedule (Web & Panjika)** 📅🪔\n\n"
                "According to traditional Bengali Panjika almanacs and official web calendars:\n\n"
                "• 🌅 **Mahalaya**: Saturday, 10 October 2026 — Dawn ancestral *Tarpan* along holy river ghats and Birendra Krishna Bhadra's *Mahishasuramardini* recitation at 4:00 AM IST.\n"
                "• 🥁 **Maha Shashthi**: Friday, 16 October 2026 — *Devi Bodhon* under the Bilva tree, *Kalparambha*, and formal awakening of Maa Durga (Shashthi tithi commences on Oct 16).\n"
                "• 🌿 **Maha Saptami**: Saturday, 17 October & Sunday, 18 October 2026 — *Nabapatrika Snan* (dawn river bathing of *Kola Bou* in the holy Hooghly) and *Prana Pratishtha*. The auspicious Saptami tithi commences on Oct 17 and spans across into Oct 18 across panjikas.\n"
                "• 🔥 **Maha Ashtami**: Monday, 19 October 2026 — Morning Sanskrit **Pushpanjali**, revered **Kumari Puja** at Belur Math, and the celestial **Sandhi Puja** (48-minute astronomical window with 108 blue lotuses & 108 earthen lamps).\n"
                "• ✨ **Maha Navami**: Tuesday, 20 October 2026 — Sacred *Maha Yajna / Homa*, festive community *Bhog*, and electrifying **Dhunuchi Naach** to rolling dhaak rhythms.\n"
                "• 🪷 **Bijoya Dashami**: Wednesday, 21 October 2026 — Bittersweet farewell *Devi Baran*, vibrant *Sindoor Khela*, touching elders' feet (*Kolakoli*), and holy Ganga immersion (*Bishorjon*).\n\n"
                "👉 **[Explore Sacred Rituals Timeline](action:nav:rituals)**"
            )
        else:
            return (
                "**Sacred Vedic Durga Puja Rituals Schedule (2026)** 🪔🕊️\n\n"
                "• **Mahalaya (10 Oct 2026)**: Dawn ancestral *Tarpan* along holy river ghats and *Mahishasuramardini* recitation.\n"
                "• **Maha Shashthi (16 Oct 2026)**: *Devi Bodhon* under the sacred Bel tree, *Kalparambha*, and formal awakening.\n"
                "• **Maha Saptami (17–18 Oct 2026)**: *Nabapatrika Snan* (dawn bathing of *Kola Bou* in the holy Hooghly) and *Prana Pratishtha* spanning the 17th–18th tithi.\n"
                "• **Maha Ashtami (19 Oct 2026)**: Morning **Pushpanjali** flower offerings; **Kumari Puja**; and the celestial **Sandhi Puja** with 108 blue lotuses and 108 burning clay lamps.\n"
                "• **Maha Navami (20 Oct 2026)**: Sacred Vedic fire sacrifice followed by electrifying *Dhunuchi Naach* to rolling dhaak rhythms.\n"
                "• **Bijoya Dashami (21 Oct 2026)**: Bidding farewell to Maa Durga, vibrant *Sindoor Khela*, and holy immersion (*Bhashan*).\n\n"
                "👉 **[Explore Rituals on Akalbodhon](action:nav:rituals)**"
            )

    # 6. CURATED 1-DAY MASTER ITINERARY SOLVER
    if is_plan:
        return (
            "**Curated 1-Day Master Pandal Hopping Itinerary (Kolkata 2026)** 🗺️🚶‍♂️\n\n"
            "An optimized morning-to-midnight route balancing heritage, art, and iconic culinary pitstops:\n\n"
            "• 🌅 **Morning (9:00 AM – 1:00 PM) • North Kolkata Heritage Circuit**:\n"
            "  - Start at **Shyambazar Metro** ➔ Walk to centenary **Bagbazar Sarbojanin** (pure Sabeki Daaker Saaj idol).\n"
            "  - Hop to **Kumartuli Park** and stroll through the idol-makers' artisan quarter.\n"
            "  - Visit the aristocratic 1757 **Sovabazar Rajbari** Natmandir courtyard.\n"
            "  - 🍴 *Food Stop*: Original Diamond Fish Fry at **Mitra Cafe** or Kosha Mangsho at **Golbari**.\n\n"
            "• ☀️ **Afternoon (3:00 PM – 5:30 PM) • Central Illumination Circuit**:\n"
            "  - Metro to **Central / MG Road** ➔ Marvel at the majestic palace reflection over **College Square** lake.\n"
            "  - Visit **Mohammad Ali Park**.\n"
            "  - 🍴 *Refreshment*: Paramount Cold Sherbats (Daab Sarbat).\n\n"
            "• 🌙 **Evening & Night (6:30 PM – Midnight) • South Kolkata Mega Spectacles**:\n"
            "  - Metro to **Kalighat Station** ➔ Walk down Chetla Central Road to **Chetla Agrani Club**.\n"
            "  - Cross over to **Suruchi Sangha** (New Alipore).\n"
            "  - Continue down Rashbehari to avant-garde **Tridhara Sammilani**.\n"
            "  - Midnight youth adda at **Maddox Square** open park lawns.\n"
            "  - 🥛 *Midnight Snack*: World-famous **Doodh Cola** & Kesar Chai at **Balwant Singh's Eating House**!\n\n"
            "👉 **[Open Curated Master Plans](action:nav:plans)** | **[Open My Saved Itinerary](action:nav:saved)**"
        )

    # 7. SPECIFIC PANDAL SPOTLIGHTS (Individual Clubs)
    pandal_directory = {
        'chetla': ("Chetla Agrani Club", "South", "Kalighat Metro Station", "Sublime concept art, master earthen terracotta craft, and soulful lighting pavilions.", "https://www.google.com/maps/search/?api=1&query=Chetla+Agrani+Club+Durga+Puja+Kolkata"),
        'maddox': ("Maddox Square (Ritchie Road)", "South", "Netaji Bhavan or Jatin Das Park Metro", "The legendary heartbeat of youth adda, massive open park lawns, and rolling live dhaak beats.", "https://www.google.com/maps/search/?api=1&query=Maddox+Square+Durga+Puja+Kolkata"),
        'suruchi': ("Suruchi Sangha (New Alipore)", "South", "Kalighat or Rabindra Sarobar Metro", "Acclaimed thematic spectacles spotlighting diverse Indian regional traditions and social harmony.", "https://www.google.com/maps/search/?api=1&query=Suruchi+Sangha+Durga+Puja+Kolkata"),
        'ekdalia': ("Ekdalia Evergreen Club", "South", "Kalighat Metro + auto to Gariahat", "Heritage classic showcasing jaw-dropping temple replicas with colossal German crystal chandeliers.", "https://www.google.com/maps/search/?api=1&query=Ekdalia+Evergreen+Club+Gariahat+Kolkata"),
        'tridhara': ("Tridhara Sammilani", "South", "Kalighat Metro Station", "Avant-garde sensory concepts blending contemporary architecture with timeless spiritual reverence.", "https://www.google.com/maps/search/?api=1&query=Tridhara+Sammilani+Durga+Puja+Kolkata"),
        'hindustan': ("Hindustan Park Sarbojanin", "South", "Kalighat Metro Station", "Intimate artisanal handloom and indigenous craft aesthetics nestled in Ballygunge.", "https://www.google.com/maps/search/?api=1&query=Hindustan+Park+Durga+Puja+Kolkata"),
        'shib mandir': ("Shiv Mandir Sarbojanin", "South", "Rabindra Sarobar Metro", "Ethereal lake-side decor, environmental lighting, and serene artistic idols by the Sarobar.", "https://www.google.com/maps/search/?api=1&query=Shiv+Mandir+Durga+Puja+Kolkata"),
        'mudiali': ("Mudiali Club", "South", "Rabindra Sarobar Metro", "Breathtaking eco-art decor, intricate relief panels, and world-class illumination.", "https://www.google.com/maps/search/?api=1&query=Mudiali+Club+Durga+Puja+Kolkata"),
        'bagbazar': ("Bagbazar Sarbojanin", "North", "Shyambazar Metro Station", "The 100+ year-old benchmark of pure traditional Sabeki idol draped in shimmering Daaker Saaj.", "https://www.google.com/maps/search/?api=1&query=Bagbazar+Sarbojanin+Durga+Puja+Kolkata"),
        'kumartuli': ("Kumartuli Park Sarbojanin", "North", "Sovabazar Sutanuti Metro", "Cutting-edge creative brilliance nestled inside the centuries-old idol-sculptors' quarters.", "https://www.google.com/maps/search/?api=1&query=Kumartuli+Park+Durga+Puja+Kolkata"),
        'tala prattoy': ("Tala Prattoy", "North", "Belgachia Metro Station", "Internationally acclaimed contemporary installation art that elevates pandal design into an outdoor museum.", "https://www.google.com/maps/search/?api=1&query=Tala+Prattoy+Durga+Puja+Kolkata"),
        'hatibagan': ("Hatibagan Sarbojanin", "North", "Shyambazar Metro Station", "Heritage North Kolkata classic famed for deep community traditions and architectural marvels.", "https://www.google.com/maps/search/?api=1&query=Hatibagan+Sarbojanin+Durga+Puja+Kolkata"),
        'sreebhumi': ("Sreebhumi Sporting Club", "East", "Dum Dum Metro + VIP Road auto", "Spectacular life-sized royal palace replicas adorned with millions of Chandannagar lights.", "https://www.google.com/maps/search/?api=1&query=Sreebhumi+Sporting+Club+Durga+Puja+Lake+Town+Kolkata"),
        'college square': ("College Square Sarbojanin", "Central", "MG Road or Central Metro", "Monumental palace illuminated brilliantly over the historic water tank reflections.", "https://www.google.com/maps/search/?api=1&query=College+Square+Durga+Puja+Kolkata"),
    }

    for key, (name, zone, metro, highlights, maps_url) in pandal_directory.items():
        if key in q:
            return (
                f"**{name} Spotlight** 🏛️✨\n\n"
                f"• **Zone**: {zone} Kolkata\n"
                f"• **Highlights**: {highlights}\n"
                f"• **Nearest Metro Station**: **{metro}**\n\n"
                f"👉 **[Explore {zone} Kolkata Pandals on Akalbodhon](action:nav:pandals:{zone})** | 🗺️ [Open Google Maps]({maps_url})"
            )

    # 8. REGIONAL ZONE CIRCUITS
    if 'south' in q and ('pandal' in q or 'zone' in q or 'best' in q or 'which' in q or 'circuit' in q or 'list' in q):
        return (
            "**Top South Kolkata Durga Puja Pandals (2026)** 🏛️✨\n\n"
            "South Kolkata is world-renowned for monumental modern thematic architecture, museum-grade conceptual art, and electrifying carnival energy:\n\n"
            "1. **Chetla Agrani Club** (Kalighat Metro): Sublime concept art, master earthen terracotta craft, and soulful lighting pavilions.\n"
            "2. **Tridhara Sammilani** (Ballygunge / Kalighat Metro): Avant-garde sensory and spatial installations that redefine contemporary art.\n"
            "3. **Suruchi Sangha** (New Alipore): Acclaimed thematic spectacles spotlighting diverse Indian regional traditions.\n"
            "4. **Ekdalia Evergreen Club** (Gariahat): Heritage classic showcasing jaw-dropping temple replicas with colossal German crystal chandeliers.\n"
            "5. **Maddox Square** (Ritchie Road): The legendary heartbeat of youth adda, massive open park lawns, and rolling dhaak beats.\n"
            "6. **Mudiali Club & Shiv Mandir** (Southern Avenue): Breathtaking environmental decor, lake-side serenity, and ethereal illumination.\n"
            "7. **Badamtala Ashar Sangha** (Kalighat): A pioneer of theme puja artistry with thought-provoking concepts.\n\n"
            "👉 **[Click Here to View All South Zone Pandals on Akalbodhon](action:nav:pandals:South)**"
        )

    if 'north' in q and ('pandal' in q or 'zone' in q or 'best' in q or 'which' in q or 'circuit' in q or 'list' in q):
        return (
            "**Top North Kolkata Durga Puja Pandals (2026)** 🏛️🪔\n\n"
            "North Kolkata preserves the pure soul, aristocracy, and heritage of traditional Durga Puja:\n\n"
            "1. **Bagbazar Sarbojanin**: The 100+ year-old benchmark of pure traditional Sabeki idol adorned in shimmering Daaker Saaj.\n"
            "2. **Kumartuli Park**: Conceptual artistic wonder created right in the heart of Kolkata's legendary idol-makers' colony.\n"
            "3. **Sovabazar Rajbari**: Historic 1757 Bonedi Bari celebration founded by Raja Nabakrishna Deb in the grand open Natmandir.\n"
            "4. **Tala Prattoy**: Landmark avant-garde contemporary installation that elevates pandal art into a world-class outdoor gallery.\n"
            "5. **Ahiritola Sarbojanin**: Heritage riverside puja famed for social themes and cultural richness.\n\n"
            "👉 **[Click Here to View All North Zone Pandals on Akalbodhon](action:nav:pandals:North)**"
        )

    if ('east' in q or 'salt lake' in q) and ('pandal' in q or 'zone' in q or 'best' in q):
        return (
            "**Top East Kolkata & Salt Lake Pandals (2026)** 🏛️\n\n"
            "1. **Sreebhumi Sporting Club** (Lake Town / VIP Road): Spectacular royal palace architectural replicas with dazzling Chandannagar illumination.\n"
            "2. **FD Block & BJ Block** (Salt Lake): Grand community festivals with spacious park setups and high-concept creative pavilions.\n"
            "3. **Dum Dum Park Tarun Sangha & Bharat Chakra**: High-concept fine art installations and innovative socio-cultural themes.\n\n"
            "👉 **[Click Here to View All East Zone Pandals on Akalbodhon](action:nav:pandals:East)**"
        )

    if 'rajbari' in q or 'bonedi' in q or 'heritage' in q:
        return (
            "**Heritage Bonedi Bari Durga Pujas (Aristocratic Estates)** 🏛️🪔\n\n"
            "Experience 250+ years of aristocratic Bengali tradition in classical Natmandir courtyards:\n\n"
            "• **Sovabazar Rajbari (1757)**: Founded by Raja Nabakrishna Deb, attended by Lord Clive, timeless Ekchala Daaker Saaj pratima.\n"
            "• **Shobhabazar Chhoto Rajbari**: Majestic twin estate across the lane with exquisite classical aarti.\n"
            "• **Rani Rashmoni Bari (Janbazar)**: Established by the revered founder of Dakshineswar Kali Temple.\n"
            "• **Thanthania Dutta Bari (1855)**: Known for divine Hara-Gauri pratima where Shiva sits beside Durga.\n"
            "• **Laha Bari**: Revered for unique idol where Maa Durga sits peacefully in Shiva's lap without weapons.\n\n"
            "👉 **[Explore Heritage Rajbari Pujas](action:nav:pandals:rajbari)**"
        )

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

    # 9. GREETINGS (Strict word boundary, only when NO domain keywords exist!)
    has_domain = is_food or is_transit or is_metro_general or is_attire or is_ritual or is_plan or any(k in q for k in ['pandal', 'south', 'north', 'east', 'west', 'kolkata'])
    is_greeting = bool(re.search(r'^(hi|hello|hey|namaste|nomoshkar|pranam|joy maa durga|subho mahalaya)\b', q)) or (
        len(q.split()) <= 2 and any(re.search(rf'\b{re.escape(g)}\b', q) for g in ['hi', 'hello', 'hey', 'namaste', 'nomoshkar', 'pranam'])
    )
    if is_greeting and not has_domain:
        return (
            "Joy Maa Durga! 🌺 **Nomoshkar and welcome to Akalbodhon 2026!**\n\n"
            "I am **sharod.ai**, your personal AI Guide modeled with the intelligence of Gemini. I am here to help you with:\n"
            "• 🏛️ **Finding & Filtering Pandals**: North, South, East, or Central Kolkata circuits\n"
            "• 🪔 **Vedic Rituals & Timings**: Sandhi Puja, Pushpanjali, Dhunuchi Naach\n"
            "• 🍲 **Kolkata Culinary Guide**: Legendary Biryani, Rolls, Kabiraji, and Sweets\n"
            "• 🚇 **Kolkata Metro & Transit**: Timings, nearest stations, and night schedules\n"
            "• 👗 **Festival Etiquette & Attire**: What to wear, traditions, and style advice\n"
            "• 🌐 **Any general questions**: Culture, science, history, coding, or festival planning!\n\n"
            "👉 [Explore South Kolkata Pandals](action:nav:pandals:South) | [View Rituals](action:nav:rituals) | [Food Guide](action:nav:food-shopping)"
        )

    # 10. Web search grounding synthesis
    if web_snippets:
        snippet_text = "\n".join(f"• {s}" for s in web_snippets[:3])
        return (
            f"Here is what I found regarding **'{query}'**:\n\n"
            f"{snippet_text}\n\n"
            "Feel free to ask follow-up questions, request specific pandal routes, or explore sections of the site!\n\n"
            "👉 [Explore Pandals](action:nav:pandals:all) | [Explore Rituals](action:nav:rituals) | [Food Guide](action:nav:food-shopping)"
        )

    # 11. General Knowledge & Fallback
    return (
        f"Thank you for asking about **'{query}'**! I am **sharod.ai**, your companion on Akalbodhon:\n\n"
        "I am ready to help you with detailed answers, creative suggestions, opinions, or festival navigation:\n\n"
        "• If your question is about **Durga Puja celebrations**, ask about exact pandal hopping routes, Sandhi Puja rituals, dress codes, or food trails.\n"
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

    # 2. If no valid Google Gemini API key (must be valid Google format starting with AIzaSy), use fast local engine immediately
    if not api_key or not api_key.startswith("AIzaSy"):
        return generate_local_puja_response(user_msg, web_snippets), "local_engine", bool(web_snippets)

    # 3. Prepare Unconstrained Gemini Prompt (Model of Google Gemini)
    system_instruction = (
        "You are sharod.ai, the intelligent AI Assistant and festival concierge modeled after Google Gemini on Akalbodhon "
        "(the premier Kolkata Durga Puja web platform).\n\n"
        "CRITICAL DIRECTIVE ON RESPONSES & ZERO-GREETING RULE:\n"
        "1. NEVER output a generic introductory menu, capability checklist, or greeting like 'Joy Maa Durga! Nomoshkar and welcome... I am sharod.ai... I am here to help you navigate: Pandals, Rituals, Food...' when the user asks a question or clicks a quick-chip (such as 'Sandhi Puja Rituals', 'Best South Pandals', '1-Day Itinerary', 'Puja Dates 2026', 'Food near Maddox', 'How to reach Chetla').\n"
        "2. ALWAYS provide the direct, deep, comprehensive, and specific answer immediately to the topic requested!\n\n"
        "CANONICAL 2026 DURGA PUJA DATES & RITUAL CALENDAR (Official Web & Panjika):\n"
        "- Mahalaya: Saturday, 10 October 2026 (Dawn Tarpan & 4:00 AM Birendra Krishna Bhadra Mahishasuramardini recitation)\n"
        "- Maha Shashthi: Friday, 16 October 2026 (Devi Bodhon & Kalparambha under the Bilva tree; Shashthi tithi commences on Oct 16)\n"
        "- Maha Saptami: Saturday, 17 October & Sunday, 18 October 2026 (Saptami tithi commences on Oct 17 and spans across into Oct 18 across Bengali panjikas; Nabapatrika / Kola Bou Snan in the holy Hooghly river observed across this period)\n"
        "- Maha Ashtami: Monday, 19 October 2026 (Morning Sanskrit Pushpanjali, Kumari Puja at Belur Math, and celestial Sandhi Puja 48-minute astronomical juncture with 108 blue lotuses & 108 clay lamps)\n"
        "- Maha Navami: Tuesday, 20 October 2026 (Sacred Maha Yajna / Homa, community Bhog distribution, and electrifying evening Dhunuchi Naach)\n"
        "- Bijoya Dashami: Wednesday, 21 October 2026 (Devi Baran, sacred Sindoor Khela, touching elders' feet / Kolakoli, and holy Ganga immersion / Bishorjon)\n\n"
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

    candidate_models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash-lite"]
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
            with urllib.request.urlopen(req, timeout=5) as resp:
                resp_data = json.loads(resp.read().decode('utf-8'))
                candidates = resp_data.get('candidates', [])
                if candidates:
                    parts = candidates[0].get('content', {}).get('parts', [])
                    if parts:
                        return parts[0].get('text', ''), f"gemini_api:{model_name}", bool(web_snippets)
        except Exception as e:
            print(f"Gemini API ({model_name}) error: {e}")
            if "401" in str(e) or "403" in str(e):
                # Unauthorized key - stop retrying other models
                break
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
