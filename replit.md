# Watanuki/Kamanime - Anime Streaming Platform

## Overview

Watanuki (also branded as Kamanime) is a modern anime streaming web application that provides users with a sleek, responsive interface to discover and watch anime content. The application is built as a single-page application (SPA) that consumes external anime APIs to deliver streaming content with both SUB and DUB options in HD quality.

The platform emphasizes user experience with features like infinite scrolling, lazy loading, genre-based filtering, and a visually appealing interface with glassmorphic design elements and neon-themed styling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- **React 18.3** with functional components and hooks as the primary UI framework
- **Vite** as the build tool and development server for fast hot module replacement
- **React Router DOM** for client-side routing and navigation

**State Management Strategy**
- **Zustand** for global state management with multiple stores:
  - `sidebarStore`: Controls sidebar visibility
  - `genresStore`: Manages genre filter selections
  - `toptenStore`: Caches top 10 anime data
  - `bigPosterStore`: Controls large poster modal display
- **React Query (TanStack Query)** for server state management, caching, and data fetching with built-in retry logic and optimistic updates

**UI/UX Design Patterns**
- **Tailwind CSS** for utility-first styling with custom color theming (purple/violet, cyan, magenta)
- Custom CSS variables for theme management supporting dark mode (primary) and light mode
- Glassmorphic design with backdrop blur effects (`glass` utility classes)
- Neon-themed borders and glow effects for interactive elements
- Responsive design optimized for both desktop and mobile viewports

**Component Architecture**
- Lazy loading images using `react-lazy-load-image-component` for performance optimization
- Infinite scrolling via `react-infinite-scroll-component` for content pagination
- Swiper library for carousel/slider implementations (hero section)
- SEO optimization using `react-helmet` for dynamic meta tags
- Toast notifications via `react-toastify` for user feedback

### Data Fetching & API Integration

**API Service Layer**
- Two separate API configurations (`useApi.js` and `useApi2.js`) for different backend endpoints
- Environment-based API URL switching (development vs production modes)
- Custom hooks wrapping React Query:
  - `useApi`: Standard paginated queries with retry logic
  - `useInfiniteApi`: Infinite query implementation for endless scrolling

**API Proxy Configuration**
- Vercel proxy rewrites configured to route `/api/*` requests to external anime API (`https://eren-world.onrender.com/api/v1/`)
- Enables CORS bypass and simplifies API endpoint management
- SPA fallback routing for client-side navigation

**Backend Communication**
- Axios for HTTP requests with centralized error handling
- No authentication layer implemented (public API consumption)
- API responses cached by React Query with configurable stale times

### Video Streaming Infrastructure

**Player Libraries**
- **ArtPlayer** (v5.2.3): Primary advanced video player
- **Plyr** (v3.7.8): Alternative player option
- **Video.js** (v8.21.0): Fallback video player
- **HLS.js** (v1.6.5): HTTP Live Streaming protocol support for adaptive bitrate streaming

**Streaming Strategy**
- Multiple player options provide fallback mechanisms for browser compatibility
- HLS streaming enables adaptive quality based on network conditions
- Player selection likely determined at runtime based on content source

### Styling & Theming System

**Design System**
- Custom color palette with semantic naming:
  - Primary: Purple/Violet (#a855f7)
  - Secondary: Cyan (#06b6d4)
  - Accent: Magenta/Pink (#ec4899)
  - Dark backgrounds with gradient overlays
- CSS custom properties for runtime theme switching
- Tailwind configuration extends default theme with custom color scales

**Animation & Interactivity**
- **Framer Motion** for declarative animations and page transitions
- Smooth scroll behavior enabled globally
- Progress indicators using `react-circular-progressbar`

### Development Tools & Quality

**Code Quality**
- ESLint with React-specific rules and hooks validation
- React Refresh plugin for fast refresh during development
- Strict mode disabled for component exports to allow constant exports

**Performance Optimizations**
- Image lazy loading to reduce initial page load
- React Query caching minimizes redundant API calls
- Code splitting via React Router for route-based chunks
- Vite's fast build and HMR capabilities

**Anti-Debugging Measures**
- Custom dev tools detection utility (`devToolDetection.js`) that attempts to prevent reverse engineering
- Debugger statement injection at intervals to detect open developer tools
- Note: This is an unusual pattern that may interfere with legitimate debugging

### Deployment & Hosting

**Production Build**
- Vite production builds with optimized bundles
- Static file serving with SPA fallback routing
- Vercel deployment configuration with API proxying

**Environment Configuration**
- Environment variables for API URL configuration
- Mode-based switching between local/development and production APIs
- Server runs on port 5000 with host binding to 0.0.0.0 for containerization compatibility

## External Dependencies

### Third-Party APIs
- **Primary Anime API**: `https://eren-world.onrender.com/api/v1/` - Main data source for anime metadata, episodes, and streaming links
- **Secondary API**: Configuration exists for alternate API endpoint (serverUrl2)
- API endpoints likely provide:
  - Anime search and discovery
  - Genre filtering
  - Episode listings
  - Streaming URLs
  - Top 10/trending anime

### External Services
- **Google Fonts**: Poppins and Inter font families loaded from Google's CDN
- **Vercel**: Hosting and deployment platform with serverless functions support

### Content Delivery
- No dedicated CDN configuration for static assets (relies on Vercel's edge network)
- Video content streamed directly from API-provided URLs
- Image assets likely served through anime API responses

### Browser APIs & Features
- Local Storage: Implied usage for caching and persistence (React Query default)
- Intersection Observer: Used by infinite scroll and lazy loading components
- Media Session API: Potentially used by video players for media controls

### Development Dependencies
- Node.js ecosystem with Yarn package manager (v1.22.22)
- PostCSS with Autoprefixer for CSS vendor prefixing
- Tailwind CSS JIT compiler for on-demand utility generation