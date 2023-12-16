import { db } from "@/db"; // Import eq and desc
import { eq, desc } from "drizzle-orm"
import { posts } from "../schema/post";
import { user } from "../schema/user";


export const feedQuery = db.select({
  id: posts.id,
  content: posts.content,
  createdAt: posts.createdAt,
  user: {
    id: user.id,
    name: user.name,
    image: user.image,
  },
})
  .from(posts)
  .innerJoin(user, eq(posts.userId, user.id))
  .orderBy(desc(posts.createdAt))
