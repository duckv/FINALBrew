# Bread N' Br☕︎w - Bakery & Cafe Website

A modern, responsive website for a bakery and cafe built with React, TypeScript, and Tailwind CSS.

## 🏗️ Project Structure

```
fusion-starter/
├── src/
│   ├── assets/                 # Static assets (images, icons, etc.)
│   │   ├── images/            # Image files organized by category
│   │   │   ├── products/      # Product images
│   │   │   ├── gallery/       # Gallery photos
│   │   │   ├── logos/         # Brand logos and icons
│   │   │   └── backgrounds/   # Background images
│   │   └── README.md          # Image management guidelines
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components (shadcn/ui)
│   │   ├── sections/         # Page section components
│   │   └── common/           # Common/shared components
│   ├── contexts/             # React contexts for state management
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions and configurations
│   ├── pages/                # Page components
│   ├── utils/                # Helper utilities
│   └── types/                # TypeScript type definitions
├── public/                   # Public static files
└── docs/                     # Project documentation
```

## 🖼️ Image Management

### Quick Start for Adding Images

1. **Add your image files** to the appropriate folder in `src/assets/images/`:

   - Product photos → `src/assets/images/products/`
   - Gallery photos → `src/assets/images/gallery/`
   - Logos/icons → `src/assets/images/logos/`
   - Backgrounds → `src/assets/images/backgrounds/`

2. **Import in your component**:

   ```tsx
   import productImage from "@/assets/images/products/your-image.jpg";

   // Use in JSX
   <img src={productImage} alt="Description" />;
   ```

3. **Or use the Image Helper utility**:

   ```tsx
   import { getImagePath } from "@/utils/imageHelpers";

   <img src={getImagePath("products", "your-image.jpg")} alt="Description" />;
   ```

### 📋 Image Guidelines

- **Formats**: Use `.jpg` for photos, `.png` for graphics with transparency, `.svg` for icons
- **Naming**: Use kebab-case (e.g., `chocolate-croissant.jpg`)
- **Size**: Optimize images before adding (recommended max width: 1200px for photos)
- **Alt text**: Always provide descriptive alt text for accessibility

For detailed image management instructions, see [`src/assets/README.md`](src/assets/README.md).

## 🚀 Development

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Build for production**:

   ```bash
   npm run build
   ```

4. **Run tests**:

   ```bash
   npm test
   ```

5. **Type checking**:
   ```bash
   npm run typecheck
   ```

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router 6
- **Styling**: Tailwind CSS 3
- **UI Components**: Radix UI + shadcn/ui
- **Build Tool**: Vite
- **Testing**: Vitest
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📁 Component Organization

### UI Components (`src/components/ui/`)

Reusable UI primitives built with Radix UI and styled with Tailwind CSS.

### Section Components (`src/components/`)

- `Header.tsx` - Navigation and branding
- `Hero.tsx` - Landing section
- `MenuSection.tsx` - Product showcase
- `Footer.tsx` - Site footer
- And more...

### Page Components (`src/pages/`)

- `Index.tsx` - Homepage
- `NotFound.tsx` - 404 page

## 🎨 Styling System

The project uses a comprehensive design system built with Tailwind CSS:

- **Design Tokens**: Defined in `tailwind.config.ts`
- **Custom Colors**: Brand colors for consistent theming
- **Typography**: Custom font configurations
- **Components**: Pre-styled components with variants
- **Utilities**: The `cn()` utility function for conditional styling

## 🧪 Testing

Tests are located alongside their corresponding files with `.spec.ts` suffix:

- Unit tests for utilities in `src/lib/`
- Component tests in `src/components/`

## 📱 Features

- **Responsive Design**: Mobile-first approach
- **Shopping Cart**: Full cart functionality with context state management
- **Product Customization**: Modal-based product customization
- **Order Management**: Order limits and checkout flow
- **Accessibility**: ARIA attributes and semantic HTML
- **Performance**: Optimized with Vite and React best practices

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Add comments for complex logic
3. Write tests for new utilities and components
4. Use TypeScript for type safety
5. Follow the image management guidelines for assets

## 📄 License

This project is private and proprietary.
