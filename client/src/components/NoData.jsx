import React from 'react'
import noDataImage from '../assets/nothing here yet.webp'

const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4 gap-2'>
      <img
        src={noDataImage}
        alt='No data available'
        className='w-36 max-w-full' 
      />
      <p className='text-neutral-500 text-lg font-medium'>No Data Available</p>
    </div>
  )
}

export default NoData
