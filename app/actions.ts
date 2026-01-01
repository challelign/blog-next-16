"use server";

import { api } from "@/convex/_generated/api";
import { postSchema } from "@/schemas/post";
import z from "zod";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";

export async function createBlogAction(values: z.infer<typeof postSchema>) {
  const validatedFields = postSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, content, image } = validatedFields.data;
  const token = await getToken();

  let imageStorageId = undefined;

  if (image) {
    try {
      const uploadUrl = await fetchMutation(
        api.posts.generateImageUploadUrl,
        {},
        { token }
      );

      const uploadResult = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": image.type },
        body: image,
      });

      if (!uploadResult.ok) {
        throw new Error("Failed to upload image");
      }

      const { storageId } = await uploadResult.json();
      imageStorageId = storageId;
    } catch (error) {
      console.log("ERROR UPLOADING IMAGE=>", error);
      return {
        status: 500,
        message: "Failed to upload image",
      };
    }
  }

  try {
    await fetchMutation(
      api.posts.createPost,
      { title, body: content, imageStorageId },
      {
        token,
      }
    );

    revalidatePath("/blog");
    revalidatePath("/");

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
