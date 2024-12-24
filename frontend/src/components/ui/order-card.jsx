import { Store } from "lucide-react";
import { Badge } from "./badge";
import { formatPrice } from "@/lib/utils";

/* eslint-disable react/prop-types */
export const OrderCard = ({ order }) => {
  return (
    <div className="flex flex-col gap-4 border p-3 rounded-lg shadow-sm bg-white">
      <div className="flex flex-col xs:flex-row justify-between items-center">
        <div className="flex items-center gap-1.5">
          <Store className="size-4" />
          <span className="font-semibold">{order["Seller Name"]}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">{order["Date Ordered"]}</span>
          <Badge>{order["Order Status"]}</Badge>
        </div>
      </div>
      {!order.Product && <div className="mx-auto mt-2">[Product Deleted]</div>}
      {order.Product && (
        <div className="flex flex-col xs:flex-row justify-between gap-2">
          <div className="flex flex-col xs:flex-row gap-2">
            <img
              src={order.Image}
              alt={order["Product Name"]}
              className="w-20 h-20 flex-shrink-0 object-contain"
            />
            <div>
              <div className="font-bold line-clamp-1">
                {order["Product Name"]}
              </div>
              <div className="text-sm">
                {order.Amount} x {formatPrice(order.Price)}
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="text-sm">Total Price</div>
            <div className="font-semibold">
              {formatPrice(order.Price * order.Amount)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
