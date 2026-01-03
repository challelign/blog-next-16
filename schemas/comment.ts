import { Id } from "@/convex/_generated/dataModel";
import { z } from "zod";

export const commentSchema = z.object({
  body: z.string().trim().min(2, {
    message: "Comment body must be at least 2 characters.",
  }),
  postId: z.custom<Id<"posts">>(),
});
