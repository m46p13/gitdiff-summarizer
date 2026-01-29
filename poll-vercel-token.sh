#!/bin/bash
# Poll for Vercel token

DEVICE_TOKEN="8OPg1T36TwmJOQSzo7N6nnHi"

echo "Polling for token... (device token: $DEVICE_TOKEN)"

for i in {1..30}; do
  RESPONSE=$(curl -s "https://api.vercel.com/now/registration/${DEVICE_TOKEN}?code=${DEVICE_TOKEN}")
  echo "Attempt $i: $RESPONSE"
  
  if echo "$RESPONSE" | grep -q '"token":"'; then
    echo "Success! Token obtained:"
    echo "$RESPONSE" | grep -o '"token":"[^"]*"'
    break
  fi
  
  sleep 5
done
