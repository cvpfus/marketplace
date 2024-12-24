import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useRegister } from "@/hooks/use-register";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Label } from "@/components/ui/label";

export const Register = () => {
  const register = useRegister();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    register.mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Account registered successfully. You can now login.",
          });

          navigate("/login");
        },
      }
    );
  };

  return (
    <div className="p-8 pt-4 flex flex-col gap-4 items-center max-w-[400px] w-full">
      <h1 className="text-xl font-bold">Register</h1>
      <div className="mb-4">
        <span>Already have an account? </span>
        <Link to={"/login"} className="font-semibold underline">
          Login
        </Link>
      </div>
      <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder={"Name"}
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          minLength={4}
          required
        />

        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder={"Email"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          minLength={4}
          required
        />

        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
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
