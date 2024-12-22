import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};
