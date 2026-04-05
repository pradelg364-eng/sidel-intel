import { db } from "./db";
import { reports, emailSubscribers, type Report, type Subscriber, type InsertReport, type InsertSubscriber } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getReports(): Report[];
  createReport(data: InsertReport): Report;
  getSubscribers(): Subscriber[];
  addSubscriber(data: InsertSubscriber): Subscriber;
  removeSubscriber(id: number): void;
}

export class Storage implements IStorage {
  getReports(): Report[] {
    return db.select().from(reports).all();
  }
  createReport(data: InsertReport): Report {
    return db.insert(reports).values(data).returning().get();
  }
  getSubscribers(): Subscriber[] {
    return db.select().from(emailSubscribers).all();
  }
  addSubscriber(data: InsertSubscriber): Subscriber {
    return db.insert(emailSubscribers).values(data).returning().get();
  }
  removeSubscriber(id: number): void {
    db.delete(emailSubscribers).where(eq(emailSubscribers.id, id)).run();
  }
}

export const storage = new Storage();
