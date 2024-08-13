import React from 'react';
import { RouterProvider, createBrowserRouter, } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const checkAuthentication = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  // console.log('isLoggedIn:', isLoggedIn)
};

const router = createBrowserRouter([
  {
  path:"/",
  element:checkAuthentication() ? <Dashboard /> : <Register />
  
},
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
