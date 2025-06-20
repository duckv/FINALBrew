/**
 * =====================================================
 * BREAD N' BREW - MAIN JAVASCRIPT
 * =====================================================
 *
 * Professional JavaScript for the Bread N' Brew bakery website.
 * Handles all interactive functionality including:
 * - Menu filtering and search
 * - Shopping cart management
 * - Modal interactions
 * - Mobile navigation
 * - Form submissions
 * - Toast notifications
 *
 * Author: Professional Web Developer
 * Version: 1.0.0
 */

// =====================================================
// GLOBAL CONSTANTS AND CONFIGURATION
// =====================================================

const CONFIG = {
  MAX_CART_TOTAL: 150, // Maximum cart total before tax and tip
  MAX_ITEM_QUANTITY: 25, // Maximum quantity per item
  TOAST_DURATION: 3000, // Toast notification duration in ms
  ANIMATION_DURATION: 300, // Standard animation duration in ms
};

// =====================================================
// MENU DATA
// =====================================================

const MENU_DATA = [
  // Coffee Drinks
  {
    title: "Espresso",
    price: "$2.75",
    description: "Rich, concentrated coffee shot",
    category: "Coffee",
    image: "coffee-placeholder.svg",
    allergens: [],
  },
  {
    title: "Americano",
    price: "$3.50",
    description: "Rich espresso with hot water",
    category: "Coffee",
    image: "coffee-placeholder.svg",
    allergens: [],
  },
  {
    title: "Brewed Coffee",
    price: "$2.95",
    description: "Fresh-brewed daily blend",
    category: "Coffee",
    image: "coffee-placeholder.svg",
    allergens: [],
  },
  {
    title: "Cappuccino",
    price: "$4.50",
    description: "Equal parts espresso, steamed milk, and foam",
    category: "Coffee",
    image: "coffee-placeholder.svg",
    allergens: ["milk"],
  },
  {
    title: "Latte",
    price: "$5.00",
    description: "Rich espresso with steamed milk - customize with flavors",
    category: "Coffee",
    image: "coffee-placeholder.svg",
    allergens: ["milk"],
  },
  {
    title: "Caramel Macchiato",
    price: "$5.75",
    description: "Espresso marked with caramel and steamed milk",
    category: "Coffee",
    image: "coffee-placeholder.svg",
    allergens: ["milk"],
  },
  {
    title: "Mocha Latte",
    price: "$5.50",
    description: "Espresso with chocolate and steamed milk",
    category: "Coffee",
    image: "coffee-placeholder.svg",
    allergens: ["milk"],
  },
  {
    title: "Chai Latte",
    price: "$4.75",
    description: "Spiced black tea with steamed milk",
    category: "Coffee",
    image: "coffee-placeholder.svg",
    allergens: ["milk"],
  },

  // Hot Teas
  {
    title: "Green Tea",
    price: "$3.25",
    description: "Premium loose-leaf green tea",
    category: "Tea",
    image: "tea-placeholder.svg",
    allergens: [],
  },
  {
    title: "Earl Grey",
    price: "$3.25",
    description: "Classic bergamot-infused black tea",
    category: "Tea",
    image: "tea-placeholder.svg",
    allergens: [],
  },
  {
    title: "English Breakfast",
    price: "$3.25",
    description: "Traditional robust black tea blend",
    category: "Tea",
    image: "tea-placeholder.svg",
    allergens: [],
  },
  {
    title: "Peppermint Tea",
    price: "$3.25",
    description: "Refreshing peppermint herbal tea",
    category: "Tea",
    image: "tea-placeholder.svg",
    allergens: [],
  },

  // Iced/Frozen
  {
    title: "Fresh Lemonade",
    price: "$3.75",
    description: "House-made with fresh lemons",
    category: "Iced/Frozen",
    image: "drink-placeholder.svg",
    allergens: [],
  },
  {
    title: "Iced Green Tea",
    price: "$3.50",
    description: "Refreshing cold-brewed green tea",
    category: "Iced/Frozen",
    image: "drink-placeholder.svg",
    allergens: [],
  },
  {
    title: "Mixed Berry Smoothie",
    price: "$6.25",
    description: "Blend of berries, yogurt, and honey",
    category: "Iced/Frozen",
    image: "drink-placeholder.svg",
    allergens: ["milk"],
  },
  {
    title: "Coffee Frappe",
    price: "$5.75",
    description: "Blended iced coffee with whipped cream",
    category: "Iced/Frozen",
    image: "drink-placeholder.svg",
    allergens: ["milk"],
  },

  // Pastries
  {
    title: "Butter Croissant",
    price: "$4.50",
    description: "Flaky, buttery, and baked to golden perfection",
    category: "Pastries",
    image: "pastry-placeholder.svg",
    allergens: ["wheat", "milk", "eggs"],
    hasToastOptions: true,
  },
  {
    title: "Cinnamon Bun",
    price: "$5.50",
    description: "Sweet, spiral pastry with cinnamon and sugar",
    category: "Pastries",
    image: "pastry-placeholder.svg",
    allergens: ["wheat", "milk", "eggs"],
    hasToastOptions: true,
  },
  {
    title: "Almond Croissant",
    price: "$5.75",
    description: "Classic croissant filled with almond paste",
    category: "Pastries",
    image: "pastry-placeholder.svg",
    allergens: ["wheat", "milk", "eggs", "tree nuts"],
    hasToastOptions: true,
  },
  {
    title: "Pain au Chocolat",
    price: "$5.25",
    description: "Buttery pastry with rich dark chocolate",
    category: "Pastries",
    image: "pastry-placeholder.svg",
    allergens: ["wheat", "milk", "eggs"],
    hasToastOptions: true,
  },
  {
    title: "Madeleine",
    price: "$3.50",
    description: "Shell-shaped sponge cake with lemon zest",
    category: "Pastries",
    image: "pastry-placeholder.svg",
    allergens: ["wheat", "milk", "eggs"],
  },
  {
    title: "Macaron",
    price: "$3.25",
    description: "Delicate almond meringue sandwich cookies",
    category: "Pastries",
    image: "pastry-placeholder.svg",
    allergens: ["tree nuts", "eggs"],
  },

  // Breads
  {
    title: "Sourdough",
    price: "$17.00",
    description: "Traditional sourdough with tangy flavor",
    category: "Breads",
    image: "bread-placeholder.svg",
    allergens: ["wheat"],
    hasSliceOptions: true,
  },
  {
    title: "French Baguette",
    price: "$6.50",
    description: "Crispy crust with soft, airy interior",
    category: "Breads",
    image: "bread-placeholder.svg",
    allergens: ["wheat"],
    hasSliceOptions: true,
  },
  {
    title: "Multigrain Loaf",
    price: "$12.00",
    description: "Nutritious blend of seeds and grains",
    category: "Breads",
    image: "bread-placeholder.svg",
    allergens: ["wheat", "sesame"],
    hasSliceOptions: true,
  },

  // Pizza
  {
    title: "Margherita Pizza",
    price: "$16.50",
    description:
      "Fresh mozzarella, tomato sauce, and basil on our house-made dough",
    category: "Pizza",
    image: "pizza-placeholder.svg",
    allergens: ["wheat", "milk"],
  },
  {
    title: "Classic Cheese Pizza",
    price: "$15.00",
    description: "Traditional cheese pizza with option to add pepperoni",
    category: "Pizza",
    image: "pizza-placeholder.svg",
    allergens: ["wheat", "milk"],
    hasCustomizations: true,
  },
  {
    title: "Spicy Brooklyn Pizza",
    price: "$18.75",
    description: "Pepperoni, jalapeños, and spicy sauce on thin crust",
    category: "Pizza",
    image: "pizza-placeholder.svg",
    allergens: ["wheat", "milk"],
  },

  // Breakfast
  {
    title: "Bacon Egg & Cheese",
    price: "$8.50",
    description:
      "Crispy bacon, scrambled eggs, and melted cheese on a fresh roll",
    category: "Breakfast",
    image: "breakfast-placeholder.svg",
    allergens: ["wheat", "milk", "eggs"],
  },
  {
    title: "Avocado Toast",
    price: "$9.75",
    description: "Smashed avocado on multigrain bread with sea salt and lemon",
    category: "Breakfast",
    image: "breakfast-placeholder.svg",
    allergens: ["wheat"],
    hasCustomizations: true,
  },

  // Lunch
  {
    title: "Turkey & Swiss",
    price: "$12.50",
    description: "Sliced turkey breast with Swiss cheese, lettuce, and tomato",
    category: "Lunch",
    image: "sandwich-placeholder.svg",
    allergens: ["wheat", "milk"],
  },
  {
    title: "Caprese Sandwich",
    price: "$11.75",
    description: "Fresh mozzarella, tomatoes, basil, and balsamic on ciabatta",
    category: "Lunch",
    image: "sandwich-placeholder.svg",
    allergens: ["wheat", "milk"],
  },

  // Sweets
  {
    title: "Chocolate Éclair",
    price: "$6.50",
    description: "Choux pastry filled with cream and chocolate",
    category: "Sweets",
    image: "pastry-placeholder.svg",
    allergens: ["wheat", "milk", "eggs"],
  },
  {
    title: "Fruit Tart",
    price: "$7.25",
    description: "Pastry shell with custard and fresh fruit",
    category: "Sweets",
    image: "pastry-placeholder.svg",
    allergens: ["wheat", "milk", "eggs"],
  },
];

