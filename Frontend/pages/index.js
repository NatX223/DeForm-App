import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { connectWallet, getUserAddress } from '../utils/app';
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>DeForm App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <div class="relative z-20 flex items-center">
        <div class="container relative flex flex-col items-center justify-between px-6 py-4 mx-auto">
            <div class="flex flex-col">
                <h2 class="max-w-3xl py-2 mx-auto text-3xl font-bold text-center text-gray-800 md:text-6xl dark:text-white">
                    Deform
                </h2>
                <p class="my-6 text-3xl text-center dark:text-white">
                    A revolutionary way of doing forms
                </p>
            </div>
            <div class="flex flex-col py-4">

                <h2 class="max-w-3xl py-2 mx-auto text-3xl font-bold text-center text-gray-800 md:text-6xl dark:text-white">
                    📋
                </h2>
                <p class="my-6 text-3xl text-center dark:text-white">
                Create forms easily in just a few clicks <br />
                Or schedule Forms for whenever you're ready
                </p>
                <div class="flex items-center justify-center mt-4">
                <button
                    onClick={async () => {
                        try {
                            await connectWallet();
                            const userAddress = await getUserAddress();
                            if (userAddress == null) {
                                await connectWallet();
                                router.push(`/DashboardForms?userAddress=${userAddress}`);
                            } else {
                                router.push(`/DashboardForms?userAddress=${userAddress}`);
                            }
                            // setAddress(userAddress); setAddress for general app
                            {/* <a href={`/createProposal?projectAddress=${Address}`}> */}
                        } catch (error) {
                            console.error(error);
                            toast.error("Something went wrong");
                        }
                    }}
                    className="relative inline-block px-4 py-2 font-medium group "
                    >
                    <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#0070f3] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#0070f3]"></span>
                    <span className="relative text-black">Get Started</span>
                    </button>
                </div>
            </div>
            <div class="flex flex-col py-4">
                <h2 class="max-w-3xl py-2 mx-auto text-3xl font-bold text-center text-gray-800 md:text-6xl dark:text-white">
                    💸
                </h2>
                <p class="my-6 text-3xl text-center dark:text-white">
                Curate, Tokenize and Sell your form data <br />
                Or get rewarded for filling forms
                </p>
                <div class="flex items-center justify-center mt-4">
                <button
                    onClick={async () => {
                        try {
                            await connectWallet();
                            const userAddress = await getUserAddress();
                            if (userAddress == null) {
                                await connectWallet();
                                router.push(`/MarketplaceForms?userAddress=${userAddress}`);
                            } else {
                                router.push(`/MarketplaceForms?userAddress=${userAddress}`);
                            }
                        } catch (error) {
                            console.error(error);
                            toast.error("Something went wrong");
                        }
                    }}
                    className="relative inline-block px-4 py-2 font-medium group "
                    >
                    <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#0070f3] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#0070f3]"></span>
                    <span className="relative text-black">Explore Marketplace</span>
                    </button>
                </div>
            </div>
            <div class="flex flex-col py-4">
                <h2 class="max-w-3xl py-2 mx-auto text-3xl font-bold text-center text-gray-800 md:text-6xl dark:text-white">
                    🌏
                </h2>
                <p class="my-6 text-3xl text-center dark:text-white">
                    Explore and Contribute to Public Datasets
                </p>
                <div class="flex items-center justify-center mt-4">
                <button
                    onClick={async () => {
                        try {
                            await connectWallet();
                            const userAddress = await getUserAddress();
                            if (userAddress == null) {
                                await connectWallet();
                                router.push(`/ExploreDatasets?userAddress=${userAddress}`);
                            } else {
                                router.push(`ExploreDatasets/?userAddress=${userAddress}`);
                            }
                        } catch (error) {
                            console.error(error);
                            toast.error("Something went wrong");
                        }
                    }}
                    className="relative inline-block px-4 py-2 font-medium group "
                    >
                    <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#0070f3] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#0070f3]"></span>
                    <span className="relative text-black">Explore Public Datasets</span>
                    </button>
                </div>
            </div>
            <div class="flex flex-col py-4">
                <h2 class="max-w-3xl py-2 mx-auto text-3xl font-bold text-center text-gray-800 md:text-6xl dark:text-white">
                    📥
                </h2>
                <p class="my-6 text-3xl text-center dark:text-white">
                    Create and Subscribe to data streams
                </p>
                <div class="flex items-center justify-center mt-4">
                <button
                    onClick={async () => {
                        try {
                            await connectWallet();
                            const userAddress = await getUserAddress();
                            if (userAddress == null) {
                                await connectWallet();
                                router.push(`/MarketplaceDatastreams?userAddress=${userAddress}`);
                            } else {
                                router.push(`/MarketplaceDatastreams?userAddress=${userAddress}`);
                            }
                        } catch (error) {
                            console.error(error);
                            toast.error("Something went wrong");
                        }
                    }}
                    className="relative inline-block px-4 py-2 font-medium group "
                    >
                    <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#0070f3] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#0070f3]"></span>
                    <span className="relative text-black">Explore Datastreams</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
      </main>

      <footer>
        <h2>
          Powered by{' Data '}
        </h2>
      </footer>
    </div>
  );
}

