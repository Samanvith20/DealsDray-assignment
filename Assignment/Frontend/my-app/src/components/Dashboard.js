import React from 'react';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-3  p-4">
      <div className="col-span-1 flex items-center">
        <h3 className="text-black font-bold">DashBord</h3>
      </div>
      <div className=" flex justify-center items-center">
        <h1 className="text-2xl font-bold">Welcome Admin Panel</h1>
      </div>
    </div>
  );
}

export default Dashboard;
