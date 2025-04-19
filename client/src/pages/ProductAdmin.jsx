import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import Loading from '../components/Loading';
import ProductCardAdmin from '../components/ProductCardAdmin';
import { IoSearchOutline } from "react-icons/io5";
import EditProductAdmin from '../components/EditProductAdmin';
import { debounce } from 'lodash';

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage);
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  // Debounced search handler
  const handleSearchChange = debounce((e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 on search change
  }, 500); // 500ms delay

  // Handlers for pagination buttons
  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <section className="p-4">
      <div className="p-2 bg-white shadow-md flex items-center justify-between gap-4">
        <h2 className="font-semibold">Products</h2>
        <div className="h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded border focus-within:border-primary-200">
          <IoSearchOutline size={25} />
          <input
            type="text"
            placeholder="Search products here..."
            className="h-full w-full outline-none bg-transparent"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {loading && <Loading />}

      <div className="p-4 bg-blue-50">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {productData.length > 0 ? (
              productData.map((product) => (
                <ProductCardAdmin key={product._id} data={product} fetchProductData={fetchProductData} />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>

        <div className="flex justify-between my-4">
          <button
            onClick={handlePrevious}
            className={`border border-primary-200 px-4 py-1 hover:bg-primary-200 ${page === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={page === 1}
          >
            Previous
          </button>
          <button className="w-full bg-slate-100 text-center">
            {page}/{totalPageCount}
          </button>
          <button
            onClick={handleNext}
            className={`border border-primary-200 px-4 py-1 hover:bg-primary-200 ${page === totalPageCount ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={page === totalPageCount}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductAdmin;
