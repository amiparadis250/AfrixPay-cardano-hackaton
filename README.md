# Blockchain Remittance Platform UI (Next.js App Router)

This is a Next.js application for a Blockchain Remittance Platform UI, converted from the original Vite React project to use Next.js App Router.

## Features

- **Next.js 15** with App Router
- **TypeScript** support
- **Tailwind CSS** for styling
- **Radix UI** components
- **Lucide React** icons
- Responsive design
- Modern blockchain remittance interface

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication page
│   ├── dashboard/         # Dashboard page  
│   ├── send/              # Send money page
│   ├── success/           # Transaction success page
│   ├── transactions/      # Transaction history page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── figma/            # Figma-specific components
│   └── *.tsx             # Page components
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Key Changes from Vite to Next.js

1. **Routing**: Converted from React Router to Next.js App Router
2. **Navigation**: Updated from `useNavigate` to `useRouter` and `usePathname`
3. **State Management**: Using `sessionStorage` for transaction data instead of router state
4. **Client Components**: Added `'use client'` directive where needed
5. **Configuration**: Added Next.js, PostCSS, and Tailwind configurations

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Technologies Used

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- Lucide React
- PostCSS
- Autoprefixer

## Original Project

The original Figma design is available at: https://www.figma.com/design/yPngPnY3dZ5IYDrWhQa3ua/Blockchain-Remittance-Platform-UI--Community-