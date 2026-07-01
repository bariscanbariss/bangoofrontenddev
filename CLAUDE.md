# Bangoo Frontend - Development Guide

## Project Overview
- **Purpose**: E-commerce platform frontend for Bangoo marketplace
- **Framework**: Next.js 14 with App Router
- **Backend**: Medusa.js
- **Status**: **PRODUCTION** - Deployed on VPS at bangoocyp.com
- **Deployment**: March 4, 2026 - Migrated from Vercel to VPS
- **Key Features**: Multi-vendor marketplace, product browsing, cart, checkout

## Tech Stack
- **Framework**: Next.js 14.2.3
- **Styling**: TailwindCSS 3.4.1
- **UI Components**: Medusa UI + Custom components
- **Icons**: Lucide React
- **State Management**: React hooks + context
- **Backend Integration**: Medusa.js API

## Architecture
```
src/
├── app/                    # Next.js App Router pages
│   └── [countryCode]/     # Localized routes
├── modules/
│   ├── layout/            # Layout components (Nav, Footer)
│   │   ├── templates/
│   │   │   └── nav/       # Main navbar component
│   │   └── components/
│   │       ├── categories-nav/  # Categories navigation
│   │       ├── cart-button/
│   │       └── search-bar/
│   ├── common/            # Shared components
│   └── products/          # Product-related components
├── lib/                   # Utilities and data fetching
└── styles/               # Global styles and Tailwind config
```

## Development Workflow
- **Dev Server**: `pnpm dev` or `npm run dev`
- **Build**: `pnpm build`
- **Lint**: `pnpm lint`
- **Type Check**: `pnpm type-check`

## Current Implementation

### Navbar System (Recently Updated - Jan 17, 2026)
The navbar has been redesigned to match Trendyol's polished UX with smooth scroll animations.

#### Main Navbar (`src/modules/layout/templates/nav/index.tsx`)
- **Sticky positioning**: Always stays at the top (z-index: 50)
- **Purple branding**: Background color #9865e8
- **Shadow**: Added shadow-md for depth
- **Desktop Layout**: Logo, Search (centered, max-width), User actions (right)
- **Mobile Layout**: Logo + icons (top row), Search bar (bottom row)
- **Enhanced hover states**: Buttons have hover:bg-white/10 effect

#### Categories Navigation (`src/modules/layout/components/categories-nav/`)
**Scroll Animation Features**:
- **Sticky positioning**: `top-24` (stays below main navbar)
- **Scroll detection**: useEffect hook monitors scroll position
- **Fade animation**: Categories fade out (opacity-0) when scrolled > 50px
- **Pointer events**: Disabled when scrolled to prevent interactions
- **Smooth transitions**: 300ms ease-in-out

**Styling Improvements**:
- Increased padding and spacing for better clickability
- Enhanced hover states with subtle shadows
- Rounded corners (rounded-lg) for modern look
- Better typography: font-medium and font-semibold
- Dropdown menus with shadow-xl and smooth fadeIn animation
- Displays up to 10 categories (increased from 8)

### Animation System
**Added fadeIn animation** to Tailwind config:
```javascript
keyframes: {
  fadeIn: {
    "0%": { opacity: "0", transform: "translateY(-10px)" },
    "100%": { opacity: "1", transform: "translateY(0)" }
  }
}
animation: {
  fadeIn: "fadeIn 0.2s ease-out forwards"
}
```

## File Locations
- **Main Navbar**: `/src/modules/layout/templates/nav/index.tsx`
- **Categories Nav (Client)**: `/src/modules/layout/components/categories-nav/categories-client.tsx`
- **Categories Nav (Server)**: `/src/modules/layout/components/categories-nav/index.tsx`
- **Tailwind Config**: `/tailwind.config.js`
- **Global Styles**: `/src/styles/globals.css`
- **Search Bar**: `/src/modules/layout/components/search-bar/`
- **Cart Button**: `/src/modules/layout/components/cart-button/`

## Known Issues
- None currently

## Recent Changes

### March 5, 2026 - Google Setup Page UI Improvements
**Fixed**: Google sign-in profile setup page readability and styling issues

