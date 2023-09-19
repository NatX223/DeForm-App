import Head from 'next/head';
import dynamic from "next/dynamic";


export default function Home() {

// Dynamic import of Navbar to avoid SSR issues
const FormDetails = dynamic(() => import("../components/formDetails"), {
    ssr: false,
  });
  const Ressponse = dynamic(() => import("../components/Response"), {
    ssr: false,
  });

  return (
    <div>
      <Head>
        <title>DeForm App DashBoard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-2xl">
      <div className="flex items-start justify-between">
      <div className="relative hidden h-screen my-4 ml-4 shadow-lg lg:block w-80">
            <div className="h-full bg-white rounded-2xl dark:bg-gray-700">
                <div className="flex items-center justify-center pt-6 text-3xl text-[#0070f3]">
                    <h2>Dashboard</h2>
                </div>
                <nav className="mt-6">
                <div>
                        <a class="flex items-center justify-start w-full p-4 my-2 font-thin text-blue-500 uppercase transition-colors duration-200 border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100" href="#">
                            <span class="text-left">
                            📋
                            </span>
                            <span class="mx-4 text-sm font-normal">
                                Forms
                            </span>
                        </a>
                        <a class="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-colors duration-200 dark:text-gray-200 hover:text-blue-500" href="DashboardStats">
                            <span class="text-left">
                                📊
                            </span>
                            <span class="mx-4 text-sm font-normal">
                                Stats
                            </span>
                        </a>
                        <a class="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-colors duration-200 dark:text-gray-200 hover:text-blue-500" href="createPage">
                            <span class="text-left">
                                ➕
                            </span>
                            <span class="mx-4 text-sm font-normal">
                                Create
                            </span>
                        </a>
                    </div>
                </nav>
            </div>
        </div>
        <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
        <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0">
        <FormDetails />
        <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-1 lg:grid-cols-1">
                <Ressponse />
                <Ressponse />
            </div>
            <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-1 lg:grid-cols-3">
            <button className="relative inline-block px-4 py-2 font-medium group ">
                <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#0070f3] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#0070f3]"></span>
                <span className="relative text-black">Move to Archives</span>
            </button>
            <button className="relative inline-block px-4 py-2 font-medium group ">
                <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#0070f3] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#0070f3]"></span>
                <span className="relative text-black">Create Datastream</span>
            </button>
            <button className="relative inline-block px-4 py-2 font-medium group ">
                <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#0070f3] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#0070f3]"></span>
                <span className="relative text-black">List Dataset</span>
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