#!/bin/bash

# Script to organize blog posts into language folders

echo "🌍 Organizing blog posts for internationalization..."

# Create language directories
echo "Creating language directories..."
mkdir -p _posts/{en,fr,de,nl,es}

# Check if there are markdown files in the root _posts directory
if ls _posts/*.md 1> /dev/null 2>&1; then
    echo "Moving existing posts to _posts/en/..."
    mv _posts/*.md _posts/en/
    echo "✅ Posts moved to English folder"
else
    echo "ℹ️  No markdown files found in _posts/ root directory"
fi

echo ""
echo "📝 Next steps:"
echo "1. Your English posts are now in: _posts/en/"
echo "2. To add French translations, copy posts to _posts/fr/ and translate"
echo "3. Repeat for other languages (de, nl, es)"
echo ""
echo "Example:"
echo "  cp _posts/en/my-post.md _posts/fr/my-post.md"
echo "  # Then edit _posts/fr/my-post.md to translate the content"
echo ""
echo "✨ Done!"
