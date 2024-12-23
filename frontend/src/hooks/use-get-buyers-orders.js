import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";
import { getBuyersOrders } from "@/services/order";

export const useGetBuyersOrders = () => {
  const { item } = useLocalStorage("marketplace");

  return useQuery({
    queryKey: ["buyers-orders"],
    queryFn: () => getBuyersOrders({ token: item.token }),
    enabled: !!item,
  });
};
