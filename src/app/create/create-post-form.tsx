"use client"

import Image from "next/image"
import { useState } from "react"
import { User } from "@/db/schema/user"
import { createPost } from "../actions"

export default function CreatePostForm({user}: {user: User}) {
  const [content, setContent] = useState("")
  const [message, setMessage] = useState("")
  setMessage("Post");


  const buttonDisabled = content.length <= 3 || status === "executing"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let submitButton = document.getElementById('button') as HTMLButtonElement | null;
    if(submitButton){
            submitButton.classList.add("opacity-50 cursor-not-allowed")
    }
    setMessage("Loading...");

    const postMade = await createPost(user.id, content)
    if (!postMade.error) {
      setMessage("Logged in!");
    } else {
      alert(postMade.error || "Something went wrong");
    }
    console.log("post", name)
  }
  setMessage("Post");

  return (
    <form className="border border-neutral-500 rounded-lg px-6 py-4" onSubmit={handleSubmit}>
      <div className="flex gap-4 items-start pb-4">
        <div className="rounded-full h-12 w-12 overflow-hidden relative">
          <Image
            className="object-cover"
            src={user.image || "https://www.gravatar.com/avatar/?d=mp"}
            alt={user.name || "user profile picture"}
            priority={true}
            fill={true}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div>{user.name}</div>

          <label className="w-full">
            <input
              className="bg-transparent flex-1 border-none outline-none"
              name="content"
              type="text"
              placeholder="Post a thing..."
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5">
        <div className="text-neutral-500">Characters: {content.length}</div>
        <button
          type="submit"
          id="button"
          className={
            "border rounded-xl px-4 py-2 disabled"
          }
          disabled={buttonDisabled}
          aria-disabled={buttonDisabled}
        >
          {message}
        </button>
      </div>
    </form>
  )
}
