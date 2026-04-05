import { Link, useLocation } from "wouter";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, BarChart2, Globe, Shield, TrendingUp, Lightbulb, Bell, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";
import PerplexityAttribution from "@/components/PerplexityAttribution";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/competitors", label: "Competitors", icon: Globe },
  { href: "/ip", label: "IP & Patents", icon: Shield },
  { href: "/financial", label: "Financials", icon: BarChart2 },
  { href: "/strategy", label: "R&D Strategy", icon: Lightbulb },
  { href: "/subscribe", label: "Alerts", icon: Bell },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [loc] = useLocation();
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top bar */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setMobileOpen(o => !o)} data-testid="button-menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            {/* SVG Logo */}
            <svg viewBox="0 0 36 36" width="28" height="28" fill="none" aria-label="SIDEL Intel Logo" className="shrink-0">
              <rect width="36" height="36" rx="8" fill="hsl(var(--primary))" />
              <circle cx="18" cy="18" r="8" stroke="white" strokeWidth="2" fill="none" />
              <path d="M18 10 L18 18 L24 21" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="18" cy="18" r="2" fill="white" />
            </svg>
            <div className="leading-tight">
              <div className="font-semibold text-sm tracking-tight">SIDEL Intel</div>
              <div className="text-xs text-muted-foreground hidden sm:block">Competitive Intelligence Platform</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Updated Mar 2026
            </span>
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-1">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <a
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    loc === href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </a>
              </Link>
            ))}
          </nav>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex flex-col w-52 border-r border-border bg-sidebar shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <nav className="p-3 flex flex-col gap-0.5 flex-1">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <a
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    loc === href
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  data-testid={`nav-${label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <Icon size={15} />
                  {label}
                </a>
              </Link>
            ))}
          </nav>
          <div className="p-3 border-t border-sidebar-border">
            <div className="text-xs text-muted-foreground">SIDEL — Tetra Laval Group</div>
            <div className="text-xs text-muted-foreground">R&D Strategy Intelligence</div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            {children}
          </div>
          <div className="px-6 pb-4">
            <PerplexityAttribution />
          </div>
        </main>
      </div>
    </div>
  );
}
