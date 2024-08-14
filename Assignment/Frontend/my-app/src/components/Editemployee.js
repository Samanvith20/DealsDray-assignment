import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    course: [],
    image: null
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEmployeeData();
  }, [id]);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/users/employee/${id}`);
      
      
      const employeeData = response.data.data;
   
      
      setFormData({
        name: employeeData.name,
        email: employeeData.email,
        mobileNo: employeeData.mobileNo,
        designation: employeeData.designation,
        gender: employeeData.gender,
        course: Array.isArray(employeeData.course) ? employeeData.course : [employeeData.course],
        image: employeeData.image
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        course: checked
          ? [...prev.course, value]
          : prev.course.filter(item => item !== value)
      }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.mobileNo) newErrors.mobileNo = 'Mobile No is required';
    else if (!/^\d+$/.test(formData.mobileNo)) newErrors.mobileNo = 'Mobile No must be numeric';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (formData.course.length === 0) newErrors.course = 'At least one course must be selected';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          if (key === 'course') {
            formDataToSend.append(key, JSON.stringify(formData[key]));
          } else if (key === 'image' && formData[key]) {
            formDataToSend.append(key, formData[key]);
          } else {
            formDataToSend.append(key, formData[key]);
          }
        });
        
        await axios.put(`http://localhost:3001/api/v1/users/employees/${id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        navigate('/getEmployee'); // Redirect to employee list after successful update
      } catch (error) {
        console.error('Error updating employee:', error);
        // Handle error (e.g., show error message)
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block">Mobile No</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            className="w-full border p-2"
          />
          {errors.mobileNo && <p className="text-red-500">{errors.mobileNo}</p>}
        </div>

        <div>
          <label className="block">Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div>
          <label className="block">Gender</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              /> Male
            </label>
            <label className="ml-4">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              /> Female
            </label>
          </div>
          {errors.gender && <p className="text-red-500">{errors.gender}</p>}
        </div>

        <div>
          <label className="block">Course</label>
          <div>
            {['MCA', 'BCA', 'BSC'].map(course => (
              <label key={course} className="mr-4">
                <input
                  type="checkbox"
                  name="course"
                  value={course}
                  checked={formData.course.includes(course)}
                  onChange={handleChange}
                /> {course}
              </label>
            ))}
          </div>
          {errors.course && <p className="text-red-500">{errors.course}</p>}
        </div>

        <div>
          <label className="block">Image Upload</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/jpeg,image/png"
            className="w-full border p-2"
          />
          {errors.image && <p className="text-red-500">{errors.image}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;