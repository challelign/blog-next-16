"use client";

import React, { useState, useTransition } from "react";
import {
  useQuery,
  useMutation,
  Preloaded,
  usePreloadedQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2, MessageSquare, Send, LogIn } from "lucide-react";
import Link from "next/link";
import { commentSchema } from "@/schemas/comment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { useParams } from "next/navigation";
// interface CommentSectionProps {
//   postId: Id<"posts">;
// }

// const CommentSection = ({ postId }: CommentSectionProps) => {
const CommentSection = (props: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsByPostId>;
}) => {
  const comments = usePreloadedQuery(props.preloadedComments);

  const params = useParams<{ blogId: Id<"posts"> }>(); //blogId this id refers the path blog/[blogId]

  const { data: session } = authClient.useSession();
  // const comments = useQuery(api.comments.getCommentsByPostId, { postId });
  const createComment = useMutation(api.comments.createComment);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      postId: params.blogId,
    },
  });

  async function onSubmit(values: z.infer<typeof commentSchema>) {
    if (!session) {
      toast.error("You must be logged in to comment.");
      return;
    }

    startTransition(async () => {
      try {
        // await createComment(form.getValues());

        await createComment(values);

        form.reset();
        toast.success("Comment posted!");
      } catch (error) {
        toast.error("Failed to post comment");
        console.error(error);
      }
    });
  }

  return (
    <div className="mx-auto max-w-3xl py-12">
      <div className="mb-8 flex items-center gap-2">
        <MessageSquare className="text-primary h-6 w-6" />
        <h2 className="text-2xl font-bold tracking-tight">Comments</h2>
        {comments && (
          <span className="bg-muted text-muted-foreground ml-2 rounded-full px-2 py-0.5 text-xs font-medium">
            {comments.length}
          </span>
        )}
      </div>

      {/* Comment Form */}
      <div className="bg-card text-card-foreground mb-10 overflow-hidden rounded-xl border shadow-xs">
        <div className="p-6">
          {session ? (
            <>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex gap-4"
                >
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage
                      src={session.user.image || ""}
                      alt={session.user.name || "User"}
                    />
                    <AvatarFallback>
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    {/* 
                    <Textarea
                        placeholder="Share your thoughts..."
                        className="min-h-[100px] resize-none border-0 bg-muted/50 focus-visible:ring-0 focus-visible:bg-background transition-colors"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        disabled={isSubmitting}
                    /> 
                */}

                    <FormField
                      control={form.control}
                      name="body"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Blog Content</FormLabel> */}
                          <FormControl>
                            <div className="relative">
                              <Textarea
                                disabled={isPending}
                                placeholder="Share your thoughts..."
                                {...field}
                                // className="bg-background/50 pr-10"
                                className=" min-h-[100px] resize-none border-b focus-visible:ring-0  focus-visible:bg-background bg-background/50 transition-colors"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className={cn("flex justify-end")}>
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="gap-2"
                      >
                        {isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
              <div className="bg-muted rounded-full p-3">
                <MessageSquare className="text-muted-foreground h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Join the conversation</h3>
                <p className="text-muted-foreground text-sm">
                  Sign in to leave a comment and interact with the community.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/auth/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/sign-up">Sign Up</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments === undefined ? (
          // Loading Skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex animate-pulse gap-4">
              <div className="bg-muted h-10 w-10 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="bg-muted h-4 w-32 rounded-sm" />
                <div className="bg-muted h-16 w-full rounded-md" />
              </div>
            </div>
          ))
        ) : comments.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="group flex gap-4 transition-opacity animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              <Avatar className="h-10 w-10 shrink-0 border">
                {/* Note: In a real app we might need to fetch user images separately if not stored in comment */}
                <AvatarFallback>
                  {comment.authorName?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      {comment.authorName}
                    </span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-muted-foreground text-xs">
                      {formatDistanceToNow(comment._creationTime, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {comment.body}
                </p>
                <Separator className="my-3" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
