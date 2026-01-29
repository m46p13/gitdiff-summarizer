#!/bin/bash
# Final deployment attempt

echo "Starting Vercel deployment..."

# Try to use token from environment or file
if [ -f ~/.vercel/auth.json ]; then
    echo "Found existing Vercel auth"
    vercel --prod --yes
else
    echo "No Vercel authentication found."
    echo "Starting device authentication flow..."
    echo ""
    
    # Start login in background and capture output
    vercel login 2>&1 | tee /tmp/vercel_auth.log &
    PID=$!
    
    # Wait for device code
    sleep 5
    
    # Extract device code
    DEVICE_URL=$(grep -o 'https://vercel.com/oauth/device[^[:space:]]*' /tmp/vercel_auth.log)
    
    if [ -n "$DEVICE_URL" ]; then
        echo "Please visit: $DEVICE_URL"
        echo "And complete the authentication."
        echo ""
        echo "Waiting for authentication..."
        
        # Wait for auth to complete (up to 5 minutes)
        for i in {1..60}; do
            if [ -f ~/.vercel/auth.json ]; then
                echo "Authentication successful!"
                kill $PID 2>/dev/null || true
                vercel --prod --yes
                exit 0
            fi
            sleep 5
        done
        
        echo "Timeout waiting for authentication"
        kill $PID 2>/dev/null || true
        exit 1
    else
        echo "Failed to get device URL"
        kill $PID 2>/dev/null || true
        exit 1
    fi
fi
