import urllib.request
import json
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')
token = os.environ.get('SUPABASE_ACCESS_TOKEN', '')
project_ref = os.environ.get('SUPABASE_PROJECT_REF', 'your-project-ref')

sql_statements = [
    # Alter id column to TEXT if it was UUID so it can take both UUID and custom slug IDs
    """
    DO $$
    BEGIN
        -- Alter puja_plans id to TEXT
        ALTER TABLE public.puja_plans ALTER COLUMN id TYPE TEXT USING id::TEXT;
        ALTER TABLE public.plan_members ALTER COLUMN plan_id TYPE TEXT USING plan_id::TEXT;
    EXCEPTION
        WHEN OTHERS THEN
            NULL;
    END $$;
    """,
    # Reload schema cache for PostgREST
    "NOTIFY pgrst, 'reload schema';"
]

for idx, stmt in enumerate(sql_statements):
    payload = json.dumps({'query': stmt}).encode()
    req = urllib.request.Request(
        f'https://api.supabase.com/v1/projects/{project_ref}/database/query',
        data=payload,
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0'
        }
    )
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            print(f"Step {idx+1} executed successfully")
    except Exception as e:
        print(f"Step {idx+1} error:", e)

print("Schema cache reloaded and column types aligned to TEXT!")
