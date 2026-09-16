# How to Host This Portfolio on GitHub Pages (Step-by-Step)

This package contains everything you need to deploy your portfolio to GitHub.

---

## 🚀 Quickest Way: Push Repository to GitHub with Automated GitHub Pages

This project is pre-configured with **GitHub Actions** (`.github/workflows/deploy.yml`). As soon as you push your code, GitHub will automatically build and publish your site!

### Step 1: Create a GitHub Repository
1. Log in to your GitHub account: [https://github.com](https://github.com)
2. Click **New Repository** (or visit [https://github.com/new](https://github.com/new)).
3. Name your repository (e.g. `portfolio` or `shashikumar-portfolio`).
4. Set it to **Public**.
5. Do **NOT** check "Add a README file" (we already provide one).
6. Click **Create repository**.

---

### Step 2: Push Your Code from Your Computer
1. Extract this ZIP file on your computer.
2. Open your terminal or Command Prompt inside the extracted folder.
3. Run these commands:

```bash
git init
git add .
git commit -m "feat: portfolio with bloom cursor and interactive labs"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
git push -u origin main
```
*(Replace `<YOUR_GITHUB_USERNAME>` and `<YOUR_REPOSITORY_NAME>` with your actual details).*

---

### Step 3: Enable GitHub Pages
1. On your GitHub repository page, click **Settings** (gear icon at the top).
2. On the left sidebar, click **Pages**.
3. Under **Build and deployment** -> **Source**, select:
   👉 **GitHub Actions**
4. That's it! GitHub will run the included `.github/workflows/deploy.yml` action automatically.
5. In 1–2 minutes, your live site will be ready at:
   `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/`

---

## ⚡ Alternative Option: Deploy the Pre-Built `dist/` Folder Directly

If you prefer not to use GitHub Actions or Node.js:
1. The ZIP archive includes the compiled production build inside the `dist/` directory.
2. You can upload the contents of `dist/` directly to your repository or use GitHub Pages pointing to the branch root.

---

## 🌐 Alternative 1-Click Hosting: Vercel (Free & Instant)
1. Go to [https://vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New Project** and select your GitHub repository.
3. Click **Deploy**.
4. Your site will be live instantly with a free SSL certificate!
