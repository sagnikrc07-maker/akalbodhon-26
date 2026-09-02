import http.server
import socketserver
import os
import json
import urllib.request
import sys

# Configure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

PORT = 5000
SUPABASE_URL = "https://yagvczdnfyhdtvggkclj.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ3ZjemRuZnloZHR2Z2drY2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwODM2MDcsImV4cCI6MjEwMzY1OTYwN30.VsaIdEh9PZGdFfVuJy1KMAISkl8yhRepxAXNGGMxibA"

class AkalbodhonHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Clean URL handling for /login -> /login.html
        clean_path = self.path.split('?')[0]
        if clean_path in ['/login', '/login/']:
            self.path = '/login.html'
        elif clean_path in ['/plans', '/plans/']:
            self.path = '/index.html'
        
        # API: Get Health
        if clean_path == '/api/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "online",
                "festival": "Akalbodhon Sharodiya Durga Puja 2026",
                "supabase_project": "yagvczdnfyhdtvggkclj"
            }).encode('utf-8'))
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
                avatar = data.get('avatar', '🪔')
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

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "success": True,
                    "user": {
                        "id": user_id,
                        "identifier": identifier,
                        "username": username,
                        "avatar": avatar
                    }
                }).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))
            return

        self.send_response(404)
        self.end_headers()

def btoa_py(s):
    import base64
    return base64.b64encode(s.encode()).decode().replace('=', '')[:16].lower()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), AkalbodhonHandler) as httpd:
        print(f"🪔 Akalbodhon Backend Server running at http://localhost:{PORT}")
        print(f"🌺 Supabase Backend Connected: {SUPABASE_URL}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
