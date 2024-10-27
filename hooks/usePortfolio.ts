import { walletData, WalletData } from "@/config";
import { create } from "zustand";

type Portfolio = {
  currentIndex: number;
  data: WalletData[];
  setCurrentIndex: (index: number) => void;
  setPortFolio: (data: WalletData[]) => void;
};

export const usePortfolio = create<Portfolio>()((set) => ({
  currentIndex: 0,
  data: [],
  setCurrentIndex: (index) => set(() => ({ currentIndex: index })),
  setPortFolio: (data) => set(() => ({ data: data })),
}));
