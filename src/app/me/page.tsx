import Profile from "./profile"
import { redirect } from "next/navigation"
import { cookies } from "next/headers";
import FeedPost from "@/components/feed-post"
import { userQuery } from "@/db/queries/user-query";

export default async function ProfilePage() {
  // Hard coded user for now
  // TODO: get user id from cookie and query the database for the user
  const fakeUser = {
    id: "user-1",
    name: "John Doe",
    image: "https://www.gravatar.com/avatar/?d=mp",
  }

  const posts = [
    {
      id: "1",
      fakeUser,
      createdAt: "2021-09-01T12:00:00.000Z",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      id: "2",
      fakeUser,
      createdAt: "2021-09-01T12:00:00.000Z",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
  ]

  try{
    const userId = cookies().get("user_id")?.value ?? "0"
    let user = await userQuery(parseInt(userId))
    
    if (!user) {
      redirect("/login")
    }
  } catch (err) {
    return { "error": "Error loading feed" }
  }

  return (
    <>
      <Profile user={fakeUser} />
      <div className="mt-7">
        <div className="w-full border-b mb-5">
          <div className="mb-2">Posts</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {posts?.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}
