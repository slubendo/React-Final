import { db } from "@/db"; // Import eq and desc
import { eq, desc, like } from "drizzle-orm"
import { posts } from "../schema/post";
import { user } from "../schema/user";


export async function searchQuery(searchParams: string) {

 const search = db.select({
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
  .where(like(posts.content, `%${searchParams}%`))
  .innerJoin(user, eq(posts.userId, user.id))
  .orderBy(desc(posts.createdAt))

}
