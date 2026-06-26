# DeepWire Celebs Implementation Plan

**Goal:** Scaffold `/Users/somu/Downloads/deepwire-celebs/` by cloning deepwire-finance, swapping in celebrity news sources/classifier/UI, and verifying the build locally. User will verify before we wire up GitHub + Render.

**Architecture:** Same Astro+Lipi static site + RSS ingestion pipeline as FinWire. Domain swap only — sources, classifier, config, category pages, package identity.

**Tech Stack:** Astro 6, Tailwind 4, rss-parser, cheerio, @mozilla/readability, vitest. Identical to FinWire.

**Reference spec:** `docs/superpowers/specs/2026-06-26-deepwire-celebs-design.md`

---

## Task 1: Clone deepwire-finance into deepwire-celebs

- [ ] Copy `/Users/somu/Downloads/deepwire-finance/` → `/Users/somu/Downloads/deepwire-celebs/`
  - Exclude: `node_modules`, `.astro`, `dist`, `data`, `.git`, `.kimchi`, `.DS_Store`
  - Command: `rsync -a --exclude=node_modules --exclude=.astro --exclude=dist --exclude=data --exclude=.git --exclude=.kimchi --exclude=.DS_Store /Users/somu/Downloads/deepwire-finance/ /Users/somu/Downloads/deepwire-celebs/`
- [ ] Verify: `ls /Users/somu/Downloads/deepwire-celebs/` shows the expected file tree

## Task 2: Update package identity

- [ ] Edit `package.json`:
  - `name`: `"deepwire-celebs"`
  - `description`: `"Celebrity & Entertainment News Intelligence"`
- [ ] Edit `astro.config.mjs`: set `site: "https://deepwire-celebs.app"`
- [ ] Verify: `grep -E '"name"|site' package.json astro.config.mjs`

## Task 3: Rewrite siteConfig and categories

- [ ] Replace `src/config.ts`:
  - `siteConfig.name` → "DeepWire Celebs"
  - `siteConfig.description` → "Celebrity & Entertainment News Intelligence"
  - `siteConfig.url` → "https://deepwire-celebs.app"
  - `siteConfig.twitter` → "@deepwire_celebs"
  - `categories[]` → 5 celeb categories (hollywood, bollywood, kpop, music, general) with icons per spec §3
  - `navigation[]` → match new categories
- [ ] Verify: `cat src/config.ts` shows new identity

## Task 4: Replace source list

- [ ] Edit `src/lib/rss/sources.ts`: replace all 24 finance sources with the ~18 candidate celeb feeds from spec §4
- [ ] Verify: `grep -c '"feedUrl"' src/lib/rss/sources.ts` shows ~18 lines

## Task 5: Rewrite classifier

- [ ] Edit `src/lib/ai/classify.ts`:
  - Replace `CATEGORY_KEYWORDS` keys with the 5 celeb categories; populate each with ~30-60 keywords
  - Replace `SOURCE_CATEGORY_HINTS` with one entry per source pointing to its primary category
  - Update `categoryMapping` to identity map for the 5 new IDs
- [ ] Verify: `npm test` passes (existing test file uses finance categories — also update test file or rewrite it)

## Task 6: Update tests

- [ ] Inspect `tests/ai/classify.test.ts`; rewrite tests to cover the new celeb categories
- [ ] Verify: `npm test` exits 0

## Task 7: Replace category pages

- [ ] Create `src/pages/hollywood.astro`, `bollywood.astro`, `kpop.astro`, `music.astro`, `general.astro` (copy from `banking.astro`, swap category string and label)
- [ ] Delete `src/pages/{markets,stocks,crypto,fintech,regulation,economy,forex}.astro`
- [ ] Verify: `ls src/pages/*.astro` shows the 5 new + admin/* unchanged

## Task 8: Rewrite README

- [ ] Replace `README.md` content with the DeepWire Celebs version (project identity, 5 categories, ~18 sources, getting started)

## Task 9: npm install

- [ ] `cd /Users/somu/Downloads/deepwire-celebs && npm install`
- [ ] Verify: `node_modules/` populated, no install errors

## Task 10: Probe candidate feeds

- [ ] For each of the ~18 candidate feed URLs in spec §4, run a HEAD or small GET to check for `application/rss+xml` or `application/xml` content-type and 200 status
- [ ] Record which URLs are dead; mark live ones in a working list
- [ ] Update `src/lib/rss/sources.ts` to drop dead URLs
- [ ] Verify: working list ≥ 10 sources across ≥ 4 categories

## Task 11: Run ingestion

- [ ] `npm run ingest` (all sources) → wait for completion (~10–15 min)
- [ ] Verify: `data/articles.json` contains ≥ 1 article per category (ideally ≥ 5 per)

## Task 12: Build and verify

- [ ] `npm run build` → exits 0
- [ ] `npm run dev` briefly → curl `/hollywood`, `/bollywood`, `/kpop`, `/music`, `/general` to confirm 200 + non-empty article lists
- [ ] Init git: `git init && git add . && git commit -m "feat: scaffold DeepWire Celebs from FinWire base"`

## Success criteria

- All 12 tasks complete
- `npm run build` exits 0
- All 5 category pages render with articles
- `npm test` passes
- Local git initialized with clean commit
