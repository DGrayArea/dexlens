// Import necessary modules
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "demo",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const main = async () => {
  // Wallet address -- replace with your desired address
  const address = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";

  // Get token balances with API endpoint
  const balances = await alchemy.core.getTokenBalances(address);

  // Remove tokens with zero balance
  const nonZeroBalances = balances.tokenBalances.filter((token) => {
    return token.tokenBalance !== "0";
  });

  console.log(`Token balances of ${address} \n`);

  // Loop through all tokens with non-zero balance
  for (const token of nonZeroBalances) {
    // Get balance of token
    let balance: any = token.tokenBalance;

    // Get metadata of token with API endpoint
    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

    // Compute token balance in human-readable format
    balance = Number(balance) / Math.pow(10, metadata.decimals!);
    balance = balance.toFixed(2);

    // Print name, balance, and symbol of token
    console.log("Name:", metadata.name);
    console.log("Balance", balance);
    console.log("Symbol:", metadata.symbol);
    console.log("----------------------------------");
  }
};

main(); // Run the main function
