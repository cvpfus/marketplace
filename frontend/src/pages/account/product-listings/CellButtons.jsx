/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDeleteProduct } from "@/hooks/use-delete-product";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { toast } from "@/hooks/use-toast";
import { useUpdateProduct } from "@/hooks/use-update-product";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Edit } from "lucide-react";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const CellButtons = ({ data }) => {
  const [delete_open, delete_setOpen] = useState(false);
  const [edit_open, edit_setOpen] = useState(false);
  const [name, setName] = useState(data.Name);
  const [description, setDescription] = useState(data.Description);
  const [price, setPrice] = useState(data.Price);

  const updateProduct = useUpdateProduct();

  const deleteProduct = useDeleteProduct();

  const { item } = useLocalStorage("marketplace");

  const queryClient = useQueryClient();

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    if (
      name === data.Name &&
      description === data.Description &&
      price === data.Price
    ) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "No changes detected.",
      });
      return;
    }

    updateProduct.mutate(
      {
        productRecordId: data["Record ID"],
        name,
        description,
        price,
        token: item.token,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Product updated successfully.",
          });

          queryClient.refetchQueries({
            queryKey: ["user-products"],
          });

          edit_setOpen(false);
        },
      }
    );
  };

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
    <div className="flex items-center justify-center gap-1 md:gap-4 mt-1">
      <Dialog open={edit_open} onOpenChange={edit_setOpen}>
        <DialogTrigger asChild>
          <Button className="size-8">
            <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
            <DialogDescription>
              Update your product details here.
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-4 py-4" onSubmit={handleUpdateProduct}>
            <div className="grid gap-4 grid-cols-4 items-center">
              <Label htmlFor="name" className="text-center">
                Name
              </Label>
              <Input
                id="name"
                placeholder={"Name"}
                className="col-span-3"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            <div className="grid gap-4 grid-cols-4 items-center">
              <Label htmlFor="description" className="text-center">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder={"Description"}
                className="col-span-3"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>

            <div className="grid gap-4 grid-cols-4 items-center">
              <Label htmlFor="price" className="text-center">
                Price
              </Label>
              <Input
                id="price"
                placeholder={"Price"}
                className="col-span-3"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </div>
            <DialogFooter>
              <Button
                className="flex items-center gap-2"
                disabled={updateProduct.isPending}
              >
                {updateProduct.isPending && (
                  <Loader2 className="animate-spin" />
                )}
                <span>Update</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={delete_open} onOpenChange={delete_setOpen}>
        <DialogTrigger asChild>
          <Button
            className="size-8"
            variant="destructive"
            disabled={deleteProduct.isPending}
          >
            <Trash2 />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete your product.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteProduct.isPending}
              className="flex items-center gap-2"
            >
              {deleteProduct.isPending && <Loader2 className="animate-spin" />}
              <span>Delete</span>
            </Button>
            <Button
              onClick={() => {
                delete_setOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
