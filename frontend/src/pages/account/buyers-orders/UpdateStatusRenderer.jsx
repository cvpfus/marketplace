/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { toast } from "@/hooks/use-toast";
import { useUpdateOrderStatus } from "@/hooks/use-update-order-status";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { Edit } from "lucide-react";
import { useState } from "react";

const OrderStatus = ["Pending", "Processing", "Shipped"];

export const UpdateStatusRenderer = ({ data }) => {
  const [position, setPosition] = useState(data["Order Status"]);
  const [open, setOpen] = useState(false);

  const updateOrderStatus = useUpdateOrderStatus();

  const queryClient = useQueryClient();

  const { item } = useLocalStorage("marketplace");

  const handleUpdateStatus = () => {
    updateOrderStatus.mutate(
      {
        token: item.token,
        orderId: data["Record ID"],
        orderStatus: position,
      },
      {
        onSuccess: async () => {
          toast({
            title: "Success",
            description: "Order status updated successfully.",
          });

          await queryClient.refetchQueries({
            queryKey: ["buyers-orders"],
          });

          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setPosition(data["Order Status"]);
        }
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button className="size-8" disabled={!data["Product Name"]}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Update the order status of the product.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <div className="grid gap-4 grid-cols-4 items-center">
            <span className="text-center">Product Name</span>
            <Input
              className="col-span-3"
              readOnly
              value={data["Product Name"]}
            />
          </div>

          <div className="grid gap-4 grid-cols-4 items-center">
            <span className="text-center">Buyer Name</span>
            <Input className="col-span-3" readOnly value={data["Buyer Name"]} />
          </div>

          <div className="grid gap-4 grid-cols-4 items-center">
            <span className="text-center">Buyer Address</span>
            <Textarea className="col-span-3" readOnly value={data["Buyer Address"]} />
          </div>

          <div className="grid gap-4 grid-cols-4 items-center">
            <span className="text-center">Amount</span>
            <Input className="col-span-3" readOnly value={data.Amount} />
          </div>

          <div className="grid gap-4 grid-cols-4 items-center">
            <span className="text-center">Order Status</span>
            <div className="flex items-center gap-2 col-span-3">
              <Input className="" readOnly value={position} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Change</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    {OrderStatus.map((status) => (
                      <DropdownMenuRadioItem key={status} value={status}>
                        {status}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button
              onClick={handleUpdateStatus}
              disabled={updateOrderStatus.isPending}
              className="flex items-center gap-2"
            >
              {updateOrderStatus.isPending && (
                <Loader2 className="animate-spin" />
              )}
              <span>Update</span>
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
