import { intelligenceData } from "@/lib/intelligence";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ExternalLink } from "lucide-react";

const IP_HIGHLIGHTS: Record<string, { patents: { id: string; title: string; relevance: string }[]; strategy: string }> = {
  krones: {
    strategy: "Aggressive fencing across full circular PET loop (injection→blow→fill→recycle). Key hedge: fibre/paper container patents signal readiness for post-PET scenario.",
    patents: [
      { id: "DE102022121467A1", title: "Paper/fibre container blow moulding", relevance: "Strategic hedge against PET-free packaging trend" },
      { id: "DE102023131286A1", title: "Fibre container forming", relevance: "Extends paper container IP fence" },
      { id: "WO2025190536A1", title: "Paper moulding PCT", relevance: "International fencing of fibre packaging tech" },
      { id: "US12180055", title: "Hot-fill flash pasteuriser with heat pump energy recovery", relevance: "Energy efficiency in filling — direct SIDEL competition" },
      { id: "US12291405", title: "Automated end-of-line robotic cell", relevance: "Ingeniq zero-operator line architecture" },
      { id: "US11697518", title: "Palletiser layer pattern system", relevance: "End-of-line automation fencing" },
    ],
  },
  khs: {
    strategy: "Focused on barrier coatings (Plasmax), aseptic block architecture, and anti-packaging-waste solutions (BottleClip). Deliberate differentiation from Sidel's preform sterilisation by patenting bottle-level sterilisation.",
    patents: [
      { id: "US12234050", title: "Modular linear filling machine", relevance: "Flexible architecture vs Sidel's rotary systems" },
      { id: "US12172848", title: "Packaging layer assembly for palletising", relevance: "End-of-line automation" },
      { id: "US11999578", title: "Palletiser dual-carrier design", relevance: "High-speed palletising architecture" },
      { id: "US12145754", title: "Paper tray folding system", relevance: "Plastic-free packaging compliance" },
      { id: "US11970380", title: "Can closing transfer element", relevance: "Canning line fencing" },
      { id: "PCT/EP2024/081897", title: "Star wheel/blocked installation", relevance: "Combi block architecture" },
    ],
  },
  smi: {
    strategy: "Core architecture fenced around cam-free mold design and modular platform. Forward-looking bet on UV-C LED disinfection as alternative aseptic pathway. Laser preform heating patents overlap with Sidel's EvoBLOW Laser space.",
    patents: [
      { id: "US11623383", title: "Cam-free mould open/close architecture", relevance: "Core blower architecture — cross-checks Sidel EvoBLOW" },
      { id: "US10046503", title: "Cam-free variant", relevance: "Extends blower architecture fence" },
      { id: "US11440238", title: "Laser IR preform heating", relevance: "OVERLAP with Sidel EvoBLOW Laser — monitor closely" },
      { id: "US11426921", title: "Laser preform heating variant", relevance: "Additional laser heating fencing" },
      { id: "US11707543", title: "UV-C LED internal container disinfection", relevance: "Alternative aseptic pathway — potential Predis disruptor" },
      { id: "US11724925", title: "Modular platform base", relevance: "Platform architecture fencing" },
    ],
  },
  sacmi: {
    strategy: "After Beverage BU divestiture (Sep 2024), Sacmi refocuses IP on cap presses (CCM), preform injection (IPS), and new LBF compression-blow platform. IPS preform patents compete with Husky/Netstal in Sidel's supply chain.",
    patents: [
      { id: "US12179409", title: "Blow moulding apparatus", relevance: "Granted Dec 31, 2024 — post-divestiture residual" },
      { id: "US12042969", title: "Preform manufacturing + vision integration", relevance: "IPS preform press IP — upstream Sidel supply chain" },
      { id: "US11858193", title: "Blow moulding transfer carousel", relevance: "Transfer architecture fencing" },
      { id: "US12195224", title: "FFS production/filling apparatus", relevance: "ACMI/Omnia aseptic filling (post-divestiture)" },
      { id: "US20240017450A1", title: "CBF compression mould cooling system", relevance: "New LBF platform" },
    ],
  },
  serac: {
    strategy: "Tight fencing around aseptic filling nozzle precision and cap sterilisation. BluStream e-beam cap sterilisation is a chemical-free differentiation vs H2O2 approaches. Key moat: net weight precision (0.1%) for dairy.",
    patents: [
      { id: "US12172853", title: "Cap/lid transport blowing nozzle system", relevance: "Cap sterilisation architecture — competes with Predis cap handling" },
      { id: "US11999606", title: "Dual-actuator filling nozzle", relevance: "Precision filling — core dairy market moat" },
      { id: "US11897746", title: "Aseptic filler spout with suction channel", relevance: "Drip-free aseptic filling IP fence" },
      { id: "US11891291", title: "Independent supply/return aseptic pipes", relevance: "Aseptic circuit architecture" },
      { id: "SAS5", title: "Dry H2O2 gas-phase sterilisation control (proprietary)", relevance: "Alternative to Sidel Predis — temperature/concentration control" },
    ],
  },
  gea: {
    strategy: "Unique position: only player with granted IP for aseptic aluminium bottle filling. Fencing around VHP dry sterilisation integration and dual-fill (liquid+solid). Strong in dairy/ESL technical moat.",
    patents: [
      { id: "US12304795", title: "Aseptic apparatus for aluminium receptacles", relevance: "UNIQUE — No Sidel equivalent. Granted May 2025." },
      { id: "ABF 2.0 Series", title: "Aseptic integrated blow-fill in isolator (pending)", relevance: "VHP dry preform blowing within isolator — close to Predis architecture" },
      { id: "Unibloc Flex 2025", title: "Second rinse water recovery (86% water recovery)", relevance: "Sustainability IP — regulatory differentiation" },
      { id: "ECOSpin2 Zero", title: "PAA-wet aseptic filling with zero waste", relevance: "Sustainable aseptic filling" },
    ],
  },
};

