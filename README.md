# Ragooty Photography Portfolio

A modern, responsive photography portfolio website built with Next.js 15, showcasing the work of Ragooty Sasidharan. This project features a beautiful gallery, smooth animations, and a comprehensive admin system for managing photography content.

## ✨ Features

- **Responsive Design**: Optimized for all devices with a mobile-first approach
- **Image Gallery**: Dynamic gallery with category filtering and blurhash loading
- **Smooth Animations**: Framer Motion powered animations for enhanced UX
- **Admin Dashboard**: Complete content management system
- **Contact Form**: Interactive contact page with form validation
- **SEO Optimized**: Built-in SEO components and meta tags
- **Dark/Light Mode**: Theme switching capability
- **Image Optimization**: Next.js Image component with blurhash placeholders
- **Carousel**: Auto-playing hero carousel with fade transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Database**: Supabase
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Cinzel Decorative, Fira Sans Condensed)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Supabase account (for database)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ragooty
```

2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Run the development server:

```bash
npm run dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── about/          # About page
│   ├── admin/          # Admin dashboard
│   ├── contact/        # Contact page
│   ├── gallery/        # Gallery page
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── admin/          # Admin-specific components
│   ├── pages/          # Page components
│   ├── ui/             # Reusable UI components
│   └── user/           # User-facing components
├── lib/                # Utility functions
├── hooks/              # Custom React hooks
└── api/                # API functions
```

## 🎨 Key Components

- **HeroBanner**: Animated hero section with auto-playing carousel
- **PeekGallery**: Preview gallery with category filtering
- **Navbar**: Responsive navigation with theme toggle
- **Footer**: Site footer with social links
- **Admin Dashboard**: Content management interface

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📸 Gallery Features

- Category-based image filtering
- Blurhash loading placeholders
- Responsive grid layout
- Image optimization with Next.js
- HEIC image support

## 🎯 Admin Features

- Image upload and management
- Category management
- Content editing
- User authentication

## 🌐 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

For other deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For any questions or support, please contact the project owner.