// =====================================================
// STATE MANAGEMENT
// =====================================================

/**
 * Global application state
 */
const APP_STATE = {
  cart: {
    items: [],
    total: 0,
    itemCount: 0,
  },
  ui: {
    isCartOpen: false,
    isMobileMenuOpen: false,
    activeCategory: "All",
    searchQuery: "",
    currentModal: null,
    currentProduct: null,
    productQuantities: {},
  },
  filters: {
    categories: [
      "All",
      "Pastries",
      "Coffee",
      "Sweets",
      "Tea",
      "Iced/Frozen",
      "Breads",
      "Pizza",
      "Breakfast",
      "Lunch",
    ],
  },
};

/**
 * Cart item structure
 * @typedef {Object} CartItem
 * @property {string} id - Unique identifier
 * @property {string} name - Product name
 * @property {number} price - Price per unit
 * @property {number} quantity - Quantity in cart
 * @property {string} image - Image URL/path
 * @property {string} category - Product category
 * @property {Array} customizations - Applied customizations
 */

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Generates a unique ID for cart items
 * @returns {string} Unique identifier
 */
function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

/**
 * Formats a number as currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Parses a currency string to a number
 * @param {string} currencyString - Currency string like "$5.50"
 * @returns {number} Numeric value
 */
function parseCurrency(currencyString) {
  return parseFloat(currencyString.replace("$", ""));
}

