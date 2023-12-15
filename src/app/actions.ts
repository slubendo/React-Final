'use server'

import { db } from "@/db";
import { eq, and } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { posts } from "@/db/schema/post";
import { user } from "@/db/schema/user";
const saltRounds = 10;

export async function createPost(userId: number, content: string, url: string, type: "image" | "video", width: number, height: number) {
  try {


    console.log({ content, url, type });
    if (!content || !url || !type) {
      return { error: "Please fill the entire form" };
    }

    const mediaResult = await db.insert(media).values({ type, url, width, height, }).returning({ id: media.id });
    const postsResult = await db.insert(posts).values({ userId: userId, mediaId: mediaResult[0].id, content }).returning();

    revalidatePath("/")
  } catch (e) {
    console.error(e)
  }
}


export async function deletePost(id: number) {
  console.log(id);
  try {

    const deletePost = await db.delete(posts).where(eq(posts.id, id));
    if (deletePost) {
      console.log("post deleted")
      revalidatePath("/")
    } else {
      return { "error": "cannot delete post" }
    }
  } catch (err) {
    return { "error": "cannot delete post" }
  }
}



export async function createUser(userName: string, password: string, firstName: string, lastName: string, avatar: string, createdAt: string) {
  //@ts-ignore
  // const salt = bcrypt.genSaltSync(saltRounds);
  // const hash = bcrypt.hashSync(password, salt);

  const userAlreadyInDB = await db.select()
    .from(user)
    .where(eq(user.username, userName))
    .then((res) => res[0])

  if (userAlreadyInDB) {
    return "Sorry username is taken"
  }

  let result = await db.insert(user).values({
    username: userName,
    firstName: firstName,
    lastName: lastName,
    avatar: avatar,
    createdAt: createdAt,
  }).returning().run()

  // const accessToken = jwt.sign({ user: userName }, process.env.SECRET, { expiresIn: "1h" })
  // cookies().set("user_token", accessToken);
  cookies().set("user_name", userName);
  cookies().set("user_name_id", JSON.stringify(result.rows[0].id));

  let signedUser = {
    id: result.rows[0].id,
    username: result.rows[0].username,
    firstName: result.rows[0].firstName,
    lastName: result.rows[0].lastName,
    avatar: result.rows[0].avatar
  };

  console.log({ signedUser });

  return {
    success: "Signed up user successfully",
    user: signedUser
  }

}

export async function login(username: string, password: string) {
  try {
    let currentUser = await db.select()
      .from(user)
      .where(eq(user.username, username))
      .then((res) => res[0])

    // if (currentUser && bcrypt.compareSync(password, currentUser.password)) {
    // delete (currentUser as { password?: string }).password;
    // const accessToken = jwt.sign({ user: currentUser.username }, process.env.SECRET, { expiresIn: "1h" })
    // cookies().set("user_token", accessToken);
    if (currentUser) {

    cookies().set("user_name", username);
    cookies().set("user_name_id", JSON.stringify(currentUser.id));


    return { "success": "user log in" }
  } else {
    throw new Error("Unable to log in")
  }
} catch (err) {
  return { "failure": "user unable to log in" }
}
}

// export async function verifyToken(token: string, username: string) {
//   try {
//     const decoded = jwt.verify(token, process.env.SECRET);
//     if (decoded.user == username) {
//       revalidatePath("/posts");
//       return { "success": "Verified" }
//     } else {
//       revalidatePath("/posts");
//       return { "failure": "Error Token not validated" }
//     }
//   } catch (err) {
//     return { "failure": "Error Token not validated" }
//   }
// }


export async function deleteUser(id: number) {
  try {
    await db.delete(user).where(eq(user.id, id));
    return id;
  } catch (err) {
    console.log(err);
    return "Error encountered while deleting user"
  }
}


export async function updatePost(postId: number, userId: number, content: string) {
  try {
    let updatedPost = await db.update(posts)
      .set({ "content": content })
      .where(and(eq(posts.id, postId), eq(posts.userId, userId))).returning().run();
    if (updatedPost) {
      return {
        "success": "post updated"
      }
    } else {
      return { "error": "cannot update post" }
    }
  } catch (err) {
    return { "error": "cannot update post" }
  }
}