import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import { Login } from "./pages/auth/Login.jsx";
import { Register } from "./pages/auth/Register.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthLayout } from "./pages/auth/AuthLayout.jsx";
import { Toaster } from "@/components/ui/toaster";
import { NotFound } from "./pages/NotFound";
import { Account } from "./pages/account/Account";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Product } from "./pages/product/Product";
import { HeaderLayout } from "./pages/HeaderLayout";

const queryClient = new QueryClient();

ModuleRegistry.registerModules([AllCommunityModule]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<HeaderLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/product/:id" element={<Product />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
