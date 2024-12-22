import { Link, Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="flex flex-col items-center mt-8 gap-8">
      <Link to={"/"} className="text-2xl font-bold">
        Marketplace
      </Link>
      <div className="rounded-lg shadow-md border">
        <Outlet />
      </div>
    </div>
  );
};
