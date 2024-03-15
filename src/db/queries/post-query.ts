import { eq } from "drizzle-orm"
import { posts } from "../schema/post";
import { feedQuery } from "./feed-query";


export async function postQuery(id: number) {
    try {
        const singlePost = await feedQuery
            .where(eq(posts.id, id))
            .then((res) => res[0]);

        if (singlePost) {
            return {
                "success": "single post",
                singlePost: singlePost
            }
        } else {
            return { "error": "cannot find post" }
        }
    } catch (err) {
        return { "error": "cannot find post" }
    }
}

