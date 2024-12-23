import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Link, Navigate, Outlet } from "react-router";
import { AccountSidebar } from "./AccountSidebar";
import { MarketplaceLogo } from "@/components/ui/marketplace-logo";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const AccountLayout = () => {
  const { item } = useLocalStorage("marketplace");

  if (!item) {
    return <Navigate to="/login" />;
  }

  return (
    <SidebarProvider>
      <AccountSidebar />
      <SidebarTrigger />
      <div className="flex flex-col items-center mt-8 gap-8 w-full pr-8">
        <Link to="/">
          <MarketplaceLogo />
        </Link>
        <Outlet />
      </div>
    </SidebarProvider>
  );
};
