import FeedPost from "@/components/feed-post"

export default async function Home() {
  const posts = [
    {
      id: "1",
      user: {
        id: "1",
        name: "John Doe",
        image: "https://www.gravatar.com/avatar/?d=mp",
      },
      createdAt: "2021-09-01T12:00:00.000Z",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      id: "2",
      user: {
        id: "1",
        name: "John Doe",
        image: "https://www.gravatar.com/avatar/?d=mp",
      },
      createdAt: "2021-09-01T12:00:00.000Z",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      id: "2",
      user: {
        id: "1",
        name: "John Doe",
        image: "https://www.gravatar.com/avatar/?d=mp",
      },
      createdAt: "2021-09-01T12:00:00.000Z",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  )
}
