import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UserMenu from '../components/UserMenu';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const user = useSelector(state => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-3 grid lg:grid-cols-[250px,1fr] gap-4">

        {/* Sidebar Toggle (for mobile) */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-xl p-3 rounded-md bg-primary-200"
        >
          ☰
        </button>

        {/* Sidebar - Sticky Menu */}
        <aside
          className={`lg:block border-r bg-white shadow-md rounded-md py-4 px-3 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto ${isSidebarOpen ? 'block' : 'hidden'}`}
        >
          <UserMenu />
        </aside>

        {/* Main Content */}
        <main className="bg-white shadow-md rounded-md p-6 min-h-[75vh]">
          {user ? <Outlet /> : <p className="text-center text-gray-500">Loading...</p>}
        </main>

      </div>
    </section>
  );
};

export default Dashboard;
