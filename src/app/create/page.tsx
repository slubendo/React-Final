import CreatePostForm from "@/app/create/create-post-form"

export default async function Create() {
  // Hard coded user for now
  // TODO: get user id from cookie and query the database for the user
  const user = {
    id: "user-1",
    name: "John Doe",
    image: "https://www.gravatar.com/avatar/?d=mp",
  }

  return <CreatePostForm user={user} />
}
