import AppBarChart from "@/components/charts/barchart";
import Leaderboard from "@/components/leaderboard";
import { Gauge, TrendingDown, TrendingUp } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex justify-start gap-3">
          <Gauge />
          <h1 className="font-medium">Dashboard</h1>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-6 xl:col-span-2 bg-neutral-50 dark:bg-neutral-900 rounded-xl border p-4">
          <p className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance">
            Contacts
          </p>
          <p className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance">
            10k
          </p>
          <TrendingUp color="#545454" />
        </div>
        <div className="col-span-6 xl:col-span-2 bg-neutral-50 dark:bg-neutral-900 rounded-xl border p-4">
          <p className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance">
            Tasks
          </p>
          <p className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance">
            852
          </p>
          <TrendingDown color="#545454" />
        </div>
        <div className="col-span-6 xl:col-span-2 bg-neutral-50 dark:bg-neutral-900 rounded-xl border p-4">
          <p className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance">
            Outreach
          </p>
          <p className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance">
            275
          </p>
          <TrendingUp color="#545454" />
        </div>
        <div className="col-span-6 xl:col-span-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
          <AppBarChart />
        </div>
        <div className="col-span-6 xl:col-span-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl border p-4">
          <Leaderboard />
        </div>
        <div className="col-span-6 xl:col-span-2 bg-neutral-50 dark:bg-neutral-900 rounded-xl border p-4"></div>
        <div className="col-span-6 xl:col-span-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl border p-4"></div>
      </div>
    </div>
  );
};

export default page;
