"use client";

import { Home, FileLock2, FolderLock, MessageSquareLock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import LogoutButton from "../auth/logout-button";

const menuItems = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Secret Page 1", icon: FileLock2, href: "/secret-page-1" },
  { title: "Secret Page 2", icon: FolderLock, href: "/secret-page-2" },
  { title: "Secret Page 3", icon: MessageSquareLock, href: "/secret-page-3" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Secret Page App</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="items-end pb-4">
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
