import CreatePostForm from "@/app/create/create-post-form"
import { userQuery } from "@/db/queries/user-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"


export default async function Create() {

  try{
    const userId = cookies().get("user_id")?.value ?? "0"
    let user = await userQuery(parseInt(userId))
  
    if (!user) {
      redirect("/login")
    }
    
  } catch (err) {
    return { "error": "Error loading feed" }
  }


  const fakeUser = {
    id: 1,
    name: "John Doe",
    image: "https://www.gravatar.com/avatar/?d=mp",
  }

  return (
    <CreatePostForm user={fakeUser}>
    </CreatePostForm>
  )
}
