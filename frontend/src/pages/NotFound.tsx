import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <>
      <title>Page not found — Pandiyarajan S</title>
      <section className="container max-w-3xl py-32 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          404
        </p>
        <h1 className="heading-2 mt-3 text-balance">
          This page took a wrong turn.
        </h1>
        <p className="body-lg mt-4">
          The page you're looking for doesn't exist — or has been moved.
        </p>
        <Button asChild variant="gradient" size="lg" className="mt-8">
          <Link to="/">
            <ArrowLeft className="size-4" />
            Back home
          </Link>
        </Button>
      </section>
    </>
  );
}
