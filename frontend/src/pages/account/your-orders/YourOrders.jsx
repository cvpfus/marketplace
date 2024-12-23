import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrderCard } from "@/components/ui/order-card";
import { useGetYourOrders } from "@/hooks/use-get-your-orders";

export const YourOrders = () => {
  const yourOrders = useGetYourOrders();

  return (
    <Card className="w-full max-w-screen-lg">
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
        <CardDescription>
          View your orders here.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {yourOrders.data &&
          yourOrders.data.map((order) => (
            <OrderCard order={order} key={order["Order ID"]} />
          ))}
      </CardContent>
    </Card>
  );
};
