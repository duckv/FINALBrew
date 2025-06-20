/**
 * ImageUploader Component
 *
 * A reusable component for displaying images with fallback handling,
 * lazy loading, and responsive features. This component makes it easy
 * to use images from the organized assets directory structure.
 */

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  loadImage,
  getImagePath,
  type ImageCategory,
  type ImageConfigType,
  getImageConfig,
} from "@/utils/imageHelpers";

/**
 * Props for the ImageUploader component
 */
interface ImageUploaderProps {
  /** Image category (products, gallery, logos, backgrounds) */
  category: ImageCategory;
  /** Image filename with extension */
  filename: string;
  /** Alt text for accessibility (required) */
  alt: string;
  /** Predefined image configuration type */
  configType?: ImageConfigType;
  /** Custom CSS classes */
  className?: string;
  /** Lazy loading behavior */
  loading?: "lazy" | "eager";
  /** Fallback image to show if main image fails to load */
  fallbackSrc?: string;
  /** Show loading placeholder */
  showLoadingPlaceholder?: boolean;
  /** Custom loading placeholder content */
  loadingPlaceholder?: React.ReactNode;
  /** Callback when image loads successfully */
  onLoad?: () => void;
  /** Callback when image fails to load */
  onError?: (error: Error) => void;
  /** Additional image attributes */
  imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

/**
 * Default loading placeholder component
 */
const DefaultLoadingPlaceholder = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "bg-gray-200 animate-pulse flex items-center justify-center",
      className,
    )}
  >
    <div className="text-gray-400 text-sm">Loading...</div>
  </div>
);

/**
 * Default error placeholder component
 */
const DefaultErrorPlaceholder = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center",
      className,
    )}
  >
    <div className="text-gray-400 text-sm text-center">
      <div>Image not found</div>
      <div className="text-xs mt-1">Check file path and name</div>
    </div>
  </div>
);

/**
 * ImageUploader Component
 *
 * @example Basic usage
 * ```tsx
 * <ImageUploader
 *   category="products"
 *   filename="chocolate-croissant.jpg"
 *   alt="Freshly baked chocolate croissant"
 *   configType="product"
 * />
 * ```
 *
 * @example With custom styling and fallback
 * ```tsx
 * <ImageUploader
 *   category="gallery"
 *   filename="bakery-interior.jpg"
 *   alt="Modern bakery interior with warm lighting"
 *   className="rounded-xl shadow-lg"
 *   fallbackSrc="/images/placeholder.jpg"
 *   onLoad={() => console.log('Image loaded')}
 *   onError={(err) => console.error('Image failed:', err)}
 * />
 * ```
 */
export const ImageUploader: React.FC<ImageUploaderProps> = ({
  category,
  filename,
  alt,
  configType,
  className,
  loading = "lazy",
  fallbackSrc,
  showLoadingPlaceholder = true,
  loadingPlaceholder,
  onLoad,
  onError,
  imageProps,
}) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Get predefined configuration if specified
  const config = configType ? getImageConfig(configType) : null;

  // Combine className with config className
  const finalClassName = cn(config?.className, className);

  /**
   * Load the image from the assets directory
   */
  useEffect(() => {
    const loadImageAsync = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        // Try to load the image dynamically
        const imageUrl = await loadImage(category, filename);
        setImageSrc(imageUrl);

        // Call onLoad callback if provided
        onLoad?.();
      } catch (error) {
        console.error(`Failed to load image: ${category}/${filename}`, error);
        setHasError(true);

        // Try fallback image if provided
        if (fallbackSrc) {
          setImageSrc(fallbackSrc);
        }

        // Call onError callback if provided
        onError?.(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImageAsync();
  }, [category, filename, fallbackSrc, onLoad, onError]);

  /**
   * Handle image load event
   */
  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  /**
   * Handle image error event
   */
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);

    // Try static path as fallback
    if (!hasError && !fallbackSrc) {
      const staticPath = getImagePath(category, filename);
      setImageSrc(staticPath);
    }
  };

  // Show loading placeholder
  if (isLoading && showLoadingPlaceholder) {
    return (
      loadingPlaceholder || (
        <DefaultLoadingPlaceholder className={finalClassName} />
      )
    );
  }

  // Show error placeholder if image failed to load and no fallback
  if (hasError && !imageSrc) {
    return <DefaultErrorPlaceholder className={finalClassName} />;
  }

  // Render the image
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={finalClassName}
      loading={loading}
      onLoad={handleImageLoad}
      onError={handleImageError}
      style={config ? { aspectRatio: config.aspectRatio } : undefined}
      sizes={config?.sizes}
      {...imageProps}
    />
  );
};

/**
 * Simple image component for static imports
 * Use this when you want to import images directly
 */
interface SimpleImageProps {
  src: string;
  alt: string;
  configType?: ImageConfigType;
  className?: string;
  imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

export const SimpleImage: React.FC<SimpleImageProps> = ({
  src,
  alt,
  configType,
  className,
  imageProps,
}) => {
  const config = configType ? getImageConfig(configType) : null;
  const finalClassName = cn(config?.className, className);

  return (
    <img
      src={src}
      alt={alt}
      className={finalClassName}
      style={config ? { aspectRatio: config.aspectRatio } : undefined}
      sizes={config?.sizes}
      loading="lazy"
      {...imageProps}
    />
  );
};

export default ImageUploader;
