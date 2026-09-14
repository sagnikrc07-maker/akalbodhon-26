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

PORT = 8080
SUPABASE_URL = "https://yagvczdnfyhdtvggkclj.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ3ZjemRuZnloZHR2Z2drY2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwODM2MDcsImV4cCI6MjEwMzY1OTYwN30.VsaIdEh9PZGdFfVuJy1KMAISkl8yhRepxAXNGGMxibA"

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
                "supabase_project": "yagvczdnfyhdtvggkclj"
            }).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Content-Length', str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return

        # Static file serving with Keep-Alive, gzip compression, and caching
        filepath = self.translate_path(self.path)
        if os.path.isdir(filepath):
            for index in ["index.html", "index.htm"]:
                idx_path = os.path.join(filepath, index)
                if os.path.isfile(idx_path):
                    filepath = idx_path
                    break
        
        if os.path.isfile(filepath):
            ctype = self.guess_type(filepath) or 'application/octet-stream'
            _, ext = os.path.splitext(filepath)
            ext = ext.lower()
            
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
            
            if ext in {'.html', '.htm'}:
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

        return super().do_GET()

    def do_POST(self):
        clean_path = self.path.split('?')[0]
        if clean_path == '/api/auth/devotee':
            content_length = int(self.headers.get('Content-Length', 0))
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

        self.send_response(404)
        self.send_header('Content-Length', '0')
        self.end_headers()

def btoa_py(s):
    import base64
    return base64.b64encode(s.encode()).decode().replace('=', '')[:16].lower()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with ThreadedTCPServer(("0.0.0.0", PORT), AkalbodhonHandler) as httpd:
        print(f"🪔 Akalbodhon Backend Server running at http://localhost:{PORT}")
        print(f"🌺 Supabase Backend Connected: {SUPABASE_URL}")
        sys.stdout.flush()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
