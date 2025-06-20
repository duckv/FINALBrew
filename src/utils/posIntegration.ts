/**
 * POS Integration Utilities
 *
 * Utilities for SkyTab POS system integration
 * Handles data transformation, validation, and sync operations
 */

import {
  POSMenuItem,
  POSOrder,
  POSOrderItem,
  POSModifierGroup,
  POSModifier,
  POSCustomer,
  POSOrderTotals,
  POSTaxConfig,
  POSResponse,
  POSSyncStatus,
} from "@/types/pos";
import type { Product, CartItem, Cart } from "@/types";

// ========== Configuration ==========

/**
 * POS system configuration
 */
export const POS_CONFIG = {
  // Tax rates (adjust based on local regulations)
  TAX_RATES: {
    food: 0.08875, // 8.875% for Berkeley Heights, NJ food tax
    beverage: 0.08875,
    retail: 0.08875,
    delivery: 0.0,
  } as POSTaxConfig,

  // Service fees
  SERVICE_FEE_RATE: 0.03, // 3% service fee
  DELIVERY_FEE: 299, // $2.99 in cents

  // Order limits
  MAX_ORDER_VALUE: 50000, // $500 max order
  MIN_DELIVERY_ORDER: 1500, // $15 minimum for delivery

  // Kitchen stations
  KITCHEN_STATIONS: {
    coffee: "Barista Station",
    tea: "Barista Station",
    pastries: "Bakery Station",
    pizza: "Kitchen",
    breakfast: "Kitchen",
    lunch: "Kitchen",
    breads: "Bakery Station",
    sweets: "Bakery Station",
    "iced-frozen": "Cold Prep",
  },
} as const;

// ========== Data Transformation ==========

/**
 * Convert website product to POS menu item
 */
export function productToPOSMenuItem(product: Product): POSMenuItem {
  return {
    sku: generateSKU(product.name, product.category),
    name: product.name,
    description: product.description,
    price: product.price,
    categoryId: getCategoryId(product.category),
    categoryName: product.category,
    taxCategory: getTaxCategory(product.category),
    available: product.available,
    prepTime: product.prepTime || getDefaultPrepTime(product.category),
    trackInventory: shouldTrackInventory(product.category),
    stockLevel: 100, // Default stock level
    minStockLevel: 10, // Default minimum
    tags: generateTags(product),
    nutrition: {
      calories: product.nutrition?.calories,
      allergens: product.allergens,
    },
    modifierGroups: generateModifierGroups(product),
  };
}

/**
 * Convert cart to POS order
 */
export function cartToPOSOrder(
  cart: Cart,
  customer: POSCustomer,
  orderType: "dine-in" | "takeout" | "delivery" | "pickup",
): POSOrder {
  const orderId = generateOrderId();
  const orderItems = cart.items.map(cartItemToPOSOrderItem);
  const totals = calculateOrderTotals(cart, orderType);

  return {
    orderId,
    timestamp: new Date(),
    customer,
    items: orderItems,
    totals,
    orderType,
    status: "pending",
  };
}

/**
 * Convert cart item to POS order item
 */
function cartItemToPOSOrderItem(cartItem: CartItem): POSOrderItem {
  const modifiers = cartItem.customizations.map((custom) => ({
    modifierId: custom.customizationId,
    name: custom.selectedOption || "Default",
    price: 0, // This should come from the customization price
    quantity: 1,
  }));

  return {
    sku: generateSKU(cartItem.product.name, cartItem.product.category),
    name: cartItem.product.name,
    quantity: cartItem.quantity,
    basePrice: cartItem.product.price,
    modifiers,
    totalPrice: cartItem.totalPrice,
    kitchenStation:
      POS_CONFIG.KITCHEN_STATIONS[
        cartItem.product.category.toLowerCase() as keyof typeof POS_CONFIG.KITCHEN_STATIONS
      ] || "Kitchen",
  };
}

// ========== SKU Generation ==========

/**
 * Generate SKU for POS system
 */
export function generateSKU(name: string, category: string): string {
  const categoryCode = getCategoryCode(category);
  const nameCode = name
    .replace(/[^\w\s]/g, "") // Remove special characters
    .split(" ")
    .map((word) => word.substring(0, 3).toUpperCase()) // First 3 letters of each word
    .join("");

  return `${categoryCode}-${nameCode}`;
}

/**
 * Get category code for SKU
 */