**Changes Made**:
1. `src/modules/account/components/google-setup/index.tsx` - Complete form redesign
   - **Google Account Box**: Changed from gradient background to white with purple border
   - Increased text contrast (text-gray-900 for label, text-gray-800 for email)
   - Added `break-all` for long email addresses
   - Larger icons (w-6 h-6) for better visibility

   - **Form Inputs**: Replaced floating label Input component with standard inputs
   - Fixed label overlapping issue by using top-positioned labels
   - Clean, modern design with proper spacing (space-y-5)
   - Clear visual hierarchy with font-semibold labels
   - Purple focus ring (focus:ring-[#9865e8]) matching site theme
   - Better placeholder visibility (placeholder:text-gray-400)
   - Increased input padding (px-4 py-3) for better touch targets

**Why these changes**:
- Original gradient background made email text hard to read (low contrast)
- Floating label animation caused labels to overlap with input text
- Inconsistent styling with rest of the site
- Poor mobile UX with small touch targets

**Design Improvements**:
- White background with colored border provides better contrast
- Standard label positioning prevents overlap
- Consistent with modern form design patterns
- Better accessibility and readability
- Matches Bangoo's purple theme (#9865e8)

### February 14, 2026 - Dynamic Store System Refactor (Clean Backend Integration)
**Refactored**: Complete store system rewritten for clean, fully dynamic backend data fetching

**Key Changes**:
1. `src/lib/data/stores.ts` - Added `StoreCampaign` type and `getStoreCampaigns()` API function
   - New endpoint: GET /store/stores/{handle}/campaigns
   - All 9 API functions now cleanly fetch from backend

2. `src/app/[countryCode]/(main)/stores/[handle]/page.tsx` - Refactored to include campaigns
   - Added parallel fetching of campaigns data
   - Passes campaigns and campaignCount to template

3. `src/modules/store/templates/store-profile/index.tsx` - Added campaigns tab support
   - New StoreCampaigns import and tab rendering

4. `src/modules/store/components/store-tabs/index.tsx` - Added "Kampanyalar" tab
   - New TabType includes "campaigns"
   - Megaphone icon for campaigns tab

5. `src/modules/store/components/store-campaigns/index.tsx` - **NEW COMPONENT**
   - Campaign cards with banner images from backend
   - Discount type badges (percentage, fixed, free_shipping)
   - Remaining days countdown
   - Campaign product count
   - Empty state with modern design

**Data Flow (All Dynamic from Backend)**:
- Store profile: `getStoreByHandle(handle)` -> cover_url, logo_url, name, description, rating, etc.
- Featured products: `getStoreFeaturedProducts(handle)` -> badges, thumbnails, prices
- Campaigns: `getStoreCampaigns(handle)` -> banners, discounts, dates
- Discount products: `getStoreDiscountProducts(storeId)` -> on_sale products
- Reviews: `getStoreReviews(handle)` -> customer reviews
- Categories: `getStoreCategories(handle)` -> store categories
- All products: `getStoreProducts(storeId)` -> with filters and pagination

### January 20, 2026 - Multi-Vendor Store System Implementation
**New Feature**: Complete store profile system with Medusa Multivendor Plugin

**Routes Added**:
- `/stores` - Store listing page with search and pagination
- `/stores/[handle]` - Individual store profile page

**Files Created**:
1. `src/lib/data/stores.ts` - Store API functions
   - `getStoreByHandle()` - GET /store/stores/{handle}
   - `listStores()` - GET /store/stores
   - `getStoreReviews()` - GET /store/stores/{handle}/reviews
   - `getStoreProducts()` - GET /store/products?store_id={id}
   - `getStoreFeaturedProducts()` - GET /store/stores/{handle}/featured
   - `createStoreReview()` - POST /store/stores/{id}/reviews

2. `src/modules/store/` - Store components
   - `components/store-header/` - Cover photo + logo with glassmorphism
   - `components/store-info/` - Name, rating, stats, follow button
   - `components/store-tabs/` - Featured/Products/Reviews tabs
   - `components/store-products/` - Product grid with filters & pagination
   - `components/store-reviews/` - Review list with rating distribution
   - `components/store-featured/` - Hero + grid layout for featured products
   - `components/rating-stars/` - Star rating display
   - `components/review-card/` - Individual review display
   - `components/product-filters/` - Sort & price filters
   - `templates/store-profile/` - Main template combining all components

3. `src/app/[countryCode]/(main)/stores/page.tsx` - Store listing
4. `src/app/[countryCode]/(main)/stores/loading.tsx` - Skeleton loader
5. `src/app/[countryCode]/(main)/stores/[handle]/page.tsx` - Store profile
6. `src/app/[countryCode]/(main)/stores/[handle]/loading.tsx` - Skeleton loader
7. `src/app/[countryCode]/(main)/stores/[handle]/not-found.tsx` - 404 page

**Design Features**:
- Glassmorphism effects on header
- Gradient backgrounds when no cover image
- Smooth animations (fadeIn, shimmer)
- Responsive design (mobile-first)
- Modern color palette (violet/purple theme)
- Hover effects and micro-interactions
- Premium card designs with shadows

**SEO Implementation**:
- Dynamic meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card support
- JSON-LD structured data (Store + LocalBusiness schema)
- Canonical URLs

**API Integration**:
- Medusa Multivendor Marketplace Plugin by Techlabi
- All endpoints under /store/stores/*
- Error handling with fallbacks
- Force-cache for performance

### January 17, 2026 - Trendyol-Style Navbar Implementation
**Files Modified**:
1. `src/modules/layout/components/categories-nav/categories-client.tsx`
   - Added scroll detection with useState and useEffect
   - Implemented fade-out animation on scroll (> 50px)
   - Enhanced styling: better padding, hover states, shadows
   - Increased category display limit to 10
   - Added sticky positioning with z-40

2. `src/modules/layout/templates/nav/index.tsx`
   - Added shadow-md to main navbar
   - Improved hover states with bg-white/10
   - Better spacing and layout (gap-6 on desktop)
   - Enhanced mobile layout with better padding
   - Added font-medium to text elements

3. `tailwind.config.js`
   - Added fadeIn keyframe animation
   - Added fadeIn animation class (0.2s ease-out)

**Why these changes**:
- Requested by user to match Trendyol's polished UX
- Improves visual hierarchy and user experience
- Smooth animations make the interface feel more professional
- Categories hide on scroll to give more screen space for content

**Design Decisions**:
- Scroll threshold: 50px (optimal balance for triggering animation)
- Animation duration: 300ms (smooth but not sluggish)
- Sticky positioning: Categories at top-24 to stay below main nav
- Z-index hierarchy: Main nav (50) > Categories (40) > Dropdowns (50)

## Dependencies
- Next.js: 14.2.3
- React: 18.3.1
- TailwindCSS: 3.4.1
- Lucide React: Latest (icons)
- Medusa JS SDK: Latest

## Environment Variables
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL`: Backend API URL
- `NEXT_PUBLIC_BASE_URL`: Frontend base URL
- Additional Medusa-specific variables (see .env.template)

## Production Deployment

### VPS Configuration (March 4, 2026)
**Server**: 72.61.106.2 (GoDaddy VPS)
**Domain**: bangoocyp.com
**Admin**: admin.bangoocyp.com

### Docker Setup
**Frontend Container**: `bangoo-frontend`
- Image: Custom Next.js 14 standalone build
- Port: 3000 (internal)
- Network: medusa-backend-multivendor_backend
- Environment: Production (.env.production)

**Nginx Container**: `bangoo-nginx`
- Image: nginx:alpine
- Ports: 80, 443 (external)
- SSL: Let's Encrypt certificates
- Config: /tmp/nginx-clean/conf.d/bangoo.conf

### SSL Certificates
- **Frontend**: /etc/letsencrypt/live/bangoocyp.com/
  - Domains: bangoocyp.com, www.bangoocyp.com
  - Expires: June 2, 2026

- **Backend**: /etc/letsencrypt/live/admin.bangoocyp.com/
  - Domain: admin.bangoocyp.com
  - Expires: June 2, 2026

### DNS Configuration (GoDaddy)
- A record: @ → 72.61.106.2
- A record: www → 72.61.106.2
- A record: admin → 72.61.106.2

### Deployment Commands
```bash
# Connect to VPS
ssh bangoo

# Check containers
docker ps | grep bangoo

# View frontend logs
docker logs bangoo-frontend -f

# View nginx logs
docker logs bangoo-nginx -f

# Restart services
docker restart bangoo-frontend
docker restart bangoo-nginx
```

### Troubleshooting Guide
See: `NGINX-FIX-GUIDE.md` for detailed nginx configuration steps

---
**Last Updated**: March 4, 2026 by Claude Code
