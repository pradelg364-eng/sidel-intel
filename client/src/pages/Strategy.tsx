import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, AlertTriangle, TrendingUp, Shield, Zap } from "lucide-react";

const STRATEGIC_MOVES = [
  {
    priority: "critical",
    horizon: "0–12 months",
    title: "IP Freedom-to-Operate Review: Laser Preform Heating",
    description: "SMI holds US11440238 and US11426921 covering laser IR preform heating. Sidel's EvoBLOW Laser launched at Drinktec 2025 operates in the same technical space. Immediate patent landscape analysis and freedom-to-operate opinion required to assess exposure and identify design-around opportunities.",
    action: "Mandate IP Legal to conduct FTO review and file any necessary continuation or differentiation patents around EvoBLOW Laser architecture before scale-up.",
    tags: ["IP", "EvoBLOW Laser", "Risk"],
  },
  {
    priority: "critical",
    horizon: "0–18 months",
    title: "Respond to GEA's Aseptic Aluminium Bottle Gap",
    description: "GEA was granted US12304795 (May 2025) — the world's first patent for aseptic filling of aluminium bottles. SIDEL has zero capability or IP in this adjacency. Aluminium bottles are growing in premium beverages (craft beer, spirits, functional drinks). This is a strategic blind spot.",
    action: "Launch R&D feasibility study for aseptic aluminium bottle handling. Evaluate partnership or acquisition of specialist (e.g., Trivium, Ball Corp processing interfaces) to enter this space with a differentiated IP position.",
    tags: ["New Market", "GEA Gap", "Aseptic"],
  },
  {
    priority: "high",
    horizon: "6–18 months",
    title: "Accelerate Digital Services (Evo-ON) to Counter Krones Ingeniq",
    description: "Krones' Ingeniq zero-operator line with AI predictive maintenance and subscription spare-parts model was launched at Drinktec 2025. It directly threatens the transactional aftermarket revenue model shared by SIDEL (services/spare parts ~30–40% of margin). SIDEL's Evo-ON platform is a starting point but must be scaled into a recurring revenue product.",
    action: "Define Evo-ON product roadmap to include (1) predictive maintenance SLA tiers, (2) remote format change management, (3) operator-less line certification pathway. Target €50M ARR from digital services within 3 years.",
    tags: ["Digital", "Aftermarket", "Krones Threat"],
  },
  {
    priority: "high",
    horizon: "6–24 months",
    title: "File Patent Fence Around EvoBLOW Laser Full Architecture",
    description: "EvoBLOW Laser is SIDEL's most significant 2025 innovation. The laser preform heating field is contested (SMI US11440238). A systematic patent fence — covering energy modulation, rPET compatibility, cavity design, and integration with Predis sterilisation — would protect this technology and create a moat for 5–7 years.",
    action: "Identify 8–12 distinct technical features of EvoBLOW Laser for patent filing over the next 12 months. Target PCT applications for global protection, especially US, CN, and BR.",
    tags: ["IP", "EvoBLOW Laser", "Offensive"],
  },
  {
    priority: "high",
    horizon: "12–30 months",
    title: "Counter Krones–SMI Partnership in Mid-Market PET",
    description: "The December 2024 strategic partnership between Krones and SMI Group creates a combined offering covering the 5,000–35,000 bph segment with Krones' filling expertise and SMI's cost-competitive blow moulding. This is a segment SIDEL has ceded to smaller players, but one where margin pressure is growing.",
    action: "Define a mid-market line concept (10,000–25,000 bph) with optimised TCO and standardised modules — potentially leveraging rPET compatibility as differentiation. Assess whether acquisition of a complementary regional blower manufacturer (e.g., SIPA or aquistion in APAC) would be faster than organic development.",
    tags: ["Mid-Market", "M&A", "Krones/SMI"],
  },
  {
    priority: "medium",
    horizon: "18–36 months",
    title: "Develop Fibre/Alternative Container Blowing Capability",
    description: "Krones has filed a cluster of fibre container patents (DE102022121467A1, DE102023131286A1, WO2025190536A1) — a deliberate hedge against PET regulatory risk under the EU PPWR and SUP Directive. SIDEL's entire portfolio is PET/glass/can. This creates a structural vulnerability if PET-free mandates accelerate.",
    action: "Fund a 3-year exploratory R&D programme on bio-based and fibre container forming. Evaluate partnerships with pulp-moulding specialists or resin producers. File foundational patents to secure freedom to operate before 2027.",
    tags: ["Sustainability", "PPWR", "Long-term"],
  },
  {
    priority: "medium",
    horizon: "0–12 months",
    title: "Defend Aseptic Leadership with Next-Generation Predis",
    description: "KHS has deliberately differentiated its InnoPET BloFill ACF-R with bottle-level sterilisation (vs SIDEL's preform approach). Serac holds tight patents on aseptic nozzle precision. GEA is advancing with VHP dry integration. SIDEL's Predis is world-class but needs a next-generation roadmap to defend its technical leadership.",
    action: "Define Predis X5 roadmap targeting (1) log 7 sterility assurance, (2) <50m² footprint, (3) 100% rPET at full speed, and (4) digital SIP/CIP monitoring with audit trail integration. File 5+ patents per year on Predis architecture improvements.",
    tags: ["Aseptic", "Predis", "Defensive"],
  },
  {
    priority: "medium",
    horizon: "12–24 months",
    title: "Monitor and Respond to ACMI/Omnia (Post-Sacmi Beverage Divestiture)",
    description: "Sacmi divested its entire Beverage BU to Omnia Technologies (PE-backed, Investindustrial) in September 2024. The new entity (~€700M combined revenue including ACMI) is now PE-driven — meaning higher growth targets, potential M&A, and more aggressive commercial tactics. SIDEL should track this entity as a new dynamic competitor, not the old cooperative Sacmi.",
    action: "Set up dedicated intelligence tracking for ACMI/Omnia. Establish regular commercial win/loss analysis in accounts where ACMI competes. Assess whether any ACMI capabilities (labelling, secondary packaging) would be strategically valuable to acquire.",
    tags: ["ACMI", "M&A Watch", "Sacmi"],
  },
];

