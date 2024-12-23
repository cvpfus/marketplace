import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";
import { getYourOrders } from "@/services/order";

export const useGetYourOrders = () => {
  const { item } = useLocalStorage("marketplace");

  return useQuery({
    queryKey: ["your-orders"],
    queryFn: () => getYourOrders({ token: item.token }),
    enabled: !!item,
  });
};
