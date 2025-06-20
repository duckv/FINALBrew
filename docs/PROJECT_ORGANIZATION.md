# Project Organization Guide

This document provides a comprehensive overview of how the Bread N' Br☕︎w project is organized, including coding standards, architecture decisions, and best practices.

## 📁 Directory Structure

### Root Level

```
fusion-starter/
├── docs/                     # Project documentation
├── public/                   # Static assets served directly
├── src/                      # Source code
├── package.json              # Dependencies and scripts
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build configuration
└── README.md                 # Main project documentation
```

### Source Code Organization (`src/`)

```
src/
├── assets/                   # Static assets (images, fonts, etc.)
│   ├── images/              # Organized image assets
│   │   ├── products/        # Product photos
│   │   ├── gallery/         # Gallery images
│   │   ├── logos/           # Brand assets
│   │   └── backgrounds/     # Background images
│   └── README.md            # Image management guide
│
├── components/              # React components
│   ├── ui/                  # Reusable UI primitives (shadcn/ui)
│   │   ├── button.tsx       # Button component
│   │   ├── dialog.tsx       # Modal/dialog component
│   │   ├── input.tsx        # Input component
│   │   └── ...              # Other UI primitives
│   │
│   ├── AllergenModal.tsx    # Allergen information modal
│   ├── CartSidebar.tsx      # Shopping cart sidebar
│   ├── Header.tsx           # Site navigation header
│   ├── Hero.tsx             # Landing hero section
│   ├── ImageUploader.tsx    # Image display component
│   └── ...                  # Other feature components
│
├── contexts/                # React contexts for state management
│   └── CartContext.tsx      # Global cart state
│
├── hooks/                   # Custom React hooks
│   ├── use-mobile.tsx       # Mobile device detection
│   └── use-toast.ts         # Toast notification hook
│
├── lib/                     # Core utilities and configurations
│   ├── utils.ts             # General utility functions
│   └── utils.spec.ts        # Tests for utilities
│
├── pages/                   # Page components (route components)
│   ├── Index.tsx            # Homepage
│   └── NotFound.tsx         # 404 error page
│
├── utils/                   # Helper utilities
│   └── imageHelpers.ts      # Image management utilities
│
├── types/                   # TypeScript type definitions
│   └── (future type files)
│
├── App.tsx                  # Root application component
├── main.tsx                 # Application entry point
├── index.css                # Global styles
└── App.css                  # Component-specific styles
```

## 🧩 Component Architecture

### Component Hierarchy

```
App (Root)
├── QueryClientProvider (Server state)
├── CartProvider (Shopping cart state)
├── TooltipProvider (UI tooltips)
├── Toast Providers (Notifications)
└── BrowserRouter (Routing)
    └── Routes
        ├── Index Page (Homepage)
        │   ├── Header (Navigation)
        │   ├── Hero (Landing section)
        │   ├── MenuSection (Products)
        │   ├── CateringSection
        │   ├── TestimonialsSection
        │   ├── GallerySection
        │   ├── ContactSection
        │   ├── Footer
        │   ├── FloatingCart (Sticky cart button)
        │   ├── CartSidebar (Shopping cart)
        │   ├── CheckoutScreen (Checkout flow)
        │   └── OrderLimitDialog (Order warnings)
        │
        └── NotFound Page (404 error)
```

### Component Categories

#### 1. UI Components (`src/components/ui/`)

**Purpose**: Reusable, unstyled UI primitives built with Radix UI

**Characteristics**:

- No business logic
- Highly reusable
- Consistent API patterns
- Accessible by default
- Styled with Tailwind CSS

**Examples**: `Button`, `Dialog`, `Input`, `Select`

#### 2. Feature Components (`src/components/`)

**Purpose**: Business-specific components with domain logic

**Characteristics**:

- Contains business logic
- Uses UI components internally
- May connect to contexts/hooks
- Specific to bakery domain

**Examples**: `Header`, `ProductCard`, `CartSidebar`

#### 3. Page Components (`src/pages/`)

**Purpose**: Top-level route components

**Characteristics**:

- Orchestrates multiple components
- Manages page-level state
- Handles routing logic
- Minimal business logic

**Examples**: `Index`, `NotFound`

## 🎨 Styling Architecture

### Design System

The project uses a comprehensive design system built with Tailwind CSS:

#### 1. Design Tokens (`tailwind.config.ts`)

```typescript
// Color palette
colors: {
  'brand-pink': '#e91e63',
  'brand-brown': '#8b4513',
  // ... other brand colors
}

// Typography scale
fontSize: {
  'xs': '0.75rem',
  'sm': '0.875rem',
  // ... responsive typography
}
```

#### 2. Component Variants

Uses `class-variance-authority` for component variants:

```typescript
const buttonVariants = cva("base-styles", {
  variants: {
    variant: {
      default: "default-styles",
      destructive: "destructive-styles",
    },
    size: {
      default: "default-size",
      sm: "small-size",
    },
  },
});
```

#### 3. Conditional Styling

