# Praedex Holdings - Real Estate MVP

Investor-ready real estate web app built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. Install root and backend dependencies:
```bash
npm install
npm --prefix backend install
```

2. Run the development servers (in two terminals):
```bash
# Terminal 1: start backend API
npm run dev:backend

# Terminal 2: start Next.js frontend
npm run dev
```

3. Open the app in your browser:

- Frontend: http://localhost:3006
- Backend API: http://localhost:5000/api

Alternatively, start both with a single command (Windows shells only):
```bash
npm run dev:all
```
Note: `dev:all` uses a simple background `&` and is intended for quick local testing. For a robust single-command setup, consider installing `concurrently` or `npm-run-all`.

## 📁 Project Structure

```
praedex-holdings/
├── app/
│   ├── layout.tsx              # Root layout with Navbar
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles
│   ├── properties/
│   │   ├── page.tsx            # Properties listing page
│   │   └── [id]/
│   │       └── page.tsx        # Property details page
│   └── list/
│       └── page.tsx            # List property form
├── components/
│   ├── Navbar.tsx              # Navigation component
│   └── PropertyCard.tsx        # Property card component
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.js
```

## 🎯 Features

- ✅ Homepage with hero section and value propositions
- ✅ Properties listing page with mock data
- ✅ Property details page with full information
- ✅ List property form (frontend only, no backend)
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Server and Client components

## 📄 Pages

- **Home** (`/`) - Hero section and value props
- **Properties** (`/properties`) - List of all properties
- **Property Details** (`/properties/[id]`) - Individual property details
- **List Property** (`/list`) - Form to list new properties

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Functional React components
- **Data**: Mock/demo data in arrays

## 📝 Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linter
```

## 🐳 Run with Docker (no Node/npm required locally)

If you have Docker installed you can run both services together:

```bash
# Build and start containers
docker compose up --build

# Frontend: http://localhost:3006
# Backend API: http://localhost:5000/api
```

To stop and remove containers:

```bash
docker compose down
```

## 📱 Design Notes

- Clean, professional design inspired by Airbnb
- Mobile-responsive layout
- Blue color scheme for premium feel
- Consistent spacing and typography
- Hover effects and smooth transitions

## 🔄 Future Enhancements

- Backend API integration
- User authentication
- Property search and filters
- Real maps integration
- Image uploads
- Property bookmarking
- User reviews and ratings
