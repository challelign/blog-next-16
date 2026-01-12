import { absoluteUrl } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Database, Layout, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { BlogCard } from "@/components/web/blog-card";

export const metadata: Metadata = {
  title: "Next.js 16 Convex Starter | Home",
  description:
    "A modern full-stack starter template powered by Next.js 16, Convex, and Tailwind CSS.",
  openGraph: {
    title: "Next.js 16 Convex Starter",
    description:
      "A modern full-stack starter template powered by Next.js 16, Convex, and Tailwind CSS.",
    url: absoluteUrl("/"),
    siteName: "Next.js 16 Convex Starter",
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Next.js 16 Convex Starter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js 16 Convex Starter",
    description:
      "A modern full-stack starter template powered by Next.js 16, Convex, and Tailwind CSS.",
    images: [absoluteUrl("/og-image.png")],
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

export default async function Home() {
  const posts = await fetchQuery(api.posts.getPosts);
  const latestPosts = posts?.slice(0, 3) || [];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Next.js 16 Convex Starter",
            url: absoluteUrl("/"),
            description:
              "A modern full-stack starter template powered by Next.js 16, Convex, and Tailwind CSS.",
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-5 md:py-10 lg:py-14">
        <div className="container px-4 text-center z-10 relative mx-auto">
          <div className="mx-auto rounded-full bg-muted/50 border border-primary/10 px-4 py-1.5 text-sm font-medium text-muted-foreground w-fit mb-8 backdrop-blur-sm">
            Powered by Next.js 16 & Convex
          </div>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
            Build Faster with <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Modern Full-Stack
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            A premium starter template featuring Server Actions, Real-time
            Database, and Authentication. Everything you need to ship your next
            big idea.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/blog">
              <Button size="lg" className="h-12 px-8 rounded-full text-base">
                View Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 rounded-full text-base"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Link>
          </div>
        </div>
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-primary/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] bg-blue-500/10 blur-[100px] rounded-full opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] bg-purple-500/10 blur-[100px] rounded-full opacity-20 pointer-events-none" />
      </section>

      {/* Features Section */}
      <section className="container px-4 py-10 md:py-12 mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-primary" />}
            title="Blazing Fast"
            description="Built on Next.js 16 with Server Components and Streaming for optimal performance."
          />
          <FeatureCard
            icon={<Database className="h-6 w-6 text-primary" />}
            title="Real-time Data"
            description="Powered by Convex for real-time updates, strict typing, and seamless backend logic."
          />
          <FeatureCard
            icon={<Layout className="h-6 w-6 text-primary" />}
            title="Modern UI"
            description="Beautifully designed components using Tailwind CSS and Radix UI primitives."
          />
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="bg-muted/30 py-10 md:py-12 border-y border-border/50">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Latest Articles
            </h2>
            <Link href="/blog">
              <Button variant="ghost" className="hidden sm:flex group">
                View all
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>

          <div className="mt-8 flex justify-center sm:hidden">
            <Link href="/blog">
              <Button variant="outline" className="w-full">
                View all articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="container px-4 py-12 text-center text-muted-foreground mx-auto">
        <p>© 2026 Next.js 16 and Convex. Built by Challelign T.</p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 h-12 w-12 flex items-center justify-center rounded-xl bg-primary/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
