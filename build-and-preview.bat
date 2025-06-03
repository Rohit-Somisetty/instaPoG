@echo off
echo Building the frontend application for production...
cd frontend
npm run build

echo.
echo Build completed! Running preview server...
npm run preview

echo.
echo If everything looks good, you can now deploy to Vercel using the instructions in DEPLOY.md
