#!/usr/bin/env bash
set -euo pipefail

echo "Updating git subtrees..."

echo "[1/3] Pulling nuget..."
git subtree pull --prefix=nuget https://github.com/nssivanitesh/react-ubiquitous-nuget main --squash

echo "[2/3] Pulling py..."
git subtree pull --prefix=py https://github.com/nssivanitesh/react-ubiquitous-py main --squash

echo "[3/3] Pulling composer..."
git subtree pull --prefix=composer https://github.com/nssivanitesh/react-ubiquitous-composer main --squash

echo "All subtrees updated."
