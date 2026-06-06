#!/bin/bash
set -euo pipefail

echo "Deploying silverfund"

# frontend

cd /home/brig/dev/silver-fund/
npm run build

# nginx

sudo cp /home/brig/dev/silver-fund/deploy/nginx.conf /etc/nginx/conf.d/silverfund.conf

sudo nginx -t
sudo systemctl reload nginx

echo "Deployment complete for silverfund"
