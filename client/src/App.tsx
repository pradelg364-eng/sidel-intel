import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Competitors from "@/pages/Competitors";
import CompetitorDetail from "@/pages/CompetitorDetail";
import IPAnalysis from "@/pages/IPAnalysis";
import Financial from "@/pages/Financial";
import Strategy from "@/pages/Strategy";
import Subscribe from "@/pages/Subscribe";
import NotFound from "@/pages/not-found";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router hook={useHashLocation}>
          <Layout>
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/competitors" component={Competitors} />
              <Route path="/competitors/:id" component={CompetitorDetail} />
              <Route path="/ip" component={IPAnalysis} />
              <Route path="/financial" component={Financial} />
              <Route path="/strategy" component={Strategy} />
              <Route path="/subscribe" component={Subscribe} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </Router>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
