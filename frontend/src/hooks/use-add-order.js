import { addOrder } from "@/services/order";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";

export const useAddOrder = () => {
  return useMutation({
    mutationFn: addOrder,
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
