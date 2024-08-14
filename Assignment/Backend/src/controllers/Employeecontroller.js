
import { Employee } from "../models/Employee.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import validator from 'validator';

// Create a new employee
export const employeeController = async (req, res) => {
  const { name, email, mobileNo, designation, gender, course } = req.body;

  
  const image = req.file;

  
  

  // Validate inputs
  if (!name || !email || !mobileNo || !designation || !gender || !course) {
    return res.status(400).json(new ApiError(400, 'Please fill all the fields.'));
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json(new ApiError(400, 'Invalid email address.'));
  }

  if (!validator.isNumeric(mobileNo)) {
    return res.status(400).json(new ApiError(400, 'Mobile number must be numeric.'));
  }

  // Check for duplicate email
  const existingUser = await Employee.findOne({ email });
  if (existingUser) {
    return res.status(400).json(new ApiError(400, 'User with this email already exists.'));
  }

  // Check if file is uploaded
  if (!image) {
    return res.status(400).json(new ApiError(400, 'Please upload an image.'));
  }

  // Upload to Cloudinary
  try {
    const filepath = await uploadOnCloudinary(image.path);

    // Proceed with creating a new user
    const newUser = await Employee.create({
      name,
      email,
      mobileNo,
      designation,
      gender,
      course,
      image: filepath.secure_url,
    });

    return res.status(201).json(new ApiResponse(201, newUser, 'User created successfully.'));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, 'Internal server error.'));
  }
};

// get emloyees details
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json(new ApiResponse(200, employees, 'Employees fetched successfully.'));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, 'Internal server error.'));
  }
}



// Update employee details
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobileNo, designation, gender, course } = req.body;

  try {
    // Validate inputs
    if (!name || !email || !mobileNo || !designation || !gender || !course) {
      return res.status(400).json(new ApiError(400, 'Please fill all the fields.'));
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json(new ApiError(400, 'Invalid email address.'));
    }

    if (!validator.isNumeric(mobileNo)) {
      return res.status(400).json(new ApiError(400, 'Mobile number must be numeric.'));
    }

    // Update the employee
    const updatedEmployee = await User.findByIdAndUpdate(
      id,
      { name, email, mobileNo, designation, gender, course },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json(new ApiError(404, 'Employee not found.'));
    }

    return res.status(200).json(new ApiResponse(200, updatedEmployee, 'Employee updated successfully.'));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, 'Internal server error.'));
  }
};




// Delete an employee
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await User.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json(new ApiError(404, 'Employee not found.'));
    }

    return res.status(200).json(new ApiResponse(200, null, 'Employee deleted successfully.'));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, 'Internal server error.'));
  }
};
