import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  code: varchar("code", { length: 6 }).primaryKey(),
  url: text("url").notNull(),
  clicks: integer("clicks").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
