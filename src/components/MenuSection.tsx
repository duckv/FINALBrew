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
    "Coffee",
    "Sweets",
    "Tea",
    "Iced/Frozen",
    "Pastries",
    "Breads",
    "Pizza",
    "Breakfast",
    "Lunch",
    "Seasonal",
  ];

  const menuItems = [
    // Coffee Drinks
    {
      title: "Espresso",
      price: "$2.75",
      description: "Rich, concentrated coffee shot",
      category: "Coffee",
      image: "espresso.jpg",
      subcategory: "coffee",
    },
    {
      title: "Americano",
      price: "$3.50",
      description: "Rich espresso with hot water",
      category: "Coffee",
      image: "americano.jpg",
      subcategory: "coffee",
    },
    {
      title: "Brewed Coffee",
      price: "$2.95",
      description: "Fresh-brewed daily blend",
      category: "Coffee",
      image: "brewed-coffee.jpg",
      subcategory: "coffee",
    },
    {
      title: "Iced Coffee",
      price: "$3.25",
      description: "Smooth cold-brewed coffee over ice",
      category: "Coffee",
    },
    {
      title: "Cold Brew",
      price: "$3.75",
      description: "Smooth, slow-steeped cold coffee",
      category: "Coffee",
    },
    {
      title: "Cappuccino",
      price: "$4.50",
      description: "Equal parts espresso, steamed milk, and foam",
      category: "Coffee",
      image: "cappuccino.jpg",
      subcategory: "coffee",
    },
    {
      title: "Latte",
      price: "$5.00",
      description: "Rich espresso with steamed milk - customize with flavors",
      category: "Coffee",
      image: "latte.jpg",
      subcategory: "coffee",
    },
    {
      title: "Caramel Macchiato",
      price: "$5.75",
      description: "Espresso marked with caramel and steamed milk",
      category: "Coffee",
      image: "caramel-macchiato.jpg",
      subcategory: "coffee",
    },
    {
      title: "Mocha Latte",
      price: "$5.50",
      description: "Espresso with chocolate and steamed milk",
      category: "Coffee",
      image: "mocha-latte.jpg",
      subcategory: "coffee",
    },
    {
      title: "White Mocha Latte",
      price: "$5.75",
      description: "Espresso with white chocolate and steamed milk",
      category: "Coffee",
    },
    {
      title: "Matcha Latte",
      price: "$5.25",
      description: "Premium matcha green tea with steamed milk",
      category: "Coffee",
    },
    {
      title: "Chai Latte",
      price: "$4.75",
      description: "Spiced black tea with steamed milk",
      category: "Coffee",
    },
    {
      title: "London Fog",
      price: "$4.50",
      description: "Earl Grey tea with vanilla and steamed milk",
      category: "Coffee",
    },
    {
      title: "Hot Chocolate",
      price: "$4.25",
      description: "Rich, creamy hot chocolate with whipped cream",
      category: "Coffee",
    },

    // Niche Items
    {
      title: "Cortado",
      price: "$4.25",
      description: "Equal parts espresso and warm milk",
      category: "Coffee",
    },
    {
      title: "Flat White",
      price: "$4.75",
      description: "Double shot espresso with microfoamed milk",
      category: "Coffee",
    },

    // Hot Teas
    {
      title: "Green Tea",
      price: "$3.25",
      description: "Premium loose-leaf green tea",
      category: "Tea",
    },
    {
      title: "Earl Grey",
      price: "$3.25",
      description: "Classic bergamot-infused black tea",
      category: "Tea",
    },
    {
      title: "English Breakfast",
      price: "$3.25",
      description: "Traditional robust black tea blend",
      category: "Tea",
    },
    {
      title: "Peppermint Tea",
      price: "$3.25",
      description: "Refreshing peppermint herbal tea",
      category: "Tea",
    },

    // Iced/Frozen
    {
      title: "Fresh Lemonade",
      price: "$3.75",
      description: "House-made with fresh lemons",
      category: "Iced/Frozen",
    },
    {
      title: "Iced Green Tea",
      price: "$3.50",
      description: "Refreshing cold-brewed green tea",
      category: "Iced/Frozen",
    },
    {
      title: "Iced Black Tea",
      price: "$3.50",
      description: "Classic iced tea, sweetened or unsweetened",
      category: "Iced/Frozen",
    },
    {
      title: "Mixed Berry Smoothie",
      price: "$6.25",
      description: "Blend of berries, yogurt, and honey",
      category: "Iced/Frozen",
    },
    {
      title: "Mango Smoothie",
      price: "$6.25",
      description: "Fresh mango with yogurt and lime",
      category: "Iced/Frozen",
    },
    {
      title: "Coffee Frappe",
      price: "$5.75",
      description: "Blended iced coffee with whipped cream",
      category: "Iced/Frozen",
    },
    {
      title: "Mocha Frappe",
      price: "$6.25",
      description: "Chocolate coffee frappe with whipped cream",
      category: "Iced/Frozen",
    },

    // Pastries
    {
      title: "Butter Croissant",
      price: "$4.50",
      description: "Flaky, buttery, and baked to golden perfection",
      category: "Pastries",
      hasToastOptions: true,
      image: "butter-croissant.jpg",
      subcategory: "pastries",
    },
    {
      title: "Cinnamon Bun",
      price: "$5.50",
      description: "Sweet, spiral pastry with cinnamon and sugar",
      category: "Pastries",
      hasToastOptions: true,
      image: "cinnamon-bun.jpg",
      subcategory: "pastries",
    },
    {
      title: "Almond Croissant",
      price: "$5.75",
      description: "Classic croissant filled with almond paste",
      category: "Pastries",
      hasToastOptions: true,
      image: "almond-croissant.jpg",
      subcategory: "pastries",
    },
    {
      title: "Pain au Chocolat",
      price: "$5.25",
      description: "Buttery pastry with rich dark chocolate",
      category: "Pastries",
      hasToastOptions: true,
      image: "pain-au-chocolat.jpg",
      subcategory: "pastries",
    },
    // French Pastries
    {
      title: "Madeleine",
      price: "$3.50",
      description: "Shell-shaped sponge cake with lemon zest",
      category: "Pastries",
      image: "madeleine.jpg",
      subcategory: "pastries",
    },
    {
      title: "Macaron",
      price: "$3.25",
      description: "Delicate almond meringue sandwich cookies",
      category: "Pastries",
      image: "macaron.jpg",
      subcategory: "pastries",
    },
    {
      title: "Profiterole",
      price: "$4.75",
      description: "Choux pastry filled with cream and chocolate drizzle",
      category: "Pastries",
    },
    {
      title: "Mille-feuille",
      price: "$6.50",
      description: "Napoleon pastry with layers of puff pastry and cream",
      category: "Pastries",
    },
    {
      title: "Tarte Tatin",
      price: "$7.25",
      description: "Upside-down apple tart with caramelized apples",
      category: "Pastries",
    },
    {
      title: "Croquembouche",
      price: "$8.50",
      description: "Tower of cream puffs bound with caramel",
      category: "Pastries",
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

    // Pizza
    {
      title: "Margherita Pizza",
      price: "$16.50",
      description:
        "Fresh mozzarella, tomato sauce, and basil on our house-made dough",
      category: "Pizza",
      image: "margherita-pizza.jpg",
      subcategory: "pizza",
    },
    {
      title: "Classic Cheese Pizza",
      price: "$15.00",
      description: "Traditional cheese pizza with option to add pepperoni",
      category: "Pizza",
      hasCustomizations: true,
      image: "classic-cheese-pizza.jpg",
      subcategory: "pizza",
    },
    {
      title: "Spicy Brooklyn Pizza",
      price: "$18.75",
      description: "Pepperoni, jalapeños, and spicy sauce on thin crust",
      category: "Pizza",
      image: "spicy-brooklyn-pizza.jpg",
      subcategory: "pizza",
    },
    {
      title: "Flatbread Pizza",
      price: "$14.50",
      description: "Artisan flatbread with seasonal toppings",
      category: "Pizza",
      image: "flatbread-pizza.jpg",
      subcategory: "pizza",
    },

    // Breakfast
    {
      title: "Bacon Egg & Cheese",
      price: "$8.50",
      description:
        "Crispy bacon, scrambled eggs, and melted cheese on a fresh roll",
      category: "Breakfast",
    },
    {
      title: "Avocado Toast",
      price: "$9.75",
      description:
        "Smashed avocado on multigrain bread with sea salt and lemon",
      category: "Breakfast",
      hasCustomizations: true,
    },

    // Lunch
    {
      title: "Turkey & Swiss",
      price: "$12.50",
      description:
        "Sliced turkey breast with Swiss cheese, lettuce, and tomato",
      category: "Lunch",
    },
    {
      title: "Caprese Sandwich",
      price: "$11.75",
      description:
        "Fresh mozzarella, tomatoes, basil, and balsamic on ciabatta",
      category: "Lunch",
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
