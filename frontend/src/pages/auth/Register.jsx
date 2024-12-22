import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useRegister } from "@/hooks/use-register";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const Register = () => {
  const register = useRegister();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    register.mutate(
      {
        username,
        password,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Account registered successfully. You can now login.",
          });
        },
      }
    );

    navigate("/login");
  };

  return (
    <div className="p-8 pt-4 flex flex-col gap-4 items-center w-[400px]">
      <h1 className="text-xl font-bold">Register</h1>
      <div className="mb-4">
        <span>Already have an account? </span>
        <Link to={"/login"} className="text-amber-500">
          Login
        </Link>
      </div>
      <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
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
          disabled={register.isPending}
        >
          {register.isPending && <Loader2 className="size-4 animate-spin" />}
          <span>Register</span>
        </Button>
      </form>
    </div>
  );
};
