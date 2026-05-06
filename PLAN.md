# Turtle Star — Kids Daily Routine Web App — Implementation Plan

## Context
Build a mobile-friendly web app for toddlers and young kids (ages 2–8) to follow their daily routines. Kids check off tasks, earn stars/badges, and celebrate with animations. Parents can create/edit routines freely. Multiple kid profiles are supported. All data is stored locally in the browser — no backend or login required.

---

## Hosting
**GitHub Pages** (static hosting from the GitHub repo)
- React + Vite produces a static build (`dist/`) — no server or backend needed
- All data stored in `localStorage` — fully browser-side
- Set `base` in `vite.config.js` to the repo name (e.g., `'/turtle-star/'`)
- Deploy via GitHub Actions on every push to `main` → auto-publishes to `gh-pages` branch
- Uses **state-based navigation** (React `useState`) instead of React Router — avoids 404 issues on GitHub Pages with deep links
- Workflow file: `.github/workflows/deploy.yml`

---

## Tech Stack
- **React + Vite** — component-based, easy to scale, modern tooling
- **Tailwind CSS** — rapid theming, responsive/mobile-first
- **localStorage** — persist profiles, routines, progress, streaks
- **Howler.js** (or native `<audio>`) — sound effects
- **Framer Motion** — celebration animations, task check-off micro-animations, swipe gestures for card mode

---

## App Screens & Flow

```
Home (Kid Selector)
  └─> Kid Dashboard (choose routine)
  │     ├─> Routine View (task list + progress)
  │     │     └─> Celebration Screen (stars earned, animation)
  │     └─> History View (📅 button — day-wise task log with date filter)
  │
Settings / Edit Mode (⚙️ floating button — accessible from Kid Dashboard AND Routine View)
  ├─> Manage Kids (add/edit/delete profiles + celebration theme per kid)
  ├─> Manage Routines (add/edit/reorder tasks + image picker)
  ├─> UI Theme Selector (per kid)
  └─> Mute Toggle (global sound on/off)
```

---

## Data Model (localStorage)

```ts
// kids[]
{ id, name, avatar (emoji), uiTheme, celebrationTheme, taskViewMode: 'card'|'list', totalStars, currentStreak, lastCompletedDate }

// routines[]
{ id, kidId, name, type: 'morning'|'bedtime'|'afterschool'|'custom' }

// tasks[] — stored separately, linked to routines by routineId
{ id, routineId, label, imageKey, order }
// imageKey maps to an asset in src/assets/tasks/ (e.g. "brush-teeth" → brush-teeth.svg)

// progress[] — one entry per kid per day per routine
{ id, kidId, routineId, date (YYYY-MM-DD), completedTaskIds[], fullyCompleted }
```

---

## Theme System

Three selectable **UI themes** per kid (controls colors, fonts, mascot character):

| Theme | Style | Fonts | Colors |
|---|---|---|---|
| **Cartoonish** | Bright, bold, playful | Fredoka One | Rainbow primaries |
| **Clean & Friendly** | Soft pastels, modern | Nunito | Pastels + white |
| **Character-Themed** | Animal mascot (Bear) guides kid | Bubblegum Sans | Warm earth tones |

Separately, each kid can choose a **Celebration Theme** (see below).

Theme stored per kid profile in localStorage. Theme selector available in kid dashboard header.

---

## Pre-built Routines (seeded per new kid)

Each new kid profile automatically gets their own independent copy of these routines (editable without affecting other kids):

**Morning**: Wake Up, Pray Time, Brush Teeth, Wash Face, Get Dressed, Eat Breakfast, Pack Bag

**Bedtime**: Take Bath, Brush Teeth, Put on Pajamas, Read a Book, Lights Out

**After School**: Wash Hands, Have a Snack, Do Homework, Play Time, Clean Up Toys

Parents can also add fully **custom routines** (any name, any tasks) per kid.

---

