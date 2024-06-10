import React from 'react';

const InputBox = ({placeholder, onChange}) => {
  return (
    <div >
      <input className='border-gray-950 border-2 p-2 rounded mb-4 w-full' onChange={onChange} type="text" placeholder={placeholder}  />
    </div>
  );
}

export default InputBox;
