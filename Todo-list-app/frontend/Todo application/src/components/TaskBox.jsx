import React from 'react';

const TaskBox = ({todos_title, onCheckClick}) => {
  return (
    <div className='flex justify-start gap-3 align-baseline p-2 '>
       <input type="checkbox" onClick={onCheckClick} className='cursor-pointer'/> 
      <div className="  text-left border-b-2 p-1 w-48  border-gray-200">{todos_title}
        
      
      </div>
    </div>
  );
}

export default TaskBox;
