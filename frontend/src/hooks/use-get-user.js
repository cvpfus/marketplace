import { getUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

export const useGetUser = () => {
  const { item } = useLocalStorage("marketplace");

  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser({ userId: item.userRecordId, token: item.token }),
    enabled: !!item,
  });
};
