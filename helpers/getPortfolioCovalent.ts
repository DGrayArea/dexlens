import axios from "axios";

function encodeBase64(data: string): string {
  if (typeof window === "undefined") {
    // Node.js environment
    return Buffer.from(data).toString("base64");
  } else {
    // Browser environment
    return btoa(unescape(encodeURIComponent(data)));
  }
}

function decodeBase64(encodedData: string): string {
  if (typeof window === "undefined") {
    // Node.js environment
    return Buffer.from(encodedData, "base64").toString("utf-8");
  } else {
    // Browser environment
    return decodeURIComponent(escape(atob(encodedData)));
  }
}

export const getPortfolioCovalent = async (address: string) => {
  const chainName = "eth-mainnet";
  const apiKey = process.env.NEXT_PUBLIC_COVALENT_API_KEY;
  const historicPortfolioValueEndpoint = `https://api.covalenthq.com/v1/${chainName}/address/${address}/portfolio_v2/`;

  const response = await axios.get(historicPortfolioValueEndpoint, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return response;
};
