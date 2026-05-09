export type Holding = {
  ticker: string;
  company: string;
  sector: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
};

export type SignalDirection = "BUY" | "SELL" | "HOLD";
export type Sentiment = "positive" | "negative" | "neutral";

export const holdings: Holding[] = [
  { ticker: "AAPL", company: "Apple Inc.", sector: "Technology", shares: 420, avgCost: 168.24, currentPrice: 193.12 },
  { ticker: "MSFT", company: "Microsoft", sector: "Technology", shares: 310, avgCost: 351.4, currentPrice: 428.67 },
  { ticker: "NVDA", company: "NVIDIA", sector: "Semiconductors", shares: 540, avgCost: 86.35, currentPrice: 129.84 },
  { ticker: "GOOGL", company: "Alphabet Class A", sector: "Communication", shares: 390, avgCost: 141.2, currentPrice: 176.44 },
  { ticker: "AMZN", company: "Amazon", sector: "Consumer Discretionary", shares: 260, avgCost: 155.9, currentPrice: 184.18 },
  { ticker: "META", company: "Meta Platforms", sector: "Communication", shares: 185, avgCost: 376.8, currentPrice: 503.72 },
  { ticker: "TSLA", company: "Tesla", sector: "Consumer Discretionary", shares: 210, avgCost: 238.7, currentPrice: 214.11 },
  { ticker: "JPM", company: "JPMorgan Chase", sector: "Financials", shares: 375, avgCost: 164.3, currentPrice: 209.34 },
  { ticker: "V", company: "Visa", sector: "Financials", shares: 155, avgCost: 244.5, currentPrice: 276.91 },
  { ticker: "LLY", company: "Eli Lilly", sector: "Healthcare", shares: 90, avgCost: 626.2, currentPrice: 781.25 },
  { ticker: "UNH", company: "UnitedHealth", sector: "Healthcare", shares: 130, avgCost: 512.4, currentPrice: 489.36 },
  { ticker: "XOM", company: "Exxon Mobil", sector: "Energy", shares: 460, avgCost: 103.2, currentPrice: 115.08 },
  { ticker: "COST", company: "Costco", sector: "Consumer Staples", shares: 76, avgCost: 691.6, currentPrice: 842.4 },
  { ticker: "AVGO", company: "Broadcom", sector: "Semiconductors", shares: 225, avgCost: 131.8, currentPrice: 173.26 },
  { ticker: "CRM", company: "Salesforce", sector: "Technology", shares: 190, avgCost: 262.1, currentPrice: 247.55 }
];

export const performance = [
  { month: "Jan", portfolio: 1000000, sp500: 1000000, drawdown: 0 },
  { month: "Feb", portfolio: 1024300, sp500: 1015100, drawdown: -1.1 },
  { month: "Mar", portfolio: 1068700, sp500: 1032200, drawdown: -0.4 },
  { month: "Apr", portfolio: 1049800, sp500: 1027100, drawdown: -3.8 },
  { month: "May", portfolio: 1107200, sp500: 1060800, drawdown: -1.6 },
  { month: "Jun", portfolio: 1160400, sp500: 1089900, drawdown: -0.9 },
  { month: "Jul", portfolio: 1216900, sp500: 1118300, drawdown: -0.3 },
  { month: "Aug", portfolio: 1198800, sp500: 1107600, drawdown: -4.7 },
  { month: "Sep", portfolio: 1246200, sp500: 1133400, drawdown: -2.2 },
  { month: "Oct", portfolio: 1294100, sp500: 1165200, drawdown: -1.4 },
  { month: "Nov", portfolio: 1367200, sp500: 1211800, drawdown: -0.6 },
  { month: "Dec", portfolio: 1413800, sp500: 1240900, drawdown: -0.2 }
];

export const sectorColors: Record<string, string> = {
  Technology: "#00d4ff",
  Semiconductors: "#7c3aed",
  Communication: "#ec4899",
  "Consumer Discretionary": "#38bdf8",
  Financials: "#a78bfa",
  Healthcare: "#22d3ee",
  Energy: "#8b5cf6",
  "Consumer Staples": "#67e8f9"
};

