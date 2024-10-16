import toast from "react-hot-toast";
import { ethers } from "ethers";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { ArrowRight, ChevronLeft, SearchIcon } from "lucide-react";

import React from "react";

const tableInfo = [
  {
    name: "ETH",
    price: "$2.60K",
    change: 0.92,
    balance: "501.795974",
    value: "$1.31M",
    logo: "/eth.png",
  },
  {
    name: "ETH",
    price: "$2.60K",
    change: -0.92,
    balance: "501.795974",
    value: "$1.31M",
    logo: "/eth.png",
  },

  // Add more d
  {
    name: "ETH",
    price: "$2.60K",
    change: 0.92,
    balance: "501.795974",
    value: "$1.31M",
    logo: "/eth.png",
  },
  // Add more d
  {
    name: "ETH",
    price: "$2.60K",
    change: -0.92,
    balance: "501.795974",
    value: "$1.31M",
    logo: "/eth.png",
  },
  // Add more d

  // Add more data as needed
];

const PortFolio: React.FC<{
  data: unknown[];
  back: (tab: "home" | "portfolio") => void;
}> = ({ data, back }) => {
  const formatter = new Intl.NumberFormat("en", { notation: "compact" });
  const total = formatter.format(1350000);
  const PNL = -1.5;
  return (
    <div className="h-full flex flex-col w-full duration-150 transition all">
      <div className="flex flex-row justify-between items-center mb-16 w-full">
        <div className="text-3xl font-bold flex flex-row items-center">
          <button
            onClick={() => back("home")}
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

        <div className="flex flex-row items-center space-x-12">
          <div className="flex flex-row space-x-8">
            <div className="border border-white h-[180px] w-[280px] rounded-xl p-6 flex flex-col space-y-6 bg-neutral-700/40 active:scale-95 transition-all duration-300">
              <div className="font-semibold text-lg">Total Balance:</div>
              <div className="text-4xl font-mono">US${total}</div>
            </div>
          </div>
          <div className="flex flex-row space-x-8">
            <div className="border border-white h-[180px] w-[280px] rounded-xl p-6 flex flex-col space-y-6 bg-neutral-700/40 active:scale-95 transition-all duration-300">
              <div className="font-semibold text-lg">Change 24H %:</div>
              <div
                className={`text-4xl font-mono ${
                  PNL < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {PNL.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-xl font-semibold mb-7">Assets</div>
        <div className="max-h-[380px] w-[100%] overflow-auto bg-neutral-700/40 rounded-xl scrollbar-hide border">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="">
              <tr className="text-lg">
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">USD Price</th>
                <th className="px-4 py-4">Change 24H %</th>
                <th className="px-4 py-4">Balance</th>
                <th className="px-4 py-4">Value</th>
              </tr>
            </thead>
            <tbody className="font-mono text-base">
              {tableInfo.map((item, index) => (
                <tr key={index} className="border-y border-neutral-700/15">
                  <td className="px-4 py-2 flex flex-row items-center">
                    <div className="">
                      <Image
                        width={50}
                        height={50}
                        className="bg-white rounded-full p-1"
                        alt="logo-img"
                        src="/eth.png"
                      />
                    </div>

                    {item.name}
                  </td>
                  <td className="px-4 py-2">US{item.price}</td>
                  <td
                    className={`px-4 py-2 ${
                      Number(item.change) < 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {Number(item.change) < 0 ? "" : ""}
                    {item.change}%
                  </td>
                  <td className="px-4 py-2">{item.balance}</td>
                  <td className="px-4 py-2">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <Skeleton className="h-[380px] w-[100%] rounded-xl bg-neutral-700/40" /> */}
      </div>
    </div>
  );
};

export default PortFolio;
