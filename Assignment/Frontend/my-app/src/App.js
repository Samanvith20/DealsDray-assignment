import React from 'react';
import { RouterProvider, createBrowserRouter, } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

const router = createBrowserRouter([
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
