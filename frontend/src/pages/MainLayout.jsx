import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarketplaceLogo } from "@/components/ui/marketplace-logo";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useState } from "react";
import { useParams } from "react-router";
import { Link, Outlet, useNavigate } from "react-router";

export const MainLayout = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const params = useParams();

  const { item, removeItem } = useLocalStorage("marketplace");

  const [loggedIn, setLoggedIn] = useState(!!item);

  const handleAccount = () => {
    navigate("/account/product-listings");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    removeItem();
  };

  return (
    <div className="flex flex-col mx-8 md:mx-16 my-8 gap-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8"> 
        <Link to="/">
          <MarketplaceLogo />
        </Link>
        <Input
          placeholder={"Search items.."}
          className={`order-last md:order-none ${params.id && "hidden"}`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="flex items-center gap-2">
          {item && (
            <>
              <span>{item.username}</span>
              <Button onClick={handleAccount}>Account</Button>
              <Button
                onClick={handleLogout}
                className="bg-destructive hover:bg-destructive/90"
              >
                Log out
              </Button>
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

      <div className="flex justify-center">
        <Outlet context={{ searchValue, loggedIn }} />
      </div>
    </div>
  );
};
