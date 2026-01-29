#!/bin/bash
# Get Vercel token using device flow

# Start the device flow
DEVICE_RESPONSE=$(curl -s -X POST "https://api.vercel.com/now/registration" \
  -H "Content-Type: application/json" \
  -d '{"tokenName": "CLI Login"}')

echo "Device response: $DEVICE_RESPONSE"
