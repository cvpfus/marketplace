import { Badge } from "@/components/ui/badge";

// eslint-disable-next-line react/prop-types
export const OrderStatusRenderer = ({ value }) => {
  return <Badge className="rounded-xl">{value}</Badge>;
};
