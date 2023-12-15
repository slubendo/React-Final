import Image from "next/image"
import Link from "next/link"

export default function FeedPost({
  post,
}: {
  post: {
    user: {
      id: string
      name: string
      image: string
    }
    id: string
    createdAt: string
    content: string
  }
}) {
  return (
    <article className="flex flex-col gap-4 py-4 relative rounded-lg border p-4 border-neutral-500 hover:border-neutral-200">
      <div className="flex gap-4 items-start max-w-full overflow-hidden">
        <Link href={`/${post.user.id}`}>
          <div className="rounded-full h-10 w-10 overflow-hidden relative">
            <Image
              className="object-cover"
              src={post.user.image || "https://www.gravatar.com/avatar/?d=mp"}
              alt={post.user.name || "user image"}
              priority={true}
              fill={true}
            />
          </div>
        </Link>
        <div className="flex flex-col gap-2 max-w-full overflow-hidden">
          <div className="flex justify-between w-full">
            <Link href={`/user/${post.user.id}`}>
              <div>{post.user.name}</div>
            </Link>
          </div>
          <Link href={`/post/${post.id}`} className="max-w-full">
            <p className="font-light truncate overflow-hidden whitespace-nowrap max-w-full">{post.content}</p>
          </Link>
        </div>
      </div>
    </article>
  )
}
