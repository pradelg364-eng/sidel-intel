import { intelligenceData } from "@/lib/intelligence";
import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ExternalLink, Shield, TrendingUp, Users, Zap, Package, Layers, AlertTriangle } from "lucide-react";

const PRODUCT_LINE_META = [
  { key: "blow_moulding", label: "Blow Moulding", icon: Package },
  { key: "aseptic_filling", label: "Aseptic Filling", icon: Shield },
  { key: "filling_capping", label: "Filling & Capping", icon: Zap },
  { key: "end_of_line", label: "End-of-Line", icon: Layers },
];

export default function CompetitorDetail() {
  const { id } = useParams<{ id: string }>();
  const comp = intelligenceData.competitors.find(c => c.id === id);

  if (!comp) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Competitor not found.</p>
        <Link href="/competitors"><a className="text-primary text-sm mt-2 block">← Back to all competitors</a></Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link href="/competitors">
        <a className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit">
          <ArrowLeft size={14} /> All Competitors
        </a>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full mt-0.5 shrink-0" style={{ backgroundColor: comp.color }} />
          <div>
            <h1 className="text-xl font-semibold">{comp.name}</h1>
            <p className="text-sm text-muted-foreground">{comp.country} · {comp.ticker} · {comp.size}-cap</p>
          </div>
        </div>
        {comp.revenue_eur_m > 3000 && comp.growth_pct > 7 ?
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0">High Threat</Badge> :
          comp.revenue_eur_m > 1000 ?
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0">Medium Threat</Badge> :
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0">Niche Player</Badge>
        }
      </div>

      {/* Financials */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Revenue", value: comp.revenue_str.split('(')[0].trim() },
          { label: "EBITDA", value: comp.ebitda_str.split('(')[0].trim().slice(0, 30) || 'N/A' },
          { label: "EBITDA Margin", value: comp.ebitda_margin_str.split(' ')[0] || 'N/A' },
          { label: "YoY Growth", value: comp.growth_pct > 0 ? `+${comp.growth_pct}%` : `${comp.growth_pct}%` },
        ].map(kpi => (
          <Card key={kpi.label} className="border-border">
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground">{kpi.label}</div>
              <div className="text-base font-semibold mt-0.5 truncate">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* vs SIDEL */}
      <Card className="border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-2.5">
            <AlertTriangle size={15} className="text-amber-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">vs. SIDEL Assessment</div>
              <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">{comp.vs_sidel}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="products">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
        </TabsList>

        {/* Product lines */}
        <TabsContent value="products" className="space-y-4 mt-4">
          {PRODUCT_LINE_META.map(({ key, label, icon: Icon }) => {
            const pl = comp.product_lines[key as keyof typeof comp.product_lines];
            const hasContent = pl.products.length > 0 || pl.innovations.length > 0 || pl.patents.length > 0;
            return (
              <Card key={key} className={`border-border ${!hasContent ? 'opacity-60' : ''}`}>
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Icon size={14} className="text-primary" />
                    {label}
                    {!hasContent && <Badge variant="secondary" className="ml-auto text-xs">Limited</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3">
                  {pl.summary && <p className="text-xs text-muted-foreground">{pl.summary}</p>}
                  {pl.products.length > 0 && (
                    <div>
                      <div className="text-xs font-medium mb-1.5 text-foreground">Key Products</div>
                      <div className="space-y-1">
                        {pl.products.map((p, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {pl.innovations.length > 0 && (
                    <div>
                      <div className="text-xs font-medium mb-1.5 text-foreground">Innovations (2024–2026)</div>
                      <div className="space-y-1">
                        {pl.innovations.map((p, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {pl.patents.length > 0 && (
                    <div>
                      <div className="text-xs font-medium mb-1.5 text-foreground">Patent Activity</div>
                      <div className="space-y-1">
                        {pl.patents.map((p, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {!hasContent && (
                    <p className="text-xs text-muted-foreground italic">No significant presence in this product line.</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* News */}
        <TabsContent value="news" className="mt-4">
          <Card className="border-border">
            <CardContent className="p-4">
              {comp.business_news.length === 0 ? (
                <p className="text-sm text-muted-foreground">No news data available.</p>
              ) : (
                <div className="divide-y divide-border">
                  {comp.business_news.map((n, i) => (
                    <div key={i} className="py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="font-medium text-sm leading-snug">{n.title}</div>
                        {n.date && <span className="text-xs text-muted-foreground shrink-0">{n.date}</span>}
                      </div>
                      {n.summary && <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.summary}</p>}
                      {n.url && n.url.startsWith('http') && (
                        <a href={n.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-primary mt-1.5 hover:underline w-fit">
                          Source <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Partners */}
        <TabsContent value="partners" className="mt-4">
          <Card className="border-border">
            <CardContent className="p-4">
              {comp.partnerships.length === 0 ? (
                <p className="text-sm text-muted-foreground">No partnership data available.</p>
              ) : (
                <div className="divide-y divide-border">
                  {comp.partnerships.map((p, i) => (
                    <div key={i} className="py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{p.partner}</span>
                        {p.type && <Badge variant="secondary" className="text-xs">{p.type}</Badge>}
                        {p.date && <span className="text-xs text-muted-foreground ml-auto">{p.date}</span>}
                      </div>
                      {p.description && <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strategic moves */}
        <TabsContent value="strategy" className="mt-4">
          <Card className="border-border">
            <CardContent className="p-4">
              {comp.strategic_moves.length === 0 ? (
                <p className="text-sm text-muted-foreground">No strategic move data available.</p>
              ) : (
                <div className="divide-y divide-border">
                  {comp.strategic_moves.map((m, i) => (
                    <div key={i} className="py-3">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <span className="font-medium text-sm leading-snug">{m.move}</span>
                        {m.date && <span className="text-xs text-muted-foreground shrink-0">{m.date}</span>}
                      </div>
                      {m.impact && <p className="text-xs text-muted-foreground leading-relaxed">{m.impact}</p>}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
