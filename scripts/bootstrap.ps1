# Bootstrap script for Windows PowerShell
# Run this from the project root to install frontend + backend dependencies

Write-Host "Installing root dependencies..."
npm install

Write-Host "Installing backend dependencies..."
npm --prefix backend install

Write-Host "Bootstrap complete. Start servers with 'npm run dev' and 'npm run dev:backend' or 'npm run dev:all'"
