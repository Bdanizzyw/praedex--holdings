#!/usr/bin/env bash
# Bootstrap script for Unix-like shells
# Run this from the project root to install frontend + backend dependencies

echo "Installing root dependencies..."
npm install

echo "Installing backend dependencies..."
npm --prefix backend install

echo "Bootstrap complete. Start servers with 'npm run dev' and 'npm run dev:backend' or 'npm run dev:all'"
