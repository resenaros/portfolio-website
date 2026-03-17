// src/app/page.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const heroVariants = {
  hidden: { opacity:0, y:24},
  visible: { opacity:1, y:0}, 
};

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center">
      
      <div className="flex flex-col gap-10">
        <motion.section
         initial="hidden"
         animate="visible"
         variants={heroVariants}
         transition={{ duration: 0.6, ease: "easeOut"}}
         className="space-y-6"
         >

          <p className="text-sm font-medium tracking-tight text-emerald-500">
            Software Engineer - Security-focused - AI-enabled
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Building secure, modern web applications
            <br className="hidden sm:block" />
            <span className="text-foreground/80"> with Next.js and FastAPI.</span>
          </h1>

          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            I design and ship full-stack systems with a focus on security, observability, and developer
            experience—from responsive React frontends to FastAPI backends, CI pipelines, and containerized deployments.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className={cn(
                "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5",
                "text-sm font-medium text-background shadow-sm transition hover:bg-foreground/90"
              )}
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5",
                "text-sm font-medium text-foreground/80 transition hover:border-foreground/40 hover:text-foreground"
              )}
              >
                Contact Me
                <Mail className="h-4 w-4" />
            </Link>
          </div>

         </motion.section>

         <section className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="rounded-full border border-border px-2 py-1">
            Next.js - Typescript - Tailwind - shadcn/ui
          </span>
          <span className="rounded-full border border-border px-2 py-1">
            FastAPI - PostgreSQL - Redis - Docker
          </span>
          <span className="rounded-full border border-border px-2 py-1">
            Semgrep - Gitleaks - Trivy - Github Actions
          </span>
          <span className="rounded-full border border-border px-2 py-1">
            LLMs - LangChain - Vector DBs - Prompt Engineering
          </span>
         </section>
      </div>
    </div>
  );
}
