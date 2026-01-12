import { BlogCard } from "@/components/web/blog-card";
import { absoluteUrl } from "@/lib/utils";
import { SearchIcon, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchQuery } from "convex/nextjs";
import { Suspense } from "react";
import { BlogSearch } from "@/components/web/blog-search";
import { api } from "@/convex/_generated/api";
import { Metadata } from "next";
import Script from "next/script";

// export const dynamic = "force-dynamic";
// 'auto' is the default value
// 'force-dynamic' is the same as 'auto'
// 'error' is the same as 'auto'
// 'force-static' is the same as 'auto'

// For Static Site Generation
<Script
  id="blog-schema"
  type="application/ld+json"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Blog | Next.js 16 Convex",
      description:
        "Read all our blog articles on development, design, and everything in between.",
      url: absoluteUrl("/blog"),
      author: {
        "@type": "Person",
        name: "Challelign T.",
      },
    }),
  }}
/>;
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "Blog | Next.js 16 Convex",
    template: "%s | Next.js 16 Convex",
  },
  description:
    "Read all our blog articles on development, design, and everything in between.",
  authors: [{ name: "Challelign T." }],
  keywords: [
    "Next.js",
    "Convex",
    "Blog",
    "Development",
    "Design",
    "Everything",
  ],
  creator: "Challelign T.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/blog",
    title: "Blog | Next.js 16 Convex",
    description:
      "Read all our blog articles on development, design, and everything in between.",
    siteName: "Next.js 16 Convex Blog",
    images: [
      {
        url: absoluteUrl("/og-image.png"), // Assuming you have one, or fallback
        width: 1200,
        height: 630,
        alt: "Blog | Next.js 16 Convex",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Next.js 16 Convex",
    description:
      "Read all our blog articles on development, design, and everything in between.",
    images: [absoluteUrl("/og-image.png")],
    creator: "@challelign",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/blog",
  },
};

const BlogPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const { q } = await searchParams;

  return (
    <div className="min-h-screen bg-background pb-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 md:py-16">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary backdrop-blur-sm">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            <span>Our Latest Writings</span>
          </div>
          <h1 className="mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl lg:text-7xl">
            Insights & <br className="hidden sm:block" />
            <span className="text-primary">Perspectives</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Explore our latest articles, thoughts, and tutorials on development,
            design, and everything in between.
          </p>

          <BlogSearch />
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 text-primary/5 opacity-50 blur-[100px] bg-primary rounded-full pointer-events-none" />
      </section>

      {/* Content Section */}

      <Suspense key={q} fallback={<SkeletonList />}>
        <LoadBlogList query={q} />
      </Suspense>
    </div>
  );
};

export default BlogPage;

async function LoadBlogList({ query }: { query?: string }) {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = query
    ? await fetchQuery(api.posts.searchPosts, { query })
    : await fetchQuery(api.posts.getPosts);

  return (
    <div className="container mx-auto px-4">
      {data === undefined ? (
        // Loading State
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      ) : data?.length === 0 ? (
        // Empty State
        <div className="flex  flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-muted/50 ">
            <SearchIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">No articles found</h3>
          <p className="mt-2 text-muted-foreground">
            We couldn&apos;t find any articles matching &quot;{query}&quot;.
            <br /> Try adjusting your search terms.
          </p>
        </div>
      ) : (
        // Post Grid
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {data?.map((post) => (
            <div key={post._id} className="h-full">
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
