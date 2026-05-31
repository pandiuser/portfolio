import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "@/lib/query-client";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/common/animated-background";

const Home = lazy(() => import("@/pages/Home").then((m) => ({ default: m.Home })));
const NotFound = lazy(() =>
  import("@/pages/NotFound").then((m) => ({ default: m.NotFound })),
);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AnimatedBackground />
        <Navigation />
        <main className="relative">
          <Suspense fallback={<RouteSkeleton />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "hsl(240 14% 9% / 0.95)",
              color: "hsl(220 14% 96%)",
              border: "1px solid hsl(240 8% 18%)",
              backdropFilter: "blur(12px)",
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function RouteSkeleton() {
  return (
    <div className="container max-w-6xl py-32">
      <div className="h-12 w-2/3 animate-pulse rounded-lg bg-surface-muted" />
      <div className="mt-4 h-6 w-1/2 animate-pulse rounded-lg bg-surface-muted" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-40 animate-pulse rounded-2xl bg-surface-muted" />
        ))}
      </div>
    </div>
  );
}
