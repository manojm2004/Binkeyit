import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch product data
  const fetchProductData = async () => {
    setLoading(true);
    setError(null); // Reset previous error
    try {
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: { page: page },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setProductData(responseData.data);
      } else {
        setError("Failed to fetch products.");
      }
    } catch (error) {
      setError("Failed to fetch products.");
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when page changes
  useEffect(() => {
    fetchProductData();
  }, [page]); // Added page as dependency to refetch when it changes

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md p-4 font-semibold text-lg rounded-md mb-4">
        <h1>Products</h1>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {productData.length === 0 ? (
          <p>No products found.</p>
        ) : (
          productData.map((product, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-md"
              />
              <p className="text-lg font-medium">{product.name}</p>
              <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="mx-2">{page}</span>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
