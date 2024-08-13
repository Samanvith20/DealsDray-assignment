import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs"; 

const RegisterUser = async (req, res) => {
  try {
    const {  username, password, email } = req.body;

    if (! username || !password || !email) {
      return res.status(400).json(new ApiError(400, "Please fill all the fields"));
    }

    // Check if the user already exists by email
    const existedUser = await User.findOne({
        $or: [
            {  username },
            { email }     
        ]
    });
    if (existedUser) {
      return res.status(409).json(new ApiError(409, "User already exists"));
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({ username, password: hashedPassword, email });

    return res.status(201).json(new ApiResponse(201, user, "User created successfully"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};

export default RegisterUser;