/**
 * Debounces a function call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Creates a placeholder image data URL
 * @param {string} text - Text to display in placeholder
 * @param {string} bgColor - Background color
 * @returns {string} Data URL for placeholder image
 */
function createPlaceholderImage(text, bgColor = "#e5e7eb") {
  return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150' fill='${bgColor}'><rect width='200' height='150' fill='${bgColor}'/><text x='100' y='80' text-anchor='middle' fill='%23374151' font-size='12'>${text}</text></svg>`;
}

// =====================================================
// CART MANAGEMENT
// =====================================================

/**
 * Cart management functions
 */
const Cart = {
  /**
   * Adds an item to the cart
   * @param {Object} item - Item to add
   * @returns {boolean} Success status
   */
  addItem(item) {
    // Check if adding this item would exceed the cart total limit
    const currentTotal = this.getTotal();
    const itemTotal = item.price * item.quantity;

    if (currentTotal + itemTotal > CONFIG.MAX_CART_TOTAL) {
      showModal("orderLimitModal");
      return false;
    }

    // Check if item already exists in cart
    const existingItemIndex = APP_STATE.cart.items.findIndex(
      (cartItem) =>
        cartItem.name === item.name && cartItem.category === item.category,
    );

    if (existingItemIndex !== -1) {
      // Update existing item quantity
      const existingItem = APP_STATE.cart.items[existingItemIndex];
      const newQuantity = Math.min(
        existingItem.quantity + item.quantity,
        CONFIG.MAX_ITEM_QUANTITY,
      );

      // Check total limit again with new quantity
      const newItemTotal = existingItem.price * newQuantity;
      const newCartTotal =
        currentTotal -
        existingItem.price * existingItem.quantity +
        newItemTotal;

      if (newCartTotal > CONFIG.MAX_CART_TOTAL) {
        showModal("orderLimitModal");
        return false;
      }

      APP_STATE.cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item
      const cartItem = {
        id: generateId(),
        name: item.name,
        price: item.price,
        quantity: Math.min(item.quantity, CONFIG.MAX_ITEM_QUANTITY),
        image: item.image || createPlaceholderImage(item.category),
        category: item.category,
        customizations: item.customizations || [],
      };
      APP_STATE.cart.items.push(cartItem);
    }

    this.updateTotals();
    this.updateUI();
    return true;
  },

  /**
   * Removes an item from the cart
   * @param {string} itemId - ID of item to remove
   */
  removeItem(itemId) {
    APP_STATE.cart.items = APP_STATE.cart.items.filter(
      (item) => item.id !== itemId,
    );
    this.updateTotals();
    this.updateUI();
  },

  /**
   * Updates the quantity of an item in the cart
   * @param {string} itemId - ID of item to update
   * @param {number} quantity - New quantity
   * @returns {boolean} Success status
   */
  updateQuantity(itemId, quantity) {
    if (quantity <= 0) {
      this.removeItem(itemId);
      return true;
    }

    const clampedQuantity = Math.min(quantity, CONFIG.MAX_ITEM_QUANTITY);

    // Find the item
    const itemIndex = APP_STATE.cart.items.findIndex(
      (item) => item.id === itemId,
    );
    if (itemIndex === -1) return false;

    // Calculate new total
    const item = APP_STATE.cart.items[itemIndex];
    const currentTotal = this.getTotal();
    const oldItemTotal = item.price * item.quantity;
    const newItemTotal = item.price * clampedQuantity;
    const newCartTotal = currentTotal - oldItemTotal + newItemTotal;

    if (newCartTotal > CONFIG.MAX_CART_TOTAL) {
      showModal("orderLimitModal");
      return false;
    }

    APP_STATE.cart.items[itemIndex].quantity = clampedQuantity;
    this.updateTotals();
    this.updateUI();
    return true;
  },

  /**
   * Clears all items from the cart
   */
  clearCart() {
    APP_STATE.cart.items = [];
    this.updateTotals();
    this.updateUI();
  },

  /**
   * Gets the total number of items in the cart
   * @returns {number} Total item count
   */
  getItemCount() {
    return APP_STATE.cart.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  },

  /**
   * Gets the total price of items in the cart
   * @returns {number} Total price
   */
  getTotal() {
    return APP_STATE.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  },

  /**
   * Updates the cart totals in state
   */
  updateTotals() {
    APP_STATE.cart.total = this.getTotal();
    APP_STATE.cart.itemCount = this.getItemCount();
  },

  /**
   * Updates all cart-related UI elements
   */
  updateUI() {
    this.updateCartDisplay();
    this.updateCartSidebar();
    this.updateFloatingCart();
  },

  /**
   * Updates the cart count display in header
   */
  updateCartDisplay() {
    const cartCount = document.getElementById("cartCount");
    const floatingCartCount = document.getElementById("floatingCartCount");
    const itemCount = this.getItemCount();

    if (cartCount) {
      cartCount.textContent = itemCount;
      cartCount.className = itemCount > 0 ? "cart-count show" : "cart-count";
    }

    if (floatingCartCount) {
      floatingCartCount.textContent = itemCount;
    }
  },

  /**
   * Updates the cart sidebar content
   */
  updateCartSidebar() {
    const cartItems = document.getElementById("cartItems");
    const cartEmpty = document.getElementById("cartEmpty");
    const cartFooter = document.getElementById("cartFooter");
    const cartSubtotal = document.getElementById("cartSubtotal");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems) return;

    if (APP_STATE.cart.items.length === 0) {
      cartItems.style.display = "none";
      cartEmpty.style.display = "flex";
      cartFooter.style.display = "none";
    } else {
      cartItems.style.display = "block";
      cartEmpty.style.display = "none";
      cartFooter.style.display = "block";

      // Render cart items
      cartItems.innerHTML = APP_STATE.cart.items
        .map(
          (item) => `
        <div class="cart-item">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${formatCurrency(item.price)}</div>
            <div class="cart-item-controls">
              <button class="cart-item-qty-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity - 1})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <span class="cart-item-quantity">${item.quantity}</span>
              <button class="cart-item-qty-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity + 1})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <button class="cart-item-remove" onclick="Cart.removeItem('${item.id}')" aria-label="Remove item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3,6 5,6 21,6"></polyline>
                  <path d="m19,6v14a2,2 0,0 1,-2,2H7a2,2 0,0 1,-2,-2V6m3,0V4a2,2 0,0 1,2,-2h4a2,2 0,0 1,2,2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `,
        )
        .join("");

      // Update totals
      const subtotal = this.getTotal();
      if (cartSubtotal) cartSubtotal.textContent = formatCurrency(subtotal);
      if (cartTotal) cartTotal.textContent = formatCurrency(subtotal);
    }
  },

  /**
   * Updates the floating cart button visibility
   */
  updateFloatingCart() {
    const floatingCart = document.getElementById("floatingCart");
    if (!floatingCart) return;

    const itemCount = this.getItemCount();
    if (itemCount > 0) {
      floatingCart.style.display = "flex";
    } else {
      floatingCart.style.display = "none";
    }
  },
};

