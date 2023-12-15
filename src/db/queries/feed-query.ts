import { db } from "@/db"; // Import eq and desc
import { eq, desc } from "drizzle-orm"
import { posts } from "../schema/post";
import { user } from "../schema/user";
import { media } from "../schema/media";



export const feedQuery = db.select({
  id: posts.id,
  userId: posts.userId,
  mediaId: posts.mediaId,
  content: posts.content,
  createdAt: posts.createdAt,
  user: {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    createdAt: user.createdAt,
  },
  media: {
    id: media.id,
    type: media.type,
    url: media.url,
    width: media.width,
    height: media.height,
    createdAt: media.createdAt,
  }
})
  .from(posts)
  .innerJoin(user, eq(posts.userId, user.id))
  .innerJoin(media, eq(posts.mediaId, media.id))
  .orderBy(desc(posts.createdAt))



