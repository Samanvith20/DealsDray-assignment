import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3001/api/v1/users/getEmployee');
      
      // Check if the response data is an array
      if (Array.isArray(response.data.data)) {
        setEmployees(response.data.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setError('Unexpected data format received from server');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Failed to fetch employees. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredEmployees = Array.isArray(employees) 
    ? employees.filter(employee =>
        Object.values(employee).some(value => 
          value && value.toString().toLowerCase().includes(searchKeyword.toLowerCase())
        )
      )
    : [];

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:3001/api/v1/users/employee/${id}`);
        fetchEmployees(); // Refresh the list
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

  // Get the day, month, and year
  const day = date.getUTCDate(); // Get the day of the month (1-31)
  const year = date.getUTCFullYear(); // Get the full year (e.g., 2024)

  // Get the month name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[date.getUTCMonth()]; // Get month name

  // Format the date as "date/monthname/year"
  return `${day}/${monthName}/${year}`;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <div className="flex justify-between mb-4">
        <div>
          Total Count: {filteredEmployees.length}
        </div>
        <Link to="/createEmployee" className="bg-green-500 text-white px-4 py-2 rounded">
          Create Employee
        </Link>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Search Keyword"
          value={searchKeyword}
          onChange={handleSearch}
          className="w-full p-2 border rounded"
        />
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Unique Id</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Mobile No</th>
            <th className="border p-2">Designation</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Create date</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={employee._id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <img src={employee.image} alt={employee.name} className="w-10 h-10 rounded-full" />
              </td>
              <td className="border p-2">{employee.name}</td>
              <td className="border p-2">
                <a href={`mailto:${employee.email}`} className="text-blue-500 hover:underline">
                  {employee.email}
                </a>
              </td>
              <td className="border p-2">{employee.mobileNo}</td>
              <td className="border p-2">{employee.designation}</td>
              <td className="border p-2">{employee.gender}</td>
              <td className="border p-2">{employee.course}</td>
              <td className="border p-2">{formatDate(employee.updatedAt)}</td>
              <td className="border p-2">
                <Link to={`/editEmployee/${employee._id}`} className="text-blue-500 hover:underline mr-2">
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(employee._id)} 
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;