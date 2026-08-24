# Jersey Auto Lease

A modern automotive marketplace platform for browsing, leasing, and auctioning vehicles. Built as a full-featured dealership website with inventory management, live auctions, and customer relationship management capabilities.

## 🎯 Problem & Solution

Traditional automotive dealerships lack modern, responsive web interfaces for showcasing inventory and managing customer interactions. Jersey Auto Lease provides a polished, mobile-first platform where customers can browse vehicles, participate in live auctions, and connect with the dealership — while administrators manage inventory and customer relationships through an integrated dashboard.

## 🚀 Tech Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 5.4
- **UI Components**: shadcn/ui + Radix UI primitives
- **Styling**: Tailwind CSS with custom animations
- **Routing**: React Router 6.30
- **State Management**: Zustand (car inventory), React Query (async state)
- **Forms**: React Hook Form with Zod validation
- **Backend**: Supabase (database + auth client configured)
- **Icons**: Lucide React

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ and npm (install via [nvm](https://github.com/nvm-sh/nvm))

### Quick Start

```bash
# Clone the repository
git clone <repo-url>
cd jersey-auto-lease

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run at `http://localhost:5173` (or the next available port).

### Environment Variables

The app uses Supabase for backend services. Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

**Note**: Supabase integration is configured but not required for local development. The app will work with mock data (see Status section below).

## 🗂️ Project Structure

```
src/
├── components/
│   ├── home/           # Landing page sections (hero, featured cars, testimonials)
│   ├── layout/         # Navbar, footer, theme switcher
│   └── ui/             # Reusable shadcn/ui components
├── pages/
│   ├── Index.tsx       # Landing page
│   ├── Inventory.tsx   # Vehicle browse & filter
│   ├── Auctions.tsx    # Live auction listings
│   ├── VehicleDetail.tsx
│   ├── AdminDashboard.tsx     # CRM dashboard (conversations, tickets)
│   ├── AdminInventory.tsx     # Inventory management
│   ├── Financing.tsx
│   ├── Contact.tsx
│   └── About.tsx
├── lib/
│   ├── carStore.ts     # Local storage-backed vehicle inventory (1,300+ entries)
│   ├── vehicleData.ts  # Vehicle make/model reference data (Honda, Mazda, Toyota 2026)
│   └── utils.ts        # Tailwind class utilities
└── integrations/
    └── supabase/       # Supabase client & type definitions
```

## ✨ Features

### Customer-Facing

- **Inventory Browser**: Advanced filtering by make, model, year, price range; grid/list views
- **Live Auctions**: Real-time countdown timers, bid tracking, auction status (live/upcoming/ended)
- **Vehicle Details**: Comprehensive specs, image galleries, feature lists
- **Dark/Light Themes**: System-aware theme switching
- **Responsive Design**: Mobile-first, touch-optimized interface

### Admin Features

- **CRM Dashboard**: Customer conversations, support tickets, real-time statistics
- **Inventory Management**: Add/edit/delete vehicles with rich metadata
- **External API Integration**: Hardcoded Novita.ai sandbox endpoint for demo CRM data

## 🏗️ Status

**Current State**: This is a polished UI scaffold with extensive frontend functionality. The app demonstrates:

✅ **What Works**:
- Full navigation and routing
- 1,300+ mock vehicles with detailed specs (stored in `carStore.ts`)
- Rich filtering, sorting, and search
- Live auction UI with countdown timers
- Admin dashboard with mock API integration
- Theme switching and responsive layouts
- Production-ready component architecture

⚠️ **What's Mock/Scaffold**:
- **Backend**: Supabase client is configured but not connected to live data. Vehicle inventory uses local storage with hardcoded seed data.
- **Authentication**: No auth implementation; admin routes are publicly accessible.
- **Auctions**: UI only — no real bidding logic or WebSocket connections.
- **CRM**: Admin dashboard fetches from hardcoded sandbox API (`novita.ai`) for demo purposes.
- **Payments/Financing**: Contact forms only; no payment processing.

This project showcases frontend development skills, component architecture, and TypeScript proficiency. Backend integration would require:
1. Supabase schema setup (vehicles, users, auctions tables)
2. Auth provider configuration (Supabase Auth or similar)
3. Real-time auction infrastructure (WebSockets or Supabase Realtime)
4. Payment gateway integration (Stripe, etc.)

## 🛠️ Available Scripts

```bash
npm run dev          # Start dev server with HMR
npm run build        # Production build (outputs to dist/)
npm run build:dev    # Development build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## 📄 License

Private project — not licensed for redistribution.

---

**Developed by**: Mina Andrawes (mayo3030)  
**Portfolio**: *Add your portfolio URL here*  
**Contact**: *Add your email here*
