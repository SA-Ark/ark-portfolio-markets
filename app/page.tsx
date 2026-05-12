"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BadgeDollarSign,
  BarChart3,
  BellRing,
  BrainCircuit,
  BriefcaseBusiness,
  CandlestickChart,
  CircleDollarSign,
  Newspaper,
  Radar,
  Search,
  ShieldAlert,
  Sparkles,
  WalletCards,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  correlationMatrix,
  correlationTickers,
  earnings,
  holdings,
  news,
  performance,
  researchUniverse,
  sectorColors,
  signals,
  watchlist,
} from "@/lib/market-data";
import { cn, compactUsd, signed, usd } from "@/lib/utils";

const chartText = "#94a3b8";
const grid = "rgba(34,197,94,0.10)";
const chartCyan = "#22c55e";
const chartViolet = "#eab308";
const chartPink = "#ef4444";

const navItems = [
  { label: "Dashboard", href: "#dashboard", active: true },
  { label: "Research", href: "#research" },
  { label: "Signals", href: "#signals" },
  { label: "News", href: "#news-earnings" },
  { label: "Risk", href: "#risk-trading" },
];

function heatColor(value: number) {
  const opacity = Math.min(0.92, 0.18 + Math.abs(value) * 0.62);
  return value >= 0 ? `rgba(34, 197, 94, ${opacity})` : `rgba(239, 68, 68, ${opacity})`;
}

const ParticleBackground = dynamic(
  () => import("@/components/particle-background").then((mod) => mod.ParticleBackground),
  { ssr: false },
);


type ResearchTicker = keyof typeof researchUniverse;

type Trade = {
  side: "BUY" | "SELL";
  ticker: string;
  shares: number;
  orderType: "Market" | "Limit" | "Stop";
};


const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: "-80px" },
};

const staggerItem = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
};

const signalTone = {
  BUY: { badge: "success" as const, className: "border-green-500/30 bg-green-500/10", icon: ArrowUpRight },
  SELL: { badge: "danger" as const, className: "border-red-500/30 bg-red-500/10", icon: ArrowDownRight },
  HOLD: { badge: "warning" as const, className: "border-yellow-500/30 bg-yellow-500/10", icon: Activity },
};

function holdingValue(holding: (typeof holdings)[number]) {
  return holding.shares * holding.currentPrice;
}

function holdingPnl(holding: (typeof holdings)[number]) {
  return holding.shares * (holding.currentPrice - holding.avgCost);
}


function formatCurrencyTooltip(value: unknown) {
  return typeof value === "number" ? usd.format(value) : String(value ?? "—");
}

function formatPercentTooltip(value: unknown) {
  return typeof value === "number" ? `${value.toFixed(1)}%` : String(value ?? "—");
}

