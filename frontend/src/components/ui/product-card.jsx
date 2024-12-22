import { Link } from "react-router";

/* eslint-disable react/prop-types */
export const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="flex flex-col rounded-md shadow-md border p-2 cursor-pointer"
    >
      <img src={product.imageUrl} alt={product.name} />
      <div className="mt-2 mb-1">
        <h3 className="text-sm mt-2">{product.name}</h3>
        <h2 className="font-bold">$ {product.price}</h2>
        <h3 className="text-sm">{product.username}</h3>
      </div>
    </Link>
  );
};
