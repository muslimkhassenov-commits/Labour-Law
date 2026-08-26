#!/usr/bin/env bash
set -euo pipefail

# ---- CONFIG -----------------------------------------------------------
# Paste your token as an environment variable rather than hardcoding it
# here, e.g.:  export GH_TOKEN=ghp_xxx   before running this script.
GH_TOKEN="${GH_TOKEN:?Set GH_TOKEN env var first, e.g. export GH_TOKEN=ghp_...}"
REPO_NAME="trudovoe-pravo-zanyatie1"
REPO_DESC="Интерактивный тренажёр — Занятие №1. Миссия трудового права"
VISIBILITY="public"   # change to "private" if you prefer
# -------------------------------------------------------------------------

# 1. Find your GitHub username from the token
GH_USER=$(curl -s -H "Authorization: token $GH_TOKEN" https://api.github.com/user | grep -m1 '"login"' | cut -d '"' -f4)
if [ -z "$GH_USER" ]; then
  echo "Could not authenticate with the provided token. Check it's still valid."
  exit 1
fi
echo "Authenticated as: $GH_USER"

# 2. Create the repository (skips if it already exists)
curl -s -X POST https://api.github.com/user/repos \
  -H "Authorization: token $GH_TOKEN" \
  -d "{\"name\":\"$REPO_NAME\",\"description\":\"$REPO_DESC\",\"private\":$( [ "$VISIBILITY" = "private" ] && echo true || echo false )}" \
  > /tmp/gh_create_response.json

if grep -q '"errors"' /tmp/gh_create_response.json; then
  echo "Repo may already exist — continuing with push."
fi

# 3. Prepare local repo folder (this script expects the project files
#    in the same directory as itself: trudovoe-pravo-zanyatie1.jsx,
#    trudovoe-pravo-zanyatie1.html, prd.md)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKDIR=$(mktemp -d)
cp "$SCRIPT_DIR"/trudovoe-pravo-zanyatie1.jsx "$WORKDIR"/
cp "$SCRIPT_DIR"/trudovoe-pravo-zanyatie1.html "$WORKDIR"/index.html
cp "$SCRIPT_DIR"/prd.md "$WORKDIR"/

cat > "$WORKDIR/README.md" << EOF
# Миссия трудового права — интерактивное занятие №1

Интерактивный учебный тренажёр по курсу «Трудовое право Республики Казахстан».
Автор курса: Хасенов Муслим Ханатович, PhD, Associate Professor, MNU.

- \`index.html\` — готовый к публикации автономный сайт (GitHub Pages откроет именно этот файл).
- \`trudovoe-pravo-zanyatie1.jsx\` — исходный React-компонент.
- \`prd.md\` — Product Requirements Document.
EOF

cd "$WORKDIR"
git init -q
git checkout -q -b main
git add .
git -c user.name="$GH_USER" -c user.email="$GH_USER@users.noreply.github.com" commit -q -m "Initial publish: Занятие №1 — Миссия трудового права"
git remote add origin "https://$GH_TOKEN@github.com/$GH_USER/$REPO_NAME.git"
git push -q -u origin main

echo "Pushed to: https://github.com/$GH_USER/$REPO_NAME"

# 4. Enable GitHub Pages on the main branch, root folder
curl -s -X POST "https://api.github.com/repos/$GH_USER/$REPO_NAME/pages" \
  -H "Authorization: token $GH_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -d '{"source":{"branch":"main","path":"/"}}' > /tmp/gh_pages_response.json || true

echo ""
echo "Done. Your repo: https://github.com/$GH_USER/$REPO_NAME"
echo "Your live site (may take ~1 minute to activate): https://$GH_USER.github.io/$REPO_NAME/"
echo ""
echo "Now revoke the token at: https://github.com/settings/tokens"
