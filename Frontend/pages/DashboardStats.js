import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>DeForm App DashBoard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main class="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-2xl">
      <div class="flex items-start justify-between">
      <div class="relative hidden h-screen my-4 ml-4 shadow-lg lg:block w-80">
            <div class="h-full bg-white rounded-2xl dark:bg-gray-700">
                <div class="flex items-center justify-center pt-6 text-3xl text-[#0070f3]">
                    <h2>Dashboard</h2>
                </div>
                <nav class="mt-6">
                    <div>
                    <a class="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-colors duration-200 dark:text-gray-200 hover:text-blue-500" href="/DashboardForms">
                            <span class="text-left">
                            📋
                            </span>
                            <span class="mx-4 text-sm font-normal">
                                Forms
                            </span>
                        </a>
                        <a class="flex items-center justify-start w-full p-4 my-2 font-thin text-blue-500 uppercase transition-colors duration-200 border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100" href="#">                            <span class="text-left">
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
        <div class="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
        <div class="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0">
        <div class="grid grid-cols-1 gap-4 my-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="w-full">
                        <div class="relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-700">
                            <p class="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max dark:text-white">
                                Forms Created
                            </p>
                            <div class="flex items-end my-6 space-x-2">
                                <p class="text-5xl font-bold text-black dark:text-white">
                                    20
                                </p>
                            </div>
                            <div class="dark:text-white">
                                <div class="flex items-center justify-between pb-2 mb-2 text-sm border-b border-gray-200 sm:space-x-12">
                                    <p>
                                        Active Forms
                                    </p>
                                    <div class="flex items-end text-xs">
                                        4
                                    </div>
                                </div>
                                <div class="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                                    <p>
                                        Inactive Forms
                                    </p>
                                    <div class="flex items-end text-xs">
                                        16
                                    </div>
                                </div>
                                <div class="flex items-center justify-between space-x-12 text-sm md:space-x-24">
                                    <p>
                                        scheduled Forms
                                    </p>
                                    <div class="flex items-end text-xs">
                                        5
                                    </div>
                                </div>
                            </div>
                        </div>
        </div>
        <div class="w-full">
            <div class="relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-700">
                <p class="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max dark:text-white">
                    Responses
                </p>
                <div class="flex items-end my-6 space-x-2">
                    <p class="text-5xl font-bold text-black dark:text-white">
                        50
                    </p>
                </div>
                <div class="dark:text-white">
                    <div class="flex items-center justify-between pb-2 mb-2 text-sm border-b border-gray-200 sm:space-x-12">
                        <p>
                            Unique Responses
                        </p>
                        <div class="flex items-end text-xs">
                            25
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full">
            <div class="relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-700">
                <p class="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max dark:text-white">
                    Data streams
                </p>
                <div class="flex items-end my-6 space-x-2">
                    <p class="text-5xl font-bold text-black dark:text-white">
                        10
                    </p>
                </div>
                <div class="dark:text-white">
                    <div class="flex items-center justify-between pb-2 mb-2 text-sm border-b border-gray-200 sm:space-x-12">
                        <p>
                            Subscribers
                        </p>
                        <div class="flex items-end text-xs">
                            4
                        </div>
                    </div>
                    <div class="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                        <p>
                            Amount Generated
                        </p>
                        <div class="flex items-end text-xs">
                            💲16,000
                        </div>
                    </div>
                </div>
            </div>
        </div>
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

// dark:from-gray-700 dark:to-gray-800