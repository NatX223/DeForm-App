import toast from "react-hot-toast";
import { connectWallet, getUserAddress } from "../utils/app";
import { useState } from "react";
export default function Navbar() {
    const [address, setAddress] = useState(null);
  return (
<header className="z-30 flex items-center w-full h-24 sm:h-32">
        <div class="container flex items-center justify-between px-6 mx-auto">
            <div class="flex items-center text-3xl font-black text-[#0070f3] dark:text-[#0070f3]">
                <span class="mt-1 ml-3 text-3xl"> DeForm
                {/* look for a better font */}
                </span>
            </div>
            <div class="flex items-center">
                <nav class="items-center hidden text-lg text-gray-800 uppercase font-sen dark:text-white lg:flex">
                    <a href="DashboardForms" class="flex px-6 py-2 hover:text-[#0070f3]">
                        Profile
                    </a>
                    <a href="MarketplaceForms" class="flex px-6 py-2 hover:text-[#0070f3]">
                        Marketplace
                    </a>
                    <a href="Explore" class="flex px-6 py-2 hover:text-[#0070f3]">
                        Explore
                    </a>
                    <button
                    onClick={async () => {
                        try {
                            await connectWallet();
                            const userAddress = await getUserAddress();
                            setAddress(userAddress);
                        } catch (error) {
                            console.error(error);
                            toast.error("Something went wrong");
                        }
                    }}
                    className="relative inline-block px-4 py-2 font-medium group "
                    >
                    <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#0070f3] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#0070f3]"></span>
                    {address ? (
                    <span className="relative text-black">
                        {address.slice(0, 6) + "..." + address.slice(-4)}
                    </span>
                    ) : (
                    <span className="relative text-black">Connect Wallet</span>
                    )}
                    </button>
                </nav>
                <button class="flex flex-col ml-4 lg:hidden">
                    <span class="w-6 h-1 mb-1 bg-gray-800 dark:bg-white">
                    </span>
                    <span class="w-6 h-1 mb-1 bg-gray-800 dark:bg-white">
                    </span>
                    <span class="w-6 h-1 mb-1 bg-gray-800 dark:bg-white">
                    </span>
                </button>
            </div>
        </div>
    </header>
  );
}
