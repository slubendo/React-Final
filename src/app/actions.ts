'use server'

import { db } from "@/db";
import { eq, and } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import { posts } from "@/db/schema/post";
import { user } from "@/db/schema/user";
const saltRounds = 10;

export async function createPost(userId: number, content: string) {
  try {


    console.log(content);
    if (!content) {
      return { error: "Please fill the entire form" };
    }


    const postsResult = await db.insert(posts).values({ userId, content }).returning();

  } catch (err) {
    return { error: "user unable to log in" }
  }
    console.log("Post successfully made")
    revalidatePath("/")
    redirect("/")
}


export async function createUser(name: string, image: string) {


  const userAlreadyInDB = await db.select()
    .from(user)
    .where(eq(user.name, name))
    .then((res) => res[0])

  if (userAlreadyInDB) {
    return "Sorry this name is taken"
  }

  let result = await db.insert(user).values({ name: name, image: image, }).returning().run()

  cookies().set("user_name", name);
  cookies().set("user_name_id", JSON.stringify(result.rows[0].id));

  let signedUser = {
    id: result.rows[0].id,
    name: result.rows[0].username,
    image: result.rows[0].firstName,
  };

  console.log({ signedUser });

  return {
    success: "Signed up user successfully",
    user: signedUser
  }
}

export async function login(name: string) {
  try {
    let currentUser = await db.select()
      .from(user)
      .where(eq(user.name, name))
      .then((res) => res[0])

    if (currentUser) {

      cookies().set("user_name", name);
      cookies().set("user_id", JSON.stringify(currentUser.id));


      return { "success": "user log in" }
    } else {
      throw new Error("Unable to log in")
    }
  } catch (err) {
    return { "failure": "user unable to log in" }
  }
}
