import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/services/product";
import { useParams } from "react-router";

export const useGetProduct = () => {
  const params = useParams();

  return useQuery({
    queryKey: [`product-${params.id}`],
    queryFn: () => getProduct({ productRecordId: params.id }),
  });
};