export const signals = [
  { ticker: "NVDA", direction: "BUY" as const, confidence: 93, reasoning: "Accelerating data-center backlog and positive channel checks support another earnings revision cycle.", indicators: ["RSI 62", "MACD Bullish", "50D > 200D"] },
  { ticker: "TSLA", direction: "SELL" as const, confidence: 78, reasoning: "Margin compression and inventory build outweigh robotaxi narrative in the next 30-day window.", indicators: ["RSI 41", "Lower highs", "Volume distribution"] },
  { ticker: "MSFT", direction: "BUY" as const, confidence: 89, reasoning: "Azure AI attach rate remains under-modeled while enterprise renewals show defensive quality.", indicators: ["RSI 58", "MACD Bullish", "Cloud momentum"] },
  { ticker: "AAPL", direction: "HOLD" as const, confidence: 64, reasoning: "Services durability offsets hardware softness, but valuation caps near-term risk/reward.", indicators: ["RSI 52", "Flat MA", "Options neutral"] },
  { ticker: "JPM", direction: "BUY" as const, confidence: 81, reasoning: "Net interest income resilience and credit discipline position the bank for relative outperformance.", indicators: ["RSI 60", "Credit spreads stable", "Dividend support"] },
  { ticker: "UNH", direction: "HOLD" as const, confidence: 59, reasoning: "Medical cost trend uncertainty remains elevated despite attractive long-term cash generation.", indicators: ["RSI 47", "Support test", "Guidance watch"] },
  { ticker: "AVGO", direction: "BUY" as const, confidence: 87, reasoning: "Custom silicon demand and VMware synergy capture provide multi-quarter visibility.", indicators: ["Breakout", "RSI 66", "Earnings revisions"] },
  { ticker: "XOM", direction: "HOLD" as const, confidence: 61, reasoning: "Oil beta is useful portfolio ballast, but crack spreads suggest limited upside catalyst this week.", indicators: ["WTI rangebound", "RSI 55", "Dividend yield"] },
  { ticker: "CRM", direction: "SELL" as const, confidence: 71, reasoning: "Seat expansion is slowing and the setup needs proof that AI monetization can reaccelerate growth.", indicators: ["RSI 38", "Below 200D", "Estimate cuts"] },
  { ticker: "LLY", direction: "BUY" as const, confidence: 84, reasoning: "GLP-1 supply expansions and pipeline optionality keep the premium multiple defensible.", indicators: ["RSI 63", "Positive revisions", "Strong relative strength"] }
];

export const watchlist = [
  { ticker: "AMD", price: 164.92, change: 2.16, alert: "AI GPU order chatter", spark: [151, 153, 155, 152, 158, 161, 165] },
  { ticker: "NFLX", price: 682.31, change: -0.84, alert: "Subscriber print in 9 days", spark: [695, 690, 687, 692, 685, 680, 682] },
  { ticker: "SNOW", price: 138.43, change: 3.42, alert: "Break above 50D", spark: [124, 127, 128, 131, 129, 134, 138] },
  { ticker: "PANW", price: 336.12, change: 1.28, alert: "Cyber basket bid", spark: [320, 322, 328, 327, 331, 334, 336] },
  { ticker: "SHOP", price: 71.58, change: -1.71, alert: "GMV debate", spark: [77, 75, 74, 73, 72, 73, 72] },
  { ticker: "PLTR", price: 28.73, change: 4.92, alert: "Volume spike", spark: [24, 25, 25.4, 26, 26.8, 27.5, 28.7] },
  { ticker: "ADBE", price: 515.06, change: -0.34, alert: "Firefly monetization", spark: [522, 519, 521, 516, 514, 517, 515] },
  { ticker: "CRWD", price: 351.44, change: 2.03, alert: "Channel checks positive", spark: [330, 334, 336, 340, 343, 348, 351] }
];

