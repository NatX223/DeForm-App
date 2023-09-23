import ResponseField from "./responseInput";

function FormResponse(form) {
  // const formQuestions = [
  //   { question: 'What is your name?', inputType: 'text' },
  //   { question: 'What is your age?', inputType: 'number' },
  //   { question: 'Where are you from?', inputType: 'text' },
  //   { question: 'What is your favorite color?', inputType: 'text' },
  // ];
  const formQuestions = form[0];
  const formDetails = form[1];

  // const formDetails = ['Form Name', 'Form Description'];

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