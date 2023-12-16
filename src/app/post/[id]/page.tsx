import SinglePost from "@/components/single-post"
import { postQuery } from "@/db/queries/post-query"

import { notFound } from "next/navigation"


export default async function Post({ params }: { params: { id: string } }) {

  // fake post
  // const fakePost = {
  //   id: "1",
  //   user: {
  //     id: "1",
  //     name: "John Doe",
  //     image: "https://www.gravatar.com/avatar/?d=mp",
  //   },
  //   createdAt: "2021-09-01T12:00:00.000Z",
  //   content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  // }
  let post;
  try {
    post = await postQuery(parseInt(params.id))

    if (!post) {
      notFound()
    }
  } catch (err) {
    return { "error": "Error loading feed" }
  }


  if (post.singlePost) {
    return (
      <div className="flex flex-col divide-y">
        <SinglePost post={post.singlePost} />
      </div>
    )
  } else {
    notFound()
  }
}