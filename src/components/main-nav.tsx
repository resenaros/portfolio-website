// src/components/main-nav.tsx
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
    {href: "/", label: "Home" },
    {href: "/about", label: "About"},
    {href: "/projects", label: "Projects"},
    {href: "/contact", label: "Contact"},
];

export function MainNav () {
    const pathname = usePathname();

    return (
        <nav className = "flex items-center gap-6 text-sm font-medium">
            {routes.map((route) => {
                const isActive =
                route.href === "/"
                 ? pathname === "/"
                 : pathname.startsWith(route.href);
                
                return (
                    <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        isActive ? "text-foreground" : "text-foreground/60"
                    )}
                    >
                        {route.label}
                    </Link>
                );
            })}
        </nav>
    );
}

