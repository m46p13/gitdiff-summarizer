#!/bin/bash
# Deploy to Vercel using the REST API

# Create a tarball of the project
tar -czf /tmp/deploy.tar.gz --exclude='node_modules' --exclude='.git' --exclude='.next' .

# Base64 encode the tarball
DEPLOYMENT_DATA=$(base64 /tmp/deploy.tar.gz)

echo "Deployment package created"
echo "To deploy, you need to:"
echo "1. Get a Vercel token from https://vercel.com/account/tokens"
echo "2. Run: export VERCEL_TOKEN=your_token"
echo "3. Run this script again"
