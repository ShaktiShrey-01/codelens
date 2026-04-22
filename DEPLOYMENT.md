# CodeLens Deployment Guide

## 1) What to deploy first?
Deploy the backend first, then frontend.

Reason: Netlify frontend needs the backend URL in `VITE_API_BASE_URL` at build/deploy time.

## 2) Environment files
- `backend/.env` (real secrets, never commit)
- `backend/.env.example` (template, committed)
- `frontend/.env` (local dev only, ignored)
- `frontend/.env.example` (template, committed)

## 3) Backend deploy (Render/Railway/Fly/EC2 etc.)
Set these env vars in your backend host:
- `PORT`
- `NODE_ENV=production`
- `MONGO_URI`
- `ACCESS_TOKEN_SECRET`
- `ACCESS_TOKEN_EXPIRY`
- `REFRESH_TOKEN_SECRET`
- `REFRESH_TOKEN_EXPIRY`
- `GEMINI_API_KEY`
- `CORS_ORIGINS=https://<your-netlify-site>.netlify.app`

Backend start command:
- `npm install`
- `npm start`

Backend health check URL:
- `https://<your-backend-domain>/`

## 4) Frontend deploy on Netlify
This repo includes root `netlify.toml` configured for monorepo build:
- base: `frontend`
- build command: `npm run build`
- publish dir: `dist`

Set Netlify environment variable:
- `VITE_API_BASE_URL=https://<your-backend-domain>`

Then trigger redeploy.

## 5) Push to GitHub safely
From repo root:

```powershell
git add .
git status
git commit -m "chore: prepare deployment configs and env templates"
git push origin <your-branch>
```

If `.env` was ever tracked previously, run once:

```powershell
git rm --cached backend/.env frontend/.env
```

## 6) Post-deploy check
- Open frontend URL
- Test signup/login
- Confirm cookies work across frontend-backend domains
- Test AI generation endpoint