Uses the `cn()` utility for conditional classes:

```typescript
className={cn(
  "base-classes",
  {
    "conditional-class": condition,
  },
  props.className
)}
```

## 🔧 State Management

### 1. Local State

**Tool**: React's `useState` and `useReducer`

**Use Cases**:

- Component UI state
- Form state
- Temporary data

**Example**:

```typescript
const [isOpen, setIsOpen] = useState(false);
```

### 2. Global State

**Tool**: React Context + useContext

**Use Cases**:

- Shopping cart state
- User authentication (future)
- Global UI state

**Example**:

```typescript
const { addToCart, removeFromCart } = useCart();
```

### 3. Server State

**Tool**: TanStack Query (React Query)

**Use Cases**:

- API data fetching
- Caching
- Background updates

**Example**:

```typescript
const { data, isLoading } = useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
});
```

## 📝 Coding Standards

### 1. File Naming

- **Components**: PascalCase (`Header.tsx`, `ProductCard.tsx`)
- **Utilities**: camelCase (`imageHelpers.ts`, `utils.ts`)
- **Pages**: PascalCase (`Index.tsx`, `NotFound.tsx`)
- **Types**: camelCase (`userTypes.ts`, `apiTypes.ts`)
- **Assets**: kebab-case (`hero-image.jpg`, `logo-main.svg`)

### 2. Import Organization

```typescript
// 1. React and external libraries
import React from "react";
import { useState } from "react";

// 2. Internal utilities and contexts
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

// 3. UI components
import { Button } from "@/components/ui/button";

// 4. Feature components
import Header from "@/components/Header";

// 5. Assets
import logoImage from "@/assets/images/logos/main-logo.svg";
```

### 3. Component Structure

```typescript
/**
 * Component documentation
 */
interface ComponentProps {
  // Props with JSDoc comments
}

const Component: React.FC<ComponentProps> = ({
  prop1,
  prop2,
}) => {
  // ========== State ==========
  const [state, setState] = useState();

  // ========== Effects ==========
  useEffect(() => {
    // Effect logic
  }, []);

  // ========== Event Handlers ==========
  const handleClick = () => {
    // Handler logic
  };

  // ========== Render ==========
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default Component;
```

### 4. TypeScript Guidelines

- Always use TypeScript for type safety
- Define interfaces for component props
- Use type assertions sparingly
- Prefer `interface` over `type` for object shapes
- Export types when they're reused

### 5. Accessibility Standards

- Always provide `alt` text for images
- Use semantic HTML elements
- Include `aria-label` for icon buttons
- Ensure keyboard navigation works
- Test with screen readers

## 🧪 Testing Strategy

### 1. Unit Tests

**Location**: Alongside source files with `.spec.ts` suffix

**Focus**:

- Utility functions
- Business logic
- Component behavior

**Example**:

```typescript
// src/lib/utils.spec.ts
describe("cn utility", () => {
  it("should merge classes correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });
});
```

### 2. Integration Tests

**Focus**:

- Component interactions
- Context providers
- User workflows

### 3. Visual Testing

**Focus**:

- Component visual appearance
- Responsive design
- Cross-browser compatibility

## 🚀 Performance Considerations

### 1. Code Splitting

- Route-based code splitting with React.lazy()
- Component-based splitting for large components

### 2. Image Optimization

- WebP format for modern browsers
- Responsive images with multiple sizes
- Lazy loading for non-critical images

### 3. Bundle Optimization

- Tree shaking for unused code
- Dynamic imports for conditional features
- Vendor chunk splitting

## 📚 Development Workflow

### 1. Adding New Features

1. **Plan**: Define component structure and props
2. **Create**: Build component with TypeScript
3. **Style**: Apply Tailwind CSS with design system
4. **Test**: Write unit tests for logic
5. **Document**: Add JSDoc comments
6. **Integrate**: Connect to existing components

### 2. Adding New Images

1. **Optimize**: Compress images before adding
2. **Organize**: Place in appropriate assets folder
3. **Name**: Use kebab-case naming convention
4. **Import**: Use ImageUploader component or direct import
5. **Accessibility**: Provide descriptive alt text

### 3. Code Review Checklist

- [ ] TypeScript types defined
- [ ] Components properly documented
- [ ] Accessibility attributes included
- [ ] Images optimized and properly imported
- [ ] Tests written for new logic
- [ ] Design system patterns followed
- [ ] Performance implications considered

## 🔄 Future Enhancements

### Planned Improvements

1. **Backend Integration**

   - API for product data
   - Order management system
   - User authentication

2. **Advanced Features**

   - Search functionality
   - Product filtering
   - User accounts and order history

3. **Performance Optimizations**
   - Service worker for caching
   - Progressive Web App features
   - Advanced image optimization

### Migration Path

When adding new features:

1. Maintain existing patterns
2. Update documentation
3. Consider backward compatibility
4. Test thoroughly across devices

---

This organization provides a solid foundation for maintaining and scaling the Bread N' Br☕︎w website while ensuring code quality and developer productivity.
