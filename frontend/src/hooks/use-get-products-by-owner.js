import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";
import { getProductsByOwner } from "@/services/product";

export const useGetProductsByOwner = () => {
  const { item } = useLocalStorage("marketplace");

  return useQuery({
    queryKey: ["user-products"],
    queryFn: () =>
      getProductsByOwner({
        userRecordId: item?.userRecordId,
        token: item?.token,
      }),
    enabled: !!item,
  });
};
