# GDM Quiz App - Project Documentation

## Project Overview
An interactive quiz application focused on Gestational Diabetes Mellitus (GDM) education. The app features a chatbot-style quiz interface with authentication, random question selection, and educational tips.

**Created by:** Chukwuma I. Onyeije, MD, FACOG (Atlanta Perinatal Associates)

## Tech Stack
- **Framework:** React 19.1.0 with Vite 7.0.0
- **Styling:** Tailwind CSS 4.1.11 (via PostCSS and CDN)
- **Authentication:** Firebase Authentication 11.9.1
- **Deployment:** GitHub Pages (gh-pages)
- **Build Tool:** Vite with Hot Module Replacement (HMR)
- **Linting:** ESLint 9.29.0 with React plugins

## Project Structure
```
gdm-quiz-app/
├── public/
│   └── vite.svg                 # Default Vite logo
├── src/
│   ├── assets/
│   │   └── react.svg           # React logo
│   ├── App.jsx                 # Main app component with quiz logic
│   ├── LoginPage.jsx           # Authentication UI component
│   ├── firebase.js             # Firebase configuration
│   ├── App.css                 # Component styles
│   ├── index.css               # Global styles
│   └── main.jsx                # React app entry point
├── .gitignore                  # Git ignore patterns
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point with Tailwind CDN
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Locked dependencies
├── vite.config.js              # Vite configuration
└── WARP.md                     # This file

```

## Key Features

### 1. Authentication System
- **Firebase Authentication** with multiple methods:
  - Google OAuth
  - GitHub OAuth
  - Email/Password (sign up and sign in)
- Authentication state management via `onAuthStateChanged`
- Secure logout functionality
- Protected quiz access (requires authentication)

### 2. Quiz Functionality
- **Question Bank:** 25 comprehensive GDM questions covering:
  - GDM basics and definition
  - Risk factors and screening
  - Dietary management
  - Medication (insulin, metformin)
  - Home monitoring
  - Complications
  - Postpartum care
  - Breastfeeding benefits
- **Random Selection:** 10 questions randomly selected per quiz session
- **Interactive Chatbot UI:** Questions presented conversationally
- **Instant Feedback:** Immediate response after each answer
- **Educational Tips:** Contextual learning content after each question
- **Score Tracking:** Real-time score display in header
- **Quiz Restart:** Ability to start new quiz with different questions

### 3. UI/UX Design
- **Gradient Background:** Indigo, purple, and pink gradient theme
- **Glassmorphism Effects:** Backdrop blur and transparency
- **Responsive Layout:** Mobile-friendly design
- **Chat Interface:**
  - Bot messages (left-aligned with bot icon)
  - User messages (right-aligned with user icon)
  - Smooth scrolling to latest message
  - Option buttons for answers
- **Sticky Header:** Score and logout always visible
- **Loading States:** Loading indicator during auth check

## Component Architecture

### App.jsx (Main Component)
The main file contains three key components:

1. **App (Default Export)**
   - Root component handling authentication state
   - Renders `LoginPage` or `GdmQuiz` based on auth status
   - Manages Firebase auth listener
   - Provides logout handler

2. **LoginPage**
   - Duplicate implementation in `App.jsx` (note: also exists in `LoginPage.jsx`)
   - Social login buttons (Google, GitHub)
   - Email/password form
   - Toggle between sign-up and sign-in modes
   - Error message display

3. **GdmQuiz**
   - Core quiz logic and UI
   - Message state management (chat history)
   - Question randomization and progression
   - Score calculation
   - Quiz lifecycle management

### Supporting Components
- **Icons:** `BotIcon`, `UserIcon`, `GoogleIcon`, `GithubIcon` (inline SVG components)
- **firebase.js:** Firebase app initialization and auth export

## Configuration Files

### vite.config.js
- Base path set to `/gdm-quiz-app/` for GitHub Pages deployment
- React plugin enabled
- Tailwind CSS via PostCSS plugin

### package.json Scripts
```json
{
  "dev": "vite",              // Development server
  "build": "vite build",      // Production build
  "lint": "eslint .",         // Run ESLint
  "preview": "vite preview",  // Preview production build
  "predeploy": "npm run build", // Pre-deployment build
  "deploy": "gh-pages -d dist"  // Deploy to GitHub Pages
}
```

### eslint.config.js
- Modern flat config format
- React Hooks rules enabled
- React Refresh plugin for Vite
- Browser globals configured
- Custom rule: Allow unused vars with uppercase pattern

## Firebase Configuration
**Note:** Firebase API keys are currently exposed in `App.jsx` (lines 20-27) and `firebase.js`

**Firebase Project Details:**
- Project ID: `gdm-quiz-app`
- Auth Domain: `gdm-quiz-app.firebaseapp.com`
- Enabled Auth Providers: Google, GitHub, Email/Password

**⚠️ Security Consideration:** Move Firebase config to environment variables for production

## Styling Approach
**Hybrid Tailwind Implementation:**
- Tailwind CSS loaded via CDN (`index.html` line 10)
- PostCSS plugin also configured in `vite.config.js`
- Utility-first CSS classes throughout components
- Custom gradient backgrounds and glassmorphism effects

