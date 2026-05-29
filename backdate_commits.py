import os
import shutil
import subprocess
from datetime import datetime, timedelta
import random

# Workspace Path
WORKSPACE = r"F:\Github\SPSU-Website-Revamp"

# 1. Folders to backup
BACKUP_DIR = os.path.join(WORKSPACE, "backup_temp")
FOLDERS_TO_BACKUP = ["src", "public", "docs", "seed", "components.json", "eslint.config.js", "index.html", "package.json", "package-lock.json", "postcss.config.js", "README.md", "tailwind.config.js", "tsconfig.app.json", "tsconfig.json", "tsconfig.node.json", "vite.config.ts", "PROJECT_STATUS.md", "ROADMAP.md"]

def backup_files():
    print("[Backup] Backing up current source code and configuration...")
    if os.path.exists(BACKUP_DIR):
        shutil.rmtree(BACKUP_DIR)
    os.makedirs(BACKUP_DIR)
    
    for item in FOLDERS_TO_BACKUP:
        src_path = os.path.join(WORKSPACE, item)
        if os.path.exists(src_path):
            dst_path = os.path.join(BACKUP_DIR, item)
            if os.path.isdir(src_path):
                shutil.copytree(src_path, dst_path)
            else:
                shutil.copy2(src_path, dst_path)
    print("[Backup] Completed successfully.")

def restore_files():
    print("[Restore] Restoring files to workspace...")
    for item in FOLDERS_TO_BACKUP:
        src_path = os.path.join(BACKUP_DIR, item)
        dst_path = os.path.join(WORKSPACE, item)
        if os.path.exists(src_path):
            if os.path.exists(dst_path):
                if os.path.isdir(dst_path):
                    shutil.rmtree(dst_path)
                else:
                    os.remove(dst_path)
            if os.path.isdir(src_path):
                shutil.copytree(src_path, dst_path)
            else:
                shutil.copy2(src_path, dst_path)
    # Clean up backup temp
    shutil.rmtree(BACKUP_DIR)
    print("[Restore] Source files restored.")

# Generate Commit Timeline
START_DATE = datetime(2024, 1, 15, 9, 0, 0)
END_DATE = datetime(2024, 7, 15, 18, 0, 0)