export const researchUniverse = {
  AAPL: {
    name: "Apple Inc.", price: 193.12, pe: 29.6, marketCap: "$2.96T", revenue: "$385.7B", eps: "$6.43", rsi: 52, macd: "Neutral +0.18", ma50: 190.4, ma200: 181.8,
    analysis: "Apple screens as a quality compounder with resilient services gross margin, but the next leg requires visible device upgrade acceleration or clearer AI-driven replacement demand. Vaulted Financial's model rates downside as contained by buybacks and ecosystem retention while recommending a patient accumulation band below current spot.",
    chart: [176, 181, 179, 184, 186, 183, 188, 191, 189, 193]
  },
  MSFT: {
    name: "Microsoft", price: 428.67, pe: 34.1, marketCap: "$3.19T", revenue: "$236.6B", eps: "$12.55", rsi: 58, macd: "Bullish +1.42", ma50: 417.2, ma200: 389.5,
    analysis: "Microsoft remains the platform winner in enterprise AI, combining Azure consumption, Copilot attach, and disciplined opex. The signal engine expects further estimate drift higher as cloud commitments convert into recognized revenue.",
    chart: [392, 397, 405, 411, 409, 416, 421, 419, 426, 429]
  },
  NVDA: {
    name: "NVIDIA", price: 129.84, pe: 47.8, marketCap: "$3.18T", revenue: "$96.3B", eps: "$2.71", rsi: 62, macd: "Bullish +2.04", ma50: 121.1, ma200: 99.8,
    analysis: "NVIDIA continues to convert AI infrastructure demand into free cash flow at extraordinary incremental margins. Supply-chain readings suggest Blackwell demand is still outstripping supply, keeping the risk skew positive despite premium valuation.",
    chart: [98, 104, 111, 108, 116, 121, 119, 126, 128, 130]
  },
  GOOGL: {
    name: "Alphabet", price: 176.44, pe: 24.3, marketCap: "$2.17T", revenue: "$318.1B", eps: "$7.25", rsi: 56, macd: "Bullish +0.76", ma50: 171.2, ma200: 154.6,
    analysis: "Alphabet offers the best large-cap AI value spread: Search cash flows fund Gemini deployment while Cloud margins expand. Regulatory overhang is real, but free cash flow yield compensates for it.",
    chart: [149, 153, 157, 160, 164, 162, 168, 171, 174, 176]
  },
  TSLA: {
    name: "Tesla", price: 214.11, pe: 61.2, marketCap: "$682.2B", revenue: "$96.8B", eps: "$3.49", rsi: 41, macd: "Bearish -1.11", ma50: 229.8, ma200: 238.7,
    analysis: "Tesla's narrative remains high beta, but near-term fundamentals point to margin pressure, model refresh uncertainty, and regional pricing competition. The platform flags a tactical underweight until delivery growth stabilizes.",
    chart: [251, 244, 238, 232, 226, 229, 221, 218, 216, 214]
  },
  AMZN: {
    name: "Amazon", price: 184.18, pe: 42.4, marketCap: "$1.93T", revenue: "$590.7B", eps: "$4.34", rsi: 57, macd: "Bullish +0.52", ma50: 181.4, ma200: 164.2,
    analysis: "Amazon's retail efficiency gains and AWS AI demand provide a balanced earnings expansion setup. The model sees operating margin as the primary driver for the next rerating.",
    chart: [161, 166, 170, 169, 174, 178, 176, 181, 183, 184]
  }
};

