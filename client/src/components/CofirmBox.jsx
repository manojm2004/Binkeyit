import React from 'react'
import { IoClose } from "react-icons/io5";

const CofirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className='fixed inset-0 z-50 bg-neutral-800 bg-opacity-70 flex justify-center items-center p-4'>
      <div className='bg-white w-full max-w-md p-5 rounded-lg shadow-lg'>
        {/* Header */}
        <div className='flex justify-between items-center mb-4'>
          <h1 className='font-semibold text-lg'>Permanent Delete</h1>
          <button onClick={close} aria-label="Close">
            <IoClose size={25} className='text-gray-600 hover:text-gray-900' />
          </button>
        </div>

        {/* Message */}
        <p className='text-gray-700 mb-6'>Are you sure permanent delete ?</p>

        {/* Buttons */}
        <div className='flex justify-end gap-3'>
          <button 
            onClick={cancel} 
            className='px-4 py-2 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition'
          >
            Cancel
          </button>
          <button 
            onClick={confirm} 
            className='px-4 py-2 border rounded border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default CofirmBox
