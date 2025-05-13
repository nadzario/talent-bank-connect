
// Import from the sonner component instead of the toast component
import { Toaster, toast } from "sonner";

// Re-export for use in components
export const useToast = () => {
  return {
    toast,
    toasts: [] // This is a simple implementation to match expected interface
  };
};

export { toast };
