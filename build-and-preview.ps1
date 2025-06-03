Write-Host "Building the frontend application for production..." -ForegroundColor Cyan
Set-Location -Path .\frontend
npm run build

Write-Host ""
Write-Host "Build completed! Running preview server..." -ForegroundColor Green
npm run preview

Write-Host ""
Write-Host "If everything looks good, you can now deploy to Vercel using the instructions in DEPLOY.md" -ForegroundColor Yellow
