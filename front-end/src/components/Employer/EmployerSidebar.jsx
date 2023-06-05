import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const EmployerSidebar = () => {
  const location = useLocation();
  return <div className="flex flex-col  min-h-screen w-64 bg-gray-200 pt-4">
      <div className="flex flex-col items-center justify-center flex-shrink-0">
        <img className="h-16 w-16 rounded-full" src="https://via.placeholder.com/150" alt="student Avatar" />
        <h2 className="mt-2 text-xl font-bold text-gray-800">Employer Dashboard</h2>
      </div>
      <nav className="mt-8">
        <div className="px-2 space-y-1">
          <Link to="/employer/profile" className={`${location.pathname === 'student/profile' ? 'bg-gray-400 text-gray-700' : 'text-gray-600 hover:bg-gray-400 hover:text-gray-700'} block px-3 py-2 rounded-md text-base font-medium`}>
            My Profile
          </Link>
        
           <NavLink to="/employer/students" className={`${location.pathname === 'student/employers' ? 'bg-gray-400 text-gray-700' : 'text-gray-600 hover:bg-gray-400 hover:text-gray-700'} block px-3 py-2 rounded-md text-base font-medium`}>
            Students
          </NavLink> 
           <NavLink to="/" className={`${location.pathname === 'student/employers' ? 'bg-gray-400 text-gray-700' : 'text-gray-600 hover:bg-gray-400 hover:text-gray-700'} block px-3 py-2 rounded-md text-base font-medium`}>
           Logout
          </NavLink>
        
        </div>
      </nav>
    </div>;
};

export default EmployerSidebar;