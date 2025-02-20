"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { logout } from "@/server/actions/logout";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <Button className="max-w-min" onClick={handleLogout}>
      Logout
      <LogOut />
    </Button>
  );
}
