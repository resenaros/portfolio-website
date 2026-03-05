# Portfolio Frontend Setup (WSL + Bun + Next.js + Security)

## 1. Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
# follow prompts sourced from the installation script
# reload shell (or open a new WSL session), then:
bun --version   # verify install
```

---

## 2. GitHub CLI & Repo Setup

```bash
# Check GitHub CLI auth
gh auth status   # check if logged in

# If not logged in:
gh auth login    # follow the prompts to log in

# Create repo (adjust name if needed)
gh repo create portfolio-website --public
```

If you created the repo in the browser instead, add the remote manually:

```bash
git remote add origin https://github.com/<your-username>/portfolio-website.git
git branch -M main   # ensures your main branch is named 'main'
git push -u origin main
```

---

## 3. Initialize Next.js App (Bun, TS, Tailwind, App Router)

```bash
bunx create-next-app@latest . \
  --typescript \
  --eslint \
  --src-dir \
  --app \
  --tailwind \
  --import-alias "@/*"

# Disable Next.js telemetry
bunx next telemetry disable
bunx next telemetry status

# Install dependencies and run dev server
bun install
bun dev
```

---

## 4. Security Tooling (Semgrep via uv, Gitleaks, Trivy)

### 4.1 Semgrep (alternative to `npm audit`)

```bash
# Install Semgrep globally via uv (once per machine)
uv tool install semgrep

# One-off run
semgrep --config p/owasp-top-ten --config p/javascript --config p/typescript .

# Or use package.json script:
bun run lint:security   # already configured in package.json
```

> Create a Semgrep account when wiring this into GitHub Actions.

---

### 4.2 Gitleaks (WSL install)

Use this exact sequence in WSL:

```bash
cd /tmp

# 1) Download the Linux x64 tarball for v8.30.0
curl -L -o gitleaks.tar.gz \
  https://github.com/gitleaks/gitleaks/releases/download/v8.30.0/gitleaks_8.30.0_linux_x64.tar.gz

# 2) Confirm it's really a gzip archive
file gitleaks.tar.gz

# You should see something like:
# gitleaks.tar.gz: gzip compressed data, ...

# 3) Extract the archive
tar -xzf gitleaks.tar.gz

# 4) Verify the binary is there
ls   # you should now see a file named "gitleaks"

# 5) Move the binary into your PATH
sudo mv gitleaks /usr/local/bin/

# 6) Sanity check – confirm install worked
gitleaks version
```

Scripts (from package.json):

```bash
# secrets
bun run scan:secrets          # full repo scan
bun run scan:secrets:staged   # only staged changes (pre-commit style)

# vulns
bun run scan:vulns            # HIGH/CRITICAL only
bun run scan:vulns:all        # all severities

# semgrep (already configured)
bun run lint:security
```

---

## Frontend Stack Libraries (UI, Animations, Data Fetching)

Run these inside the project directory (WSL):

# UI / shadcn dependencies
bun add tailwind-merge class-variance-authority @radix-ui/react-slot

# shadcn CLI (current version; replaces older shadcn-ui CLI)
bun add -d shadcn

# Icons
bun add lucide-react @heroicons/react

# Animations
bun add framer-motion

# TanStack Query + Devtools
bun add @tanstack/react-query @tanstack/react-query-devtools
```

---

## 6. Initialize shadcn UI and Add Base Component

```bash
# Initialize shadcn (configures it for this Next.js project)
bunx shadcn@latest init

# Add a base Button component (smoke test + future reuse)
bunx shadcn@latest add button
```