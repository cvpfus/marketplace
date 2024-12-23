import { useMutation } from "@tanstack/react-query"
import { toast } from "./use-toast"
import { updateAddress } from "@/services/user"

export const useUpdateAddress = () => {
  return useMutation({
    mutationFn: updateAddress,
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })
}