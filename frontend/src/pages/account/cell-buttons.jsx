/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { useDeleteProduct } from "@/hooks/use-delete-product";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { Edit } from "lucide-react";

// eslint-disable-next-line react/prop-types
export const CellButtons = ({ data }) => {
  const deleteProduct = useDeleteProduct();

  const { item } = useLocalStorage("marketplace");

  const queryClient = useQueryClient();

  const handleDelete = () => {
    deleteProduct.mutate(
      {
        productRecordId: data["Record ID"],
        imageUrl: data.Image,
        token: item.token,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Product deleted successfully",
          });

          queryClient.refetchQueries({
            queryKey: ["user-products"],
          });
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-1">
      <Button className="size-8">
        <Edit />
      </Button>
      <Button
        className="size-8"
        variant="destructive"
        onClick={handleDelete}
        disabled={deleteProduct.isPending}
      >
        <Trash2 />
      </Button>
    </div>
  );
};
