# SpaceX Mission Control - Development Process

This document walks through my journey building this application - from initial planning to final implementation. I'll share the decisions I made, why I made them, and how I used AI as a tool (not a crutch) throughout the process.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Part 1: Initial Planning & Architecture

### The First Hour: Thinking Before Coding

When I first read the requirements, I didn't jump into code. I spent time thinking about what this app really needed to be. The requirements said "dashboard" but I wanted it to feel like actual mission control - not just another CRUD app with SpaceX data.

I sketched out on paper (yes, actual paper) what the architecture should look like. I drew boxes and arrows showing how data would flow, where state would live, and how components would talk to each other. This planning phase saved me hours later.

### Architecture Decisions

**Four-Layer Structure**

I organized the app into four clear layers:

1. **Presentation Layer** (`app/`) - Next.js pages and layouts
2. **Component Layer** (`components/`) - Reusable UI pieces
3. **Logic Layer** (`lib/`) - Business logic, API calls, utilities
4. **Data Layer** (`types/`) - TypeScript definitions

Why this structure? Because I've learned from past projects that mixing concerns is a recipe for spaghetti code. When you need to change how data is fetched, you shouldn't have to touch the UI components. When you need to redesign a component, you shouldn't have to worry about breaking the API layer.

**Component Organization**

Inside `components/`, I further split things:

- `ui/` - Generic components (Button, Badge, Card) - stuff I could reuse in any project
- `launches/` - Domain-specific components (LaunchCard, LaunchDetail)
- `states/` - Loading, Error, Empty states - these are always needed
- `layout/` - Structural components (Sidebar)

This isn't some textbook pattern - it's what I've found actually works in real projects. When you come back to code 3 months later, this structure makes sense immediately.

---

## Part 2: Tech Stack Choices

### Next.js 14 (App Router)

- **Why**: It's what Finsphera uses (per the job description). But also, I genuinely prefer it over Create React App. The image optimization alone saves so much hassle.
- **Trade-off**: App Router is newer and has fewer Stack Overflow answers. But the official docs are solid.

### TanStack Query (React Query)

This one I debated. I could have just used `fetch` in a `useEffect` and called it a day. But here's why I went with React Query:

- **Automatic caching** - The SpaceX API is slow sometimes. React Query caches responses, so navigating back doesn't re-fetch.
- **Loading/Error states** - Instead of managing 3 pieces of state (`loading`, `error`, `data`), React Query handles it.
- **No boilerplate** - I've written the "fetch in useEffect" pattern a million times. Why write it again?

The learning curve paid off in about 20 minutes. After that, adding new data fetching was trivial.

### Tailwind CSS

I know some people hate utility classes. I used to be one of them. But after using Tailwind on my personal projects, I'm converted. Why?

- **No context switching** - I don't jump between files to edit styles
- **Consistency** - The spacing scale forces good design decisions
- **Speed** - Building a card component takes 2 minutes, not 20

I created a custom design system in `tailwind.config.ts` with space-themed colors (`space-900`, `rocket-500`, etc.). This made the whole app feel cohesive without much effort.

### Framer Motion

For animations. I debated this one - is it overkill? But the modal animations and stagger effects on the detail view made the app feel polished. It's 9kb gzipped. Worth it.

### TypeScript (Strict Mode)

Non-negotiable for me. I've debugged too many "Cannot read property 'x' of undefined" errors at 2am. Strict TypeScript catches these at compile time.

The `noUncheckedIndexedAccess` flag is extra strict, but it forces you to handle edge cases. Yes, it's annoying. But it prevents bugs.

---

## Part 3: AI Usage - Being Transparent

Let me be completely honest about how I used AI (Claude, specifically):

### What I Used AI For:

**1. Boilerplate Generation (~30% of code)**

- TypeScript interfaces from the SpaceX API docs
- Initial component structure (the repetitive stuff)
- Utility function skeletons

Example: I'd prompt: "Create a TypeScript interface for this SpaceX API response" and paste the JSON. Claude would generate the types. I'd review them, fix issues, and move on.

**2. Debugging Specific Errors**
When I hit the CORS error with the API (see Challenges section), I asked Claude about Next.js API routes. It suggested creating a proxy. I implemented it, tested it, realized it was overkill, and just increased the timeout instead.

**3. Documentation Drafting**
I had Claude help draft sections of the README. But I rewrote most of it in my own voice.

### What I Did NOT Use AI For:

**1. Architecture Decisions**
The four-layer structure, component organization, state management approach - that's from my experience, not from prompting.

**2. Design System**
The space theme, color choices, spacing decisions - I designed this myself. AI suggested generic blue/white palettes. I wanted it to feel like mission control.

**3. Problem Solving**
When the app was stuck in loading state, I debugged it myself with console.logs and network tab inspection.

### How I Used AI Effectively:

**Good Prompts I Used:**

- "Create TypeScript types for this API response: [paste JSON]"
- "Show me how to configure Vitest with Next.js 14"
- "What's the best practice for handling API errors in React Query?"

**Bad Prompts I Avoided:**

- "Build me a SpaceX dashboard" (too vague, would get generic code)
- "Fix this bug" (without showing what I tried first)

**My Process:**

1. Try to solve it myself first
2. If stuck for >20 minutes, ask AI
3. Review AI's suggestion critically
4. Implement my own version
5. Test thoroughly

The key is: AI is a rubber duck that talks back. It's great for brainstorming and catching obvious mistakes. But you need to know enough to spot when it's wrong.

---

## Part 4: Design Decisions

### The "Mission Control" Theme

I wanted this to feel like you're actually at SpaceX mission control, not just browsing a list. So I made specific design choices:

**Dark Theme with Space Colors**

