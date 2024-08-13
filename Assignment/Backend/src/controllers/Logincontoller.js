import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json(new ApiError(400, "Please fill all the fields"));
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json(new ApiError(401, "Invalid email or password"));
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(new ApiError(401, "Invalid email or password"));
    }

    // Login successful
    return res.status(200).json(new ApiResponse(200, user, "Login successful"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};

export default LoginUser;
