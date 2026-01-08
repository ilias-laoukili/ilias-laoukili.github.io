#!/bin/bash

# Helper script to copy blog posts for translation

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: ./copy-post-for-translation.sh <post-slug> <target-language>"
    echo ""
    echo "Example:"
    echo "  ./copy-post-for-translation.sh drone-fire-and-smoke-detection-system fr"
    echo ""
    echo "Available languages: fr, de, nl, es"
    exit 1
fi

POST_SLUG=$1
TARGET_LANG=$2

SOURCE_FILE="_posts/en/${POST_SLUG}.md"
TARGET_FILE="_posts/${TARGET_LANG}/${POST_SLUG}.md"

# Check if source exists
if [ ! -f "$SOURCE_FILE" ]; then
    echo "❌ Error: Source file not found: $SOURCE_FILE"
    exit 1
fi

# Check if target already exists
if [ -f "$TARGET_FILE" ]; then
    read -p "⚠️  Target file already exists. Overwrite? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 0
    fi
fi

# Copy the file
cp "$SOURCE_FILE" "$TARGET_FILE"

echo "✅ Copied to: $TARGET_FILE"
echo ""
echo "📝 Next step: Edit $TARGET_FILE to translate the content"
echo ""
echo "Tips:"
echo "  - Keep the filename the same (slug)"
echo "  - Translate all text content"
echo "  - Keep code blocks unchanged"
echo "  - Keep frontmatter structure if any"
