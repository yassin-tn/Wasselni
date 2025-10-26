# 📤 Push to GitHub - Quick Guide

## 🎯 Steps to Push Your Code to GitHub

### Step 1: Make Sure Repository Exists

1. Go to: https://github.com/YOUR-USERNAME/Wasselni
2. If it doesn't exist:
   - Go to: https://github.com/new
   - Repository name: **Wasselni**
   - Make it **Public**
   - **DON'T** check "Initialize with README"
   - Click "Create repository"

### Step 2: Run the Push Script

**Double-click this file:**
```
PUSH-TO-GITHUB.bat
```

It will:
1. ✅ Check if Git is installed
2. ✅ Initialize Git repository
3. ✅ Add all files
4. ✅ Create first commit
5. ✅ Ask for your GitHub username
6. ✅ Push to GitHub

### Step 3: Enter Your GitHub Username

When prompted, enter your GitHub username (NOT email).

Example:
```
Enter your GitHub username: yourusername
```

### Step 4: Authenticate

GitHub will ask for authentication. You have 2 options:

**Option A: Personal Access Token (Recommended)**
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select: `repo` (full control)
4. Copy the token
5. When Git asks for password, paste the TOKEN (not your password)

**Option B: GitHub Desktop (Easier)**
1. Install GitHub Desktop: https://desktop.github.com
2. Sign in to GitHub
3. File → Add Local Repository
4. Choose: `c:\Users\M.Y.N\OneDrive\Documents\Aiproject50`
5. Publish repository

---

## 🚀 After Pushing to GitHub

### Deploy to Render.com (FREE):

1. Go to: https://render.com
2. Sign up with your GitHub account
3. New Web Service
4. Select your **Wasselni** repository
5. Configure:
   ```
   Name: wasselni-backend
   Root Directory: backend
   Build: npm install
   Start: node src/server.js
   Region: Frankfurt
   ```
6. Add environment variables:
   ```
   NODE_ENV=production
   JWT_SECRET=wasselni-tunisia-2025
   ```
7. Deploy!
8. Copy your URL: `https://wasselni-backend-xxxx.onrender.com`
9. Update mobile/src/services/api.js:
   ```javascript
   const API_BASE_URL = 'https://wasselni-backend-xxxx.onrender.com/api';
   ```
10. Push changes to GitHub:
   ```cmd
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

---

## 🆘 Troubleshooting

### "Git is not installed"
- Download: https://git-scm.com/download/win
- Install
- Restart computer
- Run PUSH-TO-GITHUB.bat again

### "Repository not found"
- Make sure you created the repository on GitHub
- Name must be exactly: **Wasselni**
- Check your username is correct

### "Authentication failed"
- Use Personal Access Token (not password)
- OR use GitHub Desktop

### "Permission denied"
- Repository might be private and you don't have access
- Make sure it's YOUR repository
- Make sure you're logged into the correct GitHub account

---

## 📋 Files That Will Be Pushed

✅ Backend code (API)
✅ Mobile app code
✅ Configuration files
✅ Documentation
✅ Scripts

❌ node_modules (excluded by .gitignore)
❌ .env files (excluded)
❌ Database files (excluded)
❌ Build files (excluded)

---

## 🎉 Success!

After successful push, you can:
- Share the repository with others
- Deploy to Render.com
- Collaborate with team
- Track changes with Git

Your repository will be at:
**https://github.com/YOUR-USERNAME/Wasselni**

---

**Ready? Just double-click PUSH-TO-GITHUB.bat!** 🚀
