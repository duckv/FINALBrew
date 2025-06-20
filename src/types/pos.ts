/**
 * POS Integration Types
 *
 * Types and interfaces for SkyTab POS system integration
 * Optimized for bakery/cafe operations
 */

// ========== SkyTab POS Data Structures ==========

/**
 * POS-compatible menu item structure
 * Follows SkyTab POS conventions for menu management
 */
export interface POSMenuItem {
  /** Unique SKU for POS system */
  sku: string;
  /** Item name as it appears in POS */
  name: string;
  /** Item description for POS */
  description: string;
  /** Base price in cents (avoids decimal issues) */
  price: number;
  /** POS category ID */
  categoryId: string;
  /** Category name */
  categoryName: string;
  /** Tax category (food, beverage, etc.) */
  taxCategory: "food" | "beverage" | "retail";
  /** Whether item is currently available */
  available: boolean;
  /** Preparation time in minutes */
  prepTime?: number;
  /** Inventory tracking enabled */
  trackInventory: boolean;
  /** Current stock level (if tracked) */
  stockLevel?: number;
  /** Minimum stock alert level */
  minStockLevel?: number;
  /** Item tags for POS organization */
  tags: string[];
  /** Nutritional info for POS */
  nutrition?: {
    calories?: number;
    allergens: string[];
  };
  /** POS modifier groups */
  modifierGroups: POSModifierGroup[];
}

/**
 * POS modifier group structure
 */
export interface POSModifierGroup {
  /** Unique modifier group ID */
  id: string;
  /** Group name (e.g., "Milk Options", "Add-ons") */
  name: string;
  /** Minimum selections required */
  minSelections: number;
  /** Maximum selections allowed */
  maxSelections: number;
  /** Whether this group is required */
  required: boolean;
  /** Available modifiers */
  modifiers: POSModifier[];
}

/**
 * Individual modifier
 */
export interface POSModifier {
  /** Unique modifier ID */
  id: string;
  /** Modifier name */
  name: string;
  /** Additional cost in cents */
  price: number;
  /** Whether modifier is available */
  available: boolean;
  /** Default selection state */
  defaultSelected: boolean;
}

/**
 * POS-compatible order structure
 */
export interface POSOrder {
  /** Unique order ID */
  orderId: string;
  /** Order timestamp */
  timestamp: Date;
  /** Customer information */
  customer: POSCustomer;
  /** Order items */
  items: POSOrderItem[];
  /** Order totals */
  totals: POSOrderTotals;
  /** Order type */
  orderType: "dine-in" | "takeout" | "delivery" | "pickup";
  /** Special instructions */
  instructions?: string;
  /** Requested time for pickup/delivery */
  requestedTime?: Date;
  /** Payment information */
  payment?: POSPayment;
  /** Order status */
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "completed"
    | "cancelled";
}

/**
 * Customer information for POS
 */
export interface POSCustomer {
  /** Customer ID (if existing customer) */
  customerId?: string;
  /** Customer name */
  name: string;
  /** Phone number */
  phone: string;
  /** Email address */
  email?: string;
  /** Delivery address (if applicable) */
  address?: POSAddress;
  /** Loyalty program member */
  loyaltyMember: boolean;
  /** Loyalty points */
  loyaltyPoints?: number;
}

/**
 * Address structure
 */
export interface POSAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  /** Delivery instructions */
  instructions?: string;
}

/**
 * Order item with POS-specific data
 */
export interface POSOrderItem {
  /** Reference to menu item SKU */
  sku: string;
  /** Item name */
  name: string;
  /** Quantity ordered */
  quantity: number;
  /** Base price per item */
  basePrice: number;
  /** Selected modifiers */
  modifiers: POSOrderModifier[];
  /** Total price for this item (including modifiers) */
  totalPrice: number;
  /** Special instructions for this item */
  instructions?: string;
  /** Kitchen station (hot food, cold prep, etc.) */
  kitchenStation?: string;
}

/**
 * Order modifier
 */
export interface POSOrderModifier {
  /** Modifier ID */
  modifierId: string;
  /** Modifier name */
  name: string;
  /** Additional cost */
  price: number;
  /** Quantity of this modifier */
  quantity: number;
}

/**
 * Order totals breakdown
 */
export interface POSOrderTotals {
  /** Subtotal before tax and fees */
  subtotal: number;
  /** Tax amount */
  tax: number;
  /** Tip amount */
  tip: number;
  /** Service fees */
  serviceFee: number;
  /** Delivery fee (if applicable) */
  deliveryFee: number;
  /** Discount amount */
  discount: number;
  /** Total amount due */
  total: number;
}

/**
 * Payment information
 */
export interface POSPayment {
  /** Payment method */
  method: "cash" | "card" | "digital_wallet" | "gift_card";
  /** Payment amount */
  amount: number;
  /** Transaction ID */
  transactionId?: string;
  /** Card last 4 digits (if card payment) */
  cardLast4?: string;
  /** Payment status */
  status: "pending" | "completed" | "failed" | "refunded";
}

// ========== Tax Configuration ==========

/**
 * Tax rates by category
 */
export interface POSTaxConfig {
  food: number;
  beverage: number;
  retail: number;
  delivery: number;
}

// ========== Inventory Integration ==========

/**
 * Inventory item for POS sync
 */
export interface POSInventoryItem {
  sku: string;
  name: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string; // "each", "lb", "oz", etc.
  cost: number; // cost per unit
  supplier?: string;
  lastRestocked?: Date;
  autoReorder: boolean;
}

// ========== Analytics Data ==========

/**
 * Sales analytics data for POS reporting
 */
export interface POSSalesData {
  date: Date;
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  topSellingItems: Array<{
    sku: string;
    name: string;
    quantity: number;
    revenue: number;
  }>;
  salesByCategory: Array<{
    category: string;
    sales: number;
    percentage: number;
  }>;
}

// ========== Staff Management ==========

/**
 * Staff member data for POS integration
 */
export interface POSStaffMember {
  employeeId: string;
  name: string;
  role: "manager" | "cashier" | "kitchen" | "barista";
  permissions: string[];
  pin?: string;
  active: boolean;
  hourlyRate?: number;
}

// ========== Utility Types ==========

/**
 * POS sync status
 */
export type POSSyncStatus = "synced" | "pending" | "error" | "offline";

/**
 * POS error response
 */
export interface POSError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

/**
 * POS API response wrapper
 */
export interface POSResponse<T> {
  success: boolean;
  data?: T;
  error?: POSError;
  syncStatus: POSSyncStatus;
}