// =====================================================
// MENU FUNCTIONALITY
// =====================================================

/**
 * Menu management functions
 */
const Menu = {
  /**
   * Initializes the menu display
   */
  init() {
    this.renderCategoryFilters();
    this.renderMenuItems();
    this.setupSearch();
  },

  /**
   * Renders the category filter buttons
   */
  renderCategoryFilters() {
    const filterContainer = document.getElementById("categoryFilters");
    if (!filterContainer) return;

    filterContainer.innerHTML = APP_STATE.filters.categories
      .map(
        (category) => `
      <button 
        class="filter-btn ${category === APP_STATE.ui.activeCategory ? "active" : ""}"
        onclick="Menu.filterByCategory('${category}')"
      >
        ${category}
      </button>
    `,
      )
      .join("");
  },

  /**
   * Renders the menu items based on current filters
   */
  renderMenuItems() {
    const menuContent = document.getElementById("menuContent");
    const noResults = document.getElementById("noResults");
    if (!menuContent) return;

    const filteredItems = this.getFilteredItems();

    if (filteredItems.length === 0) {
      menuContent.style.display = "none";
      noResults.style.display = "block";
      return;
    }

    menuContent.style.display = "block";
    noResults.style.display = "none";

    // Group items by category
    const groupedItems = this.groupItemsByCategory(filteredItems);

    menuContent.innerHTML = Object.entries(groupedItems)
      .map(
        ([category, items]) => `
      <div class="menu-category">
        <h3 class="category-title">${category}</h3>
        <div class="menu-grid">
          ${items.map((item) => this.renderProductCard(item)).join("")}
        </div>
      </div>
    `,
      )
      .join("");
  },

  /**
   * Gets filtered menu items based on current state
   * @returns {Array} Filtered menu items
   */
  getFilteredItems() {
    let items = MENU_DATA;

    // Filter by category
    if (APP_STATE.ui.activeCategory !== "All") {
      items = items.filter(
        (item) => item.category === APP_STATE.ui.activeCategory,
      );
    }

    // Filter by search query
    if (APP_STATE.ui.searchQuery) {
      const query = APP_STATE.ui.searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query),
      );
    }

    return items;
  },

  /**
   * Groups menu items by category
   * @param {Array} items - Items to group
   * @returns {Object} Items grouped by category
   */
  groupItemsByCategory(items) {
    return items.reduce((groups, item) => {
      const category = item.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {});
  },

  /**
   * Renders a single product card
   * @param {Object} item - Menu item to render
   * @returns {string} HTML string for product card
   */
  renderProductCard(item) {
    const itemId = item.title.replace(/\s+/g, "-").toLowerCase();
    const currentQuantity = APP_STATE.ui.productQuantities[itemId] || 1;
    const hasAllergens = item.allergens && item.allergens.length > 0;

    return `
      <div class="product-card" data-category="${item.category}">
        <div class="product-image">
          <img src="${this.getProductImage(item)}" alt="${item.title}" />
        </div>
        <div class="product-info">
          <div class="product-header">
            <h3 class="product-title">${item.title}</h3>
            <span class="product-price">${item.price}</span>
          </div>
          
          ${item.description ? `<p class="product-description">${item.description}</p>` : ""}
          
          ${this.renderProductOptions(item)}
          
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="Menu.updateProductQuantity('${itemId}', ${currentQuantity - 1})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <span class="quantity-display">${currentQuantity}</span>
            <button class="quantity-btn" onclick="Menu.updateProductQuantity('${itemId}', ${currentQuantity + 1})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
          
          <div class="product-actions">
            <button class="add-to-cart-btn" onclick="Menu.addToCart('${itemId}')">
              Add to Cart
            </button>
            
            <div class="product-secondary-actions">
              <button class="secondary-btn" onclick="Menu.showCustomizeModal('${itemId}')">
                Customize
              </button>
              <button class="secondary-btn ${hasAllergens ? "text-warning" : ""}" onclick="Menu.showAllergenModal('${itemId}')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Allergens
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Renders product options (toast, slice, customization info)
   * @param {Object} item - Menu item
   * @returns {string} HTML string for options
   */
  renderProductOptions(item) {
    let options = [];

    if (item.hasToastOptions) {
      options.push("Toast Options Available");
    }

    if (item.hasSliceOptions) {
      options.push("Slicing Options Available");
    }

    if (item.hasCustomizations) {
      if (item.title.toLowerCase().includes("classic cheese pizza")) {
        options.push("Add pepperoni for $1.50");
      }
      if (item.title.toLowerCase().includes("avocado toast")) {
        options.push("Add bacon for $2.00");
      }
    }

    return options.length > 0
      ? `
      <div class="product-options">
        ${options.map((option) => `<p>${option}</p>`).join("")}
      </div>
    `
      : "";
  },

  /**
   * Gets the appropriate image for a product
   * @param {Object} item - Menu item
   * @returns {string} Image URL or placeholder
   */
  getProductImage(item) {
    // In a real application, these would be actual image URLs
    const categoryImages = {
      Coffee: createPlaceholderImage("Coffee", "#8b4513"),
      Tea: createPlaceholderImage("Tea", "#90EE90"),
      "Iced/Frozen": createPlaceholderImage("Cold Drink", "#87CEEB"),
      Pastries: createPlaceholderImage("Pastry", "#DEB887"),
      Breads: createPlaceholderImage("Bread", "#D2B48C"),
      Pizza: createPlaceholderImage("Pizza", "#FF6347"),
      Breakfast: createPlaceholderImage("Breakfast", "#FFD700"),
      Lunch: createPlaceholderImage("Sandwich", "#F0E68C"),
      Sweets: createPlaceholderImage("Sweet", "#FFB6C1"),
    };

    return categoryImages[item.category] || createPlaceholderImage("Food");
  },

  /**
   * Updates the quantity for a specific product
   * @param {string} itemId - Product identifier
   * @param {number} quantity - New quantity
   */
  updateProductQuantity(itemId, quantity) {
    const clampedQuantity = Math.max(
      1,
      Math.min(quantity, CONFIG.MAX_ITEM_QUANTITY),
    );
    APP_STATE.ui.productQuantities[itemId] = clampedQuantity;

    // Update the display
    const quantityDisplay = document.querySelector(
      `[data-product-id="${itemId}"] .quantity-display`,
    );
    if (quantityDisplay) {
      quantityDisplay.textContent = clampedQuantity;
    }

    // Re-render to update the display
    this.renderMenuItems();
  },

  /**
   * Adds a product to the cart
   * @param {string} itemId - Product identifier
   */
  addToCart(itemId) {
    const item = MENU_DATA.find(
      (menuItem) =>
        menuItem.title.replace(/\s+/g, "-").toLowerCase() === itemId,
    );

    if (!item) return;

    const quantity = APP_STATE.ui.productQuantities[itemId] || 1;
    const cartItem = {
      name: item.title,
      price: parseCurrency(item.price),
      quantity: quantity,
      image: this.getProductImage(item),
      category: item.category,
    };

    const success = Cart.addItem(cartItem);
    if (success) {
      showToast(
        `Added ${quantity} ${item.title}${quantity > 1 ? "s" : ""} to cart`,
        "success",
      );
      // Reset quantity to 1 after adding
      APP_STATE.ui.productQuantities[itemId] = 1;
      this.renderMenuItems();
    }
  },

  /**
   * Filters menu items by category
   * @param {string} category - Category to filter by
   */
  filterByCategory(category) {
    APP_STATE.ui.activeCategory = category;
    this.renderCategoryFilters();
    this.renderMenuItems();
  },

  /**
   * Sets up the search functionality
   */
  setupSearch() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    const debouncedSearch = debounce((query) => {
      APP_STATE.ui.searchQuery = query;
      this.renderMenuItems();
    }, 300);

    searchInput.addEventListener("input", (e) => {
      debouncedSearch(e.target.value);
    });
  },

  /**
   * Shows the customize modal for a product
   * @param {string} itemId - Product identifier
   */
  showCustomizeModal(itemId) {
    const item = MENU_DATA.find(
      (menuItem) =>
        menuItem.title.replace(/\s+/g, "-").toLowerCase() === itemId,
    );

    if (!item) return;

    APP_STATE.ui.currentProduct = item;
    this.populateCustomizeModal(item);
    showModal("customizeModal");
  },

  /**
   * Shows the allergen modal for a product
   * @param {string} itemId - Product identifier
   */
  showAllergenModal(itemId) {
    const item = MENU_DATA.find(
      (menuItem) =>
        menuItem.title.replace(/\s+/g, "-").toLowerCase() === itemId,
    );

    if (!item) return;

    this.populateAllergenModal(item);
    showModal("allergenModal");
  },

  /**
   * Populates the customize modal with product-specific options
   * @param {Object} item - Menu item
   */
  populateCustomizeModal(item) {
    const title = document.getElementById("customizeTitle");
    const body = document.getElementById("customizeBody");

    if (title) {
      title.textContent = `Customize ${item.title}`;
    }

    if (body) {
      let customizations = [];

      // Add common customizations based on item type
      if (
        item.category === "Coffee" &&
        item.title.toLowerCase().includes("latte")
      ) {
        customizations.push(
          {
            name: "Extra Shot",
            price: 0.75,
            description: "Add an extra shot of espresso",
          },
          { name: "Decaf", price: 0, description: "Make it decaffeinated" },
          {
            name: "Oat Milk",
            price: 0.6,
            description: "Substitute with oat milk",
          },
          {
            name: "Almond Milk",
            price: 0.6,
            description: "Substitute with almond milk",
          },
          { name: "Extra Hot", price: 0, description: "Serve extra hot" },
        );
      } else if (item.hasToastOptions) {
        customizations.push(
          { name: "Toasted", price: 0, description: "Lightly toasted" },
          {
            name: "Well Toasted",
            price: 0,
            description: "Golden brown and crispy",
          },
        );
      } else if (item.hasSliceOptions) {
        customizations.push(
          {
            name: "Sliced",
            price: 0,
            description: "Pre-sliced for convenience",
          },
          { name: "Thick Sliced", price: 0, description: "Thick cut slices" },
        );
      }

      // Add specific customizations
      if (item.title.toLowerCase().includes("classic cheese pizza")) {
        customizations.push({
          name: "Add Pepperoni",
          price: 1.5,
          description: "Classic pepperoni topping",
        });
      }

      if (item.title.toLowerCase().includes("avocado toast")) {
        customizations.push(
          { name: "Add Bacon", price: 2.0, description: "Crispy bacon strips" },
          { name: "Add Egg", price: 1.5, description: "Fried or poached egg" },
        );
      }

      body.innerHTML =
        customizations.length > 0
          ? `
        <div class="customization-section">
          <h4>Available Customizations</h4>
          ${customizations
            .map(
              (custom, index) => `
            <div class="customization-option" data-customization="${index}">
              <div class="customization-info">
                <div class="customization-name">${custom.name}</div>
                <div class="customization-description">${custom.description}</div>
              </div>
              <div class="customization-price">
                ${custom.price > 0 ? `+${formatCurrency(custom.price)}` : "Free"}
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      `
          : `
        <p>No customizations available for this item.</p>
      `;

      // Add click handlers for customization options
      body.querySelectorAll(".customization-option").forEach((option) => {
        option.addEventListener("click", () => {
          option.classList.toggle("selected");
        });
      });
    }
  },

  /**
   * Populates the allergen modal with product-specific allergen information
   * @param {Object} item - Menu item
   */
  populateAllergenModal(item) {
    const title = document.getElementById("allergenTitle");
    const body = document.getElementById("allergenBody");

    if (title) {
      title.textContent = `Allergen Information - ${item.title}`;
    }

    if (body) {
      const allergenInfo = {
        wheat: "Contains gluten from wheat",
        milk: "Contains dairy products",
        eggs: "Contains eggs",
        "tree nuts": "Contains tree nuts (almonds, walnuts, etc.)",
        peanuts: "Contains peanuts",
        sesame: "Contains sesame seeds",
        soy: "Contains soy products",
      };

      body.innerHTML = `
        <div class="allergen-section">
          <h4>Allergens Present</h4>
          ${
            item.allergens && item.allergens.length > 0
              ? `
            <div class="allergen-list">
              ${item.allergens
                .map(
                  (allergen) => `
                <span class="allergen-badge">${allergen}</span>
              `,
                )
                .join("")}
            </div>
            <div style="margin-top: 1rem;">
              ${item.allergens
                .map(
                  (allergen) => `
                <p><strong>${allergen.charAt(0).toUpperCase() + allergen.slice(1)}:</strong> ${allergenInfo[allergen] || "Please consult with staff"}</p>
              `,
                )
                .join("")}
            </div>
          `
              : `
            <p class="no-allergens">No common allergens detected in this item.</p>
          `
          }
          
          <div style="margin-top: 1.5rem; padding: 1rem; background: #fef3c7; border-radius: 0.5rem; border: 1px solid #f59e0b;">
            <p><strong>Important:</strong> This information is provided as a guide only. Please inform our staff of any allergies or dietary restrictions before ordering. We cannot guarantee that our products are free from allergens due to shared preparation areas.</p>
          </div>
        </div>
      `;
    }
  },
};

// =====================================================
// UI INTERACTION FUNCTIONS
// =====================================================

/**
 * Navigation and UI functions
 */

/**
 * Scrolls smoothly to the top of the page
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Scrolls smoothly to the menu section
 */
function scrollToMenu() {
  const menuSection = document.getElementById("menu");
  if (menuSection) {
    menuSection.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Toggles the mobile navigation menu
 */
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav");
  const menuBtn = document.querySelector(".mobile-menu-btn");

  if (!mobileNav || !menuBtn) return;

  APP_STATE.ui.isMobileMenuOpen = !APP_STATE.ui.isMobileMenuOpen;

  if (APP_STATE.ui.isMobileMenuOpen) {
    mobileNav.classList.add("show");
    menuBtn.classList.add("active");
  } else {
    mobileNav.classList.remove("show");
    menuBtn.classList.remove("active");
  }
}

/**
 * Closes the mobile navigation menu
 */
function closeMobileMenu() {
  const mobileNav = document.getElementById("mobileNav");
  const menuBtn = document.querySelector(".mobile-menu-btn");

  if (!mobileNav || !menuBtn) return;

  APP_STATE.ui.isMobileMenuOpen = false;
  mobileNav.classList.remove("show");
  menuBtn.classList.remove("active");
}

/**
 * Opens the shopping cart sidebar
 */
function openCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  if (!cartSidebar) return;

  APP_STATE.ui.isCartOpen = true;
  cartSidebar.classList.add("show");

  // Prevent body scrolling when cart is open
  document.body.style.overflow = "hidden";
}

/**
 * Closes the shopping cart sidebar
 */
function closeCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  if (!cartSidebar) return;

  APP_STATE.ui.isCartOpen = false;
  cartSidebar.classList.remove("show");

  // Restore body scrolling
  document.body.style.overflow = "";
}

