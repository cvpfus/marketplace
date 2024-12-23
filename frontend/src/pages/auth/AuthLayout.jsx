import { MarketplaceLogo } from "@/components/ui/marketplace-logo";
import { Link, Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="mx-8 flex flex-col items-center mt-8 gap-8">
      <Link to="/">
        <MarketplaceLogo />
      </Link>
      <div className="rounded-lg shadow-md border bg-white">
        <Outlet />
      </div>
    </div>
  );
};
