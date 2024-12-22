import { Button } from "@/components/ui/button";
import { OctagonX } from "lucide-react";
import { useNavigate } from "react-router";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="flex flex-col gap-2 items-center">
        <OctagonX className="text-red-500" />
        <span>404 Not Found</span>
      </div>
      <Button className="mt-4" onClick={() => navigate("/")}>
        Home
      </Button>
    </div>
  );
};
