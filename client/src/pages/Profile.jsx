import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUserDetails(response.data.updatedUser)); // Directly updating Redux state
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      {/* Profile Image Section */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-full overflow-hidden shadow-md">
          {user?.avatar ? (
            <img alt="User Avatar" src={user.avatar} className="w-full h-full object-cover" />
          ) : (
            <FaRegUserCircle size={75} className="text-gray-500" />
          )}
        </div>
        <button
          onClick={() => setProfileAvatarEdit(true)}
          className="mt-3 px-4 py-2 text-sm font-semibold border border-primary-100 hover:border-primary-200 hover:bg-primary-200 rounded-full transition"
          aria-label="Edit Profile Picture"
        >
          Edit
        </button>
      </div>

      {/* Avatar Edit Modal */}
      {openProfileAvatarEdit && <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />}

      {/* User Details Form */}
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="font-semibold">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 bg-gray-100 border rounded focus:border-primary-200 outline-none"
            value={userData.name}
            name="name"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 bg-gray-100 border rounded focus:border-primary-200 outline-none"
            value={userData.email}
            name="email"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Mobile</label>
          <input
            type="text"
            placeholder="Enter your mobile"
            className="p-2 bg-gray-100 border rounded focus:border-primary-200 outline-none"
            value={userData.mobile}
            name="mobile"
            onChange={handleOnChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-primary-200 hover:bg-primary-300 rounded transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
