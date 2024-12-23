import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useLogin } from "@/hooks/use-login";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

export const Login = () => {
  const login = useLogin();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    login.mutate(
      {
        username,
        password,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Logged in successfully",
          });

          navigate("/");
        },
      }
    );
  };

  return (
    <div className="p-8 pt-4 flex flex-col gap-4 items-center max-w-[400px] w-full">
      <h1 className="text-xl font-bold">Login</h1>
      <div className="mb-4">
        <span>Don&apos;t have an account? </span>
        <Link to={"/register"} className="font-semibold underline">
          Register
        </Link>
      </div>
      <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
        <Input
          placeholder={"Username"}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          minLength={4}
          required
        />
        <Input
          placeholder={"Password"}
          type={"password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          minLength={4}
          required
        />
        <Button
          className={"w-full mt-4 flex items-center"}
          disabled={login.isPending}
        >
          {login.isPending && <Loader2 className="size-4 animate-spin" />}
          <span>Login</span>
        </Button>
      </form>
    </div>
  );
};
