import urllib.request
import json
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')
token = os.environ.get('SUPABASE_ACCESS_TOKEN', '')

sql_statements = [
    # 1. Drop existing tables and recreate cleanly
    """
    DROP TABLE IF EXISTS public.plan_members CASCADE;
    DROP TABLE IF EXISTS public.puja_plans CASCADE;
    DROP TABLE IF EXISTS public.user_timers CASCADE;
    DROP TABLE IF EXISTS public.profiles CASCADE;

    CREATE TABLE public.profiles (
        id TEXT PRIMARY KEY,
        identifier TEXT NOT NULL,
        identifier_type TEXT DEFAULT 'email',
        username TEXT NOT NULL,
        avatar TEXT DEFAULT '🪔',
        avatar_type TEXT DEFAULT 'puja',
        custom_avatar_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE public.puja_plans (
        id TEXT PRIMARY KEY,
        creator_id TEXT NOT NULL,
        creator_name TEXT NOT NULL,
        creator_avatar TEXT DEFAULT '🌺',
        title TEXT NOT NULL,
        day_tag TEXT NOT NULL,
        date_str TEXT,
        route_summary TEXT,
        pandals JSONB DEFAULT '[]'::jsonb,
        food_stops JSONB DEFAULT '[]'::jsonb,
        rituals JSONB DEFAULT '[]'::jsonb,
        custom_notes TEXT,
        is_template BOOLEAN DEFAULT FALSE,
        share_slug TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE public.plan_members (
        id BIGSERIAL PRIMARY KEY,
        plan_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        user_name TEXT NOT NULL,
        user_avatar TEXT DEFAULT '🪔',
        role TEXT DEFAULT 'member',
        joined_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(plan_id, user_id)
    );

    CREATE TABLE public.user_timers (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        target_time BIGINT NOT NULL,
        duration_mins INTEGER DEFAULT 15,
        category TEXT DEFAULT 'ritual',
        is_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Enable RLS
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.puja_plans ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.plan_members ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.user_timers ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "anon_all_profiles" ON public.profiles FOR ALL TO anon USING (true) WITH CHECK (true);
    CREATE POLICY "anon_all_puja_plans" ON public.puja_plans FOR ALL TO anon USING (true) WITH CHECK (true);
    CREATE POLICY "anon_all_plan_members" ON public.plan_members FOR ALL TO anon USING (true) WITH CHECK (true);
    CREATE POLICY "anon_all_user_timers" ON public.user_timers FOR ALL TO anon USING (true) WITH CHECK (true);

    -- Devotee Auth Stored Function
    CREATE OR REPLACE FUNCTION public.devotee_auth(
        p_id TEXT,
        p_identifier TEXT,
        p_identifier_type TEXT,
        p_username TEXT,
        p_avatar TEXT
    )
    RETURNS JSONB
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    DECLARE
        v_profile RECORD;
    BEGIN
        INSERT INTO public.profiles (id, identifier, identifier_type, username, avatar, updated_at)
        VALUES (p_id, p_identifier, p_identifier_type, p_username, p_avatar, NOW())
        ON CONFLICT (id) DO UPDATE
        SET username = EXCLUDED.username,
            avatar = EXCLUDED.avatar,
            updated_at = NOW()
        RETURNING * INTO v_profile;

        RETURN to_jsonb(v_profile);
    END;
    $$;

    -- Join Plan Stored Function
    CREATE OR REPLACE FUNCTION public.join_plan(
        p_plan_id TEXT,
        p_user_id TEXT,
        p_user_name TEXT,
        p_user_avatar TEXT,
        p_role TEXT DEFAULT 'member'
    )
    RETURNS JSONB
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    DECLARE
        v_member RECORD;
    BEGIN
        INSERT INTO public.plan_members (plan_id, user_id, user_name, user_avatar, role, joined_at)
        VALUES (p_plan_id, p_user_id, p_user_name, p_user_avatar, p_role, NOW())
        ON CONFLICT (plan_id, user_id) DO UPDATE
        SET user_name = EXCLUDED.user_name,
            user_avatar = EXCLUDED.user_avatar
        RETURNING * INTO v_member;

        RETURN to_jsonb(v_member);
    END;
    $$;
    """
]

project_ref = os.environ.get('SUPABASE_PROJECT_REF', 'your-project-ref')

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

print("Clean Supabase backend provisioning complete!")
