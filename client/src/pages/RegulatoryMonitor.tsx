import { useState } from "react";
import { regulatoryData } from "@/lib/regulatory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ExternalLink, Search, AlertTriangle, Clock } from "lucide-react";

const URGENCY_CFG = {
  critical: { label: "Critical", cls: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0" },
  high:     { label: "High",     cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0" },
  medium:   { label: "Medium",   cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0" },
  low:      { label: "Low",      cls: "bg-muted text-muted-foreground border-0" },
} as const;

const GEO_OPTIONS = ["All", "EU", "USA", "China", "Brazil", "India", "UK", "Global"];
const DOMAIN_OPTIONS = ["All", "Packaging", "FCM", "Chemical", "Carbon", "Digital", "EPR"];

export default function RegulatoryMonitor() {
  const { regulations } = regulatoryData;
  const [search, setSearch] = useState("");
  const [geo, setGeo] = useState("All");
  const [domain, setDomain] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = regulations.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.short_name.toLowerCase().includes(q) || r.impact_on_sidel.toLowerCase().includes(q);
    const matchGeo = geo === "All" || r.geography.includes(geo);
    const matchDomain = domain === "All" || r.domain.includes(domain);
    return matchSearch && matchGeo && matchDomain;
  });

  const criticalCount = regulations.filter(r => r.urgency === "critical").length;
  const highCount = regulations.filter(r => r.urgency === "high").length;

  // Next 3 upcoming deadlines
  const upcoming = [...regulations]
    .filter(r => r.next_date >= "2026-04-06")
    .sort((a, b) => a.next_date.localeCompare(b.next_date))
    .slice(0, 4);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold">Regulatory Monitor</h1>
        <p className="text-sm text-muted-foreground mt-0.5">42 regulations tracked · EU + Global · Updated April 2026</p>
      </div>

      {/* Summary pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-border"><CardContent className="p-3">
          <div className="text-xs text-muted-foreground">Total tracked</div>
          <div className="text-2xl font-bold mt-0.5">{regulations.length}</div>
          <div className="text-xs text-muted-foreground">regulations</div>
        </CardContent></Card>
        <Card className="border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20"><CardContent className="p-3">
          <div className="text-xs text-red-600 dark:text-red-400">Critical</div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mt-0.5">{criticalCount}</div>
          <div className="text-xs text-muted-foreground">immediate action</div>
        </CardContent></Card>
        <Card className="border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20"><CardContent className="p-3">
          <div className="text-xs text-amber-600 dark:text-amber-400">High priority</div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-0.5">{highCount}</div>
          <div className="text-xs text-muted-foreground">monitor closely</div>
        </CardContent></Card>
        <Card className="border-border"><CardContent className="p-3">
          <div className="text-xs text-muted-foreground">Geographies</div>
          <div className="text-2xl font-bold mt-0.5">8</div>
          <div className="text-xs text-muted-foreground">EU + key markets</div>
        </CardContent></Card>
      </div>

      {/* Upcoming deadlines */}
      <Card className="border-amber-200 dark:border-amber-900/40">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Clock size={14} className="text-amber-500" /> Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-2">
          {upcoming.map((r, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="text-xs font-mono text-amber-600 dark:text-amber-400 w-24 shrink-0 pt-0.5">{r.next_date}</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium leading-snug">{r.short_name}</div>
                <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{r.next_milestone}</div>
              </div>
              <Badge className={URGENCY_CFG[r.urgency as keyof typeof URGENCY_CFG]?.cls ?? URGENCY_CFG.medium.cls}>
                {r.urgency}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="space-y-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search regulations…" value={search} onChange={e => setSearch(e.target.value)}
            className="pl-8 h-9 text-sm" data-testid="input-reg-search" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {GEO_OPTIONS.map(g => (
            <button key={g} onClick={() => setGeo(g)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${geo === g ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
              {g}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {DOMAIN_OPTIONS.map(d => (
            <button key={d} onClick={() => setDomain(d)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${domain === d ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
              {d}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">{filtered.length} of {regulations.length} regulations shown</p>
      </div>

      {/* Regulation cards */}
      <div className="space-y-2">
        {filtered.map(r => {
          const cfg = URGENCY_CFG[r.urgency as keyof typeof URGENCY_CFG] ?? URGENCY_CFG.medium;
          const isOpen = expanded === r.id;
          return (
            <Card key={r.id} className={`border-border transition-all ${isOpen ? 'ring-1 ring-primary/30' : ''}`}>
              <button className="w-full text-left" onClick={() => setExpanded(isOpen ? null : r.id)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge className={cfg.cls}>{cfg.label}</Badge>
                        <Badge variant="outline" className="text-xs">{r.geography}</Badge>
                        <Badge variant="secondary" className="text-xs">{r.domain}</Badge>
                      </div>
                      <div className="font-medium text-sm leading-snug">{r.short_name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{r.name}</div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      {r.next_date && (
                        <div className="text-xs font-mono text-primary">{r.next_date}</div>
                      )}
                      <div className="text-xs text-muted-foreground mt-0.5">{r.status.slice(0,20)}</div>
                    </div>
                  </div>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-border space-y-3" onClick={e => e.stopPropagation()}>
                      {r.thresholds && (
                        <div>
                          <div className="text-xs font-semibold mb-1">Key Thresholds</div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{r.thresholds}</p>
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-semibold mb-1 text-amber-600 dark:text-amber-400">Impact on SIDEL</div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{r.impact_on_sidel}</p>
                      </div>
                      <div className="border-l-2 border-primary pl-3">
                        <div className="text-xs font-semibold mb-1 text-primary">R&D Implication</div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{r.rd_implication}</p>
                      </div>
                      {r.all_dates.length > 0 && (
                        <div>
                          <div className="text-xs font-semibold mb-1.5">Key Dates</div>
                          <div className="space-y-1">
                            {r.all_dates.map((d, i) => (
                              <div key={i} className="flex gap-3 text-xs">
                                <span className="font-mono text-primary w-24 shrink-0">{d.date}</span>
                                <span className="text-muted-foreground">{d.milestone}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {r.source_url && (
                        <a href={r.source_url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-primary hover:underline w-fit">
                          Official source <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
