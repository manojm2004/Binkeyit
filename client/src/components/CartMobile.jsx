import React from 'react';
import { useSelector } from 'react-redux';
import { FaCartShopping } from 'react-icons/fa6';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { Link } from 'react-router-dom';
import { FaCaretRight } from "react-icons/fa";

const CartMobileLink = () => {
    // Get cart details from Redux
    const cart = useSelector(state => state.cartItem.cart);
    const totalQty = useSelector(state => state.cartItem.totalQty);
    const totalPrice = useSelector(state => state.cartItem.totalPrice);

    return (
        <>
            {Boolean(cart?.length) && (
                <div className="fixed bottom-4 left-0 right-0 p-3 z-60 flex justify-center">
                    <div className="bg-green-600 px-3 py-2 rounded-lg text-white text-sm flex items-center justify-between gap-4 w-full max-w-md shadow-md">
                        {/* Cart Details */}
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500 rounded-md">
                                <FaCartShopping size={18} />
                            </div>
                            <div className="text-xs">
                                <p>{totalQty} item(s)</p>
                                <p className="font-medium">{DisplayPriceInRupees(totalPrice)}</p>
                            </div>
                        </div>

                        {/* View Cart Button */}
                        <Link to="/cart" className="flex items-center gap-1 hover:underline">
                            <span className="text-sm font-medium">View Cart</span>
                            <FaCaretRight />
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartMobileLink;
