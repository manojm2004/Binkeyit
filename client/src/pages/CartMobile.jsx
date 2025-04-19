import React from 'react';
import DisplayCartItem from '../components/DisplayCartItem';

const CartMobile = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        {/* Cart Heading */}
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        
        {/* Display Cart Items */}
        <DisplayCartItem />
      </div>
    </div>
  );
};

export default CartMobile;
