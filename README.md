# Ark Portfolio Markets

Polished Trading & Market Intelligence Platform demo for fictional client **Vaulted Financial** (Series B fintech).

## Stack

- Next.js 16 App Router + TypeScript
- Tailwind CSS v4
- shadcn/ui-style local components
- Recharts for financial charts
- D3 scale/chromatic for the correlation heatmap
- PostgreSQL + Drizzle schema scaffold
- Auth.js v5 / NextAuth beta scaffold

## Features

- Portfolio dashboard with 15 seeded holdings, P&L table, sector allocation donut, and S&P 500 benchmark comparison
- Market research ticker search with fundamentals, technical indicators, price chart, and AI analysis
- Daily AI trading signals with confidence scores and supporting indicators
- Watchlist with mock real-time prices, alerts, and sparklines
- 50+ financial news items with sentiment scores and AI impact assessments
- Earnings analyzer with beat/miss, guidance, tone score, metric deltas, and narrative summary
- Risk monitor with concentration alerts, correlation matrix heatmap, max drawdown, and sector exposure
- Paper trading form with virtual $500K starting balance

## Local Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm test
npm run lint
npm run build
```

Demo data is fictional and for portfolio presentation only.
