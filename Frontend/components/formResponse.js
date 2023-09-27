import { useEffect, useState } from "react";
import ResponseField from "./responseInput";
import { getForm } from "../utils/app";

function FormResponse() {
  const [formQuestions, setFormQuestions] = useState([]);
  const [formDetails, setDetails] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    let questions;
    let details;
     setIsLoading(true);
     try {
      const searchParams = new URLSearchParams(window.location.search);
      const nameParam = searchParams.get('formName');    
        [questions, details] = await getForm(nameParam);
        setFormQuestions(questions);
        setDetails(details);
        console.log(questions, details);
     } catch (error) {
        console.error(error);
     } finally {
        setIsLoading(false);
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
    <div className="card lg:card-side bg-white border-[2px] border-[#f2dbd0] ml-24 mr-24 rounded-2xl dark:bg-gray-700">
        <div className='card-body px-8 py-8'>
            <div className='relative grid grid-rows-2 gap-2'>
            <h2 className='text-lg text-[#0070f3]'>
             {formDetails[0]}
            </h2>
            <p className='text-lg text-[#0070f3]'>
              {formDetails[1]}
            </p>
            </div>
            <div className="relative">
              <ResponseField formQuestions={formQuestions} />
            </div>
        </div>
    </div>
  );
}

export default FormResponse;