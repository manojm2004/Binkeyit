import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddAddress from '../components/AddAddress';
import { MdDelete, MdEdit } from 'react-icons/md';
import EditAddressDetails from '../components/EditAddressDetails';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';

const Address = () => {
    const addressList = useSelector(state => state.addresses.addressList);
    const [openAddress, setOpenAddress] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({});
    const [loading, setLoading] = useState(false);
    const { fetchAddress } = useGlobalContext();

    const handleDisableAddress = async (id) => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.disableAddress,
                data: { _id: id }
            });
            if (response.data.success) {
                toast.success("Address removed successfully");
                fetchAddress();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md p-4 flex justify-between items-center rounded-lg">
                <h2 className="font-semibold text-lg">My Addresses</h2>
                <button onClick={() => setOpenAddress(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition">
                    + Add Address
                </button>
            </div>

            <div className="mt-4 grid gap-4">
                {addressList.length > 0 ? (
                    addressList.map((address) => (
                        <div key={address._id} className={`border rounded-lg p-4 flex justify-between items-center bg-white shadow-sm transition ${!address.status && 'hidden'}`}>
                            <div>
                                <p className="font-semibold">{address.address_line}</p>
                                <p>{address.city}, {address.state}</p>
                                <p>{address.country} - {address.pincode}</p>
                                <p className="text-gray-600">📞 {address.mobile}</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setOpenEdit(true);
                                        setEditData(address);
                                    }}
                                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
                                >
                                    <MdEdit size={20} />
                                </button>
                                <button
                                    onClick={() => handleDisableAddress(address._id)}
                                    className={`bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition disabled:bg-gray-400 ${loading && 'opacity-50 cursor-not-allowed'}`}
                                    disabled={loading}
                                >
                                    <MdDelete size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-600 mt-4">
                        <p>No addresses found. Add a new address.</p>
                        <button
                            onClick={() => setOpenAddress(true)}
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
                        >
                            Add Address
                        </button>
                    </div>
                )}
            </div>

            {/* Add Address Modal */}
            {openAddress && <AddAddress close={() => setOpenAddress(false)} />}

            {/* Edit Address Modal */}
            {openEdit && <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />}
        </div>
    );
};

export default Address;
