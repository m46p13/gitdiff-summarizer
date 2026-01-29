#!/bin/bash
set -e

echo "========================================"
echo "GitDiff Summarizer - Deployment Script"
echo "========================================"
echo ""
echo "This script will deploy the app to Vercel."
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Try to get token from environment
if [ -z "$VERCEL_TOKEN" ]; then
    echo "VERCEL_TOKEN not found in environment."
    echo "Starting Vercel login flow..."
    echo ""
    echo "Please visit the URL that will appear below"
    echo "and complete the authentication."
    echo ""
    vercel login
else
    echo "Using VERCEL_TOKEN from environment"
    vercel --token "$VERCEL_TOKEN" --yes
fi
