import { updateOrderStatus } from "@/services/order";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";

export const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: updateOrderStatus,
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
