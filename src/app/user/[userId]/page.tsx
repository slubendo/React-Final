import FeedPost from "@/components/feed-post"
import { notFound } from "next/navigation"

import Profile from "./profile"

export default async function ProfilePage({ params }: { params: { userId: string } }) {
  const user = {
    id: "1",
    name: "John Doe",
    image: "https://www.gravatar.com/avatar/?d=mp"
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
    notFound()
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