/**
 * Shows a modal dialog
 * @param {string} modalId - ID of the modal to show
 */
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  APP_STATE.ui.currentModal = modalId;
  modal.classList.add("show");

  // Prevent body scrolling when modal is open
  document.body.style.overflow = "hidden";
}

/**
 * Closes a modal dialog
 * @param {string} modalId - ID of the modal to close
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove("show");

  // Clear current modal if it matches
  if (APP_STATE.ui.currentModal === modalId) {
    APP_STATE.ui.currentModal = null;
  }

  // Restore body scrolling
  document.body.style.overflow = "";
}

/**
 * Adds a customized product to the cart from the customize modal
 */
function addCustomizedToCart() {
  const currentProduct = APP_STATE.ui.currentProduct;
  if (!currentProduct) return;

  // Get selected customizations
  const selectedCustomizations = [];
  const customizationOptions = document.querySelectorAll(
    ".customization-option.selected",
  );
  let totalPrice = parseCurrency(currentProduct.price);

  customizationOptions.forEach((option) => {
    const index = option.dataset.customization;
    // This would need to be properly implemented with actual customization data
    selectedCustomizations.push({ name: "Custom Option", price: 0 });
  });

  const itemId = currentProduct.title.replace(/\s+/g, "-").toLowerCase();
  const quantity = APP_STATE.ui.productQuantities[itemId] || 1;

  const cartItem = {
    name:
      currentProduct.title +
      (selectedCustomizations.length > 0 ? " (Customized)" : ""),
    price: totalPrice,
    quantity: quantity,
    image: Menu.getProductImage(currentProduct),
    category: currentProduct.category,
    customizations: selectedCustomizations,
  };

  const success = Cart.addItem(cartItem);
  if (success) {
    showToast(`Added customized ${currentProduct.title} to cart`, "success");
    closeModal("customizeModal");
    // Reset quantity
    APP_STATE.ui.productQuantities[itemId] = 1;
    Menu.renderMenuItems();
  }
}

