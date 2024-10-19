import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, SearchIcon, Trash2Icon, ViewIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import { utils } from "ethers";
import Loading from "@/components/Loading";
import PortFolio from "@/components/PortFolio";
import { getPortfolioCovalent } from "@/helpers/getPortfolioCovalent";
import { walletData, WalletData } from "@/config";

// bg-[rgb(34, 36, 42);]

type Chain = "ethereum" | "solana";
interface InputType {
  chain: Chain;
  address: string;
}

export default function Home() {
  const [addressFields, setAddressFields] = useState<InputType[]>([
    {
      chain: "ethereum",
      address: "",
    },
  ]);
  const [errors, setErrors] = useState<(boolean | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [accountsInfo, setAccountsInfo] = useState<WalletData>();
  const [tab, setTab] = useState<"home" | "portfolio">("portfolio");

  const isValidEthAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleAddField = useCallback((): void => {
    setAddressFields((prevFields) => [
      ...prevFields,
      {
        chain: "ethereum",
        address: "",
      },
    ]);
  }, []);

  const handleSelectChange = useCallback(
    (index: number, value: Chain): void => {
      setAddressFields((prevFields) => {
        const updatedFields = [...prevFields];
        updatedFields[index].chain = value;
        return updatedFields;
      });
    },
    []
  );

  const handleInputChange = useCallback(
    (index: number, value: string): void => {
      setAddressFields((prevFields) => {
        const updatedFields = [...prevFields];
        updatedFields[index].address = value;
        return updatedFields;
      });
    },
    []
  );

  const handleRemoveField = useCallback((index: number): void => {
    setAddressFields((prevFields) => prevFields.filter((_, i) => i !== index));
    setErrors((prevErrors) => prevErrors.filter((_, i) => i !== index));
  }, []);

  const validateFields = useCallback((): void => {
    const newErrors = addressFields.map((value, index) => {
      const isAddress = isValidEthAddress(value.address);
      if (!value) {
        toast.error(`Input ${index + 1} cannot be empty.`);
        return true;
      } else if (!isAddress) {
        toast.error(`Input ${index + 1} is not a valid Ethereum address.`);
        return true;
      }
      // reserved for solana checks
      return false;
    });

    setErrors(newErrors);
  }, [addressFields]);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    validateFields();
    if (errors.every((error) => error === null)) {
      const data = await getPortfolioCovalent(addressFields[0].address);
      setAccountsInfo(data?.data?.data);
      console.log("Collected input values:", addressFields);
      setLoading(false);
    } else {
      console.log("Errors:", errors);
    }
  }, [errors, addressFields, validateFields]);

  useEffect(() => {
    const getPort = async () => {
      const data = await getPortfolioCovalent(
        "0x4a63BA5ec7160bAff089bFd50CCcD39951994Dd1"
      );
      console.log(data);
    };
    // getPort();
  }, []);

  return (
    <div
      className={`flex flex-col justify-content p-10 min-h-screen items-center`}
      style={{
        background:
          "linear-gradient(193.68deg, rgb(27, 28, 34) 0.68%, rgb(0, 0, 0) 100.48%)",
      }}
    >
      <div className="min-h-screen text-4xl flex lg:hidden justify-center mt-72 text-center w-full text-white font-bold">
        Only Desktop Supported ATM.
      </div>
      <div className="w-full h-full duration-150 transition all">
        {loading ? (
          <Loading setLoading={setLoading} back={setTab} />
        ) : (
          <>
            {accountsInfo && tab === "portfolio" ? (
              <PortFolio back={setTab} data={accountsInfo} />
            ) : (
              <div className="w-full h-full hidden lg:flex flex-col transition-all duration-150">
                <div className="flex flex-row justify-between items-center mb-16">
                  <div className="text-3xl font-bold">Accounts</div>
                  <div>
                    <SearchIcon className="w-16 cursor-pointer" />
                  </div>
                </div>

                <div className="border border-white rounded-xl p-8">
                  <div className="w-full flex justify-end">
                    <Button
                      onClick={handleAddField}
                      variant="secondary"
                      className="py-[22px] transition-all active:scale-90 duration-200"
                    >
                      <PlusIcon className="mr-1" /> Add Address
                    </Button>
                  </div>

                  <div className="mt-8 text-xl font-semibold mb-6">
                    Enter Address
                  </div>
                  <div className="flex flex-col space-y-4 transition-all w-full duration-150 md:max-h-96 overflow-y-auto scrollbar-hide">
                    {addressFields.map((data, index) => (
                      <div
                        key={index}
                        className="flex flex-row justify-between space-x-12 items-center w-full transition-all duration-150"
                      >
                        <Select
                          defaultValue="ethereum"
                          onValueChange={(e: Chain) =>
                            handleSelectChange(index, e)
                          }
                        >
                          <SelectTrigger className="w-[200px] py-[22px] rounded-xl">
                            <SelectValue placeholder="Select Chain" />
                          </SelectTrigger>
                          <SelectContent className="bg-black text-white">
                            <SelectGroup>
                              <SelectItem value="ethereum">Ethereum</SelectItem>
                              <SelectItem value="solana">Solana</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Input
                          type="text"
                          value={data.address}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(index, e.target.value)
                          }
                          placeholder={`Address`}
                          className={`rounded-xl py-[22px] transition-all duration-150 ${
                            errors[index] ? "border-red-500" : "border-white"
                          }`}
                        />

                        {true && (
                          <Button
                            onClick={() => handleRemoveField(index)}
                            variant="secondary"
                            className="py-[22px] transition-all active:scale-90 duration-200"
                          >
                            <Trash2Icon className="mr-3" /> Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex w-full justify-center items-center mt-6">
                    <Button
                      onClick={handleSubmit}
                      variant="secondary"
                      className="py-[22px] transition-all active:scale-90 duration-200"
                    >
                      <ViewIcon className="mr-1" /> View Portfolio
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
