"use client";

import { Compass } from "lucide-react";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100vh]  bg-neutral-100 dark:bg-neutral-900 ">
      <div className="grid min-h-svh lg:grid-cols-2 w-full">
        <div className="flex flex-col gap-4 p-6 md:p-10 w-auto">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="/" className="flex items-center gap-2 font-medium">
              <Image src="/images/logo.jpg" alt="Logo" width={40} height={40} />
              WIN PC APP
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center ">
            {children}
          </div>

          <p className="text-xs text-accent">WIN PC APP v0.0.1 Terms Privacy</p>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <img
            src="/images/logo.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover brightness-[0.6]"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
