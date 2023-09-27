import React, { useState } from 'react';
import { storeFiles, submitForm } from '../utils/app';
import toast from 'react-hot-toast';

function ResponseField({ formQuestions }) {

const [formData, setFormData] = useState([]);

const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(value);
    setFormData({
    ...formData,
    value,
    });
};

const  handleFileInputChange = async  (e) => {
  const selectedFile = e.target.files;
  const cid = await storeFiles(selectedFile);
  console.log(cid);
  setFormData({
    ...formData,
    cid
  })
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataArray = Object.entries(formData).map(([key, value]) => ({ question: key, answer: value }));
      console.log(formData, formDataArray);
      const searchParams = new URLSearchParams(window.location.search);
      const formName = searchParams.get('formName');  
      await submitForm(formName, formDataArray);
      toast.success("Form submitted successfully");
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {formQuestions.map((questionObj, index) => (
        <div key={index} className="mb-4"> {/* Add margin-bottom for spacing */}
          <label className='text-lg text-[#0070f3]' style={{ marginBottom: '8px' }}>
            {questionObj.question}
          </label> <br />
          {questionObj.inputType === 'file' ? (
      <input
        className="border border-gray-300 rounded p-1 bg-gray-500 text-white"
        type="file"
        name={`${index}`}
        onChange={handleFileInputChange}
      />
    ) : (
      <input
        className="border border-gray-300 rounded p-1 bg-gray-500 text-white"
        type={questionObj.inputType}
        name={`${index}`}
        onChange={handleInputChange}
      />
    )}
        </div>
      ))}
      <button
        type="submit"
        className="relative inline-block px-4 py-2 font-medium group"
        style={{ marginTop: '16px' }}
      >
        <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#0070f3] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#0070f3]"></span>
        <span className="relative text-black">Submit Form</span>
      </button>
    </form>
  );
  
  
}

export default ResponseField;