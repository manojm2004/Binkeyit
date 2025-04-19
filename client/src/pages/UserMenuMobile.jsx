import React from 'react';
import { IoClose } from "react-icons/io5";
import UserMenu from '../components/UserMenu';

const UserMenuMobile = ({ close }) => {
  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      {/* Animated Menu Container */}
      <div className="bg-white h-full w-80 max-w-full py-4 shadow-lg rounded-lg transform transition-all duration-300">
        {/* Close Button */}
        <button onClick={close} className="text-neutral-800 block w-fit ml-auto mr-4 hover:text-red-500 transition">
          <IoClose size={25} />
        </button>

        {/* User Menu */}
        <div className="container mx-auto px-4 pb-8">
          <UserMenu />
        </div>
      </div>
    </section>
  );
};

export default UserMenuMobile;
