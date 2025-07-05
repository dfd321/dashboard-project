# Parallel Development Guide

## Overview
This guide explains how to use git worktrees for parallel Claude Code sessions to develop different parts of the dashboard simultaneously.

## Initial Setup (Already Done)
1. Main repository created with scaffolding
2. Work plans created for each module
3. Shared types defined in `shared/types/api.ts`
4. Package.json files configured

## Setting Up Your Claude Code Session

### Step 1: Choose Your Module
Each Claude session should work on ONE module:
- **Crypto Widget**: `feature/crypto-widget`
- **Weather Widget**: `feature/weather-widget`
- **Calendar Widget**: `feature/calendar-widget`
- **Backend API**: `feature/backend-api`

### Step 2: Navigate to Your Worktree
```bash
# From the main dashboard directory
cd ../dashboard-worktrees/feature/[your-module]

# Example for crypto widget:
cd ../dashboard-worktrees/feature/crypto-widget
```

### Step 3: Read Your Work Plan
Open and follow the specific work plan:
- `docs/workplans/CRYPTO_WIDGET_PLAN.md`
- `docs/workplans/WEATHER_WIDGET_PLAN.md`
- `docs/workplans/CALENDAR_WIDGET_PLAN.md`
- `docs/workplans/BACKEND_API_PLAN.md`

### Step 4: Install Dependencies
```bash
# If working on frontend widget
cd frontend
npm install

# If working on backend
cd backend
npm install
```

### Step 5: Start Development
```bash
# Frontend development
cd frontend
npm run dev

# Backend development
cd backend
npm run dev
```

## Coordination Points

### 1. Shared Types
All modules must use types from `shared/types/api.ts`. DO NOT create duplicate type definitions.

### 2. API Contracts
- Backend developer implements endpoints as specified in work plans
- Frontend developers use the exact endpoint URLs specified
- Use mock data initially, then integrate

### 3. Git Workflow
```bash
# Regular commits in your feature branch
git add .
git commit -m "feat: implement [specific feature]"

# Push to remote when ready
git push origin feature/[your-module]
```

### 4. Testing Integration
1. Backend dev starts server on port 3001
2. Frontend devs can test against real API
3. Use environment variables for API URLs

## Common Commands

### Check Your Current Worktree
```bash
pwd  # Should show ../dashboard-worktrees/feature/[module]
git branch  # Should show * feature/[module]
```

### See All Worktrees
```bash
git worktree list
```

### Run Tests
```bash
# Frontend
cd frontend && npm run test
cd frontend && npm run typecheck

# Backend
cd backend && npm run test
cd backend && npm run typecheck
```

## Merge Strategy
1. Each module completes their work independently
2. Create PR from feature branch to main
3. Review shared type compatibility
4. Merge in this order:
   - Backend API (first)
   - Frontend widgets (can be parallel)

## Troubleshooting

### Port Conflicts
- Backend: 3001
- Frontend: 5173
- Redis: 6379 (if used)

### Type Mismatches
Always check `shared/types/api.ts` before creating new types

### CORS Issues
Backend CORS is configured for http://localhost:5173

### Git Worktree Issues
```bash
# If worktree is corrupted
git worktree remove [path]
git worktree add [path] [branch]
```

## Communication Between Sessions

### Using CLAUDE.md
Update CLAUDE.md with:
- Completed features
- API changes
- Breaking changes
- Integration notes

### Mock Data
Each module includes mock data for independent development:
- `frontend/src/services/mockData.ts`
- Backend returns mock data when external APIs fail

Remember: The goal is to develop independently while maintaining compatibility through shared types and contracts!