"use client";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Compass } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, role } = useAuth();
  const router = useRouter();

  // redirect user if signed in
  useEffect(() => {
    console.log(role);
    if (user && user.emailVerified && role === "guest") {
      router.push("/approval");
    } else if (user && user.emailVerified) {
      router.push("/");
    }
  }, [user, loading, router, role]);

  if (loading || (user && role !== "guest")) {
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
    <div className="h-[100vh]  bg-neutral-100 dark:bg-neutral-900 ">
      <div className="grid min-h-svh lg:grid-cols-2 w-full">
        <div className="flex flex-col gap-4 p-6 md:p-10 w-auto">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-8  items-center justify-center rounded-md">
                <Compass className="size-5" />
              </div>
              Campaign Compass v0.0.1
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center ">
            {children}
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1610208350283-b01598dcd86e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover brightness-[0.6]"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
