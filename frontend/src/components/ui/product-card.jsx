import { formatPrice } from "@/lib/utils";
import { Badge } from "./badge";
import { Link } from "react-router";

/* eslint-disable react/prop-types */
export const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="flex flex-col rounded-md shadow-md border p-2 cursor-pointer bg-white max-w-[200px]"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className=" object-contain aspect-square"
      />

      <div className="mt-2 mb-1">
        <h3 className="text-sm mt-2 line-clamp-2">{product.name}</h3>
        <h2 className="font-bold">{formatPrice(product.price)}</h2>
        <Badge className="rounded-xl pt-0">{product.sellerName}</Badge>
      </div>
    </Link>
  );
};
