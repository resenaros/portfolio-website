// src/app/(marketing)/projects/page.tsx

import { ProjectCard } from "./project-card";
import {projects} from "@/data/projects";

export default function ProjectsPage() {
    return (
        <main className="mx-auto max-w-6xl p-4 md:p-6">
            <header className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
                <p className="text-sm text-muted-foreground">
                Selected engineering work and demos
                </p>
            </header>

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </section>
        </main>
    );
}