const PRODUCT_LINES = [
  { key: "blow_moulding", label: "Blow Moulding" },
  { key: "aseptic_filling", label: "Aseptic Filling" },
  { key: "filling_capping", label: "Filling & Capping" },
  { key: "end_of_line", label: "End-of-Line" },
];

export default function IPAnalysis() {
  const { competitors } = intelligenceData;

  // Build patent count matrix
  const patentCounts: Record<string, Record<string, number>> = {};
  for (const comp of competitors) {
    patentCounts[comp.id] = {};
    for (const pl of PRODUCT_LINES) {
      const plData = comp.product_lines[pl.key as keyof typeof comp.product_lines];
      patentCounts[comp.id][pl.key] = plData.patents.length;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">IP & Patent Analysis</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Patent landscapes, fencing strategies, and innovation signals by competitor</p>
      </div>

      {/* Patent heatmap */}
      <Card className="border-border">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold">Patent Activity Heatmap</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left text-muted-foreground font-medium py-2 pr-4 w-28">Competitor</th>
                {PRODUCT_LINES.map(pl => (
                  <th key={pl.key} className="text-center text-muted-foreground font-medium py-2 px-2">{pl.label}</th>
                ))}
                <th className="text-center text-muted-foreground font-medium py-2 px-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map(comp => {
                const total = PRODUCT_LINES.reduce((s, pl) => s + (patentCounts[comp.id][pl.key] || 0), 0);
                return (
                  <tr key={comp.id} className="border-t border-border">
                    <td className="py-2 pr-4 font-medium">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: comp.color }} />
                        {comp.name.split(' ')[0]}
                      </div>
                    </td>
                    {PRODUCT_LINES.map(pl => {
                      const count = patentCounts[comp.id][pl.key] || 0;
                      const intensity = count === 0 ? 0 : count <= 1 ? 1 : count <= 3 ? 2 : 3;
                      const bg = intensity === 0 ? "bg-muted/40 text-muted-foreground" :
                                 intensity === 1 ? "bg-primary/15 text-primary" :
                                 intensity === 2 ? "bg-primary/35 text-primary" :
                                 "bg-primary/60 text-white";
                      return (
                        <td key={pl.key} className="py-2 px-2 text-center">
                          <span className={`inline-block w-7 h-7 rounded text-xs font-semibold leading-7 ${bg}`}>
                            {count || "·"}
                          </span>
                        </td>
                      );
                    })}
                    <td className="py-2 px-2 text-center font-semibold text-sm">{total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Key alerts */}
      <Card className="border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold text-red-700 dark:text-red-400 flex items-center gap-2">
            <Shield size={14} />
            Critical IP Alerts for SIDEL R&D
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-2">
          {[
            { text: "SMI US11440238 & US11426921: Laser preform heating patents — potential conflict zone with Sidel EvoBLOW Laser. Legal review recommended.", severity: "critical" },
            { text: "GEA US12304795: World-first aseptic aluminium bottle apparatus (May 2025). SIDEL has no equivalent — a gap in addressable markets.", severity: "critical" },
            { text: "SMI US11707543: UV-C LED internal container disinfection — could be a future Predis alternative. Monitor commercialisation.", severity: "high" },
            { text: "Krones fibre container filing cluster (DE102022121467A1, DE102023131286A1, WO2025190536A1): Systematic hedge against PET-free trend.", severity: "high" },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm">
              <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${a.severity === 'critical' ? 'bg-red-600' : 'bg-amber-500'}`} />
              <span className="text-sm text-red-700 dark:text-red-400 leading-snug">{a.text}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Per-competitor IP detail */}
      <div className="space-y-3">
        {competitors.map(comp => {
          const ipData = IP_HIGHLIGHTS[comp.id];
          return (
            <Card key={comp.id} className="border-border">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: comp.color }} />
                  {comp.name} — IP Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                {ipData && (
                  <>
                    <p className="text-xs text-muted-foreground leading-relaxed">{ipData.strategy}</p>
                    <div className="space-y-1.5">
                      {ipData.patents.map((p, i) => (
                        <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <code className="text-xs font-mono text-primary shrink-0">{p.id}</code>
                              <span className="text-xs font-medium truncate">{p.title}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">{p.relevance}</div>
                          </div>
                          {p.relevance.toLowerCase().includes('overlap') || p.relevance.toLowerCase().includes('unique') || p.relevance.toLowerCase().includes('conflict') ? (
                            <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0 text-xs shrink-0">Watch</Badge>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
