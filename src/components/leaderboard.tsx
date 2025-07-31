import { Trophy, Medal, Award } from "lucide-react";
import { CustomAvatar, CustomUsername } from "./customavatar";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

const list = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  username: `Member_${i + 1}`,
  avatar: `U${i + 1}`,
  status: i % 4 === 0 ? "inactive" : "active",
  team: ["Alpha", "Beta", "Gamma"][i % 3],
  role: [
    "Campaign volunteer",
    "Volunteer group leader",
    "Team admin",
    "Campaign admin",
    "Senior campaign leader",
    "Campaign Principal",
  ][i % 6],
  points: 1 + (i % 51), // range: 50–100
  badge: ["First Contact", "Networker", "Persuader", "Champion", "Champion"][
    i % 5
  ],
}));

const Leaderboard = () => {
  return (
    <div className="">
      <ScrollArea className="h-72">
        <h1 className="text-lg font-medium mb-6">Leaderboard</h1>
        <div className="flex flex-col gap-2">
          {list.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex flex-row justify-between items-center gap-4 font-medium px-4 py-2">
                <div className="flex flex-row gap-2 items-center items">
                  <span className="font-medium text-lg mx-2">
                    {item.points}
                  </span>
                  <CustomAvatar sizeClass="h-10 w-10" />
                  <CustomUsername sizeClass="font-bold text-lg" />
                </div>
                <span>
                  {item.badge === "Persuader" ? (
                    <Trophy size={32} color="#Ca8a04" />
                  ) : item.badge === "Networker" ? (
                    <Medal size={32} color="#Ca8a04" />
                  ) : (
                    <Award size={32} color="#Ca8a04" />
                  )}
                  {/* {item.badge} */}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Leaderboard;
