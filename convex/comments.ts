import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";
// import { authComponent } from "./auth";

export const getCommentsByPostId = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    // Publicly accessible
    // const user = await authComponent.safeGetAuthUser(ctx);
    // if (!user) {
    //   throw new ConvexError("User not authenticated");
    // }
    const comment = await ctx.db
      .query("comments")
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .order("desc")
      .collect();
    return comment;
  },
});

export const createComment = mutation({
  args: {
    postId: v.id("posts"),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("User not authenticated");
    }
    const blogComment = await ctx.db.insert("comments", {
      body: args.body,
      authorId: user._id,
      postId: args.postId,
      authorName: user.name,
    });
    return blogComment;
  },
});
