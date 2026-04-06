import { regulatoryData } from "@/lib/regulatory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Layers, Telescope, AlertTriangle } from "lucide-react";

const HORIZON_CFG = {
  NOW:    { label: "NOW — 2025/2026", icon: Rocket,    color: "text-red-500",    bg: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40" },
  NEXT:   { label: "NEXT — 2027/2028", icon: Layers,   color: "text-amber-500",  bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40" },
  FUTURE: { label: "FUTURE — 2029+",  icon: Telescope, color: "text-blue-500",   bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40" },
} as const;

const PRIORITY_CFG = {
  HIGH:   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0",
  MEDIUM: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0",
  LOW:    "bg-muted text-muted-foreground border-0",
} as const;

export default function RDRoadmap() {
  const { rd_projects } = regulatoryData;

  const byHorizon = {
    NOW:    rd_projects.filter(p => p.horizon === "NOW"),
    NEXT:   rd_projects.filter(p => p.horizon === "NEXT"),
    FUTURE: rd_projects.filter(p => p.horizon === "FUTURE"),
  };

  const highCount = rd_projects.filter(p => p.investment_priority === "HIGH").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">R&D Innovation Roadmap</h1>
        <p className="text-sm text-muted-foreground mt-0.5">20 concrete projects derived from regulatory drivers · 2025–2030+</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {(["NOW", "NEXT", "FUTURE"] as const).map(h => {
          const cfg = HORIZON_CFG[h];
          const Icon = cfg.icon;
          return (
            <Card key={h} className={`border ${cfg.bg}`}>
              <CardContent className="p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={13} className={cfg.color} />
                  <span className={`text-xs font-semibold ${cfg.color}`}>{h}</span>
                </div>
                <div className="text-2xl font-bold">{byHorizon[h].length}</div>
                <div className="text-xs text-muted-foreground">projects</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Horizons */}
      {(["NOW", "NEXT", "FUTURE"] as const).map(h => {
        const cfg = HORIZON_CFG[h];
        const Icon = cfg.icon;
        const projects = byHorizon[h];
        return (
          <div key={h} className="space-y-3">
            <div className="flex items-center gap-2">
              <Icon size={15} className={cfg.color} />
              <h2 className={`font-semibold text-base ${cfg.color}`}>{cfg.label}</h2>
              <span className="text-xs text-muted-foreground">— {h === 'NOW' ? 'Regulatory compliance, no optionality' : h === 'NEXT' ? 'First-mover advantage window' : 'Strategic regulatory hedges'}</span>
            </div>
            <div className="space-y-2">
              {projects.map((p, i) => {
                const priCls = PRIORITY_CFG[p.investment_priority as keyof typeof PRIORITY_CFG] ?? PRIORITY_CFG.MEDIUM;
                return (
                  <Card key={i} className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2 flex-wrap mb-1.5">
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-sm leading-snug">{p.project}</span>
                        </div>
                        <Badge className={priCls}>{p.investment_priority}</Badge>
                      </div>
                      {p.regulatory_driver && (
                        <div className="text-xs text-primary font-medium mb-1.5">
                          Driver: {p.regulatory_driver}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2">{p.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="border-l-2 border-green-400 pl-3">
                          <div className="text-xs font-semibold text-green-600 dark:text-green-400 mb-0.5">Expected Outcome</div>
                          <p className="text-xs text-muted-foreground leading-snug">{p.expected_outcome}</p>
                        </div>
                        <div className="border-l-2 border-red-400 pl-3">
                          <div className="text-xs font-semibold text-red-600 dark:text-red-400 mb-0.5 flex items-center gap-1">
                            <AlertTriangle size={10} /> Risk if Delayed
                          </div>
                          <p className="text-xs text-muted-foreground leading-snug">{p.risk_if_delayed}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
