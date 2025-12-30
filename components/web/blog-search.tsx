"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

export function BlogSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const [debouncedValue] = useDebounceValue(value, 300);

  useEffect(() => {
    const currentQuery = searchParams.get("q") ?? "";

    if (debouncedValue === currentQuery) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    if (debouncedValue) {
      params.set("q", debouncedValue);
    } else {
      params.delete("q");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedValue, pathname, router, searchParams]);

  return (
    <div className="mx-auto mt-12 max-w-md">
      <div className="relative group">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-hover:text-primary" />
        <Input
          type="text"
          placeholder="Search articles..."
          className="h-12 w-full rounded-full border-primary/50 bg-background/50 pl-10 backdrop-blur-xl transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}
