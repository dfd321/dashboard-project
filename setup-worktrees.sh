#!/bin/bash

# Dashboard Worktree Setup Script
# This script creates git worktrees for parallel development

echo "🚀 Setting up dashboard worktrees for parallel development..."

# Ensure we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository. Please run 'git init' first."
    exit 1
fi

# Create base directories for worktrees
mkdir -p ../dashboard-worktrees

# Function to create a worktree
create_worktree() {
    local branch_name=$1
    local worktree_path="../dashboard-worktrees/$branch_name"
    
    echo "📁 Creating worktree for $branch_name..."
    
    # Create branch if it doesn't exist
    if ! git show-ref --verify --quiet refs/heads/$branch_name; then
        git branch $branch_name
    fi
    
    # Create worktree
    git worktree add $worktree_path $branch_name
    
    # Copy CLAUDE.md and work plans to each worktree
    cp CLAUDE.md $worktree_path/
    cp -r docs $worktree_path/
    
    echo "✅ Worktree created at $worktree_path"
}

# Commit initial scaffolding to main branch
echo "💾 Committing initial scaffolding..."
git add .
git commit -m "Initial dashboard scaffolding with work plans" || echo "Already committed"

# Create feature branches and worktrees
create_worktree "feature/crypto-widget"
create_worktree "feature/weather-widget"
create_worktree "feature/calendar-widget"
create_worktree "feature/backend-api"

echo "
✨ Worktree setup complete!

📂 Directory structure:
dashboard/                    (main branch - base scaffolding)
../dashboard-worktrees/
  ├── feature/crypto-widget   (for crypto widget development)
  ├── feature/weather-widget  (for weather widget development)
  ├── feature/calendar-widget (for calendar integration)
  └── feature/backend-api     (for backend API development)

🔧 How to use:
1. Each Claude Code session should work in a different worktree
2. Navigate to the worktree: cd ../dashboard-worktrees/feature/[widget-name]
3. Follow the work plan in docs/workplans/[WIDGET]_PLAN.md
4. Install dependencies: npm install (in both frontend and backend if needed)
5. Commit changes regularly in your feature branch
6. When ready, create a PR to merge into main

📝 Available work plans:
- docs/workplans/CRYPTO_WIDGET_PLAN.md
- docs/workplans/WEATHER_WIDGET_PLAN.md
- docs/workplans/CALENDAR_WIDGET_PLAN.md
- docs/workplans/BACKEND_API_PLAN.md

💡 Tips:
- Each worktree is independent - you can run dev servers in each
- Use 'git worktree list' to see all worktrees
- Use 'git worktree remove [path]' to remove a worktree
"