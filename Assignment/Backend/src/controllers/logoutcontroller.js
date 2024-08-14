
import { Employee } from "../models/Employee.model.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const deletedUser = await Employee.findByIdAndDelete(id);
    // If user not found
    if (!deletedUser) {
      return res.status(404).json(new ApiError(404, "User not found!"));
    }
    res.status(200).json(new ApiResponse(200, deletedUser, "User deleted successfully!"));
  } catch (error) {
    console.error("Error while deleting a User:", error);
    res.status(500).json(new ApiError(500, "Internal server error"));
  }
};
