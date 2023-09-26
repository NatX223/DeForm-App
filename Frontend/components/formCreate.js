import React, { useState } from 'react';
import toast from "react-hot-toast";
import { _createForm, createForm, getUser, getUserAddress, shortenUrl } from '../utils/app';


function MyForm() {
  const [questions, setquestions] = useState([]);
  const [inputTypes, setInputType] = useState([]);
  const [formName, setFormName] = useState(
    'form Name'
  );

  const [formLink, setFormLink] = useState();

  const [formDescription, setFormDescription] = useState(
    'form Description'
  );

  const [formFee, setFormFee] = useState(
    0
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

  const handleFeeValueChange = (value) => {
    setFormFee(value);
  };

  const handleFormNameValueChange = (value) => {
    setFormName(value);
  };

  const handleFormDescriptionValueChange = (value) => {
    setFormDescription(value);
  };

  const copyToClipboard = (text) => {
    if (!navigator.clipboard) {
      // Clipboard API not supported, fallback to old method
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return;
    }
  
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("You copied your link");
      })
      .catch(err => {
        console.error('Unable to copy text: ', err);
      });
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 3. construct table name and create link
    try {
      const _formName = await createForm(questions, inputTypes, formName, formDescription, formFee);
      console.log(questions, inputTypes, formName, formDescription);
      toast.success(`${formName} was created Successfuly`);

      const link = `${window.location.href}/Form?name=${_formName}`;
      const updated = link.replace('/createForm/', '/');
      const shortLink = await shortenUrl(updated);
      setFormLink(shortLink);
      
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
            <label className='text-lg text-[#0070f3]'>
              Form Fee
            </label>
              <input
                className="border border-gray-300 rounded p-1 bg-gray-500 text-white"
                type="number"
                value={formFee}
                onChange={(e) => handleFeeValueChange(e.target.value)}
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
            <div style={{ display: 'flex', gap: '100px' }}>
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
              <button
                type='button'
                onClick={() => copyToClipboard(formLink)}
                className="relative inline-block px-4 py-2 font-medium group"
              >
              <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#0070f3] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#0070f3]"></span>
              <span className="relative text-black">Copy Link</span>
              </button>
            </div>
            </form>
        </div>
    </div>
  );
}

export default MyForm;