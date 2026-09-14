// src/app/(marketing)/projects/project-card.tsx
"use client";

import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    project: Project;
    className?: string;
}

// Platforms that support iframe embedding
function getEmbedUrl (url: string): string | null {
    try {
        const { hostname, pathname } = new URL(url);
        
        // Hugging Face Spaces - embed via /embed/ path 
        if (hostname === "huggingface.co" && pathname.includes("/spaces/")) {
            const separator = url.includes("?") ? "&" : "?";
            return `${url}${separator}embed=true`;
        }

        // Vercel / Netlify / custom domains - try direct embed
        if (
            hostname.endsWith(".vercel.app") ||
            hostname.endsWith(".netlify.app") ||
            (!hostname.includes("github.com") && !hostname.includes("huggingface.co"))
        ) {
            return url;
        }

        // GitHub repos don't support iframe embedding
        return null;
    } catch {
        return null;
    }
}
export function ProjectCard({ project, className }: ProjectCardProps) {
    const [previewError, setPreviewError] = useState(false);
    const [previewLoaded, setPreviewLoaded] = useState(false);
    const liveUrl = project.links?.live;
    const githubUrl = project.links?.github;
    const docsUrl =project.links?.docs;
    const embedUrl = liveUrl ? getEmbedUrl(liveUrl) : null;
    const showPreview = embedUrl && !previewError;

    useEffect (() => {
        if (!showPreview) return;
        const timer = setTimeout(() => {
            if (!previewLoaded) setPreviewError(true);
        }, 4000);
        return () => clearTimeout(timer);
    }, [showPreview, previewLoaded]);

    return (
        <article
            className={cn(
                "flex flex-col justify-between rounded-lg border bg-card p-5 shadow-sm transition", 
                "hover:translate-y-0.5 hover:shadow-md",
                className
            )}
        >
            {/* Live preview iframe */}
            {showPreview && (
                <div className="relative w-full overflow-hidden rounded-t-lg border-b bg-muted" style={{ height: "200px" }}>
                    <iframe
                        src={embedUrl}
                        title={`${project.name} live preview`}
                        className="h-full w-full"
                        loading="lazy"
                        sandbox="allow-scripts allow-forms"
                        onLoad={() => setPreviewLoaded(true)}
                        onError={() => setPreviewError(true)}
                        />
                    {/* Overlay - clicking the preview opens the live site */}
                    <Link
                        href={liveUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-10 cursor-pointer"
                        aria-label={`Open ${project.name} live site`}
                        />
                </div>
            )}

            {/* No preview available - show a placeholder */}
            {!showPreview && liveUrl && (
                <div className="relative h-32 overflow-hidden rounded-t-lg border-b bg-muted">
                    {project.thumbnail ? (
                        <img
                            src={project.thumbnail}
                            alt={`${project.name} preview`}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                    Preview not available. Click to visit the live site.
                        </div> 
                )}
                </div>
            )}

            {/* Card body */}
            <div className="space-y-3">
                <header className="flex items-start justify-between gap-2">
                    <div>
                        <h2 className="text-lg font-semibold tracking-tight">
                            {project.name}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            {project.role} - {project.year}
                        </p>
                    </div>
                </header>

                <p className="text-sm text-muted-foreground">{project.description}</p>
                
                <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Links row */}

            {project.links && (
                <div className="flex items-center gap-3 pt-1">
                    {githubUrl && (
                        <Link
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
                        >
                            <Github className="h-3.5 w-3.5"/>
                            Source
                            </Link>
                    )}
                    {liveUrl && (
                        <Link
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                Live
                            </Link>
                    )}
                    {docsUrl && (
                        <Link
                            href={docsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
                            >
                                <ArrowUpRight className="h-3.5 w-3.5"/>
                                Docs
                            </Link>
                    )}
                </div>
            )}
        </article>
    );
}
