import Profile from "./profile"
import { redirect } from "next/navigation"
import FeedPost from "@/components/feed-post"

export default async function ProfilePage() {
  // Hard coded user for now
  // TODO: get user id from cookie and query the database for the user
  const user = {
    id: "user-1",
    name: "John Doe",
    image: "https://www.gravatar.com/avatar/?d=mp",
  }

  const posts = [
    {
      id: "1",
      user,
      createdAt: "2021-09-01T12:00:00.000Z",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      id: "2",
      user,
      createdAt: "2021-09-01T12:00:00.000Z",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
  ]

  if (!user) {
    redirect("/login")
  }

  return (
    <>
      <Profile user={user} />
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
