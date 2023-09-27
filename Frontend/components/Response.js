
export default function Response({ item }) {
    return (
        <div class="w-full sm:w-1/2 xl:w-1/3">
                            <div class="mx-0 mb-4 sm:ml-4 xl:mr-4">
                                <div class="w-full bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                                    <p class="p-4 font-bold text-black text-md dark:text-white">
                                        Response
                                    </p>
                                    <ul>
                                        <li class="flex items-center justify-between py-3 text-gray-600 border-b-2 border-gray-100 dark:text-gray-200 dark:border-gray-800">
                                            <div class="relative items-center justify-start text-sm">
                                                <div>
                                                <span class="mx-4">
                                                    Question:
                                                </span>
                                                <span>
                                                    What is the purpose of life?
                                                </span>
                                                </div>
                                                <div>
                                                <span class="mx-4">
                                                    Answer:
                                                </span>
                                                <span>
                                                    Fear the true God
                                                </span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
        </div>
      );
  }