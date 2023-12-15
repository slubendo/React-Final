import { db } from "@/db"; // Import eq and desc
import { eq, desc } from "drizzle-orm"
import { posts } from "../schema/post";
import { user } from "../schema/user";
import { media } from "../schema/media";
import { feedQuery } from "./feed-query";


export async function getSinglePost(id: number) {
    try {
        const singlePost = await feedQuery
            .where(eq(posts.id, id))
            .then((res) => res[0]);

        if (singlePost) {
            return {
                "success": "single post",
                "post": singlePost
            }
        } else {
            return { "error": "cannot find post" }
        }
    } catch (err) {
        return { "error": "cannot find post" }
    }
}