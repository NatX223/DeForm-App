function LinkCom(link) {

<div class="shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4">
    <div class="flex-row gap-4 flex justify-center items-center">
        <div class=" flex flex-col">
            <span id="link" class="text-lg font-medium text-gray-600 dark:text-white">
                {link}
            </span>
            <span class="text-xs text-gray-400">
                your form link
            </span>
        </div>
        <button onClick={copyToClipboard} type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            Copy Link
        </button>
    </div>
</div>

}

export default LinkCom;