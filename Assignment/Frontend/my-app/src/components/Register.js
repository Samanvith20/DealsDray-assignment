import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });
  const [message, setMessage] = useState([]);

  const onSubmit = async (data) => {
    console.log(data);
    
    try {
      const response = await axios.post('http://localhost:3001/api/v1/users/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Handle successful registration
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      // Handle errors
      if (error.response) {
        setMessage(error.response.data.message || 'Registration failed. Please try again.');
      } else if (error.request) {
        setMessage('Network error. Please try again later.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md relative">
        {/* Logo and Login Link */}
        <div className="absolute top-4 left-4 flex items-center">
          <img
            src="https://play-lh.googleusercontent.com/Im3CE-kmZJmZMC8pkhpCj7tGznPI6LC1EjhaTJ3E6Cdh_mgW5VxF_joZK31XWwZPmkT5" 
            alt="Logo"
            className="w-8 h-8 mr-2"
          />
          
        </div>
        <Link to="/login" className="absolute top-4 right-4 text-blue-500 hover:underline">
          Login
        </Link>
        
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-group">
            <label htmlFor="username" className="block text-sm font-medium">
              username:
            </label>
            <input
              type="text"
              id="username"
              {...register('username', { required: 'username is required' })}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
            {errors.username && (
              <span className="text-sm text-red-500">{errors.username.message}</span>
            )}
          </div>
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
            Register
          </button>
        </form>
        {message && <p className="text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Register;