## Key Components

| Component | Responsibility |
|---|---|
| `Header` | Shared top bar: ← Back + 🏠 Home buttons (hidden on Home screen) |
| `KidSelector` | Home screen grid of kid avatars; "Add Kid" button |
| `KidDashboard` | Grid of routine cards (Morning, Bedtime, etc.) for a kid |
| `RoutineView` | Task list/card container + routine filter + progress bar + star counter |
| `TaskCard` | Illustrated image + label + checkbox; tap to check off with pop animation |
| `TaskListView` | Scrollable vertical list of all task cards (list mode) |
| `TaskCardSwipeView` | Full-screen single task card; swipe left/right to navigate (card mode) |
| `RoutineFilter` | Horizontal pill/chip selector at top of RoutineView to filter by routine or show all |
| `ViewModeToggle` | List/Card toggle icon in RoutineView header; preference stored per kid |
| `ProgressBar` | Animated fill bar showing X/N tasks done |
| `CelebrationModal` | Confetti + star burst animation on routine completion |
| `StreakBadge` | Displays current day streak with flame icon 🔥 |
| `EditRoutine` | Add/remove/reorder tasks; image picker from task image library |
| `ThemeSelector` | 3-option UI theme picker stored per kid |
| `CelebrationThemeSelector` | 5-option celebration theme picker (Unicorn, Cars, Animals, Space, Classic) |
| `HistoryView` | Day-wise completed task log with date picker/filter |
| `KidProfileForm` | Name + avatar emoji + theme for new/edit kid |

---

## Features Detail

### Task Images
- Each task has a dedicated **kid-friendly illustrated image** (not emoji) that visually represents the task
- Images are colorful, cartoon-style SVG or PNG illustrations (e.g., a toothbrush + toothpaste for "Brush Teeth", a sun rising for "Wake Up")
- Images sourced from a free illustrated icon set (e.g., OpenMoji high-res PNGs, or custom SVG illustrations)
- Each task in `prebuiltRoutines.js` maps to a specific image asset in `src/assets/tasks/`
- When parents add custom tasks, they pick from a library of available task images or search by keyword
- Custom tasks with no image selected show a neutral placeholder illustration (e.g., a star/checkmark icon) until an image is chosen

### Task View Modes
Kids (or parents) choose one of two modes for viewing tasks within a routine, stored per kid profile:

**Card Mode (Swipe)**
- One task displayed at a time as a large, full-width card
- Swipe left to go to the next task, swipe right to go back (Framer Motion drag)
- Tap the card / large checkbox to check off the task
- Dot indicator at the bottom showing current task position (e.g., ● ○ ○ ○)
- Swipe is touch-friendly and ideal for toddlers
- After the last task is checked, trigger celebration

**List Mode (Scroll)**
- All tasks shown as a vertical scrollable list
- Each task is a row card with image, label, and checkbox
- Tasks checked off appear with grayscale + strikethrough
- Standard scroll navigation
- Progress bar at top

**Mode toggle**: Small icon button (grid/list icon) in the top-right of the Routine View header. Stored in `kids[].taskViewMode`. Defaults to "Card" mode for the best toddler experience.

**Celebration trigger with filter**: Celebration fires per individual routine — when all tasks in a given routine are completed, regardless of what filter is active. If "All Tasks" is shown and a kid completes all tasks of the Morning routine, the Morning celebration fires.

### Routine Filter in Routine View
- Shown at the top of the Routine View (both modes) as **horizontal scrollable pill/chip buttons**
- Options: "All Tasks" + one chip per routine the kid has (Morning, Bedtime, After School, + any custom)
- Selecting a chip filters the task list/cards to only that routine's tasks
- "All Tasks" shows tasks from all routines combined in order
- Filter state is session-only (resets on leaving the view)

