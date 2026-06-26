# DeepWire Celebs

A celebrity and entertainment news intelligence platform. Aggregates headlines from major trade publications, fan outlets, and music press across 5 categories — Hollywood, Bollywood, K-Pop, Music, and General celeb news.

**Live demo:** _(deploy after launch)_

## What DeepWire Celebs is

A static site that crawls ~18 RSS feeds from Variety, Hollywood Reporter, Deadline, Bollywood Hungama, Soompi, Billboard, TMZ, and others, then surfaces them through a category-indexed reading experience. Built on Astro with the Lipi design language, designed for fast page loads and zero-tracking browsing.

It is the celebrity-sector sibling of [FinWire](https://github.com/soumitraupadhyaytrinetra/finwire) (finance) and [DeepWire](https://github.com/Himan-D/deepwire) (AI/deep-tech).

## Features

- 5 category landing pages (Hollywood, Bollywood, K-Pop, Music, General)
- Article detail pages with TL;DR, full text, importance score, related stories
- Trending sidebar with tag-driven growth tracking
- Full-text search across all ingested articles
- Dark theme, terracotta accent, Manrope typography — identical visual treatment to FinWire
- Read-only admin dashboard at `/admin` showing counts, source list, and trends
- All static HTML output — no client-side database, no third-party trackers
- Article ingestion pipeline via RSS → keyword classifier → optional full-text crawl → JSON store

## Getting Started

### Clone and install

```sh
git clone https://github.com/soumitraupadhyaytrinetra/celebwire.git
cd deepwire-celebs
npm install
npm run dev
```

Dev server runs at `http://localhost:4321/`.

### Ingest celeb feeds

```sh
npm run ingest              # all sources
npm run ingest "Variety"    # one source only
```

### Other worker commands

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run ingest` | Pull RSS from all ~18 sources into `data/articles.json` |
| `npm run process` | Backfill full content for unprocessed articles |
| `npm test` | Run classifier unit tests |

## Configuration

All site identity lives in `src/config.ts`:

```ts
export const siteConfig = {
  name: "DeepWire Celebs",
  description: "Celebrity & Entertainment News Intelligence",
  url: "https://deepwire-celebs.app",
  // ...
};

export const categories = [
  { id: "hollywood", label: "Hollywood", icon: "🎬" },
  // ...4 more
];
```

The RSS source list is in `src/lib/rss/sources.ts`. The category classifier vocabulary is in `src/lib/ai/classify.ts`.

## Project Structure

```
deepwire-celebs/
├── astro.config.mjs
├── package.json
├── vitest.config.ts
├── data/                       # runtime: articles.json, sources-state.json
├── public/
├── src/
│   ├── config.ts               # siteConfig + categories + nav
│   ├── styles/global.css       # design tokens (identical to finwire)
│   ├── layouts/{Base,Admin}Layout.astro
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── news/               # NewsCard, HeroSection, TrendingTopics, ...
│   │   ├── search/SearchBar.astro
│   │   └── ui/                 # Badge, TimeAgo
│   ├── lib/
│   │   ├── data.ts             # JSON-backed read API
│   │   ├── utils.ts
│   │   ├── rss/{parser,sources}.ts
│   │   └── ai/classify.ts      # keyword + source-hint classifier
│   └── pages/
│       ├── index.astro
│       ├── trending.astro
│       ├── hollywood.astro, bollywood.astro, kpop.astro,
│       ├── music.astro, general.astro
│       ├── search.astro
│       ├── story/[slug].astro
│       └── admin/{index,feeds,jobs,trends}.astro
├── tests/
│   └── ai/classify.test.ts
└── workers/
    ├── db-migrate.ts
    ├── rss-ingestion.ts
    └── article-processing.ts
```

## License

MIT.
