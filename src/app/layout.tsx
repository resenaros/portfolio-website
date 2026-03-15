// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers"
import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"; 

export const metadata: Metadata = {
  title: "Software Engineer Portfolio",
  description: "Full-stack software engineer specializing in Python (Flask), Node.js, and React applications. Experienced in RESTful APIs, SQL databases, Dockerized deployments, and end-to-end testing. Showcasing hands-on projects in backend, frontend, CI/CD, DevOps, and applied AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SiteHeader />
          <main className={cn("mx-auto min-h-[calc(100vh-4rem)] max-w-5xl",
          "px-4 py-8 sm:px-6 lg:px-8")}>
          {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}