import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from "react-icons/fa"
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from '../assets/empty_cart.webp'
import toast from 'react-hot-toast'

const DisplayCartItem = ({ close }) => {
    const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const redirectToCheckoutPage = () => {
        if (user?._id) {
            navigate("/checkout")
            if (close) close()
            return
        }
        toast("Please Login")
    }

    return (
        <section className='bg-neutral-900 fixed inset-0 bg-opacity-70 z-50 flex justify-end'>
            <div className='bg-white w-full max-w-sm min-h-screen flex flex-col'>
                {/* Header */}
                <div className='flex items-center p-4 shadow-md justify-between'>
                    <h2 className='font-semibold'>Cart</h2>
                    <button onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className='flex-1 p-2 bg-blue-50 overflow-auto'>
                    {cartItem.length > 0 ? (
                        <>
                            <div className='flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full'>
                                <p>Your total savings</p>
                                <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
                            </div>

                            <div className='bg-white rounded-lg p-4 grid gap-5'>
                                {cartItem.map((item) => (
                                    <div key={item?._id + "cartItemDisplay"} className='flex gap-4'>
                                        <div className='w-16 h-16 bg-red-500 border rounded flex items-center justify-center overflow-hidden'>
                                            <img src={item?.productId?.image[0]} className='w-full h-full object-contain' />
                                        </div>
                                        <div className='flex-1 text-xs'>
                                            <p className='line-clamp-2'>{item?.productId?.name}</p>
                                            <p className='text-neutral-400'>{item?.productId?.unit}</p>
                                            <p className='font-semibold'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                        </div>
                                        <AddToCartButton data={item?.productId} />
                                    </div>
                                ))}
                            </div>

                            {/* Bill Details */}
                            <div className='bg-white p-4 rounded-lg shadow-sm'>
                                <h3 className='font-semibold mb-2'>Bill details</h3>
                                <div className='flex justify-between text-sm'>
                                    <p>Items total</p>
                                    <p className='flex gap-2'>
                                        <span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                                        <span>{DisplayPriceInRupees(totalPrice)}</span>
                                    </p>
                                </div>
                                <div className='flex justify-between text-sm'>
                                    <p>Quantity total</p>
                                    <p>{totalQty} item(s)</p>
                                </div>
                                <div className='flex justify-between text-sm'>
                                    <p>Delivery Charge</p>
                                    <p>Free</p>
                                </div>
                                <div className='font-semibold flex justify-between'>
                                    <p>Grand total</p>
                                    <p>{DisplayPriceInRupees(totalPrice)}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='bg-white flex flex-col items-center p-4'>
                            <img src={imageEmpty} className='w-40 h-40 object-contain' />
                            <Link onClick={close} to={"/"} className='bg-green-600 px-4 py-2 text-white rounded mt-4'>
                                Shop Now
                            </Link>
                        </div>
                    )}
                </div>

                {/* Footer - Checkout Button */}
                {cartItem.length > 0 && (
                    <div className='p-2'>
                        <div className='bg-green-700 text-neutral-100 px-4 py-4 rounded flex justify-between items-center'>
                            <span>{DisplayPriceInRupees(totalPrice)}</span>
                            <button onClick={redirectToCheckoutPage} className='flex items-center gap-1'>
                                Proceed <FaCaretRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default DisplayCartItem
