#!/bin/bash
#
# Import a module from a .docx file into the project structure.
#
# Usage: ./scripts/import-module.sh <module-number> <docx-file> [title] [phase]
#
# Example:
#   ./scripts/import-module.sh 01 ~/Downloads/Overview.docx "Overview of the Baha'i Faith" discovery
#
# What it does:
#   1. Creates the module folder if it doesn't exist (with research/ and drafts/)
#   2. Converts the .docx to markdown via pandoc
#   3. Saves it as drafts/v1.md
#   4. Creates metadata.yaml if it doesn't exist

set -e

MODULE_NUM="$1"
DOCX_FILE="$2"
TITLE="${3:-Untitled Module}"
PHASE="${4:-discovery}"

if [ -z "$MODULE_NUM" ] || [ -z "$DOCX_FILE" ]; then
  echo "Usage: ./scripts/import-module.sh <module-number> <docx-file> [title] [phase]"
  echo ""
  echo "Example:"
  echo "  ./scripts/import-module.sh 01 ~/Downloads/Overview.docx \"Overview of the Baha'i Faith\" discovery"
  exit 1
fi

if [ ! -f "$DOCX_FILE" ]; then
  echo "Error: File not found: $DOCX_FILE"
  exit 1
fi

# Find the module folder (match by number prefix)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
MODULE_DIR=$(find "$PROJECT_DIR" -maxdepth 1 -type d -name "${MODULE_NUM}-*" | head -1)

if [ -z "$MODULE_DIR" ]; then
  # Create a folder from the title
  SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed "s/[^a-z0-9 ]//g" | tr ' ' '-' | sed 's/--*/-/g')
  MODULE_DIR="${PROJECT_DIR}/${MODULE_NUM}-${SLUG}"
  echo "Creating module folder: $(basename "$MODULE_DIR")"
  mkdir -p "$MODULE_DIR"/{research,drafts}
else
  echo "Found existing folder: $(basename "$MODULE_DIR")"
  mkdir -p "$MODULE_DIR"/{research,drafts}
fi

# Convert docx to markdown
echo "Converting $(basename "$DOCX_FILE") to markdown..."
pandoc "$DOCX_FILE" -t markdown --wrap=none -o "$MODULE_DIR/drafts/v1.md"

# Create metadata.yaml if it doesn't exist
if [ ! -f "$MODULE_DIR/metadata.yaml" ]; then
  echo "Creating metadata.yaml..."
  cat > "$MODULE_DIR/metadata.yaml" <<YAML
title: "$TITLE"
id: $MODULE_NUM
phase: $PHASE
topics: []
status: drafting
YAML
fi

# Summary
WORD_COUNT=$(wc -w < "$MODULE_DIR/drafts/v1.md" | tr -d ' ')
echo ""
echo "Done!"
echo "  Module:   $(basename "$MODULE_DIR")"
echo "  Draft:    drafts/v1.md ($WORD_COUNT words)"
echo "  Metadata: metadata.yaml"
echo ""
echo "Next steps:"
echo "  1. Review drafts/v1.md and clean up any formatting artifacts"
echo "  2. Add source material to research/"
echo "  3. Update metadata.yaml with topics"
