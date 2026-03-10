// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers"

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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}