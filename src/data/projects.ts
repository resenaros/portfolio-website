// src/data/projects.ts
export type Project = {
    slug: string;
    name: string;
    description: string;
    tech: string[];
    role: string;
    year: string;
    thumbnail?: string;
    featured?: boolean;
    screenshots?: string[];
    links?: {
        github?: string;
        live?: string;
        docs?: string;
    };
};

export const projects: Project[] = [
    {
        slug: "secure-bank-ai",
        name: "Secure Bank AI - Digital Finance Tracker",
        description: 
            `AI-assisted finance tracker built during a Tech Residency, centralizing income, expenses,
            and e-wallet balances with automated transaction categorization and a real-time dashboard. 
            Primarily supported in backend integration with Flask and Flask-SQLAlchemy, 
            with secondary support on Auth0/JWT authentication, OWASP-informed security practices, and Docker.`,
        tech: ["Flask", "Flask-SQLAlchemy", "PostgreSQL", "Auth0", "OWASP ZAP", "Docker", "GitHub Actions",],
        role: "Backend Engineer",
        year: "2026",
        thumbnail: "/bank.png", // placeholder image
        featured: true,
        links: 
            {
                github: "https://github.com/E-Y-J/TR41-DIGITALFINANCE.git",
                live: "https://securebankai.vercel.app/",
            },
    },
    {
        slug: "my-patristics-rag",
        name: "Patristics RAG Agent",
        description:
            `Production-style Retrieval-Augmented Generation (RAG) system for Patristics content, with 
            local-first LLM inference via Ollama, semantic retrieval via Chroma, and a Gradio UI deployed on 
            Hugging Face Spaces using Docker.`,
        tech: 
        [
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
        featured: true,
        links: 
            {
                github: "https://github.com/resenaros/my-patristics-rag",
                live: "https://huggingface.co/spaces/ara967/patristics-rag-agent-demo"
            },
    },
    {
        slug: "mechanic-shop-api",
        name: "Mechanic Shop API",
        description:
            `A RESTful Flask API with  JWT authentication and Swagger documentation, deployed to Render via GitHub Actions`,
        tech: ["Flask", "JWT", "Swagger/OpenAPI", "SQLAlchemy", "GitHub Actions"],
        role: "Backend engineer",
        year: "2025",
        thumbnail: "/file.svg", /*placeholder image*/
        featured: true,
        links: 
            {
                github: "https://github.com/resenaros/mechanic_shop_proj.git",
            },
    },
    {
        slug: "advanced-ecommerce-app",
        name: "Advanced E-commerce App",
        description: 
            `A React/TypeScript app with Firebase auth, Redux Toolkit, and Tanstack Query`,
        tech: ["React", "TypeScript", "Firebase", "Redux Toolkit", "Tanstack Query"],
        role: "Frontend Engineer",
        year: "2025",
        thumbnail: "/window.svg", /*placeholder image*/
        featured: true,
        links: 
            {
                github: "https://github.com/resenaros/advanced-ecommerce-app.git",
            }
    },
    {
        slug: "task-manager-app",
        name: "Task Manager App",
        description: 
            `A task management app exploring React/Typescript fundamentals - component state, forms, and CRUD-style
            interactions in the browser.`,
        tech: ["React", "TypeScript"],
        role: "Frontend Engineer",
        year: "2025",
        thumbnail: "/next.svg",
        featured: true,
        links:
            {
                github: "https://github.com/resenaros/Task-Manager-App.git",
            }
    },
]