# Image Management Guide

This directory contains all static image assets for the Bread N' Br☕︎w website.

## 📁 Directory Structure

```
src/assets/images/
├── products/                    # Product photos organized by category
│   ├── coffee/                 # Coffee and hot beverages
│   ├── tea/                    # Tea products
│   ├── iced-frozen/            # Iced drinks and smoothies
│   ├── pastries/               # Pastries and French items
│   ├── breads/                 # Bread products
│   ├── pizza/                  # Pizza items
│   ├── breakfast/              # Breakfast items
│   ├── lunch/                  # Lunch items
│   └── sweets/                 # Desserts and sweet treats
├── backgrounds/                 # Background images organized by theme
│   ├── coffee/                 # Coffee-themed backgrounds
│   ├── pastries/               # Pastry-themed backgrounds
│   ├── pizza/                  # Pizza-themed backgrounds
│   └── general/                # General-purpose backgrounds
├── gallery/                     # Gallery photos for the photo section
└── logos/                       # Brand logos, favicons, and brand assets
```

## 🖼️ How to Add Images

### 1. Place Your Image Files

Copy your image files to the appropriate subdirectory:

- **Product photos** → `src/assets/images/products/`
- **Gallery photos** → `src/assets/images/gallery/`
- **Logos/branding** → `src/assets/images/logos/`
- **Background images** → `src/assets/images/backgrounds/`

### 2. Naming Convention

Use **kebab-case** for file names:

✅ **Good examples:**

- `chocolate-croissant.jpg`
- `fresh-bread-loaf.jpg`
- `coffee-cup-hero.jpg`
- `bakery-interior-1.jpg`

❌ **Avoid:**

- `Chocolate Croissant.jpg` (spaces)
- `chocolate_croissant.jpg` (underscores)
- `ChocolateCroissant.jpg` (camelCase)

### 3. Using Images in Components

#### Method 1: Direct Import (Recommended for Static Images)

```tsx
import chocolateCroissant from "@/assets/images/products/chocolate-croissant.jpg";

const ProductCard = () => (
  <img
    src={chocolateCroissant}
    alt="Freshly baked chocolate croissant with flaky layers"
    className="w-full h-48 object-cover rounded-lg"
  />
);
```

#### Method 2: Using Image Helper Utility

```tsx
import { getImagePath } from "@/utils/imageHelpers";

const ProductCard = ({ imageName }: { imageName: string }) => (
  <img
    src={getImagePath("products", imageName)}
    alt="Product image"
    className="w-full h-48 object-cover rounded-lg"
  />
);
```

#### Method 3: Dynamic Image Loading

```tsx
import { loadImage } from "@/utils/imageHelpers";

const GalleryImage = ({ imageName }: { imageName: string }) => {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    loadImage("gallery", imageName).then(setImageSrc);
  }, [imageName]);

  return imageSrc ? (
    <img src={imageSrc} alt="Gallery image" className="gallery-image" />
  ) : (
    <div className="loading-placeholder">Loading...</div>
  );
};
```

## 📋 Image Specifications

### File Formats

- **JPEG (.jpg)**: Use for photographs and images with many colors
- **PNG (.png)**: Use for graphics with transparency or sharp edges
- **SVG (.svg)**: Use for logos, icons, and scalable graphics
- **WebP (.webp)**: Use for optimized web images (when supported)

### Image Sizes

#### Product Images

- **Recommended**: 800x600px (4:3 aspect ratio)
- **Maximum**: 1200x900px
- **File size**: < 500KB

#### Gallery Images

- **Recommended**: 1200x800px (3:2 aspect ratio)
- **Maximum**: 1920x1280px
- **File size**: < 800KB

#### Background Images

- **Recommended**: 1920x1080px (16:9 aspect ratio)
- **Maximum**: 2560x1440px
- **File size**: < 1MB

#### Logos

- **SVG preferred** for scalability
- **PNG**: 200x200px minimum
- **Transparent background** when applicable

### Optimization Tips

1. **Compress images** before adding them to the project

   - Use tools like [TinyPNG](https://tinypng.com/) or [ImageOptim](https://imageoptim.com/)

2. **Choose appropriate quality**

   - JPEG: 80-90% quality for most photos
   - PNG: Optimize with tools to reduce file size

3. **Consider responsive images**
   - Provide multiple sizes for different screen densities
   - Use the `ImageUploader` component for automatic optimization

## 🛠️ Image Utilities

### Available Helper Functions

```tsx
// Get image path by category and filename
getImagePath(category: "products" | "gallery" | "logos" | "backgrounds", filename: string): string

// Load image dynamically
loadImage(category: string, filename: string): Promise<string>

// Preload images for better performance
preloadImages(images: Array<{category: string, filename: string}>): Promise<void>

// Generate responsive image srcSet
generateSrcSet(category: string, filename: string, sizes: number[]): string
```

### Example Usage

```tsx
import { getImagePath, preloadImages } from "@/utils/imageHelpers";

// Basic usage
const imageSrc = getImagePath("products", "chocolate-croissant.jpg");

// Preload critical images
useEffect(() => {
  preloadImages([
    { category: "backgrounds", filename: "hero-image.jpg" },
    { category: "products", filename: "featured-bread.jpg" },
  ]);
}, []);
```

## 🎨 Design Guidelines

### Photography Style

- **High quality**, well-lit product photos
- **Consistent lighting** and background style
- **Sharp focus** on the main subject
- **Appetizing presentation** for food items

### Brand Consistency

- Maintain consistent **color grading** across photos
- Use the brand's **color palette** as accent colors
- Ensure **professional quality** for all public-facing images

## 📝 Accessibility

Always provide meaningful alt text:

```tsx
// Good: Descriptive alt text
<img
  src={imageSrc}
  alt="Golden-brown sourdough bread loaf with crispy crust and flour dusting"
/>

// Bad: Generic or missing alt text
<img src={imageSrc} alt="bread" />
<img src={imageSrc} /> // Missing alt attribute
```

## 🔧 Troubleshooting

### Common Issues

1. **Image not loading**

   - Check file path and naming
   - Ensure image exists in correct directory
   - Verify import statement

2. **Large file sizes**

   - Compress images before adding
   - Use appropriate format (JPEG vs PNG)
   - Consider WebP for modern browsers

3. **TypeScript errors**
   - Ensure image files have proper extensions
   - Check import paths use `@/assets/` alias
   - Verify imageHelpers types match usage

### Getting Help

If you encounter issues with image management:

1. Check this README for guidance
2. Review the `imageHelpers.ts` utility functions
3. Look at existing component examples
4. Ensure images follow the naming conventions

---

**Remember**: Always optimize images for web use and provide descriptive alt text for accessibility!
