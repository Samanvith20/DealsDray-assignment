import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    enum: ['HR', 'Manager', 'Sales'],
    required: true,
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
    required: true,
  },
  course: {
    type: String,
    enum: ["MCA", "BCA", "BSC"],
    required: true,
  },
  image: {
    type: String, // URL or path to the uploaded image
  },
  
},{ timestamps: true });

export const Employee = mongoose.model('Employee', EmployeeSchema);
