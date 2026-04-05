import { intelligenceData } from "@/lib/intelligence";
import { Link } from "wouter";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, ChevronRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PRODUCT_LINE_LABELS: Record<string, string> = {
  blow_moulding: "Blow Moulding",
  aseptic_filling: "Aseptic Filling",
  filling_capping: "Filling & Capping",
  end_of_line: "End-of-Line",
};

function GrowthIcon({ pct }: { pct: number }) {
  if (pct > 3) return <TrendingUp size={14} className="text-green-600 dark:text-green-400" />;
  if (pct < 0) return <TrendingDown size={14} className="text-red-500" />;
  return <Minus size={14} className="text-muted-foreground" />;
}

function ThreatBadge({ comp }: { comp: typeof intelligenceData.competitors[0] }) {
  const isLarge = comp.revenue_eur_m > 3000;
  const isGrowing = comp.growth_pct > 7;
  if (isLarge && isGrowing) return <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0 text-xs">High Threat</Badge>;
  if (isLarge || isGrowing) return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0 text-xs">Medium Threat</Badge>;
  return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0 text-xs">Niche Player</Badge>;
}

export default function Dashboard() {
  const { competitors, sidel, generated_at } = intelligenceData;

  // Latest news across all competitors
  const allNews = competitors.flatMap(c =>
    c.business_news.slice(0, 2).map(n => ({ ...n, competitor: c.name, color: c.color, id: c.id }))
  ).slice(0, 8);

  // Key alerts (partnerships that are relevant)
  const keyAlerts = [
    { text: "SMI Group + Krones AG strategic partnership (Dec 2024) targets joint turnkey PET lines", severity: "high" },
    { text: "Sacmi divested entire Beverage BU to Omnia/ACMI (Sep 2024) — new entity ~€700M", severity: "medium" },
    { text: "KHS InnoPET BloFill ACF-R uses bottle sterilization vs Sidel's preform approach — deliberate differentiation", severity: "medium" },
    { text: "GEA launched world's first aseptic aluminum bottle filling (Unibloc Flex) — no Sidel equivalent", severity: "high" },
    { text: "Krones Prefero (preform injection) creates full PET circular loop — a Sidel capability gap", severity: "high" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold">Competitive Intelligence Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">SIDEL vs. 6 key competitors · March 2026</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock size={12} />
          Updated {generated_at}
        </div>
      </div>

      {/* SIDEL KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "SIDEL Revenue", value: "€1.72B", sub: "FY2024", color: "primary" },
          { label: "Market Position", value: "#2", sub: "PET blow moulding", color: "default" },
          { label: "Competitors Tracked", value: "6", sub: "Full profiles", color: "default" },
          { label: "IP Signals", value: "40+", sub: "Patents identified", color: "default" },
        ].map(kpi => (
          <Card key={kpi.label} className="border-border">
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground">{kpi.label}</div>
              <div className={`text-2xl font-bold mt-1 ${kpi.color === "primary" ? "text-primary" : ""}`}>{kpi.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{kpi.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      <Card className="border-border">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <AlertTriangle size={15} className="text-amber-500" />
            Strategic Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-2">
          {keyAlerts.map((a, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm">
              <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${a.severity === 'high' ? 'bg-red-500' : 'bg-amber-400'}`} />
              <span className="text-muted-foreground leading-snug">{a.text}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Competitors grid */}
      <div>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Competitor Profiles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {competitors.map(comp => (
            <Link key={comp.id} href={`/competitors/${comp.id}`}>
              <a className="block" data-testid={`card-competitor-${comp.id}`}>
                <Card className="border-border hover:border-primary/50 transition-colors cursor-pointer group h-full">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-sm group-hover:text-primary transition-colors">{comp.name}</div>
                        <div className="text-xs text-muted-foreground">{comp.country} · {comp.ticker}</div>
                      </div>
                      <ThreatBadge comp={comp} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                        <div className="text-sm font-medium">
                          €{comp.revenue_eur_m >= 1000 ? `${(comp.revenue_eur_m/1000).toFixed(1)}B` : `${comp.revenue_eur_m}M`}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Growth</div>
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <GrowthIcon pct={comp.growth_pct} />
                          {comp.growth_pct > 0 ? '+' : ''}{comp.growth_pct}%
                        </div>
                      </div>
                    </div>

                    {/* Product line coverage dots */}
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(PRODUCT_LINE_LABELS).map(([key, label]) => {
                        const pl = comp.product_lines[key as keyof typeof comp.product_lines];
                        const hasContent = pl.products.length > 0 || pl.innovations.length > 0;
                        return (
                          <span
                            key={key}
                            className={`text-xs px-2 py-0.5 rounded-full border ${
                              hasContent
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-muted text-muted-foreground border-muted"
                            }`}
                          >
                            {label}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-primary mt-3 group-hover:gap-2 transition-all">
                      View full profile <ChevronRight size={12} />
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent news */}
      <Card className="border-border">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold">Recent Intelligence</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="divide-y divide-border">
            {allNews.map((n, i) => (
              <div key={i} className="py-2.5 flex items-start gap-3">
                <span
                  className="mt-1 w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: n.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium leading-snug">{n.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    <span className="font-medium">{n.competitor}</span>
                    {n.date ? ` · ${n.date}` : ""}
                  </div>
                  {n.summary && (
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.summary}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
