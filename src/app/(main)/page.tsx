"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BicepsFlexed, Handshake } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";
import { useUserCampaigns } from "@/hooks/useUserCampaigns";

export default function Home() {
  const AVATAR_URI = "https://untitledui.com/images/avatars/jonathan-kelly";

  const { selectedCampaignId, setSelectedCampaignId } = useAuth();
  const { campaigns, loading } = useUserCampaigns();

  const campaign = campaigns.find((c) => c.id === selectedCampaignId);

  return (
    <div>
      <div className="mb-5">
        <div className="col-span-6 xl:col-span-6">
          <div className="flex flex-col md:flex-row items-center gap-5 bg-neutral-100 rounded-lg border">
            <Card className="flex flex-row gap-1 p-5 w-full md:w-auto border-0 shadow-none">
              <div
                className="h-40 w-40 border bg-cover rounded-full"
                style={{ backgroundImage: `url(${campaign?.ImagePath})` }}
              ></div>
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
              <p className="font-bold text-3xl ">{campaign?.Candidate}</p>
              <p className="font-medium">{campaign?.Slug}</p>
              <p className="font-medium mb-4">For {campaign?.Name}</p>
              <p className="font-medium uppercase">{campaign?.role}</p>
            </div>
          </div>
        </div>
        <Tabs defaultValue="policies">
          <TabsList className="my-5 ">
            <TabsTrigger value="policies">Core Policies</TabsTrigger>
            <TabsTrigger value="endorsements">Endorsements</TabsTrigger>
          </TabsList>
          <TabsContent value="policies">
            <div className="flex flex-col gap-4 w-full">
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
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
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
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
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
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
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
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
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
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
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
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
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
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
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
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
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
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
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
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="endorsements">
            <div className="flex flex-col gap-4">
              <Card className="w-full p-4 h-auto">
                <CardHeader className="flex flex-row justify-between p-1">
                  <p className="font-medium text-lg">Endorsement 1</p>
                  <BicepsFlexed color="#Ca8a04" />
                </CardHeader>
                <CardContent className="p-1">
                  <p className="font-medium text-lg mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean vel maximus lorem.
                  </p>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full p-4 h-auto">
                <CardHeader className="flex flex-row justify-between p-1">
                  <p className="font-medium text-lg">Endorsement 2</p>
                  <BicepsFlexed color="#Ca8a04" />
                </CardHeader>
                <CardContent className="p-1">
                  <p className="font-medium text-lg mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean vel maximus lorem.
                  </p>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full p-4 h-auto">
                <CardHeader className="flex flex-row justify-between p-1">
                  <p className="font-medium text-lg">Endorsement 3</p>
                  <BicepsFlexed color="#Ca8a04" />
                </CardHeader>
                <CardContent className="p-1">
                  <p className="font-medium text-lg mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean vel maximus lorem.
                  </p>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full p-4 h-auto">
                <CardHeader className="flex flex-row justify-between p-1">
                  <p className="font-medium text-lg">Endorsement 4</p>
                  <BicepsFlexed color="#Ca8a04" />
                </CardHeader>
                <CardContent className="p-1">
                  <p className="font-medium text-lg mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean vel maximus lorem.
                  </p>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full p-4 h-auto">
                <CardHeader className="flex flex-row justify-between p-1">
                  <p className="font-medium text-lg">Endorsement 5</p>
                  <BicepsFlexed color="#Ca8a04" />
                </CardHeader>
                <CardContent className="p-1">
                  <p className="font-medium text-lg mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean vel maximus lorem.
                  </p>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full p-4 h-auto">
                <CardHeader className="flex flex-row justify-between p-1">
                  <p className="font-medium text-lg">Endorsement 6</p>
                  <BicepsFlexed color="#Ca8a04" />
                </CardHeader>
                <CardContent className="p-1">
                  <p className="font-medium text-lg mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean vel maximus lorem.
                  </p>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full p-4 h-auto">
                <CardHeader className="flex flex-row justify-between p-1">
                  <p className="font-medium text-lg">Endorsement 7</p>
                  <BicepsFlexed color="#Ca8a04" />
                </CardHeader>
                <CardContent className="p-1">
                  <p className="font-medium text-lg mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean vel maximus lorem.
                  </p>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full p-4 h-auto">
                <CardHeader className="flex flex-row justify-between p-1">
                  <p className="font-medium text-lg">Endorsement 8</p>
                  <BicepsFlexed color="#Ca8a04" />
                </CardHeader>
                <CardContent className="p-1">
                  <p className="font-medium text-lg mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean vel maximus lorem.
                  </p>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full p-4 h-auto">
                <CardHeader className="flex flex-row justify-between p-1">
                  <p className="font-medium text-lg">Endorsement 9</p>
                  <BicepsFlexed color="#Ca8a04" />
                </CardHeader>
                <CardContent className="p-1">
                  <p className="font-medium text-lg mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean vel maximus lorem.
                  </p>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
                  </p>
                </CardContent>
              </Card>

              <Card className="w-full p-4 h-auto">
                <CardHeader className="flex flex-row justify-between p-1">
                  <p className="font-medium text-lg">Endorsement 10</p>
                  <BicepsFlexed color="#Ca8a04" />
                </CardHeader>
                <CardContent className="p-1">
                  <p className="font-medium text-lg mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean vel maximus lorem.
                  </p>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque ultrices at metus quis semper. Cras eu
                    hendrerit erat, eu feugiat est. Ut a volutpat ipsum. Morbi
                    in vestibulum ante. Cras maximus euismod sapien a facilisis.
                    Curabitur finibus leo ut interdum faucibus. Ut convallis nec
                    erat sed vulputate. Phasellus id purus leo. Aliquam lacinia
                    pellentesque diam, id aliquam eros fermentum vel. Phasellus
                    vehicula ullamcorper consectetur. Praesent eu lacinia
                    tellus. Aenean sed lacus ut elit volutpat posuere sed ac
                    orci. Morbi mollis ex lacus, sit amet condimentum ipsum
                    ornare et. elit quis varius.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
