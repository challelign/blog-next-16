import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

// Create a new task with the given text
export const createPost = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    console.log("USER=>", user);
    if (!user) {
      throw new ConvexError("User not authenticated");
    }
    const blogArticle = await ctx.db.insert("posts", {
      title: args.title,
      body: args.body,
      authorId: user._id,
      imageStorageId: args.imageStorageId,
    });
    return blogArticle;
  },
});

// Return the last 100 tasks in a given task list.
export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    // Deduplicate by _id
    const uniquePosts = Array.from(
      new Map(posts.map((post) => [post._id, post])).values()
    );

    return await Promise.all(
      uniquePosts.map(async (post) => ({
        ...post,
        imageUrl: post.imageStorageId
          ? await ctx.storage.getUrl(post.imageStorageId)
          : null,
      }))
    );
  },
});

// Search posts by title
export const searchPosts = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    if (args.query === "") {
      return await ctx.db.query("posts").order("desc").collect();
    }

    const posts = await ctx.db
      .query("posts")
      .withSearchIndex("search_title", (q) => q.search("title", args.query))
      .collect();

    // Deduplicate by _id to ensure unique results
    const uniquePosts = Array.from(
      new Map(posts.map((post) => [post._id, post])).values()
    );

    console.log("POSTS=>", uniquePosts.length);
    return await Promise.all(
      uniquePosts.map(async (post) => ({
        ...post,
        imageUrl: post.imageStorageId
          ? await ctx.storage.getUrl(post.imageStorageId)
          : null,
      }))
    );
  },
});

// Return the last 100 tasks in a given task list.
export const getPostsByAuthorId = query({
  args: { authorId: v.id("users") },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("authorId"), args.authorId))
      .order("desc")
      .take(100);

    return await Promise.all(
      posts.map(async (post) => ({
        ...post,
        imageUrl: post.imageStorageId
          ? await ctx.storage.getUrl(post.imageStorageId)
          : null,
      }))
    );
  },
});

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    console.log("USER=>", user);
    if (!user) {
      throw new ConvexError("User not authenticated");
    }
    const url = await ctx.storage.generateUploadUrl();
    return url;
  },
});
