// src/data/projects.ts
export type Project = {
    slug: string;
    name: string;
    description: string;
    tech: string[];
    role: string;
    year: string;
    thumbnail?: string;
    links?: {
        github?: string;
        live?: string;
        docs?: string;
    };
};

export const projects: Project[] = [
    {
        slug: "portfolio-platform",
        name: "Portfolio Platform (Full-Stack)",
        description:
            `End-to-end portfolio platform with a Next.js frontend, FastAPI backend, and a secure 
            infrastructure stack on AWS. Includes CI/CD, Observability, and OWASP-aligned security tooling.`,
        tech: ["Next.js", "Typescript", "Tailwind", "Shadcn/ui", "FastAPI", "PostgreSQL", "Docker", "AWS"],
        role: "Full-stack engineer",
        year: "2026",
        thumbnail: "/vercel.svg", /*placeholder image*/
        links: {
            github: "https://github.com/resenaros/portfolio-website",
        },
    },
    {
        slug: "llm-rag-api",
        name: "LLM RAG API for Portfolio Content",
        description: `Retrieval-augmented generation (RAG) API that 
        indexes portfolio docs and project READMEs to answer questions with citations. Built with FastAPI, and LangChain`,
        tech: ["FastAPI", "LangChain", "Chromadb", "HuggingFace"],
        role: "Backend / ML engineer",
        year: "2026"
    },
    {
        slug: "security-automation",
        name: "Security Automation Pipeline",
        description: `Github Actions pipeline that runs Semgrep, Gitleaks, Trivy, and CodeQL
        on every push. Enforces branch protection and status checks for production branches.`,
        tech: ["Github Actions", "Semgrep", "Gitleaks", "Trivy", "CodeQL"],
        role: "DevSecOps Engineer",
        year: "2025"
    },
    {
  slug: "my-patristics-rag",
  name: "Patristics RAG Agent",
  description:
    "Production-style Retrieval-Augmented Generation (RAG) system for Patristics content, with local-first LLM inference via Ollama, semantic retrieval via Chroma, and a Gradio UI deployed on Hugging Face Spaces using Docker.",
  tech: [
    "Python",
    "Gradio",
    "Ollama",
    "Chroma",
    "LangChain",
    "uv",
    "Docker",
    "Hugging Face Spaces",
    "pandas",
    "GitHub Actions",
    "pip-audit"
  ],
  role: "AI/ML Engineer",
  year: "2026",
  thumbnail: "/globe.svg", /*placeholder image*/
  links: {
    github: "https://github.com/resenaros/my-patristics-rag",
    live: "https://huggingface.co/spaces/ara967/patristics-rag-agent-demo"
  }
},
]