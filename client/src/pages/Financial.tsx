import { intelligenceData } from "@/lib/intelligence";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Cell
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#d97706", "#7c3aed", "#db2777", "#0891b2", "#0f766e"];

export default function Financial() {
  const { competitors, sidel } = intelligenceData;

  // Revenue bar data (include SIDEL)
  const revenueData = [
    { name: "SIDEL", revenue: sidel.revenue_eur_m, fill: "#0f766e" },
    ...competitors.map((c, i) => ({
      name: c.name.split(' ')[0],
      revenue: c.revenue_eur_m,
      fill: COLORS[i],
    })),
  ].sort((a, b) => b.revenue - a.revenue);

  // Growth bar data
  const growthData = competitors.map((c, i) => ({
    name: c.name.split(' ')[0],
    growth: c.growth_pct,
    fill: c.growth_pct >= 0 ? COLORS[i] : "#ef4444",
  }));

  // Radar: competitive dimensions score out of 10
  const radarData = [
    { subject: "Scale", krones: 10, khs: 3, smi: 0.5, sacmi: 3, serac: 0.4, gea: 9.7, sidel: 3 },
    { subject: "Aseptic", krones: 8, khs: 6, smi: 2, sacmi: 1, serac: 8, gea: 7, sidel: 9 },
    { subject: "Blow Moulding", krones: 9, khs: 8, smi: 6, sacmi: 0, serac: 2, gea: 3, sidel: 10 },
    { subject: "End-of-Line", krones: 10, khs: 7, smi: 5, sacmi: 1, serac: 1, gea: 3, sidel: 7 },
    { subject: "IP Portfolio", krones: 9, khs: 7, smi: 5, sacmi: 7, serac: 5, gea: 6, sidel: 8 },
    { subject: "Innovation", krones: 9, khs: 7, smi: 6, sacmi: 8, serac: 6, gea: 7, sidel: 8 },
  ];

  // Financial comparison table
  const tableData = [
    { metric: "Revenue (€M)", sidel: "1,720", krones: "5,664", khs: "1,654", smi: "193", sacmi: "1,728", serac: "~175", gea: "5,495" },
    { metric: "Revenue Growth", sidel: "~+5%", krones: "+7.0%", khs: "+9.0%", smi: "+10.9%", sacmi: "-15.1%*", serac: "~+8%", gea: "+1.4%" },
    { metric: "EBITDA Margin", sidel: "N/D", krones: "10.6%", khs: "~8.0%", smi: "N/D", sacmi: "~18.7%", serac: "N/D", gea: "16.5%" },
    { metric: "R&D Spend", sidel: "Est. 3–5%", krones: "~2–3%", khs: "N/D", smi: "~6%", sacmi: "~4%", serac: "N/D", gea: "2.9%" },
    { metric: "Employees", sidel: "5,500", krones: "21,339", khs: "~5,500", smi: "792", sacmi: "4,756", serac: "~700", gea: "18,628" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Financial Comparison</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Revenue, growth, and financial benchmarking vs. SIDEL (FY2024–2025 data)</p>
        <p className="text-xs text-muted-foreground mt-1">* Sacmi revenue decline reflects Beverage BU divestiture (Sep 2024), not organic decline</p>
      </div>

      {/* Revenue chart */}
      <Card className="border-border">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold">Revenue Comparison (€M)</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} className="text-muted-foreground" />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `€${(v/1000).toFixed(0)}B`} />
              <Tooltip
                formatter={(v: number) => [`€${v.toLocaleString()}M`, "Revenue"]}
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
              />
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                {revenueData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Growth chart */}
      <Card className="border-border">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold">Revenue Growth YoY (%)</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={growthData} margin={{ top: 4, right: 4, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={(v: number) => [`${v}%`, "Growth"]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="growth" radius={[4, 4, 0, 0]}>
                {growthData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Radar */}
      <Card className="border-border">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold">Competitive Position Radar</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 9 }} />
              <Radar name="SIDEL" dataKey="sidel" stroke="#0f766e" fill="#0f766e" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Krones" dataKey="krones" stroke="#2563eb" fill="none" strokeWidth={1.5} strokeDasharray="4 2" />
              <Radar name="KHS" dataKey="khs" stroke="#16a34a" fill="none" strokeWidth={1.5} strokeDasharray="4 2" />
              <Radar name="GEA" dataKey="gea" stroke="#0891b2" fill="none" strokeWidth={1.5} strokeDasharray="4 2" />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {[
              { label: "SIDEL", color: "#0f766e", solid: true },
              { label: "Krones", color: "#2563eb", solid: false },
              { label: "KHS", color: "#16a34a", solid: false },
              { label: "GEA", color: "#0891b2", solid: false },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-4 h-0.5 inline-block" style={{ backgroundColor: l.color, opacity: l.solid ? 1 : 0.7 }} />
                {l.label}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold">Key Financial Metrics</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 overflow-x-auto">
          <table className="w-full text-xs min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-3 text-muted-foreground font-medium">Metric</th>
                <th className="text-center py-2 px-2 text-[#0f766e] font-semibold">SIDEL</th>
                <th className="text-center py-2 px-2 text-muted-foreground font-medium">Krones</th>
                <th className="text-center py-2 px-2 text-muted-foreground font-medium">KHS</th>
                <th className="text-center py-2 px-2 text-muted-foreground font-medium">SMI</th>
                <th className="text-center py-2 px-2 text-muted-foreground font-medium">Sacmi</th>
                <th className="text-center py-2 px-2 text-muted-foreground font-medium">Serac</th>
                <th className="text-center py-2 px-2 text-muted-foreground font-medium">GEA</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-2 pr-3 font-medium text-foreground">{row.metric}</td>
                  <td className="py-2 px-2 text-center font-semibold text-[#0f766e]">{row.sidel}</td>
                  <td className="py-2 px-2 text-center text-muted-foreground">{row.krones}</td>
                  <td className="py-2 px-2 text-center text-muted-foreground">{row.khs}</td>
                  <td className="py-2 px-2 text-center text-muted-foreground">{row.smi}</td>
                  <td className="py-2 px-2 text-center text-muted-foreground">{row.sacmi}</td>
                  <td className="py-2 px-2 text-center text-muted-foreground">{row.serac}</td>
                  <td className="py-2 px-2 text-center text-muted-foreground">{row.gea}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-3">N/D = not disclosed (private subsidiaries). All figures FY2024 or FY2025 depending on competitor fiscal year.</p>
        </CardContent>
      </Card>
    </div>
  );
}