### Task Check-off & Uncheck
- Large tap target (min 56px height) for small fingers
- Task image displayed prominently at top of each card
- Tap to check: pop/bounce animation (Framer Motion `scale` + `opacity`) + ding sound
- **Tap again to uncheck**: reverses the animation, restores full-color image, decrements star count by 1
- If the routine was already marked "fully completed" and a task is unchecked:
  - Dismiss the celebration state, re-open the routine as in-progress
  - Also remove the +3 bonus completion stars from the kid's total
- Grayscale + checkmark overlay on completed task image; removed on uncheck

### Stars & Badges
- 1 star per task completed
- Bonus +3 stars for completing the full routine
- Star total shown in kid's profile and dashboard header
- Badge milestones: 10 tasks = "Good Start" 🌟, 50 = "Superstar" ⭐, 100 = "Champion" 🏆

### Celebration Animation
- Full-screen overlay with **themed celebration** — kid picks their celebration theme separately from the UI theme
- "You did it, [Name]! 🎉" message with theme-appropriate styling
- Sound: short fanfare jingle matched to theme
- Auto-dismiss after 3s or tap to dismiss

**Celebration Themes** (selectable per kid):

| Theme | Animation | Elements |
|---|---|---|
| 🦄 **Unicorn** | Rainbow sparkles + shooting stars | Unicorn character, pastel colors, glitter rain |
| 🚗 **Cars** | Zooming cars across screen | Race cars, checkered flags, confetti in car shapes |
| 🐾 **Animals** | Animals dancing/jumping | Cute animals bouncing, paw print confetti |
| 🚀 **Space** | Rockets + stars + planets floating | Astronaut character, planet icons, star burst |
| 🎊 **Classic** | Standard confetti burst | Rainbow confetti, star burst, balloons |

Each celebration theme includes:
- Animated background scene (CSS + Framer Motion)
- Theme-specific character/mascot illustration
- Matching particle/confetti shapes
- Matching sound effect

### History View
- Accessible from kid dashboard via a "History" / 📅 button
- Shows a **day-by-day list** of completed routines and tasks for the selected kid
- **Date filter**: date picker (or previous/next day arrows + calendar popup) to jump to any date
- Each day entry shows:
  - Date header (e.g., "Monday, May 5")
  - Each routine attempted that day with completion status (✅ fully completed / 🔶 partial)
  - Expandable list of individual tasks completed for that routine
  - Stars earned that day
- Defaults to today's date on open; scrolls backward through history
- Sourced from the `progress[]` entries in localStorage

### Daily Streak Tracker
- A streak day is counted when **at least one routine is fully completed** for that kid on a given day
- Compare today's date with `lastCompletedDate` on kid profile
- Increment streak if yesterday was completed; reset to 1 if gap > 1 day; 0 on first use
- `lastCompletedDate` updated in localStorage whenever a routine reaches `fullyCompleted = true`
- 🔥 streak counter shown on kid dashboard

### Sound Effects
- Task check: soft pop/ding
- Routine complete: fanfare jingle (theme-specific)
- **Mute toggle**: on/off button in Settings — stored in localStorage; silences all sounds globally

### Multiple Kids
- Profiles stored as array in localStorage
- Each kid has independent: routines, stars, streak, theme
- Switch kids from home screen

### Navigation (Back & Home Buttons)
Every screen except the Home screen shows two persistent navigation controls in the top-left header area:
- **← Back button**: Returns to the previous screen
- **🏠 Home button**: Returns directly to the Home / Kid Selector screen from anywhere
- Both buttons are large tap targets (min 44px) for easy use by young kids
- The Celebration modal is an overlay — nav buttons not shown over it; user dismisses first

### Open Editing (no password)
- Floating ✏️ / ⚙️ button enters edit mode (accessible from Kid Dashboard and Routine View)
- Add, rename, reorder, delete tasks via drag-and-drop or up/down arrows
- Add new routines with custom name and type

---

## File Structure

