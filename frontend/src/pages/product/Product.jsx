import { Button } from "@/components/ui/button";
import { Card2 } from "@/components/ui/card2";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAddOrder } from "@/hooks/use-add-order";
import { useGetProduct } from "@/hooks/use-get-product";
import { useGetUser } from "@/hooks/use-get-user";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { toast } from "@/hooks/use-toast";
import { useUpdateAddress } from "@/hooks/use-update-address";
import { formatPrice } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useOutletContext } from "react-router";

export const Product = () => {
  const product = useGetProduct();

  const user = useGetUser();

  const updateAddress = useUpdateAddress();

  const addOrder = useAddOrder();

  const queryClient = useQueryClient();

  const { item } = useLocalStorage("marketplace");

  const [isEditable, setIsEditable] = useState(false);
  const [amount, setAmount] = useState(1);
  const [address, setAddress] = useState(user.data?.Address ?? "");

  const { loggedIn } = useOutletContext();

  useEffect(() => {
    if (user.data && user.data.Address) {
      setAddress(user.data.Address);
    }
  }, [user.data]);

  if (product.isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  const handlePay = (e) => {
    e.preventDefault();

    if (!loggedIn) {
      toast({
        title: "Error",
        description: "You need to be logged in to make a purchase.",
        variant: "destructive",
      });

      return;
    }

    addOrder.mutate(
      {
        amount,
        productId: product.data["Record ID"],
        token: item.token,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Order placed successfully.",
          });
        },
      }
    );
  };

  const handleUpdate = () => {
    if (!address) {
      toast({
        title: "Error",
        description: "Address cannot be empty.",
        variant: "destructive",
      });

      return;
    }

    if (address === user.data?.Address) {
      toast({
        title: "Error",
        description: "Address is the same as the previous one.",
        variant: "destructive",
      });

      return;
    }

    updateAddress.mutate(
      {
        userId: item.userRecordId,
        token: item.token,
        address,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Address updated successfully.",
          });

          setIsEditable(false);

          queryClient.refetchQueries({
            queryKey: ["user"],
          });
        },
      }
    );
  };

  return (
    <div className="grid grid-col-1 lg:grid-cols-4 gap-8 mt-12 w-full">
      <div className="flex lg:hidden items-start justify-center">
        <img
          src={product.data["Image URL"]}
          alt={product.data?.Name}
          className="object-contain "
        />
      </div>
      <Card2 className="lg:col-span-2 xl:col-span-3">
        <h2 className="text-lg font-bold">{product.data?.Name}</h2>
        <h1 className="text-3xl font-bold">
          {formatPrice(product.data?.Price)}
        </h1>

        <h3 className="font-bold mt-4">Description</h3>
        <Separator />
        <p className="whitespace-pre-wrap">{product.data?.Description}</p>
      </Card2>

      <div className="col-span-1 lg:col-span-2 xl:col-span-1 flex flex-col gap-8 w-full">
        <div className="hidden lg:flex items-start justify-center">
          <img
            src={product.data["Image URL"]}
            alt={product.data?.Name}
            className="object-contain "
          />
        </div>

        <form onSubmit={handlePay}>
          <Card2 className="justify-self-center place-self-start w-full">
            <h3 className="font-bold">Set Amount</h3>
            <div className="flex flex-col gap-1.5">
              <Input
                type="number"
                placeholder="Amount"
                min={1}
                max={100}
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                required
              />
              <div className="flex justify-between items-center">
                <span className="text-xs">Stock: unlimited</span>
                <span className="text-xs">Max amount: 100</span>
              </div>
            </div>

            <Separator className={`${!loggedIn && "hidden"}`} />

            <h3 className={`font-bold ${!loggedIn && "hidden"}`}>
              Shipping Address
            </h3>
            <Textarea
              className={`${!loggedIn && "hidden"}`}
              placeholder="Enter your address here.."
              rows={3}
              disabled={!isEditable}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            <div className={`flex gap-2 ml-auto ${!loggedIn && "hidden"}`}>
              <Button
                type="button"
                onClick={handleUpdate}
                className={`flex items-center gap-2 ${!isEditable && "hidden"}`}
                disabled={updateAddress.isPending}
              >
                {updateAddress.isPending && (
                  <Loader2 className="animate-spin" />
                )}
                <span>Update</span>
              </Button>
              <Button onClick={() => setIsEditable(!isEditable)} type="button">
                {isEditable ? "Cancel" : "Change"}
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <span>Total</span>
              <h1 className="text-2xl font-bold">
                {formatPrice(amount * product.data.Price)}
              </h1>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button">Pay</Button>
              </DialogTrigger>
              <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                  <DialogTitle>
                    Are you sure you want to buy this product?
                  </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-4 grid-cols-4 items-center">
                    <span className="text-center">Product Name</span>
                    <Input
                      className="col-span-3"
                      readOnly
                      value={product.data.Name}
                    />
                  </div>

                  <div className="grid gap-4 grid-cols-4 items-center">
                    <span className="text-center">Amount</span>
                    <Input className="col-span-3" readOnly value={amount} />
                  </div>

                  <div className="grid gap-4 grid-cols-4 items-center">
                    <span className="text-center">Total Price</span>
                    <Input
                      className="col-span-3"
                      readOnly
                      value={`${formatPrice(amount * product.data.Price)}`}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button onClick={handlePay} disabled={addOrder.isPending}>
                    {addOrder.isPending && <Loader2 className="animate-spin" />}
                    <span>Pay</span>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Card2>
        </form>
      </div>
    </div>
  );
};
