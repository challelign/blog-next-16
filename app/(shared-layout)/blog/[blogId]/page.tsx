import { ArrowLeft, Calendar, User, Clock, Bookmark } from "lucide-react";
import { calculateReadingTime } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ShareButton from "./_components/ShareButton";

interface BlogProps {
  params: Promise<{ blogId: Id<"posts"> }>;
}
const Blog = async ({ params }: BlogProps) => {
  const { blogId } = await params;
  const post = await fetchQuery(api.posts.getPostById, { id: blogId });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/blog"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "group gap-2 hover:bg-transparent px-0 font-medium",
            })}
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Articles
          </Link>

          <div className="flex items-center gap-2">
            <ShareButton />
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bookmark className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Header */}
          <header className="mb-10 text-center">
            <Badge
              variant="secondary"
              className="mb-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            >
              Article
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="size-4 text-primary" />
                </div>
                <span>Author</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <span>Jan 2, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <span>{calculateReadingTime(post.body)}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.imageUrl && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-2xl ring-1 ring-border">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          )}

          <Separator className="mb-12" />

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-muted-foreground/90 prose-p:leading-relaxed selection:bg-primary/20">
            {post.body.split("\n").map(
              (paragraph, index) =>
                paragraph.trim() && (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                )
            )}
          </div>

          <Separator className="my-12" />

          {/* Footer / CTA or something */}
          <footer className="bg-muted/30 rounded-3xl p-8 md:p-12 text-center border ring-1 ring-border/50">
            <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter to receive the latest insights and
              updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border bg-background min-w-[280px] focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button size="lg" className="rounded-lg px-8">
                Subscribe
              </Button>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default Blog;
