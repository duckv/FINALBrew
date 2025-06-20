import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Pastries",
    "Breads",
    "Coffee",
    "Sweets",
    "Tea",
    "Seasonal",
    "Breakfast",
    "Lunch",
    "Pizza",
  ];

  const menuItems = [
    // Pastries
    {
      title: "Butter Croissant",
      price: "$4.50",
      description: "Flaky, buttery, and baked to golden perfection",
      category: "Pastries",
      hasToastOptions: true,
    },
    {
      title: "Cinnamon Bun",
      price: "$5.50",
      description: "Sweet, spiral pastry with cinnamon and sugar",
      category: "Pastries",
      hasToastOptions: true,
    },
    {
      title: "Almond Croissant",
      price: "$5.75",
      description: "Classic croissant filled with almond paste",
      category: "Pastries",
      hasToastOptions: true,
    },
    {
      title: "Pain au Chocolat",
      price: "$5.25",
      description: "Buttery pastry with rich dark chocolate",
      category: "Pastries",
      hasToastOptions: true,
    },

    // Breads
    {
      title: "Sourdough",
      price: "$17.00",
      description: "Traditional sourdough with tangy flavor",
      category: "Breads",
      hasSliceOptions: true,
    },
    {
      title: "French Baguette",
      price: "$6.50",
      description: "Crispy crust with soft, airy interior",
      category: "Breads",
      hasSliceOptions: true,
    },
    {
      title: "Multigrain Loaf",
      price: "$12.00",
      description: "Nutritious blend of seeds and grains",
      category: "Breads",
      hasSliceOptions: true,
    },

    // Coffee
    {
      title: "Artisan Latte",
      price: "$5.00",
      description: "Rich espresso with steamed milk",
      category: "Coffee",
    },
    {
      title: "Cappuccino",
      price: "$4.50",
      description: "Equal parts espresso, steamed milk, and foam",
      category: "Coffee",
    },
    {
      title: "Americano",
      price: "$3.50",
      description: "Rich espresso with hot water",
      category: "Coffee",
    },
    {
      title: "Mocha",
      price: "$5.50",
      description: "Espresso with chocolate and steamed milk",
      category: "Coffee",
    },

    // Sweets
    {
      title: "Chocolate Éclair",
      price: "$6.50",
      description: "Choux pastry filled with cream and chocolate",
      category: "Sweets",
    },
    {
      title: "Fruit Tart",
      price: "$7.25",
      description: "Pastry shell with custard and fresh fruit",
      category: "Sweets",
    },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ??
        false);
    return matchesCategory && matchesSearch;
  });

  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof menuItems>,
  );

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted selection of artisan breads,
            pastries, and beverages
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-100 rounded-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "whitespace-nowrap",
                    activeCategory === category
                      ? "bg-brand-brown hover:bg-brand-brown-dark text-white"
                      : "text-brand-brown border-brand-brown hover:bg-brand-brown hover:text-white",
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-16">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-heading text-3xl font-bold text-brand-brown mb-8 border-b-2 border-brand-brown inline-block pb-2">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                  <ProductCard key={`${category}-${index}`} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No items found matching your search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
