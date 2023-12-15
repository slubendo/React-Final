import Image from "next/image"
import Link from "next/link"

import timeAgoShort from "@/utils/timeAgoShort"

export default function SinglePost({
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
    <article className="flex flex-col gap-2 py-2">
      <div className="flex gap-4 items-start">
        <Link href={`/${post.user.id}`}>
          <div className="rounded-full h-10 w-10 overflow-hidden relative">
            <Image
              className="object-cover"
              src={post.user.image || "https://www.gravatar.com/avatar/?d=mp"}
              alt={post.user.name || "User image"}
              priority={true}
              fill={true}
            />
          </div>
        </Link>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between">
            <Link href={`/${post.user.id}`}>
              <div>{post.user.name}</div>
            </Link>
            <p className="dark:text-neutral-400 text-neutral-600">
              {timeAgoShort(new Date(post.createdAt))}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 pb-2">
        <p className="font-light">{post.content}</p>
      </div>
    </article>
  )
}
