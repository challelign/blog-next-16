import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Skeleton */}
      <div className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Skeleton className="h-9 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="size-9 rounded-full" />
            <Skeleton className="size-9 rounded-full" />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8 animate-pulse">
          {/* Header Skeleton */}
          <header className="mb-10 text-center flex flex-col items-center">
            <Skeleton className="h-6 w-20 mb-6 rounded-full" />
            <div className="space-y-2 w-full max-w-3xl flex flex-col items-center mb-8">
              <Skeleton className="h-10 sm:h-12 md:h-14 w-full" />
              <Skeleton className="h-10 sm:h-12 md:h-14 w-[80%]" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="size-4 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="size-4 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </header>

          {/* Featured Image Skeleton */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-2xl ring-1 ring-border">
            <Skeleton className="h-full w-full" />
          </div>

          <Separator className="mb-12" />

          {/* Content Skeleton */}
          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[98%]" />
              <Skeleton className="h-4 w-[96%]" />
              <Skeleton className="h-4 w-[92%]" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-[95%]" />
              <Skeleton className="h-4 w-[99%]" />
              <Skeleton className="h-4 w-[94%]" />
            </div>

            <Skeleton className="h-64 w-full rounded-xl my-8" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[97%]" />
              <Skeleton className="h-4 w-[93%]" />
              <Skeleton className="h-4 w-[88%]" />
            </div>
          </div>

          <Separator className="my-12" />

          {/* Footer Skeleton */}
          <div className="bg-muted/30 rounded-3xl p-8 md:p-12 text-center border ring-1 ring-border/50 flex flex-col items-center">
            <Skeleton className="h-8 w-64 mb-6" />
            <Skeleton className="h-4 w-full max-w-md mb-2" />
            <Skeleton className="h-4 w-[80%] max-w-sm mb-8" />
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
              <Skeleton className="h-11 w-full sm:w-[280px] rounded-lg" />
              <Skeleton className="h-11 w-full sm:w-32 rounded-lg" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
