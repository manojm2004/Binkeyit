import React, { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import logo from '../assets/logo.png';
import Search from './Search';
import UserMenu from './UserMenu';
import DisplayCartItem from './DisplayCartItem';
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import useMobile from '../hooks/useMobile';

const Header = () => {
    const [isMobile] = useMobile();
    const location = useLocation();
    const navigate = useNavigate();
    const isSearchPage = location.pathname === "/search";

    const user = useSelector(state => state?.user);
    const cartItems = useSelector(state => state.cartItem.cart);
    const { totalPrice, totalQty } = useGlobalContext();

    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [openCartSection, setOpenCartSection] = useState(false);

    const handleUserClick = useCallback(() => {
        if (!user?._id) navigate("/login");
        else navigate("/user");
    }, [user, navigate]);

    return (
        <header className="h-24 lg:h-20 shadow-md sticky top-0 z-40 flex flex-col justify-center bg-white">
            {!isSearchPage || !isMobile ? (
                <div className="container mx-auto flex items-center px-4 justify-between">
                    
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img 
                            src={logo}
                            alt="Binkeyit Logo"
                            width={150} 
                            height={60} 
                            className="hidden lg:block"
                        />
                        <img 
                            src={logo} 
                            alt="Binkeyit Logo"
                            width={120} 
                            height={60} 
                            className="lg:hidden"
                        />
                    </Link>

                    {/* Search (Only Desktop) */}
                    <div className="hidden lg:block">
                        <Search />
                    </div>

                    {/* User & Cart */}
                    <div className="flex items-center gap-6">

                        {/* Mobile User Icon */}
                        <button 
                            className="text-neutral-600 lg:hidden" 
                            onClick={handleUserClick}
                            aria-label={user?._id ? "Go to user profile" : "Login"}
                        >
                            <FaRegCircleUser size={26} />
                        </button>

                        {/* Desktop User Menu */}
                        <div className="hidden lg:flex items-center gap-6">
                            {user?._id ? (
                                <div className="relative">
                                    <button 
                                        className="flex items-center gap-1 cursor-pointer text-neutral-800 hover:text-green-700 transition"
                                        onClick={() => setOpenUserMenu(prev => !prev)}
                                        aria-expanded={openUserMenu ? "true" : "false"}
                                        aria-controls="user-menu"
                                    >
                                        <p className="font-medium">Account</p>
                                        {openUserMenu ? <GoTriangleUp size={18} /> : <GoTriangleDown size={18} />}
                                    </button>

                                    {openUserMenu && (
                                        <div 
                                            id="user-menu" 
                                            className="absolute right-0 top-10 bg-white rounded shadow-lg p-4 min-w-52"
                                            role="menu"
                                        >
                                            <UserMenu close={() => setOpenUserMenu(false)} />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button 
                                    className="text-lg px-3 py-2 text-green-700 font-semibold hover:text-green-900 transition"
                                    onClick={() => navigate("/login")}
                                    aria-label="Login"
                                >
                                    Login
                                </button>
                            )}

                            {/* Cart Button */}
                            <button 
                                onClick={() => setOpenCartSection(true)} 
                                className="flex items-center gap-2 bg-green-700 hover:bg-green-600 px-4 py-2 rounded-md text-white font-medium shadow-md transition"
                                aria-label="View Cart"
                            >
                                <BsCart4 size={24} className="animate-bounce" />
                                <div className="text-sm">
                                    {cartItems.length > 0 ? (
                                        <>
                                            <p>{totalQty} Items</p>
                                            <p>{DisplayPriceInRupees(totalPrice)}</p>
                                        </>
                                    ) : (
                                        <p>My Cart</p>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Mobile Search Bar */}
            <div className="container mx-auto px-4 lg:hidden">
                <Search />
            </div>

            {/* Cart Modal */}
            {openCartSection && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md w-11/12 max-w-lg">
                        <DisplayCartItem close={() => setOpenCartSection(false)} />
                        <button 
                            onClick={() => setOpenCartSection(false)} 
                            className="absolute top-2 right-2 text-lg text-gray-600"
                            aria-label="Close Cart"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
