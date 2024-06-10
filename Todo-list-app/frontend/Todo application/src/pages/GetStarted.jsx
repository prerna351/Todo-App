import React from 'react';
import { Link } from "react-router-dom"

const GetStarted = () => {
  return (
    <div className=" h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded border-slate-950 border-2 bg-white w-full lg:w-72 text-center p-10 lg:h-max px-4">
            <div className=' flex flex-col justify-center items-center w-60 '>
                <div>
                <img src="\illustration 1.svg" alt="illustration" className='w-60' />
                </div>

                <Link to="/signup" className="ml-2 text-center w-60 text-white bg-gray-800 hover:bg-gray-950 focus:outline-none font-medium         rounded-full text-sm px-5 py-2.5 mt-10 me-2 mb-10 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Get Started
                </Link>
            </div>
        </div>
     </div>
    </div>
    
  );
}



export default GetStarted;
