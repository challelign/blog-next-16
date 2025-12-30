"use client";

import React from "react";
import { Doc } from "@/convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, UserIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  post: Doc<"posts">;
}

export function BlogCard({ post }: BlogCardProps) {
  // Format date
  const date = new Date(post._creationTime).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="group h-full flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={`https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-lg"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <CardHeader className="space-y-2 p-6">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="bg-secondary/50 text-xs font-normal"
          >
            Article
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon className="mr-1 h-3 w-3" />
            {date}
          </div>
        </div>
        <Link href={`/blog/${post._id}`} className="block">
          <h3 className="line-clamp-2 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="flex-1 px-6 pb-2">
        <p className="line-clamp-3 text-sm text-muted-foreground leading-relaxed ">
          {post.body}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-4 ">
        <Button
          variant="ghost"
          className="group/btn w-full justify-between hover:bg-primary/5"
          asChild
        >
          <Link href={`/blog/${post._id}`} className="">
            Read more
            <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
