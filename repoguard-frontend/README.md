# RepoGuard Frontend

Clean, modern UI for the RepoGuard AI repository reviewer.

## Design System

- **Primary**: Indigo (`#4F46E5`) – trust & precision  
- **Security**: Coral Rose (`#E11D48`) – urgency without pure red  
- **Code Health**: Sage Teal (`#0D9488`) – growth & calm  
- Split-complementary color theory, restrained saturation, high value contrast

## Pages

1. **Landing** (`/`) – Repository input + value proposition  
2. **Scan Results** (`/scan/[jobId]`) – Live agent progress, dual score gauges, findings list + detail, approve flow

## Run locally

```bash
cd repoguard-frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

The scan page uses realistic mock data and simulated agent progress so you can demo the full UI without a backend.
