import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus, ContactRound } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex justify-start gap-3">
          <ContactRound />
          <h1 className="font-medium">Contacts</h1>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Plus />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="mb-4">Contacts</SheetTitle>
              <SheetDescription asChild>
                <div>
                  <p className="text-center text-muted-foreground text-sm">
                    New contact
                  </p>
                  <p className="text-center font-medium text-primary mt-1 break-all"></p>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default page;
