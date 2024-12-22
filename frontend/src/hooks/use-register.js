import { registerUser } from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
