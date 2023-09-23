import React, { useState } from 'react';
import toast from "react-hot-toast";
import { _createForm, createForm, getUser, getUserAddress } from '../utils/app';

function MyForm() {
  const [questions, setquestions] = useState([]);
  const [inputTypes, setInputType] = useState([]);
  const [formName, setFormName] = useState(
    'form Name'
  );
  const [formDescription, setFormDescription] = useState(
    'form Description'
  );

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

  const handleInputTypeValueChange = (index, selectedValue) => {
    const newinputtypes = [...inputTypes];
    newinputtypes[index] = selectedValue;
    setInputType(newinputtypes);
  };

  const handleFormNameValueChange = (value) => {
    setFormName(value);
  };

  const handleFormDescriptionValueChange = (value) => {
    setFormDescription(value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can now access questions array to get the values
    // steps
    // 1. get all inputs
    // 2. pass them into the function
    // 3. construct table name and create link
    console.log(questions, inputTypes, formName, formDescription);

    try {
      await createForm(questions, inputTypes, formName, formDescription);
      console.log(questions, inputTypes, formName, formDescription);
      toast.success("Form created Successfuly");
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error);
    }

  };

  return (
    <div className="card lg:card-side bg-white border-[2px] border-[#f2dbd0] ml-12 mr-12 rounded-2xl dark:bg-gray-700">
        <div className='card-body px-12 py-8'>
            <form onSubmit={handleSubmit} className='relative mx-12 my-8'>
            <div className='relative grid grid-rows-2 gap-2'>
            <label className='text-lg text-[#0070f3]'>
              Form Name
            </label>
              <input
                className="border border-gray-300 rounded p-1 bg-gray-500 text-white"
                type="text"
                value={formName}
                onChange={(e) => handleFormNameValueChange(e.target.value)}
              />
            <label className='text-lg text-[#0070f3]'>
              Form Description
            </label>
              <input
                className="border border-gray-300 rounded p-1 bg-gray-500 text-white"
                type="text"
                value={formDescription}
                onChange={(e) => handleFormDescriptionValueChange(e.target.value)}
              />
            </div>
            {questions.map((questionValue, index) => (
              <div className='form-control relative grid grid-rows-2 gap-2'>
              <label className='text-lg text-[#0070f3]'>
                {"question" + (index + 1)}
              </label>
              <input
                className="border border-gray-300 rounded p-1 bg-gray-500 text-white"
                key={index}
                type="text"
                value={questionValue}
                onChange={(e) => handleQuestionValueChange(index, e.target.value)}
              />
              <label className='text-lg text-[#0070f3]'>
                response type
              </label>
              <select className="border border-gray-300 rounded p-1 bg-gray-500 text-white" value= '' onChange = {(e) => handleInputTypeValueChange(index, e.target.value)}>
              <option value= '_text'>
                select type
                </option>
                <option value= 'text'>
                  text
                </option>
                <option value= 'number'>
                  number
                </option>
                <option value= 'file'>
                  file
                </option>
              </select>
            </div>
            ))}
            <div style={{ display: 'flex', gap: '300px' }}>
              <button
                type='button'
                onClick={addQuestion}
                className="relative inline-block px-4 py-2 font-medium group"
              >
              <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#0070f3] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#0070f3]"></span>
              <span className="relative text-black">Add Question ➕</span>
              </button>
              <button
                type='submit'
                className="relative inline-block px-4 py-2 font-medium group"
              >
              <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#0070f3] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#0070f3]"></span>
              <span className="relative text-black">Create Form</span>
              </button>
            </div>
            </form>
        </div>
    </div>
  );
}

export default MyForm;