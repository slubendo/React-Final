import CreatePostForm from "@/app/create/create-post-form"
import { userQuery } from "@/db/queries/user-query";
import { user } from "@/db/schema/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"


export default async function Create() {

  let user;
  try{
    const userId = cookies().get("user_id")?.value ?? "0"
    user = await userQuery(parseInt(userId))
  
    if (!user) {
      redirect("/login")
    }
    
  } catch (err) {
    return { "error": "Error loading feed" }
  }


if(user.info){

  return (
    <CreatePostForm user={user.info}>
    </CreatePostForm>
  )
}
}
