# Deploying to Vercel

This guide will help you deploy your frontend application to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. Git installed on your machine
3. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy from the Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." and select "Project"
3. Import your Git repository
4. Configure your project:
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: dist
5. Click "Deploy"

### Option 2: Deploy using the Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to your frontend directory:
   ```bash
   cd frontend
   ```

3. Run the deployment command:
   ```bash
   vercel
   ```

4. Follow the prompts to configure your deployment

## Environment Variables

If your application uses environment variables, you can configure them in your Vercel project settings:

1. Go to your project in the Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Add your variables there

## Custom Domain

To connect a custom domain to your Vercel deployment:

1. Go to your project in the Vercel dashboard
2. Navigate to Settings > Domains
3. Follow the instructions to add and verify your domain

## Continuous Deployment

Once set up, Vercel will automatically deploy when you push changes to your repository.