- Background: `#0a0e1a` (deep space)
- Accent: Orange (`#f59e0b`) for that rocket flame feel
- Success green, failure red, upcoming blue

I could have used Material UI or shadcn/ui with default colors. But that would look like every other dashboard.

### Layout:

**Why Sidebar?**
Filters and stats need to be always visible. Putting them in the sidebar keeps the main content clean.

**Why Modal for Details?**
The detail view has a lot of info (links, failure details, full descriptions). A modal keeps you in context - you're still on the main page, just focusing on one launch.

**Responsive Strategy**
Mobile was tricky. The sidebar takes valuable space on small screens. So:

- Desktop: Fixed sidebar (always visible)
- Mobile: Drawer that slides in (hidden by default)

This required `useMediaQuery` hooks and careful Tailwind breakpoints. It was tedious but necessary.

### Microinteractions

Small details that make it feel polished:

- Card hover: Slight lift (`translateY(-4px)`) with orange glow shadow
- Status badges: Success badges pulse subtly
- Modal: Content staggers in (Framer Motion)
- Loading: Shimmer animation instead of spinners

## Part 5: Challenges & How I Solved Them

### Challenge 1: SpaceX API is Slow

**The Problem:**
The API sometimes takes 30+ seconds to respond. The app would just hang with loading skeletons forever.

**What I Tried:**

1. ~~Different endpoints~~ - All slow
2. ~~Caching in localStorage~~ - Overcomplicated

**Final Solution:**

- Increased timeout to 30 seconds (from 10)
- Added retry logic with exponential backoff
- React Query's `staleTime` (5 minutes) reduces refetches
- Created mock data for development (when API is down)

**Trade-off:** 30-second timeout isn't ideal, but the API genuinely takes that long sometimes. Better to wait than fail.

### Challenge 2: TypeScript Strict Mode is STRICT

**The Problem:**
With `noUncheckedIndexedAccess` enabled, every array access could be `undefined`. This means:

```typescript
const launches = fetchLaunches(); // Launch[] | undefined
const first = launches[0]; // undefined | Launch | undefined
```

Every. Single. Array. Access.

**The Solution:**
Defensive programming everywhere:

```typescript
const patch = launch.links?.patch?.small ?? null;
```

### Challenge 3: Testing Setup Hell

**The Problem:**
Setting up Vitest with Next.js, TypeScript, React Testing Library, and jsdom was... rough. Errors I hit:

1. "Cannot find module '@/...'" - Path aliases not working
2. "React is not defined" - JSX transform issues
3. "toBeInTheDocument is not a type" - jest-dom matchers not extending Vitest

**The Solution:**

- Fixed path aliases in `vitest.config.ts`
- Added `import React from "react"` to all component files
- Created custom type declarations for jest-dom matchers
- Added proper setup file with mocks

**Time spent:** ~2 hours. This should have taken 30 minutes. But it works now.

### Challenge 4: Modal Accessibility

**The Problem:**
Making a modal accessible is harder than it looks. You need:

- Focus trap (Tab doesn't escape modal)
- Escape key to close
- Click outside to close
- Focus management (when opening/closing)
- Prevent body scroll

**The Solution:**
Framer Motion handles some of this. I handled the rest manually with event listeners and `useEffect` hooks.

---

## Part 6: What I'd Improve With More Time

### 1. Search Functionality

Right now you can filter by status (success/failure/upcoming) and sort by date. But what if you want to find "Starlink-24"? You have to scroll.

**How I'd add it:**

- SearchInput component with debounced input
- Filter launches by name matching
- Highlight matched text

**Why I didn't:** Scope. The requirements didn't mention search, and I wanted to nail the core features first.

### 2. Virtualized List

With 200+ launches, the DOM has 200+ cards rendered. On slower devices, this could lag.

**How I'd fix it:**

- Use `react-window` or `TanStack Virtual`
- Render only visible cards + buffer
- Could handle 10,000+ launches smoothly

**Why I didn't:** Performance is fine with 200 items. Premature optimization.

### 3. More Tests

- End-to-end tests with Playwright
- Visual regression tests
- API mocking tests

**Why I didn't:** Time. I focused on functionality tests first.

---

## Part 7: Things I'm Proud Of

### 1. The Architecture Holds Up

I can add new features easily. Want to add search? Add a `SearchInput` component and update the filter logic. The architecture doesn't fight you.

### 2. Zero `any` Types

Strict TypeScript throughout. Every function, every component has proper types. No escape hatches.

### 3. Error Handling

The app handles errors gracefully:

- Network errors → Show error state with retry
- Missing data → Show fallbacks (no patch image? Show placeholder)
- API timeout → Retry with backoff

### 4. Loading States

No "flash of empty content." Skeleton screens make the app feel faster.

---

## Part 8: Personal Code I Reused

I didn't write everything from scratch. Some utilities came from my personal projects:

### From My UI Library:

- `cn()` utility (clsx + tailwind-merge) - I use this in every project
- Button component structure - I have a similar pattern in my component library
- Modal base implementation - Adapted from my personal site's modal

### From Past Projects:

- Date formatting utilities - Similar to what I built for a crypto dashboard
- Error boundary pattern - From a Next.js e-commerce project
- API client with retry logic - Adapted from a weather app I built

I didn't copy-paste blindly. I adapted these patterns to fit this project's needs. The core logic is project-specific, but the scaffolding is proven code I know works.

---

## Part 9: Final Thoughts

This project took about ~15 hours total:

- Planning & Architecture: 2 hours
- Core Implementation: 6 hours
- Testing Setup & Tests: 2 hours
- Styling & Polish: 2 hours
- Documentation: 2 hours
- Debugging & Fixing: 2 hours

---

### Attached

**- Andrés**
