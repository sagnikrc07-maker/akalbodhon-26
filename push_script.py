import urllib.request
import json
import subprocess
import os

token = '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'
headers = {
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'Akalbodhon-Deployer'
}

# 1. Get user details
req = urllib.request.Request('https://api.github.com/user', headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        user_data = json.loads(response.read().decode())
        username = user_data.get('login')
        print('Authenticated as GitHub user:', username)
except Exception as e:
    print('Failed to get user:', e)
    exit(1)

# 2. Create private repository
repo_name = 'akalbodhon-26'
repo_payload = json.dumps({
    'name': repo_name,
    'description': 'Akalbodhon 2026 - Premium Durga Puja Digital Experience & Transit Guide',
    'private': True,
    'has_issues': True,
    'has_projects': True,
    'has_wiki': False
}).encode('utf-8')

create_req = urllib.request.Request('https://api.github.com/user/repos', data=repo_payload, headers=headers)
try:
    with urllib.request.urlopen(create_req) as response:
        repo_data = json.loads(response.read().decode())
        print('Successfully created private repo:', repo_data.get('html_url'))
except urllib.error.HTTPError as e:
    err_body = e.read().decode()
    if 'name already exists' in err_body:
        print(f'Repository {repo_name} already exists. Proceeding with push.')
    else:
        print(f'Error creating repo: {e.code} - {err_body}')
except Exception as e:
    print('Error creating repo:', e)

# 3. Initialize git and commit
subprocess.run(['git', 'init'])
subprocess.run(['git', 'config', 'user.name', username])
subprocess.run(['git', 'config', 'user.email', f'{username}@users.noreply.github.com'])
subprocess.run(['git', 'add', '.'])
subprocess.run(['git', 'commit', '-m', 'Initial commit: Akalbodhon 26 Festival Guide with real pandal images, food & shopping guides'])
subprocess.run(['git', 'branch', '-M', 'main'])

# 4. Push to GitHub
remote_url = f'https://{username}:{token}@github.com/{username}/{repo_name}.git'
subprocess.run(['git', 'remote', 'remove', 'origin'], capture_output=True)
subprocess.run(['git', 'remote', 'add', 'origin', remote_url], capture_output=True)

push_res = subprocess.run(['git', 'push', '-u', 'origin', 'main', '--force'], capture_output=True, text=True)
print('Push result code:', push_res.returncode)
if push_res.stdout:
    print(push_res.stdout)
if push_res.stderr:
    safe_stderr = push_res.stderr.replace(token, '***')
    print(safe_stderr)

# Clean up remote URL so token is NOT stored in local git config
clean_remote_url = f'https://github.com/{username}/{repo_name}.git'
subprocess.run(['git', 'remote', 'set-url', 'origin', clean_remote_url])
print('Cleaned up remote URL in local git config.')
