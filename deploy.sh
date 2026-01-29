#!/bin/bash
# Create a Vercel project and deploy using the GitHub integration

# First, let's try to login via the device flow and capture the token
vercel login --oob 2>&1 &
PID=$!

# Wait for the login URL to appear
sleep 5

# Kill the process
kill $PID 2>/dev/null
