// src/app/(marketing)/contact/page.tsx
import Link from "next/link";
import { Mail, FileText } from "lucide-react";
import { SiGithub } from "react-icons/si";

const contactLinks = [
    {
        href: "mailto:you@resenaros.dev",
        icon: Mail,
        label: "Email",
        description: "The fastest way to reach me.",
    },
    {
        href: "https://github.com/resenaros",
        icon: SiGithub,
        label: "GitHub",
        description: "Source code, projects, and contributions.",
    },
    {
        href: "/resume.pdf",
        icon: FileText,
        label: "Resume",
        description: "Download my current resume (PDF)."
    }
];

export default function ContactPage() {
    return (
        <main className="mx-auto max-w-2xl space-y-8 py-12">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Contact</h1>
                <p className="text-muted-foreground">
                     I&apos;m open to full-stack, backend, and security-focused
                    engineering roles. Reach out through any of the channels below.
                </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                {contactLinks.map(({ label, href, icon: Icon, description }) => (
                    <Link
                        key={label}
                        href={href}
                        target={href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="group flex flex-col gap-2 rounded-lg border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                            <div className="flex items-center gap-2">
                                <Icon className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                                <span className="font-medium">{label}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{description}</p>
                        </Link>
                ))}
            </div>
        </main>
    );
}