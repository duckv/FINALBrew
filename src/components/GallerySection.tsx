const GallerySection = () => {
  // Generate placeholder images for the gallery
  const galleryImages = [
    // Column 1
    [
      {
        src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400' fill='%23f3f4f6'><rect width='300' height='400' fill='%23e5e7eb'/><rect x='50' y='100' width='200' height='200' fill='%23d1d5db' rx='10'/><text x='150' y='210' text-anchor='middle' fill='%23374151' font-size='16'>Interior View</text></svg>",
        alt: "Cozy bakery interior with warm lighting",
        height: "h-64",
      },
      {
        src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 250' fill='%23f3f4f6'><rect width='300' height='250' fill='%23e5e7eb'/><circle cx='150' cy='125' r='60' fill='%23d1d5db'/><text x='150' y='130' text-anchor='middle' fill='%23374151' font-size='14'>Fresh Pastries</text></svg>",
        alt: "Display case filled with fresh pastries",
        height: "h-48",
      },
    ],
    // Column 2
    [
      {
        src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' fill='%23f3f4f6'><rect width='300' height='300' fill='%23e5e7eb'/><rect x='75' y='75' width='150' height='150' fill='%23d1d5db' rx='10'/><text x='150' y='155' text-anchor='middle' fill='%23374151' font-size='14'>Coffee Bar</text></svg>",
        alt: "Espresso machine and coffee preparation area",
        height: "h-56",
      },
      {
        src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 350' fill='%23f3f4f6'><rect width='300' height='350' fill='%23e5e7eb'/><ellipse cx='150' cy='175' rx='80' ry='100' fill='%23d1d5db'/><text x='150' y='180' text-anchor='middle' fill='%23374151' font-size='14'>Artisan Breads</text></svg>",
        alt: "Freshly baked artisan breads on wooden shelves",
        height: "h-72",
      },
    ],
    // Column 3
    [
      {
        src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 280' fill='%23f3f4f6'><rect width='300' height='280' fill='%23e5e7eb'/><polygon points='150,80 200,180 100,180' fill='%23d1d5db'/><text x='150' y='190' text-anchor='middle' fill='%23374151' font-size='14'>Croissants</text></svg>",
        alt: "Golden butter croissants in a basket",
        height: "h-52",
      },
      {
        src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 320' fill='%23f3f4f6'><rect width='300' height='320' fill='%23e5e7eb'/><rect x='60' y='60' width='180' height='200' fill='%23d1d5db' rx='15'/><text x='150' y='170' text-anchor='middle' fill='%23374151' font-size='14'>Seating Area</text></svg>",
        alt: "Comfortable seating area with natural lighting",
        height: "h-60",
      },
    ],
    // Column 4
    [
      {
        src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 380' fill='%23f3f4f6'><rect width='300' height='380' fill='%23e5e7eb'/><circle cx='150' cy='140' r='50' fill='%23d1d5db'/><circle cx='150' cy='240' r='40' fill='%23d1d5db'/><text x='150' y='300' text-anchor='middle' fill='%23374151' font-size='14'>Sweet Treats</text></svg>",
        alt: "Colorful macarons and pastries",
        height: "h-68",
      },
      {
        src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 240' fill='%23f3f4f6'><rect width='300' height='240' fill='%23e5e7eb'/><rect x='80' y='80' width='140' height='80' fill='%23d1d5db' rx='8'/><text x='150' y='125' text-anchor='middle' fill='%23374151' font-size='14'>Behind Scenes</text></svg>",
        alt: "Bakers at work in the kitchen",
        height: "h-44",
      },
    ],
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Behind the Scenes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take a peek inside our bakery and see the craftsmanship that goes
            into every creation
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              {column.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className={`${image.height} rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Follow us on social media for more behind-the-scenes content!
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-brand-brown hover:text-brand-brown-dark font-medium"
            >
              @breadnbrew
            </a>
            <a
              href="#"
              className="text-brand-brown hover:text-brand-brown-dark font-medium"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-brand-brown hover:text-brand-brown-dark font-medium"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
