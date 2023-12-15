import { db } from "@/db"; // Import eq and desc
import { eq, desc } from "drizzle-orm"
import { posts } from "../schema/post";
import { user } from "../schema/user";
import { feedQuery } from "./feed-query";


export async function userFeed(id: number) {
    try {
        const usrPosts = await feedQuery
            .where(eq(user.id, id))

        if (usrPosts) {
            return {
                "success": "single post",
                usrPosts: usrPosts
            }
        } else {
            return { "error": "cannot find post" }
        }
    } catch (err) {
        return { "error": "cannot find post" }
    }
}