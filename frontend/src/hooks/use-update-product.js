import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { updateProduct } from "@/services/product";

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: updateProduct,
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
