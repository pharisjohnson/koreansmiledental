import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="eyebrow mb-4">404</div>
        <h1 className="font-display text-5xl mb-4">Page not found</h1>
        <p className="text-sm text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/" className="btn-primary">Return home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl mb-3">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground mb-6">
          Something went wrong on our end. Please try again.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">Try again</button>
          <a href="/" className="btn-outline">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Korean Smile Dental — Premium Korean-Inspired Dental Care" },
      { name: "description", content: "Korean Smile Dental — cosmetic, restorative and orthodontic care delivered with the precision of a modern Seoul clinic." },
      { property: "og:title", content: "Korean Smile Dental — Premium Korean-Inspired Dental Care" },
      { property: "og:description", content: "Korean Smile Dental — cosmetic, restorative and orthodontic care delivered with the precision of a modern Seoul clinic." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Korean Smile Dental" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Korean Smile Dental — Premium Korean-Inspired Dental Care" },
      { name: "twitter:description", content: "Korean Smile Dental — cosmetic, restorative and orthodontic care delivered with the precision of a modern Seoul clinic." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/58a46b66-d3f9-4b00-a257-589666752ada/id-preview-56b983f6--44372158-cb5d-43c6-867e-88b3e1270dea.lovable.app-1779113698421.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/58a46b66-d3f9-4b00-a257-589666752ada/id-preview-56b983f6--44372158-cb5d-43c6-867e-88b3e1270dea.lovable.app-1779113698421.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="pt-20 min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </QueryClientProvider>
  );
}
