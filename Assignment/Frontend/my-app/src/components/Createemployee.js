

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Createemployee = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: 'HR',
    gender: '',
    course: [],
    image: null
  });
  const [errors, setErrors] = useState({});

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
    if (!formData.image) newErrors.image = 'Image is required';
    else if (!['image/jpeg', 'image/png'].includes(formData.image.type)) {
      newErrors.image = 'Only jpg/png files are allowed';
    }
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
            formData[key].forEach(course => formDataToSend.append('course', course));
          } else {
            formDataToSend.append(key, formData[key]);
          }
        });
  
        const response = await axios.post('http://localhost:3001/api/v1/users/dashboard', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('Employee created:', response.data);
        // Reset form or show success message
        if(response.status === 201){
          alert('Employee created successfully');
          navigate("/getEmployee");
        }
      } catch (error) {
        console.error('Error creating employee:', error);
        // Handle error (e.g., show error message)
      }
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Create Employee</h2>
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
                value="M"
                checked={formData.gender === 'M'}
                onChange={handleChange}
              /> Male
            </label>
            <label className="ml-4">
              <input
                type="radio"
                name="gender"
                value="F"
                checked={formData.gender === 'F'}
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

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Createemployee;