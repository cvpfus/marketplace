import { useOutletContext } from "react-router";
import { ProductCard } from "../../components/ui/product-card";
import { useGetProducts } from "../../hooks/use-get-products";
import { Loader2 } from "lucide-react";

function Products() {
  const { searchValue } = useOutletContext();

  const products = useGetProducts();

  if (products.isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {products.data &&
        products.data
          .filter((product) =>
            product.Name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((product, index) => (
            <ProductCard
              key={index}
              product={{
                name: product.Name,
                price: product.Price,
                imageUrl: product.Image,
                sellerName: product["Seller Name"],
                id: product["Record ID"],
              }}
            />
          ))}
    </div>
  );
}

export default Products;
