// src/app/(marketing)/about/page.tsx

import {Briefcase, Code2, GraduationCap, History } from "lucide-react";

const skillGroups =[
    {
        title: "Languages",
        skills: ["Python", "TypeScript", "JavaScript", "Java", "Bash"],
    },
    {
        title: "AI & Data",
        skills: ["LangChain", "Chroma", "RAG Pipelines", "Ollama", "Hugging Face"],
    },
    {
        title: "Backend",
        skills: ["Flask", "Marshmallow", "SQLAlchemy", "Swagger/OpenAPI"],
    },
    {
        title: "Databases",
        skills: ["PostgreSQL", "MySQL", "Redis"],
    },
    {
        title: "Security",
        skills: ["Auth0", "JWT", "OWASP ZAP", "Semgrep", "gitleaks", "Trivy"],
    },
    {
        title: "Frontend",
        skills: ["React", "Next.js", "Tanstack Query", "Tailwind CSS", "Shadcn/ui"],
    },
    {
        title: "DevOps",
        skills: ["Docker", "GitHub Actions", "Vercel", "Render"],
    },
    {
        title: "Testing",
        skills: ["pytest", "Jest", "React Testing Library"],
    },
];

const projects = [
    {
        title: "Secure Bank AI - Digital Finance Tracker",
        description:
            `An AI-assisted finance tracker built during my Tech Residency, centralizing income, 
            expenses, and e-wallet balances with automated transaction categorization and a real-time dashboard. 
            I primarily built backend integrations with Flask and Flask-SQLAlchemy, and secondarily 
            supported security practices including Auth0/JWT authentication and OWASP-informed testing, 
            plus hands-on exposure to Docker for environment parity. Delivered in an Agile team with 
            CI/CD to staging.`,
    },
    {
        title: "Patristics RAG Agent",
        description: 
                `A retrieval-augmented generation agent using LangChain and Chroma, containerized and deployed
                to Hugging Face Spaces with full CI/CD.`,
    },
    {
        title: "Mechanic Shop API",
        description: 
                `A RESTful Flask API with JWT authentication and Swagger documentation, 
                deployed to Render via GitHub Actions.`,
    },
    {
        title: "Advanced E-Commerce App",
        description: 
                `A React/TypeScript app with Firebase auth, Redux Toolkit, and Tanstack Query, 
                tested with Jest and deployed to Vercel.`,
    },
];

export default function AboutPage() {
    return (
        <main className="mx-auto max-w-2xl space-y-16 py-12">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">About</h1>
                <p className="text-muted-foreground">
                    I&apos;m a full-stack engineer with a backend focus, 
                    specializing in Python (Flask). I build REST APIs 
                    backed by relational databases like PostgreSQL and MySQL, and
                    I&apos;m increasingly focused on integrating AI/RAG tooling 
                    - LangChain, vector databases, and local LLMs - into real applications.
                    This portfolio site itself is where I&apos;m building out my frontend depth, working with Next.js,
                    Tailwind CSS, shadcn/ui, and Radix UI to build fast, accessible and responsive interfaces.
                </p>
            </div>

            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400"/>
                    <h2 className="text-lg font-semibold">Skills</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    {skillGroups.map(({ title, skills }) => (
                        <div
                            key={title}
                            className="rounded-lg border bg-card p-4 shadow-sm"
                        >
                            <h3 className="font-medium">{title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {skills.join(", ")}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-emerald-500 dark:text-emerald-400"/>
                    <h2 className="text-lg font-semibold">Featured Projects</h2>
                </div>
                <div className="grid gap-4">
                    {projects.map(({ title, description }) => (
                        <div
                            key={title}
                            className="rounded-lg border bg-card p-4 shadow-sm"
                        >
                            <h3 className="font-medium">{title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <History className="h-5 w-5 text-emerald-500 dark:text-emerald-400"/>
                    <h2 className="text-lg font-semibold">Experience</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                    Most recently, I completed a competitive Tech Residency at Coding Temple,
                    where I helped build Secure Bank AI, an AI-assisted digital finance tracker
                    that centralizes income, expenses, and e-wallet balances into a unified dashboard.
                    I primarily supported backend-integration - building REST APIs with Flask and 
                    Flask-SQLAlchemy, implementing Auth0/JWT authentication, and applying OWASP-informed 
                    security practices - while also getting hands-on exposure to Docker for environment parity
                    and deployment. We delivered in short sprints with a security first mindset, shipping a
                    demo-ready, AI-categorized transaction system with real-time dashboard insights. Before that,
                    I spent several years leading safety, theft, and fraud related investigations and implementing 
                    a data-driven/business oriented asset protection strategy at Gap Inc. - work that sharpened my 
                    analytical thinking and comfort working cross-functionally, skills I now bring to backend and AI engineering.
                </p>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-emerald-500 dark:text-emerald-400"/>
                    <h2 className="text-lg font-semibold">Education</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                    Certificate, Software Engineering - Coding Temple
                    <br/>
                    B.A. Psychology, Minor in French - California State University San Marcos
                </p>
            </section>
        </main>
    );
}