import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Handshake } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  const AVATAR_URI = "https://untitledui.com/images/avatars/jonathan-kelly";
  return (
    <div>
      <h1 className="text-3xl font-bold my-5">Party A</h1>
      <p className="font-medium">
        Lorem ipsum dolor sit amet, adipiscing elit.
      </p>
      <div className="grid grid-cols-6 gap-4 my-5">
        <div className="col-span-6 xl:col-span-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl border p-4">
          <div className="flex flex-col md:flex-row items-center gap-5 ">
            <Card className="flex flex-row gap-1 border rounded-xl p-5 w-full md:w-auto">
              <Avatar className="h-20 w-20">
                <AvatarImage src={AVATAR_URI} />
                <AvatarFallback>CA</AvatarFallback>
              </Avatar>
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
              <p className="font-bold text-2xl">Member A</p>
              <p className="font-medium">Candidate</p>
              <p className="font-medium">U.S. Representative</p>
              <p className="font-medium">
                California 2nd congressional district
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 xl:col-span-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl border p-4">
          <p className="font-medium mb-5 text-lg">Core Policies</p>
          <div className="flex flex-col gap-4">
            <Card className="w-full p-4 h-auto">
              <CardHeader className="flex flex-row justify-between p-1">
                <p className="font-medium text-lg">Policy 1</p>
                <Handshake color="#Ca8a04" />
              </CardHeader>
              <CardContent className="p-1">
                <p className="font-medium text-lg mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean vel maximus lorem.
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque ultrices at metus quis semper. Cras eu hendrerit
                  erat, eu feugiat est. Ut a volutpat ipsum. Morbi in vestibulum
                  ante. Cras maximus euismod sapien a facilisis. Curabitur
                  finibus leo ut interdum faucibus. Ut convallis nec erat sed
                  vulputate. Phasellus id purus leo. Aliquam lacinia
                  pellentesque diam, id aliquam eros fermentum vel. Phasellus
                  vehicula ullamcorper consectetur. Praesent eu lacinia tellus.
                  Aenean sed lacus ut elit volutpat posuere sed ac orci. Morbi
                  mollis ex lacus, sit amet condimentum ipsum ornare et. elit
                  quis varius.
                </p>
              </CardContent>
            </Card>

            <Card className="w-full p-4 h-auto">
              <CardHeader className="flex flex-row justify-between p-1">
                <p className="font-medium text-lg">Policy 2</p>
                <Handshake color="#Ca8a04" />
              </CardHeader>
              <CardContent className="p-1">
                <p className="font-medium text-lg mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean vel maximus lorem.
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque ultrices at metus quis semper. Cras eu hendrerit
                  erat, eu feugiat est. Ut a volutpat ipsum. Morbi in vestibulum
                  ante. Cras maximus euismod sapien a facilisis. Curabitur
                  finibus leo ut interdum faucibus. Ut convallis nec erat sed
                  vulputate. Phasellus id purus leo. Aliquam lacinia
                  pellentesque diam, id aliquam eros fermentum vel. Phasellus
                  vehicula ullamcorper consectetur. Praesent eu lacinia tellus.
                  Aenean sed lacus ut elit volutpat posuere sed ac orci. Morbi
                  mollis ex lacus, sit amet condimentum ipsum ornare et. elit
                  quis varius.
                </p>
              </CardContent>
            </Card>

            <Card className="w-full p-4 h-auto">
              <CardHeader className="flex flex-row justify-between p-1">
                <p className="font-medium text-lg">Policy 3</p>
                <Handshake color="#Ca8a04" />
              </CardHeader>
              <CardContent className="p-1">
                <p className="font-medium text-lg mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean vel maximus lorem.
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque ultrices at metus quis semper. Cras eu hendrerit
                  erat, eu feugiat est. Ut a volutpat ipsum. Morbi in vestibulum
                  ante. Cras maximus euismod sapien a facilisis. Curabitur
                  finibus leo ut interdum faucibus. Ut convallis nec erat sed
                  vulputate. Phasellus id purus leo. Aliquam lacinia
                  pellentesque diam, id aliquam eros fermentum vel. Phasellus
                  vehicula ullamcorper consectetur. Praesent eu lacinia tellus.
                  Aenean sed lacus ut elit volutpat posuere sed ac orci. Morbi
                  mollis ex lacus, sit amet condimentum ipsum ornare et. elit
                  quis varius.
                </p>
              </CardContent>
            </Card>

            <Card className="w-full p-4 h-auto">
              <CardHeader className="flex flex-row justify-between p-1">
                <p className="font-medium text-lg">Policy 4</p>
                <Handshake color="#Ca8a04" />
              </CardHeader>
              <CardContent className="p-1">
                <p className="font-medium text-lg mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean vel maximus lorem.
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque ultrices at metus quis semper. Cras eu hendrerit
                  erat, eu feugiat est. Ut a volutpat ipsum. Morbi in vestibulum
                  ante. Cras maximus euismod sapien a facilisis. Curabitur
                  finibus leo ut interdum faucibus. Ut convallis nec erat sed
                  vulputate. Phasellus id purus leo. Aliquam lacinia
                  pellentesque diam, id aliquam eros fermentum vel. Phasellus
                  vehicula ullamcorper consectetur. Praesent eu lacinia tellus.
                  Aenean sed lacus ut elit volutpat posuere sed ac orci. Morbi
                  mollis ex lacus, sit amet condimentum ipsum ornare et. elit
                  quis varius.
                </p>
              </CardContent>
            </Card>

            <Card className="w-full p-4 h-auto">
              <CardHeader className="flex flex-row justify-between p-1">
                <p className="font-medium text-lg">Policy 5</p>
                <Handshake color="#Ca8a04" />
              </CardHeader>
              <CardContent className="p-1">
                <p className="font-medium text-lg mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean vel maximus lorem.
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque ultrices at metus quis semper. Cras eu hendrerit
                  erat, eu feugiat est. Ut a volutpat ipsum. Morbi in vestibulum
                  ante. Cras maximus euismod sapien a facilisis. Curabitur
                  finibus leo ut interdum faucibus. Ut convallis nec erat sed
                  vulputate. Phasellus id purus leo. Aliquam lacinia
                  pellentesque diam, id aliquam eros fermentum vel. Phasellus
                  vehicula ullamcorper consectetur. Praesent eu lacinia tellus.
                  Aenean sed lacus ut elit volutpat posuere sed ac orci. Morbi
                  mollis ex lacus, sit amet condimentum ipsum ornare et. elit
                  quis varius.
                </p>
              </CardContent>
            </Card>

            <Card className="w-full p-4 h-auto">
              <CardHeader className="flex flex-row justify-between p-1">
                <p className="font-medium text-lg">Policy 6</p>
                <Handshake color="#Ca8a04" />
              </CardHeader>
              <CardContent className="p-1">
                <p className="font-medium text-lg mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean vel maximus lorem.
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque ultrices at metus quis semper. Cras eu hendrerit
                  erat, eu feugiat est. Ut a volutpat ipsum. Morbi in vestibulum
                  ante. Cras maximus euismod sapien a facilisis. Curabitur
                  finibus leo ut interdum faucibus. Ut convallis nec erat sed
                  vulputate. Phasellus id purus leo. Aliquam lacinia
                  pellentesque diam, id aliquam eros fermentum vel. Phasellus
                  vehicula ullamcorper consectetur. Praesent eu lacinia tellus.
                  Aenean sed lacus ut elit volutpat posuere sed ac orci. Morbi
                  mollis ex lacus, sit amet condimentum ipsum ornare et. elit
                  quis varius.
                </p>
              </CardContent>
            </Card>

            <Card className="w-full p-4 h-auto">
              <CardHeader className="flex flex-row justify-between p-1">
                <p className="font-medium text-lg">Policy 7</p>
                <Handshake color="#Ca8a04" />
              </CardHeader>
              <CardContent className="p-1">
                <p className="font-medium text-lg mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean vel maximus lorem.
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque ultrices at metus quis semper. Cras eu hendrerit
                  erat, eu feugiat est. Ut a volutpat ipsum. Morbi in vestibulum
                  ante. Cras maximus euismod sapien a facilisis. Curabitur
                  finibus leo ut interdum faucibus. Ut convallis nec erat sed
                  vulputate. Phasellus id purus leo. Aliquam lacinia
                  pellentesque diam, id aliquam eros fermentum vel. Phasellus
                  vehicula ullamcorper consectetur. Praesent eu lacinia tellus.
                  Aenean sed lacus ut elit volutpat posuere sed ac orci. Morbi
                  mollis ex lacus, sit amet condimentum ipsum ornare et. elit
                  quis varius.
                </p>
              </CardContent>
            </Card>

            <Card className="w-full p-4 h-auto">
              <CardHeader className="flex flex-row justify-between p-1">
                <p className="font-medium text-lg">Policy 8</p>
                <Handshake color="#Ca8a04" />
              </CardHeader>
              <CardContent className="p-1">
                <p className="font-medium text-lg mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean vel maximus lorem.
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque ultrices at metus quis semper. Cras eu hendrerit
                  erat, eu feugiat est. Ut a volutpat ipsum. Morbi in vestibulum
                  ante. Cras maximus euismod sapien a facilisis. Curabitur
                  finibus leo ut interdum faucibus. Ut convallis nec erat sed
                  vulputate. Phasellus id purus leo. Aliquam lacinia
                  pellentesque diam, id aliquam eros fermentum vel. Phasellus
                  vehicula ullamcorper consectetur. Praesent eu lacinia tellus.
                  Aenean sed lacus ut elit volutpat posuere sed ac orci. Morbi
                  mollis ex lacus, sit amet condimentum ipsum ornare et. elit
                  quis varius.
                </p>
              </CardContent>
            </Card>

            <Card className="w-full p-4 h-auto">
              <CardHeader className="flex flex-row justify-between p-1">
                <p className="font-medium text-lg">Policy 9</p>
                <Handshake color="#Ca8a04" />
              </CardHeader>
              <CardContent className="p-1">
                <p className="font-medium text-lg mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean vel maximus lorem.
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque ultrices at metus quis semper. Cras eu hendrerit
                  erat, eu feugiat est. Ut a volutpat ipsum. Morbi in vestibulum
                  ante. Cras maximus euismod sapien a facilisis. Curabitur
                  finibus leo ut interdum faucibus. Ut convallis nec erat sed
                  vulputate. Phasellus id purus leo. Aliquam lacinia
                  pellentesque diam, id aliquam eros fermentum vel. Phasellus
                  vehicula ullamcorper consectetur. Praesent eu lacinia tellus.
                  Aenean sed lacus ut elit volutpat posuere sed ac orci. Morbi
                  mollis ex lacus, sit amet condimentum ipsum ornare et. elit
                  quis varius.
                </p>
              </CardContent>
            </Card>

            <Card className="w-full p-4 h-auto">
              <CardHeader className="flex flex-row justify-between p-1">
                <p className="font-medium text-lg">Policy 10</p>
                <Handshake color="#Ca8a04" />
              </CardHeader>
              <CardContent className="p-1">
                <p className="font-medium text-lg mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean vel maximus lorem.
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque ultrices at metus quis semper. Cras eu hendrerit
                  erat, eu feugiat est. Ut a volutpat ipsum. Morbi in vestibulum
                  ante. Cras maximus euismod sapien a facilisis. Curabitur
                  finibus leo ut interdum faucibus. Ut convallis nec erat sed
                  vulputate. Phasellus id purus leo. Aliquam lacinia
                  pellentesque diam, id aliquam eros fermentum vel. Phasellus
                  vehicula ullamcorper consectetur. Praesent eu lacinia tellus.
                  Aenean sed lacus ut elit volutpat posuere sed ac orci. Morbi
                  mollis ex lacus, sit amet condimentum ipsum ornare et. elit
                  quis varius.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
