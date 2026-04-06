import { regulatoryData } from "@/lib/regulatory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Zap, Flag } from "lucide-react";

const YEAR_COLORS: Record<string, string> = {
  "2025": "border-l-blue-400",
  "2026": "border-l-amber-500",
  "2027": "border-l-orange-400",
  "2028": "border-l-rose-400",
  "2029": "border-l-rose-500",
  "2030": "border-l-red-600",
  "2035": "border-l-purple-500",
};

const YEAR_BG: Record<string, string> = {
  "2025": "text-blue-600 dark:text-blue-400",
  "2026": "text-amber-600 dark:text-amber-400",
  "2027": "text-orange-600 dark:text-orange-400",
  "2028": "text-rose-500 dark:text-rose-400",
  "2029": "text-rose-600 dark:text-rose-400",
  "2030": "text-red-600 dark:text-red-400",
  "2035": "text-purple-600 dark:text-purple-400",
};

export default function RegulatoryRoadmap() {
  const { milestones, triggers } = regulatoryData;

  // Group milestones by year
  const byYear: Record<string, typeof milestones> = {};
  for (const m of milestones) {
    const yr = m.year || m.date?.slice(0, 4) || "TBD";
    if (!byYear[yr]) byYear[yr] = [];
    byYear[yr].push(m);
  }
  const years = Object.keys(byYear).sort();

  const ACTION_CFG = {
    ACCELERATE: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0",
    LAUNCH:     "bg-primary/10 text-primary border-0",
    PIVOT:      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-0",
    MONITOR:    "bg-muted text-muted-foreground border-0",
    DEPRIORITIZE: "bg-muted text-muted-foreground border-0",
  } as const;

  const URGENCY_CFG = {
    "immediate":  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0",
    "6months":    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0",
    "12months":   "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0",
    "24months":   "bg-muted text-muted-foreground border-0",
  } as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Regulatory Roadmap 2025–2035</h1>
        <p className="text-sm text-muted-foreground mt-0.5">19 key milestones · linked to SIDEL product lines and customer demand drivers</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-border"><CardContent className="p-3 text-center">
          <div className="text-2xl font-bold text-amber-500">2026</div>
          <div className="text-xs text-muted-foreground mt-0.5">Highest density year</div>
        </CardContent></Card>
        <Card className="border-border"><CardContent className="p-3 text-center">
          <div className="text-2xl font-bold text-primary">{milestones.length}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Tracked milestones</div>
        </CardContent></Card>
        <Card className="border-border"><CardContent className="p-3 text-center">
          <div className="text-2xl font-bold text-red-500">{triggers.filter(t => t.urgency === 'immediate').length}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Immediate triggers</div>
        </CardContent></Card>
      </div>

      {/* Timeline */}
      <div className="space-y-5">
        {years.map(yr => {
          const yMilestones = byYear[yr];
          const colorCls = YEAR_COLORS[yr] || "border-l-muted-foreground";
          const textCls = YEAR_BG[yr] || "text-muted-foreground";
          return (
            <div key={yr}>
              <div className={`flex items-center gap-2 mb-2`}>
                <Flag size={14} className={textCls} />
                <span className={`text-lg font-bold ${textCls}`}>{yr}</span>
                <span className="text-xs text-muted-foreground">— {yMilestones.length} milestone{yMilestones.length > 1 ? 's' : ''}</span>
              </div>
              <div className="space-y-2 ml-5">
                {yMilestones.map((m, i) => (
                  <div key={i} className={`border-l-2 pl-4 py-1 ${colorCls}`}>
                    <div className="flex items-start gap-2 flex-wrap">
                      <span className="font-medium text-sm leading-snug">{m.regulation}</span>
                      {m.geography && m.geography !== 'EU' && (
                        <Badge variant="outline" className="text-xs">{m.geography}</Badge>
                      )}
                      {m.date && m.date !== yr && (
                        <span className="text-xs font-mono text-muted-foreground ml-auto">{m.date}</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{m.mandate}</p>
                    {m.sidel_product_line && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-xs text-primary font-medium">→ {m.sidel_product_line}</span>
                      </div>
                    )}
                    {m.customer_action && (
                      <div className="text-xs text-muted-foreground mt-0.5 italic">Customer: {m.customer_action}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trigger Matrix */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={15} className="text-primary" />
          <h2 className="font-semibold text-base">R&D Trigger Matrix</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Each trigger connects a regulatory event to an automatic R&D portfolio signal. When a trigger fires, SIDEL R&D should rebalance investment accordingly.</p>

        <div className="space-y-3">
          {triggers.map(t => {
            const actionCls = ACTION_CFG[t.portfolio_action as keyof typeof ACTION_CFG] ?? ACTION_CFG.MONITOR;
            const urgCls = URGENCY_CFG[t.urgency as keyof typeof URGENCY_CFG] ?? URGENCY_CFG["12months"];
            return (
              <Card key={t.trigger_id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2 flex-wrap mb-2">
                    <span className="text-xs font-mono text-muted-foreground w-8 shrink-0">{t.trigger_id}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm leading-snug">{t.trigger_name}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <Badge className={actionCls}>{t.portfolio_action}</Badge>
                    <Badge className={urgCls}>{t.urgency.replace('months', ' months')}</Badge>
                    <Badge variant="outline" className="text-xs">{t.geography}</Badge>
                    <Badge variant="secondary" className="text-xs">{t.trigger_date_range}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    <span className="font-medium text-foreground">Trigger: </span>{t.trigger_event}
                  </p>
                  <div className="border-l-2 border-primary pl-3">
                    <div className="text-xs font-semibold text-primary mb-0.5">Portfolio Response</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t.sidel_rd_portfolio_response}</p>
                  </div>
                  {t.affected_rd_projects.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {t.affected_rd_projects.map((p, i) => (
                        <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded">{p}</span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