```
src/
  components/
    Header.jsx              -- shared top bar: ← Back + 🏠 Home buttons
    KidSelector.jsx
    KidDashboard.jsx
    RoutineView.jsx
    TaskCard.jsx
    TaskListView.jsx
    TaskCardSwipeView.jsx
    RoutineFilter.jsx
    ViewModeToggle.jsx
    ProgressBar.jsx
    CelebrationModal.jsx
    StreakBadge.jsx
    EditRoutine.jsx
    ThemeSelector.jsx
    CelebrationThemeSelector.jsx
    KidProfileForm.jsx
    HistoryView.jsx
  hooks/
    useKids.js        -- CRUD for kid profiles
    useRoutines.js    -- CRUD for routines & tasks
    useProgress.js    -- daily progress + streak logic
    useTheme.js       -- active theme context
    useSound.js       -- play sounds, mute toggle, load audio assets
  data/
    prebuiltRoutines.js       -- seed data for morning/bedtime/afterschool
    themes.js                 -- UI theme config objects (colors, fonts, mascot)
    celebrationThemes.js      -- celebration theme configs (animations, assets, sounds)
    badges.js                 -- badge milestone definitions
    taskImageLibrary.js       -- mapping of task names → image asset paths
  assets/
    tasks/                    -- illustrated task images (SVG/PNG)
      brush-teeth.svg
      wake-up.svg
      pray-time.svg
      get-dressed.svg
      eat-breakfast.svg
      ... (one per task)
    celebrations/
      unicorn/
      cars/
      animals/
      space/
      classic/
  sounds/
    ding.mp3
    fanfare-unicorn.mp3
    fanfare-cars.mp3
    fanfare-animals.mp3
    fanfare-space.mp3
    fanfare-classic.mp3
  App.jsx
  main.jsx
index.html
vite.config.js        -- base: '/turtle-star/' for GitHub Pages
.github/
  workflows/
    deploy.yml        -- build & publish to gh-pages branch on push to main
```

---

## Verification Plan

1. **Kid profiles**: Create 2 kids → verify both appear on home screen with correct avatars
2. **Pre-built routines**: First launch seeds Morning/Bedtime/After School for each kid
3. **Task check-off**: Tap tasks → check animation plays → progress bar updates → star count increments
4. **Routine completion**: Check all tasks → celebration modal appears with animation + sound
5. **Streak tracking**: Complete a routine → check streak = 1; complete next day → streak = 2; skip a day → streak resets
6. **Theme switching**: Switch theme per kid → entire UI updates immediately
7. **Edit mode**: Add/remove tasks → changes persist after page refresh (localStorage)
8. **Uncheck tasks**: Check a task → uncheck it → star count decrements, task restores to incomplete; complete a routine then uncheck a task → celebration dismisses, routine returns to in-progress
9. **History view**: Complete routines across 2 days → open History → verify both days appear; use date picker to navigate between dates
10. **Card mode**: Open routine in card mode → swipe left through tasks → check a task → verify dot indicator updates; swipe right to go back
11. **List mode**: Switch to list mode → all tasks visible as scrollable list → check off tasks normally
12. **Routine filter**: Open routine view → select a specific routine chip → verify only that routine's tasks are shown; select "All Tasks" → all tasks shown
13. **View mode persistence**: Set card mode, close, reopen → still in card mode
14. **Celebration with filter**: Set filter to "All Tasks", complete all Morning tasks → Morning celebration fires
15. **Mute toggle**: Enable mute in Settings → check off task → no sound; disable mute → sounds resume
16. **Back button**: From RoutineView → tap Back → returns to Kid Dashboard; from History → tap Back → returns to Kid Dashboard
17. **Home button**: From RoutineView (3 screens deep) → tap Home → returns to Kid Selector
18. **Mobile**: Test on 375px viewport (iPhone SE) — all tap targets ≥ 56px, no horizontal scroll
19. **Offline**: Disconnect network → app still fully functional
