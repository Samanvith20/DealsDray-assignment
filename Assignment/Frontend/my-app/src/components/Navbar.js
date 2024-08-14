import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import axios from 'axios';
import { UserContext } from './Usercontext';

const Navbar = () => {
  const { userName, userId, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (userId) {
        await axios.delete(`http://localhost:3001/api/v1/users/logout/${userId}`);
      }
      updateUser('', '');  
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-blue-200 p-4 flex justify-between items-center">
      <div className="font-bold">
        <img
          src="https://play-lh.googleusercontent.com/Im3CE-kmZJmZMC8pkhpCj7tGznPI6LC1EjhaTJ3E6Cdh_mgW5VxF_joZK31XWwZPmkT5"
          alt="logo"
          className="h-10 w-auto"
        />
      </div>
      <nav className="flex items-center gap-3">
        <Link to="/" className="mr-4 text-black">Home</Link>
        <Link to="/createEmployee" className='mr-4 text-black'>Create Employee</Link>
        <Link to="/getEmployee" className="mr-4 text-black">Employee List</Link>
        <span className="ml-5">
          {userName ? `${userName}  ` : 'DealsDry'}
          <button onClick={handleLogout} className="text-black ml-5">Logout</button>
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
