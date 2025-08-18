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
  Command,
  Goal,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CampaignSelector } from "@/components/CampaignSelector";

// Menu items.
const items = [
  {
    title: "Campaign",
    url: "/",
    icon: Flag,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Team",
    url: "/members",
    icon: BookUser,
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
];

const teams = [
  {
    name: "Party A",
    logo: Goal,
    plan: "Campaign X",
  },
  {
    name: "Party B",
    logo: Goal,
    plan: "Campaign Y",
  },
  {
    name: "Party C",
    logo: Goal,
    plan: "Campaign Z",
  },
];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, role } = useAuth();
  const router = useRouter();

  const adminItem = {
    title: "Admin",
    url: "/admin",
    icon: Command, // Or any icon you prefer
  };
  const menuItems = role === "admin" ? [...items, adminItem] : items;

  /*   useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    } else if (loading && user && role === "guest") {
      router.push("/signin");
    }
  }, [user, loading, router]); */

  const noLoaderRoutes = ["/accept-invite"];

  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  useEffect(() => {
    const publicRoutes = ["/accept-invite"]; // add any other public routes here
    const isPublicRoute = publicRoutes.includes(pathname);

    if (!loading && !user && !isPublicRoute) {
      router.push("/signin");
    } else if (loading && user && role === "guest" && !isPublicRoute) {
      router.push("/signin");
    }
  }, [user, loading, role, router]);

  if ((loading || !user) && !noLoaderRoutes.includes(pathname)) {
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
      <Sidebar collapsible="icon" className="border-none pb-5 pt-3">
        <SidebarHeader>
          {/* <CampaignSwitcher teams={teams} /> */}
          <CampaignSelector />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title} className="mb-2">
                    <SidebarMenuButton
                      asChild
                      // isActive={pathname === `${item.url}`}
                    >
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon />
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <span className="text-xs text-muted-foreground px-5 truncate">
            v.0.0.1
          </span>
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
