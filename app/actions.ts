"use server";

import { api } from "@/convex/_generated/api";
import { postSchema } from "@/schemas/post";
import z from "zod";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export async function createBlogAction(values: z.infer<typeof postSchema>) {
  const validatedFields = postSchema.safeParse(values);

  const token = await getToken();

  //   const user = await fetchQuery(api.auth.getCurrentUser, {}, { token });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { title, content } = validatedFields.data;
  try {
    await fetchMutation(
      api.posts.createPost,
      { title, body: content },
      {
        token,
      }
    );

    return {
      status: 200,
      message: "Post created successfully",
    };
  } catch (error: any) {
    return {
      errors: `${error.message}, Failed to create post`,
      status: 500,
      message: "Failed to create post",
    };
  }
}
