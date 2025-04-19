import React, { useState } from 'react';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { Link } from 'react-router-dom';
import { valideURLConvert } from '../utils/valideURLConvert';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import AddToCartButton from './AddToCartButton';

const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data?.name)}-${data?._id}`;
  const [imgError, setImgError] = useState(false);
  const isOutOfStock = data?.stock === 0;

  return (
    <div className={`border py-2 lg:p-4 grid gap-2 lg:gap-4 min-w-36 lg:min-w-52 rounded-lg bg-white shadow-sm transition-shadow ${isOutOfStock ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md cursor-pointer'}`}>
      
      {/* Product Image */}
      <div className="h-24 lg:h-32 w-full rounded overflow-hidden bg-gray-100">
        <img 
          src={imgError ? '/placeholder.jpg' : data?.image?.[0]} 
          alt={data?.name} 
          className="w-full h-full object-cover" 
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Delivery & Discount */}
      <div className="flex items-center gap-2 px-2">
        <div className="rounded text-xs w-fit p-1 px-2 text-green-600 bg-green-50">
          10 min
        </div>
        {Boolean(data?.discount) && (
          <p className="text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full">
            {data?.discount}% off
          </p>
        )}
      </div>

      {/* Product Name */}
      <div className="px-2 font-medium text-sm lg:text-base line-clamp-2">
        {data?.name}
      </div>

      {/* Product Unit */}
      <div className="w-fit px-2 text-sm lg:text-base text-gray-500">
        {data?.unit}
      </div>

      {/* Price & Cart Button */}
      <div className="px-2 flex items-center justify-between text-sm lg:text-base">
        <div className="flex items-center gap-1 font-semibold">
          {DisplayPriceInRupees(pricewithDiscount(data?.price, data?.discount))} 
        </div>
        
        <div>
          {isOutOfStock ? (
            <p className="text-red-500 text-sm text-center">Out of stock</p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>
      </div>

      {/* Clickable Link (Disabled if Out of Stock) */}
      {!isOutOfStock && (
        <Link to={url} className="absolute inset-0"></Link>
      )}
      
    </div>
  );
};

export default CardProduct;
