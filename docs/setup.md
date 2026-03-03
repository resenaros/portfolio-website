curl -fsSL https://bun.sh/install | bash

follow prompts sourced from the installation script

bun --version to check

gh cli- to do everything via cli and avoid using the github website

gh auth status -check if logged in if not run the following command
gh auth login -follow the prompts to log in
gh repo create portfolio-website --public

git remote add origin https://github.com/<your-username>/portfolio-website.git
git branch -M main   # ensures your main branch is named 'main'
git push -u origin main

bunx create-next-app@latest .   --typescript   --eslint   --src-dir   --app   --tailwind   --import-alias "@/*"
bunx next telemetry disable
bunx next telemetry status
bun install
bun dev

alternative to npm audit:
uv tool install semgrep-global install

semgrep --config p/owasp-top-ten --config p/javascript --config p/typescript .

or 

bun run lint:security- has been setup via the package.json scripts.

create semgrep account when doing github actions


# Use this exact sequence in WSL

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
ls

# You should now see a file named "gitleaks" in /tmp

# 5) Move the binary into your PATH
sudo mv gitleaks /usr/local/bin/

# 6) Sanity check – confirm install worked
gitleaks version


# secrets
bun run scan:secrets          # full repo scan
bun run scan:secrets:staged   # only staged changes (pre-commit style)

# vulns
bun run scan:vulns            # HIGH/CRITICAL only
bun run scan:vulns:all        # all severities

# semgrep (already configured)
bun run lint:security