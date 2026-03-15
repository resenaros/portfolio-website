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

These tools are optional but recommended for local and CI security checks (code, secrets, and filesystem vulnerabilities).

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
### 4.3 Trivy (WSL install – filesystem and container vulnerability scanning)

Trivy is installed via `snap` inside WSL.

```bash
# Install Trivy via snap (Ubuntu / WSL)
sudo snap install trivy

# Sanity check – confirm install worked
trivy --version
```

Scripts (from package.json):

> These scripts assume `semgrep`, `gitleaks`, and `trivy` are installed and available on your PATH as described above.

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

### UI / shadcn dependencies
bun add tailwind-merge class-variance-authority @radix-ui/react-slot

### shadcn CLI (current version; replaces older shadcn-ui CLI)
bun add -d shadcn

### Icons
bun add lucide-react @heroicons/react

### Animations
bun add framer-motion

### TanStack Query + Devtools
bun add @tanstack/react-query @tanstack/react-query-devtools
```

```
---

## 6. Initialize shadcn UI and Add Base Component

```bash
# Initialize shadcn (configures it for this Next.js project)
bunx shadcn@latest init

# Add a base Button component (smoke test + future reuse)
bunx shadcn@latest add button
```

## 7. GitHub Security & Advanced Security Configuration

> These steps are done once per repo in the GitHub UI. They are documented here so you can reproduce them for new projects.

### 7.1 Code security and analysis (Settings → Code security and analysis)

For the `portfolio-website` (or `portfolio-frontend`) repository, enable:

- **Private vulnerability reporting:** `On`  
  - Allows security issues to be reported privately to you instead of via public issues.

- **Dependency graph:** `On`  
  - Required for dependency insights and Dependabot.

- **Automatic dependency submission:** `On`  
  - Lets GitHub detect build-time dependencies and keep the dependency graph up to date.

- **Dependabot alerts:** `On`  
  - Receive alerts for vulnerable dependencies.

- **Dependabot security updates:** `On`  
  - Dependabot automatically opens PRs to fix vulnerabilities when patches are available.

- **Grouped security updates:** `On`  
  - Groups multiple security updates into a single PR per ecosystem/directory.

- **Dependabot version updates:** `Off` (initially)  
  - Optional: enable later if you want routine version bumps in addition to security fixes.

- **Code scanning (CodeQL analysis):** `On` (default setup)  
  - Enables static analysis for common vulnerabilities and coding errors in the repo.

- **Copilot Autofix:** `Off` (for now)  
  - Optional feature that suggests fixes for CodeQL alerts using AI.  
  - Left disabled initially to avoid extra Copilot usage/credits.

- **Push protection (Secret Protection):** `On`  
  - Blocks pushes that contain supported secrets (API keys, tokens, etc.).

---

### 7.2 Notes

- These settings are configured via the **GitHub web UI**, not via CLI:
  - Navigate to: `Repository → Settings → Code security and analysis`.

## 8. GitHub Branch Protection / Ruleset for `main`

> Configure once per repo via **Settings → Rules → Rulesets**. This documents the protections applied to the `main` branch.

### 8.1 Create a branch ruleset for `main`

1. Go to the repository on GitHub.
2. Navigate to: **Settings → Rules → Rulesets → New branch ruleset**.
3. Configure:

- **Ruleset Name**: `main`
- **Enforcement status**: `Active` (or `Enforced`)
- **Bypass list**: leave empty (no bypass roles needed as a solo dev).

### 8.2 Target branches

Under **Target branches**:

- Click **Add target → Include by pattern**.
- Enter the pattern:

  ```text
  main
  ```

- Save/confirm so the ruleset targets only the `main` branch.

### 8.3 Branch rules

Enable the following:

- [x] **Restrict deletions**  
  - Prevents `main` from being deleted unless bypassed.

- [x] **Require linear history**  
  - Disallows merge commits on `main`; use squash or rebase merges.

- [x] **Require a pull request before merging**  
  - All changes must go through a PR (no direct pushes to `main`).
  - Under **Required approvals**: set to `0`  
    - Allows self-merging without another reviewer.
  - Leave all additional review-related options **unchecked**:
    - Dismiss stale approvals, specific teams, Code Owners, etc.

- [x] **Require status checks to pass**  
  - Turn this on, but initially **no checks are selected**.
  - After the `CI` workflow exists and runs once:
    - Return here → **Add checks** → select the `CI` check to make it required.
  - Optional later: enable **Require branches to be up to date before merging** once a required check is configured.

- [x] **Block force pushes**  
  - Prevents `git push --force` to `main`.

Leave these **disabled** for now:

- [ ] Restrict creations  
- [ ] Restrict updates  
- [ ] Require deployments to succeed  
- [ ] Require signed commits  
- [ ] Require code scanning results  
- [ ] Require code quality results  
- [ ] Automatically request Copilot code review

### 8.4 Resulting workflow

With this ruleset:

- You **cannot** push directly to `main`.
- Normal flow:
  1. `git checkout -b feature/branch-name`
  2. Commit changes locally.
  3. `git push -u origin feature/branch-name`
  4. Open a PR `feature/branch-name → main`.
  5. Merge the PR yourself (no required approvals; status checks optional until configured).

This keeps `main` protected while still allowing fast solo development via branches and self-merged PRs.

## 9. CI Workflow Verification (GitHub Actions)

After pushing a branch with `.github/workflows/ci.yml`:

```bash
# List workflows for this repo (from local clone)
gh workflow list

```
---

## 10. Future Automation (Copasetic, Docker Scout, etc.)

- Goal: integrate tools like **Copasetic** to automatically generate and apply fixes for vulnerabilities found by:
  - Trivy (container / image scans)
  - Docker Scout (image / supply chain analysis)

Planned steps (later phase):

1. Extend CI to build container images for the portfolio frontend and/or backend.
2. Run Trivy and Docker Scout against those images in CI.
3. Evaluate Copasetic (or similar tools) to:
   - Parse Trivy / Docker Scout reports.
   - Propose or apply fixes via automated pull requests.
4. Add a separate GitHub Actions workflow (e.g., `security-fix.yml`) dedicated to running Copasetic.

# General pattern for creating a PR from a feature branch
# - Replace <branch-name>, <Title>, and <Body> as needed.

gh pr create \
  --base main \
  --head <branch-name> \
  --title "<Short, descriptive PR title>" \
  --body "<A few sentences describing what this PR changes and why.>"
