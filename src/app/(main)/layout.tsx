"use client";
import { useAuth } from "@/context/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
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
import {
  ClipboardList,
  ContactRound,
  Gauge,
  BookUser,
  Flag,
  Brain,
  Send,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CampaignSelector } from "@/components/CampaignSelector";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Campaign",
    url: "/",
    icon: Flag,
  },
  {
    title: "Knowledge Base",
    url: "/knowledgebase",
    icon: Brain,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: ClipboardList,
  },
  {
    title: "Contacts",
    url: "/contacts",
    icon: ContactRound,
  },
  {
    title: "Team",
    url: "/members",
    icon: BookUser,
  },
];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, role } = useAuth();
  const router = useRouter();

  const adminItem = {
    title: "Team Invites",
    url: "/admin",
    icon: Send,
  };
  const menuItems = role === "admin" ? [...items, adminItem] : items;
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    } else if (loading && user && role === "guest") {
      router.push("/signin");
    }
  }, [user, loading, role, router]);

  if (loading || !user) {
    return (
      <div className="absolute top-0 left-0 h-full w-full z-50 flex flex-col items-center justify-center min-h-screen p-4 pt-16 bg-white">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="pb-5 pt-3  bg-white">
        <SidebarHeader className=" bg-white">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-0"
              >
                <a href="#" className="overflow-visible !p-0">
                  <Image
                    src="/images/logo.jpg"
                    alt="Logo"
                    width={35}
                    height={35}
                  />
                  <span className="font-semibold"> WIN PC APP</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className=" bg-white">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className="my-5">
                  <CampaignSelector />
                </SidebarMenuItem>

                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title} className="mb-2">
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === `${item.url}`}
                      variant="default"
                    >
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
        <SidebarFooter className="bg-white p-0">
          <span className="text-xs text-muted-foreground px-5 truncate">
            v.0.0.1
          </span>
        </SidebarFooter>
      </Sidebar>
      <main className="w-full mx-5 mt-2 mb-5">
        <Navbar />
        <div className="rounded-lg border bg-white dark:bg-neutral-950 p-5">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
