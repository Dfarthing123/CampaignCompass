"use client";
import { CustomAvatar, CustomUsername } from "@/components/customavatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/auth-context";
import { Settings, Trophy, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const { user, loading,role } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex justify-start gap-3">
          <User />
          <h1 className="font-medium">Profile</h1>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Settings />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="mb-4">Profile settings</SheetTitle>
              <SheetDescription asChild>
                <div>
                  <p className="text-center text-muted-foreground text-sm">
                    Authenticated as:
                  </p>
                  <p className="text-center font-medium text-primary mt-1 break-all">
                    {user && user.email}
                  </p>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-6 gap-4 my-5">
        <div className="col-span-6 xl:col-span-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl border p-4">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <Card className="flex flex-row gap-1 border rounded-xl p-5 w-full md:w-auto">
              <CustomAvatar sizeClass="h-20 w-20" />
              <Avatar>
                <AvatarImage src="https://cdn.countryflags.com/thumbs/united-states-of-america/flag-square-250.png" />
                <AvatarFallback>CA</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://www.parks.ca.gov/pages/495/images/CurrentFlag.jpg" />
                <AvatarFallback>CA</AvatarFallback>
              </Avatar>
            </Card>
            <div className="w-full">
              <CustomUsername sizeClass="font-bold text-lg" />
              <p className="font-medium">Role: {role}</p>
              <p className="font-medium">Team Administrator</p>
              <p className="font-medium">Party A</p>
              <p className="font-medium">
                Lorem ipsum dolor sit amet, adipiscing elit.
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 xl:col-span-2 bg-neutral-50 dark:bg-neutral-900 rounded-xl border p-4">
          <p className="font-medium text-lg my-5">Campaign Coins</p>
        </div>
        <div className="col-span-6 xl:col-span-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border p-4 flex flex-col justify-between">
          <p className="font-medium text-lg my-5">Badges</p>

          <div className="mx-3 my-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>Next badge</span>
              <Trophy />
            </div>
            <Progress value={33} className="h-1" />
          </div>
        </div>
        <div className="col-span-6 xl:col-span-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border p-4">
          <p className="font-medium text-lg my-5">Performance</p>
        </div>
      </div>
    </div>
  );
};

export default page;
