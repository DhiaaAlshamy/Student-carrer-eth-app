import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-200 pt-4">
      <div className="flex flex-col items-center justify-center flex-shrink-0">
        <img
          className="h-16 w-16 rounded-full"
          src="https://via.placeholder.com/150"
          alt="Admin Avatar"
        />
        <h2 className="mt-2 text-xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>
      <nav className="mt-8">
        <div className="px-2 space-y-1">

          <NavLink
            to="/admin/users"
            className={`${
              location.pathname === 'admin/users'||location.pathname=='admin/addUser' ? 'bg-gray-400 text-gray-700' : 'text-gray-600 hover:bg-gray-400 hover:text-gray-700'
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            Users Accounts
          </NavLink>

          <NavLink
            to="/admin/students"
            className={`${
              location.pathname === 'admin/students' ? 'bg-gray-400 text-gray-700' : 'text-gray-600 hover:bg-gray-400 hover:text-gray-700'
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            Students
          </NavLink>  
           <NavLink
            to="/admin/employers"
            className={`${
              location.pathname === 'admin/employers' ? 'bg-gray-400 text-gray-700' : 'text-gray-600 hover:bg-gray-400 hover:text-gray-700'
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            Employers
          </NavLink>

          <a
            href="#"
            className="text-gray-600 hover:bg-gray-400 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Logout
          </a>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
