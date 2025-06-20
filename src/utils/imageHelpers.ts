/**
 * Image Helper Utilities
 *
 * This module provides utilities for managing and loading images throughout the application.
 * It helps maintain consistent image paths and provides functions for dynamic image loading.
 */

/**
 * Image categories available in the assets directory
 */
export type ImageCategory = "products" | "gallery" | "logos" | "backgrounds";

/**
 * Configuration for image paths
 */
const IMAGE_BASE_PATH = "/src/assets/images" as const;

/**
 * Get the full path to an image based on category and filename
 * Supports both flat structure and subcategory structure
 *
 * @param category - The image category (products, gallery, logos, backgrounds)
 * @param filename - The image filename with extension
 * @param subcategory - Optional subcategory (e.g., "coffee", "pastries")
 * @returns The full path to the image
 *
 * @example
 * ```tsx
 * const imagePath = getImagePath("products", "chocolate-croissant.jpg");
 * // Returns: "/src/assets/images/products/chocolate-croissant.jpg"
 *
 * const imagePath = getImagePath("products", "latte-art.jpg", "coffee");
 * // Returns: "/src/assets/images/products/coffee/latte-art.jpg"
 * ```
 */
export function getImagePath(
  category: ImageCategory,
  filename: string,
  subcategory?: string,
): string {
  if (subcategory) {
    return `${IMAGE_BASE_PATH}/${category}/${subcategory}/${filename}`;
  }
  return `${IMAGE_BASE_PATH}/${category}/${filename}`;
}

/**
 * Load an image dynamically and return a promise with the image URL
 * Useful for lazy loading or conditional image loading
 *
 * @param category - The image category
 * @param filename - The image filename with extension
 * @returns Promise that resolves to the image URL
 *
 * @example
 * ```tsx
 * const imageUrl = await loadImage("gallery", "bakery-interior.jpg");
 * setImageSrc(imageUrl);
 * ```
 */
export async function loadImage(
  category: ImageCategory,
  filename: string,
): Promise<string> {
  try {
    // Dynamic import for the image
    const imageModule = await import(`@/assets/images/${category}/${filename}`);
    return imageModule.default;
  } catch (error) {
    console.error(`Failed to load image: ${category}/${filename}`, error);
    throw new Error(`Image not found: ${category}/${filename}`);
  }
}

/**
 * Preload multiple images for better performance
 * Useful for preloading critical images that will be shown soon
 *
 * @param images - Array of image objects with category and filename
 * @returns Promise that resolves when all images are preloaded
 *
 * @example
 * ```tsx
 * await preloadImages([
 *   { category: "products", filename: "bread-1.jpg" },
 *   { category: "products", filename: "bread-2.jpg" }
 * ]);
 * ```
 */
export async function preloadImages(
  images: Array<{ category: ImageCategory; filename: string }>,
): Promise<void> {
  const preloadPromises = images.map(async ({ category, filename }) => {
    try {
      const imageUrl = await loadImage(category, filename);

      // Create an image element to trigger preload
      const img = new Image();
      img.src = imageUrl;

      return new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () =>
          reject(new Error(`Failed to preload ${category}/${filename}`));
      });
    } catch (error) {
      console.warn(`Could not preload image: ${category}/${filename}`, error);
    }
  });

  await Promise.allSettled(preloadPromises);
}

/**
 * Generate a responsive image srcSet string for different screen densities
 *
 * @param category - The image category
 * @param filename - The base filename (without density suffix)
 * @param sizes - Array of pixel densities (e.g., [1, 2, 3] for 1x, 2x, 3x)
 * @returns srcSet string for responsive images
 *
 * @example
 * ```tsx
 * const srcSet = generateSrcSet("products", "bread", [1, 2]);
 * // Returns: "/assets/products/bread-1x.jpg 1x, /assets/products/bread-2x.jpg 2x"
 * ```
 */
export function generateSrcSet(
  category: ImageCategory,
  filename: string,
  sizes: number[] = [1, 2],
): string {
  const [name, extension] = filename.split(".");

  return sizes
    .map((size) => {
      const densityFilename = `${name}-${size}x.${extension}`;
      const path = getImagePath(category, densityFilename);
      return `${path} ${size}x`;
    })
    .join(", ");
}

/**
 * Validate if an image file exists (for development/debugging)
 * Note: This only works in development mode
 *
 * @param category - The image category
 * @param filename - The image filename
 * @returns Boolean indicating if the image exists
 */
export async function imageExists(
  category: ImageCategory,
  filename: string,
): Promise<boolean> {
  try {
    await loadImage(category, filename);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get image dimensions from a loaded image
 *
 * @param imageSrc - The image source URL
 * @returns Promise with image dimensions
 *
 * @example
 * ```tsx
 * const { width, height } = await getImageDimensions(imageSrc);
 * ```
 */
export function getImageDimensions(
  imageSrc: string,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.onerror = () => {
      reject(new Error("Failed to load image for dimension measurement"));
    };

    img.src = imageSrc;
  });
}

/**
 * Common image configurations for different use cases
 */
export const IMAGE_CONFIGS = {
  product: {
    aspectRatio: "4/3",
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    className: "w-full h-48 object-cover rounded-lg",
  },
  gallery: {
    aspectRatio: "3/2",
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    className: "w-full h-64 object-cover rounded-lg",
  },
  hero: {
    aspectRatio: "16/9",
    sizes: "100vw",
    className: "w-full h-screen object-cover",
  },
  logo: {
    aspectRatio: "1/1",
    sizes: "(max-width: 768px) 120px, 160px",
    className: "h-8 w-auto",
  },
} as const;

/**
 * Type for image configuration keys
 */
export type ImageConfigType = keyof typeof IMAGE_CONFIGS;

/**
 * Get predefined image configuration
 *
 * @param type - The image configuration type
 * @returns Configuration object for the image type
 */
export function getImageConfig(type: ImageConfigType) {
  return IMAGE_CONFIGS[type];
}
