import ResponseField from "./responseInput";

function FormResponse() {
  const formQuestions = [
    { question: 'What is your name?', inputType: 'text' },
    { question: 'What is your age?', inputType: 'number' },
    { question: 'Where are you from?', inputType: 'text' },
    { question: 'What is your favorite color?', inputType: 'text' },
  ];

  return (
    <div className="card lg:card-side bg-white border-[2px] border-[#f2dbd0] ml-24 mr-24 rounded-2xl dark:bg-gray-700">
        <div className='card-body px-8 py-8'>
            <div className='relative grid grid-rows-2 gap-2'>
            <h2 className='text-lg text-[#0070f3]'>
              Form Name
            </h2>
            <p className='text-lg text-[#0070f3]'>
              Form Description
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