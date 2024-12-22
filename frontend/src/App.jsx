import { ProductCard } from "./components/ui/product-card";
import { useGetProducts } from "./hooks/use-get-products";

function App() {
  const products = useGetProducts();

  return (
    <div className="grid grid-cols-6 gap-8 mx-48">
      {products.data &&
        products.data.map((product, index) => (
          <ProductCard
            key={index}
            product={{
              name: product.Name,
              price: product.Price,
              imageUrl: product.Image,
              username: product.Username,
              id: product["Record ID"],
            }}
          />
        ))}
    </div>
  );
}

export default App;
