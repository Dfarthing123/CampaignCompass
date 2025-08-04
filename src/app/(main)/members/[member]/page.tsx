import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { Siren, User2 } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex justify-start gap-3">
          <User2 />
          <h1 className="font-medium">Member</h1>
        </div>
      </div>
      <Alert>
        <Siren />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>Member is awaiting approval</AlertDescription>
      </Alert>

      <div className="grid grid-cols-6 gap-4 my-5">
        <div className="col-span-6 xl:col-span-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl border p-4">
          <div className="flex flex-col gap-5">
            <div>
              <p className="font-bold text-2xl">Member Y</p>
              <p className="font-medium">Volunteer</p>
              <p className="font-medium">Party A</p>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-5">Screening questions</p>
              <div>
                <p>What interests you about working on this campaign?</p>
                <p className="p-3 rounded border bg-white mt-3">
                  finibus leo ut interdum faucibus. Ut convallis nec erat sed
                  vulputate. Phasellus id purus leo. Aliquam lacinia
                  pellentesque diam, id aliquam eros fermentum vel. Phasellus
                  vehicula ullamcorper consectetur. Praesent eu lacinia tellus.
                  Aenean sed lacus ut elit volutpat posuere sed ac orci. Morbi
                  mollis ex lacus, sit amet condimentum ipsum ornare et. elit
                </p>
              </div>
              <div className="my-5">
                <p>
                  Have you volunteered for a political campaign before? If so,
                  what did you do?
                </p>
                <p className="p-3 rounded border bg-white mt-3">
                  fnterdum faucibus. Ut convallis nec erat sed vulputate.
                  Phasellus id purus leo. Aliquam lacinia pellentesque diam, id
                  aliquam eros fermentum vel. Phasellus vehicula ullamcorper
                  consectetur. Praesent eu lacinia tellus. Aenean sed lacus ut
                  elit volutpat posuere sed ac orci. Morbi mollis ex lacus, sit
                  amet condimentum ipsum ornare et. elit
                </p>
              </div>
              <div>
                <p>
                  Are you comfortable talking to strangers about political
                  issues, either in person or over the phone?
                </p>
                <p className="p-3 rounded border bg-white mt-3">
                  m faucibus. Ut convallis nec erat sed vulputate. Phasellus id
                  purus leo. Aliquam lacinia pellentesque diam, id aliquam eros
                  fermentum vel. Phasellus vehicula ullamcorper consectetur.
                  Praesent eu lacinia tellus. Aenean sed lacus ut elit volutpat
                  posuere sed ac orci. Morbi mollis ex lacus, sit amet
                  condimentum ipsum ornare et. elit
                </p>
              </div>
              <Button className="mt-5">Approve</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