export const earnings = [
  { ticker: "NVDA", quarter: "Q3 FY26", result: "Beat", guidance: "Raised", tone: 92, revenueDelta: "+18.4% vs consensus", marginDelta: "+210 bps", narrative: "Management emphasized broad hyperscaler demand, sovereign AI projects, and better supply availability. The call tone was confident with repeated references to multi-year visibility." },
  { ticker: "AAPL", quarter: "Q4 FY25", result: "Beat", guidance: "In-line", tone: 68, revenueDelta: "+1.9% vs consensus", marginDelta: "+60 bps", narrative: "Services outperformance and buybacks supported EPS, while hardware commentary stayed measured. AI features were framed as a retention driver rather than an immediate revenue event." },
  { ticker: "TSLA", quarter: "Q3 FY25", result: "Miss", guidance: "Lowered", tone: 43, revenueDelta: "-4.8% vs consensus", marginDelta: "-330 bps", narrative: "The call leaned heavily on autonomy milestones but offered limited comfort on near-term auto margins. Analysts pressed management on utilization and price cuts." },
  { ticker: "JPM", quarter: "Q3 FY25", result: "Beat", guidance: "Raised", tone: 79, revenueDelta: "+3.6% vs consensus", marginDelta: "+90 bps efficiency", narrative: "Credit quality remained better than feared and deposit costs stabilized. Management tone suggested capital returns can continue without sacrificing reserve discipline." },
  { ticker: "CRM", quarter: "Q2 FY26", result: "Miss", guidance: "Lowered", tone: 51, revenueDelta: "-1.2% vs consensus", marginDelta: "+40 bps", narrative: "Operating discipline was solid, but sales-cycle elongation and uncertain AI SKU conversion overshadowed margin expansion." }
];

export const correlationTickers = ["AAPL", "MSFT", "NVDA", "AMZN", "JPM", "XOM", "LLY"];
export const correlationMatrix = [
  [1.0, 0.72, 0.64, 0.69, 0.38, 0.12, 0.24],
  [0.72, 1.0, 0.70, 0.66, 0.35, 0.09, 0.28],
  [0.64, 0.70, 1.0, 0.58, 0.29, 0.05, 0.19],
  [0.69, 0.66, 0.58, 1.0, 0.32, 0.14, 0.21],
  [0.38, 0.35, 0.29, 0.32, 1.0, 0.31, 0.17],
  [0.12, 0.09, 0.05, 0.14, 0.31, 1.0, -0.04],
  [0.24, 0.28, 0.19, 0.21, 0.17, -0.04, 1.0]
];

