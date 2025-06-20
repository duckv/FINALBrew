/**
 * Common Type Definitions
 *
 * This file contains shared TypeScript types used throughout the application.
 * Organizing types here helps maintain consistency and makes refactoring easier.
 */

// ========== UI Component Types ==========

/**
 * Common props that most components accept
 */
export interface BaseComponentProps {
  /** Custom CSS classes */
  className?: string;
  /** Element ID */
  id?: string;
  /** Test ID for testing */
  "data-testid"?: string;
}

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * Props for components that can show loading state
 */
export interface LoadingProps {
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Custom loading text or element */
  loadingText?: string;
}

// ========== Product and Menu Types ==========

/**
 * Product category enumeration
 */
export type ProductCategory =
  | "breads"
  | "pastries"
  | "beverages"
  | "cakes"
  | "sandwiches"
  | "breakfast";

/**
 * Allergen information
 */
export type Allergen =
  | "gluten"
  | "dairy"
  | "eggs"
  | "nuts"
  | "soy"
  | "sesame"
  | "shellfish";

/**
 * Product size options
 */
export type ProductSize = "small" | "medium" | "large" | "extra-large";

/**
 * Product information structure
 */
export interface Product {
  /** Unique product identifier */
  id: string;
  /** Product name */
  name: string;
  /** Product description */
  description: string;
  /** Base price in cents (to avoid decimal issues) */
  price: number;
  /** Product category */
  category: ProductCategory;
  /** Array of allergens present in product */
  allergens: Allergen[];
  /** Available sizes with price modifiers */
  sizes?: {
    size: ProductSize;
    priceModifier: number; // Amount to add/subtract from base price
  }[];
  /** Image filename in products directory */
  image?: string;
  /** Whether product is currently available */
  available: boolean;
  /** Preparation time in minutes */
  prepTime?: number;
  /** Nutritional information */
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  /** Custom options (e.g., "extra shot", "decaf") */
  customizations?: ProductCustomization[];
}

/**
 * Product customization options
 */
export interface ProductCustomization {
  /** Customization ID */
  id: string;
  /** Display name */
  name: string;
  /** Additional cost in cents */
  price: number;
  /** Customization type */
  type: "addon" | "substitution" | "preparation";
  /** Available options for this customization */
  options?: string[];
}

// ========== Shopping Cart Types ==========

/**
 * Item in shopping cart
 */
export interface CartItem {
  /** Reference to product */
  product: Product;
  /** Selected quantity */
  quantity: number;
  /** Selected size (if applicable) */
  selectedSize?: ProductSize;
  /** Selected customizations */
  customizations: {
    customizationId: string;
    selectedOption?: string;
  }[];
  /** Calculated total price for this cart item */
  totalPrice: number;
  /** Unique identifier for this cart item (for items with different customizations) */
  cartItemId: string;
}

/**
 * Shopping cart state
 */
export interface Cart {
  /** Items in cart */
  items: CartItem[];
  /** Total number of items */
  totalItems: number;
  /** Total price in cents */
  totalPrice: number;
  /** Applied discount information */
  discount?: {
    code: string;
    amount: number;
    type: "percentage" | "fixed";
  };
}

// ========== Order Types ==========

/**
 * Order status enumeration
 */
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

/**
 * Delivery method options
 */
export type DeliveryMethod = "pickup" | "delivery" | "dine-in";

/**
 * Customer information for orders
 */
export interface CustomerInfo {
  /** Customer name */
  name: string;
  /** Contact email */
  email: string;
  /** Phone number */
  phone: string;
  /** Delivery address (if applicable) */
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

/**
 * Complete order information
 */
export interface Order {
  /** Unique order identifier */
  id: string;
  /** Customer information */
  customer: CustomerInfo;
  /** Items in order */
  items: CartItem[];
  /** Order totals */
  totals: {
    subtotal: number;
    tax: number;
    tip?: number;
    deliveryFee?: number;
    total: number;
  };
  /** Delivery method */
  deliveryMethod: DeliveryMethod;
  /** Requested pickup/delivery time */
  requestedTime?: Date;
  /** Current order status */
  status: OrderStatus;
  /** Order creation timestamp */
  createdAt: Date;
  /** Order notes */
  notes?: string;
}

// ========== API Response Types ==========

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  /** Response data */
  data: T;
  /** Success status */
  success: boolean;
  /** Error message (if any) */
  message?: string;
  /** Additional metadata */
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

/**
 * API error response
 */
export interface ApiError {
  /** Error code */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Additional error details */
  details?: unknown;
}

// ========== Form Types ==========

/**
 * Contact form data
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Newsletter signup form
 */
export interface NewsletterSignup {
  email: string;
  preferences?: {
    promotions: boolean;
    newProducts: boolean;
    events: boolean;
  };
}

// ========== Utility Types ==========

/**
 * Make all properties of T optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Extract the value type from an array
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

/**
 * Make specific properties required
 */
export type RequireProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Common event handler types
 */
export type ClickHandler = (event: React.MouseEvent) => void;
export type ChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
) => void;
export type SubmitHandler = (event: React.FormEvent) => void;

// ========== Component Prop Types ==========

/**
 * Props for modal/dialog components
 */
export interface ModalProps extends BaseComponentProps {
  /** Whether modal is open */
  isOpen: boolean;
  /** Function to close modal */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Whether modal can be closed by clicking outside */
  closeOnOverlayClick?: boolean;
}

/**
 * Props for button components
 */
export interface ButtonProps
  extends BaseComponentProps,
    DisableableProps,
    LoadingProps {
  /** Button variant */
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  /** Button size */
  size?: "default" | "sm" | "lg" | "icon";
  /** Click handler */
  onClick?: ClickHandler;
  /** Button type for forms */
  type?: "button" | "submit" | "reset";
  /** Button content */
  children: React.ReactNode;
}

/**
 * Props for input components
 */
export interface InputProps extends BaseComponentProps, DisableableProps {
  /** Input type */
  type?: "text" | "email" | "tel" | "password" | "number";
  /** Input value */
  value?: string;
  /** Change handler */
  onChange?: ChangeHandler;
  /** Placeholder text */
  placeholder?: string;
  /** Whether input is required */
  required?: boolean;
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
}
