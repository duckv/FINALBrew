/**
 * POS Integration Hook
 *
 * Custom React hook for managing SkyTab POS integration
 * Handles order submission, menu sync, and POS communication
 */

import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  cartToPOSOrder,
  validateOrderForPOS,
  createPOSResponse,
  generateOrderId,
  POS_CONFIG,
} from "@/utils/posIntegration";
import type {
  POSOrder,
  POSCustomer,
  POSResponse,
  POSSyncStatus,
  POSMenuItem,
} from "@/types/pos";
import type { Cart } from "@/types";

/**
 * POS integration status
 */
interface POSStatus {
  connected: boolean;
  syncStatus: POSSyncStatus;
  lastSync: Date | null;
  errors: string[];
}

/**
 * Hook return type
 */
interface UsePOSIntegrationReturn {
  // Status
  status: POSStatus;
  isSubmitting: boolean;

  // Order management
  submitOrder: (
    cart: Cart,
    customer: POSCustomer,
    orderType: "dine-in" | "takeout" | "delivery" | "pickup",
  ) => Promise<POSResponse<POSOrder>>;

  // Menu management
  syncMenu: () => Promise<void>;
  updateMenuItem: (item: POSMenuItem) => Promise<void>;

  // Utilities
  checkConnection: () => Promise<boolean>;
  clearErrors: () => void;
}

/**
 * POS Integration Hook
 */
