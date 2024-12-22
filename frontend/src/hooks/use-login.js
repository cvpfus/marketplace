import { loginUser } from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { useLocalStorage } from "./use-local-storage";

export const useLogin = () => {
  const { setItem } = useLocalStorage("marketplace");

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setItem(data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
