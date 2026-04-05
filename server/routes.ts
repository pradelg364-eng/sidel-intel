import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema } from "@shared/schema";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // Get all subscribers
  app.get("/api/subscribers", (_req, res) => {
    const subs = storage.getSubscribers();
    res.json(subs);
  });

  // Add subscriber
  app.post("/api/subscribers", (req, res) => {
    const parsed = insertSubscriberSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid data", details: parsed.error });
    }
    try {
      const sub = storage.addSubscriber(parsed.data);
      res.status(201).json(sub);
    } catch (e: any) {
      if (e.message?.includes("UNIQUE")) {
        return res.status(409).json({ error: "Email already subscribed" });
      }
      res.status(500).json({ error: "Server error" });
    }
  });

  // Remove subscriber
  app.delete("/api/subscribers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
    storage.removeSubscriber(id);
    res.json({ success: true });
  });

  // Get latest reports
  app.get("/api/reports", (_req, res) => {
    const reps = storage.getReports();
    res.json(reps);
  });

  return httpServer;
}
