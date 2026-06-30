# Credit Vivo — PRD

## Original Problem Statement
Credit Vivo is a full-service consumer credit repair web app combining AI Credit Boost automation, education, personalized coaching, smart technology, and attorney access. Dovly-inspired clean fintech experience without copying Dovly branding. Trustworthy blue/green color direction, dashboard previews, strong CTAs. Home page with hero, benefits, how-it-works, trust/compliance disclaimers, pricing preview, reviews placeholders, FAQ. User accounts with onboarding, credit report upload/connection, AI analysis, dispute recommendation engine, automated dispute workflow, progress tracking dashboard, document center, coaching messages, attorney escalation, subscription checkout, and admin tools. Pricing ~20% below comparable competitors: AI Boost $31.99/mo, Credit Coach $63.99/mo, Legal Access Pro $111.99/mo. Avoid guaranteed score claims.

## Architecture
- **Backend**: FastAPI + MongoDB (Motor) + JWT auth + bcrypt + pdfplumber + emergentintegrations (Claude Sonnet 4.5)
- **Frontend**: React 19 + React Router + Tailwind + Shadcn UI + Cabinet Grotesk/Satoshi fonts (Fontshare)
- **AI**: Claude Sonnet 4.5 via Emergent Universal LLM key for dispute analysis
- **Design**: Light theme, moss green (#047857) + ink navy (#0F172A) on paper background (#FCFBF9)

## User Personas
- **Sarah** (28, first-time homebuyer): Wants score visibility & guided disputes
- **Marcus** (42, identity theft victim): Needs attorney escalation & dispute tracking
- **Priya** (35, recovering from medical collections): Wants AI-driven prioritization

## Core Requirements (static)
1. SEO-friendly responsive marketing site
2. Secure JWT auth with bcrypt
3. PDF credit report upload → AI analysis → dispute recommendations
4. Dashboard with progress tracking
5. FCRA-aligned compliance disclaimers (no guaranteed score claims)
6. Three pricing tiers (~20% below market)

## Phase 1 — IMPLEMENTED (2026-02-10)
- ✅ Marketing **Landing page**: hero with dashboard preview, benefits bento grid, how-it-works, pricing (3 tiers), testimonials, FAQ accordion, compliance footer, strong CTAs
- ✅ **JWT Auth**: register, login, /me, protected routes, bcrypt hashing
- ✅ **Credit Report Upload**: PDF parsing via pdfplumber, sent to Claude Sonnet 4.5
- ✅ **AI Dispute Engine**: returns structured JSON (estimated score range, summary, positive/risk factors, disputes with severity/category/bureau/recommended action)
- ✅ **Dashboard**: stat cards, AI summary, progress bar, positive/risk factors, dispute list with tabs (All/High/Active), per-dispute status update
- ✅ Cabinet Grotesk display font + Satoshi body, moss/ink palette
- ✅ data-testid coverage for all interactive elements

## Phase 2 — IMPLEMENTED (2026-02-10)
- ✅ **Stripe checkout** (sandbox provisioned): 3 monthly recurring prices wired ($31.99/$63.99/$111.99), `/pricing` page, `/payment/success` (polls status), `/payment/cancel`, webhook handler at `/api/stripe/webhook`. Default tax mode: SMP (Stripe-managed), can switch later.
- ✅ **AI Dispute Letter generation** — Claude-drafted FCRA-compliant letter per dispute, rendered as PDF (reportlab), downloadable directly from Dashboard "Generate letter" button.
- ✅ **Document Center** — `/hub` tab; upload PDFs/images with label, list/download/delete, stored base64 in MongoDB (8MB cap).
- ✅ **Coaching chat** — `/hub` Coach tab; Claude-powered "Avery" coach replies stored persistently.
- ✅ **Attorney escalation flow** — `/hub` Attorney tab; submit issue type/urgency/description/phone; admin can update status.
- ✅ **Onboarding wizard** — `/onboarding` (goal, score range, situation) shown immediately after registration before dashboard.
- ✅ **Admin dashboard** — `/admin` with stats (users, analyses, letters, active subs, revenue), attorney request management, user list. Seeded admin: admin@creditvivo.app / admin12345.
- ✅ **Free Mini Analysis widget** (conversion booster) — public no-auth section on landing page; paste text → AI flags items.
- ✅ Member-hub link in nav; Pricing now real route.

## Phase 2 — Deferred / Future
- Real object storage for documents (currently base64 in Mongo — fine to ~8MB)
- Email notifications (Resend/SendGrid) for dispute status & coach replies
- Multi-bureau direct connect (Experian/Equifax/TransUnion APIs)
- Family plans / multi-user
- Real-time chat via WebSockets (currently HTTP polling)

## Admin Test Credentials
- Email: admin@creditvivo.app
- Password: admin12345
- Role: admin

## Test Credentials
See `/app/memory/test_credentials.md`