/**
 * Initiates the checkout process
 */
function checkout() {
  if (APP_STATE.cart.items.length === 0) {
    showToast("Your cart is empty", "warning");
    return;
  }

  // In a real application, this would redirect to a checkout page or process
  showToast("Checkout functionality would be implemented here", "info");
  closeCart();
}

// =====================================================
// TOAST NOTIFICATIONS
// =====================================================

/**
 * Shows a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast (success, error, warning, info)
 */
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;

  const toastId = generateId();
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.id = toastId;

  const iconSvg = {
    success:
      '<circle cx="12" cy="12" r="10"></circle><polyline points="16,12 12,8 8,12"></polyline>',
    error:
      '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',
    warning:
      '<path d="m21 21-3-6h-12l-3 6"></path><path d="m12 9v4"></path><path d="m12 17.02.01 0"></path>',
    info: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
  };

  toast.innerHTML = `
    <div class="toast-content">
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${iconSvg[type]}
      </svg>
      <div class="toast-message">${message}</div>
      <button class="toast-close" onclick="removeToast('${toastId}')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `;

  toastContainer.appendChild(toast);

  // Auto-remove after duration
  setTimeout(() => {
    removeToast(toastId);
  }, CONFIG.TOAST_DURATION);
}

/**
 * Removes a toast notification
 * @param {string} toastId - ID of toast to remove
 */
