import React from 'react';

const Heading = ({label}) => {
  return (
    <div className='text-left font-bold pt-4 w-full'>
      <h3 className='text-xl'>{label}</h3>
    </div>
  );
}

export default Heading;