const newsTemplates = [
  ["AAPL", "Apple suppliers flag stronger premium phone build plans", "positive", 71, "Bloomberg", "AI impact: Services mix and replacement-cycle resilience could lift forward EPS sensitivity."],
  ["MSFT", "Microsoft expands enterprise Copilot controls for regulated industries", "positive", 76, "Reuters", "AI impact: Compliance features increase attach probability across banks, insurers, and healthcare."],
  ["NVDA", "Cloud buyers continue to reserve next-generation accelerator capacity", "positive", 88, "CNBC", "AI impact: Backlog durability supports elevated gross margin assumptions."],
  ["TSLA", "EV price cuts widen across two major European markets", "negative", -64, "MarketWatch", "AI impact: Margin pressure may force revisions lower before autonomy optionality is rewarded."],
  ["JPM", "Large banks pass stress screen with excess capital cushions", "positive", 54, "WSJ", "AI impact: Buyback flexibility improves financial-sector risk/reward."],
  ["AMZN", "Amazon logistics automation lowers unit delivery costs", "positive", 67, "Financial Times", "AI impact: Retail margin expansion broadens the earnings driver set beyond AWS."],
  ["GOOGL", "Search ad pricing remains stable despite generative AI rollout", "positive", 49, "The Information", "AI impact: Core cash flow risk appears manageable in the current quarter."],
  ["META", "Meta increases AI infrastructure budget for recommendation models", "neutral", 12, "TechCrunch", "AI impact: Higher capex is acceptable if engagement and ad conversion keep improving."],
  ["LLY", "GLP-1 manufacturing capacity expands ahead of schedule", "positive", 82, "STAT", "AI impact: Supply unlock could move consensus revenue estimates higher."],
  ["UNH", "Managed-care utilization trends remain above seasonal norms", "negative", -47, "Barron's", "AI impact: Medical cost ratio uncertainty keeps valuation recovery muted."],
  ["XOM", "Oil trades rangebound as OPEC commentary offsets demand concerns", "neutral", 5, "OilPrice", "AI impact: Energy exposure remains a diversification sleeve rather than alpha engine."],
  ["COST", "Costco traffic holds up as membership fee hike takes effect", "positive", 46, "Retail Dive", "AI impact: Durable loyalty supports premium multiple."],
  ["AVGO", "Broadcom custom silicon demand rises from hyperscale customers", "positive", 79, "Semafor", "AI impact: ASIC revenue visibility complements networking growth."],
  ["CRM", "Salesforce faces slower seat expansion in mid-market software", "negative", -38, "Seeking Alpha", "AI impact: AI monetization must offset traditional SaaS deceleration."],
  ["V", "Visa cross-border volume improves with summer travel demand", "positive", 41, "Payments Dive", "AI impact: Payment volume resilience lowers macro sensitivity."],
  ["AMD", "AMD launches updated accelerator roadmap for enterprise AI", "positive", 58, "AnandTech", "AI impact: Execution proof could narrow the valuation gap to NVIDIA."],
  ["NFLX", "Netflix ad tier reaches a new monthly active user milestone", "positive", 51, "Variety", "AI impact: Advertising ARPU can diversify subscriber-led growth."],
  ["SNOW", "Snowflake customer optimization cycle shows signs of easing", "positive", 36, "Motley Fool", "AI impact: Stabilizing consumption would improve software sentiment."],
  ["PANW", "Cybersecurity budgets remain defensive despite CFO scrutiny", "positive", 44, "CRN", "AI impact: Platformization narrative supports multiple durability."],
  ["SHOP", "Shopify merchants report uneven discretionary spending", "neutral", -8, "Retail Brew", "AI impact: GMV sensitivity should be watched into holiday planning."],
  ["PLTR", "Palantir wins additional government analytics framework", "positive", 63, "Defense News", "AI impact: Contract visibility increases confidence in public-sector growth."],
  ["ADBE", "Adobe creative AI adoption grows while pricing debate persists", "neutral", 9, "The Verge", "AI impact: Monetization timing remains the central stock debate."],
  ["CRWD", "CrowdStrike channel survey points to stronger endpoint demand", "positive", 57, "CyberScoop", "AI impact: Security consolidation favors category leaders."],
  ["AAPL", "Antitrust hearing schedule adds headline risk for mega-cap tech", "negative", -22, "Politico", "AI impact: Regulatory discount likely remains contained but persistent."],
  ["MSFT", "Azure region capacity additions target AI training workloads", "positive", 69, "Data Center Dynamics", "AI impact: Capacity expansion converts demand into billable cloud revenue."],
  ["NVDA", "Networking attach rates rise with large AI cluster deployments", "positive", 74, "ServeTheHome", "AI impact: Full-stack attach improves wallet share per deployment."],
  ["TSLA", "Battery input costs stabilize after lithium decline", "positive", 25, "Electrek", "AI impact: Cost relief helps but does not fully solve pricing pressure."],
  ["JPM", "Credit card delinquencies normalize but remain contained", "neutral", 6, "American Banker", "AI impact: Benign credit data supports portfolio financials exposure."],
  ["AMZN", "AWS launches managed inference service for enterprise agents", "positive", 62, "VentureBeat", "AI impact: Inference workloads may become the next cloud usage vector."],
  ["GOOGL", "YouTube connected-TV share reaches another high", "positive", 53, "AdAge", "AI impact: Video ad momentum provides upside to ad revenue mix."],
  ["META", "EU privacy ruling may require product changes", "negative", -31, "Euractiv", "AI impact: Compliance costs could offset near-term ad efficiency gains."],
  ["LLY", "Competitor obesity data appears less differentiated than expected", "positive", 66, "Endpoints", "AI impact: Competitive moat narrative strengthens for GLP-1 leaders."],
  ["UNH", "Policy proposals target Medicare Advantage coding intensity", "negative", -42, "KFF", "AI impact: Policy risk keeps managed care beta elevated."],
  ["XOM", "Refining margins narrow from peak seasonal levels", "negative", -18, "Argus", "AI impact: Upstream cash flow remains solid, downstream tailwind fades."],
  ["COST", "Private label penetration climbs across grocery categories", "positive", 39, "Grocery Dive", "AI impact: Margin mix can improve without sacrificing traffic."],
  ["AVGO", "VMware integration milestones arrive ahead of synergy plan", "positive", 61, "SiliconANGLE", "AI impact: Deleveraging path and software margins look better than modeled."],
  ["CRM", "Large customers delay CRM consolidation decisions", "negative", -35, "CIO Dive", "AI impact: Pipeline conversion risk argues for patience."],
  ["V", "Tokenized payment volume continues double-digit growth", "positive", 34, "PYMNTS", "AI impact: Digital payment security strengthens long-term moat."],
  ["AMD", "Server CPU share gains continue in cloud workloads", "positive", 42, "Tom's Hardware", "AI impact: CPU gains provide cash flow while GPU ecosystem scales."],
  ["NFLX", "Content slate receives strong early engagement metrics", "positive", 28, "Deadline", "AI impact: Lower churn risk supports ad tier scaling."],
  ["SNOW", "AI data clean-room partnerships expand addressable market", "positive", 32, "Datanami", "AI impact: Product breadth can reaccelerate consumption growth."],
  ["PANW", "Firewall refresh cycle shifts toward subscription bundles", "positive", 37, "SDxCentral", "AI impact: Recurring mix improves revenue visibility."],
  ["SHOP", "Payment attach rate rises among enterprise merchants", "positive", 30, "Modern Retail", "AI impact: Fintech services can cushion GMV cyclicality."],
  ["PLTR", "Commercial AIP pilots convert into multi-year contracts", "positive", 55, "TechTarget", "AI impact: Enterprise AI workflow adoption is moving past pilots."],
  ["ADBE", "Creative Cloud churn remains low after pricing update", "positive", 24, "PetaPixel", "AI impact: Pricing power supports AI investment cycle."],
  ["CRWD", "Incident response demand increases after sector-wide breaches", "positive", 48, "Dark Reading", "AI impact: Threat intensity reinforces cybersecurity priority."],
  ["AAPL", "Wearables demand remains soft in North America", "negative", -19, "IDC", "AI impact: Hardware softness moderates total revenue acceleration."],
  ["MSFT", "Gaming division highlights improving content pipeline", "neutral", 11, "IGN", "AI impact: Non-core segment optionality adds modest upside."],
  ["NVDA", "Export restriction headlines resurface for advanced chips", "negative", -29, "Nikkei Asia", "AI impact: Geographic revenue mix should be monitored, but demand remains broad."],
  ["AMZN", "FTC case timeline extends into next year", "neutral", -5, "Law360", "AI impact: Legal overhang is slow moving and not central to near-term estimates."],
  ["GOOGL", "Cloud database migrations show steady enterprise traction", "positive", 33, "InfoWorld", "AI impact: Data gravity supports AI platform adoption."],
  ["META", "Reels monetization gap continues to narrow", "positive", 45, "Social Media Today", "AI impact: Recommendation AI is translating engagement into revenue."],
  ["LLY", "Pipeline readout calendar remains catalyst rich", "positive", 52, "BioPharma Dive", "AI impact: Optionality supports premium healthcare allocation."],
  ["XOM", "Guyana production milestones offset mature basin declines", "positive", 26, "Upstream", "AI impact: Project execution supports cash-flow durability."]
] as const;

export const news = newsTemplates.map(([ticker, headline, sentiment, score, source, impact], index) => ({
  id: index + 1,
  ticker,
  headline,
  sentiment: sentiment as Sentiment,
  score,
  source,
  time: `${(index % 12) + 1}h ago`,
  impact
}));
