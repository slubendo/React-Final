export default function LoginPage() {
  return (
    <form action="search">
      <label className="w-full border border-neutral-500 rounded-lg px-6 py-4 flex justify-center gap-4">
        <input
          className="bg-transparent flex-1 border-none outline-none"
          name="q"
          type="text"
          placeholder="Username"
        />
      </label>

      <button type="submit" className="border rounded-xl px-4 py-2 mt-5">
        Login
      </button>
    </form>
  )
}
