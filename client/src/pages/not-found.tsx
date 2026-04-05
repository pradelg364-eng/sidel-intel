import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-4xl font-bold text-muted-foreground mb-3">404</div>
      <p className="text-muted-foreground mb-4">Page not found</p>
      <Link href="/"><a className="text-primary text-sm hover:underline">← Back to Dashboard</a></Link>
    </div>
  );
}
