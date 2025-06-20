/**
 * ImageUploader Component Examples
 *
 * This file demonstrates how to use the ImageUploader component
 * with different configurations and use cases.
 *
 * NOTE: This is an example file for reference. You can delete this
 * file if you don't need the examples.
 */

import React from "react";
import ImageUploader from "@/components/ImageUploader";

/**
 * Example component showing various ImageUploader use cases
 */
const ImageUploaderExamples: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">ImageUploader Component Examples</h1>

      {/* ========== Product Image Example ========== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Product Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ImageUploader
            category="products"
            filename="chocolate-croissant.jpg"
            alt="Freshly baked chocolate croissant with flaky layers"
            subcategory="pastries"
            configType="product"
          />
          <ImageUploader
            category="products"
            filename="fresh-bread-loaf.jpg"
            alt="Artisan sourdough bread loaf with crispy crust"
            subcategory="breads"
            configType="product"
          />
          <ImageUploader
            category="products"
            filename="cappuccino-cup.jpg"
            alt="Perfect cappuccino with latte art"
            subcategory="coffee"
            configType="product"
          />
        </div>
      </section>

      {/* ========== Gallery Image Example ========== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Gallery Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageUploader
            category="gallery"
            filename="bakery-interior-1.jpg"
            alt="Modern bakery interior with warm lighting and display cases"
            configType="gallery"
          />
          <ImageUploader
            category="gallery"
            filename="chef-kneading-dough.jpg"
            alt="Chef expertly kneading bread dough by hand"
            configType="gallery"
          />
        </div>
      </section>

      {/* ========== Logo Example ========== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Logo Images</h2>
        <div className="flex items-center space-x-4">
          <ImageUploader
            category="logos"
            filename="main-logo.svg"
            alt="Bread N' Brew bakery logo"
            configType="logo"
          />
          <ImageUploader
            category="logos"
            filename="brand-mark.svg"
            alt="Bread N' Brew brand mark"
            configType="logo"
          />
        </div>
      </section>

      {/* ========== Hero/Background Image Example ========== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Hero Images</h2>
        <ImageUploader
          category="backgrounds"
          filename="hero-bakery.jpg"
          alt="Warm and inviting bakery scene with fresh bread and pastries"
          configType="hero"
        />
      </section>

      {/* ========== Custom Styling Example ========== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Custom Styling</h2>
        <ImageUploader
          category="products"
          filename="special-cake.jpg"
          alt="Beautifully decorated special occasion cake"
          className="rounded-xl shadow-2xl border-4 border-brand-pink"
          onLoad={() => console.log("Special cake image loaded!")}
          onError={(error) =>
            console.error("Failed to load cake image:", error)
          }
        />
      </section>

      {/* ========== With Fallback Example ========== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">With Fallback</h2>
        <ImageUploader
          category="products"
          filename="non-existent-image.jpg" // This will fail and show fallback
          alt="Product that doesn't exist"
          configType="product"
          fallbackSrc="/placeholder.svg" // Fallback to public image
        />
      </section>

      {/* ========== Custom Loading Placeholder Example ========== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Custom Loading Placeholder
        </h2>
        <ImageUploader
          category="gallery"
          filename="large-gallery-image.jpg"
          alt="Large gallery image that takes time to load"
          configType="gallery"
          loadingPlaceholder={
            <div className="w-full h-64 bg-gradient-to-r from-brand-pink to-brand-brown flex items-center justify-center rounded-lg">
              <div className="text-white text-center">
                <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                <p>Loading delicious content...</p>
              </div>
            </div>
          }
        />
      </section>

      {/* ========== Code Examples ========== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Code Examples</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Basic Usage:</h3>
          <pre className="text-sm overflow-x-auto">
            {`<ImageUploader
  category="products"
  filename="chocolate-croissant.jpg"
  alt="Freshly baked chocolate croissant"
  subcategory="pastries"
  configType="product"
/>`}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <h3 className="font-semibold mb-2">With Custom Styling:</h3>
          <pre className="text-sm overflow-x-auto">
            {`<ImageUploader
  category="gallery"
  filename="bakery-interior.jpg"
  alt="Beautiful bakery interior"
  className="rounded-xl shadow-lg hover:shadow-xl transition-shadow"
  onLoad={() => console.log('Image loaded')}
  fallbackSrc="/images/placeholder.jpg"
/>`}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <h3 className="font-semibold mb-2">Using Subcategories:</h3>
          <pre className="text-sm overflow-x-auto">
            {`// Coffee product
<ImageUploader
  category="products"
  filename="latte-art.jpg"
  alt="Beautiful latte art"
  subcategory="coffee"
  configType="product"
/>

// Pizza product
<ImageUploader
  category="products"
  filename="margherita-pizza.jpg"
  alt="Classic margherita pizza"
  subcategory="pizza"
  configType="product"
/>`}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <h3 className="font-semibold mb-2">Direct Import Alternative:</h3>
          <pre className="text-sm overflow-x-auto">
            {`import productImage from "@/assets/images/products/croissant.jpg";

// Then use in JSX:
<img
  src={productImage}
  alt="Product description"
  className="w-full h-48 object-cover rounded-lg"
/>`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default ImageUploaderExamples;
