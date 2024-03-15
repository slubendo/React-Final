import Profile from "./profile"
import { redirect } from "next/navigation"
import { cookies } from "next/headers";
import FeedPost from "@/components/feed-post"
import { userQuery } from "@/db/queries/user-query";
import { userFeed } from "@/db/queries/user-feed-query";

export default async function ProfilePage() {

  // const fakeUser = {
  //   id: "user-1",
  //   name: "John Doe",
  //   image: "https://www.gravatar.com/avatar/?d=mp",
  // }

  // const posts = [
  //   {
  //     id: "1",
  //     fakeUser,
  //     createdAt: "2021-09-01T12:00:00.000Z",
  //     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  //   },
  //   {
  //     id: "2",
  //     fakeUser,
  //     createdAt: "2021-09-01T12:00:00.000Z",
  //     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  //   },
  // ]

  let user
  let feed
  try {
    const userId = cookies().get("user_id")?.value ?? "0"
    user = await userQuery(parseInt(userId))
    feed = await userFeed(parseInt(userId))

    if (!user) {
      redirect("/login")
    }
  } catch (err) {
    return { "error": "Error loading feed" }
  }

  if (user.info) {
    return (
      <>
        <Profile user={user.info} />
        <div className="mt-7">
          <div className="w-full border-b mb-5">
            <div className="mb-2">Posts</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {feed.usrPosts?.map((post) => (
              <FeedPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </>
    )

  }

}