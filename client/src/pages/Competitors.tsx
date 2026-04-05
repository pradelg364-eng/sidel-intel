import { intelligenceData } from "@/lib/intelligence";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

const PRODUCT_LINE_LABELS: Record<string, string> = {
  blow_moulding: "Blow Moulding",
  aseptic_filling: "Aseptic Filling",
  filling_capping: "Filling & Capping",
  end_of_line: "End-of-Line",
};

export default function Competitors() {
  const { competitors } = intelligenceData;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">All Competitors</h1>
        <p className="text-sm text-muted-foreground mt-0.5">6 tracked competitors across SIDEL's core product lines</p>
      </div>

      <div className="space-y-3">
        {competitors.map(comp => (
          <Link key={comp.id} href={`/competitors/${comp.id}`}>
            <a className="block" data-testid={`card-competitor-full-${comp.id}`}>
              <Card className="border-border hover:border-primary/50 transition-colors cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Left: identity */}
                    <div className="sm:w-40 shrink-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: comp.color }} />
                        <span className="font-semibold text-sm group-hover:text-primary transition-colors">{comp.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{comp.country}</div>
                      <div className="text-xs text-muted-foreground">{comp.ticker}</div>
                    </div>

                    {/* Center: financials */}
                    <div className="sm:w-48 shrink-0">
                      <div className="text-xs text-muted-foreground mb-1">Financials</div>
                      <div className="text-sm font-medium">
                        €{comp.revenue_eur_m >= 1000 ? `${(comp.revenue_eur_m/1000).toFixed(1)}B` : `${comp.revenue_eur_m}M`} revenue
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        {comp.growth_pct > 3 ? <TrendingUp size={11} className="text-green-600" /> :
                         comp.growth_pct < 0 ? <TrendingDown size={11} className="text-red-500" /> :
                         <Minus size={11} />}
                        {comp.growth_pct > 0 ? '+' : ''}{comp.growth_pct}% YoY
                      </div>
                    </div>

                    {/* Right: product coverage */}
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-2">Product Line Coverage</div>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(PRODUCT_LINE_LABELS).map(([key, label]) => {
                          const pl = comp.product_lines[key as keyof typeof comp.product_lines];
                          const count = (pl.products.length + pl.innovations.length);
                          return (
                            <div key={key} className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${count > 0 ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                              <span className="text-xs text-muted-foreground">{label}</span>
                              {count > 0 && (
                                <Badge variant="secondary" className="text-xs h-4 px-1 ml-auto">{count}</Badge>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center text-primary">
                      <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* vs SIDEL snippet */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground line-clamp-2">{comp.vs_sidel.slice(0, 250)}</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
