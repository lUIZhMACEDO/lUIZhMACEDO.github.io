# GitHub Pages Deployment Guide

## Quick Start

1. **Create a GitHub Repository**
   - Go to GitHub and create a new repository
   - Name it `yourusername.github.io` (for automatic deployment) or any other name

2. **Push Your Code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portfolio website"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on **Settings**
   - Scroll down to **Pages** section
   - Under **Source**, select **main** branch
   - Click **Save**

4. **Access Your Site**
   - If repo is named `username.github.io`: `https://username.github.io`
   - Otherwise: `https://username.github.io/repository-name`
   - It may take a few minutes for the site to be available

## File Structure Requirements

✅ All file paths are relative (no absolute paths)
✅ All assets are included in the repository
✅ External resources use CDN (Chart.js, Font Awesome)

## Important Notes

- **Repository Name**: If you want the site at `username.github.io`, the repository MUST be named exactly `username.github.io`
- **Branch**: GitHub Pages uses the `main` branch by default
- **Build**: No build process needed - static HTML files work directly
- **Custom Domain**: You can add a custom domain in the Pages settings

## Troubleshooting

- **404 Error**: Make sure `index.html` is in the root directory
- **Images Not Loading**: Check that image paths are relative (start with `./` or just the filename)
- **Styles Not Working**: Verify `styles.css` is in the root and paths are correct
- **Site Not Updating**: Clear browser cache or wait a few minutes for GitHub to rebuild

## Testing Locally

Before deploying, test locally:
```bash
# Python 3
python -m http.server 8000

# Or use the included server.py
python server.py
```

Then visit `http://localhost:8000` in your browser.

