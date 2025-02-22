"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { logout } from "@/server/actions/logout";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    router.push("/auth/login");
    router.refresh();
    setIsLoading(false);
  };

  return (
    <Button
      className={`max-w-min flex items-center gap-2 ${
        isLoading ? "animate-pulse opacity-75" : ""
      }`}
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? "Logging out..." : "Logout"}
      <LogOut />
    </Button>
  );
}
