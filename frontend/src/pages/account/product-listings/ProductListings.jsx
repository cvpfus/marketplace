import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetProductsByOwner } from "@/hooks/use-get-products-by-owner";
import { CellButtons } from "./CellButtons";
import { ProductImage } from "../ProductImage";
import { toast } from "@/hooks/use-toast";
import { useAddProduct } from "@/hooks/use-add-product";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";

const generateDataUrl = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
};

export const ProductListings = () => {
  const products = useGetProductsByOwner();

  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [open, setOpen] = useState(false);

  const isMobile = useIsMobile();

  const addProduct = useAddProduct();

  const { item } = useLocalStorage("marketplace");

  const rowData = products.data ?? [];

  const [colDefs, __] = useState([
    { field: "Name" },
    { field: "Description" },
    { field: "Price" },
    { field: "Image", cellRenderer: ProductImage },
    { field: "Actions", cellRenderer: CellButtons },
  ]);

  const defaultColDef = useMemo(
    () => ({
      flex: isMobile ? 0 : 1,
      headerClass: "[&_.ag-header-cell-label]:justify-center",
      cellClass: "text-center",
    }),
    [isMobile]
  );

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

  const handleAddProduct = (e) => {
    e.preventDefault();

    setOpen(false);
    setName("");
    setDescription("");
    setPrice("");
    setDataUrl("");

    addProduct.mutate(
      {
        name,
        description,
        price,
        dataUrl,
        token: item.token,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Product added successfully",
            variant: "success",
          });

          queryClient.refetchQueries({ queryKey: ["user-products"] });
        },
      }
    );
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      toast({
        title: "Error",
        description: "No file selected",
        variant: "destructive",
      });

      return;
    }

    try {
      const dataUrl = await generateDataUrl(file);
      setDataUrl(dataUrl);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-screen-lg">
      <CardHeader>
        <CardTitle>Product Listings</CardTitle>
        <CardDescription>
          Add, edit, and delete your products here.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="flex items-center gap-2"
              disabled={addProduct.isPending}
            >
              {addProduct.isPending && <Loader2 className="animate-spin" />}
              <span>Add new Product</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new Product</DialogTitle>
              <DialogDescription>
                Add a new product to your listings.
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4" onSubmit={handleAddProduct}>
              <div className="grid gap-4 grid-cols-4 items-center">
                <Label htmlFor="name" className="text-center">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder={"Name"}
                  className="col-span-3"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>

              <div className="grid gap-4 grid-cols-4 items-center">
                <Label htmlFor="description" className="text-center">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder={"Description"}
                  className="col-span-3"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
              </div>

              <div className="grid gap-4 grid-cols-4 items-center">
                <Label htmlFor="price" className="text-center">
                  Price
                </Label>
                <Input
                  id="price"
                  placeholder={"Price"}
                  className="col-span-3"
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
              </div>

              <div className="grid gap-4 grid-cols-4 items-center">
                <Label htmlFor="image" className="text-center">
                  Image
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  id="image"
                  className="col-span-3"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <DialogFooter>
                <Button>Add</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
