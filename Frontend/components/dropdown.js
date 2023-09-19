import { useState } from 'react';

<div class="relative inline-block text-left">
    <div>
        <button type="button" class=" border border-gray-300 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500" id="options-menu">
            Input Type
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z">
                </path>
            </svg>
        </button>
    </div>
    <div class="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
        <div class="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" class="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                <span class="flex flex-col">
                    <span>
                        Text
                    </span>
                </span>
            </a>
            <a href="#" class="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                <span class="flex flex-col">
                    <span>
                        Number
                    </span>
                </span>
            </a>
            <a href="#" class="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                <span class="flex flex-col">
                    <span>
                        File
                    </span>
                </span>
            </a>
        </div>
    </div>
</div>

function MyForm() {
    const [questions, setquestions] = useState([]);
    const [inputTypes, setInputType] = useState([]);
    
    // Function to handle adding new input fields
    const addQuestion = () => {
      setquestions([...questions, '']);
      setInputType([...inputTypes, '']);
    };
  
    // Function to handle input value changes
    const handleQuestionValueChange = (index, value) => {
      const newquestions = [...questions];
      newquestions[index] = value;
      setquestions(newquestions);
    };
  
    const handleInputTypeValueChange = (index, value) => {
      const newinputtypes = [...inputTypes];
      newinputtypes[index] = value;
      setInputType(newinputtypes);
    };
  
    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      // You can now access questions array to get the values
      console.log(questions, inputTypes);
    };
  
    return (
      <div className="card lg:card-side bg-white border-[2px] border-[#f2dbd0] ml-12 mr-12 rounded-2xl dark:bg-gray-700">
          <div className='card-body px-12 py-8'>
              <form onSubmit={handleSubmit} className='relative mx-12 my-8'>
              {questions.map((questionValue, index) => (
                <div className='form-control relative grid grid-rows-2 gap-2'>
                <label className="label">
                  <span className="label-text text-lg">{index + 1}</span>
                </label>
                <input
                  className="border border-gray-300 rounded p-1 bg-gray-500 text-white"
                  key={index}
                  type="text"
                  value={questionValue}
                  onChange={(e) => handleQuestionValueChange(index, e.target.value)}
                />
              </div>
              ))}
              {inputTypes.map((inputTypeValue, index) => (
                  <div className='form-control relative'>
                  <label className="label">
                      <span className="label-text">Response type</span>
                  </label>
                  <input
                  className="border border-gray-300 rounded p-1 bg-gray-500 text-white"
                  key={index}
                  type="text"
                  value={inputTypeValue}
                  onChange={(e) => handleInputTypeValueChange(index, e.target.value)}
                  />
                  </div>
              ))}
              <button type="button" onClick={addQuestion}>Add Question ➕</button> <br />
              <button type="submit">create Form</button>
              </form>
          </div>
      </div>
    );
  }
  
  export default MyForm;