export function usePOSIntegration(): UsePOSIntegrationReturn {
  // ========== State Management ==========
  const [status, setStatus] = useState<POSStatus>({
    connected: false,
    syncStatus: "offline",
    lastSync: null,
    errors: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ========== Connection Management ==========

  /**
   * Check POS system connection
   */
  const checkConnection = useCallback(async (): Promise<boolean> => {
    try {
      // Simulate API call to POS system
      // In real implementation, this would be an actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const connected = Math.random() > 0.1; // 90% success rate simulation

      setStatus((prev) => ({
        ...prev,
        connected,
        syncStatus: connected ? "synced" : "error",
        lastSync: connected ? new Date() : prev.lastSync,
        errors: connected ? [] : ["Connection to POS system failed"],
      }));

      return connected;
    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        connected: false,
        syncStatus: "error",
        errors: ["Network error connecting to POS system"],
      }));
      return false;
    }
  }, []);

  /**
   * Initialize connection on mount
   */
  useEffect(() => {
    checkConnection();

    // Set up periodic connection check
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [checkConnection]);

  // ========== Order Management ==========

  /**
   * Submit order to POS system
   */
  const submitOrder = useCallback(
    async (
      cart: Cart,
      customer: POSCustomer,
      orderType: "dine-in" | "takeout" | "delivery" | "pickup",
    ): Promise<POSResponse<POSOrder>> => {
      setIsSubmitting(true);

      try {
        // Convert cart to POS order format
        const posOrder = cartToPOSOrder(cart, customer, orderType);

        // Validate order
        const validation = validateOrderForPOS(posOrder);
        if (!validation.valid) {
          const errorMessage = validation.errors.join(", ");
          toast.error(`Order validation failed: ${errorMessage}`);
          return createPOSResponse(posOrder, false, "error");
        }

        // Check connection before submitting
        const connected = await checkConnection();
        if (!connected) {
          toast.error("Cannot submit order: POS system offline");
          return createPOSResponse(posOrder, false, "offline");
        }

        // Simulate API call to submit order
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simulate occasional failures
        const success = Math.random() > 0.05; // 95% success rate

        if (success) {
          // Update order with POS-generated ID
          const completedOrder: POSOrder = {
            ...posOrder,
            orderId: generateOrderId(),
            status: "confirmed",
          };

          toast.success(
            `Order ${completedOrder.orderId} submitted successfully!`,
          );

          // Log order for analytics
          console.log("POS Order Submitted:", completedOrder);

          setStatus((prev) => ({
            ...prev,
            lastSync: new Date(),
            syncStatus: "synced",
          }));

          return createPOSResponse(completedOrder, true, "synced");
        } else {
          throw new Error("POS system rejected the order");
        }
      } catch (error) {
        console.error("POS order submission failed:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        toast.error(`Order submission failed: ${errorMessage}`);

        setStatus((prev) => ({
          ...prev,
          errors: [...prev.errors, errorMessage],
          syncStatus: "error",
        }));

        return createPOSResponse(
          cartToPOSOrder(cart, customer, orderType),
          false,
          "error",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [checkConnection],
  );

  // ========== Menu Management ==========

  /**
   * Sync menu with POS system
   */
  const syncMenu = useCallback(async (): Promise<void> => {
    try {
      setStatus((prev) => ({ ...prev, syncStatus: "pending" }));

      // Simulate menu sync
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const success = Math.random() > 0.1; // 90% success rate

      if (success) {
        setStatus((prev) => ({
          ...prev,
          syncStatus: "synced",
          lastSync: new Date(),
          errors: [],
        }));
        toast.success("Menu synced with POS system");
      } else {
        throw new Error("Menu sync failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Menu sync failed";

      setStatus((prev) => ({
        ...prev,
        syncStatus: "error",
        errors: [...prev.errors, errorMessage],
      }));

      toast.error(errorMessage);
    }
  }, []);

  /**
   * Update individual menu item in POS
   */
  const updateMenuItem = useCallback(
    async (item: POSMenuItem): Promise<void> => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const success = Math.random() > 0.05; // 95% success rate

        if (success) {
          toast.success(`Updated ${item.name} in POS system`);
        } else {
          throw new Error(`Failed to update ${item.name}`);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Update failed";
        toast.error(errorMessage);
        throw error;
      }
    },
    [],
  );

  // ========== Utility Functions ==========

  /**
   * Clear error messages
   */
  const clearErrors = useCallback(() => {
    setStatus((prev) => ({ ...prev, errors: [] }));
  }, []);

  // ========== Return Hook Interface ==========
  return {
    status,
    isSubmitting,
    submitOrder,
    syncMenu,
    updateMenuItem,
    checkConnection,
    clearErrors,
  };
}

/**
 * POS Status Display Hook
 *
 * Helper hook for displaying POS status in UI
 */
export function usePOSStatusDisplay() {
  const { status } = usePOSIntegration();

  const getStatusColor = () => {
    switch (status.syncStatus) {
      case "synced":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "error":
        return "text-red-600";
      case "offline":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusText = () => {
    switch (status.syncStatus) {
      case "synced":
        return "POS Connected";
      case "pending":
        return "Syncing...";
      case "error":
        return "POS Error";
      case "offline":
        return "POS Offline";
      default:
        return "Unknown";
    }
  };

  const getStatusIcon = () => {
    switch (status.syncStatus) {
      case "synced":
        return "●";
      case "pending":
        return "○";
      case "error":
        return "✕";
      case "offline":
        return "○";
      default:
        return "?";
    }
  };

  return {
    color: getStatusColor(),
    text: getStatusText(),
    icon: getStatusIcon(),
    lastSync: status.lastSync,
    errors: status.errors,
  };
}

/**
 * POS Order Tracking Hook
 *
 * Hook for tracking order status in POS system
 */
export function usePOSOrderTracking(orderId?: string) {
  const [orderStatus, setOrderStatus] = useState<POSOrder["status"]>("pending");
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);

  useEffect(() => {
    if (!orderId) return;

    // Simulate order tracking
    const interval = setInterval(() => {
      // Simulate status progression
      setOrderStatus((current) => {
        switch (current) {
          case "pending":
            return "confirmed";
          case "confirmed":
            return "preparing";
          case "preparing":
            return Math.random() > 0.7 ? "ready" : "preparing";
          case "ready":
            return Math.random() > 0.8 ? "completed" : "ready";
          default:
            return current;
        }
      });

      // Update estimated time
      setEstimatedTime((current) => {
        if (current === null) return 15; // Initial estimate
        return Math.max(0, current - 1);
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [orderId]);

  return {
    orderStatus,
    estimatedTime,
  };
}

export default usePOSIntegration;
