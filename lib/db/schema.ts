import { decimal, integer, jsonb, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({ columns: [verificationToken.identifier, verificationToken.token] }),
  }),
);

export const portfolios = pgTable("portfolios", {
  id: uuid("id").defaultRandom().primaryKey(),
  ownerId: text("owner_id").references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  clientName: text("client_name").notNull().default("Vaulted Financial"),
  virtualBalance: decimal("virtual_balance", { precision: 14, scale: 2 }).notNull().default("500000.00"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const holdingsTable = pgTable("holdings", {
  id: uuid("id").defaultRandom().primaryKey(),
  portfolioId: uuid("portfolio_id").references(() => portfolios.id, { onDelete: "cascade" }),
  ticker: text("ticker").notNull(),
  company: text("company").notNull(),
  sector: text("sector").notNull(),
  shares: decimal("shares", { precision: 14, scale: 4 }).notNull(),
  avgCost: decimal("avg_cost", { precision: 14, scale: 2 }).notNull(),
  currentPrice: decimal("current_price", { precision: 14, scale: 2 }).notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const marketSignals = pgTable("market_signals", {
  id: uuid("id").defaultRandom().primaryKey(),
  ticker: text("ticker").notNull(),
  direction: text("direction", { enum: ["BUY", "SELL", "HOLD"] }).notNull(),
  confidence: integer("confidence").notNull(),
  reasoning: text("reasoning").notNull(),
  indicators: jsonb("indicators").$type<string[]>().notNull(),
  generatedAt: timestamp("generated_at", { mode: "date" }).defaultNow().notNull(),
});

export const newsItems = pgTable("news_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  ticker: text("ticker").notNull(),
  headline: text("headline").notNull(),
  sentiment: text("sentiment", { enum: ["positive", "negative", "neutral"] }).notNull(),
  score: integer("score").notNull(),
  source: text("source").notNull(),
  impact: text("impact").notNull(),
  publishedAt: timestamp("published_at", { mode: "date" }).defaultNow().notNull(),
});