function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  return (
    <ResponsiveContainer width="100%" height={42}>
      <LineChart data={data.map((value, index) => ({ index, value }))} margin={{ top: 6, right: 4, bottom: 4, left: 4 }}>
        <Line type="monotone" dataKey="value" stroke={positive ? "#22c55e" : "#ef4444"} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function MetricCard({
  title,
  value,
  detail,
  tone = "blue",
  icon: Icon,
}: {
  title: string;
  value: string;
  detail: string;
  tone?: "blue" | "green" | "red" | "yellow";
  icon: typeof Activity;
}) {
  const toneClass = {
    blue: "text-[#eab308] bg-yellow-500/10 border-yellow-500/25",
    green: "text-[#22c55e] bg-green-500/10 border-green-500/25",
    red: "text-[#ef4444] bg-red-500/10 border-red-500/25",
    yellow: "text-[#eab308] bg-yellow-500/10 border-yellow-500/25",
  }[tone];

  return (
    <motion.div variants={staggerItem}>
      <Card className="overflow-hidden">
        <CardContent className="flex items-start justify-between gap-2.5 p-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">{title}</p>
          <p className="numeric mt-2 text-2xl font-semibold text-[#f8fafc]">{value}</p>
          <p className="mt-1 text-sm text-zinc-400">{detail}</p>
        </div>
        <div className={cn("rounded-xl border p-2.5", toneClass)}>
          <Icon className="h-5 w-5" />
        </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SectionHeader({ icon: Icon, eyebrow, title, description }: { icon: typeof Activity; eyebrow: string; title: string; description: string }) {
  return (
    <motion.div {...fadeUp} className="mb-4 flex flex-col justify-between gap-2.5 md:flex-row md:items-end">
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-green-400">
          <Icon className="h-4 w-4" /> {eyebrow}
        </div>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-[#f8fafc] md:text-3xl">{title}</h2>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-[#94a3b8]">{description}</p>
    </motion.div>
  );
}

export default function Home() {
  const [query, setQuery] = useState<ResearchTicker>("NVDA");
  const [paperBalance, setPaperBalance] = useState(500000);
  const [trade, setTrade] = useState<Trade>({ side: "BUY", ticker: "NVDA", shares: 25, orderType: "Market" });
  const [executions, setExecutions] = useState<string[]>([
    "BUY 15 MSFT @ $428.67 — model portfolio rebalance",
    "SELL 30 TSLA @ $214.11 — risk trim after signal downgrade",
  ]);

  const enrichedHoldings = useMemo(
    () =>
      holdings.map((holding) => ({
        ...holding,
        value: holdingValue(holding),
        pnl: holdingPnl(holding),
        pctChange: (holding.currentPrice - holding.avgCost) / holding.avgCost,
      })),
    [],
  );

  const totalValue = enrichedHoldings.reduce((sum, holding) => sum + holding.value, 0);
  const totalCost = holdings.reduce((sum, holding) => sum + holding.shares * holding.avgCost, 0);
  const totalPnl = totalValue - totalCost;
  const topHolding = enrichedHoldings.toSorted((a, b) => b.value - a.value)[0];

  const allocation = Object.values(
    enrichedHoldings.reduce<Record<string, { sector: string; value: number; fill: string }>>((acc, holding) => {
      acc[holding.sector] ??= { sector: holding.sector, value: 0, fill: sectorColors[holding.sector] ?? "#64748b" };
      acc[holding.sector].value += holding.value;
      return acc;
    }, {}),
  ).toSorted((a, b) => b.value - a.value);

  const research = researchUniverse[query];
  const researchChart = research.chart.map((close, index) => ({
    day: `D${index + 1}`,
    close,
    ma50: research.ma50 + (index - 5) * 0.55,
    ma200: research.ma200 + (index - 5) * 0.2,
    rangeLow: close * 0.985,
    rangeHigh: close * 1.016,
  }));

  const concentrationWarnings = allocation
    .filter((sector) => sector.value / totalValue > 0.18)
    .map((sector) => `${sector.sector} exposure at ${((sector.value / totalValue) * 100).toFixed(1)}%`);

  function executeTrade() {
    const universePrice = researchUniverse[trade.ticker as ResearchTicker]?.price ?? watchlist.find((item) => item.ticker === trade.ticker)?.price ?? 100;
    const notional = universePrice * trade.shares;
    setPaperBalance((balance) => (trade.side === "BUY" ? balance - notional : balance + notional));
    setExecutions((items) => [`${trade.side} ${trade.shares} ${trade.ticker} @ ${usd.format(universePrice)} — ${trade.orderType}`, ...items].slice(0, 5));
  }

  return (
    <main className="market-grid min-h-screen">
      <nav className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-[1360px] -translate-x-1/2 rounded-md border border-white/[0.06] bg-white/[0.04] px-2.5 py-1.5 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-2.5">
          <a href="#" className="group flex items-center gap-2 rounded-md px-2.5 py-1.5 text-base font-semibold text-[#f8fafc]">
            <span className="h-2.5 w-2.5 rounded-md bg-cyan-300 shadow-[0_0_18px_rgba(34,197,94,0.8)]" />
            Vaulted
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md border border-transparent px-4 py-2 text-base text-[#94a3b8] transition hover:border-green-500/30 hover:bg-green-500/10 hover:text-green-100 hover:shadow-[0_0_22px_rgba(34,197,94,0.18)]",
                  item.active && "border-green-500/35 bg-green-500/10 text-green-100 shadow-[0_0_24px_rgba(34,197,94,0.22)]",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
          <a href="#risk-trading" className="rounded-md bg-[linear-gradient(135deg,#15803d,#22c55e)] px-4 py-2 text-base font-semibold text-white shadow-lg shadow-green-500/20 transition hover:-translate-y-0.5 hover:shadow-green-400/40">Trade Desk</a>
        </div>
      </nav>

      <header className="relative isolate overflow-hidden border-b border-white/10 bg-[#050510]/55 pt-28 backdrop-blur-xl">
        <ParticleBackground />
        <div className="absolute left-1/2 top-0 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-md bg-[radial-gradient(circle,rgba(34,197,94,0.22),transparent_65%)] blur-3xl" aria-hidden="true" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto flex max-w-[1360px] flex-col gap-8 px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:py-10"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-green-500/25 bg-green-500/10 px-3 py-1 text-sm text-green-100">
              <Sparkles className="h-4 w-4" /> Vaulted Financial • Series B Fintech demo
            </div>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-6xl">
              Trading & Market <span className="shimmer-text">Intelligence</span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#94a3b8]">
              A Bloomberg-terminal-inspired research cockpit: portfolio performance, AI trading signals, earnings narratives, risk diagnostics, and paper execution in one responsive Next.js platform.
            </p>
          </div>
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid grid-cols-2 gap-2.5 text-sm md:grid-cols-4 lg:w-[560px]">
            {["Live-style mock prices", "Drizzle-ready data layer", "Auth.js v5 scaffold", "Recharts analytics"].map((item) => (
              <motion.div key={item} variants={staggerItem} className="glass-card rounded-xl p-2.5 text-zinc-300">
                <div className="mb-2 h-1.5 w-12 rounded-md bg-[linear-gradient(90deg,#eab308,#22c55e)] shadow-[0_0_20px_rgba(34,197,94,0.35)]" />
                {item}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </header>

      <div className="mx-auto flex max-w-[1360px] flex-col gap-10 px-4 py-10 md:gap-14">
        <motion.section id="dashboard" {...fadeUp}>
          <SectionHeader
            icon={BriefcaseBusiness}
            eyebrow="Portfolio Dashboard"
            title="Institutional portfolio command center"
            description="Fifteen seeded holdings with realistic cost basis, live-style mark prices, allocation analytics, and benchmark-relative performance."
          />
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Portfolio Value" value={usd.format(totalValue)} detail={`${signed((totalPnl / totalCost) * 100, "%")} total return YTD`} tone="green" icon={CircleDollarSign} />
            <MetricCard title="Unrealized P&L" value={usd.format(totalPnl)} detail={`${usd.format(totalCost)} invested cost basis`} tone={totalPnl >= 0 ? "green" : "red"} icon={BadgeDollarSign} />
            <MetricCard title="Top Holding" value={topHolding.ticker} detail={`${usd.format(topHolding.value)} • ${((topHolding.value / totalValue) * 100).toFixed(1)}% weight`} tone="blue" icon={BarChart3} />
            <MetricCard title="Risk Alerts" value={String(concentrationWarnings.length)} detail="Concentration rules tripped above 18%" tone="yellow" icon={ShieldAlert} />
          </motion.div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1.45fr_0.9fr]">
            <Card>
              <CardHeader className="flex-row items-center justify-between gap-2.5">
                <div>
                  <CardTitle>Holdings</CardTitle>
                  <CardDescription>Shares, average cost, current mark, P&L, and percentage change.</CardDescription>
                </div>
                <Badge variant="blue">15 positions</Badge>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full min-w-[860px] border-separate border-spacing-0 text-base">
                    <thead>
                      <tr className="text-left text-xs uppercase tracking-[0.16em] text-zinc-500">
                        <th className="border-b border-white/10 pb-3">Ticker</th>
                        <th className="border-b border-white/10 pb-3">Company</th>
                        <th className="border-b border-white/10 pb-3">Sector</th>
                        <th className="border-b border-white/10 pb-3 text-right">Shares</th>
                        <th className="border-b border-white/10 pb-3 text-right">Avg Cost</th>
                        <th className="border-b border-white/10 pb-3 text-right">Price</th>
                        <th className="border-b border-white/10 pb-3 text-right">P&L</th>
                        <th className="border-b border-white/10 pb-3 text-right">% Chg</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrichedHoldings.map((holding, index) => (
                        <motion.tr
                          key={holding.ticker}
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.45, delay: index * 0.035 }}
                          className="transition-colors hover:bg-white/[0.03]"
                        >
                          <td className="border-b border-white/5 py-2 font-semibold text-zinc-100">{holding.ticker}</td>
                          <td className="border-b border-white/5 py-2 text-zinc-300">{holding.company}</td>
                          <td className="border-b border-white/5 py-2 text-zinc-400">{holding.sector}</td>
                          <td className="numeric border-b border-white/5 py-2 text-right">{holding.shares.toLocaleString()}</td>
                          <td className="numeric border-b border-white/5 py-2 text-right">{usd.format(holding.avgCost)}</td>
                          <td className="numeric border-b border-white/5 py-2 text-right">{usd.format(holding.currentPrice)}</td>
                          <td className={cn("numeric border-b border-white/5 py-2 text-right font-medium", holding.pnl >= 0 ? "text-green-400" : "text-red-400")}>{usd.format(holding.pnl)}</td>
                          <td className={cn("numeric border-b border-white/5 py-2 text-right", holding.pctChange >= 0 ? "text-green-400" : "text-red-400")}>{signed(holding.pctChange * 100, "%")}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Allocation</CardTitle>
                <CardDescription>Donut chart by mark-to-market value.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[360px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={allocation} dataKey="value" nameKey="sector" innerRadius={78} outerRadius={126} paddingAngle={3}>
                        {allocation.map((entry) => (
                          <Cell key={entry.sector} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={formatCurrencyTooltip} contentStyle={{ background: "#09090b", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {allocation.map((item) => (
                    <div key={item.sector} className="flex items-center justify-between gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-sm">
                      <span className="flex items-center gap-2 text-zinc-300"><span className="h-2.5 w-2.5 rounded-md" style={{ background: item.fill }} />{item.sector}</span>
                      <span className="numeric text-zinc-100">{((item.value / totalValue) * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader className="flex-row items-center justify-between gap-2.5">
              <div>
                <CardTitle>Performance vs S&P 500</CardTitle>
                <CardDescription>12 months of portfolio growth compared with benchmark baseline.</CardDescription>
              </div>
              <Badge variant="success">+{(((performance.at(-1)?.portfolio ?? 1) / performance[0].portfolio - 1) * 100).toFixed(1)}% portfolio</Badge>
            </CardHeader>
            <CardContent className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performance} margin={{ top: 10, right: 24, left: 8, bottom: 0 }}>
                  <CartesianGrid stroke={grid} vertical={false} />
                  <XAxis dataKey="month" stroke={chartText} />
                  <YAxis stroke={chartText} tickFormatter={(value) => compactUsd.format(Number(value))} />
                  <Tooltip formatter={formatCurrencyTooltip} contentStyle={{ background: "#09090b", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
                  <Line type="monotone" dataKey="portfolio" stroke={chartCyan} strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="sp500" stroke={chartViolet} strokeWidth={2} dot={false} strokeDasharray="6 6" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section id="research" {...fadeUp} className="grid gap-4 xl:grid-cols-[1fr_0.85fr]">
          <Card>
            <CardHeader>
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-green-400"><Search className="h-4 w-4" /> Market Research</div>
                  <CardTitle>Search any ticker in the seeded research book</CardTitle>
                  <CardDescription>Fundamentals, technicals, chart context, and AI-generated investment summary.</CardDescription>
                </div>
                <Badge variant="blue">4 hours of research → 30 seconds</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col gap-2.5 sm:flex-row">
                <Input value={query} onChange={(event) => setQuery((event.target.value.toUpperCase() in researchUniverse ? event.target.value.toUpperCase() : query) as ResearchTicker)} placeholder="Try NVDA, MSFT, AAPL, GOOGL, AMZN, TSLA" />
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(researchUniverse) as ResearchTicker[]).map((ticker) => (
                    <Button key={ticker} size="sm" variant={query === ticker ? "default" : "outline"} onClick={() => setQuery(ticker)}>{ticker}</Button>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="h-[340px] rounded-xl border border-white/10 bg-black/30 p-2.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={researchChart} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                      <CartesianGrid stroke={grid} vertical={false} />
                      <XAxis dataKey="day" stroke={chartText} />
                      <YAxis stroke={chartText} domain={["dataMin - 8", "dataMax + 8"]} />
                      <Tooltip formatter={formatCurrencyTooltip} contentStyle={{ background: "#09090b", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
                      <Bar dataKey="rangeHigh" fill="rgba(124,58,237,0.16)" radius={[4, 4, 0, 0]} />
                      <Area type="monotone" dataKey="close" fill="rgba(34,197,94,0.12)" stroke={chartCyan} strokeWidth={3} />
                      <Line type="monotone" dataKey="ma50" stroke={chartViolet} strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="ma200" stroke={chartPink} strokeWidth={2} dot={false} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-3xl font-semibold">{query}</h3>
                      <p className="text-zinc-400">{research.name}</p>
                    </div>
                    <div className="numeric text-right text-2xl font-semibold text-green-400">{usd.format(research.price)}</div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    {[
                      ["P/E", research.pe],
                      ["Market Cap", research.marketCap],
                      ["Revenue", research.revenue],
                      ["EPS", research.eps],
                      ["RSI", research.rsi],
                      ["MACD", research.macd],
                      ["50D MA", usd.format(research.ma50)],
                      ["200D MA", usd.format(research.ma200)],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{label}</p>
                        <p className="numeric mt-1 font-semibold text-zinc-100">{value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm leading-6 text-green-100">
                    <BrainCircuit className="mr-2 inline h-4 w-4" /> {research.analysis}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Watchlist</CardTitle>
              <CardDescription>Mocked real-time-style prices, alert context, and miniature sparklines.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {watchlist.map((item) => (
                <div key={item.ticker} className="grid grid-cols-[0.8fr_0.8fr_1fr] items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
                  <div>
                    <p className="font-heading text-xl font-semibold">{item.ticker}</p>
                    <p className="numeric text-sm text-zinc-400">{usd.format(item.price)}</p>
                  </div>
                  <div className={cn("numeric text-right text-sm font-semibold", item.change >= 0 ? "text-green-400" : "text-red-400")}>{signed(item.change, "%")}</div>
                  <div>
                    <MiniSparkline data={item.spark} positive={item.change >= 0} />
                    <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500"><BellRing className="h-3 w-3" /> {item.alert}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.section>

        <motion.section id="signals" {...fadeUp}>
          <SectionHeader icon={CandlestickChart} eyebrow="Trading Signals" title="Daily AI signal tape" description="Ten daily signals with direction, confidence, supporting indicators, and concise model reasoning." />
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {signals.map((signal) => {
              const Icon = signalTone[signal.direction].icon;
              return (
                <motion.div key={signal.ticker} variants={staggerItem}>
                  <Card className={signalTone[signal.direction].className}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-2.5">
                      <div className="font-heading text-2xl font-semibold">{signal.ticker}</div>
                      <Badge variant={signalTone[signal.direction].badge}><Icon className="mr-1 h-3 w-3" />{signal.direction}</Badge>
                    </div>
                    <div className="mt-4">
                      <div className="mb-1 flex items-center justify-between text-xs text-zinc-400"><span>Confidence</span><span>{signal.confidence}%</span></div>
                      <div className="h-2 rounded-md bg-white/10"><div className="h-2 rounded-md bg-[linear-gradient(90deg,#eab308,#22c55e)] text-cyan-400" style={{ width: `${signal.confidence}%` }} /></div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-zinc-300">{signal.reasoning}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {signal.indicators.map((indicator) => <Badge key={indicator} variant="outline" className="normal-case tracking-normal">{indicator}</Badge>)}
                    </div>
                  </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section id="news-earnings" {...fadeUp} className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader className="flex-row items-center justify-between gap-2.5">
              <div>
                <CardTitle className="flex items-center gap-2"><Newspaper className="h-6 w-6 text-green-400" /> News Feed</CardTitle>
                <CardDescription>50+ AI-scored financial news items with ticker tags, sentiment, source, and impact assessment.</CardDescription>
              </div>
              <Badge variant="blue">{news.length} items</Badge>
            </CardHeader>
            <CardContent>
              <div className="max-h-[720px] space-y-2 overflow-y-auto pr-2 scrollbar-thin">
                {news.map((item) => (
                  <article key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex flex-col justify-between gap-2.5 sm:flex-row sm:items-start">
                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge variant="outline">{item.ticker}</Badge>
                          <Badge variant={item.sentiment === "positive" ? "success" : item.sentiment === "negative" ? "danger" : "warning"}>{item.sentiment}</Badge>
                          <span className="text-xs text-zinc-500">{item.source} • {item.time}</span>
                        </div>
                        <h3 className="font-medium text-zinc-100">{item.headline}</h3>
                      </div>
                      <div className={cn("numeric text-right font-semibold", item.score > 0 ? "text-green-400" : item.score < 0 ? "text-red-400" : "text-yellow-400")}>{item.score > 0 ? "+" : ""}{item.score}</div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{item.impact}</p>
                  </article>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Analyzer</CardTitle>
                <CardDescription>Beat/miss, guidance change, management tone, key metric deltas, and AI narrative.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {earnings.map((item) => (
                  <div key={item.ticker} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-start justify-between gap-2.5">
                      <div>
                        <p className="font-heading text-2xl font-semibold">{item.ticker}</p>
                        <p className="text-sm text-zinc-500">{item.quarter}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={item.result === "Beat" ? "success" : "danger"}>{item.result}</Badge>
                        <Badge variant={item.guidance === "Raised" ? "success" : item.guidance === "Lowered" ? "danger" : "warning"}>{item.guidance}</Badge>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                      <div className="rounded-lg bg-black/25 p-2"><p className="text-zinc-500">Tone</p><p className="numeric font-semibold">{item.tone}/100</p></div>
                      <div className="rounded-lg bg-black/25 p-2"><p className="text-zinc-500">Revenue</p><p className="numeric font-semibold">{item.revenueDelta}</p></div>
                      <div className="rounded-lg bg-black/25 p-2"><p className="text-zinc-500">Margin</p><p className="numeric font-semibold">{item.marginDelta}</p></div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{item.narrative}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section id="risk-trading" {...fadeUp} className="grid gap-4 xl:grid-cols-[1fr_0.82fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Radar className="h-6 w-6 text-green-400" /> Risk Monitor</CardTitle>
              <CardDescription>Concentration warnings, correlation heatmap, max drawdown profile, and sector exposure.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-2">
                  {concentrationWarnings.map((warning) => (
                    <div key={warning} className="flex items-start gap-2.5 rounded-xl border border-yellow-500/25 bg-yellow-500/10 p-2.5 text-sm text-yellow-100">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {warning}. Suggested action: cap incremental buys and fund with underweight defensive sectors.
                    </div>
                  ))}
                  <div className="h-[270px] rounded-xl border border-white/10 bg-black/25 p-2.5">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performance} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                        <CartesianGrid stroke={grid} vertical={false} />
                        <XAxis dataKey="month" stroke={chartText} />
                        <YAxis stroke={chartText} tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={formatPercentTooltip} contentStyle={{ background: "#09090b", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
                        <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" />
                        <Area type="monotone" dataKey="drawdown" fill="rgba(124,58,237,0.22)" stroke={chartViolet} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 font-heading text-2xl font-semibold">Correlation Matrix</h3>
                  <div className="grid gap-1" style={{ gridTemplateColumns: `80px repeat(${correlationTickers.length}, minmax(38px, 1fr))` }}>
                    <div />
                    {correlationTickers.map((ticker) => <div key={ticker} className="text-center text-xs text-zinc-500">{ticker}</div>)}
                    {correlationMatrix.map((row, rowIndex) => [
                      <div key={`${correlationTickers[rowIndex]}-label`} className="flex items-center text-xs text-zinc-500">{correlationTickers[rowIndex]}</div>,
                      ...row.map((value, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className="numeric flex aspect-square items-center justify-center rounded-md text-xs font-semibold text-white shadow-inner shadow-black/20"
                          style={{ backgroundColor: heatColor(value) }}
                          title={`${correlationTickers[rowIndex]} / ${correlationTickers[colIndex]}: ${value}`}
                        >
                          {value.toFixed(2)}
                        </div>
                      )),
                    ])}
                  </div>
                  <div className="mt-4 h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={allocation} layout="vertical" margin={{ top: 4, right: 20, bottom: 4, left: 76 }}>
                        <CartesianGrid stroke={grid} horizontal={false} />
                        <XAxis type="number" stroke={chartText} tickFormatter={(value) => `${((Number(value) / totalValue) * 100).toFixed(0)}%`} />
                        <YAxis dataKey="sector" type="category" stroke={chartText} width={92} />
                        <Tooltip formatter={formatCurrencyTooltip} contentStyle={{ background: "#09090b", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
                        <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                          {allocation.map((entry) => <Cell key={entry.sector} fill={entry.fill} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><WalletCards className="h-6 w-6 text-green-400" /> Paper Trading</CardTitle>
              <CardDescription>Simple buy/sell workflow with virtual $500K starting balance and execution ledger.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-green-300">Virtual Balance</p>
                <p className="numeric mt-2 font-heading text-4xl font-semibold">{usd.format(paperBalance)}</p>
              </div>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-zinc-400">Side
                  <Select value={trade.side} onChange={(event) => setTrade({ ...trade, side: event.target.value as Trade["side"] })}>
                    <option>BUY</option>
                    <option>SELL</option>
                  </Select>
                </label>
                <label className="space-y-2 text-sm text-zinc-400">Ticker
                  <Select value={trade.ticker} onChange={(event) => setTrade({ ...trade, ticker: event.target.value })}>
                    {[...Object.keys(researchUniverse), ...watchlist.map((item) => item.ticker)].map((ticker) => <option key={ticker}>{ticker}</option>)}
                  </Select>
                </label>
                <label className="space-y-2 text-sm text-zinc-400">Shares
                  <Input type="number" min={1} value={trade.shares} onChange={(event) => setTrade({ ...trade, shares: Number(event.target.value) })} />
                </label>
                <label className="space-y-2 text-sm text-zinc-400">Order Type
                  <Select value={trade.orderType} onChange={(event) => setTrade({ ...trade, orderType: event.target.value as Trade["orderType"] })}>
                    <option>Market</option>
                    <option>Limit</option>
                    <option>Stop</option>
                  </Select>
                </label>
              </div>
              <Button className="mt-4 w-full" size="lg" onClick={executeTrade}>Preview & Execute Paper Order</Button>
              <div className="mt-4 space-y-2">
                <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">Recent executions</p>
                {executions.map((item) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-sm text-zinc-300">{item}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.footer {...fadeUp} className="glass-card rounded-xl border border-white/10 bg-black/40 p-4 text-center text-base text-[#94a3b8]">
          Built for Vaulted Financial as an Ark portfolio showcase. Demo data is seeded and fictional for presentation only.
        </motion.footer>
      </div>
    </main>
  );
}
