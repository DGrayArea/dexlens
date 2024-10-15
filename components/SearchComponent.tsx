"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for the chart
const chartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

// Mock function to fetch token data
const fetchTokenData = async (address: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    name: "Example Token",
    symbol: "EXT",
    totalSupply: "1,000,000,000",
    circulatingSupply: "750,000,000",
    currentPrice: "$0.1234",
    contractAddress: address,
    pairInfo: "EXT/USDT",
    pairAddress: "0x1234567890123456789012345678901234567890",
    tokenBalances: "10,000,000 EXT",
  };
};

export default function SearchComponent() {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tokenData, setTokenData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTokenData(address);
      //@ts-expect-error error here
      setTokenData(data);
    } catch (error) {
      console.error("Error fetching token data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Token Analysis
            </h1>
            <div className="flex items-center space-x-4">
              <Input
                type="text"
                placeholder="Enter token address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-96 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
              <Button
                onClick={() => setDarkMode(!darkMode)}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                {darkMode ? (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {isLoading ? (
            <LoadingSkeleton />
          ) : tokenData ? (
            <TokenDetails tokenData={tokenData} />
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Enter a token address to view analysis
            </p>
          )}
        </main>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
  );
}
//@ts-expect-error error here

function TokenDetails({ tokenData }) {
  return (
    <div className="space-y-6">
      <Card className="border border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 dark:text-white">
            {tokenData.name} ({tokenData.symbol})
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Token Details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Total Supply:</strong> {tokenData.totalSupply}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Circulating Supply:</strong>{" "}
                {tokenData.circulatingSupply}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Current Price:</strong> {tokenData.currentPrice}
              </p>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Contract Address:</strong> {tokenData.contractAddress}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Pair Info:</strong> {tokenData.pairInfo}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Pair Address:</strong> {tokenData.pairAddress}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 dark:text-white">
            Token Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 24, 39, 0.8)",
                    border: "none",
                    borderRadius: "4px",
                    color: "#F3F4F6",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs
        defaultValue="traders"
        className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
      >
        <TabsList className="bg-gray-100 dark:bg-gray-800 p-2 rounded-t-lg">
          <TabsTrigger
            value="traders"
            className="text-gray-700 dark:text-gray-300"
          >
            Top Traders
          </TabsTrigger>
          <TabsTrigger
            value="insights"
            className="text-gray-700 dark:text-gray-300"
          >
            Insights
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="text-gray-700 dark:text-gray-300"
          >
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="traders">
          <Card className="border-t-0 rounded-t-none">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">
                Top Traders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                List of top traders will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="insights">
          <Card className="border-t-0 rounded-t-none">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">
                Token Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                Detailed insights about the token will be shown here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card className="border-t-0 rounded-t-none">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                Advanced analytics and metrics will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