function removeToast(toastId) {
  const toast = document.getElementById(toastId);
  if (toast) {
    toast.style.animation = "slideOutRight 0.3s ease forwards";
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }
}

// =====================================================
// FORM HANDLING
// =====================================================

/**
 * Sets up form event handlers
 */
function setupForms() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }
}

/**
 * Handles contact form submission
 * @param {Event} e - Form submit event
 */
function handleContactForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  // Basic validation
  if (!data.name || !data.email || !data.subject || !data.message) {
    showToast("Please fill in all required fields", "error");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showToast("Please enter a valid email address", "error");
    return;
  }

  // In a real application, this would send the data to a server
  showToast(
    "Thank you for your message! We'll get back to you soon.",
    "success",
  );
  e.target.reset();
}

// =====================================================
// KEYBOARD NAVIGATION
// =====================================================

/**
 * Sets up keyboard event handlers for accessibility
 */
function setupKeyboardNavigation() {
  document.addEventListener("keydown", (e) => {
    // Close modals with Escape key
    if (e.key === "Escape") {
      if (APP_STATE.ui.currentModal) {
        closeModal(APP_STATE.ui.currentModal);
      } else if (APP_STATE.ui.isCartOpen) {
        closeCart();
      } else if (APP_STATE.ui.isMobileMenuOpen) {
        closeMobileMenu();
      }
    }

    // Quick cart access with 'C' key
    if (e.key === "c" || e.key === "C") {
      if (!e.target.matches("input, textarea")) {
        openCart();
      }
    }
  });
}

