"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Compass, LogOut, User2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { SidebarTrigger } from "./ui/sidebar";

export default function Navbar() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/signin");
  };

  const handleProfile = async () => {
    router.push("/profile");
  };

  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollHeight(window.pageYOffset); // or window.pageYOffset
    };

    window.addEventListener("scroll", handleScroll);

    // Call once to set initial scroll position
    handleScroll();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`py-4 flex items-center justify-between sticky top-0 z-40 bg-neutral-50 dark:bg-neutral-900
      ${scrollHeight > 15 ? "border-b" : "border-0"}`}
    >
      <SidebarTrigger variant="outline" size="icon" className="p-4" />
      <div className="flex flex-row gap-2 font-medium">
        <Compass /> WIN PC APP
      </div>

      <div className="flex items-center pe-2">
        {loading ? (
          <Skeleton className="h-8 w-20" />
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="relative h-8 w-8 rounded-full">
                <User2 />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">My Account</p>
                  <p className="text-xs leading-none text-muted-foreground break-all">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfile}>
                <User2 className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}
