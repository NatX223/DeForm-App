
export default function StreamSalePreview() {
    return (
        <div class="w-full">
                        <div class="relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-700">
                            <p class="text-sm font-semibold text-2xl text-gray-700 border-b border-gray-200 w-max dark:text-white">
                                Form Name
                            </p>
                            <div class="flex items-end my-6 space-x-2">
                                <p class="text text-black dark:text-white">
                                    formDetails
                                </p>
                            </div>
                            <div class="dark:text-white">
                                <div class="flex items-center justify-between pb-2 mb-2 text-sm border-b border-gray-200 sm:space-x-12">
                                    <p>
                                        Category
                                    </p>
                                    <div class="flex items-end text-xs">
                                        Politics
                                    </div>
                                </div>
                                <div class="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
                                    <p>
                                        Subscribers
                                    </p>
                                    <div class="flex items-end text-xs">
                                        50
                                    </div>
                                </div>
                                <div class="flex items-center justify-between space-x-12 text-sm md:space-x-24">
                                    <p>
                                        Responses
                                    </p>
                                    <div class="flex items-end text-xs">
                                        100
                                    </div>
                                </div>
                                <div class="flex items-center justify-between space-x-12 text-sm md:space-x-24">
                                    <p>
                                        Price
                                    </p>
                                    <div class="flex items-end text-xs">
                                        0.01 FIL
                                    </div>
                                </div>
                                <div class="flex items-center">
                                <button
                                    className="relative inline-block px-4 py-2 font-medium group "
                                    >
                                    <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#0070f3] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                    <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#0070f3]"></span>
                                    <span className="relative text-black">Subscribe</span>
                                    </button>
                                </div>
                            </div>
                        </div>
        </div>
    );
  }