/**
 * POS Status Indicator Component
 *
 * Displays the current status of the SkyTab POS integration
 * Shows connection status, sync status, and last sync time
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  Wifi,
  WifiOff,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  usePOSStatusDisplay,
  usePOSIntegration,
} from "@/hooks/usePOSIntegration";

/**
 * Props for POSStatusIndicator
 */
interface POSStatusIndicatorProps {
  /** Whether to show as compact version */
  compact?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Whether to show admin controls */
  showControls?: boolean;
}

/**
 * POS Status Indicator Component
 */
export const POSStatusIndicator: React.FC<POSStatusIndicatorProps> = ({
  compact = false,
  className,
  showControls = false,
}) => {
  const { color, text, icon, lastSync, errors } = usePOSStatusDisplay();
  const { syncMenu, checkConnection, clearErrors, status } =
    usePOSIntegration();
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * Handle manual refresh
   */
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await checkConnection();
      if (status.connected) {
        await syncMenu();
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  /**
   * Format last sync time
   */
  const formatLastSync = (date: Date | null) => {
    if (!date) return "Never";

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    return date.toLocaleDateString();
  };

  // Compact version for header/footer
  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn("flex items-center gap-2", className)}>
              <div className={cn("flex items-center gap-1", color)}>
                {status.connected ? (
                  <Wifi className="h-4 w-4" />
                ) : (
                  <WifiOff className="h-4 w-4" />
                )}
                <span className="text-xs font-medium">{text}</span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-center">
              <p className="font-medium">{text}</p>
              <p className="text-xs text-gray-500">
                Last sync: {formatLastSync(lastSync)}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Full version with controls
  return (
    <div className={cn("space-y-2", className)}>
      {/* Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("flex items-center gap-1", color)}>
            {status.connected ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span className="font-medium">{text}</span>
          </div>

          <Badge
            variant={status.connected ? "default" : "destructive"}
            className="text-xs"
          >
            {status.connected ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        {showControls && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-8 w-8 p-0"
            >
              <RefreshCw
                className={cn("h-4 w-4", isRefreshing && "animate-spin")}
              />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Settings className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">POS System Status</h4>
                    <p className="text-sm text-gray-500">
                      SkyTab POS Integration
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Connection:</span>
                      <span className={color}>
                        {status.connected ? "Connected" : "Disconnected"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sync Status:</span>
                      <span className={color}>{status.syncStatus}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Sync:</span>
                      <span>{formatLastSync(lastSync)}</span>
                    </div>
                  </div>

                  {errors.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-red-600">Errors:</h5>
                      <div className="space-y-1">
                        {errors.map((error, index) => (
                          <p key={index} className="text-xs text-red-600">
                            {error}
                          </p>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearErrors}
                        className="w-full"
                      >
                        Clear Errors
                      </Button>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={checkConnection}
                      className="flex-1"
                    >
                      Test Connection
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={syncMenu}
                      disabled={!status.connected}
                      className="flex-1"
                    >
                      Sync Menu
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      {/* Last Sync Info */}
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Clock className="h-3 w-3" />
        <span>Last sync: {formatLastSync(lastSync)}</span>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.slice(0, 2).map((error, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-xs text-red-600"
            >
              <AlertCircle className="h-3 w-3" />
              <span>{error}</span>
            </div>
          ))}
          {errors.length > 2 && (
            <p className="text-xs text-red-600">
              +{errors.length - 2} more errors
            </p>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Simple POS status badge for minimal displays
 */
export const POSStatusBadge: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { color, text, icon } = usePOSStatusDisplay();

  return (
    <Badge
      variant="outline"
      className={cn("flex items-center gap-1", color, className)}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </Badge>
  );
};

export default POSStatusIndicator;