## Development Workflow

### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment
```bash
# Deploy to GitHub Pages
npm run deploy
```

The app is configured for GitHub Pages with base path `/gdm-quiz-app/`

## Code Quality Notes

### Strengths
- Clean component separation
- Effective use of React hooks (`useState`, `useEffect`, `useRef`)
- Smooth animations and transitions
- Accessible UI with focus states
- Educational content integrated seamlessly

### Potential Improvements
1. **Environment Variables:** Move Firebase config to `.env` file
2. **Component Duplication:** `LoginPage` component exists in both `App.jsx` and `LoginPage.jsx`
3. **TypeScript Migration:** Consider adding TypeScript for better type safety
4. **Testing:** Add unit and integration tests
5. **State Management:** Consider Context API or state management library for larger scale
6. **Accessibility:** Add ARIA labels and keyboard navigation improvements
7. **Error Boundaries:** Add React error boundaries for better error handling
8. **Loading States:** Add loading indicators during Firebase operations
9. **Responsive Testing:** Ensure all breakpoints are tested
10. **Firebase Security Rules:** Configure Firebase security rules for production

## Quiz Content Management
Questions are currently hardcoded in `App.jsx` (lines 162-187). Consider:
- Moving to external JSON file
- Firebase Firestore for dynamic content management
- Admin panel for question CRUD operations

## Browser Compatibility
- Modern browsers with ES2020 support
- Requires JavaScript enabled
- Firebase SDK compatibility requirements

## Dependencies Overview
**Production:**
- `react` & `react-dom`: ^19.1.0
- `firebase`: ^11.9.1
- `@tailwindcss/postcss`: ^4.1.11

**Development:**
- `vite`: ^7.0.0
- `@vitejs/plugin-react`: ^4.5.2
- `eslint`: ^9.29.0 (with React plugins)
- `tailwindcss`: ^4.1.11
- `gh-pages`: ^6.3.0
- `autoprefixer`: ^10.4.21

## License & Credits
This is a private educational project created by Dr. Chukwuma I. Onyeije, MD, FACOG.

## Related Files
- Repository: `https://github.com/chukwumaonyeije/gdm-quiz-app`
- GitHub Pages URL: (configured for deployment)

## Maintenance Notes
- Firebase API keys should be rotated and moved to environment variables
- Regular dependency updates recommended
- Quiz content should be reviewed periodically for medical accuracy
- Consider adding analytics to track quiz completion rates

---

## Modernization Plan

### Overview
The GDM Quiz App is undergoing a comprehensive modernization to transform it into a high-performance, mobile-first Progressive Web Application (PWA).

### Goals
1. **Modern UI/UX**: Replace legacy styling with Tailwind CSS and Shadcn/UI components
2. **Mobile-First Design**: Ensure 100% responsiveness with touch-optimized interactions
3. **PWA Capabilities**: Enable offline functionality and "Install to Home Screen"
4. **Enhanced Learning**: Add Clinical Pearls modals and improved feedback
5. **Performance**: Achieve Lighthouse scores of 90+ across all metrics
6. **Accessibility**: WCAG 2.1 Level AA compliance

### Implementation Phases

#### Phase 1: Foundation Setup
- Environment variables for Firebase configuration
- Proper Tailwind CSS + Shadcn/UI setup
- PWA foundation with vite-plugin-pwa
- Component cleanup and organization

#### Phase 2: UI Component Overhaul
- Replace custom UI with Shadcn components (Card, Button, RadioGroup, Progress, Dialog)
- Implement mobile-first responsive layouts
- Integrate Framer Motion for smooth animations
- Ensure 44px minimum touch targets

#### Phase 3: Enhanced Logic & Features
- State persistence with localStorage
- Clinical Pearls modal system
- Comprehensive results screen with performance breakdown
- Real-time progress tracking

#### Phase 4: PWA, Performance & Deployment
- Service worker configuration for offline support
- Performance optimization (code splitting, lazy loading)
- Accessibility audit and compliance
- PWA testing on iOS and Android
- Production deployment to GitHub Pages

### Technical Stack Updates
**New Dependencies:**
- `framer-motion`: ^11.x - Animation library
- `vite-plugin-pwa`: ^0.19.x - PWA support
- `@radix-ui/*`: Component primitives for Shadcn/UI
- `class-variance-authority`, `clsx`, `tailwind-merge`: Utility libraries

### New File Structure
```
src/
├── components/
│   ├── icons/          # Extracted icon components
│   ├── layout/         # Container, Header, Footer
│   ├── quiz/           # Quiz-specific components
│   └── ui/             # Shadcn/UI components
├── hooks/              # Custom React hooks
├── lib/                # Utilities (Shadcn)
└── utils/              # Quiz data, animations
```

### Success Metrics
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 90+
- Lighthouse SEO: 90+
- PWA installable on iOS and Android
- Offline mode functional
- All touch targets ≥ 44px
- < 1s Time to Interactive on mobile

### Security Improvements
- Firebase API keys moved to environment variables
- `.env` added to `.gitignore`
- No sensitive data exposed in source code

---

**Last Updated:** 2026-02-19
**Warp Version:** 1.1 (Modernization Plan Added)
