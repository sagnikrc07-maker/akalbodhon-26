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
MAX_BODY_SIZE = 1048576  # 1 MB maximum payload protection against DoS
SUPABASE_URL = "https://yagvczdnfyhdtvggkclj.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ3ZjemRuZnloZHR2Z2drY2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwODM2MDcsImV4cCI6MjEwMzY1OTYwN30.VsaIdEh9PZGdFfVuJy1KMAISkl8yhRepxAXNGGMxibA"

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
                "supabase_project": "yagvczdnfyhdtvggkclj"
            }).encode('utf-8')
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

        self.send_response(404)
        self.send_header('Content-Length', '0')
        self.end_headers()

def btoa_py(s):
    import base64
    return base64.b64encode(s.encode()).decode().replace('=', '')[:16].lower()

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
