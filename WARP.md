# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Team Service Costa S.A.S.** - Modern landing page for an authorized KÄRCHER service center in Colombia. Built with Astro 5.14.3, featuring responsive design optimized for KÄRCHER cleaning equipment catalog and services. **Note: Cart system has been removed and needs to be rebuilt from scratch.**

## Common Development Commands

### Development Workflow
```bash
# Install dependencies
npm install

# Start development server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro -- --help
```

### PowerShell-Specific Commands (Windows)
```powershell
# Run development server
npm run dev

# Build and preview
npm run build; npm run preview
```

## Architecture Overview

### Framework Structure
- **Astro 5.14.3**: Static site generator with islands architecture
- **TypeScript**: Type safety for component props and cart logic
- **CSS Custom Properties**: Centralized design system in `src/styles/global.css`
- **Component-based**: Modular Astro components with scoped styles

### Key Architectural Patterns

#### 1. Miro-Inspired Design System
- **Unified color palette**: KÄRCHER yellow (`#FFD700`) + modern grays and blues
- **Consistent spacing scale**: Based on 4px increments (spacing-1 to spacing-24)
- **Typography system**: System fonts with responsive scaling
- **Border radius**: Rounded corners throughout (sm to 3xl)
- **Component variants**: "Miro" suffix indicates modern design iteration

#### 2. Cart State Management
- **REMOVED**: Cart system has been completely eliminated
- **TODO**: Needs to be rebuilt from scratch with new architecture

#### 3. Product Data Architecture
- **Centralized data**: `src/data/products.ts` contains all product information
- **TypeScript interfaces**: Strong typing for Product objects
- **Category system**: Products organized by home/semi-professional/professional
- **Price formatting**: Colombian peso formatting with thousand separators

#### 4. Component Architecture
```
src/components/
├── *Miro.astro           # Modern design components
├── Modal components      # ProductDetailModal  
├── Form components       # ContactForm
└── Layout components     # Header, Footer, WhatsApp button
```

### Page Architecture
- **index.astro**: Main landing page with all components
- **tienda.astro**: Product catalog with filtering
- **estado-producto.astro**: Product status/tracking page

### Design System Location
All design tokens are centralized in `src/styles/global.css`:
- CSS Custom Properties for colors, typography, spacing
- Responsive breakpoints (640px mobile, 968px tablet)
- Consistent shadow and transition definitions

## Key Implementation Details

### Cart System Integration
- **REMOVED**: All cart functionality has been eliminated
- **Current state**: Product cards only show "Ver detalles" button
- **TODO**: Rebuild cart system with new requirements

### SEO & Performance
- Comprehensive meta tags in `Layout.astro` including Open Graph
- Structured data (JSON-LD) for local business
- Preconnect hints for external resources
- Geographic SEO for Colombian Caribbean region

### Responsive Strategy
- **Mobile-first CSS**: All components scale up from mobile
- **Grid layouts**: CSS Grid for product catalogs, Flexbox for UI elements
- **Container queries**: Components adapt to their container size
- **Touch-friendly**: 44px minimum touch targets on mobile

### WhatsApp Integration
- Floating action button with customizable phone/message
- Integration throughout cart and contact flows
- Colombian phone number format (+57 prefix)

## Data Patterns

### Product Structure
```typescript
interface Product {
  id: string;           // Unique identifier
  name: string;         // Display name
  model: string;        // Product model
  price: string;        // Formatted price string
  image: string;        // Image path
  available: boolean;   // Stock status
  category: string;     // Product category
  description?: string; // Optional description
}
```

### Cart Item Structure
```typescript
// REMOVED - Cart interfaces no longer exist
// TODO: Define new cart data structures when rebuilding
```

## Component Props Patterns

### Consistent prop naming across components:
- `name`, `model`, `price` for products
- `phone`, `message` for WhatsApp integration
- `title`, `description` for page meta
- `available` boolean for product status

## Development Guidelines

### Adding New Products
1. Update `src/data/products.ts` with new product data
2. Add product images to `public/images/products/`
3. Ensure price format matches existing pattern (Colombian pesos)

### Modifying Cart Behavior
- **REMOVED**: No cart logic currently exists
- **TODO**: Create new cart system architecture

### Adding New Pages
- Create `.astro` file in `src/pages/`
- Import and use `Layout.astro` for consistent structure
- Include `HeaderMiro` and `FooterMiro` components
- Add `WhatsAppButton` for customer support
- **Note**: No cart components to include currently

### Styling New Components
- Use CSS Custom Properties from global.css
- Follow existing spacing/color patterns
- Include responsive breakpoints for mobile/tablet/desktop
- Scope styles within component using `<style>` tags

## Colombian Business Context

This site serves Team Service Costa S.A.S., operating in:
- **Montería** (Córdoba)
- **Cartagena** (Bolívar) 
- **Apartadó** (Antioquia)

Products are KÄRCHER cleaning equipment with Colombian peso pricing, official warranty coverage, and regional service support.

## Testing Considerations

### Cart Functionality Testing
- **REMOVED**: No cart functionality to test currently
- **TODO**: Define testing strategy for new cart system

### Responsive Testing
- Product grid layout at different screen sizes
- Cart modal behavior on mobile vs desktop
- Navigation menu collapse on tablet/mobile
- WhatsApp button positioning across devices

### Performance Testing
- Image loading (many product placeholders)
- Cart operations with multiple items
- Modal animations on slower devices