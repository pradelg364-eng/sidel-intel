import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, CheckCircle, Mail, Calendar, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: subscribers = [] } = useQuery({
    queryKey: ["/api/subscribers"],
  });

  const addMutation = useMutation({
    mutationFn: (email: string) =>
      apiRequest("POST", "/api/subscribers", { email, addedAt: new Date().toISOString() }),
    onSuccess: () => {
      toast({ title: "Subscribed", description: `${email} added to the distribution list.` });
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/subscribers"] });
    },
    onError: () => {
      toast({ title: "Error", description: "Could not subscribe. Email may already be registered.", variant: "destructive" });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/subscribers/${id}`),
    onSuccess: () => {
      toast({ title: "Removed", description: "Subscriber removed." });
      queryClient.invalidateQueries({ queryKey: ["/api/subscribers"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    addMutation.mutate(email);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Report Distribution</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage recipients for the monthly competitive intelligence email</p>
      </div>

      {/* Schedule info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: Calendar, title: "Monthly Cadence", desc: "Reports published on the 1st of each month" },
          { icon: FileText, title: "Report Contents", desc: "IP analysis, product launches, financials, strategy" },
          { icon: Mail, title: "Email Summary", desc: "Key highlights with link to live dashboard" },
        ].map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="border-border">
            <CardContent className="p-4 flex items-start gap-3">
              <Icon size={16} className="text-primary mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-medium">{title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add subscriber */}
      <Card className="border-border">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Bell size={14} className="text-primary" />
            Add Recipient
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="colleague@sidel.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1"
              data-testid="input-email"
            />
            <Button type="submit" disabled={addMutation.isPending} data-testid="button-subscribe">
              {addMutation.isPending ? "Adding..." : "Add"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Subscriber list */}
      <Card className="border-border">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold">
            Distribution List ({Array.isArray(subscribers) ? subscribers.length : 0})
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          {!Array.isArray(subscribers) || subscribers.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No subscribers yet. Add the first recipient above.</p>
          ) : (
            <div className="divide-y divide-border">
              {(subscribers as any[]).map((sub: any) => (
                <div key={sub.id} className="py-3 flex items-center justify-between" data-testid={`row-subscriber-${sub.id}`}>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle size={14} className="text-green-500" />
                    <span className="text-sm">{sub.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {new Date(sub.addedAt).toLocaleDateString()}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-destructive hover:text-destructive h-7 px-2"
                      onClick={() => removeMutation.mutate(sub.id)}
                      disabled={removeMutation.isPending}
                      data-testid={`button-remove-${sub.id}`}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule note */}
      <Card className="border-border bg-primary/5">
        <CardContent className="p-4">
          <div className="text-sm font-medium mb-1">Monthly automation active</div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The competitive intelligence system runs automatically on the 1st of each month. It collects fresh data across all 6 competitors,
            updates this dashboard, and sends an email summary to all addresses in the distribution list above.
            The email contains key highlights, top 3 strategic alerts, and a direct link to this dashboard for the full report.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
