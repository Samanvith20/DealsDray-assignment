import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => (
  <div className="flex flex-col h-screen">
    <header>
      <Navbar />
    </header>
    <main className="flex-grow p-4">
      <Outlet />
    </main>
  </div>
);

export default RootLayout;
