import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoClose } from "react-icons/io5"
import { useGlobalContext } from '../provider/GlobalProvider'

const EditAddressDetails = ({ close, data }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      _id: data._id,
      userId: data.userId,
      address_line: data.address_line,
      city: data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
      mobile: data.mobile,
    }
  })
  
  const { fetchAddress } = useGlobalContext()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (formData) => {
    setLoading(true)

    try {
      const response = await Axios({
        ...SummaryApi.updateAddress,
        data: { ...formData }
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        if (close) {
          close()
          reset()
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-screen overflow-auto'>
      <div className='bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded'>
        <div className='flex justify-between items-center gap-4'>
          <h2 className='font-semibold'>Edit Address</h2>
          <button onClick={close} className='hover:text-red-500'>
            <IoClose size={25} />
          </button>
        </div>
        <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-1'>
            <label htmlFor='addressline'>Address Line :</label>
            <input
              type='text'
              id='addressline'
              className={`border ${errors.address_line ? 'border-red-500' : 'bg-blue-50'} p-2 rounded`}
              {...register("address_line", { required: "Address Line is required" })}
            />
            {errors.address_line && <span className="text-red-500 text-sm">{errors.address_line.message}</span>}
          </div>

          <div className='grid gap-1'>
            <label htmlFor='city'>City :</label>
            <input
              type='text'
              id='city'
              className={`border ${errors.city ? 'border-red-500' : 'bg-blue-50'} p-2 rounded`}
              {...register("city", { required: "City is required" })}
            />
            {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
          </div>

          <div className='grid gap-1'>
            <label htmlFor='state'>State :</label>
            <input
              type='text'
              id='state'
              className={`border ${errors.state ? 'border-red-500' : 'bg-blue-50'} p-2 rounded`}
              {...register("state", { required: "State is required" })}
            />
            {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
          </div>

          <div className='grid gap-1'>
            <label htmlFor='pincode'>Pincode :</label>
            <input
              type='text'
              id='pincode'
              className={`border ${errors.pincode ? 'border-red-500' : 'bg-blue-50'} p-2 rounded`}
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Pincode must be a 6-digit number",
                }
              })}
            />
            {errors.pincode && <span className="text-red-500 text-sm">{errors.pincode.message}</span>}
          </div>

          <div className='grid gap-1'>
            <label htmlFor='country'>Country :</label>
            <input
              type='text'
              id='country'
              className={`border ${errors.country ? 'border-red-500' : 'bg-blue-50'} p-2 rounded`}
              {...register("country", { required: "Country is required" })}
            />
            {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
          </div>

          <div className='grid gap-1'>
            <label htmlFor='mobile'>Mobile No. :</label>
            <input
              type='text'
              id='mobile'
              className={`border ${errors.mobile ? 'border-red-500' : 'bg-blue-50'} p-2 rounded`}
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Mobile number must be 10 digits",
                }
              })}
            />
            {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile.message}</span>}
          </div>

          <button
            type='submit'
            className='bg-primary-200 w-full py-2 font-semibold mt-4 hover:bg-primary-100'
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default EditAddressDetails
