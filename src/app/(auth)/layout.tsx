"use client";

import { Compass } from "lucide-react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
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
