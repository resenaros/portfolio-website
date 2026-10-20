// src/app/(marketing)/projects/project-card.tsx
"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { SiGithub } from "react-icons/si";

interface ProjectCardProps {
    project: Project;
    className?: string;
}

const SLIDE_DURATION_MS = 3000; // 3 seconds

function Slideshow({ images, alt }: { images: string[]; alt:  string }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev +1) % images.length);
        }, SLIDE_DURATION_MS);
            return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative h-full w-full overflow-hidden">
            {images.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    key={src}
                    src={src}
                    alt={`${alt} screenshot ${i + 1}`}
                    className={cn(
                        "absolute inset-0 h-full w-full object-contain p-6 transition-opacity duration-500",
                        i === index ? "opacity-100" : "opacity-0"
                    )}
                />
            ))}
        </div>
    );
}

export function ProjectCard({ project, className }: ProjectCardProps) {
    const liveUrl = project.links?.live;
    const githubUrl = project.links?.github;
    const docsUrl =project.links?.docs;
    const hasScreenshots = (project.screenshots?.length ?? 0) > 0;

    return (
        <article
            className={cn(
                "flex flex-col justify-between rounded-lg border bg-card p-5 shadow-sm transition", 
                "hover:translate-y-0.5 hover:shadow-md",
                className
            )}
        >
            {/* Tier 1: Auto-advancing screenshot slideshow (preferred when available) */}
            {hasScreenshots && (
                <div className="relative h-48 overflow-hidden rounded-t-lg border-b bg-muted">
                    <Slideshow images={project.screenshots!} alt={project.name} />
                </div>
            )}

            {/* Tier 2: Static thumbnail (no screenshots, thumbnail available) */}
            {!hasScreenshots && project.thumbnail && (
                <div className="relative h-48 overflow-hidden rounded-t-lg border-b bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={project.thumbnail}
                        alt={`${project.name} preview`}
                        className="h-full w-full object-contain p-6"
                    />
                </div>
            )}

            {/* Tier 3: No preview available at all */}
            {!hasScreenshots && !project.thumbnail && liveUrl &&(
                <div className="relative flex h-48 items-center justify-center rounded-t-lg border-b bg-muted text-xs text-muted-foreground">
                    Preview not available. Click to visit the live site.
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
                            <SiGithub className="h-3.5 w-3.5"/>
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
