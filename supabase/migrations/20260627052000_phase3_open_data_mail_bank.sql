-- Credit Vivo Phase 3 test schema.
-- Draft-only support for collector public-data checks, mail tracking events,
-- and linked bank accounts. Review policies against your production auth model
-- before applying to a live Supabase project.

CREATE TABLE IF NOT EXISTS public.debt_collector_licenses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    collector_name VARCHAR(255) NOT NULL,
    state_code VARCHAR(2) NOT NULL,
    license_status VARCHAR(50) NOT NULL,
    enforcement_action_active BOOLEAN DEFAULT FALSE,
    evidence_payload JSONB,
    last_checked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.mail_tracking_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    letter_id UUID,
    usps_tracking_hash VARCHAR(255) UNIQUE,
    delivery_status VARCHAR(50) NOT NULL,
    delivery_timestamp TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.linked_bank_accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID,
    institution_name VARCHAR(255) NOT NULL,
    plaid_item_id VARCHAR(255) UNIQUE NOT NULL,
    plaid_access_token VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

DO $$
BEGIN
    IF to_regclass('public.mail_letters') IS NOT NULL THEN
        ALTER TABLE public.mail_tracking_events
            ADD CONSTRAINT mail_tracking_events_letter_id_fkey
            FOREIGN KEY (letter_id) REFERENCES public.mail_letters(id) ON DELETE CASCADE;
    END IF;

    IF to_regclass('public.profiles') IS NOT NULL THEN
        ALTER TABLE public.linked_bank_accounts
            ADD CONSTRAINT linked_bank_accounts_profile_id_fkey
            FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;
END $$;

ALTER TABLE public.debt_collector_licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mail_tracking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.linked_bank_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read collector license cache"
    ON public.debt_collector_licenses
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Service role manages collector license cache"
    ON public.debt_collector_licenses
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role manages mail tracking events"
    ON public.mail_tracking_events
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Users can read their linked bank account metadata"
    ON public.linked_bank_accounts
    FOR SELECT
    TO authenticated
    USING (profile_id = auth.uid());

CREATE POLICY "Service role manages linked bank accounts"
    ON public.linked_bank_accounts
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