function getCategoryCode(category: string): string {
  const codes = {
    Coffee: "COF",
    Tea: "TEA",
    Pastries: "PAS",
    Pizza: "PIZ",
    Breakfast: "BRK",
    Lunch: "LUN",
    Breads: "BRD",
    Sweets: "SWT",
    "Iced/Frozen": "ICE",
  };

  return codes[category as keyof typeof codes] || "GEN";
}

// ========== Tax and Pricing ==========

/**
 * Calculate order totals with tax and fees
 */
export function calculateOrderTotals(
  cart: Cart,
  orderType: "dine-in" | "takeout" | "delivery" | "pickup",
): POSOrderTotals {
  const subtotal = cart.totalPrice;
  const serviceFee = Math.round(subtotal * POS_CONFIG.SERVICE_FEE_RATE);
  const deliveryFee = orderType === "delivery" ? POS_CONFIG.DELIVERY_FEE : 0;
  const taxableAmount = subtotal + serviceFee;
  const tax = Math.round(taxableAmount * POS_CONFIG.TAX_RATES.food);
  const discount = cart.discount?.amount || 0;

  const total = subtotal + serviceFee + deliveryFee + tax - discount;

  return {
    subtotal,
    tax,
    tip: 0, // Will be added later
    serviceFee,
    deliveryFee,
    discount,
    total,
  };
}

/**
 * Get tax category for item
 */
function getTaxCategory(category: string): "food" | "beverage" | "retail" {
  const beverageCategories = ["Coffee", "Tea", "Iced/Frozen"];
  if (beverageCategories.includes(category)) {
    return "beverage";
  }
  return "food";
}

// ========== Modifier Groups ==========

/**
 * Generate modifier groups based on product type
 */
function generateModifierGroups(product: Product): POSModifierGroup[] {
  const category = product.category.toLowerCase();
  const name = product.name.toLowerCase();

  // Coffee/beverage modifiers
  if (
    ["coffee", "tea"].includes(category) ||
    name.includes("latte") ||
    name.includes("cappuccino")
  ) {
    return [
      {
        id: "milk-options",
        name: "Milk Options",
        minSelections: 0,
        maxSelections: 1,
        required: false,
        modifiers: [
          {
            id: "oat-milk",
            name: "Oat Milk",
            price: 65,
            available: true,
            defaultSelected: false,
          },
          {
            id: "almond-milk",
            name: "Almond Milk",
            price: 65,
            available: true,
            defaultSelected: false,
          },
          {
            id: "soy-milk",
            name: "Soy Milk",
            price: 65,
            available: true,
            defaultSelected: false,
          },
          {
            id: "coconut-milk",
            name: "Coconut Milk",
            price: 65,
            available: true,
            defaultSelected: false,
          },
        ],
      },
      {
        id: "coffee-extras",
        name: "Coffee Extras",
        minSelections: 0,
        maxSelections: 5,
        required: false,
        modifiers: [
          {
            id: "extra-shot",
            name: "Extra Shot",
            price: 75,
            available: true,
            defaultSelected: false,
          },
          {
            id: "decaf",
            name: "Make it Decaf",
            price: 0,
            available: true,
            defaultSelected: false,
          },
          {
            id: "extra-hot",
            name: "Extra Hot",
            price: 0,
            available: true,
            defaultSelected: false,
          },
          {
            id: "vanilla-syrup",
            name: "Vanilla Syrup",
            price: 50,
            available: true,
            defaultSelected: false,
          },
          {
            id: "caramel-syrup",
            name: "Caramel Syrup",
            price: 50,
            available: true,
            defaultSelected: false,
          },
        ],
      },
    ];
  }

  // Pizza modifiers
  if (name.includes("pizza")) {
    if (name.includes("classic cheese")) {
      return [
        {
          id: "pizza-toppings",
          name: "Pizza Toppings",
          minSelections: 0,
          maxSelections: 10,
          required: false,
          modifiers: [
            {
              id: "pepperoni",
              name: "Pepperoni",
              price: 150,
              available: true,
              defaultSelected: false,
            },
            {
              id: "extra-cheese",
              name: "Extra Cheese",
              price: 100,
              available: true,
              defaultSelected: false,
            },
            {
              id: "mushrooms",
              name: "Mushrooms",
              price: 100,
              available: true,
              defaultSelected: false,
            },
          ],
        },
      ];
    }
    return [
      {
        id: "pizza-extras",
        name: "Pizza Extras",
        minSelections: 0,
        maxSelections: 5,
        required: false,
        modifiers: [
          {
            id: "extra-cheese",
            name: "Extra Cheese",
            price: 100,
            available: true,
            defaultSelected: false,
          },
          {
            id: "side-ranch",
            name: "Side Ranch",
            price: 75,
            available: true,
            defaultSelected: false,
          },
        ],
      },
    ];
  }

  // Breakfast modifiers
  if (category === "breakfast") {
    if (name.includes("avocado toast")) {
      return [
        {
          id: "avocado-toast-extras",
          name: "Add-ons",
          minSelections: 0,
          maxSelections: 3,
          required: false,
          modifiers: [
            {
              id: "bacon",
              name: "Add Bacon",
              price: 200,
              available: true,
              defaultSelected: false,
            },
            {
              id: "poached-egg",
              name: "Poached Egg",
              price: 250,
              available: true,
              defaultSelected: false,
            },
          ],
        },
      ];
    }
  }

  // Default empty modifier groups
  return [];
}

