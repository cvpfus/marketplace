import { useGetProduct } from "@/hooks/use-get-product";

export const Product = () => {
  const product = useGetProduct();

  return (
    <div>
      {product.data && (
        <div>
          <div>Name {product.data.Name}</div>
          <div>Description {product.data.Description}</div>
          <div>Price {product.data.Price}</div>
        </div>
      )}
    </div>
  );
};