const PRIORITY_CONFIG = {
  critical: { label: "Critical", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0" },
  high: { label: "High", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0" },
  medium: { label: "Medium", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0" },
};

export default function Strategy() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">R&D Strategic Recommendations</h1>
        <p className="text-sm text-muted-foreground mt-0.5">8 prioritised moves for SIDEL R&D based on competitive intelligence · March 2026</p>
      </div>

      {/* Summary pills */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Critical Actions", count: STRATEGIC_MOVES.filter(m => m.priority === 'critical').length, icon: AlertTriangle, color: "text-red-500" },
          { label: "High Priority", count: STRATEGIC_MOVES.filter(m => m.priority === 'high').length, icon: TrendingUp, color: "text-amber-500" },
          { label: "Medium Priority", count: STRATEGIC_MOVES.filter(m => m.priority === 'medium').length, icon: Lightbulb, color: "text-blue-500" },
        ].map(s => (
          <Card key={s.label} className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <s.icon size={18} className={s.color} />
              <div>
                <div className="text-xl font-bold">{s.count}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Strategic moves */}
      <div className="space-y-3">
        {STRATEGIC_MOVES.map((move, i) => (
          <Card key={i} className="border-border">
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap mb-1">
                    <Badge className={PRIORITY_CONFIG[move.priority].color}>
                      {PRIORITY_CONFIG[move.priority].label}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">{move.horizon}</Badge>
                    {move.tags.map(t => (
                      <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                    ))}
                  </div>
                  <h3 className="font-semibold text-sm mt-2 leading-snug">{move.title}</h3>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{move.description}</p>

              <div className="border-l-2 border-primary pl-3">
                <div className="text-xs font-semibold text-primary mb-1 flex items-center gap-1.5">
                  <Target size={11} />
                  Recommended Action
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{move.action}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Competitive threat map */}
      <Card className="border-border">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Shield size={14} className="text-primary" />
            SIDEL Competitive Threat Map by Product Line
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 overflow-x-auto">
          <table className="w-full text-xs min-w-[500px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Product Line</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Primary Threat</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Nature of Threat</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Level</th>
              </tr>
            </thead>
            <tbody>
              {[
                { pl: "Blow Moulding", threat: "Krones / KHS", nature: "Integrated loop (Prefero), energy efficiency, rPET", level: "High" },
                { pl: "Blow Moulding", threat: "SMI + Krones JV", nature: "Mid-market cost disruption (5–30K bph)", level: "Medium" },
                { pl: "Aseptic Filling", threat: "GEA (Aluminium)", nature: "New aseptic substrate — no Sidel product", level: "Critical" },
                { pl: "Aseptic Filling", threat: "KHS / Serac", nature: "Alternative sterilisation architectures", level: "Medium" },
                { pl: "Filling & Capping", threat: "Krones (Ingeniq)", nature: "Zero-operator subscription model disrupts aftermarket", level: "High" },
                { pl: "Filling & Capping", threat: "KHS", nature: "High-speed canning (135K cph) — can adjacency", level: "Medium" },
                { pl: "End-of-Line", threat: "Krones + System Logistics", nature: "Full AGV/robotic EOL superior depth", level: "High" },
                { pl: "Digital Services", threat: "Krones (Syskron)", nature: "Mature IIoT/data services platform vs Evo-ON", level: "High" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-2 pr-4 font-medium text-foreground">{row.pl}</td>
                  <td className="py-2 px-3 text-muted-foreground">{row.threat}</td>
                  <td className="py-2 px-3 text-muted-foreground leading-snug">{row.nature}</td>
                  <td className="py-2 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      row.level === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      row.level === 'High' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>{row.level}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
