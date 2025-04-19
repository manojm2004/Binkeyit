import React, { useEffect, useState, useMemo } from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data }) => {
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const [qtyUpdating, setQtyUpdating] = useState(false);
    const cartItem = useSelector(state => state.cartItem.cart);

    const cartItemDetails = useMemo(() => cartItem.find(item => item.productId._id === data._id), [cartItem, data]);

    const isAvailableCart = Boolean(cartItemDetails);
    const qty = cartItemDetails?.quantity || 0;

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);

        try {
            const response = await Axios({
                ...SummaryApi.addTocart,
                data: { productId: data?._id }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                fetchCartItem?.();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (newQty) => {
        if (!cartItemDetails) return;
        setQtyUpdating(true);

        try {
            if (newQty === 0) {
                await deleteCartItem(cartItemDetails._id);
            } else {
                const response = await updateCartItem(cartItemDetails._id, newQty);
                if (response.success) {
                    toast.success(newQty > qty ? "Item added" : "Item removed");
                }
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setQtyUpdating(false);
        }
    };

    return (
        <div className='w-full max-w-[150px]'>
            {isAvailableCart ? (
                <div className='flex w-full h-full'>
                    <button 
                        onClick={(e) => { e.preventDefault(); updateQuantity(qty - 1); }} 
                        disabled={qtyUpdating} 
                        className={`flex-1 p-1 rounded flex items-center justify-center ${qtyUpdating ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
                        aria-label="Decrease quantity"
                    >
                        {qtyUpdating ? <Loading /> : <FaMinus />}
                    </button>

                    <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p>

                    <button 
                        onClick={(e) => { e.preventDefault(); updateQuantity(qty + 1); }} 
                        disabled={qtyUpdating} 
                        className={`flex-1 p-1 rounded flex items-center justify-center ${qtyUpdating ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
                        aria-label="Increase quantity"
                    >
                        {qtyUpdating ? <Loading /> : <FaPlus />}
                    </button>
                </div>
            ) : (
                <button 
                    onClick={handleAddToCart} 
                    className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded w-full' 
                    disabled={loading}
                    aria-label="Add to cart"
                >
                    {loading ? <Loading /> : "Add"}
                </button>
            )}
        </div>
    );
};

export default AddToCartButton;
