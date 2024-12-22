import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useParams } from "react-router";
import { Link, Outlet, useNavigate } from "react-router";

export const HeaderLayout = () => {
  const navigate = useNavigate();

  const params = useParams();

  const { item, removeItem } = useLocalStorage("marketplace");

  const handleAccount = () => {
    navigate("/account");
  };

  const handleLogout = () => {
    removeItem();
  };

  return (
    <div className="flex flex-col h-screen mx-16 my-8 gap-8">
      <div className="flex justify-between items-center gap-16">
        <Link to="/" className="text-2xl font-bold">
          Marketplace
        </Link>
        <Input
          placeholder={"Search items.."}
          className={params.id && "hidden"}
        />
        <div className="flex gap-2">
          {item && (
            <>
              <Button onClick={handleAccount}>Account</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          )}
          {!item && (
            <>
              <Button onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/register")}>Register</Button>
            </>
          )}
        </div>
      </div>

      <Outlet />
    </div>
  );
};
