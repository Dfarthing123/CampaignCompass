"use client";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  ClipboardList,
  ContactRound,
  Compass,
  Gauge,
  BookUser,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
    title: "Team",
    url: "members",
    icon: BookUser,
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

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    } else if (loading && user && role === "guest") {
      router.push("/signin");
    }
  }, [user, loading, router]);

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
      <Sidebar collapsible="icon" className="border-none py-5">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
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
          <span className="text-xs text-muted-foreground px-5">v.0.0.1</span>
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