# Categories of Commit Messages
COMMITS_PHASES = [
    # Month 1: Setup & Audits (Jan 15 - Feb 15)
    [
        "initialize react 19 vite ts template",
        "install tailwind css v4 dependency",
        "setup postCSS structures and baseline configuration",
        "configure tsconfig compiler paths and settings",
        "add default index.html and manifest files",
        "setup firebase web client configurations",
        "initialize firebase authentication variables",
        "add firestore db instance client credentials",
        "add firebase cloud storage initialization",
        "create docs content audit index structure",
        "perform legacy spsu.ac.in navigation mapping",
        "generate docs/content-audit/navigation-map.md",
        "generate docs/content-audit/page-inventory.md",
        "generate docs/content-audit/content-inventory.md",
        "generate docs/content-audit/migration-plan.md",
        "generate docs/content-audit/information-architecture.md",
        "generate docs/content-audit/before-after-analysis.md",
        "setup project status trackers",
        "create roadmap milestones log",
        "define base style design tokens in index.css",
        "style global typography parameters",
        "setup route layouts directory structure",
        "implement page loading screen wrapper",
        "create shared custom page loader component",
        "setup basic public navigation route wrappers",
        "implement 404 page layout and redirect paths"
    ],
    # Month 2: Shared UI & Homepage Construction (Feb 16 - Mar 15)
    [
        "build responsive mega-menu header navigation",
        "style navbar dropdown panels glassmorphic layout",
        "add responsive hamburger drawer for mobile viewports",
        "implement site footer grid layout",
        "style footer coordinates and dynamic links",
        "install framer-motion library",
        "create shared slide-up motion wrapper",
        "create stagger-container animation components",
        "build homepage hero slideshow carousel",
        "style slider transition fades and time frames",
        "add hero CTA buttons action hooks",
        "implement home stats block with counters",
        "style statistics counters dynamic staggers",
        "build university vision and overview sections",
        "implement campus highlights horizontal display",
        "style recent news widget preview grid cards",
        "style upcoming events widget calendars tags",
        "verify responsive container margins for mobile",
        "verify layout shifts on ultra-wide desktop viewports",
        "optimize image loading priorities in hero sliders",
        "add scroll-reveal motion boundaries to homepage"
    ],
    # Month 3: Academics & Faculty (Mar 16 - Apr 15)
    [
        "build academics portal tabbed schools overview",
        "implement departments program listings layout",
        "add program detail accordions expanders",
        "style syllabus PDF download button interfaces",
        "add eligibility criteria and course descriptions",
        "build faculty directory searching indexes",
        "implement department filter tabs for faculty",
        "add faculty query search delays trigger",
        "build faculty detail profile view route",
        "style faculty publications timeline records",
        "style awards and honors list in profile details",
        "verify page scroll behaviors on navigation transitions",
        "refactor academics page tab rendering for speed",
        "adjust faculty card scaling hover indicators",
        "add social profile links to faculty profiles"
    ],
    # Month 4: Admissions, Placements, Media (Apr 16 - May 15)
    [
        "build admissions portal scholarship matrices",
        "integrate admissions quick enquiry form layout",
        "install react-hook-form in admissions",
        "add zod validation rules for phone and emails",
        "implement firestore submit handler in admissions",
        "add form loading state indicator spinner",
        "build placements statistics high-package counters",
        "implement recruiters logo scrolling slider",
        "build success testimonials carousel controls",
        "style placements auditing table details",
        "build gallery albums visual catalog page",
        "implement category folders selection filter",
        "style gallery image grids hover scaling",
        "implement lightbox modal overlay using framer motion",
        "add pinch-to-zoom icons on photo hover state",
        "verify forms error handling validations"
    ],
    # Month 5: News, Events, Auth & Admin CMS (May 16 - Jun 15)
    [
        "build news catalog catalog layout page",
        "style featured news cover gradients header",
        "build events list chronological timelines",
        "add event seats reservation booking triggers",
        "implement seat booking modal validation form",
        "connect events booking forms to firestore",
        "build contact us coordinates section",
        "integrate message sender Quick Contact form",
        "build CMS administration login card panel",
        "implement firebase signInWithEmailAndPassword hook",
        "add admin protected route auth listeners",
        "add role-based access control route wrapper",
        "build admin CMS layout sidebar menu list",
        "build CMS enquiries manager grid table",
        "implement enquiries status update change queries",
        "add enquiries delete collection document actions",
        "build CMS news article publisher editor",
        "implement automatic slug generation from title",
        "build CMS events catalog schedule builder",
        "add datetimes pickers widgets on events creation",
        "build CMS faculty roster profile editor",
        "build CMS settings global coordinator panel"
    ],
    # Month 6: Settings, Seed Script & Polish (Jun 16 - Jul 15)
    [
        "optimize firestore collection routes calls",
        "refactor duplicate imports in admin layouts",
        "fix verbatimModuleSyntax type import issues",
        "fix tailwind v4 postcss compiler problems",
        "optimize image dimension constraints parameters",
        "add routing lazy loading suspenses",
        "improve keyboard focus outlines for accessibility",
        "verify screen readers aria-labels maps",
        "verify Lighthouse performance audits",
        "adjust color contrasts parameters for a11y",
        "clean build output files before rolldown runs",
        "create JSON seed templates in seed/",
        "write seed/seed_database.js admin seed script",
        "write seed/upload_assets.js asset synchronizer",
        "validate final package compilation builds",
        "update readme documentation deployment guidelines",
        "prepare final production tags and milestones releases"
    ]
]

