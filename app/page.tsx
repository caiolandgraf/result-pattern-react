import UserRegistration from "@/examples/user-registration"

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Exemplo do Result Pattern</h1>
        <UserRegistration />
      </div>
    </main>
  )
}

