import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Products from "./pages/product/Products.jsx";
import { Login } from "./pages/auth/Login.jsx";
import { Register } from "./pages/auth/Register.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthLayout } from "./pages/auth/AuthLayout.jsx";
import { Toaster } from "@/components/ui/toaster";
import { NotFound } from "./pages/NotFound";
import { ProductListings } from "./pages/account/product-listings/ProductListings";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Product } from "./pages/product/Product";
import { MainLayout } from "./pages/MainLayout";
import { AccountLayout } from "./pages/account/AccountLayout";
import { YourOrders } from "./pages/account/your-orders/YourOrders";
import { BuyersOrders } from "./pages/account/buyers-orders/BuyersOrders";

const queryClient = new QueryClient();

ModuleRegistry.registerModules([AllCommunityModule]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/account" element={<AccountLayout />}>
            <Route path="product-listings" element={<ProductListings />} />
            <Route path="your-orders" element={<YourOrders />} />
            <Route path="buyers-orders" element={<BuyersOrders />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