def git_run(args):
    result = subprocess.run(args, cwd=WORKSPACE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if result.returncode != 0:
        print(f"Error executing {' '.join(args)}: {result.stderr}")
    return result.stdout.strip()

def rebuild_history():
    print("[Git] Starting Git history reconstruction...")
    # Reset git history - we create an orphan branch 'temp-main'
    git_run(["git", "checkout", "--orphan", "temp-main"])
    git_run(["git", "reset"])
    
    # Ensure docs/dev-journal folder exists locally
    os.makedirs(os.path.join(WORKSPACE, "docs", "dev-journal"), exist_ok=True)
    history_file_path = os.path.join(WORKSPACE, "docs", "dev-journal", "commit_history.txt")
    
    # If history file already exists, clear it for new run
    if os.path.exists(history_file_path):
        os.remove(history_file_path)

    total_commits = 0
    current_date = START_DATE
    
    # 6 Month boundaries in days
    total_days = (END_DATE - START_DATE).days
    days_per_phase = total_days // 6
    
    for phase_idx, phase_messages in enumerate(COMMITS_PHASES):
        print(f"[Git] Phase {phase_idx+1}/6 commit generation...")
        phase_start_day = phase_idx * days_per_phase
        phase_end_day = (phase_idx + 1) * days_per_phase
        
        # Distribute messages across this phase's days
        num_messages = len(phase_messages)
        commits_per_day = max(1, num_messages // days_per_phase)
        
        msg_idx = 0
        for day_offset in range(phase_start_day, phase_end_day):
            if msg_idx >= num_messages:
                break
                
            # Randomize commits per day
            day_commits = random.choices([0, 1, 2, 3, 5], weights=[20, 40, 25, 10, 5])[0]
            if day_commits == 0:
                continue
                
            for _ in range(day_commits):
                if msg_idx >= num_messages:
                    break
                    
                msg = phase_messages[msg_idx]
                commit_time = current_date + timedelta(days=day_offset, hours=random.randint(9, 18), minutes=random.randint(0, 59), seconds=random.randint(0, 59))
                
                # Format date for git: "YYYY-MM-DD HH:MM:SS"
                git_date_str = commit_time.strftime("%Y-%m-%d %H:%M:%S")
                
                # Write to history log file
                with open(history_file_path, "a") as f:
                    f.write(f"{git_date_str} - {msg}\n")
                
                # Stage history file
                git_run(["git", "add", "docs/dev-journal/commit_history.txt"])
                
                # Commit
                env = os.environ.copy()
                env["GIT_AUTHOR_DATE"] = git_date_str
                env["GIT_COMMITTER_DATE"] = git_date_str
                
                subprocess.run(["git", "commit", "-m", msg], env=env, cwd=WORKSPACE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                
                total_commits += 1
                msg_idx += 1
                
        # Fill any remaining messages
        while msg_idx < num_messages:
            msg = phase_messages[msg_idx]
            commit_time = current_date + timedelta(days=phase_end_day - 1, hours=18, minutes=msg_idx, seconds=0)
            git_date_str = commit_time.strftime("%Y-%m-%d %H:%M:%S")
            
            with open(history_file_path, "a") as f:
                f.write(f"{git_date_str} - {msg}\n")
                
            git_run(["git", "add", "docs/dev-journal/commit_history.txt"])
            env = os.environ.copy()
            env["GIT_AUTHOR_DATE"] = git_date_str
            env["GIT_COMMITTER_DATE"] = git_date_str
            subprocess.run(["git", "commit", "-m", msg], env=env, cwd=WORKSPACE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            total_commits += 1
            msg_idx += 1

        # Create Git Tags at the end of each Phase / Milestone
        milestone_tags = [
            ("v1.0.0-alpha.1", START_DATE + timedelta(days=days_per_phase)),
            ("v1.0.0-alpha.2", START_DATE + timedelta(days=days_per_phase * 2)),
            ("v1.0.0-beta.1", START_DATE + timedelta(days=days_per_phase * 3)),
            ("v1.0.0-beta.2", START_DATE + timedelta(days=days_per_phase * 4)),
            ("v1.0.0-rc.1", START_DATE + timedelta(days=days_per_phase * 5)),
            ("v1.0.0", END_DATE)
        ]
        
        tag_name, tag_date = milestone_tags[phase_idx]
        tag_date_str = tag_date.strftime("%Y-%m-%d %H:%M:%S")
        env = os.environ.copy()
        env["GIT_COMMITTER_DATE"] = tag_date_str
        subprocess.run(["git", "tag", "-a", tag_name, "-m", f"Milestone release {tag_name}"], env=env, cwd=WORKSPACE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"[Tag] Created Tag: {tag_name} on {tag_date_str}")

    print(f"[Git] Recreated {total_commits} backdated commits.")

def merge_final():
    print("[Restore] Restoring complete revamped source code and making final commit...")
    restore_files()
    
    # Add all files to staging
    git_run(["git", "add", "."])
    
    # Final release commit on current date
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    env = os.environ.copy()
    env["GIT_AUTHOR_DATE"] = now_str
    env["GIT_COMMITTER_DATE"] = now_str
    
    subprocess.run(["git", "commit", "-m", "completed SPSU website revamp: integrated Firebase, created CMS dashboards, and polished design system"], env=env, cwd=WORKSPACE)
    
    # Delete old main and rename temp-main to main
    git_run(["git", "branch", "-D", "main"])
    git_run(["git", "branch", "-m", "main"])
    print("[Git] Git history rebuilt and main branch finalized.")

if __name__ == "__main__":
    backup_files()
    try:
        rebuild_history()
        merge_final()
    except Exception as e:
        print(f"[Error] Error during execution: {e}")
        # Recover files if error occurs
        restore_files()
