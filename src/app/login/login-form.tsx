"use client"

import { useState } from "react"
import { login } from "../actions"
import { redirect } from 'next/navigation'


export default function LoginForm() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  setMessage("Sign in");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage("Logging in...");

    const loggedIn =  await login(name)

    if(loggedIn.success){
      setMessage("Logged in!");
       redirect(`/`)
    } else {
      setMessage(loggedIn.failure || "Something went wrong");
    }
    console.log("login", name)
    setMessage("Logged in...");

  }

  setMessage("Sign in in");
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {message}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
