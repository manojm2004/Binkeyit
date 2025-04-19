import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NoData from '../components/NoData';
import Loading from '../components/Loading';

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulate loading state
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md p-4 font-semibold text-lg rounded-md mb-4">
        <h1>My Orders</h1>
      </div>

      {loading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <NoData message="You haven't placed any orders yet!" />
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Shop Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={order._id + index} className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">Order No: <span className="font-medium">{order?.orderId}</span></p>

              <div className="flex items-center gap-4 mt-2">
                <img
                  src={order.product_details.image[0]}
                  className="w-20 h-20 object-cover rounded-md"
                  alt={order.product_details.name}
                />
                <div className="flex-1">
                  <p className="text-lg font-medium">{order.product_details.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                  <p className="text-sm text-gray-600">Total: ₹{order.totalPrice}</p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    order.status === 'Delivered'
                      ? 'bg-green-100 text-green-600'
                      : order.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
