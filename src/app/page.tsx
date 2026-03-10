// src/app/page.tsx
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Welcome to My Portfolio</h1>
        <p className="text-muted-foreground">
          Showcasing hands-on projects in backend APIs, full-stack web apps, DevOps, and applied AI, using Python, Flask, Node.js, React, and modern cloud tools.
        </p>
        <button className="inline-flex items-center gap-2 rounded-md bg-black text-white px-4 py-2 text-sm">
          Get Started <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </main>
  )
}
