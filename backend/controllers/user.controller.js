import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const test = (req, res) => {
  res.json({ message: "API is working, yeah..." });
};

// Update user
export const updateUser = async (req, res, next) => {
  // Check if the user is authorized to update this account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your account!"));
  }

  try {
    // If the password is provided, hash it before saving
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Update the user with the provided data
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password, // Only update password if it's provided
        },
      },
      { new: true } // Return the updated document
    );

    // Exclude password from the response
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


export const  deleteUser=async(req,res,next)=>{
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your account!"));
  }
  try{
   await User.findByIdAndDelete(req.params.id);
   res.status(200).json("User has been deleted.")
  }
  catch(error){
    next(error)
  }
}