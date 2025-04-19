import React, { useState, useEffect } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';
import SummaryApi from '../common/SummaryApi';

const EditProductAdmin = ({ close, data: propsData, fetchProductData }) => {
  const [data, setData] = useState({
    _id: propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subCategory: propsData.subCategory,
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
  });
  
  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState('');
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState('');
  const [selectSubCategory, setSelectSubCategory] = useState('');
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState('');

  useEffect(() => {
    if (propsData) {
      setData({
        _id: propsData._id,
        name: propsData.name,
        image: propsData.image,
        category: propsData.category,
        subCategory: propsData.subCategory,
        unit: propsData.unit,
        stock: propsData.stock,
        price: propsData.price,
        discount: propsData.discount,
        description: propsData.description,
        more_details: propsData.more_details || {},
      });
    }
  }, [propsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;

    setData((prev) => ({
      ...prev,
      image: [...prev.image, imageUrl],
    }));
    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    const newImages = [...data.image];
    newImages.splice(index, 1);
    setData((prev) => ({
      ...prev,
      image: newImages,
    }));
  };

  const handleRemoveCategory = (index) => {
    const newCategories = [...data.category];
    newCategories.splice(index, 1);
    setData((prev) => ({
      ...prev,
      category: newCategories,
    }));
  };

  const handleRemoveSubCategory = (index) => {
    const newSubCategories = [...data.subCategory];
    newSubCategories.splice(index, 1);
    setData((prev) => ({
      ...prev,
      subCategory: newSubCategories,
    }));
  };

  const handleAddField = () => {
    setData((prev) => ({
      ...prev,
      more_details: {
        ...prev.more_details,
        [fieldName]: '',
      },
    }));
    setFieldName('');
    setOpenAddField(false);
  };

  const validateForm = () => {
    if (!data.name || !data.description || data.price <= 0 || data.stock <= 0) {
      alert('Please fill in all required fields with valid values.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await Axios({
        ...SummaryApi.updateProductDetails,
        data: data,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        if (close) {
          close();
        }
        fetchProductData();
        setData({
          name: '',
          image: [],
          category: [],
          subCategory: [],
          unit: '',
          stock: '',
          price: '',
          discount: '',
          description: '',
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className='fixed top-0 right-0 left-0 bottom-0 bg-black z-50 bg-opacity-70 p-4'>
      <div className='bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto h-full max-h-[95vh]'>
        <section>
          <div className='p-2 bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Upload Product</h2>
            <button onClick={close}>
              <IoClose size={20} />
            </button>
          </div>
          <div className='grid p-3'>
            <form className='grid gap-4' onSubmit={handleSubmit}>
              <div className='grid gap-1'>
                <label htmlFor='name' className='font-medium'>
                  Name
                </label>
                <input
                  id='name'
                  type='text'
                  placeholder='Enter product name'
                  name='name'
                  value={data.name}
                  onChange={handleChange}
                  required
                  className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                />
              </div>
              <div className='grid gap-1'>
                <label htmlFor='description' className='font-medium'>
                  Description
                </label>
                <textarea
                  id='description'
                  placeholder='Enter product description'
                  name='description'
                  value={data.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
                />
              </div>

              <div>
                <p className='font-medium'>Image</p>
                <div>
                  <label
                    htmlFor='productImage'
                    className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'
                  >
                    <div className='text-center flex justify-center items-center flex-col'>
                      {imageLoading ? (
                        <Loading />
                      ) : (
                        <>
                          <FaCloudUploadAlt size={35} />
                          <p>Upload Image</p>
                        </>
                      )}
                    </div>
                    <input
                      type='file'
                      id='productImage'
                      className='hidden'
                      accept='image/*'
                      onChange={handleUploadImage}
                    />
                  </label>
                  <div className='flex flex-wrap gap-4'>
                    {data.image.map((img, index) => (
                      <div
                        key={img + index}
                        className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'
                      >
                        <img
                          src={img}
                          alt={img}
                          className='w-full h-full object-scale-down cursor-pointer'
                          onClick={() => setViewImageURL(img)}
                        />
                        <div
                          onClick={() => handleDeleteImage(index)}
                          className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'
                        >
                          <MdDelete />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className='grid gap-1'>
                <label className='font-medium'>Category</label>
                <div>
                  <select
                    className='bg-blue-50 border w-full p-2 rounded'
                    value={selectCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      const category = allCategory.find((el) => el._id === value);

                      setData((prev) => ({
                        ...prev,
                        category: [...prev.category, category],
                      }));
                      setSelectCategory('');
                    }}
                  >
                    <option value={''}>Select Category</option>
                    {allCategory.map((c) => (
                      <option value={c._id} key={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <div className='flex flex-wrap gap-3'>
                    {data.category.map((c, index) => (
                      <div key={c._id + index + 'productsection'} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div
                          className='hover:text-red-500 cursor-pointer'
                          onClick={() => handleRemoveCategory(index)}
                        >
                          <IoClose size={20} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className='grid gap-1'>
                <label className='font-medium'>Sub Category</label>
                <div>
                  <select
                    className='bg-blue-50 border w-full p-2 rounded'
                    value={selectSubCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      const subCategory = allSubCategory.find((el) => el._id === value);

                      setData((prev) => ({
                        ...prev,
                        subCategory: [...prev.subCategory, subCategory],
                      }));
                      setSelectSubCategory('');
                    }}
                  >
                    <option value={''} className='text-neutral-600'>
                      Select Sub Category
                    </option>
                    {allSubCategory.map((c) => (
                      <option value={c._id} key={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <div className='flex flex-wrap gap-3'>
                    {data.subCategory.map((c, index) => (
                      <div key={c._id + index + 'productsection'} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div
                          className='hover:text-red-500 cursor-pointer'
                          onClick={() => handleRemoveSubCategory(index)}
                        >
                          <IoClose size={20} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className='grid gap-1'>
                <label htmlFor='unit' className='font-medium'>
                  Unit
                </label>
                <input
                  id='unit'
                  type='text'
                  placeholder='Enter product unit'
                  name='unit'
                  value={data.unit}
                  onChange={handleChange}
                  required
                  className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                />
              </div>

              <div className='grid gap-1'>
                <label htmlFor='stock' className='font-medium'>
                  Number of Stock
                </label>
                <input
                  id='stock'
                  type='number'
                  placeholder='Enter product stock'
                  name='stock'
                  value={data.stock}
                  onChange={handleChange}
                  required
                  className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                />
              </div>

              <div className='grid gap-1'>
                <label htmlFor='price' className='font-medium'>
                  Price
                </label>
                <input
                  id='price'
                  type='number'
                  placeholder='Enter product price'
                  name='price'
                  value={data.price}
                  onChange={handleChange}
                  required
                  className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                />
              </div>

              <div className='grid gap-1'>
                <label htmlFor='discount' className='font-medium'>
                  Discount (%)
                </label>
                <input
                  id='discount'
                  type='number'
                  placeholder='Enter discount percentage'
                  name='discount'
                  value={data.discount}
                  onChange={handleChange}
                  className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                />
              </div>

              <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
                Update Product
              </button>
            </form>
          </div>
        </section>
      </div>
    </section>
  );
};

export default EditProductAdmin;
