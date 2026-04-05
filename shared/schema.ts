import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const reports = sqliteTable("reports", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  month: text("month").notNull(), // e.g. "2026-03"
  generatedAt: text("generated_at").notNull(),
  data: text("data").notNull(), // JSON blob of full research
});

export const emailSubscribers = sqliteTable("email_subscribers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  addedAt: text("added_at").notNull(),
});

export const insertReportSchema = createInsertSchema(reports).omit({ id: true });
export const insertSubscriberSchema = createInsertSchema(emailSubscribers).omit({ id: true });
export type InsertReport = z.infer<typeof insertReportSchema>;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Report = typeof reports.$inferSelect;
export type Subscriber = typeof emailSubscribers.$inferSelect;
