import { db } from "@/db"; // Import eq and desc
import { eq, desc } from "drizzle-orm"
import { user } from "../schema/user";


export async function userQuery(id: number) {
    try {
    const userInfo = await db.select({
        id: user.id,
        name: user.name,
        image: user.image,
    })
        .from(user)
        .where(eq(user.id, id))
        .then((res) => res[0])


        if (userInfo) {
            return {
                "success": "single post",
                info: userInfo
            }
        } else {
            return { "error": "cannot find post" }
        }
    } catch (err) {
        return { "error": "cannot find post" }
    }
}