// =====================================================
// INITIALIZATION
// =====================================================

/**
 * Initializes the application when the DOM is loaded
 */
function initializeApp() {
  // Initialize menu functionality
  Menu.init();

  // Initialize cart UI
  Cart.updateUI();

  // Setup forms
  setupForms();

  // Setup keyboard navigation
  setupKeyboardNavigation();

  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        // Close mobile menu if open
        if (APP_STATE.ui.isMobileMenuOpen) {
          closeMobileMenu();
        }
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const mobileNav = document.getElementById("mobileNav");
    const menuBtn = document.querySelector(".mobile-menu-btn");

    if (
      APP_STATE.ui.isMobileMenuOpen &&
      !mobileNav?.contains(e.target) &&
      !menuBtn?.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  console.log("Bread N' Brew application initialized successfully!");
}

// =====================================================
// EVENT LISTENERS
// =====================================================

// Initialize when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}

// Handle window resize for responsive adjustments
window.addEventListener(
  "resize",
  debounce(() => {
    // Close mobile menu on desktop
    if (window.innerWidth >= 768 && APP_STATE.ui.isMobileMenuOpen) {
      closeMobileMenu();
    }
  }, 250),
);

// =====================================================
// SERVICE WORKER REGISTRATION (for future PWA support)
// =====================================================

/**
 * Registers service worker if available
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Service worker registration would go here for PWA support
    console.log(
      "Service worker support detected (not implemented in this demo)",
    );
  });
}

// =====================================================
// EXPORTS (for module systems if needed)
// =====================================================

// If using module system, export main functions
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    Cart,
    Menu,
    showToast,
    showModal,
    closeModal,
    openCart,
    closeCart,
  };
}
