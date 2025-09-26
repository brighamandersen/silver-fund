#!/bin/bash
set -euo pipefail

echo "Deploying silverfund"

# frontend

cd /home/brig/code/silver-fund/
npm run build

# nginx

sudo ln -sf /home/brig/code/silver-fund/deploy/nginx.conf /etc/nginx/conf.d/silverfund.conf

sudo nginx -t
sudo systemctl reload nginx

echo "Deployment complete for silverfund"
