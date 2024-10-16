import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ChevronLeft, SearchIcon } from "lucide-react";

const Loading: React.FC<{
  back: (tab: "home" | "portfolio") => void;
  setLoading: (state: boolean) => void;
}> = ({ back, setLoading }) => {
  return (
    <div className="h-full flex flex-col w-full duration-150 transition all">
      <div className="flex flex-row justify-between items-center mb-16 w-full">
        <div className="text-3xl font-bold flex flex-row items-center">
          <button
            onClick={() => {
              back("home");
              setLoading(false);
            }}
            className="hover:bg-neutral-700/35 rounded-full px-0 py-3 cursor-pointer mr-4 active:scale-90"
          >
            <ChevronLeft className="w-12 rounded-full active:scale-90 duration-150 transition all m-0 p-0" />
          </button>
          PortFolio <ArrowRight className="w-12" />
        </div>
        <div>
          <SearchIcon className="w-16 cursor-pointer" />
        </div>
      </div>
      <div className="flex w-full h-full flex-col px-8">
        <div className="mt-6 text-xl font-semibold mb-10">Summary</div>
        <div className="flex flex-row space-x-8">
          <Skeleton className="h-[180px] w-[280px] rounded-xl bg-neutral-700/40" />
          <Skeleton className="h-[180px] w-[280px] rounded-xl bg-neutral-700/40" />
        </div>

        <div className="mt-6 text-xl font-semibold mb-7">Assets</div>

        <Skeleton className="h-[350px] w-[100%] rounded-xl bg-neutral-700/40" />
      </div>
    </div>
  );
};

export default Loading;
