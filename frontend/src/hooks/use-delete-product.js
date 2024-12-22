import { deleteProduct } from "@/services/product";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: deleteProduct,
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
