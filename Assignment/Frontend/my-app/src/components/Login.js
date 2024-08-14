import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './Usercontext';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/users/login', data);
      console.log(response);
      
      if (response.status === 200) {
        const {  username, _id } = response.data.data;
        
         
        localStorage.setItem('isLoggedIn', 'true');  // Set the flag in local storage
        updateUser(username, _id); 
        navigate('/');
      }
      
    } catch (error) {
      // Handle errors
      if (error.response) {
        if (error.response.status === 401) {
          setMessage({ text: 'Incorrect username or password', type: 'error' });
        } else {
          setMessage({ text: error.response.data.message, type: 'error' });
        }
      } else if (error.request) {
        setMessage({ text: 'Network error. Please try again later.', type: 'error' });
      } else {
        setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md relative">
        {/* Logo and Register Link */}
        <div className="absolute top-4 left-4 flex items-center">
          <img
            src="https://play-lh.googleusercontent.com/Im3CE-kmZJmZMC8pkhpCj7tGznPI6LC1EjhaTJ3E6Cdh_mgW5VxF_joZK31XWwZPmkT5" // Replace with your logo path
            alt="Logo"
            className="w-13 h-11 mr-2"
          />
        </div>
        <Link to="/register" className="absolute top-4 right-4 text-blue-500 hover:underline">
          Register
        </Link>
        
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        {message && (
          <p className={`text-center ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
