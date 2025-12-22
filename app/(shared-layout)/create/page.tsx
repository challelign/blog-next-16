"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { postSchema } from "@/schemas/post";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createPost } from "@/convex/posts";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { createBlogAction } from "@/app/actions";
export default function CreateRoute() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const mutation = useMutation(api.posts.createPost);
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof postSchema>) {
    // ## Option 1 convex
    /*
    startTransition(() => {
      mutation({
        body: values.content,
        title: values.title,
      });
      toast.success("New blog saved successfully");
      router.push("/");
    });

    */
    //   ## Option 2 convex
    /*
    startTransition(async () => {
      try {
        await mutation({
          body: values.content,
          title: values.title,
        });
        toast.success("New blog saved successfully");
        router.push("/");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to save the new blog"
        );
      }
    });
   */
    // ## Option 3 server action

    startTransition(async () => {
      const data = await createBlogAction(values);
      if (data.status === 200) {
        toast.success(data.message);
        router.push("/");
      }
    });
  }
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts with the big world
        </p>
      </div>

      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> */}
              <fieldset disabled={isPending} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          type="title"
                          placeholder="Blog title here"
                          {...field}
                          className="bg-background/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            disabled={isPending}
                            placeholder="Content here"
                            {...field}
                            className="bg-background/50 pr-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Loading</span>
                    </>
                  ) : (
                    <>
                      <span>Create blog</span>
                    </>
                  )}
                </Button>
              </fieldset>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
