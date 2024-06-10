import React from 'react';

const AddTaskButton = ({label, onClick}) => {
  return (
    <div className='p-2'>
       <button onClick={onClick} type="button" className=" flex justify-center text-gray-900 w-full border-2 hover:text-white border-gray-900 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded text-sm px-5 py-1.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">{label}</button>
    </div>
  );
}

export default AddTaskButton;
