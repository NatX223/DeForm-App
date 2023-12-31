import Head from 'next/head';
import dynamic from "next/dynamic";
import FormSalePreview from "../components/FormSale";
import { useState, useEffect } from 'react';
import { getFormsForSale } from '../utils/app';

export default function Home() {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        let _items;
        setIsLoading(true);
        try {
            _items = await getFormsForSale();
            setItems(_items);
            console.log(_items);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect( () => {
        fetchData();
      }, []);

      if (isLoading) {
        return <div>
          <div class="flex flex-col w-1/2 gap-5 p-2 mx-auto bg-white shadow-lg select-none sm:p-4 sm:h-64 rounded-2xl sm:flex-row ">
              <div class="bg-gray-200 h-52 sm:h-full sm:w-72 rounded-xl animate-pulse">
              </div>
              <div class="flex flex-col flex-1 gap-5 sm:p-2">
                  <div class="flex flex-col flex-1 gap-3">
                      <div class="w-full h-3 bg-gray-200 animate-pulse rounded-2xl">
                      </div>
                      <div class="w-full h-3 bg-gray-200 animate-pulse rounded-2xl">
                      </div>
                      <div class="w-full h-3 bg-gray-200 animate-pulse rounded-2xl">
                      </div>
                      <div class="w-full h-3 bg-gray-200 animate-pulse rounded-2xl">
                      </div>
                  </div>
                  <div class="flex gap-3 mt-auto">
                      <div class="w-20 h-8 bg-gray-200 rounded-full animate-pulse">
                      </div>
                      <div class="w-20 h-8 bg-gray-200 rounded-full animate-pulse">
                      </div>
                      <div class="w-20 h-8 ml-auto bg-gray-200 rounded-full animate-pulse">
                      </div>
                  </div>
              </div>
          </div>
        </div>
      }

  return (
    <div>
      <Head>
        <title>DeForm Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main class="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-2xl">
      <div class="flex items-start justify-between">
      <div class="relative hidden h-screen my-4 ml-4 shadow-lg lg:block w-80">
            <div class="h-full bg-white rounded-2xl dark:bg-gray-700">
                <div class="flex items-center justify-center pt-6 text-3xl text-[#0070f3]">
                    <h2>Data Market</h2>
                </div>
                <nav class="mt-6">
                    <div> 
                        <a class="flex items-center justify-start w-full p-4 my-2 font-thin text-blue-500 uppercase transition-colors duration-200 border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100" href="#">
                            <span class="text-left">
                                📋
                            </span>
                            <span class="mx-4 text-sm font-normal">
                                Forms
                            </span>
                        </a>
                        <a class="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-colors duration-200 dark:text-gray-200 hover:text-blue-500" href="createPage">
                            <span class="text-left">
                                📊
                            </span>
                            <span class="mx-4 text-sm font-normal">
                                Compute and Analysis
                            </span>
                        </a>
                        <a class="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-colors duration-200 dark:text-gray-200 hover:text-blue-500" href="MarketplaceDatastreams">
                            <span class="text-left">
                                📥
                            </span>
                            <span class="mx-4 text-sm font-normal">
                                Datastreams
                            </span>
                        </a>
                    </div>
                </nav>
            </div>
        </div>
        <div class="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
        <div class="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0">
        <div class="grid grid-cols-1 gap-4 my-4 md:grid-cols-1 lg:grid-cols-3">
                {items &&
                items.map((item, index) => (
                  <FormSalePreview key={index} item={item} />
                ))}
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