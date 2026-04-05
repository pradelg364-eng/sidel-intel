# SIDEL Competitive Intelligence Platform

A live competitive intelligence dashboard for **SIDEL** (Tetra Laval Group), tracking 6 key competitors across 4 core product lines, with IP analysis, financial benchmarking, regulatory monitoring, and R&D strategy recommendations.

## Live Dashboard

🔗 [Open Dashboard](https://www.perplexity.ai/computer/a/sidel-competitive-intelligence-avHvq_fETXmMw0B.lXzaSw)

---

## Features

| Module | Contents |
|---|---|
| **Dashboard** | KPI cards, strategic alerts, competitor cards with threat levels |
| **Competitors** | Full profiles — products, innovations, patents, business news, partnerships |
| **IP & Patents** | Patent heatmap, 40+ specific patents, critical IP alerts for SIDEL R&D |
| **Financials** | Revenue/growth charts, competitive radar, financial comparison table |
| **Regulatory** | EU + global regulatory tracker, 2025–2030 milestone roadmap, R&D trigger matrix |
| **R&D Strategy** | 8 prioritised strategic recommendations with specific actions |
| **Alerts** | Email distribution list management for monthly reports |

## Competitors Tracked

- Krones AG (Germany)
- KHS Group (Germany)
- SMI Group (Italy)
- ACMI/Omnia — successor to Sacmi Beverage (Italy)
- Serac Group (France)
- GEA Group — Beverage division (Germany)

## Product Lines Covered

- Blow Moulding (PET / EvoBLOW equivalent)
- Aseptic Filling (Predis/Combi equivalent)
- Filling & Capping Lines
- End-of-Line (palletising, wrapping, conveyors)

## Regulatory Domains

- EU PPWR, SUP Directive, PFAS ban, FCM reform, EPR
- US (FDA, state PCR mandates, FTC Green Guides)
- China, Brazil, India, UK, Global Plastics Treaty

---

## Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS + shadcn/ui + Recharts
- **Backend:** Express + Drizzle ORM + SQLite
- **Build:** Vite
- **Research data:** `/research/` directory (JSON files per competitor + regulatory)

## Local Development

```bash
npm install
npm run dev
# → http://localhost:5000
```

## Monthly Automation

A scheduled task runs on the **1st of each month** at 8:00 AM Paris time. It:
1. Researches all 6 competitors for new developments
2. Scans for new regulatory events and trigger activations
3. Sends an email summary to the distribution list
4. Links back to this dashboard

---

*Built with [Perplexity Computer](https://www.perplexity.ai/computer) · SIDEL R&D Strategy Intelligence*
