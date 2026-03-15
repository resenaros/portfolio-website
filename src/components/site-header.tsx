// src/components/site-header.tsx
"use client";

import Link from "next/link";
import { MainNav } from "./main-nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
    return (
        <header className="border-b bg-background/80 backdrop-blur">
            <div className={cn("mx-auto flex h-16 max-w-5xl items-center justify-between",
                "px-4 sm:px-6 lg:px-8")}>
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-base font-semibold tracking-tight">
                        resenaros.dev
                        </span>
                </Link>
                <MainNav />
            </div>
        </header>
    );
}

