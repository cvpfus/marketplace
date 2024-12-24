import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetBuyersOrders } from "@/hooks/use-get-buyers-orders";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { useMemo } from "react";
import { OrderStatusRenderer } from "./OrderStatusRenderer";
import { UpdateStatusRenderer } from "./UpdateStatusRenderer";
import { ProductNameRenderer } from "./ProductNameRenderer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

export const BuyersOrders = () => {
  const orders = useGetBuyersOrders();

  const rowData = orders.data ?? [];

  const [colDefs, _] = useState([
    { field: "Product Name", cellRenderer: ProductNameRenderer },
    { field: "Buyer Name" },
    { field: "Buyer Address" },
    { field: "Amount" },
    { field: "Order Status", cellRenderer: OrderStatusRenderer },
    { field: "Actions", cellRenderer: UpdateStatusRenderer },
  ]);

  const isMobile = useIsMobile();

  const gridRef = useRef(null);

  const onGridReady = useCallback((params) => {
    gridRef.current = params.api;
  }, []);

  const onResize = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.sizeColumnsToFit();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);

  const defaultColDef = useMemo(
    () => ({
      flex: isMobile ? 0 : 1,
      headerClass: "[&_.ag-header-cell-label]:justify-center",
      cellClass: "text-center",
    }),
    [isMobile]
  );

  return (
    <Card className="w-full max-w-screen-lg">
      <CardHeader>
        <CardTitle>Buyers&apos; Orders</CardTitle>
        <CardDescription>
          View and manage orders placed by buyers.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-center">
        <div className="w-full h-[400px]">
          <AgGridReact
            onGridReady={onGridReady}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 25, 50]}
          />
        </div>
      </CardContent>
    </Card>
  );
};
