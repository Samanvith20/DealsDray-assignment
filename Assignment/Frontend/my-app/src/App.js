import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Createemployee from './components/Createemployee';
import EmployeeList from './components/Employeelist';
import EditEmployee from './components/Editemployee';
import RootLayout from './components/Rootlayout';
import ProtectedRoute from './components/Protectedroute';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element:
    <ProtectedRoute>
     <RootLayout />, 
    </ProtectedRoute>,
     
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/createEmployee",
        element: <Createemployee />,
      },
      {
        path: "/getEmployee",
        element: <EmployeeList />,
      },
      {
        path: "/editEmployee/:id",
        element: <EditEmployee />,
      },
    ],
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