// ========== Utility Functions ==========

/**
 * Generate unique order ID
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}

/**
 * Get category ID for POS system
 */
function getCategoryId(category: string): string {
  const categoryIds = {
    Coffee: "cat_coffee_001",
    Tea: "cat_tea_002",
    Pastries: "cat_pastries_003",
    Pizza: "cat_pizza_004",
    Breakfast: "cat_breakfast_005",
    Lunch: "cat_lunch_006",
    Breads: "cat_breads_007",
    Sweets: "cat_sweets_008",
    "Iced/Frozen": "cat_iced_009",
  };

  return categoryIds[category as keyof typeof categoryIds] || "cat_general_000";
}

/**
 * Get default preparation time by category
 */
function getDefaultPrepTime(category: string): number {
  const prepTimes = {
    Coffee: 3,
    Tea: 2,
    Pastries: 1, // Already prepared
    Pizza: 15,
    Breakfast: 8,
    Lunch: 10,
    Breads: 1, // Already prepared
    Sweets: 1, // Already prepared
    "Iced/Frozen": 4,
  };

  return prepTimes[category as keyof typeof prepTimes] || 5;
}

/**
 * Determine if item should track inventory
 */
function shouldTrackInventory(category: string): boolean {
  // Track inventory for prepared items, not for made-to-order
  const trackedCategories = ["Pastries", "Breads", "Sweets"];
  return trackedCategories.includes(category);
}

/**
 * Generate tags for POS organization
 */
function generateTags(product: Product): string[] {
  const tags: string[] = [product.category];

  // Add allergen tags
  if (product.allergens.length > 0) {
    tags.push(...product.allergens.map((allergen) => `allergen-${allergen}`));
  }

  // Add special tags
  if (product.name.toLowerCase().includes("organic")) {
    tags.push("organic");
  }
  if (product.name.toLowerCase().includes("gluten-free")) {
    tags.push("gluten-free");
  }
  if (product.name.toLowerCase().includes("vegan")) {
    tags.push("vegan");
  }

  return tags;
}

// ========== POS API Simulation ==========

/**
 * Simulate POS API response
 */
export function createPOSResponse<T>(
  data: T,
  success: boolean = true,
  syncStatus: POSSyncStatus = "synced",
): POSResponse<T> {
  return {
    success,
    data: success ? data : undefined,
    error: success
      ? undefined
      : {
          code: "POS_ERROR",
          message: "Failed to sync with POS system",
          timestamp: new Date(),
        },
    syncStatus,
  };
}

/**
 * Validate order before sending to POS
 */
export function validateOrderForPOS(order: POSOrder): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check order minimum
  if (order.totals.total < 100) {
    // $1.00 minimum
    errors.push("Order total below minimum");
  }

  // Check customer info
  if (!order.customer.name.trim()) {
    errors.push("Customer name is required");
  }
  if (!order.customer.phone.trim()) {
    errors.push("Customer phone is required");
  }

  // Check delivery address if needed
  if (order.orderType === "delivery" && !order.customer.address) {
    errors.push("Delivery address is required");
  }

  // Check minimum delivery order
  if (
    order.orderType === "delivery" &&
    order.totals.subtotal < POS_CONFIG.MIN_DELIVERY_ORDER
  ) {
    errors.push(
      `Minimum delivery order is $${POS_CONFIG.MIN_DELIVERY_ORDER / 100}`,
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/**
 * Format time for POS display
 */
export function formatPOSTime(date: Date): string {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
