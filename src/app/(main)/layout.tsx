import Navbar from "@/components/navbar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ClipboardList, ContactRound, Compass, Gauge } from "lucide-react";

import { cookies } from "next/headers";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Campaign",
    url: "/",
    icon: Compass,
  },
  {
    title: "Dashboard",
    url: "dashboard",
    icon: Gauge,
  },
  {
    title: "Tasks",
    url: "tasks",
    icon: ClipboardList,
  },
  {
    title: "Contacts",
    url: "contacts",
    icon: ContactRound,
  },
];

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-none">
        <SidebarHeader className="py-4 flex flex-row justify-start">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <span className="font-medium">
                    <Compass />
                    Campaign Compass
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <span className="text-xs text-muted-foreground py-3">v.0.0.1</span>
        </SidebarFooter>
      </Sidebar>
      <main className="w-full mx-5 mt-2 mb-5 ">
        <Navbar />
        <div className="rounded-lg border bg-white dark:bg-neutral-950 p-5">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
