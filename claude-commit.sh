#!/bin/bash

# Claude auto-commit script
# Usage: ./claude-commit.sh "commit message"

COMMIT_MSG="${1:-Update changes}"

cd /Users/ilyayakupov/Projects/portfolio-site

# Stage all changes
git add -A

# Commit with message
git commit -m "$COMMIT_MSG"

# Push to remote
git push origin main

echo "✅ Commit and push completed!"
