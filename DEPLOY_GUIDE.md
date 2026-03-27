# 🚀 AI Tools Universe — Deploy Guide

## ✅ STEP 1 — Local Test (Already Done!)
Backend running at: http://localhost:3001
Frontend: ai-tools-directory.html (open in browser)

---

## 🌐 STEP 2 — Deploy Backend on Railway (FREE)

### A) Install Git (if not installed)
Download from: https://git-scm.com/download/win

### B) Create GitHub Repo
1. Go to https://github.com → Login
2. Click green "New" button
3. Name: `ai-tools-backend`
4. Click "Create repository"

### C) Push code to GitHub
Open CMD in your project folder:
```cmd
D:
cd "Sumant\New Projects\ALL Ai"
git init
git add .
git commit -m "AI Tools Backend - 753 tools"
git branch -M main
git remote add origin https://github.com/YOURNAME/ai-tools-backend.git
git push -u origin main
```

### D) Deploy on Railway
1. Go to https://railway.app
2. Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `ai-tools-backend`
5. Add environment variable:
   - Key: `JWT_SECRET`
   - Value: `aitools-super-secret-2026`
6. Click Deploy
7. Wait 2 minutes → Get URL like:
   `https://ai-tools-backend-production.up.railway.app`

---

## 🌐 STEP 3 — Update Frontend with Railway URL

Open `ai-tools-directory.html` in Notepad
Find this line (around line 322):
```js
: 'https://your-app.up.railway.app/api';
```
Replace with YOUR Railway URL:
```js
: 'https://ai-tools-backend-production.up.railway.app/api';
```
Save the file.

---

## 🌐 STEP 4 — Deploy Frontend on Netlify (FREE, 30 seconds)

1. Go to https://app.netlify.com/drop
2. Drag & drop `ai-tools-directory.html`
3. Get instant live URL like:
   `https://magical-name-123456.netlify.app`

---

## ✅ FINAL RESULT

| What | URL |
|------|-----|
| 🌐 Website | https://magical-name-123456.netlify.app |
| ⚙️ Backend API | https://ai-tools-backend-production.up.railway.app |
| 🔑 Admin Panel | https://ai-tools-backend-production.up.railway.app/admin |

### Admin Login:
- Email: admin@aitools.com
- Password: admin123

---

## 📁 Your Final File Structure
```
ALL Ai/
├── server.js
├── db.js          ← 753 tools
├── package.json
├── routes/
│   ├── auth.js
│   ├── tools.js
│   ├── favourites.js
│   └── admin.js
├── middleware/
│   └── auth.js
├── public/admin/
│   └── index.html
├── data/          ← auto-created
└── ai-tools-directory.html  ← Frontend
```

---

## ❓ Common Issues

**Railway deploy fails?**
- Make sure `package.json` has: `"start": "node server.js"`
- Check that `data/` folder is in `.gitignore`

**CORS error on frontend?**
- Check Railway URL is correct in HTML file
- Make sure backend is running

**Admin panel shows 20 tools?**
- Delete `data/tools.json` and restart server
- New db.js will seed 753 tools
