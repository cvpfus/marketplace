import { addProduct } from "@/services/product";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";

export const useAddProduct = () => {
  return useMutation({
    mutationFn: addProduct,
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
