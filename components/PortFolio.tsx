import Image from "next/image";
import { ArrowRight, ChevronLeft, SearchIcon } from "lucide-react";
import truncateEthAddress from "truncate-eth-address";
import React, { useMemo, useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";

function TokenImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc("/thinker.webp"); // Fallback emoji image
  };

  return (
    <Image
      src={imgSrc}
      alt={alt || "Token image"}
      width={30}
      height={30}
      onError={handleError}
      className="rounded-full mr-2"
    />
  );
}

const PortFolio: React.FC<{
  back: (tab: "home" | "portfolio") => void;
}> = ({ back }) => {
  const { currentIndex, setCurrentIndex, data: portfolioData } = usePortfolio();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formatter = new Intl.NumberFormat("en", { notation: "compact" });
  const total = useMemo(
    () =>
      formatter.format(
        portfolioData[currentIndex].items.reduce(
          (sum, item) => (sum += item.holdings[0].close.quote),
          0
        )
      ),
    [currentIndex, portfolioData, formatter]
  );

  const TOTAL_PNL = useMemo(() => {
    return portfolioData[currentIndex]?.items?.reduce((sum, item) => {
      if (item.holdings[0]?.quote_rate) {
        const tokenPNL =
          ((item.holdings[0].quote_rate - item.holdings[1].quote_rate) /
            item.holdings[1].quote_rate) *
          100;
        return sum + tokenPNL;
      } else return sum + 0;
    }, 0);
  }, [currentIndex, portfolioData]);

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
          <span className="font-semibold">
            {truncateEthAddress(portfolioData[currentIndex]?.address)}
          </span>
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
                  TOTAL_PNL < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {TOTAL_PNL.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-row overflow-auto scrollbar-hide justify-between items-center space-x-8">
          <div className="w-[25%]">
            <div className="mt-6 text-xl font-semibold mb-7">Addresses</div>
            <div className="min-h-[380px] max-h-[380px] overflow-auto bg-neutral-700/40 rounded-xl scrollbar-hide border flex flex-col p-3 space-y-2">
              {portfolioData.map((portfolio, index) => {
                const totalPortfolioBalance = formatter.format(
                  portfolioData[currentIndex].items.reduce(
                    (sum, item) => (sum += item.holdings[0].close.quote),
                    0
                  )
                );
                const totalPNLBalance = portfolio?.items?.reduce(
                  (sum, item) => {
                    if (item.holdings[0]?.quote_rate) {
                      const tokenPNL =
                        ((item.holdings[0]?.quote_rate -
                          item.holdings[1]?.quote_rate) /
                          item.holdings[1]?.quote_rate) *
                        100;
                      return sum + tokenPNL;
                    } else return sum + 0;
                  },
                  0
                );

                return (
                  <div
                    onClick={() => setCurrentIndex(index)}
                    key={portfolio.address + index}
                    className={`flex flex-row items-center space-x-2 hover:bg-neutral-500/35 rounded-lg p-2 whitespace-nowrap cursor-pointer transition-all hover:scale-105 ${
                      index == currentIndex ? "bg-neutral-500/35" : "bg-none"
                    }`}
                  >
                    <div className="flex justify-center items-center">
                      <Image
                        src={`https://api.dicebear.com/9.x/dylan/svg?seed=${
                          portfolio.address + index
                        }`}
                        alt="image-avatar"
                        width={35}
                        height={35}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col items-start text-sm whitespace-nowrap">
                      {/* changed items-center to items-start */}
                      <div className="font-semibold text-sm">
                        {truncateEthAddress(portfolio.address)}
                      </div>
                      <div className="flex flex-row justify-between items-center space-x-6">
                        <div className="flex justify-start">
                          ${totalPortfolioBalance}
                        </div>
                        <div
                          className={`flex justify-start ${
                            Number(totalPNLBalance) < 0
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {totalPNLBalance.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full ">
            <div className="mt-6 text-xl font-semibold mb-7">Assets</div>
            <div className="min-h-[380px] max-h-[380px] w-[100%] overflow-auto bg-neutral-700/40 rounded-xl scrollbar-hide border">
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
                  {portfolioData[currentIndex]?.items?.map((item, index) => {
                    const PNL = item.holdings[0]?.quote_rate
                      ? ((item.holdings[0].quote_rate -
                          item.holdings[1].quote_rate) /
                          item.holdings[1].quote_rate) *
                        100
                      : 0;
                    const holding = (
                      Number(item.holdings[0].close.balance) /
                      Number(10 ** item.contract_decimals)
                    ).toFixed(3);

                    return (
                      <tr
                        key={index}
                        className="border-y border-neutral-700/15"
                      >
                        <td className="px-4 py-3 flex flex-row items-center">
                          <div className="">
                            {item.logo_url ? (
                              <TokenImage alt="logo-img" src={item.logo_url} />
                            ) : (
                              <div>🤔</div>
                            )}
                          </div>

                          {item.contract_ticker_symbol}
                        </td>
                        <td className="px-4 py-3">
                          ${Number(item.holdings[0].quote_rate).toFixed(6)}
                        </td>
                        <td
                          className={`px-4 py-3 ${
                            Number(PNL) < 0 ? "text-red-500" : "text-green-500"
                          }`}
                        >
                          {Number(0) < 0 ? "" : " "}
                          {PNL.toFixed(2)}%
                        </td>
                        <td className="px-4 py-3">{holding}</td>
                        <td className="px-4 py-3">
                          {item.holdings[0].close.pretty_quote}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortFolio;
