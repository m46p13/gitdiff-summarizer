#!/bin/bash
# Create Vercel project via API

# This requires a Vercel token
echo "To create a Vercel project, you need a token."
echo "Visit https://vercel.com/account/tokens to create one"
echo "Then run: export VERCEL_TOKEN=your_token"
echo "And run this script again"

if [ -z "$VERCEL_TOKEN" ]; then
  echo "VERCEL_TOKEN not set"
  exit 1
fi

# Create project
curl -X POST "https://api.vercel.com/v9/projects" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "gitdiff-summarizer",
    "gitRepository": {
      "type": "github",
      "repo": "m46p13/gitdiff-summarizer'
